import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { hashPassword } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, password } = body

    console.log('[Simple Login] Received:', { username, hasPassword: !!password })

    if (!username || !password) {
      return NextResponse.json({
        error: 'Username dan password diperlukan',
        debug: 'Missing credentials'
      }, { status: 400 })
    }

    console.log('[Simple Login] Looking up admin...')
    const admin = await db.admin.findUnique({
      where: { username }
    })

    console.log('[Simple Login] Admin found:', !!admin)

    if (!admin) {
      return NextResponse.json({
        error: 'Username atau password salah',
        debug: 'Admin not found'
      }, { status: 401 })
    }

    console.log('[Simple Login] Hashing password...')
    const hashedPassword = hashPassword(password)

    console.log('[Simple Login] Stored hash:', admin.password.substring(0, 10) + '...')
    console.log('[Simple Login] Computed hash:', hashedPassword.substring(0, 10) + '...')

    if (admin.password !== hashedPassword) {
      return NextResponse.json({
        error: 'Username atau password salah',
        debug: 'Password mismatch'
      }, { status: 401 })
    }

    console.log('[Simple Login] SUCCESS for:', username)

    const response = NextResponse.json({
      success: true,
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        name: admin.name,
        role: admin.role
      }
    })

    response.cookies.set('admin_session', admin.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7
    })

    return response
  } catch (error) {
    console.error('[Simple Login] ERROR:', error)
    console.error('[Simple Login] ERROR Stack:', error instanceof Error ? error.stack : 'No stack')

    return NextResponse.json({
      error: 'Terjadi kesalahan',
      debug: error instanceof Error ? error.message : String(error)
    }, { status: 500 })
  }
}

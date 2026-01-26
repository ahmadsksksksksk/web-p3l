import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET all profil contents
export async function GET() {
  try {
    const profiles = await db.profilContent.findMany({
      orderBy: { order: 'asc' }
    })

    return NextResponse.json(profiles)
  } catch (error) {
    console.error('Get profil error:', error)
    return NextResponse.json(
      { error: 'Gagal mengambil data profil' },
      { status: 500 }
    )
  }
}

// POST create new profil content
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { section, title, content, order } = body

    if (!section || !title || !content) {
      return NextResponse.json(
        { error: 'Section, title, dan content diperlukan' },
        { status: 400 }
      )
    }

    const profil = await db.profilContent.create({
      data: {
        section,
        title,
        content,
        order: order || 0
      }
    })

    return NextResponse.json(profil, { status: 201 })
  } catch (error) {
    console.error('Create profil error:', error)
    return NextResponse.json(
      { error: 'Gagal membuat profil' },
      { status: 500 }
    )
  }
}

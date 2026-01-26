import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET all kontak info
export async function GET() {
  try {
    const contacts = await db.kontakInfo.findMany({
      orderBy: { order: 'asc' }
    })

    return NextResponse.json(contacts)
  } catch (error) {
    console.error('Get kontak error:', error)
    return NextResponse.json(
      { error: 'Gagal mengambil data kontak' },
      { status: 500 }
    )
  }
}

// POST create new kontak info
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, label, value, order, isActive } = body

    if (!type || !label || !value) {
      return NextResponse.json(
        { error: 'Type, label, dan value diperlukan' },
        { status: 400 }
      )
    }

    const contact = await db.kontakInfo.create({
      data: {
        type,
        label,
        value,
        order: order || 0,
        isActive: isActive !== undefined ? isActive : true
      }
    })

    return NextResponse.json(contact, { status: 201 })
  } catch (error) {
    console.error('Create kontak error:', error)
    return NextResponse.json(
      { error: 'Gagal membuat kontak' },
      { status: 500 }
    )
  }
}

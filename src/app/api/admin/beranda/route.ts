import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET all beranda sections
export async function GET() {
  try {
    const sections = await db.berandaSection.findMany({
      orderBy: { order: 'asc' }
    })

    return NextResponse.json(sections)
  } catch (error) {
    console.error('Get beranda error:', error)
    return NextResponse.json(
      { error: 'Gagal mengambil data beranda' },
      { status: 500 }
    )
  }
}

// POST create new beranda section
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { sectionName, title, content, order } = body

    if (!sectionName || !content) {
      return NextResponse.json(
        { error: 'SectionName dan content diperlukan' },
        { status: 400 }
      )
    }

    const section = await db.berandaSection.create({
      data: {
        sectionName,
        title: title || '',
        content,
        order: order || 0
      }
    })

    return NextResponse.json(section, { status: 201 })
  } catch (error) {
    console.error('Create beranda error:', error)
    return NextResponse.json(
      { error: 'Gagal membuat section beranda' },
      { status: 500 }
    )
  }
}

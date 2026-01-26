import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET all berita
export async function GET() {
  try {
    const berita = await db.berita.findMany({
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(berita)
  } catch (error) {
    console.error('Get berita error:', error)
    return NextResponse.json(
      { error: 'Gagal mengambil data berita' },
      { status: 500 }
    )
  }
}

// POST create new berita
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, excerpt, content, category, image, author, isFeatured, isActive } = body

    if (!title || !excerpt || !content) {
      return NextResponse.json(
        { error: 'Title, excerpt, dan content diperlukan' },
        { status: 400 }
      )
    }

    const berita = await db.berita.create({
      data: {
        title,
        excerpt,
        content,
        category: category || 'Umum',
        image: image || '',
        author: author || 'Admin',
        isFeatured: isFeatured || false,
        isActive: isActive !== undefined ? isActive : true
      }
    })

    return NextResponse.json(berita, { status: 201 })
  } catch (error) {
    console.error('Create berita error:', error)
    return NextResponse.json(
      { error: 'Gagal membuat berita' },
      { status: 500 }
    )
  }
}

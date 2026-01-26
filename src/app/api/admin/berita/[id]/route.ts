import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// PUT update berita
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { title, excerpt, content, category, image, author, isFeatured, isActive, publishedAt } = body

    const berita = await db.berita.update({
      where: { id: params.id },
      data: {
        ...(title !== undefined && { title }),
        ...(excerpt !== undefined && { excerpt }),
        ...(content !== undefined && { content }),
        ...(category !== undefined && { category }),
        ...(image !== undefined && { image }),
        ...(author !== undefined && { author }),
        ...(isFeatured !== undefined && { isFeatured }),
        ...(isActive !== undefined && { isActive }),
        ...(publishedAt !== undefined && { publishedAt })
      }
    })

    return NextResponse.json(berita)
  } catch (error) {
    console.error('Update berita error:', error)
    return NextResponse.json(
      { error: 'Gagal mengupdate berita' },
      { status: 500 }
    )
  }
}

// DELETE berita
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await db.berita.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete berita error:', error)
    return NextResponse.json(
      { error: 'Gagal menghapus berita' },
      { status: 500 }
    )
  }
}

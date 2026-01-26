import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// PUT update beranda
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { sectionName, title, content, order, isActive } = body

    const section = await db.berandaSection.update({
      where: { id: params.id },
      data: {
        ...(sectionName !== undefined && { sectionName }),
        ...(title !== undefined && { title }),
        ...(content !== undefined && { content }),
        ...(order !== undefined && { order }),
        ...(isActive !== undefined && { isActive })
      }
    })

    return NextResponse.json(section)
  } catch (error) {
    console.error('Update beranda error:', error)
    return NextResponse.json(
      { error: 'Gagal mengupdate beranda' },
      { status: 500 }
    )
  }
}

// DELETE beranda
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await db.berandaSection.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete beranda error:', error)
    return NextResponse.json(
      { error: 'Gagal menghapus beranda' },
      { status: 500 }
    )
  }
}

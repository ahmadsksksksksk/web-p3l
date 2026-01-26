import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// PUT update profil
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { section, title, content, order } = body

    const profil = await db.profilContent.update({
      where: { id: params.id },
      data: {
        ...(section !== undefined && { section }),
        ...(title !== undefined && { title }),
        ...(content !== undefined && { content }),
        ...(order !== undefined && { order })
      }
    })

    return NextResponse.json(profil)
  } catch (error) {
    console.error('Update profil error:', error)
    return NextResponse.json(
      { error: 'Gagal mengupdate profil' },
      { status: 500 }
    )
  }
}

// DELETE profil
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await db.profilContent.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete profil error:', error)
    return NextResponse.json(
      { error: 'Gagal menghapus profil' },
      { status: 500 }
    )
  }
}

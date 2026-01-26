import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// PUT update kontak
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { type, label, value, order, isActive } = body

    const contact = await db.kontakInfo.update({
      where: { id: params.id },
      data: {
        ...(type !== undefined && { type }),
        ...(label !== undefined && { label }),
        ...(value !== undefined && { value }),
        ...(order !== undefined && { order }),
        ...(isActive !== undefined && { isActive })
      }
    })

    return NextResponse.json(contact)
  } catch (error) {
    console.error('Update kontak error:', error)
    return NextResponse.json(
      { error: 'Gagal mengupdate kontak' },
      { status: 500 }
    )
  }
}

// DELETE kontak
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await db.kontakInfo.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete kontak error:', error)
    return NextResponse.json(
      { error: 'Gagal menghapus kontak' },
      { status: 500 }
    )
  }
}

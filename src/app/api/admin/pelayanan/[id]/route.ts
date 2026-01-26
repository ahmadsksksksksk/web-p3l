import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// PUT update pelayanan
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { title, description, icon, order, isActive } = body

    const item = await db.pelayananItem.update({
      where: { id: params.id },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(icon !== undefined && { icon }),
        ...(order !== undefined && { order }),
        ...(isActive !== undefined && { isActive })
      }
    })

    return NextResponse.json(item)
  } catch (error) {
    console.error('Update pelayanan error:', error)
    return NextResponse.json(
      { error: 'Gagal mengupdate pelayanan' },
      { status: 500 }
    )
  }
}

// DELETE pelayanan
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await db.pelayananItem.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete pelayanan error:', error)
    return NextResponse.json(
      { error: 'Gagal menghapus pelayanan' },
      { status: 500 }
    )
  }
}

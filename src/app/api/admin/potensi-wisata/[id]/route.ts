import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// PUT update potensi wisata
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { title, description, image, location, category, order, isActive } = body

    const item = await db.potensiWisata.update({
      where: { id: params.id },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(image !== undefined && { image }),
        ...(location !== undefined && { location }),
        ...(category !== undefined && { category }),
        ...(order !== undefined && { order }),
        ...(isActive !== undefined && { isActive })
      }
    })

    return NextResponse.json(item)
  } catch (error) {
    console.error('Update potensi wisata error:', error)
    return NextResponse.json(
      { error: 'Gagal mengupdate potensi wisata' },
      { status: 500 }
    )
  }
}

// DELETE potensi wisata
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await db.potensiWisata.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete potensi wisata error:', error)
    return NextResponse.json(
      { error: 'Gagal menghapus potensi wisata' },
      { status: 500 }
    )
  }
}

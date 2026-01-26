import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET all potensi wisata
export async function GET() {
  try {
    const items = await db.potensiWisata.findMany({
      orderBy: { order: 'asc' }
    })

    return NextResponse.json(items)
  } catch (error) {
    console.error('Get potensi wisata error:', error)
    return NextResponse.json(
      { error: 'Gagal mengambil data potensi wisata' },
      { status: 500 }
    )
  }
}

// POST create new potensi wisata
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, image, location, category, order, isActive } = body

    if (!title || !description) {
      return NextResponse.json(
        { error: 'Title dan description diperlukan' },
        { status: 400 }
      )
    }

    const item = await db.potensiWisata.create({
      data: {
        title,
        description,
        image: image || '',
        location: location || '',
        category: category || 'Wisata',
        order: order || 0,
        isActive: isActive !== undefined ? isActive : true
      }
    })

    return NextResponse.json(item, { status: 201 })
  } catch (error) {
    console.error('Create potensi wisata error:', error)
    return NextResponse.json(
      { error: 'Gagal membuat potensi wisata' },
      { status: 500 }
    )
  }
}

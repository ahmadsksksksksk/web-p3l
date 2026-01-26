import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET all pelayanan items
export async function GET() {
  try {
    const items = await db.pelayananItem.findMany({
      orderBy: { order: 'asc' }
    })

    return NextResponse.json(items)
  } catch (error) {
    console.error('Get pelayanan error:', error)
    return NextResponse.json(
      { error: 'Gagal mengambil data pelayanan' },
      { status: 500 }
    )
  }
}

// POST create new pelayanan item
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, icon, order } = body

    if (!title || !description) {
      return NextResponse.json(
        { error: 'Title dan description diperlukan' },
        { status: 400 }
      )
    }

    const item = await db.pelayananItem.create({
      data: {
        title,
        description,
        icon,
        order: order || 0
      }
    })

    return NextResponse.json(item, { status: 201 })
  } catch (error) {
    console.error('Create pelayanan error:', error)
    return NextResponse.json(
      { error: 'Gagal membuat pelayanan' },
      { status: 500 }
    )
  }
}

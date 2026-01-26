import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const hero = await db.beritaHero.findFirst()
    const newsItems = await db.beritaItem.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({
      success: true,
      data: {
        hero: hero || {
          title: 'Berita & Informasi',
          description: 'Dapatkan informasi terbaru seputar Tanjung Barat'
        },
        news: newsItems
      }
    })
  } catch (error) {
    console.error('Error fetching Berita data:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch data' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { hero, news } = body

    if (hero) {
      const existing = await db.beritaHero.findFirst()
      if (existing) {
        await db.beritaHero.update({
          where: { id: existing.id },
          data: hero
        })
      } else {
        await db.beritaHero.create({ data: hero })
      }
    }

    if (news && Array.isArray(news)) {
      await db.beritaItem.deleteMany({})

      for (const item of news) {
        await db.beritaItem.create({
          data: {
            title: item.title,
            description: item.description,
            date: item.date,
            content: item.content || '',
            category: item.category || '',
            author: item.author || '',
            isActive: item.isActive !== undefined ? item.isActive : true
          }
        })
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Berita data updated successfully'
    })
  } catch (error) {
    console.error('Error updating Berita data:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update data' },
      { status: 500 }
    )
  }
}

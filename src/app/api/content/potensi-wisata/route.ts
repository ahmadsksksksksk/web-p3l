import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const hero = await db.potensiHero.findFirst()
    const categories = await db.potensiCategory.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' }
    })

    const places = await db.potensiPlace.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' }
    })

    const categoriesWithPlaces = categories.map((cat: any) => ({
      ...cat,
      tempat: places.filter((p: any) => p.categoryId === cat.id)
    }))

    return NextResponse.json({
      success: true,
      data: {
        hero: hero || {
          title: 'Potensi & Wisata',
          description: 'Jelajahi tempat wisata, kuliner, dan fasilitas menarik di Tanjung Barat'
        },
        categories: categoriesWithPlaces
      }
    })
  } catch (error) {
    console.error('Error fetching Potensi Wisata data:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch data' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { hero, categories } = body

    if (hero) {
      const existing = await db.potensiHero.findFirst()
      if (existing) {
        await db.potensiHero.update({
          where: { id: existing.id },
          data: hero
        })
      } else {
        await db.potensiHero.create({ data: hero })
      }
    }

    if (categories && Array.isArray(categories)) {
      // Delete all existing places first to avoid orphaned records
      await db.potensiPlace.deleteMany({})
      // Delete all existing categories
      await db.potensiCategory.deleteMany({})

      for (const cat of categories) {
        const newCat = await db.potensiCategory.create({
          data: {
            name: cat.nama || cat.category,
            deskripsi: cat.deskripsi || cat.description,
            icon: cat.icon,
            order: categories.indexOf(cat)
          }
        })

        if (cat.tempat && Array.isArray(cat.tempat)) {
          await db.potensiPlace.createMany({
            data: cat.tempat.map((t: any, index: number) => ({
              categoryId: newCat.id,
              nama: t.nama,
              alamat: t.alamat,
              order: index,
              isActive: true
            }))
          })
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Potensi Wisata data updated successfully'
    })
  } catch (error) {
    console.error('Error updating Potensi Wisata data:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update data' },
      { status: 500 }
    )
  }
}

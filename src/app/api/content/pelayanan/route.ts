import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const hero = await db.pelayananHero.findFirst()
    const importantInfo = await db.pelayananImportantInfo.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' }
    })
    const categories = await db.pelayananCategory.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' }
    })
    const cta = await db.pelayananCTA.findFirst()

    const services = await db.pelayananService.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' }
    })

    const categoriesWithServices = categories.map((cat: any) => ({
      ...cat,
      services: services.filter((s: any) => s.categoryId === cat.id)
    }))

    return NextResponse.json({
      success: true,
      data: {
        hero: hero || {
          title: 'Pelayanan Publik',
          description: 'Temukan berbagai layanan publik yang tersedia.'
        },
        importantInfo,
        categories: categoriesWithServices,
        cta: cta || {
          title: 'Butuh Bantuan Langsung?',
          description: 'Tim kami siap membantu Anda.',
          button1: 'Hubungi Kami',
          button2: 'Download Panduan'
        }
      }
    })
  } catch (error) {
    console.error('Error fetching Pelayanan data:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch data' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { hero, importantInfo, categories, cta } = body

    if (hero) {
      const existing = await db.pelayananHero.findFirst()
      if (existing) {
        await db.pelayananHero.update({
          where: { id: existing.id },
          data: hero
        })
      } else {
        await db.pelayananHero.create({ data: hero })
      }
    }

    if (importantInfo && Array.isArray(importantInfo)) {
      await db.pelayananImportantInfo.deleteMany({})
      await db.pelayananImportantInfo.createMany({
        data: importantInfo.map((info: any, i: number) => ({
          icon: info.icon,
          title: info.title,
          content: info.content,
          order: i
        }))
      })
    }

    if (categories && Array.isArray(categories)) {
      const updatedCategories: any[] = []

      for (const cat of categories) {
        let categoryId = cat.id

        if (cat.id && !cat.id.startsWith('cat-')) {
          await db.pelayananCategory.update({
            where: { id: cat.id },
            data: {
              category: cat.category,
              icon: cat.icon,
              order: categories.indexOf(cat)
            }
          })
        } else {
          const newCat = await db.pelayananCategory.create({
            data: {
              category: cat.category,
              icon: cat.icon,
              order: categories.indexOf(cat)
            }
          })
          categoryId = newCat.id
        }

        await db.pelayananService.deleteMany({
          where: { categoryId }
        })

        if (cat.services && Array.isArray(cat.services)) {
          await db.pelayananService.createMany({
            data: cat.services.map((s: any, i: number) => ({
              categoryId,
              title: s.title,
              description: s.description,
              requirements: JSON.stringify(s.requirements || []),
              processingTime: s.processingTime,
              order: i
            }))
          })
        }
      }
    }

    if (cta) {
      const existing = await db.pelayananCTA.findFirst()
      if (existing) {
        await db.pelayananCTA.update({
          where: { id: existing.id },
          data: cta
        })
      } else {
        await db.pelayananCTA.create({ data: cta })
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Pelayanan data updated successfully'
    })
  } catch (error) {
    console.error('Error updating Pelayanan data:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update data' },
      { status: 500 }
    )
  }
}

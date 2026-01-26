import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const hero = await db.kontakHero.findFirst()
    const infoItems = await db.kontakInfoItem.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' }
    })
    const office = await db.kontakOffice.findFirst()
    const socialMedia = await db.kontakSocialMedia.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' }
    })
    const additionalInfo = await db.kontakAdditionalInfo.findFirst()

    return NextResponse.json({
      success: true,
      data: {
        hero: hero || {
          title: 'Hubungi Kami',
          description: 'Kami siap membantu Anda.'
        },
        infoItems,
        office: office || {
          name: 'Kantor Kelurahan Tanjung Barat',
          address: '',
          city: '',
          phone: '',
          fax: '',
          email: '',
          whatsapp: ''
        },
        socialMedia,
        additionalInfo: additionalInfo || {
          content: 'Untuk informasi lebih lanjut atau pengaduan, silakan hubungi kami.'
        }
      }
    })
  } catch (error) {
    console.error('Error fetching Kontak data:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch data' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { hero, infoItems, office, socialMedia, additionalInfo } = body

    if (hero) {
      const existing = await db.kontakHero.findFirst()
      if (existing) {
        await db.kontakHero.update({
          where: { id: existing.id },
          data: hero
        })
      } else {
        await db.kontakHero.create({ data: hero })
      }
    }

    if (infoItems && Array.isArray(infoItems)) {
      await db.kontakInfoItem.deleteMany({})
      await db.kontakInfoItem.createMany({
        data: infoItems.map((item: any, i: number) => ({
          icon: item.icon,
          title: item.title,
          content: item.content,
          order: i
        }))
      })
    }

    if (office) {
      const existing = await db.kontakOffice.findFirst()
      if (existing) {
        await db.kontakOffice.update({
          where: { id: existing.id },
          data: office
        })
      } else {
        await db.kontakOffice.create({ data: office })
      }
    }

    if (socialMedia && Array.isArray(socialMedia)) {
      await db.kontakSocialMedia.deleteMany({})
      await db.kontakSocialMedia.createMany({
        data: socialMedia.map((item: any, i: number) => ({
          platform: item.platform,
          url: item.url,
          icon: item.icon,
          order: i
        }))
      })
    }

    if (additionalInfo) {
      const existing = await db.kontakAdditionalInfo.findFirst()
      if (existing) {
        await db.kontakAdditionalInfo.update({
          where: { id: existing.id },
          data: additionalInfo
        })
      } else {
        await db.kontakAdditionalInfo.create({ data: additionalInfo })
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Kontak data updated successfully'
    })
  } catch (error) {
    console.error('Error updating Kontak data:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update data' },
      { status: 500 }
    )
  }
}

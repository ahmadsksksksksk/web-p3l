import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const hero = await db.berandaHero.findFirst()
    const whySection = await db.berandaWhySection.findFirst()
    const features = await db.berandaFeature.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' }
    })
    const statistics = await db.berandaStatistic.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' }
    })
    const newsHeader = await db.berandaNewsHeader.findFirst()
    const cta = await db.berandaCTA.findFirst()

    return NextResponse.json({
      success: true,
      data: {
        hero: hero || {
          title: 'Selamat Datang di',
          subtitle: 'Tanjung Barat',
          description: 'Daerah yang memadukan kearifan lokal dengan kemajuan modern.',
          buttonText1: 'Jelajahi Profil',
          buttonText2: 'Hubungi Kami'
        },
        whySection: whySection || {
          title: 'Mengapa Tanjung Barat?',
          description: 'Tanjung Barat menawarkan berbagai keunggulan.'
        },
        features,
        statistics,
        newsHeader: newsHeader || {
          title: 'Berita Terkini',
          description: 'Dapatkan informasi terbaru seputar Tanjung Barat',
          buttonText: 'Lihat Semua Berita'
        },
        cta: cta || {
          title: 'Siap Menjelajahi Tanjung Barat?',
          description: 'Temukan informasi lengkap mengenai pelayanan dan potensi wisata.',
          buttonText: 'Mulai Jelajah'
        }
      }
    })
  } catch (error) {
    console.error('Error fetching Beranda data:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch data' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()

    if (!body) {
      return NextResponse.json(
        { success: false, error: 'Request body is required' },
        { status: 400 }
      )
    }

    const { hero, whySection, features, statistics, newsHeader, cta } = body

    console.log('Updating Beranda with:', { hero, whySection, features: features?.length, statistics: statistics?.length, newsHeader, cta })

    if (hero && typeof hero === 'object') {
      try {
        const existingHero = await db.berandaHero.findFirst()
        if (existingHero) {
          await db.berandaHero.update({
            where: { id: existingHero.id },
            data: hero
          })
        } else {
          await db.berandaHero.create({ data: hero })
        }
        console.log('Hero updated successfully')
      } catch (error) {
        console.error('Error updating hero:', error)
        return NextResponse.json(
          { success: false, error: 'Failed to update hero: ' + String(error) },
          { status: 500 }
        )
      }
    }

    if (whySection && typeof whySection === 'object') {
      try {
        const existingWhy = await db.berandaWhySection.findFirst()
        if (existingWhy) {
          await db.berandaWhySection.update({
            where: { id: existingWhy.id },
            data: whySection
          })
        } else {
          await db.berandaWhySection.create({ data: whySection })
        }
        console.log('WhySection updated successfully')
      } catch (error) {
        console.error('Error updating whySection:', error)
        return NextResponse.json(
          { success: false, error: 'Failed to update whySection: ' + String(error) },
          { status: 500 }
        )
      }
    }

    if (features && Array.isArray(features)) {
      try {
        await db.berandaFeature.deleteMany({})
        await db.berandaFeature.createMany({
          data: features.map((f, index) => ({
            icon: String(f.icon || ''),
            title: String(f.title || ''),
            description: String(f.description || ''),
            order: index
          }))
        })
        console.log('Features updated successfully:', features.length)
      } catch (error) {
        console.error('Error updating features:', error)
        return NextResponse.json(
          { success: false, error: 'Failed to update features: ' + String(error) },
          { status: 500 }
        )
      }
    }

    if (statistics && Array.isArray(statistics)) {
      try {
        await db.berandaStatistic.deleteMany({})
        await db.berandaStatistic.createMany({
          data: statistics.map((s, index) => ({
            label: String(s.label || ''),
            value: String(s.value || ''),
            order: index
          }))
        })
        console.log('Statistics updated successfully:', statistics.length)
      } catch (error) {
        console.error('Error updating statistics:', error)
        return NextResponse.json(
          { success: false, error: 'Failed to update statistics: ' + String(error) },
          { status: 500 }
        )
      }
    }

    if (newsHeader && typeof newsHeader === 'object') {
      try {
        const existingNewsHeader = await db.berandaNewsHeader.findFirst()
        if (existingNewsHeader) {
          await db.berandaNewsHeader.update({
            where: { id: existingNewsHeader.id },
            data: newsHeader
          })
        } else {
          await db.berandaNewsHeader.create({ data: newsHeader })
        }
        console.log('NewsHeader updated successfully')
      } catch (error) {
        console.error('Error updating newsHeader:', error)
        return NextResponse.json(
          { success: false, error: 'Failed to update newsHeader: ' + String(error) },
          { status: 500 }
        )
      }
    }

    if (cta && typeof cta === 'object') {
      try {
        const existingCTA = await db.berandaCTA.findFirst()
        if (existingCTA) {
          await db.berandaCTA.update({
            where: { id: existingCTA.id },
            data: cta
          })
        } else {
          await db.berandaCTA.create({ data: cta })
        }
        console.log('CTA updated successfully')
      } catch (error) {
        console.error('Error updating cta:', error)
        return NextResponse.json(
          { success: false, error: 'Failed to update cta: ' + String(error) },
          { status: 500 }
        )
      }
    }

    console.log('All Beranda data updated successfully')
    return NextResponse.json({
      success: true,
      message: 'Beranda data updated successfully'
    })
  } catch (error) {
    console.error('Error updating Beranda data:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update data' },
      { status: 500 }
    )
  }
}

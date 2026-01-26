import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const history = await db.profilHistory.findFirst()
    const milestones = await db.profilMilestone.findMany({
      orderBy: { order: 'asc' }
    })
    const achievements = await db.profilAchievement.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' }
    })
    const vision = await db.profilVisi.findFirst()
    const missions = await db.profilMisi.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' }
    })
    const orgStructure = await db.profilOrgStructure.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' }
    })
    const geoInfo = await db.profilGeoInfo.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' }
    })
    const areaDescription = await db.profilAreaDescription.findFirst()

    return NextResponse.json({
      success: true,
      data: {
        history: history || {
          content: 'Tanjung Barat merupakan salah satu kelurahan yang berada di wilayah administratif Jakarta Selatan.'
        },
        milestones,
        achievements,
        vision: vision || {
          content: 'Menjadikan Tanjung Barat sebagai wilayah yang sejahtera dan berkelanjutan.'
        },
        missions,
        orgStructure,
        geoInfo,
        areaDescription: areaDescription || {
          content: 'Tanjung Barat memiliki ketinggian sekitar 30-50 meter di atas permukaan laut.'
        }
      }
    })
  } catch (error) {
    console.error('Error fetching Profil data:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch data' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { history, milestones, achievements, vision, missions, orgStructure, geoInfo, areaDescription } = body

    if (history) {
      const existing = await db.profilHistory.findFirst()
      if (existing) {
        await db.profilHistory.update({
          where: { id: existing.id },
          data: { content: history.content || history }
        })
      } else {
        await db.profilHistory.create({ data: { content: history.content || history } })
      }
    }

    if (milestones && Array.isArray(milestones)) {
      await db.profilMilestone.deleteMany({})
      await db.profilMilestone.createMany({
        data: milestones.map((m: any, i: number) => ({
          year: m.year,
          event: m.event,
          order: i
        }))
      })
    }

    if (achievements && Array.isArray(achievements)) {
      await db.profilAchievement.deleteMany({})
      await db.profilAchievement.createMany({
        data: achievements.map((a: any, i: number) => ({
          title: a.title,
          description: a.description,
          order: i
        }))
      })
    }

    if (vision) {
      const existing = await db.profilVisi.findFirst()
      const visionContent = typeof vision === 'string' ? vision : vision.content
      if (existing) {
        await db.profilVisi.update({
          where: { id: existing.id },
          data: { content: visionContent }
        })
      } else {
        await db.profilVisi.create({ data: { content: visionContent } })
      }
    }

    if (missions && Array.isArray(missions)) {
      await db.profilMisi.deleteMany({})
      await db.profilMisi.createMany({
        data: missions.map((m: any, i: number) => ({
          content: m,
          order: i
        }))
      })
    }

    if (orgStructure && Array.isArray(orgStructure)) {
      await db.profilOrgStructure.deleteMany({})
      await db.profilOrgStructure.createMany({
        data: orgStructure.map((o: any, i: number) => ({
          name: o.name,
          position: o.position,
          level: o.level || 2,
          order: i
        }))
      })
    }

    if (geoInfo && Array.isArray(geoInfo)) {
      await db.profilGeoInfo.deleteMany({})
      await db.profilGeoInfo.createMany({
        data: geoInfo.map((g: any, i: number) => ({
          label: g.label,
          value: g.value,
          order: i
        }))
      })
    }

    if (areaDescription) {
      const existing = await db.profilAreaDescription.findFirst()
      const areaContent = typeof areaDescription === 'string' ? areaDescription : areaDescription.content
      if (existing) {
        await db.profilAreaDescription.update({
          where: { id: existing.id },
          data: { content: areaContent }
        })
      } else {
        await db.profilAreaDescription.create({ data: { content: areaContent } })
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Profil data updated successfully'
    })
  } catch (error) {
    console.error('Error updating Profil data:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update data' },
      { status: 500 }
    )
  }
}

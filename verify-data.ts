import { db } from './src/lib/db'

async function verifyData() {
  console.log('🔍 Memverifikasi Data Database...\n')

  const checks = [
    { name: 'Beranda Hero', count: await db.berandaHero.count() },
    { name: 'Beranda Why', count: await db.berandaWhySection.count() },
    { name: 'Beranda Features', count: await db.berandaFeature.count() },
    { name: 'Beranda Statistics', count: await db.berandaStatistic.count() },
    { name: 'Beranda News Header', count: await db.berandaNewsHeader.count() },
    { name: 'Beranda CTA', count: await db.berandaCTA.count() },
    { name: 'Profil History', count: await db.profilHistory.count() },
    { name: 'Profil Milestones', count: await db.profilMilestone.count() },
    { name: 'Profil Achievements', count: await db.profilAchievement.count() },
    { name: 'Profil Visi', count: await db.profilVisi.count() },
    { name: 'Profil Misi', count: await db.profilMisi.count() },
    { name: 'Profil Org Structure', count: await db.profilOrgStructure.count() },
    { name: 'Profil Geo Info', count: await db.profilGeoInfo.count() },
    { name: 'Profil Area Desc', count: await db.profilAreaDescription.count() },
    { name: 'Pelayanan Hero', count: await db.pelayananHero.count() },
    { name: 'Pelayanan Info', count: await db.pelayananImportantInfo.count() },
    { name: 'Pelayanan Categories', count: await db.pelayananCategory.count() },
    { name: 'Pelayanan Services', count: await db.pelayananService.count() },
    { name: 'Pelayanan CTA', count: await db.pelayananCTA.count() },
    { name: 'Potensi Hero', count: await db.potensiHero.count() },
    { name: 'Potensi Categories', count: await db.potensiCategory.count() },
    { name: 'Potensi Places', count: await db.potensiPlace.count() },
    { name: 'Berita Hero', count: await db.beritaHero.count() },
    { name: 'Berita Items', count: await db.beritaItem.count() },
    { name: 'Kontak Hero', count: await db.kontakHero.count() },
    { name: 'Kontak Info', count: await db.kontakInfoItem.count() },
    { name: 'Kontak Office', count: await db.kontakOffice.count() },
    { name: 'Kontak Social', count: await db.kontakSocialMedia.count() },
    { name: 'Kontak Additional', count: await db.kontakAdditionalInfo.count() }
  ]

  let totalRecords = 0
  checks.forEach(check => {
    const status = check.count > 0 ? '✓' : '✗'
    console.log(`${status} ${check.name}: ${check.count} record(s)`)
    totalRecords += check.count
  })

  console.log('\n' + '='.repeat(50))
  console.log(`Total Records: ${totalRecords}`)
  console.log('='.repeat(50))
}

verifyData()
  .catch(console.error)
  .finally(() => db.$disconnect())

import { PrismaClient } from '@prisma/client'
import crypto from 'crypto'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding content data...')

  // Seed Beranda Data
  const berandaHero = await prisma.berandaHero.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      title: 'Selamat Datang di',
      subtitle: 'Tanjung Barat',
      description: 'Daerah yang memadukan kearifan lokal dengan kemajuan modern. Temukan informasi lengkap tentang profil, pelayanan, potensi wisata, dan berita terkini Tanjung Barat.',
      buttonText1: 'Jelajahi Profil',
      buttonText2: 'Hubungi Kami'
    }
  })

  await prisma.berandaWhySection.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      title: 'Mengapa Tanjung Barat?',
      description: 'Tanjung Barat menawarkan berbagai keunggulan yang membuatnya menjadi tempat yang ideal untuk tinggal dan berkembang.'
    }
  })

  const berandaFeatures = await prisma.berandaFeature.findMany()
  if (berandaFeatures.length === 0) {
    await prisma.berandaFeature.createMany({
      data: [
        { icon: 'Users', title: 'Masyarakat yang Sejahtera', description: 'Berkomitmen meningkatkan kesejahteraan masyarakat Tanjung Barat.', order: 0 },
        { icon: 'Building2', title: 'Infrastruktur Modern', description: 'Pengembangan infrastruktur yang lengkap.', order: 1 },
        { icon: 'TreePine', title: 'Lingkungan yang Asri', description: 'Menjaga kelestarian lingkungan.', order: 2 }
      ]
    })
  }

  const berandaStats = await prisma.berandaStatistic.findMany()
  if (berandaStats.length === 0) {
    await prisma.berandaStatistic.createMany({
      data: [
        { label: 'Penduduk', value: '50,000+', order: 0 },
        { label: 'Luas Wilayah', value: '450 Ha', order: 1 },
        { label: 'Rumah Tangga', value: '15,000+', order: 2 },
        { label: 'Fasilitas Umum', value: '100+', order: 3 }
      ]
    })
  }

  await prisma.berandaNewsHeader.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      title: 'Berita Terkini',
      description: 'Dapatkan informasi terbaru seputar Tanjung Barat',
      buttonText: 'Lihat Semua Berita'
    }
  })

  await prisma.berandaCTA.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      title: 'Siap Menjelajahi Tanjung Barat?',
      description: 'Temukan informasi lengkap mengenai pelayanan, potensi wisata, dan berbagai informasi lainnya di Tanjung Barat.',
      buttonText: 'Mulai Jelajah'
    }
  })

  // Seed Profil Data
  await prisma.profilHistory.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      content: 'Tanjung Barat merupakan salah satu kelurahan yang berada di wilayah administratif Jakarta Selatan. Kelurahan ini memiliki sejarah panjang yang bermula dari era kolonial hingga berkembang menjadi salah satu wilayah yang progresif di Jakarta.'
    }
  })

  const profilMilestones = await prisma.profilMilestone.findMany()
  if (profilMilestones.length === 0) {
    await prisma.profilMilestone.createMany({
      data: [
        { year: '1950', event: 'Tanjung Barat resmi menjadi kelurahan administratif', order: 0 },
        { year: '1975', event: 'Pembangunan fasilitas umum pertama', order: 1 },
        { year: '1990', event: 'Pengembangan infrastruktur skala besar', order: 2 },
        { year: '2005', event: 'Meraih penghargaan lingkungan tingkat kota', order: 3 },
        { year: '2020', event: 'Digitalisasi layanan publik', order: 4 },
        { year: '2025', event: 'Terobosan smart city dan layanan berbasis AI', order: 5 }
      ]
    })
  }

  await prisma.profilVisi.upsert({
    where: { content: 'Menjadikan Tanjung Barat sebagai wilayah yang sejahtera' },
    update: {},
    create: {
      content: 'Menjadikan Tanjung Barat sebagai wilayah yang sejahtera, modern, dan berkelanjutan dengan mengedepankan pelayanan prima kepada masyarakat.'
    }
  })

  await prisma.profilMisi.deleteMany({})
  await prisma.profilMisi.createMany({
    data: [
      { content: 'Meningkatkan kualitas pelayanan publik.', order: 0 },
      { content: 'Mewujudkan infrastruktur yang modern.', order: 1 },
      { content: 'Mengembangkan potensi ekonomi lokal.', order: 2 },
      { content: 'Menjaga dan melestarikan lingkungan.', order: 3 },
      { content: 'Meningkatkan kualitas sumber daya manusia.', order: 4 },
      { content: 'Membangun kerjasama pemerintah dan masyarakat.', order: 5 }
    ]
  })

  await prisma.profilOrgStructure.deleteMany({})
  await prisma.profilOrgStructure.createMany({
    data: [
      { name: 'H. Ahmad Fauzi', position: 'Lurah', level: 1, order: 0 },
      { name: 'Dra. Siti Aminah', position: 'Sekretaris Kelurahan', level: 1, order: 1 },
      { name: 'Bambang Sutrisno, S.Sos', position: 'Kepala Bidang Pemerintahan', level: 2, order: 2 },
      { name: 'dr. Maya Putri', position: 'Kepala Bidang Kesehatan Sosial', level: 2, order: 3 },
      { name: 'Ir. Joko Widodo', position: 'Kepala Bidang Pelayanan', level: 2, order: 4 },
      { name: 'Dedi Kurniawan, M.Si', position: 'Kepala Bidang Kependudukan', level: 2, order: 5 },
      { name: 'Ratna Dewi, SE', position: 'Bendahara Kelurahan', level: 2, order: 6 }
    ]
  })

  await prisma.profilGeoInfo.deleteMany({})
  await prisma.profilGeoInfo.createMany({
    data: [
      { label: 'Luas Wilayah', value: '245.5 Ha', order: 0 },
      { label: 'Batas Utara', value: 'Kelurahan Pasar Minggu', order: 1 },
      { label: 'Batas Selatan', value: 'Kelurahan Lenteng Agung', order: 2 },
      { label: 'Batas Barat', value: 'Kelurahan Jagakarsa', order: 3 },
      { label: 'Batas Timur', value: 'Kelurahan Pejaten Barat', order: 4 },
      { label: 'Jumlah RW', value: '12 RW', order: 5 },
      { label: 'Jumlah RT', value: '156 RT', order: 6 }
    ]
  })

  await prisma.profilAreaDescription.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      content: 'Tanjung Barat memiliki ketinggian sekitar 30-50 meter di atas permukaan laut dengan topografi yang relatif landai. Secara administratif, Tanjung Barat terdiri dari 12 RW dan 156 RT.'
    }
  })

  console.log('Content data seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

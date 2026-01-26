import { db } from './src/lib/db'

async function main() {
  console.log('🚀 Memulai inisialisasi lengkap database...\n')

  // ============ BERANDA ============
  console.log('📍 Inisialisasi Halaman Beranda...')

  // Hero
  const hero = await db.berandaHero.upsert({
    where: { id: 'default-hero' },
    update: {},
    create: {
      id: 'default-hero',
      title: 'Selamat Datang di Tanjung Barat',
      subtitle: 'Daerah yang memadukan kearifan lokal dengan kemajuan modern.',
      description: 'Tanjung Barat adalah salah satu kelurahan di Kecamatan Jagakarsa, Jakarta Selatan, yang kaya akan budaya, potensi wisata, dan pelayanan publik yang memadahayakan warganya.',
      buttonText1: 'Jelajahi Profil',
      buttonText2: 'Hubungi Kami'
    }
  })
  console.log('  ✓ Hero section')

  // Why Section
  const whySection = await db.berandaWhySection.upsert({
    where: { id: 'default-why' },
    update: {},
    create: {
      id: 'default-why',
      title: 'Mengapa Tanjung Barat?',
      description: 'Tanjung Barat menawarkan berbagai keunggulan yang membuatnya menjadi daerah yang nyaman dan berkembang pesat. Dengan fasilitas yang lengkap dan lingkungan yang asri, Tanjung Barat menjadi pilihan tepat untuk tempat tinggal maupun berkunjung.'
    }
  })
  console.log('  ✓ Why section')

  // Features
  const features = [
    { icon: 'MapPin', title: 'Lokasi Strategis', description: 'Dikelilingi berbagai fasilitas publik dan akses transportasi yang mudah.' },
    { icon: 'Heart', title: 'Lingkungan Nyaman', description: 'Atmosfer yang tenang dan hijau, cocok untuk keluarga.' },
    { icon: 'TrendingUp', title: 'Ekonomi Berkembang', description: 'Banyak usaha lokal dan peluang ekonomi yang terus bertumbuh.' },
    { icon: 'Users', title: 'Komunitas Solid', description: 'Warga yang saling mendukung dan gotong royong yang kuat.' }
  ]

  await db.berandaFeature.deleteMany()
  for (const feat of features) {
    await db.berandaFeature.create({
      data: {
        ...feat,
        order: features.indexOf(feat) + 1,
        isActive: true
      }
    })
  }
  console.log('  ✓ 4 Features')

  // Statistics
  const statistics = [
    { label: 'Penduduk', value: '50.000+' },
    { label: 'Usaha Lokal', value: '200+' },
    { label: 'Fasilitas Publik', value: '50+' },
    { label: 'Tahun Berdiri', value: '1985' }
  ]

  await db.berandaStatistic.deleteMany()
  for (const stat of statistics) {
    await db.berandaStatistic.create({
      data: {
        ...stat,
        order: statistics.indexOf(stat) + 1,
        isActive: true
      }
    })
  }
  console.log('  ✓ 4 Statistics')

  // News Header
  const newsHeader = await db.berandaNewsHeader.upsert({
    where: { id: 'default-news' },
    update: {},
    create: {
      id: 'default-news',
      title: 'Berita Terkini',
      description: 'Dapatkan informasi terbaru seputar Tanjung Barat',
      buttonText: 'Lihat Semua Berita'
    }
  })
  console.log('  ✓ News header')

  // CTA
  const cta = await db.berandaCTA.upsert({
    where: { id: 'default-cta' },
    update: {},
    create: {
      id: 'default-cta',
      title: 'Siap Menjelajahi Tanjung Barat?',
      description: 'Temukan informasi lengkap mengenai pelayanan dan potensi wisata yang kami tawarkan.',
      buttonText: 'Mulai Jelajah'
    }
  })
  console.log('  ✓ CTA section')

  // ============ PROFIL ============
  console.log('\n📍 Inisialisasi Halaman Profil...')

  // History
  const history = await db.profilHistory.upsert({
    where: { id: 'default-history' },
    update: {},
    create: {
      id: 'default-history',
      content: 'Tanjung Barat berdiri sejak tahun 1985 sebagai salah satu kelurahan di Kecamatan Jagakarsa, Jakarta Selatan. Sejak awal berdirinya, Tanjung Barat telah berkembang menjadi daerah yang maju dengan berbagai fasilitas dan potensi yang menunjang kesejahteraan warganya. Dengan semangat gotong royong dan kepedulian terhadap lingkungan, Tanjung Barat terus bertransformasi menjadi kelurahan yang modern namun tetap menjaga nilai-nilai lokal.'
    }
  })
  console.log('  ✓ History')

  // Milestones
  const milestones = [
    { year: '1985', event: 'Kelurahan Tanjung Barat berdiri' },
    { year: '1995', event: 'Pembangunan fasilitas umum pertama' },
    { year: '2005', event: 'Pengembangan area taman dan ruang terbuka' },
    { year: '2010', event: 'Peningkatan pelayanan publik' },
    { year: '2015', event: 'Pembangunan pusat komunitas' },
    { year: '2020', event: 'Digitalisasi pelayanan warga' }
  ]

  await db.profilMilestone.deleteMany()
  for (const milestone of milestones) {
    await db.profilMilestone.create({
      data: {
        ...milestone,
        order: milestones.indexOf(milestone) + 1
      }
    })
  }
  console.log('  ✓ 6 Milestones')

  // Achievements
  const achievements = [
    { title: 'Kelurahan Terbaik 2023', description: 'Penghargaan atas inovasi pelayanan publik' },
    { title: 'Kecamatan Hijau', description: 'Penghargaan lingkungan hidup terbaik' },
    { title: 'Adipura', description: 'Penghargaan kebersihan kota' }
  ]

  await db.profilAchievement.deleteMany()
  for (const achievement of achievements) {
    await db.profilAchievement.create({
      data: {
        ...achievement,
        order: achievements.indexOf(achievement) + 1,
        isActive: true
      }
    })
  }
  console.log('  ✓ 3 Achievements')

  // Visi
  const visi = await db.profilVisi.upsert({
    where: { content: 'Menjadi kelurahan yang unggul, sejahtera, dan berbudaya dengan pelayanan publik yang prima.' },
    update: {},
    create: {
      content: 'Menjadi kelurahan yang unggul, sejahtera, dan berbudaya dengan pelayanan publik yang prima.'
    }
  })
  console.log('  ✓ Visi')

  // Misi
  const missions = [
    'Meningkatkan kualitas pelayanan publik yang transparan dan akuntabel',
    'Mengembangkan ekonomi kreatif dan usaha mikro kecil menengah',
    'Menjaga dan melestarikan lingkungan yang asri dan berkelanjutan',
    'Meningkatkan kualitas sumber daya manusia melalui pendidikan dan pelatihan',
    'Mempererat kerjasama antara pemerintah dan masyarakat',
    'Mengembangkan infrastruktur yang mendukung kebutuhan warga'
  ]

  await db.profilMisi.deleteMany()
  for (const mission of missions) {
    await db.profilMisi.create({
      data: {
        content: mission,
        order: missions.indexOf(mission) + 1,
        isActive: true
      }
    })
  }
  console.log('  ✓ 6 Misi')

  // Organizational Structure
  const orgStructure = [
    { name: '', position: 'Lurah', level: 1 },
    { name: '', position: 'Sekretaris Kelurahan', level: 2 },
    { name: '', position: 'Kasi Pemerintahan', level: 2 },
    { name: '', position: 'Kasi Kesejahteraan Sosial', level: 2 },
    { name: '', position: 'Kasi Pemberdayaan Masyarakat', level: 2 },
    { name: '', position: 'Kasi Trantib', level: 2 },
    { name: '', position: 'Kasi Ekonomi & Pembangunan', level: 2 }
  ]

  await db.profilOrgStructure.deleteMany()
  for (const org of orgStructure) {
    await db.profilOrgStructure.create({
      data: {
        ...org,
        order: orgStructure.indexOf(org) + 1,
        isActive: true
      }
    })
  }
  console.log('  ✓ 7 Organizational Structure')

  // Geographic Info
  const geoInfo = [
    { label: 'Luas Wilayah', value: '185 Ha' },
    { label: 'Jumlah RW', value: '12' },
    { label: 'Jumlah RT', value: '145' },
    { label: 'Jumlah Penduduk', value: '50.234' },
    { label: 'Kepadatan', value: '271 Jiwa/Ha' }
  ]

  await db.profilGeoInfo.deleteMany()
  for (const geo of geoInfo) {
    await db.profilGeoInfo.create({
      data: {
        ...geo,
        order: geoInfo.indexOf(geo) + 1,
        isActive: true
      }
    })
  }
  console.log('  ✓ 5 Geographic Info')

  // Area Description
  const areaDesc = await db.profilAreaDescription.upsert({
    where: { content: 'Tanjung Barat terletak di ketinggian 25-50 meter di atas permukaan laut dengan iklim tropis yang sejuk dan nyaman. Wilayah ini memiliki area perumahan yang padat namun tetap menyisakan ruang terbuka hijau yang cukup. Transportasi umum mudah diakses dengan adanya TransJakarta, angkot, dan ojek online. Fasilitas pendidikan, kesehatan, dan perbelanjaan tersedia lengkap di sekitar wilayah.' },
    update: {},
    create: {
      content: 'Tanjung Barat terletak di ketinggian 25-50 meter di atas permukaan laut dengan iklim tropis yang sejuk dan nyaman. Wilayah ini memiliki area perumahan yang padat namun tetap menyisakan ruang terbuka hijau yang cukup. Transportasi umum mudah diakses dengan adanya TransJakarta, angkot, dan ojek online. Fasilitas pendidikan, kesehatan, dan perbelanjaan tersedia lengkap di sekitar wilayah.'
    }
  })
  console.log('  ✓ Area Description')

  // ============ PELAYANAN ============
  console.log('\n📍 Inisialisasi Halaman Pelayanan...')

  // Hero
  const pelayananHero = await db.pelayananHero.upsert({
    where: { id: 'default-hero' },
    update: {},
    create: {
      id: 'default-hero',
      title: 'Pelayanan Publik Tanjung Barat',
      description: 'Kami menyediakan berbagai layanan untuk memenuhi kebutuhan warga dengan cepat, transparan, dan profesional.'
    }
  })
  console.log('  ✓ Pelayanan Hero')

  // Important Info
  const importantInfos = [
    { icon: 'Clock', title: 'Jam Operasional', content: 'Senin - Jumat: 08:00 - 16:00 WIB' },
    { icon: 'Phone', title: 'Layanan Darurat', content: 'Hubungi: (021) 7891975' },
    { icon: 'FileText', title: 'Persyaratan Umum', content: 'KTP, KK, dan formulir yang telah diisi' }
  ]

  await db.pelayananImportantInfo.deleteMany()
  for (const info of importantInfos) {
    await db.pelayananImportantInfo.create({
      data: {
        ...info,
        order: importantInfos.indexOf(info) + 1,
        isActive: true
      }
    })
  }
  console.log('  ✓ 3 Important Info')

  // Categories
  const categories = [
    { category: 'Administrasi', icon: 'FileText', order: 1 },
    { category: 'Kependudukan', icon: 'Users', order: 2 },
    { category: 'Kesehatan', icon: 'Heart', order: 3 },
    { category: 'Sosial', icon: 'HandHeart', order: 4 }
  ]

  await db.pelayananCategory.deleteMany()
  const createdCategories = await Promise.all(
    categories.map(cat => db.pelayananCategory.create({
      data: {
        ...cat,
        isActive: true
      }
    }))
  )
  console.log('  ✓ 4 Categories')

  // Services
  const services = [
    {
      categoryId: createdCategories[0].id,
      title: 'Pembuatan Surat Keterangan',
      description: 'Pengurusan surat keterangan domisili, tidak mampu, dll.',
      requirements: 'KTP, KK, Pas Foto 3x4',
      processingTime: '1-2 hari kerja'
    },
    {
      categoryId: createdCategories[0].id,
      title: 'Pembuatan Surat Pengantar',
      description: 'Surat pengantar untuk berbagai keperluan',
      requirements: 'KTP, KK, Surat Permohonan',
      processingTime: '1 hari kerja'
    },
    {
      categoryId: createdCategories[0].id,
      title: 'Legalisir Dokumen',
      description: 'Legalisir dokumen kelurahan',
      requirements: 'Dokumen asli dan fotokopi',
      processingTime: '1 hari kerja'
    },
    {
      categoryId: createdCategories[1].id,
      title: 'KTP Elektronik',
      description: 'Perekaman dan pencetakan KTP-el',
      requirements: 'KK, Akta Kelahiran',
      processingTime: '14 hari kerja'
    },
    {
      categoryId: createdCategories[1].id,
      title: 'Kartu Keluarga',
      description: 'Pembuatan dan pembaruan KK',
      requirements: 'KTP, Buku Nikah/Akta Cerai',
      processingTime: '7 hari kerja'
    },
    {
      categoryId: createdCategories[1].id,
      title: 'Akta Kelahiran',
      description: 'Pembuatan akta kelahiran baru',
      requirements: 'Surat Keterangan Lahir, KTP ortu',
      processingTime: '14 hari kerja'
    },
    {
      categoryId: createdCategories[1].id,
      title: 'Akta Kematian',
      description: 'Pembuatan akta kematian',
      requirements: 'Surat Keterangan Kematian, KTP almarhum',
      processingTime: '7 hari kerja'
    },
    {
      categoryId: createdCategories[2].id,
      title: 'Pemeriksaan Kesehatan',
      description: 'Pemeriksaan kesehatan dasar gratis',
      requirements: 'KTP, KK',
      processingTime: '1-2 jam'
    },
    {
      categoryId: createdCategories[2].id,
      title: 'Imunisasi',
      description: 'Layanan imunisasi rutin',
      requirements: 'KTP Anak, Kartu Imunisasi',
      processingTime: '30 menit'
    },
    {
      categoryId: createdCategories[2].id,
      title: 'Konsultasi Gizi',
      description: 'Konsultasi gizi dan kesehatan ibu anak',
      requirements: 'KTP',
      processingTime: '1 jam'
    },
    {
      categoryId: createdCategories[3].id,
      title: 'Bantuan Sosial',
      description: 'Program bantuan sosial untuk warga',
      requirements: 'KTP, KK, Surat Keterangan Tidak Mampu',
      processingTime: '7-14 hari'
    },
    {
      categoryId: createdCategories[3].id,
      title: 'Pelatihan Keterampilan',
      description: 'Pelatihan keterampilan untuk meningkatkan ekonomi',
      requirements: 'KTP, KK',
      processingTime: 'Sesuai jadwal'
    },
    {
      categoryId: createdCategories[3].id,
      title: 'Posyandu Lansia',
      description: 'Pelayanan kesehatan untuk lansia',
      requirements: 'KTP Lansia',
      processingTime: '2-3 jam'
    }
  ]

  await db.pelayananService.deleteMany()
  for (const service of services) {
    await db.pelayananService.create({
      data: {
        ...service,
        order: services.indexOf(service) + 1,
        isActive: true
      }
    })
  }
  console.log('  ✓ 13 Services')

  // CTA
  const pelayananCTA = await db.pelayananCTA.upsert({
    where: { id: 'default-cta' },
    update: {},
    create: {
      id: 'default-cta',
      title: 'Perlu Bantuan Pelayanan?',
      description: 'Hubungi kami untuk informasi lebih lanjut atau datang langsung ke kantor kelurahan.',
      button1: 'Hubungi Kami',
      button2: 'Lihat Persyaratan'
    }
  })
  console.log('  ✓ Pelayanan CTA')

  // ============ POTENSI WISATA ============
  console.log('\n📍 Inisialisasi Halaman Potensi Wisata...')

  // Hero
  const potensiHero = await db.potensiHero.upsert({
    where: { id: 'default-hero' },
    update: {},
    create: {
      id: 'default-hero',
      title: 'Potensi & Wisata Tanjung Barat',
      description: 'Temukan berbagai tempat menarik, kuliner lezat, dan fasilitas umum yang tersedia di Tanjung Barat.'
    }
  })
  console.log('  ✓ Potensi Hero')

  // Categories
  await db.potensiCategory.deleteMany()
  const potensiCategories = await Promise.all([
    db.potensiCategory.create({
      data: {
        name: 'Wisata',
        deskripsi: 'Destinasi wisata menarik di Tanjung Barat',
        icon: 'MapPin',
        order: 1,
        isActive: true
      }
    }),
    db.potensiCategory.create({
      data: {
        name: 'Kuliner',
        deskripsi: 'Tempat makan dan kuliner lokal yang lezat',
        icon: 'UtensilsCrossed',
        order: 2,
        isActive: true
      }
    }),
    db.potensiCategory.create({
      data: {
        name: 'Taman & Ruang Terbuka',
        deskripsi: 'Taman dan area hijau untuk bersantai',
        icon: 'TreePine',
        order: 3,
        isActive: true
      }
    }),
    db.potensiCategory.create({
      data: {
        name: 'Fasilitas Umum',
        deskripsi: 'Fasilitas umum dan kebutuhan warga',
        icon: 'Building2',
        order: 4,
        isActive: true
      }
    })
  ])
  console.log('  ✓ 4 Potensi Categories')

  // Places
  await db.potensiPlace.deleteMany()

  const wisataPlaces = [
    'Waduk Tanjung Barat',
    'Panggung Kesenian Tanjung Barat',
    'Taman Bermain Anak',
    'Situ Babakan',
    'Area Sepeda Santai',
    'Pusat Olahraga Warga',
    'Lapangan Bulutangkis',
    'Area Memancing'
  ]

  for (const nama of wisataPlaces) {
    await db.potensiPlace.create({
      data: {
        categoryId: potensiCategories[0].id,
        nama: nama,
        alamat: 'Tanjung Barat',
        order: wisataPlaces.indexOf(nama) + 1,
        isActive: true
      }
    })
  }
  console.log('  ✓ 8 Wisata Places')

  const kulinerPlaces = [
    'Warung Makan Sederhana',
    'Sate Khas Tanjung Barat',
    'Nasi Uduk Betawi',
    'Es Teler Seger',
    'Gado-Gado Jakarta',
    'Soto Betawi Asli',
    'Warung Kopi Warga',
    'Pecel Lele Goreng',
    'Ayam Bakar Tanjung Barat',
    'Sate Ayam Madura'
  ]

  for (const nama of kulinerPlaces) {
    await db.potensiPlace.create({
      data: {
        categoryId: potensiCategories[1].id,
        nama: nama,
        alamat: 'Tanjung Barat',
        order: kulinerPlaces.indexOf(nama) + 1,
        isActive: true
      }
    })
  }
  console.log('  ✓ 10 Kuliner Places')

  const tamanPlaces = [
    'Taman Waduk',
    'Lapangan Olahraga',
    'Jalur Lari Santai',
    'Area Yoga',
    'Taman Baca',
    'Area Skateboard',
    'Taman Anak',
    'Area Piknik Keluarga',
    'Jogging Track',
    'Area Senam'
  ]

  for (const nama of tamanPlaces) {
    await db.potensiPlace.create({
      data: {
        categoryId: potensiCategories[2].id,
        nama: nama,
        alamat: 'Tanjung Barat',
        order: tamanPlaces.indexOf(nama) + 1,
        isActive: true
      }
    })
  }
  console.log('  ✓ 10 Taman Places')

  const fasilitasPlaces = [
    'Posyandu Lansia',
    'Puskesmas Pembantu',
    'Pos Kamling',
    'Musholla Al-Hidayah',
    'TPA Tanjung Barat',
    'Pasar Kaget',
    'Laundry Koin',
    'ATM Center',
    'Kantin Posyandu',
    'Ruang Kerja Warga'
  ]

  for (const nama of fasilitasPlaces) {
    await db.potensiPlace.create({
      data: {
        categoryId: potensiCategories[3].id,
        nama: nama,
        alamat: 'Tanjung Barat',
        order: fasilitasPlaces.indexOf(nama) + 1,
        isActive: true
      }
    })
  }
  console.log('  ✓ 10 Fasilitas Places')

  // ============ BERITA ============
  console.log('\n📍 Inisialisasi Halaman Berita...')

  // Hero
  const beritaHero = await db.beritaHero.upsert({
    where: { id: 'default-hero' },
    update: {},
    create: {
      id: 'default-hero',
      title: 'Berita Tanjung Barat',
      description: 'Dapatkan informasi terbaru seputar kegiatan dan perkembangan di Tanjung Barat.'
    }
  })
  console.log('  ✓ Berita Hero')

  // News Items
  const newsItems = [
    {
      title: 'Pembukaan Taman Baru di Tanjung Barat',
      description: 'Warga Tanjung Barat kini memiliki ruang terbuka hijau baru yang dapat dimanfaatkan untuk berbagai aktivitas rekreasi dan olahraga.',
      date: '15 Januari 2026',
      content: 'Pemerintah Kelurahan Tanjung Barat meresmikan taman baru yang dilengkapi dengan fasilitas bermain anak, jogging track, dan area duduk untuk bersantai. Taman ini diharapkan dapat meningkatkan kualitas hidup warga dan menciptakan lingkungan yang lebih hijau.',
      category: 'Lingkungan',
      author: 'Admin Kelurahan'
    },
    {
      title: 'Pelatihan Keterampilan untuk Warga',
      description: 'Program pelatihan keterampilan gratis diadakan untuk membantu warga meningkatkan kompetensi dan peluang usaha.',
      date: '12 Januari 2026',
      content: 'Sebanyak 50 warga mengikuti pelatihan keterampilan menciptakan produk kerajinan dan kuliner. Program ini bertujuan untuk memberikan modal keterampilan agar warga dapat membuka usaha mandiri.',
      category: 'Pemberdayaan',
      author: 'Admin Kelurahan'
    },
    {
      title: 'Lomba Kebersihan Antar RW',
      description: 'Lomba kebersihan tahunan kembali digelar untuk meningkatkan kesadaran warga akan pentingnya lingkungan yang bersih.',
      date: '10 Januari 2026',
      content: 'Lomba kebersihan ini diikuti oleh 12 RW dengan kriteria penilaian meliputi kebersihan lingkungan, pengelolaan sampah, dan keberadaan taman baca. Pemenang akan mendapatkan penghargaan dan insentif dari kelurahan.',
      category: 'Lingkungan',
      author: 'Admin Kelurahan'
    },
    {
      title: 'Pemeriksaan Kesehatan Gratis',
      description: 'Posyandu melaksanakan pemeriksaan kesehatan gratis bagi lansia dan anak-anak setiap bulan.',
      date: '8 Januari 2026',
      content: 'Pemeriksaan kesehatan meliputi cek tensi, gula darah, kolesterol, dan konsultasi gizi. Kegiatan ini rutin diadakan setiap bulan sebagai bagian dari program kesehatan kelurahan.',
      category: 'Kesehatan',
      author: 'Admin Kelurahan'
    }
  ]

  await db.beritaItem.deleteMany()
  for (const news of newsItems) {
    await db.beritaItem.create({
      data: {
        ...news,
        isActive: true
      }
    })
  }
  console.log('  ✓ 4 News Items')

  // ============ KONTAK ============
  console.log('\n📍 Inisialisasi Halaman Kontak...')

  // Hero
  const kontakHero = await db.kontakHero.upsert({
    where: { id: 'default-hero' },
    update: {},
    create: {
      id: 'default-hero',
      title: 'Hubungi Kami',
      description: 'Jangan ragu untuk menghubungi kami jika Anda memiliki pertanyaan atau membutuhkan bantuan.'
    }
  })
  console.log('  ✓ Kontak Hero')

  // Info Items
  const kontakInfoItems = [
    {
      icon: 'MapPin',
      title: 'Alamat',
      content: 'Jl. Rancho Indah, RT 08/RW 02, Tanjung Barat, Kecamatan Jagakarsa, Jakarta Selatan'
    },
    {
      icon: 'Phone',
      title: 'Telepon',
      content: '(021) 7891975'
    },
    {
      icon: 'Mail',
      title: 'Email',
      content: 'kelurahan@tanjungbarat.go.id'
    },
    {
      icon: 'Clock',
      title: 'Jam Operasional',
      content: 'Senin - Jumat: 08:00 - 16:00 WIB'
    }
  ]

  await db.kontakInfoItem.deleteMany()
  for (const item of kontakInfoItems) {
    await db.kontakInfoItem.create({
      data: {
        ...item,
        order: kontakInfoItems.indexOf(item) + 1,
        isActive: true
      }
    })
  }
  console.log('  ✓ 4 Kontak Info Items')

  // Office
  const office = await db.kontakOffice.upsert({
    where: { id: 'default-office' },
    update: {},
    create: {
      id: 'default-office',
      name: 'Kantor Kelurahan Tanjung Barat',
      address: 'Jl. Rancho Indah, RT 08/RW 02',
      city: 'Tanjung Barat, Kecamatan Jagakarsa, Jakarta Selatan, DKI Jakarta 12530',
      phone: '(021) 7891975',
      fax: '(021) 7891976',
      email: 'kelurahan@tanjungbarat.go.id',
      whatsapp: '+6281234567890'
    }
  })
  console.log('  ✓ Office Info')

  // Social Media
  const socialMedia = [
    { platform: 'Facebook', url: 'https://facebook.com/tanjungbarat', icon: 'facebook' },
    { platform: 'Instagram', url: 'https://instagram.com/tanjungbarat', icon: 'instagram' },
    { platform: 'Twitter', url: 'https://twitter.com/tanjungbarat', icon: 'twitter' },
    { platform: 'YouTube', url: 'https://youtube.com/tanjungbarat', icon: 'youtube' }
  ]

  await db.kontakSocialMedia.deleteMany()
  for (const social of socialMedia) {
    await db.kontakSocialMedia.create({
      data: {
        ...social,
        order: socialMedia.indexOf(social) + 1,
        isActive: true
      }
    })
  }
  console.log('  ✓ 4 Social Media')

  // Additional Info
  const additionalInfo = await db.kontakAdditionalInfo.upsert({
    where: { content: 'Untuk keperluan darurat di luar jam kerja, silakan hubungi petugas jaga atau Pos Kamling terdekat.' },
    update: {},
    create: {
      content: 'Untuk keperluan darurat di luar jam kerja, silakan hubungi petugas jaga atau Pos Kamling terdekat.'
    }
  })
  console.log('  ✓ Additional Info')

  console.log('\n✅ Inisialisasi Database Selesai!')
  console.log('\n📊 Ringkasan Data:')
  console.log('   ✓ Beranda: Hero, Why, 4 Features, 4 Statistics, News Header, CTA')
  console.log('   ✓ Profil: History, 6 Milestones, 3 Achievements, Visi, 6 Misi, 7 Org, 5 Geo, Area')
  console.log('   ✓ Pelayanan: Hero, 3 Info, 4 Categories, 13 Services, CTA')
  console.log('   ✓ Potensi Wisata: Hero, 4 Categories, 38 Places')
  console.log('   ✓ Berita: Hero, 4 News Items')
  console.log('   ✓ Kontak: Hero, 4 Info, Office, 4 Social, Additional')
}

main()
  .catch((e) => {
    console.error('❌ Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })

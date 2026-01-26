import { db } from './src/lib/db'

async function main() {
  console.log('Memulai inisialisasi data...')

  // Bersihkan data lama
  await db.potensiPlace.deleteMany()
  await db.potensiCategory.deleteMany()

  // Kategori Potensi Wisata
  const categories = [
    {
      name: 'Wisata',
      deskripsi: 'Destinasi wisata menarik di Tanjung Barat',
      icon: 'MapPin',
      order: 1,
      isActive: true
    },
    {
      name: 'Kuliner',
      deskripsi: 'Tempat makan dan kuliner lokal yang lezat',
      icon: 'UtensilsCrossed',
      order: 2,
      isActive: true
    },
    {
      name: 'Taman & Ruang Terbuka',
      deskripsi: 'Taman dan area hijau untuk bersantai',
      icon: 'TreePine',
      order: 3,
      isActive: true
    },
    {
      name: 'Fasilitas Umum',
      deskripsi: 'Fasilitas umum dan kebutuhan warga',
      icon: 'Building2',
      order: 4,
      isActive: true
    }
  ]

  const createdCategories = await Promise.all(
    categories.map(cat => db.potensiCategory.create({ data: cat }))
  )

  console.log(`Created ${createdCategories.length} categories`)

  // Tempat Wisata (8 tempat)
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
        categoryId: createdCategories[0].id,
        nama: nama,
        alamat: 'Tanjung Barat',
        order: wisataPlaces.indexOf(nama) + 1,
        isActive: true
      }
    })
  }
  console.log(`Created ${wisataPlaces.length} Wisata places`)

  // Kuliner (10 tempat)
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
        categoryId: createdCategories[1].id,
        nama: nama,
        alamat: 'Tanjung Barat',
        order: kulinerPlaces.indexOf(nama) + 1,
        isActive: true
      }
    })
  }
  console.log(`Created ${kulinerPlaces.length} Kuliner places`)

  // Taman & Ruang Terbuka (10 tempat)
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
        categoryId: createdCategories[2].id,
        nama: nama,
        alamat: 'Tanjung Barat',
        order: tamanPlaces.indexOf(nama) + 1,
        isActive: true
      }
    })
  }
  console.log(`Created ${tamanPlaces.length} Taman places`)

  // Fasilitas Umum (10 tempat)
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
        categoryId: createdCategories[3].id,
        nama: nama,
        alamat: 'Tanjung Barat',
        order: fasilitasPlaces.indexOf(nama) + 1,
        isActive: true
      }
    })
  }
  console.log(`Created ${fasilitasPlaces.length} Fasilitas places`)

  // Cek data
  const totalCategories = await db.potensiCategory.count()
  const totalPlaces = await db.potensiPlace.count()

  console.log('\n=== Inisialisasi Selesai ===')
  console.log(`Total Kategori: ${totalCategories}`)
  console.log(`Total Tempat: ${totalPlaces}`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })

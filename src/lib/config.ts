// Konfigurasi Website Tanjung Barat
// Ubah file ini untuk mengubah informasi yang muncul di chatbot

export const TANJUNG_BARAT_CONFIG = {
  // Informasi Kontak
  alamatKantor: {
    nama: 'Kantor Kelurahan Tanjung Barat',
    alamat: 'Jl. Rancho Indah, RT 08/RW 02, Tanjung Barat, Kecamatan Jagakarsa, Kota Administrasi Jakarta Selatan, DKI Jakarta 12530, Indonesia',
    telepon: '(021) 7891975',
    wa: '(021) 061-231-316',
  },

  // Informasi Wilayah
  wilayah: {
    nama: 'Tanjung Barat',
    lokasi: 'Tanjung Barat, South Jakarta, DKI Jakarta 12530',
    luas: '450 hektar',
    penduduk: '50,000+ penduduk',
  },

  // Struktur Organisasi (Lengkap dengan NIP, dll)
  organisasi: {
    lurah: {
      nama: 'H. Ahmad Subandi, S.Sos., M.Si.',
      nip: '197501152000031001',
      jabatan: 'Lurah',
      masaJabatan: '2020–2025',
      deskripsi: 'Sebagai pimpinan tertinggi di kelurahan, lurah bertanggung jawab atas seluruh urusan pemerintahan dan pelayanan masyarakat.',
    },
    sekretaris: {
      nama: 'Dra. Siti Nurjanah',
      nip: '197805102001122002',
      jabatan: 'Sekretaris Kelurahan',
      deskripsi: 'Memimpin urusan administrasi umum dan membantu lurah dalam koordinasi internal.',
    },
    kepalaBidang: [
      {
        bidang: 'Pemerintahan',
        nama: 'Budi Santoso, S.Sos.',
        nip: '198203152005011003',
        jabatan: 'Kasi Pemerintahan',
        deskripsi: 'Mengelola urusan pemerintahan, administrasi, dan kependudukan.',
      },
      {
        bidang: 'Kesehatan Sosial',
        nama: 'Rina Wati, S.Sos.',
        nip: '198506202008012004',
        jabatan: 'Kasi Kesehatan Sosial',
        deskripsi: 'Bertanggung jawab atas pelayanan kesehatan dan bantuan sosial masyarakat.',
      },
      {
        bidang: 'Pelayanan',
        nama: 'Andi Prasetyo, A.Md.',
        nip: '198809152010011005',
        jabatan: 'Kasi Pelayanan',
        deskripsi: 'Mengkoordinasikan pelayanan publik dan memastikan pelayanan yang optimal.',
      },
      {
        bidang: 'Kependudukan & Ketertiban',
        nama: 'Agus Setiawan, S.H.',
        nip: '199001102012011006',
        jabatan: 'Kasi Ketentraman',
        deskripsi: 'Mengelola urusan ketertiban, keamanan, dan tata tertib wilayah.',
      },
    ],
    bendahara: {
      nama: 'Dewi Lestari, S.E.',
      nip: '199205152015012007',
      jabatan: 'Bendahara Kelurahan',
      deskripsi: 'Mengelola urusan keuangan, anggaran, dan administrasi keuangan kelurahan.',
    },
  },

  // Jam Operasional Kantor
  kantor: {
    buka: '08:00',
    tutup: '16:00',
    hariBuka: 'Senin-Jumat',
    hariTutup: 'Sabtu-Minggu',
  },

  // Jam Kerja Pelayanan
  pelayanan: {
    ktp: {
      lamaProses: '7-14 hari kerja',
      syarat: [
        'Kartu Keluarga (KK)',
        'Surat Pengantar RT/RW',
        'Pas foto 3x4',
      ],
    },
    kk: {
      lamaProses: '3-7 hari kerja',
      syarat: [
        'KTP suami dan istri',
        'Buku Nikah atau Akta Cerai',
        'Surat Pengantar RT/RW',
      ],
    },
  },

  // Destinasi Wisata (Legacy config for other pages)
  wisata: [
    {
      nama: 'Taman Kota Tanjung Barat',
      deskripsi: 'Taman asri dengan fasilitas bermain anak',
      icon: '🌳',
    },
    {
      nama: 'Situ (Danau) Tanjung Barat',
      deskripsi: 'Danau dengan pemandangan indah',
      icon: '🏞️',
    },
    {
      nama: 'Kuliner Tradisional Pasar Minggu',
      deskripsi: 'Berbagai makanan khas',
      icon: '🍜',
    },
    {
      nama: 'Museum Sejarah Lokal',
      deskripsi: 'Koleksi sejarah dan budaya',
      icon: '🏛️',
    },
  ],

  // Pelayanan yang Tersedia
  pelayananList: [
    'Administrasi Kependudukan (KTP, KK, Akta Kelahiran)',
    'Pelayanan Sosial (Bansos, Kesehatan Lansia)',
    'Perizinan & Fasilitas (Domisili, Izin Keramaian)',
    'Pengaduan & Konsultasi',
  ],

  // Berita Terbaru
  beritaTerbaru: [
    {
      tanggal: '15 Januari 2025',
      judul: 'Peresmian Taman Baru',
      deskripsi: 'Wali kota meresmikan taman baru yang dilengkapi dengan fasilitas bermain anak dan area olahraga',
      icon: '✅',
    },
    {
      tanggal: '12 Januari 2025',
      judul: 'Program Kesehatan Gratis untuk Lansia',
      deskripsi: 'Pemerintah setempat memulai program kesehatan gratis bagi warga lansia di seluruh Tanjung Barat',
      icon: '✅',
    },
    {
      tanggal: '10 Januari 2025',
      judul: 'Penghargaan Adipura untuk Kebersihan',
      deskripsi: 'Tanjung Barat kembali meraih penghargaan Adipura berkat keberhasilan dalam menjaga kebersihan lingkungan',
      icon: '✅',
    },
  ],

  // Potensi & Wisata (List Lengkap)
  potensiWisata: {
    kategori: [
      {
        id: 'wisata',
        nama: 'Wisata',
        icon: '🛍️',
        deskripsi: 'Belanja & Hiburan Umum',
        tempat: [
          { nama: 'AEON Mall Tanjung Barat', alamat: 'Jl. Tanjung Barat Raya No. 163, Tanjung Barat, Jagakarsa, Jakarta Selatan' },
        ],
      },
      {
        id: 'kuliner',
        nama: 'Kuliner',
        icon: '🍽️',
        deskripsi: 'Kuliner & Tempat Nongkrong',
        tempat: [
          { nama: 'Sate Klathak Pak Man Tanjung Barat', alamat: 'Jl. Raya Tanjung Barat, Tanjung Barat, Jagakarsa, Jakarta Selatan' },
          { nama: 'Rawon Dengkul Rawone', alamat: 'Jl. TB Simatupang No. 52C, Tanjung Barat, Jagakarsa, Jakarta Selatan' },
          { nama: 'Warung Nasi Ampera Tanjung Barat', alamat: 'Jl. TB Simatupang, Tanjung Barat, Jagakarsa, Jakarta Selatan' },
          { nama: 'Javatoscana Garden Resto & Café', alamat: 'Jl. Raya Tanjung Barat No. 148B, Tanjung Barat, Jagakarsa, Jakarta Selatan' },
          { nama: 'Bakmi Jogja Mbah Surip', alamat: 'Jl. Tanjung Barat Lama, Tanjung Barat, Jagakarsa, Jakarta Selatan' },
          { nama: 'Rumah Bakso Bakmie & Seafood', alamat: 'Jl. Rancho Indah, Tanjung Barat, Jagakarsa, Jakarta Selatan' },
        ],
      },
      {
        id: 'taman',
        nama: 'Taman',
        icon: '🌿',
        deskripsi: 'Taman & Ruang Terbuka',
        tempat: [
          { nama: 'Taman Gintung Tanjung Barat', alamat: 'Jl. Gintung, Tanjung Barat, Jagakarsa, Jakarta Selatan' },
          { nama: 'Janggrek Park', alamat: 'Jl. Raya Tanjung Barat, Tanjung Barat, Jagakarsa, Jakarta Selatan' },
          { nama: 'Tanjung 2 Park', alamat: 'Jl. TB Simatupang, Tanjung Barat, Jagakarsa, Jakarta Selatan' },
          { nama: 'Saung Nan', alamat: 'Jl. H. M. Yunus I, Tanjung Barat, Jagakarsa, Jakarta Selatan' },
        ],
      },
      {
        id: 'olahraga',
        nama: 'Olahraga',
        icon: '🏃',
        deskripsi: 'Olahraga & Kebugaran',
        tempat: [
          { nama: 'Lapangan Futsal Tanjung Barat', alamat: 'Jl. Tanjung Barat Dalam, Tanjung Barat, Jagakarsa, Jakarta Selatan' },
          { nama: 'GOR Mini Tanjung Barat', alamat: 'Jl. Rancho Indah, Tanjung Barat, Jagakarsa, Jakarta Selatan' },
          { nama: 'Lapangan Basket RW Tanjung Barat', alamat: 'Jl. Raya Tanjung Barat, Tanjung Barat, Jagakarsa, Jakarta Selatan' },
          { nama: 'Fitness Outdoor Taman Gintung', alamat: 'Jl. Gintung, Tanjung Barat, Jagakarsa, Jakarta Selatan' },
        ],
      },
      {
        id: 'otomotif',
        nama: 'Otomotif',
        icon: '🚗',
        deskripsi: 'Otomotif & Komunitas Kendaraan',
        tempat: [
          { nama: 'Bengkel Mobil TB Simatupang', alamat: 'Jl. TB Simatupang, Tanjung Barat, Jagakarsa, Jakarta Selatan' },
          { nama: 'AHASS Motor Tanjung Barat', alamat: 'Jl. Raya Tanjung Barat, Tanjung Barat, Jagakarsa, Jakarta Selatan' },
          { nama: 'Bengkel Motor Rancho Indah', alamat: 'Jl. Rancho Indah, Tanjung Barat, Jagakarsa, Jakarta Selatan' },
          { nama: 'Cuci Mobil & Motor Tanjung Barat', alamat: 'Jl. Tanjung Barat Dalam, Tanjung Barat, Jagakarsa, Jakarta Selatan' },
        ],
      },
      {
        id: 'transportasi',
        nama: 'Transportasi',
        icon: '🚆',
        deskripsi: 'Transportasi & Akses Publik',
        tempat: [
          { nama: 'Stasiun KRL Tanjung Barat', alamat: 'Jl. Tanjung Barat Raya, Tanjung Barat, Jagakarsa, Jakarta Selatan' },
          { nama: 'Halte Transjakarta Tanjung Barat', alamat: 'Jl. TB Simatupang, Tanjung Barat, Jagakarsa, Jakarta Selatan' },
          { nama: 'Terminal Angkot Tanjung Barat', alamat: 'Jl. Raya Tanjung Barat, Tanjung Barat, Jagakarsa, Jakarta Selatan' },
        ],
      },
      {
        id: 'religi',
        nama: 'Religi',
        icon: '🕌',
        deskripsi: 'Religi & Kegiatan Keagamaan',
        tempat: [
          { nama: 'Masjid Jami Al-Makmur Tanjung Barat', alamat: 'Jl. Raya Tanjung Barat, Tanjung Barat, Jagakarsa, Jakarta Selatan' },
          { nama: 'Masjid Al-Ikhlas Tanjung Barat', alamat: 'Jl. Rancho Indah, Tanjung Barat, Jagakarsa, Jakarta Selatan' },
          { nama: 'Musholla Al-Hidayah', alamat: 'Jl. Tanjung Barat Dalam, Tanjung Barat, Jagakarsa, Jakarta Selatan' },
          { nama: 'Gereja Katolik St. Stefanus (wilayah Tanjung Barat)', alamat: 'Jl. Raya Tanjung Barat, Tanjung Barat, Jagakarsa, Jakarta Selatan' },
        ],
      },
      {
        id: 'edukasi',
        nama: 'Edukasi',
        icon: '🧑',
        deskripsi: 'Edukasi & Komunitas',
        tempat: [
          { nama: 'RPTRA Tanjung Barat', alamat: 'Jl. Tanjung Barat Dalam, Tanjung Barat, Jagakarsa, Jakarta Selatan' },
          { nama: 'Perpustakaan Kelurahan Tanjung Barat', alamat: 'Jl. Rancho Indah, Tanjung Barat, Jagakarsa, Jakarta Selatan' },
          { nama: 'Balai Warga Tanjung Barat', alamat: 'Jl. Raya Tanjung Barat, Tanjung Barat, Jagakarsa, Jakarta Selatan' },
        ],
      },
    ],
  },
}

// Export individual untuk kemudahan
export const { alamatKantor, wilayah, organisasi, kantor, pelayanan, wisata, pelayananList, beritaTerbaru, potensiWisata } = TANJUNG_BARAT_CONFIG

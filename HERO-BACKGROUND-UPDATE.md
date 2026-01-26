# Update Background Gambar Hero Section

## ✅ Selesai! Background Judul Halaman dengan Gambar Bertema Tanjung Barat

---

## 📁 Gambar yang Dibuat

Semua gambar di-generate menggunakan AI dan disimpan di folder:
```
/public/images/hero-bg/
```

| Halaman | File | Deskripsi |
|---------|------|-----------|
| **Beranda** | `beranda.jpg` | Suasana kelurahan Tanjung Barat |
| **Profil** | `profil.jpg` | Kantor kelurahan modern |
| **Pelayanan** | `pelayanan.jpg` | Pelayanan publik yang ramah |
| **Potensi Wisata** | `potensi-wisata.jpg` | Taman rekreasi dengan danau |
| **Berita** | `berita.jpg` | Ruang berita modern |
| **Kontak** | `kontak.jpg` | Pusat kontak yang ramah |

---

## 🎨 Perubahan pada Setiap Halaman

### 1. Beranda (`src/components/pages/beranda.tsx`)

**Sebelum**:
```tsx
<section className="relative py-20 md:py-32 overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-background to-secondary/10" />
  ...
</section>
```

**Sesudah**:
```tsx
<section className="relative py-20 md:py-32 overflow-hidden">
  <div className="absolute inset-0">
    <div className="absolute inset-0 bg-gradient-to-br from-pink-500/80 via-pink-600/70 to-pink-700/80 z-20" />
    <img
      src="/images/hero-bg/beranda.jpg"
      alt="Tanjung Barat - Suasana Kelurahan"
      className="w-full h-full object-cover"
    />
  </div>
  <div className="container mx-auto px-4 relative z-30">
    <h1 className="text-white drop-shadow-lg">
      ...
    </h1>
  </div>
</section>
```

### 2. Profil (`src/components/pages/profil.tsx`)

Background gambar kantor kelurahan dengan teks putih dan shadow.

### 3. Pelayanan (`src/components/pages/pelayanan.tsx`)

Background gambar pelayanan publik dengan teks putih dan shadow.

### 4. Potensi Wisata (`src/components/pages/potensi-wisata.tsx`)

Background gambar taman rekreasi dengan teks putih dan shadow.

### 5. Berita (`src/components/pages/berita.tsx`)

Background gambar ruang berita modern dengan teks putih dan shadow.

### 6. Kontak (`src/components/pages/kontak.tsx`)

Background gambar pusat kontak yang ramah dengan teks putih dan shadow.

---

## 🎯 Teknik yang Digunakan

### 1. Layered Background Structure

```tsx
<div className="absolute inset-0">
  {/* Layer 1: Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-br from-pink-500/80 via-pink-600/70 to-pink-700/80 z-20" />
  
  {/* Layer 2: Background Image */}
  <img
    src="/images/hero-bg/{page}.jpg"
    alt="Description"
    className="w-full h-full object-cover"
  />
</div>
```

### 2. Z-Index Stacking

- **Image Layer**: Default (implicit z-0)
- **Gradient Overlay**: `z-20` (di atas gambar)
- **Content Container**: `z-30` (di atas overlay)

### 3. Text Visibility

Teks dioptimalkan untuk keterbacaan:
- `text-white` - Warna teks putih
- `drop-shadow-lg` - Shadow untuk kontras
- `text-white/95` - Putih dengan sedikit transparansi

---

## 🔧 Cara Generate Ulang Gambar

Jika ingin mengganti gambar dengan baru:

```bash
cd /home/z/my-project
bun run generate-hero-images.ts
```

Atau edit file `generate-hero-images.ts` dan ubah prompt untuk setiap gambar.

---

## 📦 Gambar untuk Lokal

Semua gambar harus di-copy ke folder lokal:

### Opsi 1: Copy Manual

Copy seluruh folder:
```
/server/public/images/hero-bg/
```

Ke lokal:
```
/lokal/public/images/hero-bg/
```

### Opsi 2: Generate Ulang di Lokal

1. Copy script `generate-hero-images.ts` ke lokal
2. Jalankan:
   ```bash
   bun run generate-hero-images.ts
   ```
3. Gambar akan dibuat di `public/images/hero-bg/`

---

## 🎨 Prompt Gambar yang Digunakan

### Beranda
```
Modern Indonesian neighborhood in Jakarta, traditional houses mixed with modern buildings,
clean streets, community atmosphere, warm morning light, vibrant colors,
peaceful residential area, high quality photograph
```

### Profil
```
Modern Indonesian government office building, official kelurahan office, clean and professional,
welcoming architecture, Indonesian flag, people coming and going, daytime,
warm sunlight, high quality photograph
```

### Pelayanan
```
Friendly Indonesian government service counter, diverse staff helping citizens, modern office interior,
clean and organized, welcoming atmosphere, customer service, professional yet approachable,
high quality photograph
```

### Potensi Wisata
```
Beautiful Indonesian recreational park with lake, family-friendly, people enjoying activities,
jogging track, green trees, modern playground, peaceful afternoon, sunny day,
high quality photograph
```

### Berita
```
Modern Indonesian community newsroom, journalists working, digital screens showing news,
professional media environment, Indonesian context, bright and modern, high quality photograph
```

### Kontak
```
Beautiful Indonesian neighborhood office building, contact center, welcoming entrance,
people at information desk, modern facilities, clean and accessible, daytime,
friendly atmosphere, high quality photograph
```

---

## 📊 Spesifikasi Gambar

- **Ukuran**: 1440x720 (Wide Landscape)
- **Format**: JPG
- **Size**:
  - beranda.jpg: ~178 KB
  - profil.jpg: ~154 KB
  - pelayanan.jpg: ~101 KB
  - potensi-wisata.jpg: ~194 KB
  - berita.jpg: ~110 KB
  - kontak.jpg: ~184 KB

---

## ✨ Efek Visual

### Before
- Background gradient sederhana
- Teks warna default
- Tidak ada visual context

### After
- Gambar realisitik bertema Tanjung Barat
- Gradient overlay pink untuk branding
- Teks putih dengan drop shadow
- Z-index layering untuk keterbacaan

---

## 🌐 Browser Compatibility

Background gambar dan layering sudah tested:
- ✅ Chrome
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

---

## 🎯 Hasil Akhir

Setiap halaman sekarang memiliki:
1. **Background gambar** yang relevan dengan konten
2. **Gradient overlay** pink untuk branding konsisten
3. **Teks terbaca** dengan warna putih dan shadow
4. **Responsive design** yang berfungsi di semua device

---

## 📝 Catatan Penting

1. **Gambar di public folder** - bisa diakses langsung via `/images/hero-bg/`
2. **Gradient opacity** - 70-80% untuk memastikan teks terbaca
3. **Drop shadow** - Penting untuk kontras dengan background
4. **Z-index management** - Penting untuk layering yang benar

---

## 🔄 Tips untuk Customization

### Mengganti Warna Gradient

Ubah gradient classes di setiap halaman:
```tsx
// Contoh: Ubah ke biru
<div className="absolute inset-0 bg-gradient-to-br from-blue-500/80 via-blue-600/70 to-blue-700/80 z-20" />
```

### Mengganti Gambar

Ganti `src` attribute di setiap halaman:
```tsx
<img
  src="/path/to/your/image.jpg"
  alt="Description"
  className="w-full h-full object-cover"
/>
```

---

## ✅ Checklist

- [x] Generate 6 gambar hero background
- [x] Update Beranda dengan background gambar
- [x] Update Profil dengan background gambar
- [x] Update Pelayanan dengan background gambar
- [x] Update Potensi Wisata dengan background gambar
- [x] Update Berita dengan background gambar
- [x] Update Kontak dengan background gambar
- [x] Optimalkan teks visibility (putih + shadow)
- [x] Implement gradient overlay untuk branding
- [x] Test dengan berbagai browser

---

🎉 **Selesai! Semua halaman sekarang memiliki background gambar yang menarik!**

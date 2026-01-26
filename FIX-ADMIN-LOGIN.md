# Cara Setup Database & Admin di Lokal

## Problem: Login Gagal "Admin not found"

Error ini terjadi karena database lokal belum memiliki user admin.

---

## ✅ Solusi Cepat (3 Langkah)

### Langkah 1: Copy file berikut ke lokal:

Copy **KEDUA** file ini ke folder lokal Anda (`C:\Users\Alatas1978\Downloads\web-p3l\`):

1. ✅ `init-complete-data.js` - Semua data + admin user
2. ✅ `create-admin.js` - Hanya admin user (lebih cepat)

### Langkah 2: Jalankan script di terminal lokal:

**Opsi A: Setup semua data (Rekomendasi)**
```bash
node init-complete-data.js
```

**Opsi B: Setup hanya admin user (Lebih cepat)**
```bash
node create-admin.js
```

### Langkah 3: Login ke Admin Panel

Buka browser dan login:
- **URL**: `http://localhost:3000/admin`
- **Username**: `admin`
- **Password**: `admin123`

---

## 📋 Apa yang Dibuat Script?

### `init-complete-data.js` membuat:
- ✅ Semua data halaman (Beranda, Profil, Pelayanan, Potensi Wisata, Berita, Kontak)
- ✅ 136 record database lengkap
- ✅ User admin untuk login
- ✅ Struktur organisasi (tanpa nama orang)

### `create-admin.js` membuat:
- ✅ User admin saja
- Tidak mengubah data lain yang sudah ada

---

## 🔐 Login Credentials Default

```
Username: admin
Password: admin123
```

⚠️ **PENTING**: Ubah password setelah login pertama!

---

## Troubleshooting

### Error: "Cannot find module '@prisma/client'"
**Solusi**: Jalankan `npm install`

### Error: Database tidak ditemukan
**Solusi**:
1. Cek file `.env` berisi:
   ```
   DATABASE_URL="file:./db/custom.db"
   ```
2. Jalankan: `npx prisma db push`

### Error: "Admin already exists"
**Ini normal!** Script tidak akan menghapus admin yang sudah ada.

### Login masih gagal setelah menjalankan script
**Cek di terminal dev server** - lihat log untuk detail error:
```bash
# Buka terminal lain dan jalankan
npm run dev
```

---

## Ringkasan Perintah yang Perlu Dijalankan

### Jika ini pertama kali setup:

```bash
# 1. Install dependencies (jika belum)
npm install

# 2. Push database schema
npx prisma db push

# 3. Initialize data + admin
node init-complete-data.js

# 4. Start dev server
npm run dev

# 5. Buka browser dan login
# http://localhost:3000/admin
# Username: admin
# Password: admin123
```

### Jika hanya perlu reset admin:

```bash
node create-admin.js
```

---

## Struktur File Setelah Setup

```
web-p3l/
├── .env (pastikan DATABASE_URL benar)
├── db/
│   └── custom.db (database SQLite)
├── init-complete-data.js (semua data + admin)
├── create-admin.js (hanya admin)
└── src/
    ├── app/
    ├── components/
    └── lib/
```

---

## Catatan Penting

1. **Database SQLite** = File `db/custom.db` - bisa dihapus dan dibuat ulang
2. **Password di-hash** menggunakan SHA256, tidak disimpan sebagai plain text
3. **Login session** disimpan di cookie dengan nama `admin_session`
4. **Struktur organisasi** sudah dikosongkan nama orangnya, hanya jabatan

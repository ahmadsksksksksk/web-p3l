# Cara Setup Data di Lokal (Windows)

## Langkah 1: Copy File JavaScript

Copy file `init-complete-data.js` ke folder lokal Anda (C:\Users\Alatas1978\Downloads\web-p3l\)

**Optional**: Jika hanya perlu membuat admin user tanpa reset data, gunakan `create-admin.js`

## Langkah 2: Pastikan Database Sudah Dibuat

Jalankan perintah ini di terminal lokal:

```bash
npm run db:push
```

Atau:

```bash
npx prisma db push
```

## Langkah 3: Jalankan Script Inisialisasi Data

Gunakan perintah ini (BUKAN ts-node):

```bash
node init-complete-data.js
```

**Atau jika hanya perlu admin user**:
```bash
node create-admin.js
```

## Langkah 4: Jalankan Development Server

```bash
npm run dev
```

## Langkah 5: Login ke Admin Panel

Buka `http://localhost:3000/admin` dan login dengan:

```
Username: admin
Password: admin123
```

## Langkah 6: Refresh Website

Buka browser dan refresh halaman website Anda. Semua data akan muncul!

---

## Troubleshooting

### Error: "Cannot find module '@prisma/client'"
Jalankan:
```bash
npm install
```

### Error: Database tidak ditemukan
Pastikan file `.env` berisi:
```
DATABASE_URL="file:./db/custom.db"
```

Lalu jalankan:
```bash
npm run db:push
```

### Data masih tidak muncul
Cek apakah database berhasil dibuat:
- Pastikan folder `db` ada di root folder
- Pastikan file `custom.db` ada di dalam folder `db`

---

## Ringkasan Data yang Akan Dibuat

| Halaman | Jumlah Record |
|---------|--------------|
| Beranda | 15 |
| Profil | 41 |
| Pelayanan | 21 |
| Potensi Wisata | 44 |
| Berita | 5 |
| Kontak | 10 |
| **TOTAL** | **136 records** |

---

## Catatan Penting

- Gunakan `node init-complete-data.js` BUKAN `npx ts-node init-complete-data.ts`
- Pastikan Anda ada di root folder project sebelum menjalankan perintah
- Jika skrip gagal, cek error message dan lakukan troubleshooting sesuai panduan di atas

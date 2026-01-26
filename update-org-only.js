const { PrismaClient } = require('@prisma/client');

const db = new PrismaClient();

async function main() {
  console.log('🔄 Mengupdate Struktur Organisasi...\n');

  // Hapus data lama
  await db.profilOrgStructure.deleteMany();

  // Organizational Structure (tanpa nama)
  const orgStructure = [
    { name: '', position: 'Lurah', level: 1 },
    { name: '', position: 'Sekretaris Kelurahan', level: 2 },
    { name: '', position: 'Kasi Pemerintahan', level: 2 },
    { name: '', position: 'Kasi Kesejahteraan Sosial', level: 2 },
    { name: '', position: 'Kasi Pemberdayaan Masyarakat', level: 2 },
    { name: '', position: 'Kasi Trantib', level: 2 },
    { name: '', position: 'Kasi Ekonomi & Pembangunan', level: 2 }
  ];

  // Insert data baru
  for (const org of orgStructure) {
    await db.profilOrgStructure.create({
      data: {
        ...org,
        order: orgStructure.indexOf(org) + 1,
        isActive: true
      }
    });
  }

  console.log('✅ Struktur Organisasi berhasil diupdate!');
  console.log('\nJabatan yang tersimpan:');
  orgStructure.forEach(org => {
    console.log(`  ${org.order}. ${org.position}`);
  });
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });

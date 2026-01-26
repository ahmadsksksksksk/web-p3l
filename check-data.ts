const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

async function checkDatabase() {
  const totalRecords = await db.content.count();
  const pages = await db.content.groupBy({
    by: ['page'],
    _count: true
  });

  console.log('Total Records:', totalRecords);
  console.log('\nRecords per halaman:');
  pages.forEach(p => console.log(`  ${p.page}: ${p._count}`));

  // Sample beranda data
  const berandaData = await db.content.findMany({
    where: { page: 'beranda' },
    take: 5
  });
  console.log('\nContoh data Beranda:');
  berandaData.forEach(item => {
    const preview = item.value.length > 50 ? item.value.substring(0, 50) + '...' : item.value;
    console.log(`  ${item.key}: ${preview}`);
  });

  await db.$disconnect();
}

checkDatabase();

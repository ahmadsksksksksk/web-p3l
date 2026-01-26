const { PrismaClient } = require('@prisma/client');
const { createHash } = require('crypto');

const db = new PrismaClient();

function hashPassword(password) {
  return createHash('sha256').update(password).digest('hex');
}

async function main() {
  console.log('🔐 Creating Admin User...\n');

  // Default admin credentials
  const defaultAdmin = {
    username: 'admin',
    password: 'admin123',
    email: 'admin@tanjungbarat.go.id',
    name: 'Administrator',
    role: 'admin'
  };

  // Check if admin already exists
  const existingAdmin = await db.admin.findUnique({
    where: { username: defaultAdmin.username }
  });

  if (existingAdmin) {
    console.log('⚠️  Admin user already exists!');
    console.log(`\nUsername: ${defaultAdmin.username}`);
    console.log(`Password: ${defaultAdmin.password}`);
    console.log('\nIf you want to reset password, delete the existing admin first.');
    console.log('Or you can use this script with different credentials.');
    return;
  }

  // Create admin
  const hashedPassword = hashPassword(defaultAdmin.password);

  const admin = await db.admin.create({
    data: {
      username: defaultAdmin.username,
      password: hashedPassword,
      email: defaultAdmin.email,
      name: defaultAdmin.name,
      role: defaultAdmin.role
    }
  });

  console.log('✅ Admin user created successfully!');
  console.log('\n📋 Login Credentials:');
  console.log('   Username:', admin.username);
  console.log('   Password:', defaultAdmin.password);
  console.log('\n🔑 You can now login at: http://localhost:3000/admin');
  console.log('\n⚠️  IMPORTANT: Change the password after first login!');
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });

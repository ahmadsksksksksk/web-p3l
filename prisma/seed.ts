import { db } from './src/lib/db'
import { hashPassword } from './src/lib/auth'

async function main() {
  // Create default admin
  const hashedPassword = hashPassword('admin123')

  const admin = await db.admin.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: hashedPassword,
      email: 'admin@tanjungbarat.com',
      name: 'Administrator',
      role: 'admin'
    }
  })

  console.log('Admin created/updated:', admin.username)
  console.log('Default password: admin123')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })

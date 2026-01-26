const { PrismaClient } = require('@prisma/client')
const { createHash } = require('crypto')

const db = new PrismaClient()

function hashPassword(password) {
  return createHash('sha256').update(password).digest('hex')
}

async function main() {
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

const { PrismaClient } = require('@prisma/client')
const { createHash } = require('crypto')

const db = new PrismaClient()

function hashPassword(password) {
  return createHash('sha256').update(password).digest('hex')
}

async function main() {
  console.log('=== Checking Admin ===')

  const admins = await db.admin.findMany()
  console.log('Total admins:', admins.length)

  for (const admin of admins) {
    console.log('\n--- Admin Info ---')
    console.log('ID:', admin.id)
    console.log('Username:', admin.username)
    console.log('Email:', admin.email)
    console.log('Name:', admin.name)
    console.log('Role:', admin.role)
    console.log('Password Hash:', admin.password)
    console.log('Password Hash Length:', admin.password.length)
  }

  // Test password hash
  const testPassword = 'admin123'
  const hashedTest = hashPassword(testPassword)
  console.log('\n=== Test Password Hash ===')
  console.log('Input:', testPassword)
  console.log('Hashed:', hashedTest)
  console.log('Hash Length:', hashedTest.length)

  // Check if any admin matches
  for (const admin of admins) {
    if (admin.password === hashedTest) {
      console.log('\n✅ Password MATCHES for admin:', admin.username)
    } else {
      console.log('\n❌ Password DOES NOT match for admin:', admin.username)
    }
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })

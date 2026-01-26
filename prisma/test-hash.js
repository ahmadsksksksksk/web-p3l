const { createHash } = require('crypto')

function hashPassword(password) {
  return createHash('sha256').update(password).digest('hex')
}

// Test different passwords
const passwords = ['admin123', 'Admin123', 'admin', 'ADMIN']

console.log('=== Testing Password Hashes ===\n')

passwords.forEach(pwd => {
  const hash = hashPassword(pwd)
  console.log(`Password: "${pwd}"`)
  console.log(`Hash: ${hash}`)
  console.log(`Hash Length: ${hash.length}`)
  console.log('---')
})

// Expected hash for admin123
const expected = '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9'
console.log('\nExpected hash for "admin123":')
console.log(expected)
console.log('\nMatch?', hashPassword('admin123') === expected)

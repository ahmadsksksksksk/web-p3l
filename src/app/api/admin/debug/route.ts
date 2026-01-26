import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { hashPassword } from '@/lib/auth'

export async function GET() {
  const results = {
    crypto: { tested: false, result: null, error: null },
    database: { tested: false, result: null, error: null }
  }

  // Test crypto
  try {
    const hash = hashPassword('admin123')
    results.crypto = {
      tested: true,
      result: hash.substring(0, 20) + '...',
      error: null
    }
  } catch (error) {
    results.crypto = {
      tested: true,
      result: null,
      error: error instanceof Error ? error.message : String(error)
    }
  }

  // Test database
  try {
    const adminCount = await db.admin.count()
    results.database = {
      tested: true,
      result: `Found ${adminCount} admin(s)`,
      error: null
    }
  } catch (error) {
    results.database = {
      tested: true,
      result: null,
      error: error instanceof Error ? error.message : String(error)
    }
  }

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    results
  })
}

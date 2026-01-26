'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AdminSidebar from '@/components/admin/admin-sidebar'
import AdminHeader from '@/components/admin/admin-header'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/admin/me')
      if (response.ok) {
        setIsAuthenticated(true)
      } else {
        router.push('/admin/login')
      }
    } catch (error) {
      router.push('/admin/login')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AdminHeader />
      <div className="flex flex-1">
        <AdminSidebar />
        <main className="flex-1 p-6">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground mt-2">
                Selamat datang di panel admin. Silakan pilih menu di sidebar untuk mengelola konten.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
                <h3 className="text-lg font-semibold mb-2">Profil</h3>
                <p className="text-sm text-muted-foreground">
                  Kelola sejarah, visi misi, dan struktur organisasi
                </p>
              </div>

              <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
                <h3 className="text-lg font-semibold mb-2">Pelayanan</h3>
                <p className="text-sm text-muted-foreground">
                  Kelola daftar pelayanan yang tersedia
                </p>
              </div>

              <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
                <h3 className="text-lg font-semibold mb-2">Beranda</h3>
                <p className="text-sm text-muted-foreground">
                  Kelola konten halaman depan
                </p>
              </div>

              <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
                <h3 className="text-lg font-semibold mb-2">Potensi Wisata</h3>
                <p className="text-sm text-muted-foreground">
                  Kelola informasi potensi wisata
                </p>
              </div>

              <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
                <h3 className="text-lg font-semibold mb-2">Berita</h3>
                <p className="text-sm text-muted-foreground">
                  Kelola berita dan informasi
                </p>
              </div>

              <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
                <h3 className="text-lg font-semibold mb-2">Kontak</h3>
                <p className="text-sm text-muted-foreground">
                  Kelola informasi kontak
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

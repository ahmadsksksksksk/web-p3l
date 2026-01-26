'use client'

import { useState, useEffect } from 'react'
import AdminSidebar from '@/components/admin/admin-sidebar'
import AdminHeader from '@/components/admin/admin-header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Eye, EyeOff, Save, Plus, Trash2, Edit, Newspaper, Calendar, FileText, Loader2 } from 'lucide-react'
import { Switch } from '@/components/ui/switch'
import { useRouter } from 'next/navigation'

interface News {
  id: string
  title: string
  description: string
  date: string
  content?: string
  category?: string
  author?: string
}

export default function AdminBeritaPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  // Edit/Preview mode toggle
  const [isAdminMode, setIsAdminMode] = useState(true)

  // Hero Section
  const [heroTitle, setHeroTitle] = useState('')
  const [heroDescription, setHeroDescription] = useState('')

  // News list
  const [newsList, setNewsList] = useState<News[]>([])

  // Edit states
  const [editHero, setEditHero] = useState(false)
  const [editNewsItem, setEditNewsItem] = useState<string | null>(null)
  const [addNewsMode, setAddNewsMode] = useState(false)

  // Fetch Berita data from API
  useEffect(() => {
    fetchBeritaData()
  }, [])

  const fetchBeritaData = async () => {
    try {
      console.log('Fetching Berita data from API...')
      const response = await fetch('/api/content/berita')
      const result = await response.json()

      if (result.success && result.data) {
        const data = result.data

        if (data.hero) {
          setHeroTitle(data.hero.title || '')
          setHeroDescription(data.hero.description || '')
        }

        if (data.news && Array.isArray(data.news)) {
          setNewsList(data.news.map((n: any) => ({
            id: n.id,
            title: n.title,
            description: n.description,
            date: n.date,
            content: n.content || '',
            category: n.category || '',
            author: n.author || ''
          })))
        }

        console.log('Berita data loaded successfully')
      } else {
        console.error('Failed to load Berita data:', result.error)
      }
    } catch (error) {
      console.error('Error fetching Berita data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveAll = async () => {
    setIsSaving(true)
    try {
      console.log('Saving Berita data...')
      const dataToSave = {
        hero: {
          title: heroTitle,
          description: heroDescription
        },
        news: newsList
      }

      const response = await fetch('/api/content/berita', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSave),
      })

      const result = await response.json()
      console.log('API Response:', result)

      if (result.success) {
        alert('Semua perubahan berhasil disimpan!')
      } else {
        alert('Gagal menyimpan: ' + (result.error || 'Unknown error'))
      }
    } catch (error) {
      console.error('Error saving Berita data:', error)
      alert('Gagal menyimpan: Terjadi kesalahan saat menyimpan data')
    } finally {
      setIsSaving(false)
    }
  }

  const handlePreview = () => {
    router.push('/berita')
  }

  const handleAddNews = () => {
    const newId = `news-${Date.now()}`
    setNewsList([...newsList, {
      id: newId,
      title: '',
      description: '',
      date: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }),
      content: '',
      category: '',
      author: 'Admin',
    }])
    setEditNewsItem(newId)
    setAddNewsMode(true)
  }

  const handleDeleteNews = (id: string) => {
    if (!confirm('Yakin ingin menghapus berita ini?')) return
    setNewsList(newsList.filter(n => n.id !== id))
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1">
          {/* Mode Toggle */}
          <div className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    {isAdminMode ? (
                      <EyeOff className="h-5 w-5 text-primary" />
                    ) : (
                      <Eye className="h-5 w-5 text-primary" />
                    )}
                    <span className="font-semibold">
                      {isAdminMode ? 'Mode Edit' : 'Mode Preview'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Label htmlFor="mode-toggle" className="text-sm text-muted-foreground">
                      {isAdminMode ? 'Sedang diedit' : 'Hanya baca'}
                    </Label>
                    <Switch
                      id="mode-toggle"
                      checked={isAdminMode}
                      onCheckedChange={setIsAdminMode}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {isAdminMode && (
                    <>
                      <Button onClick={handleAddNews} className="gap-2">
                        <Plus className="h-4 w-4" />
                        Tambah Berita
                      </Button>
                      <Button onClick={handleSaveAll} disabled={isSaving || isLoading} className="gap-2">
                        {isSaving ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Save className="h-4 w-4" />
                        )}
                        {isSaving ? 'Menyimpan...' : 'Simpan Semua'}
                      </Button>
                    </>
                  )}
                  <Button onClick={handlePreview} variant="outline" className="gap-2">
                    <Eye className="h-4 w-4" />
                    Lihat Preview
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              <span className="ml-2 text-muted-foreground">Memuat data...</span>
            </div>
          ) : (
            <div className="space-y-8">
            {/* Hero Section */}
            <section className="relative py-16 md:py-24 bg-gradient-to-br from-primary/10 to-muted/20">
              <div className="container mx-auto px-4">
                <div className="max-w-3xl space-y-4">
                  {isAdminMode && (
                    <div className="flex justify-end mb-4">
                      <Button onClick={() => setEditHero(!editHero)} variant="secondary" size="sm" className="gap-2">
                        <Edit className="h-4 w-4" />
                        {editHero ? 'Tutup Edit' : 'Edit Hero'}
                      </Button>
                    </div>
                  )}

                  {isAdminMode && editHero ? (
                    <div className="space-y-4 bg-background/80 p-6 rounded-lg backdrop-blur">
                      <div>
                        <Label>Judul</Label>
                        <Input value={heroTitle} onChange={(e) => setHeroTitle(e.target.value)} className="text-4xl md:text-5xl font-bold" />
                      </div>
                      <div>
                        <Label>Deskripsi</Label>
                        <Textarea value={heroDescription} onChange={(e) => setHeroDescription(e.target.value)} rows={3} />
                      </div>
                    </div>
                  ) : (
                    <>
                      <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                        {heroTitle}
                      </h1>
                      <p className="text-xl text-muted-foreground">
                        {heroDescription}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </section>

            {/* News Section */}
            <section className="py-12">
              <div className="container mx-auto px-4">
                {newsList.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {newsList.map((news) => (
                      <Card key={news.id} className="relative hover:shadow-lg transition-shadow group flex flex-col h-full">
                        {isAdminMode && (
                          <div className="absolute top-2 right-2 flex gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={() => setEditNewsItem(news.id)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeleteNews(news.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                        {isAdminMode && editNewsItem === news.id ? (
                          <CardContent className="p-6 space-y-4 flex-1">
                            <div>
                              <Label>Tanggal</Label>
                              <Input
                                value={news.date}
                                onChange={(e) => {
                                  const updated = newsList.map(n =>
                                    n.id === news.id ? { ...n, date: e.target.value } : n
                                  )
                                  setNewsList(updated)
                                }}
                              />
                            </div>
                            <div>
                              <Label>Kategori</Label>
                              <Input
                                value={news.category || ''}
                                onChange={(e) => {
                                  const updated = newsList.map(n =>
                                    n.id === news.id ? { ...n, category: e.target.value } : n
                                  )
                                  setNewsList(updated)
                                }}
                                placeholder="Contoh: Pembangunan, Kesehatan, dll."
                              />
                            </div>
                            <div>
                              <Label>Judul</Label>
                              <Input
                                value={news.title}
                                onChange={(e) => {
                                  const updated = newsList.map(n =>
                                    n.id === news.id ? { ...n, title: e.target.value } : n
                                  )
                                  setNewsList(updated)
                                }}
                              />
                            </div>
                            <div>
                              <Label>Deskripsi Singkat</Label>
                              <Textarea
                                value={news.description}
                                onChange={(e) => {
                                  const updated = newsList.map(n =>
                                    n.id === news.id ? { ...n, description: e.target.value } : n
                                  )
                                  setNewsList(updated)
                                }}
                                rows={3}
                              />
                            </div>
                            <div>
                              <Label>Konten Lengkap</Label>
                              <Textarea
                                value={news.content || ''}
                                onChange={(e) => {
                                  const updated = newsList.map(n =>
                                    n.id === news.id ? { ...n, content: e.target.value } : n
                                  )
                                  setNewsList(updated)
                                }}
                                rows={6}
                                placeholder="Isi konten berita secara lengkap di sini..."
                              />
                            </div>
                            <div className="flex gap-2">
                              <Button onClick={() => setEditNewsItem(null)} size="sm">Selesai</Button>
                              {addNewsMode && editNewsItem === news.id && (
                                <Button onClick={() => {
                                  setAddNewsMode(false)
                                  setEditNewsItem(null)
                                }} variant="outline" size="sm">Batal</Button>
                              )}
                            </div>
                          </CardContent>
                        ) : (
                          <>
                            <CardHeader>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                <Calendar className="h-3 w-3" />
                                {news.date}
                              </div>
                              {news.category && (
                                <div className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs rounded-full mb-2">
                                  {news.category}
                                </div>
                              )}
                              <CardTitle className="text-lg line-clamp-2">{news.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-1">
                              <CardDescription className="line-clamp-3">
                                {news.description}
                              </CardDescription>
                            </CardContent>
                            <div className="p-6 pt-0">
                              <div className="flex items-center justify-between text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <FileText className="h-3 w-3" />
                                  {news.content ? `${news.content.length} karakter` : 'Tidak ada konten'}
                                </span>
                              </div>
                            </div>
                          </>
                        )}
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <div className="flex flex-col items-center space-y-4">
                        <div className="p-4 rounded-full bg-muted/10">
                          <Newspaper className="h-12 w-12 text-muted-foreground" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-muted-foreground mb-2">
                            Belum ada berita
                          </h3>
                          <p className="text-muted-foreground">
                            {isAdminMode ? 'Klik tombol "Tambah Berita" untuk membuat berita baru.' : 'Silakan kembali lagi nanti untuk informasi terbaru.'}
                          </p>
                        </div>
                        {isAdminMode && (
                          <Button onClick={handleAddNews} className="gap-2">
                            <Plus className="h-4 w-4" />
                            Tambah Berita Pertama
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </section>

            {/* Empty State Message for Preview Mode */}
            {!isAdminMode && newsList.length === 0 && (
              <section className="py-12">
                <div className="container mx-auto px-4">
                  <Card>
                    <CardContent className="p-12 text-center">
                      <div className="text-muted-foreground text-lg">
                        Belum ada berita yang tersedia saat ini. Silakan kembali lagi nanti untuk informasi terbaru.
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>
            )}
          </div>
          )}
        </main>
      </div>
    </div>
  )
}

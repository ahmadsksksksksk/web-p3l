'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Calendar, Newspaper, FileText, Loader2, RefreshCw } from 'lucide-react'

interface News {
  id: string
  title: string
  description: string
  date: string
  content?: string
  category?: string
  author?: string
}

export default function BeritaPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [heroTitle, setHeroTitle] = useState('')
  const [heroDescription, setHeroDescription] = useState('')
  const [newsList, setNewsList] = useState<News[]>([])

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
          setNewsList(data.news)
        }

        console.log('Berita data loaded successfully')
        setError(null)
      } else {
        console.error('Failed to load Berita data:', result.error)
        setError('Gagal memuat data')
      }
    } catch (error) {
      console.error('Error fetching Berita data:', error)
      setError('Gagal memuat data')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchBeritaData()
  }, [])

  if (isLoading) {
    return (
      <main>
        <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/80 via-pink-600/70 to-pink-700/80 z-20" />
          <img
            src="/images/hero-bg/berita.jpg"
            alt="Berita Tanjung Barat"
            className="w-full h-full object-cover"
          />
        </div>
          <div className="container mx-auto px-4 relative z-30">
            <div className="max-w-3xl space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                Berita & Informasi
              </h1>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4 relative z-30">
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              <span className="ml-2 text-muted-foreground">Memuat data...</span>
            </div>
          </div>
        </section>
      </main>
    )
  }

  if (error) {
    return (
      <main>
        <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/80 via-pink-600/70 to-pink-700/80 z-20" />
          <img
            src="/images/hero-bg/berita.jpg"
            alt="Berita Tanjung Barat"
            className="w-full h-full object-cover"
          />
        </div>
          <div className="container mx-auto px-4 relative z-30">
            <div className="max-w-3xl space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                Berita & Informasi
              </h1>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4 relative z-30">
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <p className="text-muted-foreground">{error}</p>
              <button
                onClick={fetchBeritaData}
                className="flex items-center gap-2 px-4 py-2 bg-pink-500 text-pink-foreground rounded-lg hover:bg-pink-500/90 transition-colors"
              >
                <RefreshCw className="h-4 w-4" />
                <span className="font-medium">Coba Lagi</span>
              </button>
            </div>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main>
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/80 via-pink-600/70 to-pink-700/80 z-20" />
          <img
            src="/images/hero-bg/berita.jpg"
            alt="Berita Tanjung Barat"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-30">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              {heroTitle || 'Berita & Informasi'}
            </h1>
            <p className="text-xl text-white/95 drop-shadow-md">
              {heroDescription || 'Dapatkan informasi terbaru seputar Tanjung Barat.'}
            </p>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 relative z-30">
          {newsList.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {newsList.map((news) => (
                <Card key={news.id} className="hover:shadow-lg hover:border-pink-500/50 transition-shadow flex flex-col h-full">
                  <CardHeader>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Calendar className="h-3 w-3 text-pink-500" />
                      {news.date}
                    </div>
                    {news.category && (
                      <div className="inline-block px-2 py-1 bg-pink-500/10 text-pink-500 text-xs rounded-full mb-2">
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
                  <div className="p-6 pt-0 mt-auto">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <FileText className="h-3 w-3 text-pink-500" />
                        {news.content ? `${news.content.length} karakter` : 'Tidak ada konten'}
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <Newspaper className="h-12 w-12 mx-auto mb-4 text-pink-500" />
                <h3 className="text-xl font-semibold mb-2">Belum Ada Berita</h3>
                <p className="text-muted-foreground">
                  Belum ada berita yang tersedia saat ini. Silakan kembali lagi nanti untuk informasi terbaru.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </main>
  )
}

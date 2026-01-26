'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { MapPin, Navigation, ChevronRight, X, Building2, TreePine, Utensils, Landmark, Loader2, RefreshCw } from 'lucide-react'

interface Place {
  nama: string
  alamat: string
}

interface Category {
  id: string
  nama: string
  deskripsi: string
  icon: string
  tempat: Place[]
}

export default function PotensiWisataPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const [heroTitle, setHeroTitle] = useState('')
  const [heroDescription, setHeroDescription] = useState('')
  const [categories, setCategories] = useState<Category[]>([])

  const fetchPotensiWisataData = async () => {
    try {
      console.log('Fetching Potensi Wisata data from API...')
      const response = await fetch('/api/content/potensi-wisata')
      const result = await response.json()

      if (result.success && result.data) {
        const data = result.data

        if (data.hero) {
          setHeroTitle(data.hero.title || '')
          setHeroDescription(data.hero.description || '')
        }

        if (data.categories && Array.isArray(data.categories)) {
          const categoriesWithId = data.categories.map((cat: any) => ({
            id: cat.id,
            nama: cat.name || cat.nama,
            deskripsi: cat.description || cat.deskripsi,
            icon: cat.icon,
            tempat: cat.tempat || cat.places || []
          }))
          setCategories(categoriesWithId)
        }

        console.log('Potensi Wisata data loaded successfully')
        setError(null)
      } else {
        console.error('Failed to load Potensi Wisata data:', result.error)
        setError('Gagal memuat data')
      }
    } catch (error) {
      console.error('Error fetching Potensi Wisata data:', error)
      setError('Gagal memuat data')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPotensiWisataData()
  }, [])

  const openCategory = (categoryIndex: number) => {
    setSelectedCategory(categoryIndex)
    setIsDialogOpen(true)
  }

  const closeDialog = () => {
    setIsDialogOpen(false)
    setTimeout(() => setSelectedCategory(null), 300)
  }

  const getIconComponent = (iconName: string): typeof Building2 => {
    switch (iconName) {
      case 'TreePine':
        return TreePine
      case 'Utensils':
        return Utensils
      case 'Building2':
        return Building2
      case 'Landmark':
        return Landmark
      default:
        return Building2
    }
  }

  if (isLoading) {
    return (
      <main>
        <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/80 via-pink-600/70 to-pink-700/80 z-20" />
          <img
            src="/images/hero-bg/potensi-wisata.jpg"
            alt="Potensi Wisata Tanjung Barat"
            className="w-full h-full object-cover"
          />
        </div>
          <div className="container mx-auto px-4 relative z-30">
            <div className="max-w-3xl space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                Potensi & Wisata
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
            src="/images/hero-bg/potensi-wisata.jpg"
            alt="Potensi Wisata Tanjung Barat"
            className="w-full h-full object-cover"
          />
        </div>
          <div className="container mx-auto px-4 relative z-30">
            <div className="max-w-3xl space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                Potensi & Wisata
              </h1>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4 relative z-30">
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <p className="text-muted-foreground">{error}</p>
              <button
                onClick={fetchPotensiWisataData}
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
            src="/images/hero-bg/potensi-wisata.jpg"
            alt="Potensi Wisata Tanjung Barat"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-30">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <Navigation className="h-4 w-4" />
              <span>Tanjung Barat, Jakarta Selatan</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              {heroTitle || 'Potensi & Wisata'}
            </h1>
            <p className="text-xl text-white/95 drop-shadow-md">
              {heroDescription || 'Jelajahi tempat wisata, kuliner, dan fasilitas menarik di Tanjung Barat'}
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 relative z-30">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4">Kategori</h2>
            <p className="text-muted-foreground">
              Pilih kategori untuk melihat daftar tempat dan alamatnya
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((kategori, index) => (
              <Card
                key={index}
                className="cursor-pointer hover:shadow-xl hover:border-pink-500/50 transition-all duration-300 group"
                onClick={() => openCategory(index)}
              >
                <CardHeader>
                  <div className="space-y-3">
                    <div className={`p-3 rounded-lg bg-pink-500/10 group-hover:bg-pink-500/20 transition-colors inline-block`}>
                      {(() => {
                        const Icon = getIconComponent(kategori.icon)
                        return <Icon className="h-6 w-6 text-pink-500" />
                      })()}
                    </div>
                    <CardTitle className="text-xl group-hover:text-pink-500 transition-colors">
                      {kategori.nama}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {kategori.deskripsi}
                    </CardDescription>
                  </div>
                  <CardContent className="pt-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {kategori.tempat.length} tempat tersedia
                      </span>
                      <ChevronRight className="h-5 w-5 text-pink-500 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </CardHeader>
              </Card>
            ))}
            {categories.length === 0 && (
              <p className="text-muted-foreground col-span-4 text-center py-8">Tidak ada kategori tersedia.</p>
            )}
          </div>
        </div>
      </section>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
          <DialogHeader className="border-b">
            <div className="flex items-start justify-between w-full pr-8">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-pink-500/10">
                    {selectedCategory !== null && (() => {
                      const Icon = getIconComponent(categories[selectedCategory].icon)
                      return <Icon className="h-6 w-6 text-pink-500" />
                    })()}
                  </div>
                  <DialogTitle className="text-2xl">
                    {selectedCategory !== null && categories[selectedCategory].nama}
                  </DialogTitle>
                </div>
                <DialogDescription className="text-base">
                  {selectedCategory !== null && categories[selectedCategory].deskripsi}
                </DialogDescription>
              </div>
              <button
                onClick={closeDialog}
                className="flex-shrink-0 p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>
          </DialogHeader>

          <ScrollArea className="max-h-[calc(90vh-140px)] p-6">
            {selectedCategory !== null && categories[selectedCategory].tempat.length > 0 ? (
              <div className="space-y-4">
                {categories[selectedCategory].tempat.map((tempat, index) => (
                  <Card
                    key={index}
                    className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-pink-500"
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="p-2 rounded-md bg-pink-500/10">
                              <Building2 className="h-4 w-4 text-pink-500" />
                            </div>
                            <h3 className="text-xl font-bold">{tempat.nama}</h3>
                          </div>
                          <div className="flex items-start gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                            <span className="break-words">{tempat.alamat}</span>
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          <button
                            onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(tempat.alamat)}`, '_blank')}
                            className="flex items-center gap-2 px-4 py-2 bg-pink-500 text-pink-foreground rounded-lg hover:bg-pink-500/90 transition-colors"
                          >
                            <Navigation className="h-4 w-4" />
                            <span className="font-medium">Petunjuk Arah</span>
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 space-y-4 text-center">
                <div className="p-4 rounded-full bg-muted/10">
                  <Building2 className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-muted-foreground">
                  Belum ada data tempat
                </h3>
                <p className="text-muted-foreground">
                  Silakan coba kategori lain atau kembali nanti
                </p>
              </div>
            )}
          </ScrollArea>

          <div className="bg-pink-500/10 border-t p-4">
            <div className="flex items-center gap-4 text-sm">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">
                {selectedCategory !== null && `Total ${categories[selectedCategory].tempat.length} tempat di kategori ini`}
              </span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  )
}

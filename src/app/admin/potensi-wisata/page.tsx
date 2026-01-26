'use client'

import { useState, useEffect } from 'react'
import AdminSidebar from '@/components/admin/admin-sidebar'
import AdminHeader from '@/components/admin/admin-header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { MapPin, Navigation, ChevronRight, Building2, TreePine, Utensils, ShoppingBag, Landmark, Eye, EyeOff, Save, Plus, Trash2, Edit, Loader2 } from 'lucide-react'
import { Switch } from '@/components/ui/switch'
import { useRouter } from 'next/navigation'

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

export default function AdminPotensiWisataPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  // Edit/Preview mode toggle
  const [isAdminMode, setIsAdminMode] = useState(true)

  // Hero Section
  const [heroTitle, setHeroTitle] = useState('')
  const [heroDescription, setHeroDescription] = useState('')

  // Categories
  const [categories, setCategories] = useState<Category[]>([])

  // Edit states
  const [editHero, setEditHero] = useState(false)
  const [editCategory, setEditCategory] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const [editPlace, setEditPlace] = useState<number | null>(null)

  // Fetch Potensi Wisata data from API
  useEffect(() => {
    fetchPotensiWisataData()
  }, [])

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
      } else {
        console.error('Failed to load Potensi Wisata data:', result.error)
      }
    } catch (error) {
      console.error('Error fetching Potensi Wisata data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getIcon = (iconName: string): typeof Building2 => {
    switch (iconName) {
      case 'TreePine': return TreePine
      case 'Utensils': return Utensils
      case 'Building2': return Building2
      case 'Landmark': return Landmark
      default: return Building2
    }
  }

  const handleSaveAll = async () => {
    setIsSaving(true)
    try {
      console.log('Saving Potensi Wisata data...')
      const dataToSave = {
        hero: {
          title: heroTitle,
          description: heroDescription
        },
        categories: categories
      }

      const response = await fetch('/api/content/potensi-wisata', {
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
      console.error('Error saving Potensi Wisata data:', error)
      alert('Gagal menyimpan: Terjadi kesalahan saat menyimpan data')
    } finally {
      setIsSaving(false)
    }
  }

  const handlePreview = () => {
    router.push('/potensi-wisata')
  }

  const handleAddCategory = () => {
    const newId = `cat-${Date.now()}`
    setCategories([...categories, { id: newId, nama: 'Kategori Baru', deskripsi: 'Deskripsi kategori', icon: 'Building2', tempat: [] }])
    setEditCategory(categories.length)
  }

  const handleDeleteCategory = (index: number) => {
    if (!confirm('Yakin ingin menghapus kategori ini?')) return
    setCategories(categories.filter((_, i) => i !== index))
  }

  const handleAddPlace = (categoryIndex: number) => {
    const updated = [...categories]
    updated[categoryIndex].tempat.push({ nama: '', alamat: '' })
    setCategories(updated)
    setEditPlace(updated[categoryIndex].tempat.length - 1)
  }

  const handleDeletePlace = (categoryIndex: number, placeIndex: number) => {
    if (!confirm('Yakin ingin menghapus tempat ini?')) return
    const updated = [...categories]
    updated[categoryIndex].tempat = updated[categoryIndex].tempat.filter((_, i) => i !== placeIndex)
    setCategories(updated)
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
                    <Button onClick={handleSaveAll} disabled={isSaving || isLoading} className="gap-2">
                      {isSaving ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Save className="h-4 w-4" />
                      )}
                      {isSaving ? 'Menyimpan...' : 'Simpan Semua'}
                    </Button>
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
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                        <Navigation className="h-4 w-4" />
                        <span>Tanjung Barat, Jakarta Selatan</span>
                      </div>
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

            {/* Categories Section */}
            <section className="py-12">
              <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-bold">Kategori</h2>
                    <p className="text-muted-foreground">
                      Pilih kategori untuk melihat daftar tempat dan alamatnya
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {categories.map((kategori, index) => {
                    const Icon = getIcon(kategori.icon)
                    return (
                      <Card
                        key={index}
                        className="relative hover:shadow-xl hover:border-primary/50 transition-all duration-300 group cursor-pointer"
                        onClick={() => setSelectedCategory(index)}
                      >
                        {isAdminMode && (
                          <div className="absolute top-2 right-2 flex gap-2 z-10">
                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={(e) => {
                                e.stopPropagation()
                                setEditCategory(index)
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleDeleteCategory(index)
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                        <CardHeader>
                          <div className="space-y-3">
                            <div className={`p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors inline-block`}>
                              <Icon className="h-6 w-6 text-primary" />
                            </div>
                            {isAdminMode && editCategory === index ? (
                              <div className="space-y-2">
                                <Input
                                  value={kategori.nama}
                                  onChange={(e) => {
                                    const updated = [...categories]
                                    updated[index] = { ...updated[index], nama: e.target.value }
                                    setCategories(updated)
                                  }}
                                  className="text-xl font-bold"
                                />
                                <Textarea
                                  value={kategori.deskripsi}
                                  onChange={(e) => {
                                    const updated = [...categories]
                                    updated[index] = { ...updated[index], deskripsi: e.target.value }
                                    setCategories(updated)
                                  }}
                                  rows={2}
                                  className="text-sm"
                                />
                                <Button onClick={() => setEditCategory(null)} size="sm">Selesai</Button>
                              </div>
                            ) : (
                              <>
                                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                                  {kategori.nama}
                                </CardTitle>
                                <CardDescription className="text-base">
                                  {kategori.deskripsi}
                                </CardDescription>
                              </>
                            )}
                          </div>
                          <CardContent className="pt-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">
                                {kategori.tempat.length} tempat tersedia
                              </span>
                              <ChevronRight className="h-5 w-5 text-primary group-hover:translate-x-1 transition-transform" />
                            </div>
                          </CardContent>
                        </CardHeader>
                      </Card>
                    )
                  })}
                  {isAdminMode && (
                    <Button
                      onClick={handleAddCategory}
                      variant="outline"
                      className="w-full h-full min-h-[200px] gap-2 border-dashed"
                    >
                      <Plus className="h-4 w-4" />
                      Tambah Kategori
                    </Button>
                  )}
                </div>
              </div>
            </section>

            {/* Selected Category Detail */}
            {selectedCategory !== null && (
              <section className="py-12 bg-muted/30">
                <div className="container mx-auto px-4">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        {(() => {
                          const Icon = getIcon(categories[selectedCategory].icon)
                          return <Icon className="h-6 w-6 text-primary" />
                        })()}
                        <h3 className="text-2xl font-bold">
                          {categories[selectedCategory].nama}
                        </h3>
                      </div>
                      <p className="text-muted-foreground">
                        {categories[selectedCategory].deskripsi}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {isAdminMode && (
                        <Button
                          onClick={() => handleAddPlace(selectedCategory)}
                          variant="default"
                          className="gap-2"
                        >
                          <Plus className="h-4 w-4" />
                          Tambah Tempat
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        onClick={() => setSelectedCategory(null)}
                      >
                        Tutup
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {isAdminMode && (
                      <div className="flex items-center gap-2 text-sm bg-primary/10 p-3 rounded-lg">
                        <Edit className="h-4 w-4 text-primary" />
                        <span className="font-medium text-primary">
                          Klik tombol Edit (ikon pensil) pada kartu kategori untuk mengedit detail kategori,
                          atau klik kartu kategori untuk mengelola tempat di dalamnya.
                        </span>
                      </div>
                    )}
                    {categories[selectedCategory].tempat.length > 0 ? (
                      categories[selectedCategory].tempat.map((tempat, placeIndex) => (
                        <Card
                          key={placeIndex}
                          className="relative hover:shadow-lg transition-all duration-200 border-l-4 border-l-primary group"
                        >
                          {isAdminMode && (
                            <div className="absolute top-2 right-2 flex gap-2 z-10">
                              <Button
                                size="sm"
                                variant="secondary"
                                onClick={() => setEditPlace(placeIndex)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleDeletePlace(selectedCategory, placeIndex)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          )}
                          <CardContent className="p-6">
                            {isAdminMode && editPlace === placeIndex ? (
                              <div className="space-y-4">
                                <div>
                                  <Label>Nama Tempat</Label>
                                  <Input
                                    value={tempat.nama}
                                    onChange={(e) => {
                                      const updated = [...categories]
                                      updated[selectedCategory].tempat[placeIndex] = { ...tempat, nama: e.target.value }
                                      setCategories(updated)
                                    }}
                                  />
                                </div>
                                <div>
                                  <Label>Alamat</Label>
                                  <Textarea
                                    value={tempat.alamat}
                                    onChange={(e) => {
                                      const updated = [...categories]
                                      updated[selectedCategory].tempat[placeIndex] = { ...tempat, alamat: e.target.value }
                                      setCategories(updated)
                                    }}
                                    rows={2}
                                  />
                                </div>
                                <div className="flex gap-2">
                                  <Button onClick={() => setEditPlace(null)} size="sm">Selesai</Button>
                                </div>
                              </div>
                            ) : (
                              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                <div className="flex-1 space-y-2">
                                  <div className="flex items-center gap-2 mb-1">
                                    <div className="p-2 rounded-md bg-primary/10">
                                      <Building2 className="h-4 w-4 text-primary" />
                                    </div>
                                    <h4 className="text-xl font-bold">{tempat.nama}</h4>
                                  </div>
                                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                                    <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                    <span className="break-words">{tempat.alamat}</span>
                                  </div>
                                </div>
                                <div className="flex-shrink-0">
                                  <button
                                    onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(tempat.alamat)}`, '_blank')}
                                    className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                                  >
                                    <Navigation className="h-4 w-4" />
                                    <span className="font-medium">Petunjuk Arah</span>
                                  </button>
                                </div>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center py-12 space-y-4 text-center">
                        <div className="p-4 rounded-full bg-muted/10">
                          <Building2 className="h-12 w-12 text-muted-foreground" />
                        </div>
                        <h3 className="text-xl font-semibold text-muted-foreground">
                          Belum ada data tempat
                        </h3>
                        <p className="text-muted-foreground">
                          {isAdminMode
                            ? 'Klik tombol "Tambah Tempat" di atas untuk menambah tempat baru'
                            : 'Belum ada tempat yang tersedia di kategori ini'}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="bg-background border-t p-4 mt-6 rounded-b-lg">
                    <div className="flex items-center gap-4 text-sm">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        Total {categories[selectedCategory].tempat.length} tempat di kategori ini
                      </span>
                    </div>
                  </div>
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

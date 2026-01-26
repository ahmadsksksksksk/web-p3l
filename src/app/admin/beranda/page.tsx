'use client'

import { useState } from 'react'
import AdminSidebar from '@/components/admin/admin-sidebar'
import AdminHeader from '@/components/admin/admin-header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowRight, Users, Building2, TreePine, Newspaper, Phone, Eye, EyeOff, Save, Plus, Trash2, Edit } from 'lucide-react'
import { Switch } from '@/components/ui/switch'
import { useRouter } from 'next/navigation'

interface Feature {
  icon: string
  title: string
  description: string
}

interface Statistic {
  label: string
  value: string
}

interface News {
  id: number
  title: string
  description: string
  date: string
}

export default function AdminBerandaPage() {
  const router = useRouter()

  // Edit/Preview mode toggle
  const [isAdminMode, setIsAdminMode] = useState(true)

  // Hero Section
  const [heroTitle, setHeroTitle] = useState('Selamat Datang di')
  const [heroSubtitle, setHeroSubtitle] = useState('Tanjung Barat')
  const [heroDescription, setHeroDescription] = useState('Daerah yang memadukan kearifan lokal dengan kemajuan modern. Temukan informasi lengkap tentang profil, pelayanan, potensi wisata, dan berita terkini Tanjung Barat.')
  const [heroButtonText1, setHeroButtonText1] = useState('Jelajahi Profil')
  const [heroButtonText2, setHeroButtonText2] = useState('Hubungi Kami')

  // Features Section
  const [whyTitle, setWhyTitle] = useState('Mengapa Tanjung Barat?')
  const [whyDescription, setWhyDescription] = useState('Tanjung Barat menawarkan berbagai keunggulan yang membuatnya menjadi tempat yang ideal untuk tinggal dan berkembang.')
  const [features, setFeatures] = useState<Feature[]>([
    {
      icon: 'Users',
      title: 'Masyarakat yang Sejahtera',
      description: 'Berkomitmen meningkatkan kesejahteraan masyarakat Tanjung Barat melalui berbagai program pembangunan yang berkelanjutan.',
    },
    {
      icon: 'Building2',
      title: 'Infrastruktur Modern',
      description: 'Pengembangan infrastruktur yang lengkap untuk mendukung kebutuhan masyarakat dalam berbagai aspek kehidupan.',
    },
    {
      icon: 'TreePine',
      title: 'Lingkungan yang Asri',
      description: 'Menjaga kelestarian lingkungan dan menciptakan ruang terbuka hijau yang nyaman bagi seluruh warga.',
    },
  ])

  // Statistics Section
  const [statistics, setStatistics] = useState<Statistic[]>([
    { label: 'Penduduk', value: '50,000+' },
    { label: 'Luas Wilayah', value: '450 Ha' },
    { label: 'Rumah Tangga', value: '15,000+' },
    { label: 'Fasilitas Umum', value: '100+' },
  ])

  // News Section
  const [newsTitle, setNewsTitle] = useState('Berita Terkini')
  const [newsDescription, setNewsDescription] = useState('Dapatkan informasi terbaru seputar Tanjung Barat')
  const [newsButtonText, setNewsButtonText] = useState('Lihat Semua Berita')
  const [latestNews, setLatestNews] = useState<News[]>([
    {
      id: 1,
      title: 'Peresmian Taman Baru di Tanjung Barat',
      description: 'Wali kota meresmikan taman baru yang dilengkapi dengan fasilitas bermain anak dan area olahraga.',
      date: '15 Januari 2025',
    },
    {
      id: 2,
      title: 'Program Kesehatan Gratis untuk Lansia',
      description: 'Pemerintah setempat memulai program kesehatan gratis bagi warga lansia di seluruh Tanjung Barat.',
      date: '12 Januari 2025',
    },
    {
      id: 3,
      title: 'Penghargaan Adipura untuk Kebersihan',
      description: 'Tanjung Barat kembali meraih penghargaan Adipura berkat keberhasilan dalam menjaga kebersihan lingkungan.',
      date: '10 Januari 2025',
    },
  ])

  // CTA Section
  const [ctaTitle, setCtaTitle] = useState('Siap Menjelajahi Tanjung Barat?')
  const [ctaDescription, setCtaDescription] = useState('Temukan informasi lengkap mengenai pelayanan, potensi wisata, dan berbagai informasi lainnya di Tanjung Barat.')
  const [ctaButtonText, setCtaButtonText] = useState('Mulai Jelajah')

  // Edit states
  const [editHero, setEditHero] = useState(false)
  const [editWhy, setEditWhy] = useState(false)
  const [editFeature, setEditFeature] = useState<number | null>(null)
  const [editStatistic, setEditStatistic] = useState<number | null>(null)
  const [editNewsHeader, setEditNewsHeader] = useState(false)
  const [editNewsItem, setEditNewsItem] = useState<number | null>(null)
  const [editCta, setEditCta] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const handleSaveAll = async () => {
    setIsSaving(true)
    try {
      const dataToSave = {
        hero: {
          title: heroTitle,
          subtitle: heroSubtitle,
          description: heroDescription,
          buttonText1: heroButtonText1,
          buttonText2: heroButtonText2
        },
        whySection: {
          title: whyTitle,
          description: whyDescription
        },
        features,
        statistics,
        newsHeader: {
          title: newsTitle,
          description: newsDescription,
          buttonText: newsButtonText
        },
        cta: {
          title: ctaTitle,
          description: ctaDescription,
          buttonText: ctaButtonText
        }
      }

      console.log('Sending data to API:', dataToSave)

      const response = await fetch('/api/content/beranda', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSave)
      })

      console.log('API Response status:', response.status)

      const result = await response.json()
      console.log('API Response:', result)

      if (result.success) {
        alert('Semua perubahan berhasil disimpan!')
      } else {
        alert('Gagal menyimpan: ' + (result.error || 'Unknown error'))
      }
    } catch (error) {
      console.error('Error saving:', error)
      alert('Gagal menyimpan data. Silakan coba lagi.\n\nError: ' + String(error))
    } finally {
      setIsSaving(false)
    }
  }

  const handlePreview = () => {
    router.push('/')
  }

  const handleAddFeature = () => {
    setFeatures([...features, { icon: 'Users', title: '', description: '' }])
    setEditFeature(features.length)
  }

  const handleDeleteFeature = (index: number) => {
    if (!confirm('Yakin ingin menghapus fitur ini?')) return
    setFeatures(features.filter((_, i) => i !== index))
  }

  const handleAddStatistic = () => {
    setStatistics([...statistics, { label: '', value: '' }])
    setEditStatistic(statistics.length)
  }

  const handleDeleteStatistic = (index: number) => {
    if (!confirm('Yakin ingin menghapus statistik ini?')) return
    setStatistics(statistics.filter((_, i) => i !== index))
  }

  const handleAddNews = () => {
    const newId = Math.max(...latestNews.map(n => n.id)) + 1
    setLatestNews([...latestNews, { id: newId, title: '', description: '', date: '' }])
    setEditNewsItem(latestNews.length)
  }

  const handleDeleteNews = (id: number) => {
    if (!confirm('Yakin ingin menghapus berita ini?')) return
    setLatestNews(latestNews.filter(n => n.id !== id))
  }

  const getIcon = (iconName: string): typeof Users => {
    switch (iconName) {
      case 'Users': return Users
      case 'Building2': return Building2
      case 'TreePine': return TreePine
      case 'Newspaper': return Newspaper
      default: return Users
    }
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
                    <Button onClick={handleSaveAll} className="gap-2" disabled={isSaving}>
                      <Save className="h-4 w-4" />
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
          <div className="space-y-8">
            {/* Hero Section */}
            <section className="relative py-20 md:py-32 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />
              <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-3xl space-y-6">
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
                        <Label>Judul Baris 1</Label>
                        <Input value={heroTitle} onChange={(e) => setHeroTitle(e.target.value)} />
                      </div>
                      <div>
                        <Label>Judul Baris 2 (Warna)</Label>
                        <Input value={heroSubtitle} onChange={(e) => setHeroSubtitle(e.target.value)} />
                      </div>
                      <div>
                        <Label>Deskripsi</Label>
                        <Textarea value={heroDescription} onChange={(e) => setHeroDescription(e.target.value)} rows={3} />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Teks Tombol 1</Label>
                          <Input value={heroButtonText1} onChange={(e) => setHeroButtonText1(e.target.value)} />
                        </div>
                        <div>
                          <Label>Teks Tombol 2</Label>
                          <Input value={heroButtonText2} onChange={(e) => setHeroButtonText2(e.target.value)} />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                        {heroTitle}
                        <span className="block text-primary mt-2">{heroSubtitle}</span>
                      </h1>
                      <p className="text-xl text-muted-foreground">
                        {heroDescription}
                      </p>
                      <div className="flex flex-wrap gap-4 pt-4">
                        <Button size="lg" className="gap-2">
                          {heroButtonText1}
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                        <Button size="lg" variant="outline" className="gap-2">
                          <Phone className="h-4 w-4" />
                          {heroButtonText2}
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-muted/30">
              <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-12">
                  <div className="text-center space-y-4 flex-1">
                    {isAdminMode && editWhy ? (
                      <div className="space-y-4">
                        <Input
                          value={whyTitle}
                          onChange={(e) => setWhyTitle(e.target.value)}
                          className="text-3xl md:text-4xl font-bold text-center"
                        />
                        <Textarea
                          value={whyDescription}
                          onChange={(e) => setWhyDescription(e.target.value)}
                          className="text-center max-w-2xl mx-auto"
                          rows={2}
                        />
                      </div>
                    ) : (
                      <>
                        <h2 className="text-3xl md:text-4xl font-bold">{whyTitle}</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                          {whyDescription}
                        </p>
                      </>
                    )}
                  </div>
                  {isAdminMode && (
                    <Button onClick={() => setEditWhy(!editWhy)} variant="secondary" size="sm" className="gap-2 mb-8">
                      <Edit className="h-4 w-4" />
                      {editWhy ? 'Tutup Edit' : 'Edit Section'}
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {features.map((feature, index) => {
                    const Icon = getIcon(feature.icon)
                    return (
                      <Card key={index} className="relative border-none shadow-lg hover:shadow-xl transition-shadow group">
                        <CardHeader>
                          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                            <Icon className="h-6 w-6 text-primary" />
                          </div>
                          <CardTitle className="text-xl">{feature.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription className="text-base">
                            {feature.description}
                          </CardDescription>
                        </CardContent>
                        {isAdminMode && (
                          <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={() => setEditFeature(index)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeleteFeature(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </Card>
                    )
                  })}
                  {isAdminMode && editFeature !== null && (
                    <Card className="border-2 border-primary">
                      <CardHeader>
                        <CardTitle className="text-lg">Edit Fitur</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label>Judul</Label>
                          <Input
                            value={features[editFeature]?.title || ''}
                            onChange={(e) => {
                              const updated = [...features]
                              updated[editFeature!] = { ...updated[editFeature!], title: e.target.value }
                              setFeatures(updated)
                            }}
                          />
                        </div>
                        <div>
                          <Label>Deskripsi</Label>
                          <Textarea
                            value={features[editFeature]?.description || ''}
                            onChange={(e) => {
                              const updated = [...features]
                              updated[editFeature!] = { ...updated[editFeature!], description: e.target.value }
                              setFeatures(updated)
                            }}
                            rows={3}
                          />
                        </div>
                        <Button onClick={() => setEditFeature(null)} size="sm">Selesai</Button>
                      </CardContent>
                    </Card>
                  )}
                  {isAdminMode && (
                    <Button
                      onClick={handleAddFeature}
                      variant="outline"
                      className="w-full h-full min-h-[200px] gap-2 border-dashed"
                    >
                      <Plus className="h-4 w-4" />
                      Tambah Fitur
                    </Button>
                  )}
                </div>
              </div>
            </section>

            {/* Statistics Section */}
            <section className="py-16">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {statistics.map((stat, index) => (
                    <div key={index} className="relative text-center space-y-2 group">
                      {isAdminMode && editStatistic === index ? (
                        <div className="space-y-2">
                          <Input
                            value={stat.value}
                            onChange={(e) => {
                              const updated = [...statistics]
                              updated[index] = { ...updated[index], value: e.target.value }
                              setStatistics(updated)
                            }}
                            className="text-3xl md:text-4xl font-bold text-primary text-center"
                          />
                          <Input
                            value={stat.label}
                            onChange={(e) => {
                              const updated = [...statistics]
                              updated[index] = { ...updated[index], label: e.target.value }
                              setStatistics(updated)
                            }}
                            className="text-center"
                          />
                          <Button onClick={() => setEditStatistic(null)} size="sm">Selesai</Button>
                        </div>
                      ) : (
                        <>
                          <div className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</div>
                          <div className="text-muted-foreground">{stat.label}</div>
                        </>
                      )}
                      {isAdminMode && editStatistic !== index && (
                        <div className="absolute top-0 right-0 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => setEditStatistic(index)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteStatistic(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                  {isAdminMode && (
                    <Button
                      onClick={handleAddStatistic}
                      variant="outline"
                      className="w-full h-full min-h-[120px] gap-2 border-dashed"
                    >
                      <Plus className="h-4 w-4" />
                      Tambah Statistik
                    </Button>
                  )}
                </div>
              </div>
            </section>

            {/* Latest News Preview */}
            <section className="py-16 bg-muted/30">
              <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                  <div className="space-y-2">
                    {isAdminMode && editNewsHeader ? (
                      <div className="space-y-4">
                        <Input
                          value={newsTitle}
                          onChange={(e) => setNewsTitle(e.target.value)}
                          className="text-3xl md:text-4xl font-bold"
                        />
                        <Input
                          value={newsDescription}
                          onChange={(e) => setNewsDescription(e.target.value)}
                        />
                        <Input
                          value={newsButtonText}
                          onChange={(e) => setNewsButtonText(e.target.value)}
                        />
                        <Button onClick={() => setEditNewsHeader(false)} size="sm">Selesai</Button>
                      </div>
                    ) : (
                      <>
                        <h2 className="text-3xl md:text-4xl font-bold">{newsTitle}</h2>
                        <p className="text-muted-foreground">
                          {newsDescription}
                        </p>
                      </>
                    )}
                  </div>
                  {isAdminMode && (
                    <Button onClick={() => setEditNewsHeader(true)} variant="secondary" size="sm" className="gap-2">
                      <Edit className="h-4 w-4" />
                      Edit Header
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {latestNews.map((news) => (
                    <Card key={news.id} className="relative hover:shadow-lg transition-shadow cursor-pointer group">
                      <CardHeader>
                        <div className="text-sm text-muted-foreground mb-2">{news.date}</div>
                        <CardTitle className="text-lg line-clamp-2">{news.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="line-clamp-3">
                          {news.description}
                        </CardDescription>
                      </CardContent>
                      {isAdminMode && (
                        <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
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
                    </Card>
                  ))}
                  {isAdminMode && editNewsItem !== null && (
                    <Card className="border-2 border-primary">
                      <CardHeader>
                        <CardTitle className="text-lg">Edit Berita</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label>Tanggal</Label>
                          <Input
                            value={latestNews.find(n => n.id === editNewsItem)?.date || ''}
                            onChange={(e) => {
                              const updated = latestNews.map(n =>
                                n.id === editNewsItem ? { ...n, date: e.target.value } : n
                              )
                              setLatestNews(updated)
                            }}
                          />
                        </div>
                        <div>
                          <Label>Judul</Label>
                          <Input
                            value={latestNews.find(n => n.id === editNewsItem)?.title || ''}
                            onChange={(e) => {
                              const updated = latestNews.map(n =>
                                n.id === editNewsItem ? { ...n, title: e.target.value } : n
                              )
                              setLatestNews(updated)
                            }}
                          />
                        </div>
                        <div>
                          <Label>Deskripsi</Label>
                          <Textarea
                            value={latestNews.find(n => n.id === editNewsItem)?.description || ''}
                            onChange={(e) => {
                              const updated = latestNews.map(n =>
                                n.id === editNewsItem ? { ...n, description: e.target.value } : n
                              )
                              setLatestNews(updated)
                            }}
                            rows={3}
                          />
                        </div>
                        <Button onClick={() => setEditNewsItem(null)} size="sm">Selesai</Button>
                      </CardContent>
                    </Card>
                  )}
                  {isAdminMode && (
                    <Button
                      onClick={handleAddNews}
                      variant="outline"
                      className="w-full h-full min-h-[200px] gap-2 border-dashed"
                    >
                      <Plus className="h-4 w-4" />
                      Tambah Berita
                    </Button>
                  )}
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="py-16">
              <div className="container mx-auto px-4">
                <Card className="relative border-none bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
                  {isAdminMode && (
                    <div className="absolute top-4 right-4">
                      <Button onClick={() => setEditCta(!editCta)} variant="secondary" size="sm" className="gap-2">
                        <Edit className="h-4 w-4" />
                        {editCta ? 'Tutup Edit' : 'Edit Section'}
                      </Button>
                    </div>
                  )}
                  <CardContent className="p-8 md:p-12 text-center space-y-6">
                    {isAdminMode && editCta ? (
                      <div className="space-y-4">
                        <Input
                          value={ctaTitle}
                          onChange={(e) => setCtaTitle(e.target.value)}
                          className="text-3xl md:text-4xl font-bold text-center bg-primary/50 text-primary-foreground border-white/20"
                        />
                        <Textarea
                          value={ctaDescription}
                          onChange={(e) => setCtaDescription(e.target.value)}
                          className="text-center max-w-2xl mx-auto bg-primary/50 text-primary-foreground border-white/20"
                          rows={2}
                        />
                        <Input
                          value={ctaButtonText}
                          onChange={(e) => setCtaButtonText(e.target.value)}
                          className="text-center max-w-md mx-auto bg-primary/50 text-primary-foreground border-white/20"
                        />
                      </div>
                    ) : (
                      <>
                        <h2 className="text-3xl md:text-4xl font-bold">
                          {ctaTitle}
                        </h2>
                        <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
                          {ctaDescription}
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                          <Button size="lg" variant="secondary" className="gap-2">
                            {ctaButtonText}
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}

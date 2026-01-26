'use client'

import { useState, useEffect } from 'react'
import AdminSidebar from '@/components/admin/admin-sidebar'
import AdminHeader from '@/components/admin/admin-header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FileText, Users, Building, ClipboardCheck, Phone, Clock, Info, AlertCircle, Eye, EyeOff, Save, Plus, Trash2, Edit, Loader2 } from 'lucide-react'
import { Switch } from '@/components/ui/switch'
import { useRouter } from 'next/navigation'

interface Service {
  title: string
  description: string
  requirements: string[]
  processingTime: string
}

interface ServiceCategory {
  category: string
  icon: string
  services: Service[]
}

interface ImportantInfo {
  icon: string
  title: string
  content: string
}

export default function AdminPelayananPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  // Edit/Preview mode toggle
  const [isAdminMode, setIsAdminMode] = useState(true)

  // Hero Section
  const [heroTitle, setHeroTitle] = useState('')
  const [heroDescription, setHeroDescription] = useState('')

  // Important Info
  const [importantInfo, setImportantInfo] = useState<ImportantInfo[]>([])

  // Services
  const [services, setServices] = useState<ServiceCategory[]>([])

  // CTA Section
  const [ctaTitle, setCtaTitle] = useState('')
  const [ctaDescription, setCtaDescription] = useState('')
  const [ctaButton1, setCtaButton1] = useState('')
  const [ctaButton2, setCtaButton2] = useState('')

  // Edit states
  const [editHero, setEditHero] = useState(false)
  const [editInfoItem, setEditInfoItem] = useState<number | null>(null)
  const [editCategory, setEditCategory] = useState<number | null>(null)
  const [editService, setEditService] = useState<{ categoryIndex: number | null; serviceIndex: number | null }>({ categoryIndex: null, serviceIndex: null })
  const [editCta, setEditCta] = useState(false)

  // Fetch Pelayanan data from API
  useEffect(() => {
    fetchPelayananData()
  }, [])

  const fetchPelayananData = async () => {
    try {
      console.log('Fetching Pelayanan data from API...')
      const response = await fetch('/api/content/pelayanan')
      const result = await response.json()

      if (result.success && result.data) {
        const data = result.data

        if (data.hero) {
          setHeroTitle(data.hero.title || '')
          setHeroDescription(data.hero.description || '')
        }

        if (data.importantInfo && Array.isArray(data.importantInfo)) {
          setImportantInfo(data.importantInfo)
        }

        if (data.categories && Array.isArray(data.categories)) {
          const categoriesWithServices = data.categories.map((cat: any) => ({
            category: cat.category,
            icon: cat.icon,
            id: cat.id,
            services: (cat.services || []).map((service: any) => ({
              ...service,
              requirements: Array.isArray(service.requirements)
                ? service.requirements
                : (service.requirements || '').split('\n').filter((r: string) => r.trim() !== '')
            }))
          }))
          setServices(categoriesWithServices)
        }

        if (data.cta) {
          setCtaTitle(data.cta.title || '')
          setCtaDescription(data.cta.description || '')
          setCtaButton1(data.cta.button1 || '')
          setCtaButton2(data.cta.button2 || '')
        }

        console.log('Pelayanan data loaded successfully')
      } else {
        console.error('Failed to load Pelayanan data:', result.error)
      }
    } catch (error) {
      console.error('Error fetching Pelayanan data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveAll = async () => {
    setIsSaving(true)
    try {
      console.log('Saving Pelayanan data...')

      // Convert requirements array back to string for saving
      const servicesToSave = services.map((cat: any) => ({
        ...cat,
        services: cat.services.map((service: any) => ({
          ...service,
          requirements: Array.isArray(service.requirements)
            ? service.requirements.join('\n')
            : service.requirements
        }))
      }))

      const dataToSave = {
        hero: {
          title: heroTitle,
          description: heroDescription
        },
        importantInfo: importantInfo,
        categories: servicesToSave,
        cta: {
          title: ctaTitle,
          description: ctaDescription,
          button1: ctaButton1,
          button2: ctaButton2
        }
      }

      const response = await fetch('/api/content/pelayanan', {
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
      console.error('Error saving Pelayanan data:', error)
      alert('Gagal menyimpan: Terjadi kesalahan saat menyimpan data')
    } finally {
      setIsSaving(false)
    }
  }

  const handlePreview = () => {
    router.push('/pelayanan')
  }

  const getIcon = (iconName: string): typeof FileText => {
    switch (iconName) {
      case 'FileText': return FileText
      case 'Users': return Users
      case 'Building': return Building
      case 'ClipboardCheck': return ClipboardCheck
      case 'Clock': return Clock
      case 'Phone': return Phone
      case 'AlertCircle': return AlertCircle
      case 'Info': return Info
      default: return FileText
    }
  }

  const handleAddInfoItem = () => {
    setImportantInfo([...importantInfo, { icon: 'Info', title: '', content: '' }])
    setEditInfoItem(importantInfo.length)
  }

  const handleDeleteInfoItem = (index: number) => {
    if (!confirm('Yakin ingin menghapus informasi ini?')) return
    setImportantInfo(importantInfo.filter((_, i) => i !== index))
  }

  const handleAddCategory = () => {
    setServices([...services, { category: 'Kategori Baru', icon: 'FileText', services: [] }])
    setEditCategory(services.length)
  }

  const handleDeleteCategory = (index: number) => {
    if (!confirm('Yakin ingin menghapus kategori ini?')) return
    setServices(services.filter((_, i) => i !== index))
  }

  const handleAddService = (categoryIndex: number) => {
    const updated = [...services]
    updated[categoryIndex].services.push({
      title: '',
      description: '',
      requirements: [],
      processingTime: ''
    })
    setServices(updated)
    setEditService({ categoryIndex, serviceIndex: updated[categoryIndex].services.length - 1 })
  }

  const handleDeleteService = (categoryIndex: number, serviceIndex: number) => {
    if (!confirm('Yakin ingin menghapus layanan ini?')) return
    const updated = [...services]
    updated[categoryIndex].services = updated[categoryIndex].services.filter((_, i) => i !== serviceIndex)
    setServices(updated)
  }

  const handleAddRequirement = (categoryIndex: number, serviceIndex: number) => {
    const updated = [...services]
    if (!Array.isArray(updated[categoryIndex].services[serviceIndex].requirements)) {
      updated[categoryIndex].services[serviceIndex].requirements = []
    }
    updated[categoryIndex].services[serviceIndex].requirements.push('')
    setServices(updated)
  }

  const handleDeleteRequirement = (categoryIndex: number, serviceIndex: number, reqIndex: number) => {
    const updated = [...services]
    if (!Array.isArray(updated[categoryIndex].services[serviceIndex].requirements)) {
      return
    }
    updated[categoryIndex].services[serviceIndex].requirements = updated[categoryIndex].services[serviceIndex].requirements.filter((_, i) => i !== reqIndex)
    setServices(updated)
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

            {/* Important Info */}
            <section className="py-12 bg-muted/30">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {importantInfo.map((info, index) => {
                    const Icon = getIcon(info.icon)
                    return (
                      <Card key={index} className="relative border-none shadow-sm group">
                        <CardHeader>
                          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          <CardTitle className="text-lg">{info.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          {isAdminMode && editInfoItem === index ? (
                            <div className="space-y-2">
                              <Textarea
                                value={info.content}
                                onChange={(e) => {
                                  const updated = [...importantInfo]
                                  updated[index] = { ...updated[index], content: e.target.value }
                                  setImportantInfo(updated)
                                }}
                                rows={4}
                              />
                              <Button onClick={() => setEditInfoItem(null)} size="sm">Selesai</Button>
                            </div>
                          ) : (
                            <div className="text-sm text-muted-foreground whitespace-pre-line">
                              {info.content}
                            </div>
                          )}
                        </CardContent>
                        {isAdminMode && editInfoItem !== index && (
                          <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={() => setEditInfoItem(index)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeleteInfoItem(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </Card>
                    )
                  })}
                  {isAdminMode && (
                    <Button
                      onClick={handleAddInfoItem}
                      variant="outline"
                      className="w-full h-full min-h-[180px] gap-2 border-dashed"
                    >
                      <Plus className="h-4 w-4" />
                      Tambah Info
                    </Button>
                  )}
                </div>
              </div>
            </section>

            {/* Services List */}
            <section className="py-12">
              <div className="container mx-auto px-4">
                {services.map((category, categoryIndex) => {
                  const CategoryIcon = getIcon(category.icon)
                  return (
                    <div key={categoryIndex} className="mb-12 last:mb-0">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <div className="p-3 bg-primary/10 rounded-lg">
                            <CategoryIcon className="h-6 w-6 text-primary" />
                          </div>
                          {isAdminMode && editCategory === categoryIndex ? (
                            <Input
                              value={category.category}
                              onChange={(e) => {
                                const updated = [...services]
                                updated[categoryIndex] = { ...updated[categoryIndex], category: e.target.value }
                                setServices(updated)
                              }}
                              className="text-2xl md:text-3xl font-bold w-auto min-w-[300px]"
                            />
                          ) : (
                            <h2 className="text-2xl md:text-3xl font-bold">{category.category}</h2>
                          )}
                        </div>
                        {isAdminMode && (
                          <div className="flex gap-2">
                            <Button
                              variant="secondary"
                              size="sm"
                              className="gap-2"
                              onClick={() => setEditCategory(categoryIndex)}
                            >
                              <Edit className="h-4 w-4" />
                              Edit Kategori
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="gap-2"
                              onClick={() => handleAddService(categoryIndex)}
                            >
                              <Plus className="h-4 w-4" />
                              Tambah Layanan
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeleteCategory(categoryIndex)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {category.services.map((service, serviceIndex) => (
                          <Card key={serviceIndex} className="relative hover:shadow-lg transition-shadow flex flex-col h-full group">
                            {isAdminMode && editService.categoryIndex === categoryIndex && editService.serviceIndex === serviceIndex ? (
                              <CardContent className="p-6 space-y-4">
                                <div>
                                  <Label>Judul</Label>
                                  <Input
                                    value={service.title}
                                    onChange={(e) => {
                                      const updated = [...services]
                                      updated[categoryIndex].services[serviceIndex] = { ...service, title: e.target.value }
                                      setServices(updated)
                                    }}
                                  />
                                </div>
                                <div>
                                  <Label>Deskripsi</Label>
                                  <Textarea
                                    value={service.description}
                                    onChange={(e) => {
                                      const updated = [...services]
                                      updated[categoryIndex].services[serviceIndex] = { ...service, description: e.target.value }
                                      setServices(updated)
                                    }}
                                    rows={2}
                                  />
                                </div>
                                <div>
                                  <div className="flex items-center justify-between mb-2">
                                    <Label className="text-sm font-medium">Persyaratan:</Label>
                                    <Button size="sm" variant="outline" onClick={() => handleAddRequirement(categoryIndex, serviceIndex)}>
                                      <Plus className="h-3 w-3 mr-1" /> Tambah
                                    </Button>
                                  </div>
                                  <div className="space-y-2">
                                    {Array.isArray(service.requirements) && service.requirements.map((req, reqIndex) => (
                                      <div key={reqIndex} className="flex gap-2">
                                        <Input
                                          value={req}
                                          onChange={(e) => {
                                            const updated = [...services]
                                            updated[categoryIndex].services[serviceIndex].requirements[reqIndex] = e.target.value
                                            setServices(updated)
                                          }}
                                          placeholder="Persyaratan"
                                          className="flex-1"
                                        />
                                        <Button
                                          size="sm"
                                          variant="destructive"
                                          onClick={() => handleDeleteRequirement(categoryIndex, serviceIndex, reqIndex)}
                                        >
                                          <Trash2 className="h-3 w-3" />
                                        </Button>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                                <div>
                                  <Label>Waktu Proses</Label>
                                  <Input
                                    value={service.processingTime}
                                    onChange={(e) => {
                                      const updated = [...services]
                                      updated[categoryIndex].services[serviceIndex] = { ...service, processingTime: e.target.value }
                                      setServices(updated)
                                    }}
                                  />
                                </div>
                                <div className="flex gap-2">
                                  <Button onClick={() => setEditService({ categoryIndex: null, serviceIndex: null })} size="sm">Selesai</Button>
                                </div>
                              </CardContent>
                            ) : (
                              <>
                                <CardHeader>
                                  <CardTitle className="text-lg">{service.title}</CardTitle>
                                  <CardDescription className="text-base">
                                    {service.description}
                                  </CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow space-y-4">
                                  <div>
                                    <div className="flex items-center gap-2 text-sm font-medium mb-2 text-foreground">
                                      <Info className="h-4 w-4 text-primary" />
                                      Persyaratan:
                                    </div>
                                    <ul className="space-y-1">
                                      {Array.isArray(service.requirements) && service.requirements.length > 0 ? (
                                        service.requirements.map((req, reqIndex) => (
                                          <li key={reqIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                                            <span className="text-primary mt-1">•</span>
                                            <span>{req}</span>
                                          </li>
                                        ))
                                      ) : (
                                        <li className="text-sm text-muted-foreground">
                                          {service.requirements || 'Tidak ada persyaratan'}
                                        </li>
                                      )}
                                    </ul>
                                  </div>

                                  <div className="pt-4 border-t">
                                    <div className="flex items-center gap-2 text-sm">
                                      <Clock className="h-4 w-4 text-primary" />
                                      <span className="font-medium">Waktu Proses:</span>
                                      <span className="text-muted-foreground">{service.processingTime}</span>
                                    </div>
                                  </div>
                                </CardContent>
                                <div className="p-6 pt-0 mt-auto">
                                  <Button className="w-full" variant="outline">
                                    Ajukan Permohonan
                                  </Button>
                                </div>
                              </>
                            )}
                            {isAdminMode && editService.categoryIndex !== categoryIndex && editService.serviceIndex !== serviceIndex && (
                              <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button
                                  size="sm"
                                  variant="secondary"
                                  onClick={() => setEditService({ categoryIndex, serviceIndex })}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => handleDeleteService(categoryIndex, serviceIndex)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            )}
                          </Card>
                        ))}
                      </div>
                    </div>
                  )
                })}
                {isAdminMode && (
                  <div className="mb-12">
                    <Button
                      onClick={handleAddCategory}
                      variant="outline"
                      className="w-full gap-2 border-dashed py-8"
                    >
                      <Plus className="h-4 w-4" />
                      Tambah Kategori Layanan
                    </Button>
                  </div>
                )}
              </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-muted/30">
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
                        <div className="flex justify-center gap-4">
                          <Input
                            value={ctaButton1}
                            onChange={(e) => setCtaButton1(e.target.value)}
                            className="bg-primary/50 text-primary-foreground border-white/20 max-w-[200px]"
                          />
                          <Input
                            value={ctaButton2}
                            onChange={(e) => setCtaButton2(e.target.value)}
                            className="bg-primary/50 text-primary-foreground border-white/20 max-w-[200px]"
                          />
                        </div>
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
                            <Phone className="h-4 w-4" />
                            {ctaButton1}
                          </Button>
                          <Button size="lg" variant="outline" className="gap-2 border-white text-white hover:bg-white/10">
                            <FileText className="h-4 w-4" />
                            {ctaButton2}
                          </Button>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>
            </section>
          </div>
          )}
        </main>
      </div>
    </div>
  )
}

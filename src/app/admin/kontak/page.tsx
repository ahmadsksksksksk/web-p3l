'use client'

import { useState, useEffect } from 'react'
import AdminSidebar from '@/components/admin/admin-sidebar'
import AdminHeader from '@/components/admin/admin-header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { MapPin, Phone, Mail, Clock, Eye, EyeOff, Save, Edit, Building, Facebook, Twitter, Instagram, Linkedin, Plus, Trash2, Loader2 } from 'lucide-react'
import { Switch } from '@/components/ui/switch'
import { useRouter } from 'next/navigation'

interface ContactInfo {
  icon: string
  title: string
  content: string
}

interface SocialMedia {
  platform: string
  url: string
  icon: string
}

export default function AdminKontakPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  // Edit/Preview mode toggle
  const [isAdminMode, setIsAdminMode] = useState(true)

  // Hero Section
  const [heroTitle, setHeroTitle] = useState('')
  const [heroDescription, setHeroDescription] = useState('')

  // Contact Information
  const [contactInfo, setContactInfo] = useState<ContactInfo[]>([])

  // Office Details
  const [officeName, setOfficeName] = useState('')
  const [officeAddress, setOfficeAddress] = useState('')
  const [officeCity, setOfficeCity] = useState('')
  const [officePhone, setOfficePhone] = useState('')
  const [officeFax, setOfficeFax] = useState('')
  const [officeEmail, setOfficeEmail] = useState('')
  const [officeWhatsApp, setOfficeWhatsApp] = useState('')

  // Social Media
  const [socialMedia, setSocialMedia] = useState<SocialMedia[]>([])

  // Additional Info
  const [additionalInfo, setAdditionalInfo] = useState('')

  // Edit states
  const [editHero, setEditHero] = useState(false)
  const [editContactItem, setEditContactItem] = useState<number | null>(null)
  const [editOfficeDetails, setEditOfficeDetails] = useState(false)
  const [editSocialMedia, setEditSocialMedia] = useState<number | null>(null)
  const [editAdditionalInfo, setEditAdditionalInfo] = useState(false)

  // Fetch Kontak data from API
  useEffect(() => {
    fetchKontakData()
  }, [])

  const fetchKontakData = async () => {
    try {
      console.log('Fetching Kontak data from API...')
      const response = await fetch('/api/content/kontak')
      const result = await response.json()

      if (result.success && result.data) {
        const data = result.data

        if (data.hero) {
          setHeroTitle(data.hero.title || '')
          setHeroDescription(data.hero.description || '')
        }

        if (data.infoItems && Array.isArray(data.infoItems)) {
          setContactInfo(data.infoItems)
        }

        if (data.office) {
          setOfficeName(data.office.name || '')
          setOfficeAddress(data.office.address || '')
          setOfficeCity(data.office.city || '')
          setOfficePhone(data.office.phone || '')
          setOfficeFax(data.office.fax || '')
          setOfficeEmail(data.office.email || '')
          setOfficeWhatsApp(data.office.whatsapp || '')
        }

        if (data.socialMedia && Array.isArray(data.socialMedia)) {
          setSocialMedia(data.socialMedia)
        }

        if (data.additionalInfo) {
          setAdditionalInfo(data.additionalInfo.content || '')
        }

        console.log('Kontak data loaded successfully')
      } else {
        console.error('Failed to load Kontak data:', result.error)
      }
    } catch (error) {
      console.error('Error fetching Kontak data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getIcon = (iconName: string): typeof MapPin => {
    switch (iconName) {
      case 'MapPin': return MapPin
      case 'Phone': return Phone
      case 'Mail': return Mail
      case 'Clock': return Clock
      case 'Building': return Building
      case 'Facebook': return Facebook
      case 'Twitter': return Twitter
      case 'Instagram': return Instagram
      case 'Linkedin': return Linkedin
      default: return MapPin
    }
  }

  const handleSaveAll = async () => {
    setIsSaving(true)
    try {
      console.log('Saving Kontak data...')
      const dataToSave = {
        hero: {
          title: heroTitle,
          description: heroDescription
        },
        infoItems: contactInfo,
        office: {
          name: officeName,
          address: officeAddress,
          city: officeCity,
          phone: officePhone,
          fax: officeFax,
          email: officeEmail,
          whatsapp: officeWhatsApp
        },
        socialMedia: socialMedia,
        additionalInfo: {
          content: additionalInfo
        }
      }

      const response = await fetch('/api/content/kontak', {
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
      console.error('Error saving Kontak data:', error)
      alert('Gagal menyimpan: Terjadi kesalahan saat menyimpan data')
    } finally {
      setIsSaving(false)
    }
  }

  const handlePreview = () => {
    router.push('/kontak')
  }

  const handleAddContactItem = () => {
    setContactInfo([...contactInfo, { icon: 'Phone', title: 'Judul Baru', content: 'Isi konten di sini' }])
    setEditContactItem(contactInfo.length)
  }

  const handleDeleteContactItem = (index: number) => {
    if (!confirm('Yakin ingin menghapus informasi ini?')) return
    setContactInfo(contactInfo.filter((_, i) => i !== index))
  }

  const handleAddSocialMedia = () => {
    setSocialMedia([...socialMedia, { platform: 'Platform Baru', url: '', icon: 'Facebook' }])
    setEditSocialMedia(socialMedia.length)
  }

  const handleDeleteSocialMedia = (index: number) => {
    if (!confirm('Yakin ingin menghapus sosial media ini?')) return
    setSocialMedia(socialMedia.filter((_, i) => i !== index))
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

            {/* Contact Info */}
            <section className="py-12">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {contactInfo.map((info, index) => {
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
                          {isAdminMode && editContactItem === index ? (
                            <div className="space-y-2">
                              <Textarea
                                value={info.content}
                                onChange={(e) => {
                                  const updated = [...contactInfo]
                                  updated[index] = { ...updated[index], content: e.target.value }
                                  setContactInfo(updated)
                                }}
                                rows={4}
                              />
                              <Button onClick={() => setEditContactItem(null)} size="sm">Selesai</Button>
                            </div>
                          ) : (
                            <div className="text-sm text-muted-foreground whitespace-pre-line">
                              {info.content}
                            </div>
                          )}
                        </CardContent>
                        {isAdminMode && editContactItem !== index && (
                          <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={() => setEditContactItem(index)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeleteContactItem(index)}
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
                      onClick={handleAddContactItem}
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

            {/* Office Details */}
            <section className="py-12 bg-muted/30">
              <div className="container mx-auto px-4">
                <Card className="relative">
                  {isAdminMode && (
                    <div className="absolute top-4 right-4">
                      <Button onClick={() => setEditOfficeDetails(!editOfficeDetails)} variant="secondary" size="sm" className="gap-2">
                        <Edit className="h-4 w-4" />
                        {editOfficeDetails ? 'Tutup Edit' : 'Edit Detail Kantor'}
                      </Button>
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Building className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl">{officeName}</CardTitle>
                        <CardDescription>
                          Informasi detail kantor kelurahan
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    {isAdminMode && editOfficeDetails ? (
                      <div className="space-y-4">
                        <div>
                          <Label>Nama Kantor</Label>
                          <Input value={officeName} onChange={(e) => setOfficeName(e.target.value)} />
                        </div>
                        <div>
                          <Label>Alamat</Label>
                          <Input value={officeAddress} onChange={(e) => setOfficeAddress(e.target.value)} />
                        </div>
                        <div>
                          <Label>Kota</Label>
                          <Input value={officeCity} onChange={(e) => setOfficeCity(e.target.value)} />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label>Telepon</Label>
                            <Input value={officePhone} onChange={(e) => setOfficePhone(e.target.value)} />
                          </div>
                          <div>
                            <Label>Fax</Label>
                            <Input value={officeFax} onChange={(e) => setOfficeFax(e.target.value)} />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label>Email</Label>
                            <Input value={officeEmail} onChange={(e) => setOfficeEmail(e.target.value)} />
                          </div>
                          <div>
                            <Label>WhatsApp</Label>
                            <Input value={officeWhatsApp} onChange={(e) => setOfficeWhatsApp(e.target.value)} />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">Alamat Lengkap</div>
                          <div className="font-medium">{officeAddress}</div>
                          <div className="text-muted-foreground">{officeCity}</div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <Phone className="h-4 w-4 text-primary" />
                              <span className="text-sm text-muted-foreground">Telepon</span>
                            </div>
                            <div className="font-medium">{officePhone}</div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground mb-1">Fax</div>
                            <div className="font-medium">{officeFax}</div>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <Mail className="h-4 w-4 text-primary" />
                              <span className="text-sm text-muted-foreground">Email</span>
                            </div>
                            <div className="font-medium">{officeEmail}</div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground mb-1">WhatsApp</div>
                            <div className="font-medium">{officeWhatsApp}</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Social Media */}
            <section className="py-12">
              <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Sosial Media</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {socialMedia.map((social, index) => {
                    const Icon = getIcon(social.icon)
                    return (
                      <Card key={index} className="relative group">
                        {isAdminMode && (
                          <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={() => setEditSocialMedia(index)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeleteSocialMedia(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                        <CardContent className="p-6">
                          {isAdminMode && editSocialMedia === index ? (
                            <div className="space-y-3">
                              <div>
                                <Label>Platform</Label>
                                <Input
                                  value={social.platform}
                                  onChange={(e) => {
                                    const updated = [...socialMedia]
                                    updated[index] = { ...updated[index], platform: e.target.value }
                                    setSocialMedia(updated)
                                  }}
                                />
                              </div>
                              <div>
                                <Label>URL</Label>
                                <Input
                                  value={social.url}
                                  onChange={(e) => {
                                    const updated = [...socialMedia]
                                    updated[index] = { ...updated[index], url: e.target.value }
                                    setSocialMedia(updated)
                                  }}
                                  placeholder="https://..."
                                />
                              </div>
                              <Button onClick={() => setEditSocialMedia(null)} size="sm">Selesai</Button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-3">
                              <div className="p-3 bg-primary/10 rounded-lg">
                                <Icon className="h-5 w-5 text-primary" />
                              </div>
                              <div className="flex-1">
                                <div className="font-medium">{social.platform}</div>
                                <a
                                  href={social.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-sm text-muted-foreground hover:text-primary transition-colors line-clamp-1"
                                >
                                  {social.url || 'URL tidak tersedia'}
                                </a>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    )
                  })}
                  {isAdminMode && (
                    <Button
                      onClick={handleAddSocialMedia}
                      variant="outline"
                      className="w-full h-full min-h-[100px] gap-2 border-dashed"
                    >
                      <Plus className="h-4 w-4" />
                      Tambah Sosial Media
                    </Button>
                  )}
                </div>
              </div>
            </section>

            {/* Additional Info */}
            <section className="py-12 bg-muted/30">
              <div className="container mx-auto px-4">
                <Card className="relative">
                  {isAdminMode && (
                    <div className="absolute top-4 right-4">
                      <Button onClick={() => setEditAdditionalInfo(!editAdditionalInfo)} variant="secondary" size="sm" className="gap-2">
                        <Edit className="h-4 w-4" />
                        {editAdditionalInfo ? 'Tutup Edit' : 'Edit Info'}
                      </Button>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle>Informasi Tambahan</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isAdminMode && editAdditionalInfo ? (
                      <Textarea
                        value={additionalInfo}
                        onChange={(e) => setAdditionalInfo(e.target.value)}
                        rows={4}
                      />
                    ) : (
                      <p className="text-muted-foreground">{additionalInfo}</p>
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

'use client'

import { useState, useEffect } from 'react'
import { MapPin, Phone, Mail, Clock, Loader2, RefreshCw, Facebook, Instagram, Twitter } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

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

interface Office {
  name: string
  address: string
  city: string
  phone: string
  fax: string
  email: string
  whatsapp: string
}

export default function KontakPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [heroTitle, setHeroTitle] = useState('')
  const [heroDescription, setHeroDescription] = useState('')
  const [contactInfo, setContactInfo] = useState<ContactInfo[]>([])
  const [office, setOffice] = useState<Office | null>(null)
  const [socialMedia, setSocialMedia] = useState<SocialMedia[]>([])
  const [additionalInfo, setAdditionalInfo] = useState('')

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
          setOffice({
            name: data.office.name || '',
            address: data.office.address || '',
            city: data.office.city || '',
            phone: data.office.phone || '',
            fax: data.office.fax || '',
            email: data.office.email || '',
            whatsapp: data.office.whatsapp || ''
          })
        }

        if (data.socialMedia && Array.isArray(data.socialMedia)) {
          setSocialMedia(data.socialMedia)
        }

        if (data.additionalInfo) {
          setAdditionalInfo(data.additionalInfo.content || '')
        }

        console.log('Kontak data loaded successfully')
        setError(null)
      } else {
        console.error('Failed to load Kontak data:', result.error)
        setError('Gagal memuat data')
      }
    } catch (error) {
      console.error('Error fetching Kontak data:', error)
      setError('Gagal memuat data')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchKontakData()
  }, [])

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'MapPin':
        return <MapPin className="h-5 w-5 text-pink-500" />
      case 'Phone':
        return <Phone className="h-5 w-5 text-pink-500" />
      case 'Mail':
        return <Mail className="h-5 w-5 text-pink-500" />
      case 'Clock':
        return <Clock className="h-5 w-5 text-pink-500" />
      default:
        return <MapPin className="h-5 w-5 text-pink-500" />
    }
  }

  if (isLoading) {
    return (
      <main>
        <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/80 via-pink-600/70 to-pink-700/80 z-20" />
          <img
            src="/images/hero-bg/kontak.jpg"
            alt="Kontak Tanjung Barat"
            className="w-full h-full object-cover"
          />
        </div>
          <div className="container mx-auto px-4 relative z-30">
            <div className="max-w-3xl space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                Hubungi Kami
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
            src="/images/hero-bg/kontak.jpg"
            alt="Kontak Tanjung Barat"
            className="w-full h-full object-cover"
          />
        </div>
          <div className="container mx-auto px-4 relative z-30">
            <div className="max-w-3xl space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                Hubungi Kami
              </h1>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4 relative z-30">
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <p className="text-muted-foreground">{error}</p>
              <button
                onClick={fetchKontakData}
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
            src="/images/hero-bg/kontak.jpg"
            alt="Kontak Tanjung Barat"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-30">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              {heroTitle || 'Hubungi Kami'}
            </h1>
            <p className="text-xl text-white/95 drop-shadow-md">
              {heroDescription || 'Kami siap membantu Anda.'}
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 relative z-30">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <Card key={index} className="border-none shadow-sm">
                <CardHeader>
                  <div className="h-10 w-10 rounded-lg bg-pink-500/10 flex items-center justify-center mb-2">
                    {getIcon(info.icon)}
                  </div>
                  <CardTitle className="text-lg">{info.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground whitespace-pre-line">
                    {info.content}
                  </div>
                </CardContent>
              </Card>
            ))}
            {contactInfo.length === 0 && (
              <p className="text-muted-foreground col-span-4 text-center py-8">Tidak ada informasi kontak.</p>
            )}
          </div>
        </div>
      </section>

      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 relative z-30">
          {office && (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-pink-500/10 rounded-lg">
                    <MapPin className="h-6 w-6 text-pink-500" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">{office.name}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Alamat Lengkap</div>
                  <div className="font-medium">{office.address}</div>
                  <div className="text-muted-foreground">{office.city}</div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Phone className="h-4 w-4 text-pink-500" />
                      <span className="text-sm text-muted-foreground">Telepon</span>
                    </div>
                    <div className="font-medium">{office.phone}</div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Mail className="h-4 w-4 text-pink-500" />
                      <span className="text-sm text-muted-foreground">Email</span>
                    </div>
                    <div className="font-medium">{office.email}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 relative z-30">
          <div className="flex flex-wrap justify-center gap-4">
            {socialMedia.map((social, index) => {
              const SocialIcon = social.icon === 'Facebook' ? Facebook :
                               social.icon === 'Instagram' ? Instagram :
                               social.icon === 'Twitter' ? Twitter : Facebook

              return (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-pink-500 text-pink-foreground rounded-lg hover:bg-pink-500/90 transition-colors"
                >
                  <SocialIcon className="h-5 w-5" />
                  <span className="font-medium">{social.platform}</span>
                </a>
              )
            })}
            {socialMedia.length === 0 && (
              <p className="text-muted-foreground text-center py-8">Tidak ada media sosial tersedia.</p>
            )}
          </div>
        </div>
      </section>

      {additionalInfo && (
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4 relative z-30">
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-lg text-muted-foreground">
                  {additionalInfo}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      )}
    </main>
  )
}

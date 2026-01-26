'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileText, Users, Building, ClipboardCheck, Phone, Clock, Info, AlertCircle, Loader2, RefreshCw } from 'lucide-react'

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

export default function PelayananPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [heroTitle, setHeroTitle] = useState('')
  const [heroDescription, setHeroDescription] = useState('')
  const [importantInfo, setImportantInfo] = useState<ImportantInfo[]>([])
  const [services, setServices] = useState<ServiceCategory[]>([])
  const [ctaTitle, setCtaTitle] = useState('')
  const [ctaDescription, setCtaDescription] = useState('')
  const [ctaButton1, setCtaButton1] = useState('')
  const [ctaButton2, setCtaButton2] = useState('')

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
          setServices(data.categories)
        }

        if (data.cta) {
          setCtaTitle(data.cta.title || '')
          setCtaDescription(data.cta.description || '')
          setCtaButton1(data.cta.button1 || '')
          setCtaButton2(data.cta.button2 || '')
        }

        console.log('Pelayanan data loaded successfully')
        setError(null)
      } else {
        console.error('Failed to load Pelayanan data:', result.error)
        setError('Gagal memuat data')
      }
    } catch (error) {
      console.error('Error fetching Pelayanan data:', error)
      setError('Gagal memuat data')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPelayananData()
  }, [])

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

  if (isLoading) {
    return (
      <main>
        <section className="relative py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/80 via-pink-600/70 to-pink-700/80 z-20" />
            <img
              src="/images/hero-bg/pelayanan.jpg"
              alt="Loading"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="container mx-auto px-4 relative z-30">
            <div className="max-w-3xl space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white drop-shadow-lg">
                Pelayanan Publik
              </h1>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
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
              src="/images/hero-bg/pelayanan.jpg"
              alt="Error"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="container mx-auto px-4 relative z-30">
            <div className="max-w-3xl space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white drop-shadow-lg">
                Pelayanan Publik
              </h1>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <p className="text-muted-foreground">{error}</p>
              <Button onClick={fetchPelayananData} className="gap-2">
                <RefreshCw className="h-4 w-4" />
                Coba Lagi
              </Button>
            </div>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main>
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/80 via-pink-600/70 to-pink-700/80 z-20" />
          <img
            src="/images/hero-bg/pelayanan.jpg"
            alt="Pelayanan Publik Tanjung Barat"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-30">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white drop-shadow-lg">
              {heroTitle || 'Pelayanan Publik'}
            </h1>
            <p className="text-xl text-white/95 drop-shadow-md">
              {heroDescription || 'Temukan berbagai layanan publik yang tersedia.'}
            </p>
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
                <Card key={index} className="border-none shadow-sm">
                  <CardHeader>
                    <div className="h-10 w-10 rounded-lg bg-pink-500/10 flex items-center justify-center mb-2">
                      <Icon className="h-5 w-5 text-pink-500" />
                    </div>
                    <CardTitle className="text-lg">{info.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground whitespace-pre-line">
                      {info.content}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
            {importantInfo.length === 0 && (
              <p className="text-muted-foreground col-span-3">Tidak ada informasi penting.</p>
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
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-pink-500/10 rounded-lg">
                    <CategoryIcon className="h-6 w-6 text-pink-500" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold">{category.category}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.services.map((service, serviceIndex) => (
                    <Card key={serviceIndex} className="hover:shadow-lg transition-shadow flex flex-col h-full">
                      <CardHeader>
                        <CardTitle className="text-lg">{service.title}</CardTitle>
                        <CardDescription className="text-base">
                          {service.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="flex-grow space-y-4">
                        <div>
                          <div className="flex items-center gap-2 text-sm font-medium mb-2 text-foreground">
                            <Info className="h-4 w-4 text-pink-500" />
                            Persyaratan:
                          </div>
                          <ul className="space-y-1">
                            {Array.isArray(service.requirements) && service.requirements.map((req, reqIndex) => (
                              <li key={reqIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                                <span className="text-pink-500 mt-1">•</span>
                                {req}
                              </li>
                            ))}
                            {!Array.isArray(service.requirements) && service.requirements && (
                              <li className="text-sm text-muted-foreground">
                                {service.requirements}
                              </li>
                            )}
                          </ul>
                        </div>

                        <div className="pt-4 border-t">
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-pink-500" />
                            <span className="font-medium">Waktu Proses:</span>
                            <span className="text-muted-foreground">{service.processingTime}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )
          })}
          {services.length === 0 && (
            <p className="text-muted-foreground text-center py-8">Tidak ada layanan tersedia.</p>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <Card className="border-none bg-gradient-to-br from-primary to-primary/80 text-pink-500-foreground">
            <CardContent className="p-8 md:p-12 text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                {ctaTitle || 'Butuh Bantuan Langsung?'}
              </h2>
              <p className="text-lg text-pink-500-foreground/90 max-w-2xl mx-auto">
                {ctaDescription || 'Tim kami siap membantu Anda.'}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" variant="secondary" className="gap-2">
                  <Phone className="h-4 w-4" />
                  {ctaButton1 || 'Hubungi Kami'}
                </Button>
                <Button size="lg" variant="outline" className="gap-2 border-white text-white hover:bg-white/10">
                  <FileText className="h-4 w-4" />
                  {ctaButton2 || 'Download Panduan'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  )
}

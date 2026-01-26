'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, Users, Building2, TreePine, Newspaper, Phone } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

export default function BerandaPage() {
  const [data, setData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchBerandaData()
  }, [])

  const fetchBerandaData = async () => {
    try {
      console.log('Fetching Beranda data from API...')
      const response = await fetch('/api/content/beranda')
      console.log('Response status:', response.status)

      const result = await response.json()
      console.log('Response data:', result)

      if (result.success && result.data) {
        setData(result.data)
      } else {
        console.error('API returned error:', result.error)
      }
    } catch (error) {
      console.error('Error fetching Beranda data:', error)
    } finally {
      setIsLoading(false)
    }
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

  if (isLoading) {
    return (
      <main>
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/80 via-pink-600/70 to-pink-700/80 z-20" />
            <img
              src="/images/hero-bg/beranda.jpg"
              alt="Loading"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="container mx-auto px-4 relative z-30">
            <div className="max-w-3xl space-y-6">
              <Skeleton className="h-16 w-3/4 bg-white/20" />
              <Skeleton className="h-6 w-full bg-white/20" />
              <Skeleton className="h-20 w-1/2 bg-white/20" />
            </div>
          </div>
        </section>
      </main>
    )
  }

  if (!data || !data.hero || !data.whySection || !data.features || !data.statistics) {
    return (
      <main>
        <section className="relative py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-semibold">Gagal Memuat Data</h2>
              <p className="text-muted-foreground">Data tidak dapat dimuat. Silakan refresh halaman atau coba lagi nanti.</p>
              <Button onClick={() => fetchBerandaData()}>Coba Lagi</Button>
            </div>
          </div>
        </section>
      </main>
    )
  }

  const { hero, whySection, features, statistics, newsHeader, cta } = data

  return (
    <main>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/80 via-pink-600/70 to-pink-700/80 z-20" />
          <img
            src="/images/hero-bg/beranda.jpg"
            alt="Tanjung Barat - Suasana Kelurahan"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-30">
          <div className="max-w-3xl space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white drop-shadow-lg">
              {hero.title}
              <span className="block text-pink-100 mt-2">{hero.subtitle}</span>
            </h1>
            <p className="text-xl text-white/95 drop-shadow-md">
              {hero.description}
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" className="gap-2 bg-white text-pink-600 hover:bg-pink-50">
                {hero.buttonText1}
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="gap-2 bg-white/10 border-white/30 text-white hover:bg-white/20 hover:border-white/50">
                <Phone className="h-4 w-4" />
                {hero.buttonText2}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">{whySection.title}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {whySection.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features && features.map((feature: any, index: number) => {
              const Icon = getIcon(feature.icon)
              return (
                <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-pink-500/10 flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-pink-500" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {statistics && statistics.map((stat: any, index: number) => (
              <div key={index} className="text-center space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-pink-500">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News Preview */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="space-y-2">
              <h2 className="text-3xl md:text-4xl font-bold">{newsHeader.title}</h2>
              <p className="text-muted-foreground">
                {newsHeader.description}
              </p>
            </div>
            <Button variant="outline" className="hidden md:flex">
              {newsHeader.buttonText}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features && features.slice(0, 3).map((feature: any, index: number) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg line-clamp-2">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="line-clamp-3">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="border-none bg-gradient-to-br from-primary to-primary/80 text-pink-500-foreground">
            <CardContent className="p-8 md:p-12 text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                {cta.title}
              </h2>
              <p className="text-lg text-pink-500-foreground/90 max-w-2xl mx-auto">
                {cta.description}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" variant="secondary" className="gap-2">
                  {cta.buttonText}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  )
}

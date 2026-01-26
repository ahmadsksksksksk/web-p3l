'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { History, Target, Users, MapPin, Calendar, Award, Loader2, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Milestone {
  year: string
  event: string
}

interface Achievement {
  title: string
  description: string
}

interface Mission {
  content: string
  order?: number
}

interface OrgStructure {
  name: string
  position: string
  level: number
}

interface GeoInfo {
  label: string
  value: string
}

export default function ProfilPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [historyContent, setHistoryContent] = useState('')
  const [historyMilestones, setHistoryMilestones] = useState<Milestone[]>([])
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [vision, setVision] = useState('')
  const [missions, setMissions] = useState<string[]>([])
  const [orgStructure, setOrgStructure] = useState<OrgStructure[]>([])
  const [geographicInfo, setGeographicInfo] = useState<GeoInfo[]>([])
  const [areaDescription, setAreaDescription] = useState('')

  const fetchProfilData = async () => {
    try {
      console.log('Fetching Profil data from API...')
      const response = await fetch('/api/content/profil')
      const result = await response.json()

      if (result.success && result.data) {
        const data = result.data

        if (data.history) {
          setHistoryContent(typeof data.history === 'string' ? data.history : data.history.content || '')
        }

        if (data.milestones && Array.isArray(data.milestones)) {
          setHistoryMilestones(data.milestones)
        }

        if (data.achievements && Array.isArray(data.achievements)) {
          setAchievements(data.achievements)
        }

        if (data.vision) {
          setVision(typeof data.vision === 'string' ? data.vision : data.vision.content || '')
        }

        if (data.missions && Array.isArray(data.missions)) {
          setMissions(data.missions.map((m: any) => typeof m === 'string' ? m : m.content))
        }

        if (data.orgStructure && Array.isArray(data.orgStructure)) {
          setOrgStructure(data.orgStructure)
        }

        if (data.geoInfo && Array.isArray(data.geoInfo)) {
          setGeographicInfo(data.geoInfo)
        }

        if (data.areaDescription) {
          setAreaDescription(typeof data.areaDescription === 'string' ? data.areaDescription : data.areaDescription.content || '')
        }

        console.log('Profil data loaded successfully')
        setError(null)
      } else {
        console.error('Failed to load Profil data:', result.error)
        setError('Gagal memuat data')
      }
    } catch (error) {
      console.error('Error fetching Profil data:', error)
      setError('Gagal memuat data')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProfilData()
  }, [])

  if (isLoading) {
    return (
      <main>
        <section className="relative py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/80 via-pink-600/70 to-pink-700/80 z-20" />
            <img
              src="/images/hero-bg/profil.jpg"
              alt="Loading"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="container mx-auto px-4 relative z-30">
            <div className="max-w-3xl space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white drop-shadow-lg">
                Profil Tanjung Barat
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
              src="/images/hero-bg/profil.jpg"
              alt="Error"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="container mx-auto px-4 relative z-30">
            <div className="max-w-3xl space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white drop-shadow-lg">
                Profil Tanjung Barat
              </h1>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <p className="text-muted-foreground">{error}</p>
              <Button onClick={fetchProfilData} className="gap-2">
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
            src="/images/hero-bg/profil.jpg"
            alt="Kantor Kelurahan Tanjung Barat"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-30">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2 text-sm text-white/90 mb-4">
              <MapPin className="h-4 w-4" />
              <span>Tanjung Barat, Jakarta Selatan</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white drop-shadow-lg">
              Profil Tanjung Barat
            </h1>
            <p className="text-xl text-white/95 drop-shadow-md">
              Mengenal lebih dekat sejarah, visi misi, dan struktur organisasi Kelurahan Tanjung Barat
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="sejarah" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:w-auto lg:inline-grid">
              <TabsTrigger value="sejarah">Sejarah</TabsTrigger>
              <TabsTrigger value="visi-misi">Visi & Misi</TabsTrigger>
              <TabsTrigger value="struktur">Struktur Organisasi</TabsTrigger>
              <TabsTrigger value="informasi">Informasi Wilayah</TabsTrigger>
            </TabsList>

            {/* Sejarah Tab */}
            <TabsContent value="sejarah" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
                      <History className="h-8 w-8 text-pink-500" />
                      Sejarah Tanjung Barat
                    </h2>
                    <div className="prose prose-lg max-w-none text-muted-foreground whitespace-pre-line">
                      {historyContent || 'Tidak ada data sejarah.'}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                      <Calendar className="h-6 w-6 text-pink-500" />
                      Perjalanan Waktu
                    </h3>
                    <div className="space-y-4">
                      {historyMilestones.map((milestone, index) => (
                        <div key={index} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className="w-4 h-4 rounded-full bg-primary" />
                            {index < historyMilestones.length - 1 && (
                              <div className="w-0.5 h-full bg-border min-h-[60px]" />
                            )}
                          </div>
                          <div className="pb-4">
                            <div className="font-semibold text-lg">{milestone.year}</div>
                            <div className="text-muted-foreground">{milestone.event}</div>
                          </div>
                        </div>
                      ))}
                      {historyMilestones.length === 0 && (
                        <p className="text-muted-foreground">Tidak ada milestone.</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Award className="h-5 w-5 text-pink-500" />
                        Penghargaan
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {achievements.map((achievement, index) => (
                        <div key={index} className="border-l-2 border-primary pl-4">
                          <div className="font-semibold">{achievement.title}</div>
                          <div className="text-sm text-muted-foreground">{achievement.description}</div>
                        </div>
                      ))}
                      {achievements.length === 0 && (
                        <p className="text-muted-foreground">Tidak ada penghargaan.</p>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Visi & Misi Tab */}
            <TabsContent value="visi-misi" className="space-y-8">
              <div className="max-w-4xl">
                <Card className="bg-gradient-to-br from-primary to-primary/90 text-pink-500-foreground border-none">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-white/20 rounded-lg">
                        <Target className="h-8 w-8" />
                      </div>
                      <CardTitle className="text-3xl">Visi</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xl font-medium leading-relaxed">
                      {vision || 'Tidak ada visi.'}
                    </p>
                  </CardContent>
                </Card>

                <div className="mt-8">
                  <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                    <div className="p-2 bg-pink-500/10 rounded-lg">
                      <Users className="h-8 w-8 text-pink-500" />
                    </div>
                    Misi
                  </h2>
                  <div className="grid gap-4">
                    {missions.map((mission, index) => (
                      <Card key={index} className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-pink-500/10 flex items-center justify-center font-semibold text-pink-500">
                              {index + 1}
                            </div>
                            <p className="text-lg">{mission}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    {missions.length === 0 && (
                      <p className="text-muted-foreground">Tidak ada misi.</p>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Struktur Organisasi Tab */}
            <TabsContent value="struktur" className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                  <Users className="h-8 w-8 text-pink-500" />
                  Struktur Organisasi
                </h2>
                <div className="grid gap-4">
                  {orgStructure.map((person, index) => (
                    <Card
                      key={index}
                      className={`transition-all hover:shadow-lg ${
                        person.level === 1
                          ? 'border-primary border-2'
                          : person.level === 2
                          ? 'border-l-4 border-l-pink-500'
                          : ''
                      }`}
                    >
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div>
                            <div className="font-semibold text-lg">{person.name}</div>
                            <div className="text-muted-foreground">{person.position}</div>
                          </div>
                          <div className="flex-shrink-0">
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium ${
                                person.level === 1
                                  ? 'bg-pink-500 text-pink-foreground'
                                  : person.level === 2
                                  ? 'bg-secondary'
                                  : 'bg-muted'
                              }`}
                            >
                              Level {person.level}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {orgStructure.length === 0 && (
                    <p className="text-muted-foreground">Tidak ada struktur organisasi.</p>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* Informasi Wilayah Tab */}
            <TabsContent value="informasi" className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                  <MapPin className="h-8 w-8 text-pink-500" />
                  Informasi Wilayah
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {geographicInfo.map((info, index) => (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <div className="text-sm text-muted-foreground mb-1">{info.label}</div>
                        <div className="font-semibold text-lg">{info.value}</div>
                      </CardContent>
                    </Card>
                  ))}
                  {geographicInfo.length === 0 && (
                    <p className="text-muted-foreground col-span-2">Tidak ada informasi wilayah.</p>
                  )}
                </div>
              </div>

              <div className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Deskripsi Wilayah</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-lg max-w-none text-muted-foreground whitespace-pre-line">
                      {areaDescription || 'Tidak ada deskripsi wilayah.'}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </main>
  )
}

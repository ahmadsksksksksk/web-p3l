'use client'

import { useState, useEffect } from 'react'
import AdminSidebar from '@/components/admin/admin-sidebar'
import AdminHeader from '@/components/admin/admin-header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { History, Target, Users, MapPin, Calendar, Award, Eye, EyeOff, Save, Plus, Trash2, Edit, Loader2 } from 'lucide-react'
import { Switch } from '@/components/ui/switch'
import { useRouter } from 'next/navigation'

interface HistoryMilestone {
  year: string
  event: string
}

interface Achievement {
  title: string
  description: string
}

interface AreaDescription {
  content?: string
}

export default function AdminProfilPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  // Edit/Preview mode toggle
  const [isAdminMode, setIsAdminMode] = useState(true)

  // Sejarah content
  const [historyContent, setHistoryContent] = useState(
    'Tanjung Barat merupakan salah satu kelurahan yang berada di wilayah administratif Jakarta Selatan.\n' +
    'Kelurahan ini memiliki sejarah panjang yang bermula dari era kolonial hingga berkembang menjadi\n' +
    'salah satu wilayah yang progresif di Jakarta.\n\n' +
    'Nama "Tanjung Barat" sendiri diambil dari letak geografisnya yang berbentuk tanjung di sisi barat\n' +
    'kawasan tersebut. Wilayah ini awalnya adalah area persawahan dan perkebunan yang subur, yang\n' +
    'kemudian berkembang menjadi permukiman urban yang padat namun tetap menjaga karakteristik aslinya.\n\n' +
    'Seiring dengan pembangunan kota Jakarta, Tanjung Barat mengalami transformasi signifikan.\n' +
    'Infrastruktur modern dibangun, fasilitas publik ditingkatkan, dan layanan publik diperbarui untuk\n' +
    'memenuhi kebutuhan masyarakat yang semakin berkembang.'
  )

  const [historyMilestones, setHistoryMilestones] = useState<HistoryMilestone[]>([])
  const [achievements, setAchievements] = useState<Achievement[]>([])

  // Visi & Misi content
  const [vision, setVision] = useState('')
  const [missions, setMissions] = useState<string[]>([])

  // Struktur Organisasi content
  const [orgStructure, setOrgStructure] = useState<{ name: string; position: string; level: number }[]>([])

  // Informasi Wilayah content
  const [geographicInfo, setGeographicInfo] = useState<{ label: string; value: string }[]>([])

  const [areaDescription, setAreaDescription] = useState('')

  // Dialog states
  const [editHistoryDialog, setEditHistoryDialog] = useState(false)
  const [editMilestoneDialog, setEditMilestoneDialog] = useState<HistoryMilestone | null>(null)
  const [editAchievementDialog, setEditAchievementDialog] = useState<Achievement | null>(null)
  const [editVisionDialog, setEditVisionDialog] = useState(false)
  const [editMissionDialog, setEditMissionDialog] = useState<string | null>(null)
  const [editOrgDialog, setEditOrgDialog] = useState<{ name: string; position: string; level: number } | null>(null)
  const [editGeoDialog, setEditGeoDialog] = useState<{ label: string; value: string } | null>(null)
  const [editAreaDescDialog, setEditAreaDescDialog] = useState(false)

  // Fetch Profil data from API
  useEffect(() => {
    fetchProfilData()
  }, [])

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
      } else {
        console.error('Failed to load Profil data:', result.error)
      }
    } catch (error) {
      console.error('Error fetching Profil data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveAll = async () => {
    setIsSaving(true)
    try {
      console.log('Saving Profil data...')
      const dataToSave = {
        history: historyContent,
        milestones: historyMilestones,
        achievements: achievements,
        vision: vision,
        missions: missions,
        orgStructure: orgStructure,
        geoInfo: geographicInfo,
        areaDescription: areaDescription,
      }

      const response = await fetch('/api/content/profil', {
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
      console.error('Error saving Profil data:', error)
      alert('Gagal menyimpan: Terjadi kesalahan saat menyimpan data')
    } finally {
      setIsSaving(false)
    }
  }

  const handlePreview = () => {
    router.push('/profil')
  }

  const handleAddMilestone = () => {
    setEditMilestoneDialog({ year: '', event: '' })
  }

  const handleSaveMilestone = () => {
    if (!editMilestoneDialog) return
    if (editMilestoneDialog.year === 'new') {
      // Add new milestone
      setHistoryMilestones([...historyMilestones, { year: '', event: '' }])
    } else {
      // Update existing milestone
      setHistoryMilestones(historyMilestones.map(m =>
        m.year === editMilestoneDialog.year ? editMilestoneDialog : m
      ))
    }
    setEditMilestoneDialog(null)
  }

  const handleDeleteMilestone = (year: string) => {
    if (!confirm('Yakin ingin menghapus milestone ini?')) return
    setHistoryMilestones(historyMilestones.filter(m => m.year !== year))
  }

  const handleAddAchievement = () => {
    setEditAchievementDialog({ title: '', description: '' })
  }

  const handleSaveAchievement = () => {
    if (!editAchievementDialog) return
    if (!achievements.find(a => a.title === editAchievementDialog.title && editAchievementDialog.title === 'new')) {
      // Add new achievement
      setAchievements([...achievements, { title: '', description: '' }])
    } else {
      // Update existing achievement
      setAchievements(achievements.map(a =>
        a.title === editAchievementDialog.title ? editAchievementDialog : a
      ))
    }
    setEditAchievementDialog(null)
  }

  const handleDeleteAchievement = (title: string) => {
    if (!confirm('Yakin ingin menghapus penghargaan ini?')) return
    setAchievements(achievements.filter(a => a.title !== title))
  }

  const handleAddMission = () => {
    setMissions([...missions, ''])
    setEditMissionDialog((missions.length).toString())
  }

  const handleSaveMission = () => {
    setEditMissionDialog(null)
  }

  const handleDeleteMission = (index: number) => {
    if (!confirm('Yakin ingin menghapus misi ini?')) return
    setMissions(missions.filter((_, i) => i !== index))
  }

  const handleAddOrg = () => {
    setOrgStructure([...orgStructure, { name: '', position: '', level: 2 }])
  }

  const handleSaveOrg = () => {
    setEditOrgDialog(null)
  }

  const handleDeleteOrg = (index: number) => {
    if (!confirm('Yakin ingin menghapus anggota organisasi ini?')) return
    setOrgStructure(orgStructure.filter((_, i) => i !== index))
  }

  const handleAddGeo = () => {
    setGeographicInfo([...geographicInfo, { label: '', value: '' }])
  }

  const handleSaveGeo = () => {
    setEditGeoDialog(null)
  }

  const handleDeleteGeo = (index: number) => {
    if (!confirm('Yakin ingin menghapus informasi ini?')) return
    setGeographicInfo(geographicInfo.filter((_, i) => i !== index))
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
          <div className="container mx-auto px-4 py-8">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                <span className="ml-2 text-muted-foreground">Memuat data...</span>
              </div>
            ) : (
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
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-3xl font-bold flex items-center gap-2">
                          <History className="h-8 w-8 text-primary" />
                          Sejarah Tanjung Barat
                        </h2>
                        {isAdminMode && (
                          <Button
                            variant="secondary"
                            size="sm"
                            className="gap-2"
                            onClick={() => setEditHistoryDialog(true)}
                          >
                            <Edit className="h-4 w-4" />
                            Edit Sejarah
                          </Button>
                        )}
                      </div>

                      {isAdminMode && editHistoryDialog ? (
                        <Textarea
                          value={historyContent}
                          onChange={(e) => setHistoryContent(e.target.value)}
                          rows={12}
                          className="text-base"
                        />
                      ) : (
                        <div className="prose prose-lg max-w-none text-muted-foreground whitespace-pre-line">
                          {historyContent}
                        </div>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-2xl font-bold flex items-center gap-2">
                          <Calendar className="h-6 w-6 text-primary" />
                          Perjalanan Waktu
                        </h3>
                        {isAdminMode && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-2"
                            onClick={handleAddMilestone}
                          >
                            <Plus className="h-4 w-4" />
                            Tambah Milestone
                          </Button>
                        )}
                      </div>
                      <div className="space-y-4">
                        {historyMilestones.map((milestone, index) => (
                          <div key={index} className="flex gap-4">
                            <div className="flex flex-col items-center">
                              <div className="w-4 h-4 rounded-full bg-primary" />
                              {index < historyMilestones.length - 1 && (
                                <div className="w-0.5 h-full bg-border min-h-[60px]" />
                              )}
                            </div>
                            <div className="flex-1 pb-4">
                              {isAdminMode && editMilestoneDialog === milestone ? (
                                <div className="space-y-2">
                                  <Input
                                    value={milestone.year}
                                    onChange={(e) => {
                                      const updated = [...historyMilestones]
                                      updated[index] = { ...updated[index], year: e.target.value }
                                      setHistoryMilestones(updated)
                                    }}
                                    placeholder="Tahun"
                                  />
                                  <Input
                                    value={milestone.event}
                                    onChange={(e) => {
                                      const updated = [...historyMilestones]
                                      updated[index] = { ...updated[index], event: e.target.value }
                                      setHistoryMilestones(updated)
                                    }}
                                    placeholder="Peristiwa"
                                  />
                                  <div className="flex gap-2">
                                    <Button
                                      size="sm"
                                      onClick={() => setEditMilestoneDialog(null)}
                                    >
                                      Selesai
                                    </Button>
                                  </div>
                                </div>
                              ) : (
                                <div className="flex justify-between items-start group">
                                  <div>
                                    <div className="font-semibold text-lg">{milestone.year}</div>
                                    <div className="text-muted-foreground">{milestone.event}</div>
                                  </div>
                                  {isAdminMode && (
                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                      <Button
                                        size="sm"
                                        variant="secondary"
                                        onClick={() => setEditMilestoneDialog(milestone)}
                                      >
                                        <Edit className="h-4 w-4" />
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="destructive"
                                        onClick={() => handleDeleteMilestone(milestone.year)}
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="flex items-center gap-2">
                            <Award className="h-5 w-5 text-primary" />
                            Penghargaan
                          </CardTitle>
                          {isAdminMode && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-2"
                              onClick={handleAddAchievement}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {achievements.map((achievement, index) => (
                          <div key={index} className="border-l-2 border-primary pl-4">
                            {isAdminMode && editAchievementDialog === achievement ? (
                              <div className="space-y-2">
                                <Input
                                  value={achievement.title}
                                  onChange={(e) => {
                                    const updated = [...achievements]
                                    updated[index] = { ...updated[index], title: e.target.value }
                                    setAchievements(updated)
                                  }}
                                  placeholder="Judul"
                                />
                                <Input
                                  value={achievement.description}
                                  onChange={(e) => {
                                    const updated = [...achievements]
                                    updated[index] = { ...updated[index], description: e.target.value }
                                    setAchievements(updated)
                                  }}
                                  placeholder="Deskripsi"
                                />
                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    onClick={() => setEditAchievementDialog(null)}
                                  >
                                    Selesai
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <div className="group">
                                <div className="font-semibold">{achievement.title}</div>
                                <div className="text-sm text-muted-foreground">{achievement.description}</div>
                                {isAdminMode && (
                                  <div className="flex gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button
                                      size="sm"
                                      variant="secondary"
                                      onClick={() => setEditAchievementDialog(achievement)}
                                    >
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="destructive"
                                      onClick={() => handleDeleteAchievement(achievement.title)}
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {/* Visi & Misi Tab */}
              <TabsContent value="visi-misi" className="space-y-8">
                <div className="max-w-4xl">
                  <Card className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground border-none">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="p-3 bg-white/20 rounded-lg">
                            <Target className="h-8 w-8" />
                          </div>
                          <CardTitle className="text-3xl">Visi</CardTitle>
                        </div>
                        {isAdminMode && (
                          <Button
                            variant="secondary"
                            size="sm"
                            className="gap-2"
                            onClick={() => setEditVisionDialog(true)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      {isAdminMode && editVisionDialog ? (
                        <Textarea
                          value={vision}
                          onChange={(e) => setVision(e.target.value)}
                          rows={4}
                          className="bg-white/10 text-primary-foreground border-white/20 min-h-[150px]"
                        />
                      ) : (
                        <p className="text-xl font-medium leading-relaxed">
                          {vision}
                        </p>
                      )}
                    </CardContent>
                  </Card>

                  <div className="mt-8">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-3xl font-bold flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Users className="h-8 w-8 text-primary" />
                        </div>
                        Misi
                      </h2>
                      {isAdminMode && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-2"
                          onClick={handleAddMission}
                        >
                          <Plus className="h-4 w-4" />
                          Tambah Misi
                        </Button>
                      )}
                    </div>
                    <div className="grid gap-4">
                      {missions.map((mission, index) => (
                        <Card key={index} className="hover:shadow-lg transition-shadow">
                          <CardContent className="p-6">
                            <div className="flex gap-4">
                              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary">
                                {index + 1}
                              </div>
                              {isAdminMode && editMissionDialog === index.toString() ? (
                                <div className="flex-1 space-y-2">
                                  <Textarea
                                    value={mission}
                                    onChange={(e) => {
                                      const updated = [...missions]
                                      updated[index] = e.target.value
                                      setMissions(updated)
                                    }}
                                    rows={3}
                                  />
                                  <div className="flex gap-2">
                                    <Button
                                      size="sm"
                                      onClick={() => setEditMissionDialog(null)}
                                    >
                                      Selesai
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="destructive"
                                      onClick={() => handleDeleteMission(index)}
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              ) : (
                                <div className="flex-1 flex justify-between items-start group">
                                  <p className="text-lg">{mission}</p>
                                  {isAdminMode && (
                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                      <Button
                                        size="sm"
                                        variant="secondary"
                                        onClick={() => setEditMissionDialog(index.toString())}
                                      >
                                        <Edit className="h-4 w-4" />
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="destructive"
                                        onClick={() => handleDeleteMission(index)}
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Struktur Organisasi Tab */}
              <TabsContent value="struktur" className="space-y-8">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-3xl font-bold flex items-center gap-2">
                      <Users className="h-8 w-8 text-primary" />
                      Struktur Organisasi
                    </h2>
                    {isAdminMode && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2"
                        onClick={handleAddOrg}
                      >
                        <Plus className="h-4 w-4" />
                        Tambah Anggota
                      </Button>
                    )}
                  </div>
                  <div className="grid gap-4">
                    {orgStructure.map((person, index) => (
                      <Card
                        key={index}
                        className={`transition-all hover:shadow-lg ${
                          person.level === 1
                            ? 'border-primary border-2'
                            : person.level === 2
                            ? 'border-l-4 border-l-primary'
                            : ''
                        }`}
                      >
                        <CardContent className="p-6">
                          {isAdminMode && editOrgDialog === { name: person.name, position: person.position, level: person.level } ? (
                            <div className="space-y-4">
                              <div>
                                <Label>Nama</Label>
                                <Input
                                  value={person.name}
                                  onChange={(e) => {
                                    const updated = [...orgStructure]
                                    updated[index] = { ...updated[index], name: e.target.value }
                                    setOrgStructure(updated)
                                  }}
                                />
                              </div>
                              <div>
                                <Label>Jabatan</Label>
                                <Input
                                  value={person.position}
                                  onChange={(e) => {
                                    const updated = [...orgStructure]
                                    updated[index] = { ...updated[index], position: e.target.value }
                                    setOrgStructure(updated)
                                  }}
                                />
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  onClick={() => setEditOrgDialog(null)}
                                >
                                  Selesai
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                              <div>
                                <div className="font-semibold text-lg">{person.name}</div>
                                <div className="text-muted-foreground">{person.position}</div>
                              </div>
                              <div className="flex items-center gap-2">
                                <span
                                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                                    person.level === 1
                                      ? 'bg-primary text-primary-foreground'
                                      : person.level === 2
                                      ? 'bg-secondary'
                                      : 'bg-muted'
                                  }`}
                                >
                                  Level {person.level}
                                </span>
                                {isAdminMode && (
                                  <div className="flex gap-2">
                                    <Button
                                      size="sm"
                                      variant="secondary"
                                      onClick={() => setEditOrgDialog({ name: person.name, position: person.position, level: person.level })}
                                    >
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="destructive"
                                      onClick={() => handleDeleteOrg(index)}
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Informasi Wilayah Tab */}
              <TabsContent value="informasi" className="space-y-8">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-3xl font-bold flex items-center gap-2">
                      <MapPin className="h-8 w-8 text-primary" />
                      Informasi Wilayah
                    </h2>
                    {isAdminMode && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2"
                        onClick={handleAddGeo}
                      >
                        <Plus className="h-4 w-4" />
                        Tambah Info
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {geographicInfo.map((info, index) => (
                      <Card key={index}>
                        <CardContent className="p-6">
                          {isAdminMode && editGeoDialog === info ? (
                            <div className="space-y-4">
                              <div>
                                <Label>Label</Label>
                                <Input
                                  value={info.label}
                                  onChange={(e) => {
                                    const updated = [...geographicInfo]
                                    updated[index] = { ...updated[index], label: e.target.value }
                                    setGeographicInfo(updated)
                                  }}
                                />
                              </div>
                              <div>
                                <Label>Nilai</Label>
                                <Input
                                  value={info.value}
                                  onChange={(e) => {
                                    const updated = [...geographicInfo]
                                    updated[index] = { ...updated[index], value: e.target.value }
                                    setGeographicInfo(updated)
                                  }}
                                />
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  onClick={() => setEditGeoDialog(null)}
                                >
                                  Selesai
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div className="group flex justify-between items-start">
                              <div>
                                <div className="text-sm text-muted-foreground mb-1">{info.label}</div>
                                <div className="font-semibold text-lg">{info.value}</div>
                              </div>
                              {isAdminMode && (
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Button
                                    size="sm"
                                    variant="secondary"
                                    onClick={() => setEditGeoDialog(info)}
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => handleDeleteGeo(index)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              )}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <div className="mt-8">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>Deskripsi Wilayah</CardTitle>
                        {isAdminMode && (
                          <Button
                            variant="secondary"
                            size="sm"
                            className="gap-2"
                            onClick={() => setEditAreaDescDialog(true)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      {isAdminMode && editAreaDescDialog ? (
                        <Textarea
                          value={areaDescription}
                          onChange={(e) => setAreaDescription(e.target.value)}
                          rows={12}
                          className="text-base"
                        />
                      ) : (
                        <div className="prose prose-lg max-w-none text-muted-foreground whitespace-pre-line">
                          {areaDescription}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              </Tabs>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

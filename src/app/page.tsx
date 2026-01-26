'use client'

import { useState } from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import LiveChatWidget from '@/components/livechat-widget'
import BerandaPage from '@/components/pages/beranda'
import ProfilPage from '@/components/pages/profil'
import PelayananPage from '@/components/pages/pelayanan'
import PotensiWisataPage from '@/components/pages/potensi-wisata'
import BeritaPage from '@/components/pages/berita'
import KontakPage from '@/components/pages/kontak'

type Page = 'beranda' | 'profil' | 'pelayanan' | 'potensi' | 'berita' | 'kontak'

export default function Home() {
  const [currentPage, setCurrentPage] = useState<Page>('beranda')

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="flex-grow">
        {currentPage === 'beranda' && <BerandaPage key="page-beranda" />}
        {currentPage === 'profil' && <ProfilPage key="page-profil" />}
        {currentPage === 'pelayanan' && <PelayananPage key="page-pelayanan" />}
        {currentPage === 'potensi' && <PotensiWisataPage key="page-potensi" />}
        {currentPage === 'berita' && <BeritaPage key="page-berita" />}
        {currentPage === 'kontak' && <KontakPage key="page-kontak" />}
      </main>
      <Footer />
      <LiveChatWidget />
    </div>
  )
}

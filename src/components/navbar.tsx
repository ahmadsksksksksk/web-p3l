'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Home, User, ClipboardList, Map, Newspaper, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Navbar({ currentPage, setCurrentPage }: { currentPage: string, setCurrentPage: (page: string) => void }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const menuItems = [
    { id: 'beranda', label: 'Beranda', icon: Home },
    { id: 'profil', label: 'Profil', icon: User },
    { id: 'pelayanan', label: 'Pelayanan', icon: ClipboardList },
    { id: 'potensi', label: 'Potensi & Wisata', icon: Map },
    { id: 'berita', label: 'Berita', icon: Newspaper },
    { id: 'kontak', label: 'Kontak', icon: Mail },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2"
            onClick={(e) => {
              e.preventDefault()
              setCurrentPage('beranda')
            }}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <span className="text-xl font-bold text-primary-foreground">TB</span>
            </div>
            <span className="text-lg font-bold">Tanjung Barat</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <Button
                  key={item.id}
                  variant={currentPage === item.id ? 'default' : 'ghost'}
                  onClick={() => setCurrentPage(item.id)}
                  className="gap-2"
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Button>
              )
            })}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon
                return (
                  <Button
                    key={item.id}
                    variant={currentPage === item.id ? 'default' : 'ghost'}
                    onClick={() => {
                      setCurrentPage(item.id)
                      setIsMobileMenuOpen(false)
                    }}
                    className="justify-start gap-2 w-full"
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Button>
                )
              })}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

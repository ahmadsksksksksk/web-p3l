import Link from 'next/link'
import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Clock } from 'lucide-react'
import { alamatKantor, kantor } from '@/lib/config'

export default function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <span className="text-xl font-bold text-primary-foreground">TB</span>
              </div>
              <span className="text-lg font-bold">Tanjung Barat</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Website resmi Tanjung Barat. Menyediakan informasi lengkap tentang profil, pelayanan, potensi wisata, dan berita terkini.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-base">Tautan Cepat</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/profil" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Profil
                </Link>
              </li>
              <li>
                <Link href="/pelayanan" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Pelayanan
                </Link>
              </li>
              <li>
                <Link href="/potensi-wisata" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Potensi & Wisata
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info - DARI CONFIG */}
          <div className="space-y-4">
            <h3 className="font-semibold text-base">Kontak</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>{alamatKantor.alamat}</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>{alamatKantor.telepon}</span>
              </li>
            </ul>
          </div>

          {/* Jam Operasional & Social Media */}
          <div className="space-y-4">
            <h3 className="font-semibold text-base">Jam Operasional</h3>
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <div className="space-y-1">
                <p>{kantor.hariBuka}: {kantor.buka} - {kantor.tutup}</p>
                <p>{kantor.hariTutup}</p>
              </div>
            </div>
            <div className="space-y-3 pt-4">
              <h3 className="font-semibold text-base">Ikuti Kami</h3>
              <div className="flex gap-3">
                <Link href="#" className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors">
                  <Facebook className="h-4 w-4" />
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link href="#" className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors">
                  <Instagram className="h-4 w-4" />
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link href="#" className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors">
                  <Twitter className="h-4 w-4" />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link href="#" className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors">
                  <Youtube className="h-4 w-4" />
                  <span className="sr-only">YouTube</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Tanjung Barat. Seluruh hak cipta dilindungi.</p>
        </div>
      </div>
    </footer>
  )
}

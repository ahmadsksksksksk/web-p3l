'use client'

import { Home, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function AdminHeader() {
  return (
    <header className="h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex items-center justify-between h-full">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Admin Panel</span>
        </div>

        <Link href="/">
          <Button variant="outline" size="sm" className="gap-2">
            <Home className="h-4 w-4" />
            Lihat Website
            <ExternalLink className="h-3 w-3" />
          </Button>
        </Link>
      </div>
    </header>
  )
}

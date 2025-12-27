'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { LogoWithText } from '@/components/logo'

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-[#0a0a12]/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-indigo-500/10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="hover:opacity-90 transition-opacity">
            <LogoWithText size="sm" />
          </Link>
          <nav className="hidden sm:flex items-center gap-6">
            <Link
              href="/decks"
              className="px-3 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-300 hover:bg-gray-100 dark:hover:bg-white/5 active:scale-95 font-medium transition-all"
            >
              Seturi
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="sm:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      {mobileMenuOpen && (
        <nav className="sm:hidden border-t border-gray-200/50 dark:border-indigo-500/10 px-4 py-3 space-y-2 bg-white/80 dark:bg-[#0a0a12]/80 backdrop-blur-xl">
          <Link
            href="/decks"
            className="block px-3 py-3 rounded-lg text-gray-600 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-300 hover:bg-gray-100 dark:hover:bg-white/5 active:scale-[0.98] font-medium transition-all"
            onClick={() => setMobileMenuOpen(false)}
          >
            Seturi
          </Link>
        </nav>
      )}
    </header>
  )
}

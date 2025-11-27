'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Brain, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Brain className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold">Flashcard</span>
          </Link>
          <nav className="hidden sm:flex items-center gap-4">
            <Link
              href="/decks"
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
            >
              Seturi
            </Link>
            <Link
              href="/topics"
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
            >
              Subiecte
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
        <nav className="sm:hidden border-t border-gray-200 dark:border-gray-700 px-4 py-3 space-y-2">
          <Link
            href="/decks"
            className="block py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            Seturi
          </Link>
          <Link
            href="/topics"
            className="block py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            Subiecte
          </Link>
        </nav>
      )}
    </header>
  )
}

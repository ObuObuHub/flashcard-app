import Link from 'next/link'
import { Brain } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'

export function Navbar() {
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
        <ThemeToggle />
      </div>
    </header>
  )
}

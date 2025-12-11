import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Navbar } from '@/components/navbar'
import { Logo } from '@/components/logo'
import { Sparkles } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white dark:from-[#0a0a12] dark:to-[#0f0f1a]">
      <Navbar />

      {/* Hero Section - Centered */}
      <section className="flex-1 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-indigo-500/20 blur-3xl rounded-full" />
              <Logo size="xl" className="relative" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-indigo-400 via-indigo-500 to-indigo-600 bg-clip-text text-transparent">
              EbbiMed
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Memorează eficient cunoștințele medicale cu repetiție spațiată și tehnici mnemonice
          </p>
          <Link href="/decks">
            <Button size="lg" className="text-lg px-10 py-6 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 shadow-lg shadow-indigo-500/25 transition-all hover:shadow-xl hover:shadow-indigo-500/30">
              <Sparkles className="w-5 h-5 mr-2" />
              Începe acum
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200/50 dark:border-indigo-500/10 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500 dark:text-gray-500">
          <p>EbbiMed - Învățare medicală cu repetiție spațiată</p>
        </div>
      </footer>
    </div>
  )
}

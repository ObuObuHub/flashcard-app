import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Navbar } from '@/components/navbar'
import { Logo } from '@/components/logo'
import { Brain, Calendar, Sparkles, Trophy } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white dark:from-[#121218] dark:to-[#18181f]">
      <Navbar />

      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-6 pb-4 text-center">
        <div className="flex justify-center mb-3">
          <div className="relative">
            <div className="absolute inset-0 bg-indigo-400/15 blur-3xl rounded-full" />
            <Logo size="lg" className="relative" />
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          <span className="bg-gradient-to-r from-indigo-300 via-indigo-400 to-indigo-500 bg-clip-text text-transparent">
            EbbiMed
          </span>
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-300 mb-4 max-w-lg mx-auto">
          Flashcard-uri medicale cu repetiție spațiată - memorezi mai mult, în mai puțin timp
        </p>
        <Link href="/decks">
          <Button size="lg" className="px-6 py-4 bg-gradient-to-r from-indigo-400 to-indigo-500 hover:from-indigo-500 hover:to-indigo-600 shadow-lg shadow-indigo-400/15 active:scale-95 transition-all">
            <Sparkles className="w-4 h-4 mr-2" />
            Începe acum
          </Button>
        </Link>
      </section>

      {/* How it Works - Simple explanation */}
      <section className="flex-1 container mx-auto px-4 py-4">
        <div className="max-w-4xl mx-auto">
          {/* The Problem & Solution */}
          <div className="rounded-xl p-5 bg-white/50 dark:bg-[#12121f]/50 border border-gray-200/50 dark:border-indigo-500/10 mb-4">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-3 text-center">Cum funcționează repetiția spațiată?</h2>

            <div className="grid md:grid-cols-3 gap-4">
              {/* Step 1 */}
              <div className="text-center">
                <div className="w-10 h-10 rounded-full bg-rose-100 dark:bg-rose-500/10 flex items-center justify-center mx-auto mb-2">
                  <Brain className="w-5 h-5 text-rose-500 dark:text-rose-400" />
                </div>
                <h3 className="font-medium text-sm text-gray-900 dark:text-white mb-1">Problema</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Uităm 80% din ce învățăm în 24 de ore dacă nu revizuim
                </p>
              </div>

              {/* Step 2 */}
              <div className="text-center">
                <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-500/10 flex items-center justify-center mx-auto mb-2">
                  <Calendar className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
                </div>
                <h3 className="font-medium text-sm text-gray-900 dark:text-white mb-1">Soluția</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Revizuim la intervale optime: 1 zi, 3 zile, 7 zile, 14 zile...
                </p>
              </div>

              {/* Step 3 */}
              <div className="text-center">
                <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center mx-auto mb-2">
                  <Trophy className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
                </div>
                <h3 className="font-medium text-sm text-gray-900 dark:text-white mb-1">Rezultatul</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Memoria pe termen lung cu efort minim de revizuire
                </p>
              </div>
            </div>
          </div>

          {/* Benefits - Horizontal */}
          <div className="grid md:grid-cols-3 gap-3">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/50 dark:bg-[#12121f]/50 border border-gray-200/50 dark:border-indigo-500/10">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-400/10 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-indigo-500 dark:text-indigo-300">1</span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                <span className="font-medium text-gray-900 dark:text-white">Creezi carduri</span> cu întrebări și răspunsuri
              </p>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/50 dark:bg-[#12121f]/50 border border-gray-200/50 dark:border-indigo-500/10">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-400/10 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-indigo-500 dark:text-indigo-300">2</span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                <span className="font-medium text-gray-900 dark:text-white">Studiezi</span> și evaluezi cât de bine știi
              </p>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/50 dark:bg-[#12121f]/50 border border-gray-200/50 dark:border-indigo-500/10">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-400/10 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-indigo-500 dark:text-indigo-300">3</span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                <span className="font-medium text-gray-900 dark:text-white">App-ul calculează</span> când să revizuiești
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200/50 dark:border-indigo-500/10 py-3">
        <div className="container mx-auto px-4 text-center text-xs text-gray-500">
          EbbiMed folosește algoritmul SM-2 (Anki) pentru calcularea intervalelor optime
        </div>
      </footer>
    </div>
  )
}

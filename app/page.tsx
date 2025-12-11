import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Navbar } from '@/components/navbar'
import { Logo } from '@/components/logo'
import { Clock, Sparkles, Target, TrendingUp } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white dark:from-[#0a0a12] dark:to-[#0f0f1a]">
      <Navbar />

      {/* Hero Section - Compact */}
      <section className="container mx-auto px-4 pt-8 pb-6 text-center">
        <div className="flex justify-center mb-4">
          <div className="relative">
            <div className="absolute inset-0 bg-indigo-500/20 blur-3xl rounded-full" />
            <Logo size="lg" className="relative" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-3">
          <span className="bg-gradient-to-r from-indigo-400 via-indigo-500 to-indigo-600 bg-clip-text text-transparent">
            EbbiMed
          </span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-xl mx-auto">
          Memorează eficient cunoștințele medicale cu repetiție spațiată
        </p>
        <Link href="/decks">
          <Button size="lg" className="px-8 py-5 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 shadow-lg shadow-indigo-500/25">
            <Sparkles className="w-4 h-4 mr-2" />
            Începe acum
          </Button>
        </Link>
      </section>

      {/* Features + Curve - Side by Side */}
      <section className="flex-1 container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-2 gap-6 max-w-6xl mx-auto items-start">
          {/* Left: Features */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">De ce EbbiMed?</h2>

            <div className="flex gap-3 p-3 rounded-xl bg-white/50 dark:bg-[#12121f]/50 border border-gray-200/50 dark:border-indigo-500/10">
              <div className="w-9 h-9 rounded-lg bg-indigo-100 dark:bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
                <Target className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h3 className="font-medium text-sm text-gray-900 dark:text-white">Algoritm SM-2</h3>
                <p className="text-gray-500 dark:text-gray-400 text-xs">Același algoritm folosit de Anki</p>
              </div>
            </div>

            <div className="flex gap-3 p-3 rounded-xl bg-white/50 dark:bg-[#12121f]/50 border border-gray-200/50 dark:border-indigo-500/10">
              <div className="w-9 h-9 rounded-lg bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <h3 className="font-medium text-sm text-gray-900 dark:text-white">Retenție pe termen lung</h3>
                <p className="text-gray-500 dark:text-gray-400 text-xs">Combatează curba uitării Ebbinghaus</p>
              </div>
            </div>

            <div className="flex gap-3 p-3 rounded-xl bg-white/50 dark:bg-[#12121f]/50 border border-gray-200/50 dark:border-indigo-500/10">
              <div className="w-9 h-9 rounded-lg bg-amber-100 dark:bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <h3 className="font-medium text-sm text-gray-900 dark:text-white">Economisești timp</h3>
                <p className="text-gray-500 dark:text-gray-400 text-xs">Revizuiești doar când este necesar</p>
              </div>
            </div>
          </div>

          {/* Right: Ebbinghaus Curve */}
          <div className="rounded-xl p-4 bg-white/50 dark:bg-[#12121f]/50 border border-gray-200/50 dark:border-indigo-500/10">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Cum funcționează</h2>

            {/* Chart */}
            <div className="relative h-36 mb-3">
              {/* Grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between">
                {[100, 50, 0].map((val) => (
                  <div key={val} className="flex items-center gap-2">
                    <span className="text-[10px] text-gray-400 w-6">{val}%</span>
                    <div className="flex-1 border-t border-gray-200 dark:border-gray-800" />
                  </div>
                ))}
              </div>

              {/* SVG Curves */}
              <svg className="absolute left-8 top-0 right-0 h-full" viewBox="0 0 300 200" preserveAspectRatio="none">
                <path d="M 0,10 Q 50,100 100,140 T 200,170 T 300,180" fill="none" stroke="#f43f5e" strokeWidth="3" className="opacity-70" />
                <path d="M 0,10 L 40,60 L 40,20 L 100,70 L 100,25 L 180,75 L 180,30 L 280,60" fill="none" stroke="#10b981" strokeWidth="3" />
                <circle cx="40" cy="20" r="5" fill="#10b981" />
                <circle cx="100" cy="25" r="5" fill="#10b981" />
                <circle cx="180" cy="30" r="5" fill="#10b981" />
              </svg>

              {/* X-axis */}
              <div className="absolute bottom-0 left-8 right-0 flex justify-between text-[10px] text-gray-400">
                <span>Zi 1</span>
                <span>Zi 7</span>
                <span>Zi 30</span>
              </div>
            </div>

            {/* Legend - Inline */}
            <div className="flex flex-wrap gap-4 text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-0.5 bg-rose-500 rounded opacity-70" />
                <span>Fără revizuire</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-0.5 bg-emerald-500 rounded" />
                <span>Cu repetiție spațiată</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                <span>Revizuiri</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200/50 dark:border-indigo-500/10 py-4">
        <div className="container mx-auto px-4 text-center text-xs text-gray-500">
          EbbiMed - Învățare medicală cu repetiție spațiată
        </div>
      </footer>
    </div>
  )
}

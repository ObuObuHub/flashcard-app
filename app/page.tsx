import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Navbar } from '@/components/navbar'
import { Logo } from '@/components/logo'
import { Clock, Sparkles, Target, TrendingUp } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-[#0a0a12] dark:to-[#0f0f1a]">
      <Navbar />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 text-center">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-indigo-500/20 blur-3xl rounded-full" />
            <Logo size="xl" className="relative" />
          </div>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          <span className="bg-gradient-to-r from-indigo-400 via-indigo-500 to-indigo-600 bg-clip-text text-transparent">
            EbbiMed
          </span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
          Memorează eficient cunoștințele medicale cu repetiție spațiată și tehnici mnemonice
        </p>
        <Link href="/decks">
          <Button size="lg" className="text-lg px-10 py-6 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 shadow-lg shadow-indigo-500/25 transition-all hover:shadow-xl hover:shadow-indigo-500/30">
            <Sparkles className="w-5 h-5 mr-2" />
            Începe acum
          </Button>
        </Link>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-10">
        <div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          <div className="group p-4 rounded-2xl bg-white/50 dark:bg-[#12121f]/50 backdrop-blur-sm border border-gray-200/50 dark:border-indigo-500/10 hover:border-indigo-500/30 transition-all hover:shadow-lg hover:shadow-indigo-500/5">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-500/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Target className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="font-semibold text-base mb-1 text-gray-900 dark:text-white">Algoritm SM-2</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Același algoritm folosit de Anki pentru intervalele optime de revizuire
            </p>
          </div>

          <div className="group p-4 rounded-2xl bg-white/50 dark:bg-[#12121f]/50 backdrop-blur-sm border border-gray-200/50 dark:border-indigo-500/10 hover:border-indigo-500/30 transition-all hover:shadow-lg hover:shadow-indigo-500/5">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="font-semibold text-base mb-1 text-gray-900 dark:text-white">Retenție pe termen lung</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Revizuirile programate combatează curba uitării și consolidează memoria
            </p>
          </div>

          <div className="group p-4 rounded-2xl bg-white/50 dark:bg-[#12121f]/50 backdrop-blur-sm border border-gray-200/50 dark:border-indigo-500/10 hover:border-indigo-500/30 transition-all hover:shadow-lg hover:shadow-indigo-500/5">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-500/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
            <h3 className="font-semibold text-base mb-1 text-gray-900 dark:text-white">Economisești timp</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Revizuiești doar când este necesar, nu pierzi timp repetând ce știi deja
            </p>
          </div>
        </div>
      </section>

      {/* Spaced Repetition Section */}
      <section className="container mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-center mb-3 text-gray-900 dark:text-white">
          Cum funcționează
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto text-sm">
          Curba uitării descoperită de Ebbinghaus arată că informația se pierde rapid fără revizuire
        </p>

        <div className="max-w-4xl mx-auto">
          {/* Forgetting Curve Visualization */}
          <div className="rounded-2xl p-6 bg-white/50 dark:bg-[#12121f]/50 backdrop-blur-sm border border-gray-200/50 dark:border-indigo-500/10">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              {/* Chart */}
              <div className="flex-1 w-full">
                <div className="relative h-48">
                  {/* Grid lines */}
                  <div className="absolute inset-0 flex flex-col justify-between">
                    {[100, 75, 50, 25, 0].map((val) => (
                      <div key={val} className="flex items-center gap-2">
                        <span className="text-xs text-gray-400 w-8">{val}%</span>
                        <div className="flex-1 border-t border-gray-200 dark:border-gray-800" />
                      </div>
                    ))}
                  </div>

                  {/* SVG Curves */}
                  <svg className="absolute left-10 top-0 right-0 h-full" viewBox="0 0 300 200" preserveAspectRatio="none">
                    {/* Forgetting curve (without review) */}
                    <path
                      d="M 0,10 Q 50,100 100,140 T 200,170 T 300,180"
                      fill="none"
                      stroke="#f43f5e"
                      strokeWidth="3"
                      className="opacity-70"
                    />

                    {/* With spaced repetition */}
                    <path
                      d="M 0,10 L 40,60 L 40,20 L 100,70 L 100,25 L 180,75 L 180,30 L 280,60"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="3"
                    />

                    {/* Review points */}
                    <circle cx="40" cy="20" r="5" fill="#10b981" />
                    <circle cx="100" cy="25" r="5" fill="#10b981" />
                    <circle cx="180" cy="30" r="5" fill="#10b981" />
                  </svg>

                  {/* X-axis labels */}
                  <div className="absolute bottom-0 left-10 right-0 flex justify-between text-xs text-gray-400 pt-2">
                    <span>Zi 1</span>
                    <span>Zi 7</span>
                    <span>Zi 30</span>
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className="md:w-44 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-1 bg-rose-500 rounded opacity-70" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Fără revizuire</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-1 bg-emerald-500 rounded" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Cu repetiție spațiată</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Momente de revizuire</span>
                </div>
              </div>
            </div>

            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 text-center">
              Repetiția spațiată contracarează uitarea prin revizuiri planificate la intervale progresiv mai mari.
            </p>
          </div>
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

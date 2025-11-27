import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Navbar } from '@/components/navbar'
import { Brain, TrendingUp, Clock } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Navbar />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="flex justify-center mb-6">
          <Brain className="w-20 h-20 text-blue-600" />
        </div>
        <h1 className="text-5xl font-bold mb-4 text-gray-900 dark:text-white">Flashcard</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Invata eficient cu repetitie spatiata si tehnici mnemonice
        </p>
        <Link href="/decks">
          <Button size="lg" className="text-lg px-8">
            Incepe acum
          </Button>
        </Link>
      </section>

      {/* Spaced Repetition Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Cum functioneaza
        </h2>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          {/* Forgetting Curve Visualization */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">
              Curba Uitarii (Ebbinghaus)
            </h3>
            <div className="relative h-48 mb-4">
              {/* Y-axis */}
              <div className="absolute left-0 top-0 bottom-8 w-px bg-gray-300 dark:bg-gray-600" />
              <div className="absolute left-0 top-0 text-xs text-gray-500 -translate-x-full pr-2">
                100%
              </div>
              <div className="absolute left-0 bottom-8 text-xs text-gray-500 -translate-x-full pr-2">
                0%
              </div>
              {/* X-axis */}
              <div className="absolute left-0 right-0 bottom-8 h-px bg-gray-300 dark:bg-gray-600" />
              <div className="absolute left-0 bottom-0 text-xs text-gray-500">Zi 1</div>
              <div className="absolute right-0 bottom-0 text-xs text-gray-500">Zi 30</div>

              {/* Forgetting curve (without review) */}
              <svg className="absolute inset-0 w-full h-40" preserveAspectRatio="none">
                <path
                  d="M 0,0 Q 50,120 100,140 T 200,155 T 300,160"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="3"
                  className="opacity-60"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>

              {/* With spaced repetition */}
              <svg className="absolute inset-0 w-full h-40" preserveAspectRatio="none">
                <path
                  d="M 0,0 L 30,40 L 30,10 L 80,50 L 80,15 L 150,55 L 150,20 L 250,60 L 250,25 L 300,40"
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="3"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>

              {/* Legend */}
              <div className="absolute bottom-12 right-2 text-xs space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-0.5 bg-red-500 opacity-60" />
                  <span className="text-gray-600 dark:text-gray-400">Fara revizuire</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-0.5 bg-green-500" />
                  <span className="text-gray-600 dark:text-gray-400">Cu repetitie spatiata</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Fara revizuire, uitam ~70% din informatii in 24 de ore. Repetitia spatiata previne
              acest lucru.
            </p>
          </div>

          {/* SM-2 Info Cards */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-2">
                  <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle>90% vs 20%</CardTitle>
                <CardDescription>
                  Repetitia spatiata duce la o retentie de ~90%, comparativ cu doar ~20% prin
                  invatare intensiva.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-2">
                  <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle>Algoritmul SM-2</CardTitle>
                <CardDescription>
                  Algoritmul calculeaza intervalul optim de revizuire. Cartile dificile apar mai
                  des, cele usor de retinut mai rar.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Gata sa incepi?
        </h2>
        <Link href="/decks">
          <Button size="lg" className="text-lg px-8">
            Incepe sa inveti
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
          <p>2025 Flashcard</p>
        </div>
      </footer>
    </div>
  )
}

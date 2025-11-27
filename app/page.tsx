import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Navbar } from '@/components/navbar'
import { Brain, Clock } from 'lucide-react'

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
            Start
          </Button>
        </Link>
      </section>

      {/* Spaced Repetition Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Cum functioneaza
        </h2>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-stretch">
          {/* Forgetting Curve Visualization */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">
              Curba Uitarii (Ebbinghaus)
            </h3>
            <div className="relative h-48 mb-4">
              {/* Y-axis */}
              <div className="absolute left-0 top-0 bottom-8 w-px bg-gray-300 dark:bg-gray-600" />
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
              Curba uitării descrisă de Ebbinghaus arată că, în absența reluării, proporția de informație reținută scade rapid în primele ore și zile după învățare. Repetiția spațiată contracarează acest fenomen prin revizuiri planificate la intervale de timp progresiv mai mari.
            </p>
          </div>

          {/* SM-2 Info */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg flex flex-col">
            <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              Algoritmul SM-2
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 flex-1 flex items-center">
              Algoritmi precum SM-2 modelează matematic această dinamică și estimează pentru fiecare item momente aproximativ optime de reamintire, reducând semnificativ efortul necesar pentru consolidarea în memoria de lungă durată.
            </p>
          </div>
        </div>
      </section>

    </div>
  )
}

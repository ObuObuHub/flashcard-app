import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Brain,
  TrendingUp,
  Zap,
  Clock,
  BookOpen,
  Lightbulb,
  Code,
  Moon,
  Smartphone,
  Layers,
  Target,
  RefreshCw,
} from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="flex justify-center mb-6">
          <Brain className="w-20 h-20 text-blue-600" />
        </div>
        <h1 className="text-5xl font-bold mb-4 text-gray-900 dark:text-white">Flashcard</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Platformă de învățare bazată pe știință. Folosește repetiția spațiată și tehnicile
          mnemonice pentru a memora eficient și pe termen lung.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/decks">
            <Button size="lg" className="text-lg px-8">
              Începe acum
            </Button>
          </Link>
        </div>
      </section>

      {/* Spaced Repetition Science Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-900 dark:text-white">
          Ce este Repetiția Spațiată?
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
          O tehnică de învățare dovedită științific care optimizează momentul revizuirii pentru
          retenție maximă
        </p>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          {/* Forgetting Curve Visualization */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">
              Curba Uitării (Ebbinghaus)
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
                  <span className="text-gray-600 dark:text-gray-400">Fără revizuire</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-0.5 bg-green-500" />
                  <span className="text-gray-600 dark:text-gray-400">Cu repetiție spațiată</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Hermann Ebbinghaus a descoperit că uitarea urmează o curbă exponențială. Fără
              revizuire, uităm ~70% din informații în 24 de ore.
            </p>
          </div>

          {/* Key Statistics and SM-2 Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-2">
                  <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle>90% vs 20%</CardTitle>
                <CardDescription>
                  Studiile arată că repetiția spațiată duce la o retenție de ~90%, comparativ cu
                  doar ~20% prin metoda tradițională de învățare intensivă.
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
                  Folosim algoritmul SuperMemo 2, care calculează intervalul optim de revizuire
                  bazat pe performanța ta. Cărțile dificile apar mai des, cele ușoare mai rar.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How the App Helps Section */}
      <section className="container mx-auto px-4 py-16 bg-gray-50 dark:bg-gray-800/50 rounded-2xl my-8">
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-900 dark:text-white">
          Cum te ajută această aplicație
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
          Creată pentru a face învățarea mai eficientă și mai plăcută
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Layers className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Seturi organizate</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Flashcard-uri grupate pe subiecte pentru învățare structurată
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <RefreshCw className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">
              Programare automată
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Algoritmul decide când să revizuiești fiecare carte
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Urmărire progres</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Vezi câte cărți ai stăpânit și câte mai ai de revizuit
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lightbulb className="w-8 h-8 text-orange-600 dark:text-orange-400" />
            </div>
            <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Tehnici mnemonice</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Indicii de memorie pentru fiecare flashcard
            </p>
          </div>
        </div>
      </section>

      {/* Mnemonic Techniques Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-900 dark:text-white">
          Tehnici Mnemonice
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
          Mnemonicile sunt dispozitive de memorie care transformă informația abstractă în ceva
          memorabil
        </p>

        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center mb-2">
                <span className="text-2xl font-bold text-red-600 dark:text-red-400">ABC</span>
              </div>
              <CardTitle>Acronime</CardTitle>
              <CardDescription>
                Primele litere formează un cuvânt memorabil. Ex: &quot;ROY G. BIV&quot; pentru
                culorile curcubeului.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center mb-2">
                <BookOpen className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <CardTitle>Asocieri vizuale</CardTitle>
              <CardDescription>
                Conectezi informația cu imagini mentale vii și memorabile pentru a crea legături
                puternice.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-2">
                <Zap className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <CardTitle>Povești</CardTitle>
              <CardDescription>
                Creezi o narațiune care leagă conceptele. Creierul nostru reține poveștile mai bine
                decât faptele izolate.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Mnemonic Formula */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-xl font-semibold text-center mb-6 text-gray-900 dark:text-white">
            Formula Flashcard-ului
          </h3>
          <div className="bg-gray-900 dark:bg-gray-950 rounded-xl p-6 font-mono text-sm overflow-x-auto">
            <div className="text-gray-400 mb-2">{'// Structura unui flashcard eficient'}</div>
            <div className="space-y-2">
              <div>
                <span className="text-blue-400">Front</span>
                <span className="text-gray-400">: </span>
                <span className="text-green-400">&quot;Întrebarea sau conceptul&quot;</span>
              </div>
              <div>
                <span className="text-blue-400">Back</span>
                <span className="text-gray-400">: </span>
                <span className="text-green-400">&quot;Răspunsul sau explicația&quot;</span>
              </div>
              <div>
                <span className="text-blue-400">Mnemonic</span>
                <span className="text-gray-400">: </span>
                <span className="text-yellow-400">
                  &quot;Indiciul care te ajută să-ți amintești&quot;
                </span>
              </div>
            </div>
          </div>
          <p className="text-center text-gray-600 dark:text-gray-400 mt-4 text-sm">
            Fiecare flashcard conține un indiciu mnemonic care creează o &quot;cârlig&quot; mental
            pentru memorie
          </p>
        </div>
      </section>

      {/* App Design Philosophy Section */}
      <section className="container mx-auto px-4 py-16 bg-gray-50 dark:bg-gray-800/50 rounded-2xl my-8">
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-900 dark:text-white">
          Cum am construit aplicația
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
          Tehnologii moderne pentru o experiență de învățare optimă
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Code className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              </div>
              <h3 className="font-semibold mb-2">Next.js + Supabase</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Stack modern pentru performanță și fiabilitate
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center">
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Brain className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              </div>
              <h3 className="font-semibold mb-2">Algoritm SM-2</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Repetiție spațiată bazată pe știință
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center">
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Moon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              </div>
              <h3 className="font-semibold mb-2">Dark Mode</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Pentru sesiuni de studiu seara târziu
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center">
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Smartphone className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              </div>
              <h3 className="font-semibold mb-2">Mobile-Friendly</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Învață oriunde, de pe orice dispozitiv
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">8+</div>
            <div className="text-gray-600 dark:text-gray-400">Seturi de cărți</div>
          </div>
          <div>
            <div className="text-5xl font-bold text-green-600 dark:text-green-400 mb-2">300+</div>
            <div className="text-gray-600 dark:text-gray-400">Flashcard-uri</div>
          </div>
          <div>
            <div className="text-5xl font-bold text-purple-600 dark:text-purple-400 mb-2">90%</div>
            <div className="text-gray-600 dark:text-gray-400">Rată de retenție</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
          Gata să începi să înveți eficient?
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-xl mx-auto">
          Folosește puterea repetiției spațiate și a tehnicilor mnemonice pentru a memora mai mult,
          mai repede.
        </p>
        <Link href="/decks">
          <Button size="lg" className="text-lg px-8">
            Începe să înveți acum
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
          <p>2025 Flashcard. Creat pentru a face învățarea mai eficientă.</p>
        </div>
      </footer>
    </div>
  )
}

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Brain, TrendingUp, Zap } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="flex justify-center mb-6">
          <Brain className="w-20 h-20 text-blue-600" />
        </div>
        <h1 className="text-5xl font-bold mb-4 text-gray-900 dark:text-white">
          Flashcard
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Învățare inteligentă cu repetare spațială. Stăpânește orice subiect cu ajutorul
          tehnicilor mnemonice și algoritmilor bazați pe știință.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/signup">
            <Button size="lg" className="text-lg px-8">
              Începe acum
            </Button>
          </Link>
          <Link href="/login">
            <Button size="lg" variant="outline" className="text-lg px-8">
              Autentificare
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Caracteristici principale
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle>Repetare spațială</CardTitle>
              <CardDescription>
                Algoritmul SM-2 optimizează momentul revizuirii pentru retenție maximă
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle>Tehnici mnemonice</CardTitle>
              <CardDescription>
                Adaugă indicii mnemonice pentru a-ți accelera învățarea și memorarea
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <CardTitle>Urmărire progres</CardTitle>
              <CardDescription>
                Statistici detaliate și vizualizări pentru a-ți monitoriza evoluția
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* How it Works */}
      <section className="container mx-auto px-4 py-16 bg-gray-50 dark:bg-gray-800/50 rounded-2xl my-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Cum funcționează
        </h2>
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="flex gap-4 items-start">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold flex-shrink-0">
              1
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Creează seturi de cărți</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Organizează-ți cunoștințele în seturi tematice cu flashcard-uri personalizate
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold flex-shrink-0">
              2
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Studiază zilnic</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Revizuiește cărțile și evaluează-le (Din nou, Dificil, Bine, Ușor)
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold flex-shrink-0">
              3
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Progresează automat</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Algoritmul ajustează intervalele de revizuire pentru fiecare carte individual
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
          Gata să începi?
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Alătură-te miilor de utilizatori care învață mai eficient
        </p>
        <Link href="/signup">
          <Button size="lg" className="text-lg px-8">
            Creează cont gratuit
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
          <p>© 2025 Flashcard. Toate drepturile rezervate.</p>
        </div>
      </footer>
    </div>
  )
}

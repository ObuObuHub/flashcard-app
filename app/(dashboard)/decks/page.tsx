import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { getDecks } from '@/lib/actions/decks'
import { CreateDeckDialog } from '@/components/create-deck-dialog'
import { DeckCard } from '@/components/deck-card'
import { Navbar } from '@/components/navbar'
import { Logo } from '@/components/logo'

export default async function DecksPage() {
  // Auth disabled for development
  const decks = await getDecks()

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-[#0a0a12] dark:to-[#0f0f1a]">
      <Navbar />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Seturile mele</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Organizează-ți cunoștințele în seturi de flashcard-uri
            </p>
          </div>
          <CreateDeckDialog />
        </div>

        {decks.length === 0 ? (
          /* Empty State */
          <Card className="border-2 border-dashed border-gray-300 dark:border-indigo-500/20 bg-white/50 dark:bg-[#12121f]/50 backdrop-blur-sm">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-indigo-500/10 blur-2xl rounded-full" />
                  <Logo size="lg" className="relative opacity-50" />
                </div>
              </div>
              <CardTitle className="text-gray-900 dark:text-white">Încă nu ai seturi de cărți</CardTitle>
              <CardDescription className="text-gray-500 dark:text-gray-400">
                Creează primul tău set pentru a începe învățarea
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <CreateDeckDialog />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Sau{' '}
                <Link href="/" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                  înapoi la pagina principală
                </Link>
              </p>
            </CardContent>
          </Card>
        ) : (
          /* Decks Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {decks.map((deck) => (
              <DeckCard key={deck.id} deck={deck} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

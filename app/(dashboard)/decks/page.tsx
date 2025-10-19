import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Brain } from 'lucide-react'
import Link from 'next/link'
import { getDecks } from '@/lib/actions/decks'
import { CreateDeckDialog } from '@/components/create-deck-dialog'
import { DeckCard } from '@/components/deck-card'

export default async function DecksPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const decks = await getDecks()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold">Flashcard</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {user.email}
            </span>
            <form action="/auth/signout" method="post">
              <Button type="submit" variant="outline" size="sm">
                Deconectare
              </Button>
            </form>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold">Seturile mele</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Organizează-ți cunoștințele în seturi de flashcard-uri
            </p>
          </div>
          <CreateDeckDialog />
        </div>

        {decks.length === 0 ? (
          /* Empty State */
          <Card className="border-2 border-dashed">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-4">
                <Brain className="w-16 h-16 text-gray-400" />
              </div>
              <CardTitle>Încă nu ai seturi de cărți</CardTitle>
              <CardDescription>
                Creează primul tău set pentru a începe învățarea
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <CreateDeckDialog />
              <p className="text-sm text-gray-500 mt-4">
                Sau{' '}
                <Link href="/" className="text-blue-600 hover:underline">
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

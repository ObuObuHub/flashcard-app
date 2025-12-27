import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Play } from 'lucide-react'
import Link from 'next/link'
import { getDeck } from '@/lib/actions/decks'
import { getFlashcards } from '@/lib/actions/flashcards'
import { FlashcardList } from '@/components/flashcard-list'
import { Navbar } from '@/components/navbar'

interface DeckDetailPageProps {
  params: Promise<{ deckId: string }>
}

export default async function DeckDetailPage({ params }: DeckDetailPageProps) {
  const { deckId } = await params
  const deck = await getDeck(deckId)

  if (!deck) {
    notFound()
  }

  const flashcards = await getFlashcards(deckId)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        {/* Deck Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">{deck.name}</h2>
          {deck.description && (
            <p className="text-gray-600 dark:text-gray-400">{deck.description}</p>
          )}
          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            {flashcards.length} cărți
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mb-6">
          {flashcards.length > 0 && (
            <Button asChild>
              <Link href={`/study/${deckId}`}>
                <Play className="w-4 h-4 mr-2" />
                Studiază ({flashcards.length})
              </Link>
            </Button>
          )}
        </div>

        {/* Flashcards List */}
        <FlashcardList flashcards={flashcards} deckId={deckId} />
      </main>
    </div>
  )
}

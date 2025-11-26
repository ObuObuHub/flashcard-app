import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Play, Tags } from 'lucide-react'
import Link from 'next/link'
import { getDeck } from '@/lib/actions/decks'
import { getFlashcards } from '@/lib/actions/flashcards'
import { getTags } from '@/lib/actions/topics'
import { FlashcardForm } from '@/components/flashcard-form'
import { FlashcardFilterView } from '@/components/flashcard-filter-view'
import { Navbar } from '@/components/navbar'

interface DeckDetailPageProps {
  params: Promise<{ deckId: string }>
}

export default async function DeckDetailPage({ params }: DeckDetailPageProps) {
  // Auth disabled for development
  const { deckId } = await params
  const deck = await getDeck(deckId)

  if (!deck) {
    notFound()
  }

  const flashcards = await getFlashcards(deckId)
  const availableTags = await getTags()

  // Count cards due for review
  const now = new Date()
  const cardsDue = flashcards.filter((card) => {
    if (!card.stats) return true // New cards are due
    return new Date(card.stats.next_review) <= now
  }).length

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">

        {/* Deck Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">{deck.name}</h2>
          {deck.description && (
            <p className="text-gray-600 dark:text-gray-400">{deck.description}</p>
          )}
          <div className="flex gap-4 mt-4 text-sm text-gray-600 dark:text-gray-400">
            <div>{flashcards.length} cărți totale</div>
            {cardsDue > 0 && <div className="text-blue-600 font-semibold">{cardsDue} de revizuit</div>}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mb-6">
          <FlashcardForm deckId={deckId} />
          {cardsDue > 0 && (
            <Button asChild>
              <Link href={`/study/${deckId}`}>
                <Play className="w-4 h-4 mr-2" />
                Studiază ({cardsDue})
              </Link>
            </Button>
          )}
          <Button variant="outline" asChild>
            <Link href="/topics">
              <Tags className="w-4 h-4 mr-2" />
              Gestionează subiecte
            </Link>
          </Button>
        </div>

        {/* Flashcards List with Filter */}
        <FlashcardFilterView
          flashcards={flashcards}
          deckId={deckId}
          availableTags={availableTags}
        />
      </main>
    </div>
  )
}

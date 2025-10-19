import { createClient } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Brain, ArrowLeft, Play } from 'lucide-react'
import Link from 'next/link'
import { getDeck } from '@/lib/actions/decks'
import { getFlashcards } from '@/lib/actions/flashcards'
import { FlashcardForm } from '@/components/flashcard-form'
import { FlashcardList } from '@/components/flashcard-list'

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

  // Count cards due for review
  const now = new Date()
  const cardsDue = flashcards.filter((card) => {
    if (!card.stats) return true // New cards are due
    return new Date(card.stats.next_review) <= now
  }).length

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold">Flashcard</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link
            href="/decks"
            className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Înapoi la seturi
          </Link>
        </div>

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
        </div>

        {/* Flashcards List */}
        <FlashcardList flashcards={flashcards} deckId={deckId} />
      </main>
    </div>
  )
}

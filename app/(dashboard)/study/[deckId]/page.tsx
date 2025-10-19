'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Brain, ArrowLeft, RotateCw } from 'lucide-react'
import Link from 'next/link'
import { getDueFlashcards } from '@/lib/actions/flashcards'
import { getDeck } from '@/lib/actions/decks'
import { recordReview } from '@/lib/actions/reviews'
import type { FlashcardWithStats, Deck, SRSRating } from '@/types'
import { translations } from '@/types'

interface StudyPageProps {
  params: Promise<{ deckId: string }>
}

export default function StudyPage({ params }: StudyPageProps) {
  const [deckId, setDeckId] = useState<string | null>(null)
  const [deck, setDeck] = useState<Deck | null>(null)
  const [flashcards, setFlashcards] = useState<FlashcardWithStats[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const router = useRouter()
  const t = translations.study

  useEffect(() => {
    params.then(({ deckId: id }) => {
      setDeckId(id)
      loadData(id)
    })
  }, [params])

  const loadData = async (id: string) => {
    try {
      const [deckData, cardsData] = await Promise.all([
        getDeck(id),
        getDueFlashcards(id),
      ])
      setDeck(deckData)
      setFlashcards(cardsData)
    } catch (error) {
      console.error('Error loading study data:', error)
    } finally {
      setLoading(false)
    }
  }

  const currentCard = flashcards[currentIndex]

  const handleRating = async (rating: SRSRating) => {
    if (!currentCard || submitting) return

    setSubmitting(true)
    try {
      await recordReview(currentCard.id, rating)

      // Move to next card
      if (currentIndex < flashcards.length - 1) {
        setCurrentIndex(currentIndex + 1)
        setShowAnswer(false)
      } else {
        // Finished all cards
        router.push(`/decks/${deckId}`)
      }
    } catch (error) {
      console.error('Error recording review:', error)
      alert('Eroare la salvarea revizuirii')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Brain className="w-12 h-12 text-blue-600 animate-pulse mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">{translations.common.loading}</p>
        </div>
      </div>
    )
  }

  if (!deck) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400">Setul nu a fost găsit</p>
        </div>
      </div>
    )
  }

  if (flashcards.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-2">
              <Brain className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold">Flashcard</h1>
            </div>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          <Card className="max-w-2xl mx-auto text-center">
            <CardHeader>
              <CardTitle>{t.completed}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400 mb-6">{t.noCards}</p>
              <Button asChild>
                <Link href={`/decks/${deckId}`}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Înapoi la set
                </Link>
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold">{deck.name}</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Cartea {currentIndex + 1} din {flashcards.length}
                </p>
              </div>
            </div>
            <Link href={`/decks/${deckId}`}>
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Înapoi
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4">
          <div className="h-2 bg-gray-200 dark:bg-gray-700">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / flashcards.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Flashcard */}
          <Card className="mb-8 min-h-96">
            <CardContent className="p-8">
              <div className="space-y-6">
                {/* Question */}
                <div>
                  <div className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3">
                    Întrebare
                  </div>
                  <div className="text-xl font-medium whitespace-pre-wrap">
                    {currentCard.front}
                  </div>
                </div>

                {/* Answer (shown when revealed) */}
                {showAnswer && (
                  <>
                    <div className="border-t pt-6">
                      <div className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3">
                        Răspuns
                      </div>
                      <div className="text-lg whitespace-pre-wrap">{currentCard.back}</div>
                    </div>

                    {/* Mnemonic (if exists) */}
                    {currentCard.mnemonic && (
                      <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded border border-yellow-200 dark:border-yellow-800">
                        <div className="text-sm font-semibold text-yellow-800 dark:text-yellow-400 mb-2">
                          📝 Mnemonic
                        </div>
                        <div className="text-yellow-900 dark:text-yellow-300">
                          {currentCard.mnemonic}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          {!showAnswer ? (
            <div className="flex justify-center">
              <Button size="lg" onClick={() => setShowAnswer(true)}>
                <RotateCw className="w-5 h-5 mr-2" />
                {t.showAnswer}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                Cât de bine ai știut răspunsul?
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Button
                  variant="outline"
                  className="h-auto py-4 flex flex-col gap-2 border-red-200 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-900/20"
                  onClick={() => handleRating(1)}
                  disabled={submitting}
                >
                  <span className="text-lg font-semibold">{t.again}</span>
                  <span className="text-xs text-gray-500">{'<1 zi'}</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto py-4 flex flex-col gap-2 border-yellow-200 hover:bg-yellow-50 dark:border-yellow-800 dark:hover:bg-yellow-900/20"
                  onClick={() => handleRating(2)}
                  disabled={submitting}
                >
                  <span className="text-lg font-semibold">{t.hard}</span>
                  <span className="text-xs text-gray-500">
                    {currentCard.stats && currentCard.stats.interval > 0
                      ? `${Math.round(currentCard.stats.interval * 1.2)} zile`
                      : '1 zi'}
                  </span>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto py-4 flex flex-col gap-2 border-green-200 hover:bg-green-50 dark:border-green-800 dark:hover:bg-green-900/20"
                  onClick={() => handleRating(3)}
                  disabled={submitting}
                >
                  <span className="text-lg font-semibold">{t.good}</span>
                  <span className="text-xs text-gray-500">
                    {currentCard.stats && currentCard.stats.interval > 0
                      ? `${Math.round(currentCard.stats.interval * 2.5)} zile`
                      : '6 zile'}
                  </span>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto py-4 flex flex-col gap-2 border-blue-200 hover:bg-blue-50 dark:border-blue-800 dark:hover:bg-blue-900/20"
                  onClick={() => handleRating(4)}
                  disabled={submitting}
                >
                  <span className="text-lg font-semibold">{t.easy}</span>
                  <span className="text-xs text-gray-500">
                    {currentCard.stats && currentCard.stats.interval > 0
                      ? `${Math.round(currentCard.stats.interval * 3)} zile`
                      : '7+ zile'}
                  </span>
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

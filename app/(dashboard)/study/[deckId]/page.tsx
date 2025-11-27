'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Brain, ArrowLeft, RotateCw, Trophy, Clock, Target } from 'lucide-react'
import Link from 'next/link'
import { getDueFlashcards } from '@/lib/actions/flashcards'
import { getDeck } from '@/lib/actions/decks'
import { recordReview } from '@/lib/actions/reviews'
import { getPreviewIntervals } from '@/lib/srs'
import { Navbar } from '@/components/navbar'
import { ToastContainer } from '@/components/ui/toast'
import { useToast } from '@/components/ui/use-toast'
import type { FlashcardWithStats, Deck, SRSRating } from '@/types'
import { translations } from '@/types'

interface StudyPageProps {
  params: Promise<{ deckId: string }>
}

interface SessionStats {
  startTime: Date
  ratings: { again: number; hard: number; good: number; easy: number }
}

export default function StudyPage({ params }: StudyPageProps) {
  const [deckId, setDeckId] = useState<string | null>(null)
  const [deck, setDeck] = useState<Deck | null>(null)
  const [flashcards, setFlashcards] = useState<FlashcardWithStats[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [sessionComplete, setSessionComplete] = useState(false)
  const [sessionStats, setSessionStats] = useState<SessionStats>({
    startTime: new Date(),
    ratings: { again: 0, hard: 0, good: 0, easy: 0 },
  })
  const isSubmittingRef = useRef(false)
  const touchStartRef = useRef<{ x: number; y: number } | null>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const { toasts, addToast, removeToast } = useToast()
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
      setSessionStats({
        startTime: new Date(),
        ratings: { again: 0, hard: 0, good: 0, easy: 0 },
      })
    } catch (error) {
      console.error('Error loading study data:', error)
    } finally {
      setLoading(false)
    }
  }

  const currentCard = flashcards[currentIndex]

  const handleRating = useCallback(async (rating: SRSRating) => {
    if (!currentCard || isSubmittingRef.current) return

    isSubmittingRef.current = true
    setSubmitting(true)

    try {
      await recordReview(currentCard.id, rating)

      // Update session stats
      const ratingKey = { 1: 'again', 2: 'hard', 3: 'good', 4: 'easy' }[rating] as keyof SessionStats['ratings']
      setSessionStats((prev) => ({
        ...prev,
        ratings: { ...prev.ratings, [ratingKey]: prev.ratings[ratingKey] + 1 },
      }))

      // Move to next card or complete session
      if (currentIndex < flashcards.length - 1) {
        setCurrentIndex(currentIndex + 1)
        setShowAnswer(false)
      } else {
        setSessionComplete(true)
      }
    } catch (error) {
      console.error('Error recording review:', error)
      const errorMessage = error instanceof Error ? error.message : 'Eroare la salvarea revizuirii'
      addToast(errorMessage + ' - Incearca din nou.', 'error')
    } finally {
      isSubmittingRef.current = false
      setSubmitting(false)
    }
  }, [currentCard, currentIndex, flashcards.length, addToast])

  // Navigate to previous/next card
  const goToPrevCard = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setShowAnswer(false)
    }
  }, [currentIndex])

  const goToNextCard = useCallback(() => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setShowAnswer(false)
    }
  }, [currentIndex, flashcards.length])

  // Keyboard shortcuts (Space for reveal, 1-4 for rating, arrows for navigation)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return

      // Arrow keys for card navigation (always available)
      if (e.code === 'ArrowLeft') {
        e.preventDefault()
        goToPrevCard()
        return
      }
      if (e.code === 'ArrowRight') {
        e.preventDefault()
        goToNextCard()
        return
      }

      if (!showAnswer) {
        // Space to reveal answer
        if (e.code === 'Space') {
          e.preventDefault()
          setShowAnswer(true)
        }
      } else {
        // 1-4 to rate
        if (e.key === '1') handleRating(1)
        else if (e.key === '2') handleRating(2)
        else if (e.key === '3') handleRating(3)
        else if (e.key === '4') handleRating(4)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [showAnswer, handleRating, goToPrevCard, goToNextCard])

  // Swipe gestures for mobile (horizontal only for card navigation)
  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const handleTouchStart = (e: TouchEvent) => {
      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      }
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStartRef.current) return

      const deltaX = e.changedTouches[0].clientX - touchStartRef.current.x
      const deltaY = e.changedTouches[0].clientY - touchStartRef.current.y
      const minSwipeDistance = 50

      const absX = Math.abs(deltaX)
      const absY = Math.abs(deltaY)

      // Check if it's a tap (not a swipe)
      if (absX < 20 && absY < 20) {
        // Tap on card reveals answer
        if (!showAnswer) {
          setShowAnswer(true)
        }
        touchStartRef.current = null
        return
      }

      // Only handle horizontal swipes for card navigation
      if (absX > minSwipeDistance && absX > absY) {
        if (deltaX < 0) goToNextCard() // Swipe left = next card
        else goToPrevCard() // Swipe right = previous card
      }

      touchStartRef.current = null
    }

    card.addEventListener('touchstart', handleTouchStart, { passive: true })
    card.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      card.removeEventListener('touchstart', handleTouchStart)
      card.removeEventListener('touchend', handleTouchEnd)
    }
  }, [showAnswer, goToPrevCard, goToNextCard])

  // Format session duration
  const getSessionDuration = () => {
    const diff = Math.floor((new Date().getTime() - sessionStats.startTime.getTime()) / 1000)
    const minutes = Math.floor(diff / 60)
    const seconds = diff % 60
    return minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`
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
          <p className="text-gray-600 dark:text-gray-400">Setul nu a fost gasit</p>
        </div>
      </div>
    )
  }

  if (flashcards.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
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
                  Inapoi la set
                </Link>
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  // Session complete - show summary
  if (sessionComplete) {
    const totalCards = sessionStats.ratings.again + sessionStats.ratings.hard + sessionStats.ratings.good + sessionStats.ratings.easy
    const successRate = Math.round(((sessionStats.ratings.good + sessionStats.ratings.easy) / totalCards) * 100)

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              <CardTitle className="text-2xl">Sesiune completa!</CardTitle>
              <p className="text-gray-600 dark:text-gray-400">
                {successRate >= 80
                  ? 'Excelent! Continua tot asa!'
                  : successRate >= 60
                    ? 'Bine lucrat! Mai exerseaza.'
                    : 'Continua sa inveti, progresezi!'}
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-center">
                  <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-600">{totalCards}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Carti revizuite</div>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 text-center">
                  <Clock className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-600">{getSessionDuration()}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Timp studiu</div>
                </div>
              </div>

              {/* Rating Breakdown */}
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-700 dark:text-gray-300">Detalii raspunsuri</h3>
                <div className="grid grid-cols-4 gap-2 text-center text-sm">
                  <div className="bg-red-50 dark:bg-red-900/20 rounded p-2">
                    <div className="font-bold text-red-600">{sessionStats.ratings.again}</div>
                    <div className="text-gray-500">Din nou</div>
                  </div>
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded p-2">
                    <div className="font-bold text-yellow-600">{sessionStats.ratings.hard}</div>
                    <div className="text-gray-500">Greu</div>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 rounded p-2">
                    <div className="font-bold text-green-600">{sessionStats.ratings.good}</div>
                    <div className="text-gray-500">Bine</div>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded p-2">
                    <div className="font-bold text-blue-600">{sessionStats.ratings.easy}</div>
                    <div className="text-gray-500">Usor</div>
                  </div>
                </div>
              </div>

              {/* Success Rate */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Rata de succes</span>
                  <span className="font-bold text-lg">{successRate}%</span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                  <div
                    className="h-full bg-green-500 rounded-full transition-all"
                    style={{ width: `${successRate}%` }}
                  />
                </div>
              </div>

              <Button asChild className="w-full" size="lg">
                <Link href={`/decks/${deckId}`}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Inapoi la set
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
      <ToastContainer toasts={toasts} onClose={removeToast} />

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
                Inapoi
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
          <Card ref={cardRef} className="mb-8 min-h-96 touch-pan-x touch-pan-y">
            <CardContent className="p-8">
              <div className="space-y-6">
                {/* Question */}
                <div>
                  <div className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3">
                    Intrebare
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
                        Raspuns
                      </div>
                      <div className="text-lg whitespace-pre-wrap">{currentCard.back}</div>
                    </div>

                    {/* Mnemonic (if exists) */}
                    {currentCard.mnemonic && (
                      <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded border border-yellow-200 dark:border-yellow-800">
                        <div className="text-sm font-semibold text-yellow-800 dark:text-yellow-400 mb-2">
                          Mnemonic
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
            <div className="space-y-3">
              <div className="flex justify-center">
                <Button size="lg" onClick={() => setShowAnswer(true)}>
                  <RotateCw className="w-5 h-5 mr-2" />
                  {t.showAnswer}
                </Button>
              </div>
              <p className="text-center text-xs text-gray-400">
                <span className="hidden sm:inline">Space pentru raspuns, sageti stanga/dreapta pentru navigare</span>
                <span className="sm:hidden">Atinge cardul pentru raspuns, swipe stanga/dreapta pentru navigare</span>
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                Cat de bine ai stiut raspunsul?
              </p>
              {(() => {
                const previews = getPreviewIntervals(currentCard.stats)
                const formatInterval = (days: number) =>
                  days === 1 ? '1 zi' : `${days} zile`
                return (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <Button
                      variant="outline"
                      className="h-auto py-4 flex flex-col gap-2 border-red-200 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-900/20"
                      onClick={() => handleRating(1)}
                      disabled={submitting}
                    >
                      <span className="text-lg font-semibold">{t.again}</span>
                      <span className="text-xs text-gray-500">
                        {formatInterval(previews.again)}
                      </span>
                      <span className="text-xs text-gray-400 hidden sm:block">1</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-auto py-4 flex flex-col gap-2 border-yellow-200 hover:bg-yellow-50 dark:border-yellow-800 dark:hover:bg-yellow-900/20"
                      onClick={() => handleRating(2)}
                      disabled={submitting}
                    >
                      <span className="text-lg font-semibold">{t.hard}</span>
                      <span className="text-xs text-gray-500">
                        {formatInterval(previews.hard)}
                      </span>
                      <span className="text-xs text-gray-400 hidden sm:block">2</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-auto py-4 flex flex-col gap-2 border-green-200 hover:bg-green-50 dark:border-green-800 dark:hover:bg-green-900/20"
                      onClick={() => handleRating(3)}
                      disabled={submitting}
                    >
                      <span className="text-lg font-semibold">{t.good}</span>
                      <span className="text-xs text-gray-500">
                        {formatInterval(previews.good)}
                      </span>
                      <span className="text-xs text-gray-400 hidden sm:block">3</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-auto py-4 flex flex-col gap-2 border-blue-200 hover:bg-blue-50 dark:border-blue-800 dark:hover:bg-blue-900/20"
                      onClick={() => handleRating(4)}
                      disabled={submitting}
                    >
                      <span className="text-lg font-semibold">{t.easy}</span>
                      <span className="text-xs text-gray-500">
                        {formatInterval(previews.easy)}
                      </span>
                      <span className="text-xs text-gray-400 hidden sm:block">4</span>
                    </Button>
                  </div>
                )
              })()}
              <p className="text-center text-xs text-gray-400">
                Tastele 1-4 pentru a evalua, sageti stanga/dreapta pentru navigare
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

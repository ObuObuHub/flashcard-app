'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, RotateCw, Trophy, Clock, Target, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { Logo } from '@/components/logo'
import { getDueFlashcards } from '@/lib/actions/flashcards'
import { getDeck } from '@/lib/actions/decks'
import { recordReview } from '@/lib/actions/reviews'
import { getPreviewIntervals } from '@/lib/srs'
import { Navbar } from '@/components/navbar'
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
    } finally {
      isSubmittingRef.current = false
      setSubmitting(false)
    }
  }, [currentCard, currentIndex, flashcards.length])

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
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-[#0a0a12] dark:to-[#0f0f1a] flex items-center justify-center">
        <div className="text-center">
          <div className="relative mx-auto mb-4 w-fit">
            <div className="absolute inset-0 bg-indigo-500/20 blur-2xl rounded-full animate-pulse" />
            <Logo size="lg" className="relative animate-pulse" />
          </div>
          <p className="text-gray-600 dark:text-gray-400">{translations.common.loading}</p>
        </div>
      </div>
    )
  }

  if (!deck) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-[#0a0a12] dark:to-[#0f0f1a] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400">Setul nu a fost gasit</p>
        </div>
      </div>
    )
  }

  if (flashcards.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-[#0a0a12] dark:to-[#0f0f1a]">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Card className="max-w-2xl mx-auto text-center bg-white/50 dark:bg-[#12121f]/50 backdrop-blur-sm border-gray-200/50 dark:border-indigo-500/10">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">{t.completed}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400 mb-6">{t.noCards}</p>
              <Button asChild className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700">
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
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-[#0a0a12] dark:to-[#0f0f1a]">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Card className="max-w-2xl mx-auto bg-white/50 dark:bg-[#12121f]/50 backdrop-blur-sm border-gray-200/50 dark:border-indigo-500/10">
            <CardHeader className="text-center">
              <div className="relative mx-auto mb-4 w-fit">
                <div className="absolute inset-0 bg-amber-500/20 blur-2xl rounded-full" />
                <Trophy className="w-16 h-16 text-amber-500 relative" />
              </div>
              <CardTitle className="text-2xl text-gray-900 dark:text-white">Sesiune completă!</CardTitle>
              <p className="text-gray-600 dark:text-gray-400">
                {successRate >= 80
                  ? 'Excelent! Continuă tot așa!'
                  : successRate >= 60
                    ? 'Bine lucrat! Mai exersează.'
                    : 'Continuă să înveți, progresezi!'}
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-indigo-50 dark:bg-indigo-500/10 rounded-xl p-4 text-center border border-indigo-100 dark:border-indigo-500/20">
                  <Target className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{totalCards}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Cărți revizuite</div>
                </div>
                <div className="bg-emerald-50 dark:bg-emerald-500/10 rounded-xl p-4 text-center border border-emerald-100 dark:border-emerald-500/20">
                  <Clock className="w-8 h-8 text-emerald-600 dark:text-emerald-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{getSessionDuration()}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Timp studiu</div>
                </div>
              </div>

              {/* Rating Breakdown */}
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-700 dark:text-gray-300">Detalii răspunsuri</h3>
                <div className="grid grid-cols-4 gap-2 text-center text-sm">
                  <div className="bg-rose-50 dark:bg-rose-500/10 rounded-lg p-2 border border-rose-100 dark:border-rose-500/20">
                    <div className="font-bold text-rose-600 dark:text-rose-400">{sessionStats.ratings.again}</div>
                    <div className="text-gray-500 dark:text-gray-400 text-xs">Din nou</div>
                  </div>
                  <div className="bg-amber-50 dark:bg-amber-500/10 rounded-lg p-2 border border-amber-100 dark:border-amber-500/20">
                    <div className="font-bold text-amber-600 dark:text-amber-400">{sessionStats.ratings.hard}</div>
                    <div className="text-gray-500 dark:text-gray-400 text-xs">Greu</div>
                  </div>
                  <div className="bg-emerald-50 dark:bg-emerald-500/10 rounded-lg p-2 border border-emerald-100 dark:border-emerald-500/20">
                    <div className="font-bold text-emerald-600 dark:text-emerald-400">{sessionStats.ratings.good}</div>
                    <div className="text-gray-500 dark:text-gray-400 text-xs">Bine</div>
                  </div>
                  <div className="bg-indigo-50 dark:bg-indigo-500/10 rounded-lg p-2 border border-indigo-100 dark:border-indigo-500/20">
                    <div className="font-bold text-indigo-600 dark:text-indigo-400">{sessionStats.ratings.easy}</div>
                    <div className="text-gray-500 dark:text-gray-400 text-xs">Ușor</div>
                  </div>
                </div>
              </div>

              {/* Success Rate */}
              <div className="bg-gray-50 dark:bg-[#0a0a12] rounded-xl p-4 border border-gray-100 dark:border-indigo-500/10">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Rata de succes</span>
                  <span className="font-bold text-lg text-gray-900 dark:text-white">{successRate}%</span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full transition-all"
                    style={{ width: `${successRate}%` }}
                  />
                </div>
              </div>

              <Button asChild className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 shadow-lg shadow-indigo-500/20" size="lg">
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-[#0a0a12] dark:to-[#0f0f1a]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-[#0a0a12]/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-indigo-500/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Logo size="sm" />
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">{deck.name}</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Cartea {currentIndex + 1} din {flashcards.length}
                </p>
              </div>
            </div>
            <Link href={`/decks/${deckId}`}>
              <Button variant="outline" size="sm" className="border-gray-200 dark:border-indigo-500/20 hover:bg-indigo-50 dark:hover:bg-indigo-500/10">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Înapoi
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white/80 dark:bg-[#0a0a12]/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-indigo-500/10">
        <div className="container mx-auto px-4">
          <div className="h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / flashcards.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Flashcard */}
          <Card ref={cardRef} className="mb-8 min-h-96 touch-pan-x touch-pan-y bg-white/50 dark:bg-[#12121f]/50 backdrop-blur-sm border-gray-200/50 dark:border-indigo-500/10 shadow-xl shadow-indigo-500/5">
            <CardContent className="p-8">
              <div className="space-y-6">
                {/* Question */}
                <div>
                  <div className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-3 uppercase tracking-wide">
                    Întrebare
                  </div>
                  <div className="text-xl font-medium whitespace-pre-wrap text-gray-900 dark:text-white">
                    {currentCard.front}
                  </div>
                </div>

                {/* Answer (shown when revealed) */}
                {showAnswer && (
                  <>
                    <div className="border-t border-gray-200 dark:border-indigo-500/10 pt-6">
                      <div className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mb-3 uppercase tracking-wide">
                        Răspuns
                      </div>
                      <div className="text-lg whitespace-pre-wrap text-gray-800 dark:text-gray-200">{currentCard.back}</div>
                    </div>

                    {/* Mnemonic (if exists) */}
                    {currentCard.mnemonic && (
                      <div className="p-4 bg-amber-50 dark:bg-amber-500/10 rounded-xl border border-amber-200 dark:border-amber-500/20">
                        <div className="text-sm font-semibold text-amber-700 dark:text-amber-400 mb-2 flex items-center gap-2">
                          <Sparkles className="w-4 h-4" />
                          Mnemonic
                        </div>
                        <div className="text-amber-900 dark:text-amber-300">
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
                <Button size="lg" onClick={() => setShowAnswer(true)} className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 shadow-lg shadow-indigo-500/25">
                  <RotateCw className="w-5 h-5 mr-2" />
                  {t.showAnswer}
                </Button>
              </div>
              <p className="text-center text-xs text-gray-400 dark:text-gray-500">
                <span className="hidden sm:inline">Space pentru răspuns, săgeți stânga/dreapta pentru navigare</span>
                <span className="sm:hidden">Atinge cardul pentru răspuns, swipe stânga/dreapta pentru navigare</span>
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                Cât de bine ai știut răspunsul?
              </p>
              {(() => {
                const previews = getPreviewIntervals(currentCard.stats)
                const formatInterval = (days: number) =>
                  days === 1 ? '1 zi' : `${days} zile`
                return (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <Button
                      variant="outline"
                      className="h-auto py-4 flex flex-col gap-2 border-rose-200 hover:bg-rose-50 dark:border-rose-500/30 dark:hover:bg-rose-500/10 transition-all"
                      onClick={() => handleRating(1)}
                      disabled={submitting}
                    >
                      <span className="text-lg font-semibold text-rose-600 dark:text-rose-400">{t.again}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {formatInterval(previews.again)}
                      </span>
                      <span className="text-xs text-gray-400 dark:text-gray-500 hidden sm:block">1</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-auto py-4 flex flex-col gap-2 border-amber-200 hover:bg-amber-50 dark:border-amber-500/30 dark:hover:bg-amber-500/10 transition-all"
                      onClick={() => handleRating(2)}
                      disabled={submitting}
                    >
                      <span className="text-lg font-semibold text-amber-600 dark:text-amber-400">{t.hard}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {formatInterval(previews.hard)}
                      </span>
                      <span className="text-xs text-gray-400 dark:text-gray-500 hidden sm:block">2</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-auto py-4 flex flex-col gap-2 border-emerald-200 hover:bg-emerald-50 dark:border-emerald-500/30 dark:hover:bg-emerald-500/10 transition-all"
                      onClick={() => handleRating(3)}
                      disabled={submitting}
                    >
                      <span className="text-lg font-semibold text-emerald-600 dark:text-emerald-400">{t.good}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {formatInterval(previews.good)}
                      </span>
                      <span className="text-xs text-gray-400 dark:text-gray-500 hidden sm:block">3</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-auto py-4 flex flex-col gap-2 border-indigo-200 hover:bg-indigo-50 dark:border-indigo-500/30 dark:hover:bg-indigo-500/10 transition-all"
                      onClick={() => handleRating(4)}
                      disabled={submitting}
                    >
                      <span className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">{t.easy}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {formatInterval(previews.easy)}
                      </span>
                      <span className="text-xs text-gray-400 dark:text-gray-500 hidden sm:block">4</span>
                    </Button>
                  </div>
                )
              })()}
              <p className="text-center text-xs text-gray-400 dark:text-gray-500">
                Tastele 1-4 pentru a evalua, săgeți stânga/dreapta pentru navigare
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

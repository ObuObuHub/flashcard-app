'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, ChevronLeft, ChevronRight, Check, Lightbulb } from 'lucide-react'
import Link from 'next/link'
import { Logo } from '@/components/logo'
import type { Flashcard, Deck } from '@/types'

interface StudyClientProps {
  deck: Deck
  flashcards: Flashcard[]
}

export function StudyClient({ deck, flashcards }: StudyClientProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [showHints, setShowHints] = useState(false)
  const [sessionComplete, setSessionComplete] = useState(false)
  const touchStartRef = useRef<{ x: number; y: number } | null>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  const currentCard = flashcards[currentIndex]

  // Navigate to previous card
  const goToPrevCard = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setShowAnswer(false)
      setShowHints(false)
    }
  }, [currentIndex])

  // Navigate to next card
  const goToNextCard = useCallback(() => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setShowAnswer(false)
      setShowHints(false)
    } else {
      setSessionComplete(true)
    }
  }, [currentIndex, flashcards.length])

  // Handle space bar for progressive reveal
  const handleReveal = useCallback(() => {
    if (!showAnswer) {
      setShowAnswer(true)
    } else if (!showHints) {
      setShowHints(true)
    }
  }, [showAnswer, showHints])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return

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
      if (e.code === 'Space') {
        e.preventDefault()
        handleReveal()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goToPrevCard, goToNextCard, handleReveal])

  // Touch/swipe gestures
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

      // Tap to reveal
      if (absX < 20 && absY < 20) {
        handleReveal()
        touchStartRef.current = null
        return
      }

      // Horizontal swipe for navigation
      if (absX > minSwipeDistance && absX > absY) {
        if (deltaX < 0) goToNextCard()
        else goToPrevCard()
      }

      touchStartRef.current = null
    }

    card.addEventListener('touchstart', handleTouchStart, { passive: true })
    card.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      card.removeEventListener('touchstart', handleTouchStart)
      card.removeEventListener('touchend', handleTouchEnd)
    }
  }, [handleReveal, goToPrevCard, goToNextCard])

  // Session complete
  if (sessionComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-[#0a0a12] dark:to-[#0f0f1a] flex items-center justify-center">
        <Card className="max-w-md mx-4 bg-white/50 dark:bg-[#12121f]/50 backdrop-blur-sm border-gray-200/50 dark:border-indigo-500/10">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Sesiune completă!</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Ai parcurs toate cele {flashcards.length} cărți.
            </p>
            <div className="flex gap-3 justify-center">
              <Button variant="outline" onClick={() => {
                setCurrentIndex(0)
                setShowAnswer(false)
                setShowHints(false)
                setSessionComplete(false)
              }}>
                Reia sesiunea
              </Button>
              <Button asChild>
                <Link href={`/decks/${deck.id}`}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Înapoi la set
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
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
            <Link href={`/decks/${deck.id}`}>
              <Button variant="outline" size="sm" className="border-gray-200 dark:border-indigo-500/20">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Înapoi
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white/80 dark:bg-[#0a0a12]/80 border-b border-gray-200/50 dark:border-indigo-500/10">
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
          <Card ref={cardRef} className="mb-6 min-h-80 touch-pan-x touch-pan-y bg-white/50 dark:bg-[#12121f]/50 backdrop-blur-sm border-gray-200/50 dark:border-indigo-500/10 shadow-xl">
            <CardContent className="p-6 md:p-8">
              <div className="space-y-6">
                {/* Question */}
                <div>
                  <div className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-2 uppercase tracking-wide">
                    Întrebare
                  </div>
                  <div className="text-lg md:text-xl font-medium whitespace-pre-wrap text-gray-900 dark:text-white">
                    {currentCard.front}
                  </div>
                </div>

                {/* Answer (shown after 1st space) */}
                {showAnswer && (
                  <div className="border-t border-gray-200 dark:border-indigo-500/10 pt-6">
                    <div className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mb-2 uppercase tracking-wide">
                      Răspuns
                    </div>
                    <div className="text-base md:text-lg whitespace-pre-wrap text-gray-800 dark:text-gray-200">
                      {currentCard.back}
                    </div>
                  </div>
                )}

                {/* Hints: Key Concepts + Mnemonic (shown after 2nd space) */}
                {showHints && currentCard.extras && (
                  <div className="border-t border-gray-200 dark:border-indigo-500/10 pt-6 space-y-4">
                    {/* Key Concepts */}
                    {currentCard.extras.keyConcepts && currentCard.extras.keyConcepts.length > 0 && (
                      <div className="p-4 bg-blue-50 dark:bg-blue-500/10 rounded-xl border border-blue-200 dark:border-blue-500/20">
                        <div className="text-sm font-semibold text-blue-700 dark:text-blue-400 mb-2 flex items-center gap-2">
                          <Lightbulb className="w-4 h-4" />
                          Concepte cheie
                        </div>
                        <ul className="space-y-1 text-blue-900 dark:text-blue-300">
                          {currentCard.extras.keyConcepts.map((concept, i) => (
                            <li key={i} className="text-sm">• {concept}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Mnemonic */}
                    {currentCard.extras.mnemonic && (
                      <div className="p-4 bg-amber-50 dark:bg-amber-500/10 rounded-xl border border-amber-200 dark:border-amber-500/20">
                        <div className="text-sm font-semibold text-amber-700 dark:text-amber-400 mb-2">
                          Mnemonic
                        </div>
                        <div className="text-amber-900 dark:text-amber-300">
                          {currentCard.extras.mnemonic}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-between gap-4">
            <Button
              variant="outline"
              onClick={goToPrevCard}
              disabled={currentIndex === 0}
              className="flex-1 max-w-32"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Prev
            </Button>

            <div className="flex-1 text-center">
              {!showAnswer ? (
                <Button onClick={handleReveal} className="bg-indigo-500 hover:bg-indigo-600">
                  Arată răspuns
                </Button>
              ) : !showHints && currentCard.extras ? (
                <Button onClick={handleReveal} variant="outline" className="border-amber-300 text-amber-700 hover:bg-amber-50 dark:border-amber-500/30 dark:text-amber-400 dark:hover:bg-amber-500/10">
                  <Lightbulb className="w-4 h-4 mr-2" />
                  Arată hints
                </Button>
              ) : (
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  ← → pentru navigare
                </span>
              )}
            </div>

            <Button
              variant="outline"
              onClick={goToNextCard}
              className="flex-1 max-w-32"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          {/* Keyboard hints */}
          <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-4">
            <span className="hidden sm:inline">Space pentru reveal, săgeți pentru navigare</span>
            <span className="sm:hidden">Tap pentru reveal, swipe pentru navigare</span>
          </p>
        </div>
      </main>
    </div>
  )
}

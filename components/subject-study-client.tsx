'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ChevronLeft, ChevronRight, Check, Eye, RotateCcw } from 'lucide-react'
import Link from 'next/link'

interface SimpleFlashcard {
  front: string
  back: string
}

interface SubjectStudyClientProps {
  specialityName: string
  subjectName: string
  flashcards: SimpleFlashcard[]
  backUrl: string
}

export function SubjectStudyClient({ specialityName, subjectName, flashcards, backUrl }: SubjectStudyClientProps): React.JSX.Element {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [sessionComplete, setSessionComplete] = useState(false)
  const touchStartRef = useRef<{ x: number; y: number } | null>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  const currentCard = flashcards[currentIndex]
  const progress = ((currentIndex + 1) / flashcards.length) * 100

  const goToPrevCard = useCallback((): void => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setShowAnswer(false)
    }
  }, [currentIndex])

  const goToNextCard = useCallback((): void => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setShowAnswer(false)
    } else {
      setSessionComplete(true)
    }
  }, [currentIndex, flashcards.length])

  const handleReveal = useCallback((): void => {
    if (!showAnswer) {
      setShowAnswer(true)
    }
  }, [showAnswer])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      if (e.code === 'ArrowLeft') { e.preventDefault(); goToPrevCard(); return }
      if (e.code === 'ArrowRight') { e.preventDefault(); goToNextCard(); return }
      if (e.code === 'Space') { e.preventDefault(); handleReveal() }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goToPrevCard, goToNextCard, handleReveal])

  // Touch/swipe
  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const handleTouchStart = (e: TouchEvent): void => {
      touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
    }

    const handleTouchEnd = (e: TouchEvent): void => {
      if (!touchStartRef.current) return
      const deltaX = e.changedTouches[0].clientX - touchStartRef.current.x
      const deltaY = e.changedTouches[0].clientY - touchStartRef.current.y
      const absX = Math.abs(deltaX)
      const absY = Math.abs(deltaY)

      if (absX < 20 && absY < 20) { handleReveal(); touchStartRef.current = null; return }
      if (absX > 50 && absX > absY) {
        if (deltaX < 0) goToNextCard(); else goToPrevCard()
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

  if (sessionComplete) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="max-w-md mx-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm">
          <div className="p-8 text-center">
            <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/40 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
              Subiect parcurs
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
              Ai revizuit toate cele {flashcards.length} secțiuni din acest subiect.
            </p>
            <div className="flex gap-3 justify-center">
              <Button
                variant="outline"
                className="border-slate-200 dark:border-slate-700"
                onClick={() => {
                  setCurrentIndex(0)
                  setShowAnswer(false)
                  setSessionComplete(false)
                }}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reia
              </Button>
              <Button asChild className="bg-slate-800 hover:bg-slate-700 dark:bg-slate-200 dark:hover:bg-slate-300 dark:text-slate-900">
                <Link href={backUrl}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Înapoi
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-950/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 py-3 max-w-4xl">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                {specialityName}
              </p>
              <h1 className="text-base font-semibold text-slate-900 dark:text-slate-100 truncate">
                {subjectName}
              </h1>
            </div>
            <Link href={backUrl}>
              <Button variant="ghost" size="sm" className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 flex-shrink-0 ml-4">
                <ArrowLeft className="w-4 h-4 mr-1.5" />
                Înapoi
              </Button>
            </Link>
          </div>
        </div>

        {/* Progress */}
        <div className="h-1 bg-slate-100 dark:bg-slate-900">
          <div
            className="h-full bg-teal-500 dark:bg-teal-400 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      {/* Counter */}
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex items-center justify-between py-3">
          <span className="text-xs font-medium text-slate-400 dark:text-slate-500 tabular-nums">
            {currentIndex + 1} / {flashcards.length}
          </span>
          <span className="text-xs text-slate-400 dark:text-slate-500 tabular-nums">
            {Math.round(progress)}%
          </span>
        </div>
      </div>

      {/* Main Card */}
      <main className="container mx-auto px-4 max-w-4xl">
        <div
          ref={cardRef}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm min-h-72 touch-pan-x touch-pan-y"
        >
          {/* Front (Question) */}
          <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800/60">
            <p className="text-sm font-semibold text-teal-700 dark:text-teal-400 leading-snug">
              {currentCard.front}
            </p>
          </div>

          {/* Back (Answer) */}
          {showAnswer ? (
            <div className="px-6 py-5">
              <div className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
                {currentCard.back}
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleReveal}
              className="w-full px-6 py-12 text-center cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors rounded-b-xl"
            >
              <Eye className="w-5 h-5 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
              <p className="text-xs text-slate-400 dark:text-slate-500">
                <span className="hidden sm:inline">Apasă Space</span>
                <span className="sm:hidden">Tap</span>
                {' '}pentru a vedea răspunsul
              </p>
            </button>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between gap-3 mt-5 mb-8">
          <Button
            variant="outline"
            size="sm"
            onClick={goToPrevCard}
            disabled={currentIndex === 0}
            className="border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Anterior
          </Button>

          {!showAnswer ? (
            <Button
              size="sm"
              onClick={handleReveal}
              className="bg-teal-600 hover:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-500 text-white"
            >
              <Eye className="w-4 h-4 mr-1.5" />
              Arată răspuns
            </Button>
          ) : (
            <span className="text-xs text-slate-400 dark:text-slate-500 hidden sm:inline">
              ← → navigare
            </span>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={goToNextCard}
            className="border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
          >
            {currentIndex === flashcards.length - 1 ? 'Finalizează' : 'Următor'}
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </main>
    </div>
  )
}

'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Check,
  Activity,
  BookOpen,
  SkipForward,
  RotateCcw,
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface SimpleFlashcard {
  front: string
  back: string
}

interface SubjectStudyClientProps {
  specialityName: string
  subjectName: string
  flashcards: SimpleFlashcard[]
  backUrl: string
  /** URL for the next subject, or null if this is the last one */
  nextSubjectUrl: string | null
  nextSubjectName: string | null
}

export function SubjectStudyClient({
  specialityName,
  subjectName,
  flashcards,
  backUrl,
  nextSubjectUrl,
  nextSubjectName,
}: SubjectStudyClientProps): React.JSX.Element {
  const router = useRouter()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [sessionComplete, setSessionComplete] = useState(false)
  const touchStartRef = useRef<{ x: number; y: number } | null>(null)
  const mainRef = useRef<HTMLDivElement>(null)

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

  /**
   * Smart action: tap/Space does reveal first, then advances.
   * This means you only need ONE gesture repeated to go through everything.
   */
  const handleSmartAction = useCallback((): void => {
    if (!showAnswer) {
      setShowAnswer(true)
    } else {
      goToNextCard()
    }
  }, [showAnswer, goToNextCard])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return

      if (e.code === 'Space') {
        e.preventDefault()
        handleSmartAction()
        return
      }
      if (e.code === 'ArrowLeft') { e.preventDefault(); goToPrevCard(); return }
      if (e.code === 'ArrowRight') {
        e.preventDefault()
        if (!showAnswer) {
          setShowAnswer(true)
        } else {
          goToNextCard()
        }
        return
      }
      // N = next subject (from completion screen)
      if (e.code === 'KeyN' && sessionComplete && nextSubjectUrl) {
        e.preventDefault()
        router.push(nextSubjectUrl)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleSmartAction, goToPrevCard, goToNextCard, showAnswer, sessionComplete, nextSubjectUrl, router])

  // Touch: swipe on the ENTIRE page, tap anywhere = smart action
  useEffect(() => {
    const el = mainRef.current
    if (!el) return

    const handleTouchStart = (e: TouchEvent): void => {
      touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
    }

    const handleTouchEnd = (e: TouchEvent): void => {
      if (!touchStartRef.current) return

      // Ignore if touch ended on a button/link
      const target = e.target as HTMLElement
      if (target.closest('button') || target.closest('a')) {
        touchStartRef.current = null
        return
      }

      const deltaX = e.changedTouches[0].clientX - touchStartRef.current.x
      const deltaY = e.changedTouches[0].clientY - touchStartRef.current.y
      const absX = Math.abs(deltaX)
      const absY = Math.abs(deltaY)

      // Tap (no significant movement) = smart action
      if (absX < 15 && absY < 15) {
        handleSmartAction()
        touchStartRef.current = null
        return
      }

      // Horizontal swipe
      if (absX > 50 && absX > absY * 1.5) {
        if (deltaX < 0) {
          // Swipe left = advance (reveal then next)
          if (!showAnswer) {
            setShowAnswer(true)
          } else {
            goToNextCard()
          }
        } else {
          // Swipe right = go back
          goToPrevCard()
        }
      }
      touchStartRef.current = null
    }

    el.addEventListener('touchstart', handleTouchStart, { passive: true })
    el.addEventListener('touchend', handleTouchEnd, { passive: true })
    return () => {
      el.removeEventListener('touchstart', handleTouchStart)
      el.removeEventListener('touchend', handleTouchEnd)
    }
  }, [handleSmartAction, goToPrevCard, goToNextCard, showAnswer])

  // Auto-scroll to top when changing cards
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentIndex])

  if (sessionComplete) {
    return (
      <div ref={mainRef} className="min-h-screen bg-[#0B1120] flex items-center justify-center">
        <div className="max-w-md mx-4 bg-[#0F172A] border border-gray-800/60 rounded-xl w-full">
          <div className="p-8 text-center">
            <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-7 h-7 text-emerald-400" />
            </div>
            <h2 className="text-xl font-bold text-gray-100 mb-2">
              Subiect parcurs
            </h2>
            <p className="text-gray-400 text-sm mb-1">
              {subjectName}
            </p>
            <p className="text-gray-500 text-xs mb-6">
              {flashcards.length} secțiuni revizuite
            </p>

            <div className="space-y-3">
              {/* Primary action: next subject */}
              {nextSubjectUrl ? (
                <Button
                  asChild
                  className="w-full bg-cyan-600 hover:bg-cyan-500 text-white border-0 h-11"
                >
                  <Link href={nextSubjectUrl}>
                    <SkipForward className="w-4 h-4 mr-2" />
                    Subiectul următor
                    <span className="ml-2 text-xs text-cyan-200/60 hidden sm:inline">(N)</span>
                  </Link>
                </Button>
              ) : null}

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 border-gray-700 bg-transparent text-gray-300 hover:bg-gray-800 hover:text-gray-100"
                  onClick={() => {
                    setCurrentIndex(0)
                    setShowAnswer(false)
                    setSessionComplete(false)
                  }}
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reia
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="flex-1 border-gray-700 bg-transparent text-gray-300 hover:bg-gray-800 hover:text-gray-100"
                >
                  <Link href={backUrl}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Lista subiecte
                  </Link>
                </Button>
              </div>
            </div>

            {nextSubjectName && (
              <p className="text-[10px] text-gray-600 mt-4">
                Următor: {nextSubjectName}
              </p>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div ref={mainRef} className="min-h-screen bg-[#0B1120] select-none">
      {/* Header — compact */}
      <header className="sticky top-0 z-50 bg-[#0B1120]/95 backdrop-blur-sm border-b border-gray-800/60">
        <div className="container mx-auto px-4 py-2.5 max-w-4xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="w-7 h-7 rounded-md bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-medium text-cyan-500/60 uppercase tracking-wider leading-none mb-0.5">
                  {specialityName}
                </p>
                <h1 className="text-xs font-semibold text-gray-300 truncate leading-none">
                  {subjectName}
                </h1>
              </div>
            </div>

            {/* Compact counter + back */}
            <div className="flex items-center gap-3 flex-shrink-0 ml-3">
              <span className="text-[10px] font-mono text-gray-500 tabular-nums">
                {currentIndex + 1}/{flashcards.length}
              </span>
              <Link href={backUrl} className="text-gray-600 hover:text-gray-400 transition-colors">
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-0.5 bg-gray-900">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-teal-400 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      {/* Main Card — the entire tap/swipe zone */}
      <main className="container mx-auto px-3 sm:px-4 max-w-4xl pt-3">
        <div className="bg-[#0F172A] border border-gray-800/60 rounded-xl min-h-[60vh] overflow-hidden flex flex-col">
          {/* Front — Question (always visible) */}
          <div className="px-5 py-4 border-b border-gray-800/40">
            <div className="flex items-start gap-3">
              <div className="w-1 self-stretch rounded-full bg-cyan-500/40 flex-shrink-0" />
              <p className="text-sm font-semibold text-cyan-300 leading-relaxed">
                {currentCard.front}
              </p>
            </div>
          </div>

          {/* Back — Answer or tap zone */}
          <div className="flex-1 flex flex-col">
            {showAnswer ? (
              <div className="px-5 py-4 bg-[#0D1424] flex-1">
                <div className="text-sm text-gray-300 whitespace-pre-wrap leading-relaxed pl-4 border-l-2 border-gray-800/60">
                  {currentCard.back}
                </div>

                {/* Inline next hint on mobile */}
                <div className="mt-6 pt-4 border-t border-gray-800/30 flex items-center justify-center gap-2 sm:hidden">
                  <span className="text-[10px] text-gray-600">Tap sau swipe ← pentru a continua</span>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center px-5 py-8">
                <div className="text-center">
                  <div className="w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/15 flex items-center justify-center mx-auto mb-2">
                    <ChevronRight className="w-3.5 h-3.5 text-cyan-500/40" />
                  </div>
                  <p className="text-[10px] text-gray-600">
                    <span className="hidden sm:inline">Space</span>
                    <span className="sm:hidden">Tap</span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom nav — keyboard only, hidden on touch */}
        <div className="hidden sm:flex items-center justify-between gap-3 mt-4 mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={goToPrevCard}
            disabled={currentIndex === 0}
            className="text-gray-500 hover:text-gray-300 hover:bg-gray-800/50 disabled:opacity-20"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            ←
          </Button>

          <div className="flex items-center gap-2">
            <Activity className="w-3 h-3 text-gray-700" />
            <span className="text-[10px] font-mono text-gray-600 tabular-nums">
              {Math.round(progress)}%
            </span>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleSmartAction}
            className="text-gray-500 hover:text-gray-300 hover:bg-gray-800/50"
          >
            →
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </main>
    </div>
  )
}

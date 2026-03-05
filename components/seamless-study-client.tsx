'use client'

import { useState, useRef, useCallback, useEffect, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import {
  ArrowLeft,
  Shuffle,
  Activity,
  Zap,
  Pause,
  Filter,
} from 'lucide-react'
import Link from 'next/link'

interface SimpleFlashcard {
  front: string
  back: string
}

interface SubjectData {
  name: string
  flashcards: SimpleFlashcard[]
}

interface SpecialityData {
  name: string
  subjects: SubjectData[]
}

interface SeamlessStudyClientProps {
  data: SpecialityData[]
}

interface FlatCard {
  front: string
  back: string
  speciality: string
  subject: string
}

/** Fisher-Yates shuffle */
function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export function SeamlessStudyClient({ data }: SeamlessStudyClientProps): React.JSX.Element {
  // Filter state: null = all, or speciality name
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  // Build flat card list from data based on filter
  const allCards: FlatCard[] = useMemo(() => {
    const cards: FlatCard[] = []
    for (const spec of data) {
      if (activeFilter && spec.name !== activeFilter) continue
      for (const subj of spec.subjects) {
        for (const fc of subj.flashcards) {
          cards.push({
            front: fc.front,
            back: fc.back,
            speciality: spec.name,
            subject: subj.name,
          })
        }
      }
    }
    return shuffleArray(cards)
  }, [data, activeFilter])

  const [currentIndex, setCurrentIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [cardsReviewed, setCardsReviewed] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const touchStartRef = useRef<{ x: number; y: number } | null>(null)
  const mainRef = useRef<HTMLDivElement>(null)

  // Wrap around when we reach the end
  const currentCard = allCards[currentIndex % allCards.length]

  // Reset index when filter changes
  useEffect(() => {
    setCurrentIndex(0)
    setShowAnswer(false)
    setCardsReviewed(0)
  }, [activeFilter])

  const goToNext = useCallback((): void => {
    setCurrentIndex(prev => {
      const next = prev + 1
      // If we've gone through all cards, reshuffle would happen via useMemo
      // but since allCards is stable for same filter, just wrap around
      return next >= allCards.length ? 0 : next
    })
    setShowAnswer(false)
    setCardsReviewed(prev => prev + 1)
  }, [allCards.length])

  const goToPrev = useCallback((): void => {
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : allCards.length - 1))
    setShowAnswer(false)
  }, [allCards.length])

  const handleSmartAction = useCallback((): void => {
    if (isPaused) return
    if (!showAnswer) {
      setShowAnswer(true)
    } else {
      goToNext()
    }
  }, [showAnswer, goToNext, isPaused])

  const reshuffle = useCallback((): void => {
    // Force re-render with new shuffle by changing filter back and forth
    // Actually, just reset the index and let user continue
    setCurrentIndex(0)
    setShowAnswer(false)
  }, [])

  // Keyboard
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return

      if (e.code === 'Space') { e.preventDefault(); handleSmartAction(); return }
      if (e.code === 'ArrowRight') { e.preventDefault(); handleSmartAction(); return }
      if (e.code === 'ArrowLeft') { e.preventDefault(); goToPrev(); return }
      if (e.code === 'KeyP') { e.preventDefault(); setIsPaused(p => !p); return }
      if (e.code === 'KeyF') { e.preventDefault(); setShowFilters(f => !f); return }
      if (e.code === 'KeyR') { e.preventDefault(); reshuffle(); return }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleSmartAction, goToPrev, reshuffle])

  // Touch: full page swipe + tap
  useEffect(() => {
    const el = mainRef.current
    if (!el) return

    const handleTouchStart = (e: TouchEvent): void => {
      touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
    }

    const handleTouchEnd = (e: TouchEvent): void => {
      if (!touchStartRef.current) return
      const target = e.target as HTMLElement
      if (target.closest('button') || target.closest('a')) {
        touchStartRef.current = null
        return
      }

      const deltaX = e.changedTouches[0].clientX - touchStartRef.current.x
      const deltaY = e.changedTouches[0].clientY - touchStartRef.current.y
      const absX = Math.abs(deltaX)
      const absY = Math.abs(deltaY)

      if (absX < 15 && absY < 15) {
        handleSmartAction()
        touchStartRef.current = null
        return
      }

      if (absX > 50 && absX > absY * 1.5) {
        if (deltaX < 0) handleSmartAction()
        else goToPrev()
      }
      touchStartRef.current = null
    }

    el.addEventListener('touchstart', handleTouchStart, { passive: true })
    el.addEventListener('touchend', handleTouchEnd, { passive: true })
    return () => {
      el.removeEventListener('touchstart', handleTouchStart)
      el.removeEventListener('touchend', handleTouchEnd)
    }
  }, [handleSmartAction, goToPrev])

  // Auto-scroll to top on card change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentIndex])

  const specialityColors: Record<string, string> = {
    'BIOCHIMIE': 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
    'HEMATOLOGIE': 'text-red-400 bg-red-500/10 border-red-500/20',
    'BACTERIOLOGIE': 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    'VIRUSOLOGIE': 'text-violet-400 bg-violet-500/10 border-violet-500/20',
    'PARAZITOLOGIE': 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  }

  const dotColors: Record<string, string> = {
    'BIOCHIMIE': 'bg-cyan-500',
    'HEMATOLOGIE': 'bg-red-500',
    'BACTERIOLOGIE': 'bg-emerald-500',
    'VIRUSOLOGIE': 'bg-violet-500',
    'PARAZITOLOGIE': 'bg-amber-500',
  }

  const getSpecColor = (name: string): string => specialityColors[name] || 'text-gray-400 bg-gray-500/10 border-gray-500/20'
  const getDotColor = (name: string): string => dotColors[name] || 'bg-gray-500'

  return (
    <div ref={mainRef} className="min-h-screen bg-[#0B1120] select-none">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0B1120]/95 backdrop-blur-sm border-b border-gray-800/60">
        <div className="container mx-auto px-4 py-2.5 max-w-4xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-7 h-7 rounded-md bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
                <Shuffle className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <div>
                <h1 className="text-xs font-semibold text-gray-300 leading-none">
                  Mod Seamless
                </h1>
                <p className="text-[10px] text-gray-600 leading-none mt-0.5">
                  {activeFilter || 'Toate specialitățile'} · {allCards.length} întrebări
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Cards reviewed counter */}
              <span className="text-[10px] font-mono text-gray-600 tabular-nums">
                {cardsReviewed} parcurse
              </span>

              {/* Filter toggle */}
              <button
                type="button"
                onClick={() => setShowFilters(f => !f)}
                className={`w-7 h-7 rounded-md flex items-center justify-center transition-colors ${showFilters ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-600 hover:text-gray-400 hover:bg-gray-800/50'}`}
              >
                <Filter className="w-3.5 h-3.5" />
              </button>

              {/* Back */}
              <Link href="/subiecte" className="text-gray-600 hover:text-gray-400 transition-colors">
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Filter bar */}
        {showFilters && (
          <div className="border-t border-gray-800/40 px-4 py-2.5">
            <div className="container mx-auto max-w-4xl flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setActiveFilter(null)}
                className={`text-[10px] px-2.5 py-1 rounded-full border transition-colors ${
                  activeFilter === null
                    ? 'bg-gray-200 text-gray-900 border-gray-200'
                    : 'text-gray-400 border-gray-700 hover:border-gray-500'
                }`}
              >
                Toate
              </button>
              {data.map((spec) => (
                <button
                  key={spec.name}
                  type="button"
                  onClick={() => setActiveFilter(spec.name === activeFilter ? null : spec.name)}
                  className={`text-[10px] px-2.5 py-1 rounded-full border transition-colors ${
                    activeFilter === spec.name
                      ? getSpecColor(spec.name)
                      : 'text-gray-500 border-gray-700 hover:border-gray-500'
                  }`}
                >
                  {spec.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Infinite progress indicator - subtle pulse line */}
        <div className="h-0.5 bg-gray-900 overflow-hidden">
          <div className="h-full w-full bg-gradient-to-r from-transparent via-amber-500/40 to-transparent animate-pulse" />
        </div>
      </header>

      {/* Main Card */}
      <main className="container mx-auto px-3 sm:px-4 max-w-4xl pt-3">
        {isPaused ? (
          <div className="bg-[#0F172A] border border-gray-800/60 rounded-xl min-h-[60vh] flex items-center justify-center">
            <div className="text-center">
              <Pause className="w-8 h-8 text-gray-600 mx-auto mb-3" />
              <p className="text-sm text-gray-400 mb-1">Pauză</p>
              <p className="text-[10px] text-gray-600">
                <span className="hidden sm:inline">P sau Space</span>
                <span className="sm:hidden">Tap</span>
                {' '}pentru a continua
              </p>
              <button
                type="button"
                onClick={() => setIsPaused(false)}
                className="mt-4 text-xs text-cyan-500 hover:text-cyan-400 transition-colors"
              >
                Continuă
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-[#0F172A] border border-gray-800/60 rounded-xl min-h-[60vh] overflow-hidden flex flex-col">
            {/* Source tag */}
            <div className="px-5 py-3 flex flex-col gap-1 border-b border-gray-800/30">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${getDotColor(currentCard.speciality)}`} />
                <span className={`text-xs font-semibold uppercase tracking-wider ${specialityColors[currentCard.speciality]?.split(' ')[0] || 'text-gray-400'}`}>
                  {currentCard.speciality}
                </span>
              </div>
              <p className="text-sm text-gray-400 leading-snug pl-4">
                {currentCard.subject}
              </p>
            </div>

            {/* Question */}
            <div className="px-5 py-4 border-b border-gray-800/40">
              <div className="flex items-start gap-3">
                <div className="w-1 self-stretch rounded-full bg-cyan-500/40 flex-shrink-0" />
                <p className="text-sm font-semibold text-cyan-300 leading-relaxed">
                  {currentCard.front}
                </p>
              </div>
            </div>

            {/* Answer or tap zone */}
            <div className="flex-1 flex flex-col">
              {showAnswer ? (
                <div className="px-5 py-4 bg-[#0D1424] flex-1">
                  <div className="text-sm text-gray-300 whitespace-pre-wrap leading-relaxed pl-4 border-l-2 border-gray-800/60">
                    {currentCard.back}
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-800/30 flex items-center justify-center sm:hidden">
                    <span className="text-[10px] text-gray-600">Tap pentru următoarea întrebare</span>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center px-5 py-6">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Zap className="w-3.5 h-3.5 text-cyan-500/30" />
                    <p className="text-xs">
                      <span className="hidden sm:inline">Space</span>
                      <span className="sm:hidden">Tap</span>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Bottom bar — keyboard hints only */}
        <div className="hidden sm:flex items-center justify-between mt-4 mb-6 px-1">
          <div className="flex items-center gap-4">
            <span className="text-[10px] text-gray-700 font-mono">Space: reveal/next</span>
            <span className="text-[10px] text-gray-700 font-mono">F: filtre</span>
            <span className="text-[10px] text-gray-700 font-mono">P: pauză</span>
          </div>
          <div className="flex items-center gap-2">
            <Activity className="w-3 h-3 text-gray-700" />
            <span className="text-[10px] font-mono text-gray-600 tabular-nums">
              {cardsReviewed} / {allCards.length}
            </span>
          </div>
        </div>
      </main>
    </div>
  )
}

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

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export function SeamlessStudyClient({ data }: SeamlessStudyClientProps): React.JSX.Element {
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  const allCards: FlatCard[] = useMemo(() => {
    const cards: FlatCard[] = []
    for (const spec of data) {
      if (activeFilter && spec.name !== activeFilter) continue
      for (const subj of spec.subjects) {
        for (const fc of subj.flashcards) {
          cards.push({ front: fc.front, back: fc.back, speciality: spec.name, subject: subj.name })
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

  const currentCard = allCards[currentIndex % allCards.length]

  useEffect(() => { setCurrentIndex(0); setShowAnswer(false); setCardsReviewed(0) }, [activeFilter])

  const goToNext = useCallback((): void => {
    setCurrentIndex(prev => (prev + 1 >= allCards.length ? 0 : prev + 1))
    setShowAnswer(false)
    setCardsReviewed(prev => prev + 1)
  }, [allCards.length])

  const goToPrev = useCallback((): void => {
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : allCards.length - 1))
    setShowAnswer(false)
  }, [allCards.length])

  const handleSmartAction = useCallback((): void => {
    if (isPaused) { setIsPaused(false); return }
    if (!showAnswer) setShowAnswer(true)
    else goToNext()
  }, [showAnswer, goToNext, isPaused])

  const reshuffle = useCallback((): void => { setCurrentIndex(0); setShowAnswer(false) }, [])

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

  useEffect(() => {
    const el = mainRef.current
    if (!el) return
    const handleTouchStart = (e: TouchEvent): void => {
      touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
    }
    const handleTouchEnd = (e: TouchEvent): void => {
      if (!touchStartRef.current) return
      const target = e.target as HTMLElement
      if (target.closest('button') || target.closest('a')) { touchStartRef.current = null; return }
      const deltaX = e.changedTouches[0].clientX - touchStartRef.current.x
      const deltaY = e.changedTouches[0].clientY - touchStartRef.current.y
      const absX = Math.abs(deltaX)
      const absY = Math.abs(deltaY)
      if (absX < 15 && absY < 15) { handleSmartAction(); touchStartRef.current = null; return }
      if (absX > 50 && absX > absY * 1.5) {
        if (deltaX < 0) handleSmartAction()
        else goToPrev()
      }
      touchStartRef.current = null
    }
    el.addEventListener('touchstart', handleTouchStart, { passive: true })
    el.addEventListener('touchend', handleTouchEnd, { passive: true })
    return () => { el.removeEventListener('touchstart', handleTouchStart); el.removeEventListener('touchend', handleTouchEnd) }
  }, [handleSmartAction, goToPrev])

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }, [currentIndex])

  const specTextColors: Record<string, string> = {
    'BIOCHIMIE': 'text-blue-300/60',
    'HEMATOLOGIE': 'text-rose-300/60',
    'BACTERIOLOGIE': 'text-green-300/60',
    'VIRUSOLOGIE': 'text-purple-300/60',
    'PARAZITOLOGIE': 'text-orange-300/60',
  }

  const specDotColors: Record<string, string> = {
    'BIOCHIMIE': 'bg-blue-400/40',
    'HEMATOLOGIE': 'bg-rose-400/40',
    'BACTERIOLOGIE': 'bg-green-400/40',
    'VIRUSOLOGIE': 'bg-purple-400/40',
    'PARAZITOLOGIE': 'bg-orange-400/40',
  }

  const specFilterColors: Record<string, string> = {
    'BIOCHIMIE': 'bg-blue-400/10 text-blue-300/70 border-blue-400/20',
    'HEMATOLOGIE': 'bg-rose-400/10 text-rose-300/70 border-rose-400/20',
    'BACTERIOLOGIE': 'bg-green-400/10 text-green-300/70 border-green-400/20',
    'VIRUSOLOGIE': 'bg-purple-400/10 text-purple-300/70 border-purple-400/20',
    'PARAZITOLOGIE': 'bg-orange-400/10 text-orange-300/70 border-orange-400/20',
  }

  return (
    <div ref={mainRef} className="min-h-screen bg-[#0C1118] select-none">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0C1118]/95 backdrop-blur-sm border-b border-gray-800/40">
        <div className="container mx-auto px-4 py-2.5 max-w-4xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-7 h-7 rounded-md bg-slate-800/80 border border-slate-700/40 flex items-center justify-center flex-shrink-0">
                <Shuffle className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <div>
                <h1 className="text-xs font-semibold text-gray-300 leading-none">Mod Seamless</h1>
                <p className="text-[10px] text-gray-600 leading-none mt-0.5">
                  {activeFilter || 'Toate specialitățile'} · {allCards.length} întrebări
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-[10px] font-mono text-gray-600 tabular-nums">{cardsReviewed} parcurse</span>
              <button type="button" onClick={() => setShowFilters(f => !f)}
                className={`w-7 h-7 rounded-md flex items-center justify-center transition-colors ${showFilters ? 'bg-slate-700/60 text-gray-300' : 'text-gray-600 hover:text-gray-400 hover:bg-gray-800/50'}`}>
                <Filter className="w-3.5 h-3.5" />
              </button>
              <Link href="/subiecte" className="text-gray-600 hover:text-gray-400 transition-colors">
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {showFilters && (
          <div className="border-t border-gray-800/30 px-4 py-2.5">
            <div className="container mx-auto max-w-4xl flex flex-wrap gap-2">
              <button type="button" onClick={() => setActiveFilter(null)}
                className={`text-[10px] px-2.5 py-1 rounded-full border transition-colors ${
                  activeFilter === null ? 'bg-gray-700 text-gray-200 border-gray-600' : 'text-gray-500 border-gray-700 hover:border-gray-500'
                }`}>
                Toate
              </button>
              {data.map((spec) => (
                <button key={spec.name} type="button"
                  onClick={() => setActiveFilter(spec.name === activeFilter ? null : spec.name)}
                  className={`text-[10px] px-2.5 py-1 rounded-full border transition-colors ${
                    activeFilter === spec.name ? (specFilterColors[spec.name] || '') : 'text-gray-500 border-gray-700 hover:border-gray-500'
                  }`}>
                  {spec.name}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="h-0.5 bg-gray-900 overflow-hidden">
          <div className="h-full w-full bg-gradient-to-r from-transparent via-slate-500/30 to-transparent animate-pulse" />
        </div>
      </header>

      {/* Main */}
      <main className="container mx-auto px-3 sm:px-4 max-w-4xl pt-3">
        {isPaused ? (
          <div className="bg-[#111820] border border-gray-800/40 rounded-xl min-h-[60vh] flex items-center justify-center">
            <div className="text-center">
              <Pause className="w-8 h-8 text-gray-600 mx-auto mb-3" />
              <p className="text-sm text-gray-400 mb-1">Pauză</p>
              <p className="text-[10px] text-gray-600">
                <span className="hidden sm:inline">P sau Space</span><span className="sm:hidden">Tap</span> pentru a continua
              </p>
              <button type="button" onClick={() => setIsPaused(false)}
                className="mt-4 text-xs text-gray-400 hover:text-gray-300 transition-colors">
                Continuă
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-[#111820] border border-gray-800/40 rounded-xl min-h-[60vh] overflow-hidden flex flex-col">
            {/* Source */}
            <div className="px-5 py-3 flex flex-col gap-1 border-b border-gray-800/30">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${specDotColors[currentCard.speciality] || 'bg-gray-500/40'}`} />
                <span className={`text-xs font-semibold uppercase tracking-wider ${specTextColors[currentCard.speciality] || 'text-gray-400/60'}`}>
                  {currentCard.speciality}
                </span>
              </div>
              <p className="text-sm text-gray-400 leading-snug pl-4">{currentCard.subject}</p>
            </div>

            {/* Question */}
            <div className="px-5 py-4 border-b border-gray-800/30">
              <div className="flex items-start gap-3">
                <div className="w-1 self-stretch rounded-full bg-blue-400/20 flex-shrink-0" />
                <p className="text-sm font-semibold text-blue-200/70 leading-relaxed">{currentCard.front}</p>
              </div>
            </div>

            {/* Answer or tap */}
            <div className="flex-1 flex flex-col">
              {showAnswer ? (
                <div className="px-5 py-4 bg-[#0E141C] flex-1">
                  <div className="text-sm text-gray-300 whitespace-pre-wrap leading-relaxed pl-4 border-l-2 border-gray-800/40">
                    {currentCard.back}
                  </div>
                  <div className="mt-6 pt-4 border-t border-gray-800/20 flex items-center justify-center sm:hidden">
                    <span className="text-[10px] text-gray-600">Tap pentru următoarea întrebare</span>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center px-5 py-6">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Zap className="w-3.5 h-3.5 text-slate-600" />
                    <p className="text-xs"><span className="hidden sm:inline">Space</span><span className="sm:hidden">Tap</span></p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="hidden sm:flex items-center justify-between mt-4 mb-6 px-1">
          <div className="flex items-center gap-4">
            <span className="text-[10px] text-gray-700 font-mono">Space: reveal/next</span>
            <span className="text-[10px] text-gray-700 font-mono">F: filtre</span>
            <span className="text-[10px] text-gray-700 font-mono">P: pauză</span>
          </div>
          <div className="flex items-center gap-2">
            <Activity className="w-3 h-3 text-gray-700" />
            <span className="text-[10px] font-mono text-gray-600 tabular-nums">{cardsReviewed} / {allCards.length}</span>
          </div>
        </div>
      </main>
    </div>
  )
}

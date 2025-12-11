'use client'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BookOpen, MoreVertical, Pencil, Play, Trash2, Sparkles } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import type { DeckWithProgress } from '@/types'
import { deleteDeck } from '@/lib/actions/decks'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface DeckCardProps {
  deck: DeckWithProgress
}

export function DeckCard({ deck }: DeckCardProps) {
  const router = useRouter()
  const [deleting, setDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm(`Sigur vrei să ștergi setul "${deck.name}"? Toate cărțile vor fi șterse.`)) {
      return
    }

    setDeleting(true)
    try {
      await deleteDeck(deck.id)
      router.refresh()
    } catch (error) {
      console.error('Delete deck error:', error)
      alert('Eroare la ștergerea setului')
      setDeleting(false)
    }
  }

  const progressPercent = deck.total_cards > 0 ? Math.round((deck.mastered_cards / deck.total_cards) * 100) : 0

  return (
    <Card className="group relative overflow-hidden bg-white/50 dark:bg-[#12121f]/50 backdrop-blur-sm border-gray-200/50 dark:border-indigo-500/10 hover:border-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 hover:-translate-y-1">
      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 to-purple-500/0 group-hover:from-indigo-500/5 group-hover:to-purple-500/5 transition-all duration-300" />

      <CardHeader className="relative">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <Link href={`/decks/${deck.id}`}>
              <CardTitle className="text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer">
                {deck.name}
              </CardTitle>
            </Link>
            {deck.description && (
              <CardDescription className="mt-2 line-clamp-2 text-gray-500 dark:text-gray-400">
                {deck.description}
              </CardDescription>
            )}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" disabled={deleting} className="opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white dark:bg-[#1a1a2e] border-gray-200 dark:border-indigo-500/20">
              <DropdownMenuItem asChild>
                <Link href={`/decks/${deck.id}`} className="cursor-pointer">
                  <Pencil className="w-4 h-4 mr-2" />
                  Editează
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleDelete}
                className="text-rose-600 dark:text-rose-400 cursor-pointer focus:text-rose-600 dark:focus:text-rose-400"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Șterge
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" />
              <span>{deck.total_cards} cărți</span>
            </div>
          </div>
          {deck.cards_due > 0 && (
            <Badge className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white border-0 shadow-sm shadow-indigo-500/25">
              {deck.cards_due} de revizuit
            </Badge>
          )}
        </div>

        {/* Progress bar */}
        {deck.total_cards > 0 && (
          <div className="mb-4">
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1.5">
              <span>Progres</span>
              <span>{progressPercent}%</span>
            </div>
            <div className="h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex gap-2">
          {deck.cards_due > 0 ? (
            <Button asChild className="flex-1 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white shadow-md shadow-indigo-500/20 hover:shadow-lg hover:shadow-indigo-500/30 transition-all">
              <Link href={`/study/${deck.id}`}>
                <Play className="w-4 h-4 mr-2" />
                Studiază
              </Link>
            </Button>
          ) : (
            <Button asChild variant="outline" className="flex-1 border-gray-200 dark:border-indigo-500/20 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 hover:border-indigo-500/30 transition-all">
              <Link href={`/decks/${deck.id}`}>
                <BookOpen className="w-4 h-4 mr-2" />
                Vezi cărțile
              </Link>
            </Button>
          )}
        </div>

        {deck.total_cards > 0 && (
          <div className="mt-3 flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
            <Sparkles className="w-3 h-3 text-emerald-500" />
            <span>{deck.mastered_cards} stăpânite</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

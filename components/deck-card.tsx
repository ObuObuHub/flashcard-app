'use client'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BookOpen, MoreVertical, Pencil, Play, Trash2 } from 'lucide-react'
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
      alert('Eroare la ștergerea setului')
      setDeleting(false)
    }
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <Link href={`/decks/${deck.id}`}>
              <CardTitle className="hover:text-blue-600 transition-colors cursor-pointer">
                {deck.name}
              </CardTitle>
            </Link>
            {deck.description && (
              <CardDescription className="mt-2 line-clamp-2">
                {deck.description}
              </CardDescription>
            )}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" disabled={deleting}>
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/decks/${deck.id}`} className="cursor-pointer">
                  <Pencil className="w-4 h-4 mr-2" />
                  Editează
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleDelete}
                className="text-red-600 cursor-pointer"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Șterge
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              <span>{deck.total_cards} cărți</span>
            </div>
          </div>
          {deck.cards_due > 0 && (
            <Badge variant="default" className="bg-blue-600">
              {deck.cards_due} de revizuit
            </Badge>
          )}
        </div>

        <div className="flex gap-2">
          {deck.cards_due > 0 ? (
            <Button asChild className="flex-1">
              <Link href={`/study/${deck.id}`}>
                <Play className="w-4 h-4 mr-2" />
                Studiază
              </Link>
            </Button>
          ) : (
            <Button asChild variant="outline" className="flex-1">
              <Link href={`/decks/${deck.id}`}>
                <BookOpen className="w-4 h-4 mr-2" />
                Vezi cărțile
              </Link>
            </Button>
          )}
        </div>

        {deck.total_cards > 0 && (
          <div className="mt-3 text-xs text-gray-500">
            {deck.mastered_cards} stăpânite
          </div>
        )}
      </CardContent>
    </Card>
  )
}

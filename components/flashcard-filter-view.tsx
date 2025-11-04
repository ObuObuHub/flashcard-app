'use client'

import { useState, useMemo } from 'react'
import { FlashcardList } from './flashcard-list'
import type { FlashcardWithStats, Tag } from '@/types'
import { Tags, X } from 'lucide-react'
import { Button } from './ui/button'
import { Card } from './ui/card'

interface FlashcardFilterViewProps {
  flashcards: FlashcardWithStats[]
  deckId: string
  availableTags: Tag[]
}

export function FlashcardFilterView({
  flashcards,
  deckId,
  availableTags,
}: FlashcardFilterViewProps) {
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([])
  const [showSidebar, setShowSidebar] = useState(true)

  // Filter flashcards by selected tags
  const filteredFlashcards = useMemo(() => {
    if (selectedTagIds.length === 0) {
      return flashcards
    }

    return flashcards.filter((card) => {
      if (!card.tags || card.tags.length === 0) return false
      // Show card if it has at least one of the selected tags
      return card.tags.some((tag) => selectedTagIds.includes(tag.id))
    })
  }, [flashcards, selectedTagIds])

  const toggleTag = (tagId: string) => {
    setSelectedTagIds((prev) =>
      prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId]
    )
  }

  const clearFilters = () => {
    setSelectedTagIds([])
  }

  // Count cards per tag
  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    flashcards.forEach((card) => {
      card.tags?.forEach((tag) => {
        counts[tag.id] = (counts[tag.id] || 0) + 1
      })
    })
    return counts
  }, [flashcards])

  // If no tags exist, just show the list
  if (availableTags.length === 0) {
    return <FlashcardList flashcards={flashcards} deckId={deckId} />
  }

  return (
    <div className="flex gap-6">
      {/* Sidebar Filter */}
      {showSidebar && (
        <aside className="w-64 flex-shrink-0">
          <Card className="p-4 sticky top-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Tags className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <h3 className="font-semibold">Filtrează după subiect</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSidebar(false)}
                className="h-6 w-6 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-2">
              {availableTags.map((tag) => {
                const count = tagCounts[tag.id] || 0
                if (count === 0) return null // Don't show tags with no cards

                return (
                  <button
                    key={tag.id}
                    onClick={() => toggleTag(tag.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedTagIds.includes(tag.id)
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-medium'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{tag.name}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{count}</span>
                    </div>
                  </button>
                )
              })}
            </div>

            {selectedTagIds.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="w-full mt-4 text-xs"
              >
                Șterge filtrele
              </Button>
            )}
          </Card>
        </aside>
      )}

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        {!showSidebar && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowSidebar(true)}
            className="mb-4"
          >
            <Tags className="w-4 h-4 mr-2" />
            Arată filtre
          </Button>
        )}

        {selectedTagIds.length > 0 && (
          <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-center justify-between">
              <div className="text-sm text-blue-800 dark:text-blue-300">
                <strong>{filteredFlashcards.length}</strong> cărți cu subiectele selectate
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-blue-700 dark:text-blue-400 h-auto py-1"
              >
                Șterge
              </Button>
            </div>
          </div>
        )}

        <FlashcardList flashcards={filteredFlashcards} deckId={deckId} />
      </div>
    </div>
  )
}

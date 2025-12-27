'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronDown, ChevronUp, Pencil, Trash2, Tag } from 'lucide-react'
import type { FlashcardWithStats } from '@/types'
import { deleteFlashcard } from '@/lib/actions/flashcards'
import { FlashcardForm } from './flashcard-form'

interface FlashcardListProps {
  flashcards: FlashcardWithStats[]
  deckId: string
}

function FlashcardItem({ flashcard, deckId }: { flashcard: FlashcardWithStats; deckId: string }): React.ReactElement {
  const [expanded, setExpanded] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const router = useRouter()

  const handleDelete = async (): Promise<void> => {
    if (!confirm('Sigur vrei să ștergi această carte?')) {
      return
    }

    setDeleting(true)
    try {
      await deleteFlashcard(flashcard.id)
      router.refresh()
    } catch (error) {
      console.error('Delete flashcard error:', error)
      alert('Eroare la ștergerea cărții')
      setDeleting(false)
    }
  }

  const truncate = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm text-gray-600 dark:text-gray-400 mb-1">
                Întrebare
              </div>
              <div className="text-base">
                {expanded ? flashcard.front : truncate(flashcard.front, 150)}
              </div>
              {/* Tags */}
              {flashcard.tags && flashcard.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {flashcard.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                    >
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Answer (shown when expanded) */}
          {expanded && (
            <div className="border-t pt-3">
              <div className="font-semibold text-sm text-gray-600 dark:text-gray-400 mb-1">
                Răspuns
              </div>
              <div className="text-base whitespace-pre-wrap">{flashcard.back}</div>

              {/* Show extras if available */}
              {flashcard.extras && (
                <div className="mt-3 space-y-3">
                  {flashcard.extras.keyConcepts && flashcard.extras.keyConcepts.length > 0 && (
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800">
                      <div className="font-semibold text-sm text-blue-800 dark:text-blue-400 mb-1">
                        Concepte cheie
                      </div>
                      <ul className="text-sm text-blue-900 dark:text-blue-300 space-y-1">
                        {flashcard.extras.keyConcepts.map((concept, i) => (
                          <li key={i}>• {concept}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {flashcard.extras.mnemonic && (
                    <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded border border-amber-200 dark:border-amber-800">
                      <div className="font-semibold text-sm text-amber-800 dark:text-amber-400 mb-1">
                        Mnemonic
                      </div>
                      <div className="text-sm text-amber-900 dark:text-amber-300">
                        {flashcard.extras.mnemonic}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Fallback to old mnemonic field */}
              {!flashcard.extras?.mnemonic && flashcard.mnemonic && (
                <div className="mt-3 p-3 bg-amber-50 dark:bg-amber-900/20 rounded border border-amber-200 dark:border-amber-800">
                  <div className="font-semibold text-sm text-amber-800 dark:text-amber-400 mb-1">
                    Mnemonic
                  </div>
                  <div className="text-sm text-amber-900 dark:text-amber-300">
                    {flashcard.mnemonic}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 items-center justify-between pt-2 border-t">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setExpanded(!expanded)}
              className="text-blue-600 hover:text-blue-700"
            >
              {expanded ? (
                <>
                  <ChevronUp className="w-4 h-4 mr-1" />
                  Ascunde
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4 mr-1" />
                  Arată răspunsul
                </>
              )}
            </Button>

            <div className="flex gap-1">
              <FlashcardForm
                deckId={deckId}
                flashcard={flashcard}
                trigger={
                  <Button variant="ghost" size="sm" disabled={deleting}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                }
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDelete}
                disabled={deleting}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function FlashcardList({ flashcards, deckId }: FlashcardListProps): React.ReactElement {
  if (flashcards.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        Nu există cărți în acest set. Creează prima carte pentru a începe!
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {flashcards.map((flashcard) => (
        <FlashcardItem key={flashcard.id} flashcard={flashcard} deckId={deckId} />
      ))}
    </div>
  )
}

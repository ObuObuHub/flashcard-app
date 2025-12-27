'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Plus } from 'lucide-react'
import { createFlashcard, updateFlashcard } from '@/lib/actions/flashcards'
import { translations } from '@/types'
import type { FlashcardWithStats } from '@/types'

interface FlashcardFormProps {
  deckId: string
  flashcard?: FlashcardWithStats
  trigger?: React.ReactNode
}

export function FlashcardForm({ deckId, flashcard, trigger }: FlashcardFormProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [frontLength, setFrontLength] = useState(flashcard?.front.length || 0)
  const [backLength, setBackLength] = useState(flashcard?.back.length || 0)
  const router = useRouter()
  const t = translations.cards

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const formData = new FormData(e.currentTarget)

      if (flashcard) {
        await updateFlashcard(flashcard.id, formData)
      } else {
        await createFlashcard(deckId, formData)
      }

      setOpen(false)
      router.refresh()

      // Reset form if creating new
      if (!flashcard) {
        e.currentTarget.reset()
        setFrontLength(0)
        setBackLength(0)
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('A apărut o eroare. Te rugăm să încerci din nou.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            {t.newCard}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{flashcard ? t.edit : t.newCard}</DialogTitle>
          <DialogDescription>
            {flashcard
              ? 'Modifică conținutul cărții de învățare'
              : 'Creează o nouă carte de învățare pentru setul tău'
            }
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="front">{t.front} (Întrebare)</Label>
              <span className="text-xs text-gray-500">{frontLength} caractere</span>
            </div>
            <Textarea
              id="front"
              name="front"
              placeholder="ex. Ce este un contract sinalagmatic?"
              required
              disabled={loading}
              defaultValue={flashcard?.front}
              onChange={(e) => setFrontLength(e.target.value.length)}
              rows={4}
              className="resize-y min-h-24"
              autoFocus
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="back">{t.back} (Răspuns)</Label>
              <span className="text-xs text-gray-500">{backLength} caractere</span>
            </div>
            <Textarea
              id="back"
              name="back"
              placeholder="ex. Contract sinalagmatic este acela în care ambele părți se obligă reciproc una față de alta..."
              required
              disabled={loading}
              defaultValue={flashcard?.back}
              onChange={(e) => setBackLength(e.target.value.length)}
              rows={8}
              className="resize-y min-h-48"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mnemonic">{t.mnemonic}</Label>
            <Textarea
              id="mnemonic"
              name="mnemonic"
              placeholder="ex. SIN = două părți care SÎN-gură una alteia obligații"
              disabled={loading}
              defaultValue={flashcard?.mnemonic || ''}
              rows={3}
              className="resize-y"
            />
            <p className="text-xs text-gray-500">
              Opțional: adaugă o tehnică de memorizare sau un acronim
            </p>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded text-sm">
              {error}
            </div>
          )}

          <div className="flex gap-2 justify-end pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              {translations.common.cancel}
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? translations.common.loading : (flashcard ? translations.common.save : t.create)}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

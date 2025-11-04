'use client'

import { useState, useEffect } from 'react'
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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus, Pencil } from 'lucide-react'
import { createTag, updateTag } from '@/lib/actions/topics'
import { translations } from '@/types'
import type { Tag } from '@/types'

interface TopicDialogProps {
  tag?: Tag // If provided, we're editing
  trigger?: React.ReactNode // Custom trigger button
}

export function TopicDialog({ tag, trigger }: TopicDialogProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [name, setName] = useState(tag?.name || '')
  const router = useRouter()

  // Update name when tag changes
  useEffect(() => {
    setName(tag?.name || '')
  }, [tag])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const formData = new FormData(e.currentTarget)

      if (tag) {
        await updateTag(tag.id, formData)
      } else {
        await createTag(formData)
      }

      setOpen(false)
      setName('')
      router.refresh()
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

  const defaultTrigger = tag ? (
    <Button variant="ghost" size="sm">
      <Pencil className="w-4 h-4" />
    </Button>
  ) : (
    <Button size="lg">
      <Plus className="w-5 h-5 mr-2" />
      Subiect nou
    </Button>
  )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{tag ? 'Editează subiectul' : 'Subiect nou'}</DialogTitle>
          <DialogDescription>
            {tag
              ? 'Modifică numele subiectului'
              : 'Creează un subiect nou pentru a organiza flashcard-urile'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nume subiect</Label>
            <Input
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="ex. Biochimie Practic, Hemato Scris"
              required
              disabled={loading}
              autoFocus
            />
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded text-sm">
              {error}
            </div>
          )}

          <div className="flex gap-2 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              {translations.common.cancel}
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? translations.common.loading : translations.common.save}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

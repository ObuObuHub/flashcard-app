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
import { Settings, AlertTriangle } from 'lucide-react'
import { resetAllLearningHistory } from '@/lib/actions/reviews'

export function ResetProgressDialog() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleReset = async () => {
    setError('')
    setLoading(true)

    try {
      await resetAllLearningHistory()
      setOpen(false)
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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Settings className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            Resetare progres
          </DialogTitle>
          <DialogDescription>
            Aceasta va șterge tot istoricul de învățare pentru toate seturile de cărți.
            Toate cardurile vor fi tratate ca noi și vei începe de la zero.
          </DialogDescription>
        </DialogHeader>

        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400 px-4 py-3 rounded text-sm">
          Această acțiune este ireversibilă. Progresul de învățare va fi pierdut permanent.
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
            Anulează
          </Button>
          <Button
            onClick={handleReset}
            disabled={loading}
            variant="destructive"
          >
            {loading ? 'Se șterge...' : 'Resetează progresul'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

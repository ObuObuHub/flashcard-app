import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { getDueFlashcards } from '@/lib/actions/flashcards'
import { getDeck } from '@/lib/actions/decks'
import { Navbar } from '@/components/navbar'
import { StudyClient } from '@/components/study-client'
import { translations } from '@/types'

interface StudyPageProps {
  params: Promise<{ deckId: string }>
}

export default async function StudyPage({ params }: StudyPageProps) {
  const { deckId } = await params
  const t = translations.study

  const [deck, flashcards] = await Promise.all([
    getDeck(deckId),
    getDueFlashcards(deckId),
  ])

  if (!deck) {
    notFound()
  }

  // No cards to study
  if (flashcards.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-[#0a0a12] dark:to-[#0f0f1a]">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Card className="max-w-2xl mx-auto text-center bg-white/50 dark:bg-[#12121f]/50 backdrop-blur-sm border-gray-200/50 dark:border-indigo-500/10">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">{t.completed}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400 mb-6">{t.noCards}</p>
              <Button asChild className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700">
                <Link href={`/decks/${deckId}`}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Înapoi la set
                </Link>
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  return <StudyClient deck={deck} initialFlashcards={flashcards} />
}

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Brain, Tags } from 'lucide-react'
import Link from 'next/link'
import { getTags } from '@/lib/actions/topics'
import { TopicDialog } from '@/components/topic-dialog'
import { DeleteTopicButton } from '@/components/delete-topic-button'

export default async function TopicsPage() {
  const tags = await getTags()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold">Flashcard</h1>
          </div>
          <Link href="/decks">
            <Button variant="ghost">Înapoi la seturi</Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold">Subiecte</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Organizează flashcard-urile pe subiecte pentru o învățare mai eficientă
            </p>
          </div>
          <TopicDialog />
        </div>

        {tags.length === 0 ? (
          /* Empty State */
          <Card className="border-2 border-dashed">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-4">
                <Tags className="w-16 h-16 text-gray-400" />
              </div>
              <CardTitle>Încă nu ai subiecte</CardTitle>
              <CardDescription>
                Creează primul tău subiect pentru a organiza flashcard-urile
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <TopicDialog />
              <p className="text-sm text-gray-500 mt-4">
                Exemplu: Biochimie Practic, Hemato Scris, Bacteriologie
              </p>
            </CardContent>
          </Card>
        ) : (
          /* Topics List */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tags.map((tag) => (
              <Card key={tag.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                        <Tags className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{tag.name}</h3>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <TopicDialog tag={tag} />
                      <DeleteTopicButton tagId={tag.id} tagName={tag.name} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Helper Info */}
        <Card className="mt-8 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-2 text-blue-900 dark:text-blue-100">
              Cum să folosești subiectele
            </h3>
            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
              <li>• Creează subiecte pentru a grupa flashcard-urile (ex: Biochimie, Hemato)</li>
              <li>• Poți adăuga mai multe subiecte la un singur flashcard</li>
              <li>
                • Filtrează flashcard-urile după subiect pentru a studia doar anumite categorii
              </li>
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

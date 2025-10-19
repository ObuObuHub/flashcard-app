'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Brain } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { translations } from '@/types'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()
  const t = translations.auth

  useEffect(() => {
    const errorParam = searchParams.get('error')
    if (errorParam === 'confirmation_failed') {
      setError('Confirmarea emailului a eșuat. Te rugăm să încerci din nou sau să contactezi suportul.')
    }
  }, [searchParams])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      if (data.user) {
        router.push('/decks')
        router.refresh()
      }
    } catch (err: unknown) {
      console.error('Login error:', err)

      if (err instanceof Error) {
        // Check for network-level errors (CORS, connection failures)
        if (
          err.message.includes('Failed to fetch') ||
          err.message.includes('Load failed') ||
          err.message.includes('NetworkError')
        ) {
          setError(
            `Eroare de conexiune: Nu pot contacta serverul de autentificare.

Cauze posibile:
• Configurare CORS lipsă în Supabase
• Probleme de rețea
• Serverul Supabase este inaccesibil

Soluție: Accesează /test-connection pentru diagnostic detaliat.`
          )
        } else {
          setError(err.message)
        }
      } else {
        setError('A apărut o eroare. Te rugăm să încerci din nou.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4">
          <div className="flex justify-center">
            <Brain className="w-12 h-12 text-blue-600" />
          </div>
          <div className="text-center">
            <CardTitle className="text-2xl">{t.login}</CardTitle>
            <CardDescription>
              Intră în contul tău pentru a continua învățarea
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t.email}</Label>
              <Input
                id="email"
                type="email"
                placeholder="nume@exemplu.ro"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{t.password}</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded">
                <div className="whitespace-pre-wrap">{error}</div>
                {error.includes('test-connection') && (
                  <Link
                    href="/test-connection"
                    className="inline-block mt-3 text-sm font-semibold underline hover:text-red-700 dark:hover:text-red-300"
                  >
                    → Deschide instrumentul de diagnostic
                  </Link>
                )}
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Se încarcă...' : t.loginButton}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-gray-600 dark:text-gray-400">
              {t.noAccount}{' '}
            </span>
            <Link
              href="/signup"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
            >
              {t.signupButton}
            </Link>
          </div>

          <div className="mt-4 text-center">
            <Link
              href="/"
              className="text-sm text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              ← Înapoi la pagina principală
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <Brain className="w-12 h-12 text-blue-600 animate-pulse mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Se încarcă...</p>
        </div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  )
}

'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, XCircle, AlertCircle, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

interface TestResult {
  name: string
  status: 'pending' | 'success' | 'error' | 'warning'
  message: string
  details?: string
  error?: unknown
}

export default function TestConnectionPage() {
  const [tests, setTests] = useState<TestResult[]>([])
  const [running, setRunning] = useState(false)

  const updateTest = (name: string, result: Partial<TestResult>) => {
    setTests((prev) => {
      const existing = prev.find((t) => t.name === name)
      if (existing) {
        return prev.map((t) => (t.name === name ? { ...t, ...result } : t))
      }
      return [...prev, { name, status: 'pending', message: '', ...result }]
    })
  }

  const runTests = async () => {
    setRunning(true)
    setTests([])

    // Test 1: Environment Variables
    updateTest('env-vars', { status: 'pending', message: 'Checking environment variables...' })
    await new Promise((resolve) => setTimeout(resolve, 500))

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      updateTest('env-vars', {
        status: 'error',
        message: 'Environment variables missing!',
        details: `NEXT_PUBLIC_SUPABASE_URL: ${supabaseUrl ? '✓ Set' : '✗ Missing'}
NEXT_PUBLIC_SUPABASE_ANON_KEY: ${supabaseKey ? '✓ Set' : '✗ Missing'}`,
      })
      setRunning(false)
      return
    }

    updateTest('env-vars', {
      status: 'success',
      message: 'Environment variables loaded correctly',
      details: `URL: ${supabaseUrl}
Key: ${supabaseKey.substring(0, 20)}...`,
    })

    // Test 2: Supabase Client Creation
    updateTest('client-creation', { status: 'pending', message: 'Creating Supabase client...' })
    await new Promise((resolve) => setTimeout(resolve, 300))

    let supabase
    try {
      supabase = createClient()
      updateTest('client-creation', {
        status: 'success',
        message: 'Supabase client created successfully',
      })
    } catch (error) {
      updateTest('client-creation', {
        status: 'error',
        message: 'Failed to create Supabase client',
        details: error instanceof Error ? error.message : String(error),
        error,
      })
      setRunning(false)
      return
    }

    // Test 3: Network Connectivity
    updateTest('network', { status: 'pending', message: 'Testing network connectivity...' })
    await new Promise((resolve) => setTimeout(resolve, 300))

    try {
      const response = await fetch(`${supabaseUrl}/rest/v1/`, {
        method: 'GET',
        headers: {
          apikey: supabaseKey,
        },
      })

      if (response.ok || response.status === 404) {
        updateTest('network', {
          status: 'success',
          message: 'Network connectivity OK',
          details: `Status: ${response.status} ${response.statusText}`,
        })
      } else {
        updateTest('network', {
          status: 'error',
          message: `Network request failed: ${response.status} ${response.statusText}`,
          details: await response.text(),
        })
      }
    } catch (error) {
      updateTest('network', {
        status: 'error',
        message: 'Network request failed - likely CORS or connection issue',
        details: error instanceof Error ? error.message : String(error),
        error,
      })
    }

    // Test 4: Auth API Test
    updateTest('auth-api', { status: 'pending', message: 'Testing auth API...' })
    await new Promise((resolve) => setTimeout(resolve, 300))

    try {
      const { data, error } = await supabase.auth.getSession()

      if (error) {
        updateTest('auth-api', {
          status: 'warning',
          message: 'Auth API responded with error',
          details: JSON.stringify(error, null, 2),
          error,
        })
      } else {
        updateTest('auth-api', {
          status: 'success',
          message: 'Auth API is accessible',
          details: data.session ? 'Active session found' : 'No active session (expected)',
        })
      }
    } catch (error) {
      updateTest('auth-api', {
        status: 'error',
        message: 'Auth API call failed',
        details: error instanceof Error ? error.message : String(error),
        error,
      })
    }

    // Test 5: CORS Test
    updateTest('cors', { status: 'pending', message: 'Testing CORS configuration...' })
    await new Promise((resolve) => setTimeout(resolve, 300))

    try {
      const testEmail = 'nonexistent@test.com'
      const testPassword = 'testpass123'

      const { error } = await supabase.auth.signInWithPassword({
        email: testEmail,
        password: testPassword,
      })

      // We expect this to fail with "Invalid login credentials"
      // But if it fails with network error, it's a CORS issue
      if (error) {
        if (error.message.includes('Invalid login') || error.message.includes('credentials')) {
          updateTest('cors', {
            status: 'success',
            message: 'CORS is configured correctly',
            details: 'Auth API accepted the request (credentials invalid as expected)',
          })
        } else if (
          error.message.includes('Failed to fetch') ||
          error.message.includes('Load failed') ||
          error.message.includes('NetworkError')
        ) {
          updateTest('cors', {
            status: 'error',
            message: '🚨 CORS ERROR - This is your problem!',
            details: `The browser blocked the request to Supabase.

Error: ${error.message}

SOLUTION: Go to Supabase Dashboard:
1. Authentication → URL Configuration
2. Set Site URL: http://localhost:3000
3. Add Redirect URL: http://localhost:3000/**

Then try again.`,
            error,
          })
        } else {
          updateTest('cors', {
            status: 'warning',
            message: 'Unexpected auth error',
            details: JSON.stringify(error, null, 2),
            error,
          })
        }
      }
    } catch (error) {
      updateTest('cors', {
        status: 'error',
        message: '🚨 CORS ERROR - Network-level failure',
        details: `The request failed at the network layer.

Error: ${error instanceof Error ? error.message : String(error)}

This is almost certainly a CORS issue.

SOLUTION: Go to Supabase Dashboard:
1. Authentication → URL Configuration
2. Set Site URL: http://localhost:3000
3. Add Redirect URL: http://localhost:3000/**`,
        error,
      })
    }

    setRunning(false)
  }

  const getIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />
      case 'error':
        return <XCircle className="w-5 h-5 text-red-600" />
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-600" />
      case 'pending':
        return <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
    }
  }

  const getBadge = (status: TestResult['status']) => {
    switch (status) {
      case 'success':
        return <Badge className="bg-green-600">PASS</Badge>
      case 'error':
        return <Badge variant="destructive">FAIL</Badge>
      case 'warning':
        return <Badge className="bg-yellow-600">WARN</Badge>
      case 'pending':
        return <Badge variant="secondary">...</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">🔌 Connection Diagnostic Tool</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Test your Supabase configuration and diagnose connection issues
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button onClick={runTests} disabled={running} className="w-full" size="lg">
              {running ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Running Tests...
                </>
              ) : (
                '▶ Run All Tests'
              )}
            </Button>

            <div className="flex gap-2">
              <Link href="/login" className="flex-1">
                <Button variant="outline" className="w-full">
                  Go to Login
                </Button>
              </Link>
              <Link href="/test-auth" className="flex-1">
                <Button variant="outline" className="w-full">
                  Server Auth Test
                </Button>
              </Link>
              <Link href="/" className="flex-1">
                <Button variant="outline" className="w-full">
                  Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {tests.length > 0 && (
          <div className="space-y-3">
            {tests.map((test) => (
              <Card key={test.name}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getIcon(test.status)}
                      <div>
                        <CardTitle className="text-base">{test.message}</CardTitle>
                        <CardDescription className="text-xs font-mono">{test.name}</CardDescription>
                      </div>
                    </div>
                    {getBadge(test.status)}
                  </div>
                </CardHeader>
                {test.details && (
                  <CardContent>
                    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded text-sm">
                      <pre className="whitespace-pre-wrap font-mono text-xs">{test.details}</pre>
                    </div>
                    {test.error ? (
                      <details className="mt-3">
                        <summary className="cursor-pointer text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200">
                          Full Error Object
                        </summary>
                        <pre className="mt-2 bg-red-50 dark:bg-red-900/20 p-4 rounded text-xs overflow-auto">
                          {JSON.stringify(test.error, Object.getOwnPropertyNames(test.error), 2)}
                        </pre>
                      </details>
                    ) : null}
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        )}

        {tests.length === 0 && !running && (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-gray-500">Click &quot;Run All Tests&quot; to begin diagnostics</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

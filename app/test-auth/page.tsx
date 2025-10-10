import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default async function TestAuthPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">🧪 Auth Status Test Page</h1>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Authentication Status
              {user ? (
                <Badge className="bg-green-600">Logged In</Badge>
              ) : (
                <Badge variant="destructive">Not Logged In</Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {user ? (
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="font-semibold">User ID:</div>
                  <div className="font-mono text-xs">{user.id}</div>

                  <div className="font-semibold">Email:</div>
                  <div>{user.email}</div>

                  <div className="font-semibold">Email Confirmed:</div>
                  <div>
                    {user.email_confirmed_at ? (
                      <Badge className="bg-green-600">Yes</Badge>
                    ) : (
                      <Badge variant="destructive">No</Badge>
                    )}
                  </div>

                  <div className="font-semibold">Created At:</div>
                  <div>{new Date(user.created_at).toLocaleString('ro-RO')}</div>

                  <div className="font-semibold">Last Sign In:</div>
                  <div>
                    {user.last_sign_in_at
                      ? new Date(user.last_sign_in_at).toLocaleString('ro-RO')
                      : 'Never'}
                  </div>
                </div>

                <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded">
                  <div className="font-semibold mb-2">Full User Object:</div>
                  <pre className="text-xs overflow-auto">
                    {JSON.stringify(user, null, 2)}
                  </pre>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600 dark:text-gray-400">
                  No user logged in. Visit{' '}
                  <a href="/login" className="text-blue-600 hover:underline">
                    /login
                  </a>{' '}
                  or{' '}
                  <a href="/signup" className="text-blue-600 hover:underline">
                    /signup
                  </a>
                </p>
              </div>
            )}

            {userError && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 p-4 rounded">
                <div className="font-semibold text-red-600">User Error:</div>
                <pre className="text-xs mt-2">{JSON.stringify(userError, null, 2)}</pre>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Session Status
              {session ? (
                <Badge className="bg-green-600">Active Session</Badge>
              ) : (
                <Badge variant="secondary">No Session</Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {session ? (
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="font-semibold">Access Token:</div>
                  <div className="font-mono text-xs truncate">
                    {session.access_token.substring(0, 50)}...
                  </div>

                  <div className="font-semibold">Expires At:</div>
                  <div>
                    {session.expires_at
                      ? new Date(session.expires_at * 1000).toLocaleString('ro-RO')
                      : 'N/A'}
                  </div>
                </div>

                <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded">
                  <div className="font-semibold mb-2">Full Session Object:</div>
                  <pre className="text-xs overflow-auto">
                    {JSON.stringify(
                      {
                        ...session,
                        access_token: session.access_token.substring(0, 20) + '...',
                        refresh_token: session.refresh_token?.substring(0, 20) + '...',
                      },
                      null,
                      2
                    )}
                  </pre>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600 dark:text-gray-400">No active session</p>
              </div>
            )}

            {sessionError && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 p-4 rounded">
                <div className="font-semibold text-red-600">Session Error:</div>
                <pre className="text-xs mt-2">{JSON.stringify(sessionError, null, 2)}</pre>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex gap-2">
              <a
                href="/"
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                Home
              </a>
              <a
                href="/login"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Login
              </a>
              <a
                href="/signup"
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Signup
              </a>
              <a
                href="/decks"
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
              >
                Decks (Protected)
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

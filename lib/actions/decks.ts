'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { Deck, DeckWithProgress } from '@/types'
import { validateDeckName, validateDeckDescription } from '@/lib/validation'

export async function getDecks(): Promise<DeckWithProgress[]> {
  const supabase = await createClient()

  // Mock user for development (auth disabled)
  const userId = '00000000-0000-0000-0000-000000000001'
  const user = { id: userId }

  // Try optimized RPC function first
  const { data: rpcData, error: rpcError } = await supabase.rpc('get_decks_with_progress', {
    p_user_id: user.id,
  })

  // If RPC exists and succeeds, use it (much faster!)
  if (!rpcError && rpcData) {
    const decks = rpcData.map((deck: Record<string, unknown>) => ({
      id: deck.id as string,
      user_id: deck.user_id as string,
      name: deck.name as string,
      description: deck.description as string | null,
      created_at: deck.created_at as string,
      total_cards: Number(deck.total_cards),
      cards_due: Number(deck.cards_due),
      mastered_cards: Number(deck.mastered_cards),
    }))
    // Sort alphabetically by name
    return decks.sort((a: DeckWithProgress, b: DeckWithProgress) => a.name.localeCompare(b.name, 'ro'))
  }

  // Fallback to old N+1 approach if RPC doesn't exist
  if (rpcError && rpcError.code !== '42883') {
    // Real error, not just missing function
    throw rpcError
  }

  console.warn('Optimized RPC not found, using fallback query. Consider running migration 003.')

  // Get all decks with card counts (N+1 approach - slower)
  const { data: decks, error } = await supabase
    .from('decks')
    .select(`
      *,
      flashcards(
        id,
        card_stats(
          next_review,
          repetitions
        )
      )
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) throw error

  // Calculate progress for each deck
  const decksWithProgress: DeckWithProgress[] = (decks || []).map((deck) => {
    const cards = deck.flashcards || []
    const total_cards = cards.length

    const now = new Date()
    const cards_due = cards.filter((card: Record<string, unknown>) => {
      const stats = (card.card_stats as Record<string, unknown>[] | undefined)?.[0] as Record<string, unknown> | undefined
      if (!stats) return true // New cards are due
      return new Date(stats.next_review as string) <= now
    }).length

    const mastered_cards = cards.filter((card: Record<string, unknown>) => {
      const stats = (card.card_stats as Record<string, unknown>[] | undefined)?.[0] as Record<string, unknown> | undefined
      return stats && (stats.repetitions as number) >= 5 // 5+ successful reviews = mastered
    }).length

    return {
      id: deck.id,
      user_id: deck.user_id,
      name: deck.name,
      description: deck.description,
      created_at: deck.created_at,
      total_cards,
      cards_due,
      mastered_cards,
    }
  })

  // Sort alphabetically by name
  return decksWithProgress.sort((a, b) => a.name.localeCompare(b.name, 'ro'))
}

export async function getDeck(deckId: string): Promise<Deck | null> {
  const supabase = await createClient()

  // Mock user for development (auth disabled)
  const userId = '00000000-0000-0000-0000-000000000001'
  const user = { id: userId }

  const { data: deck, error } = await supabase
    .from('decks')
    .select('*')
    .eq('id', deckId)
    .eq('user_id', user.id)
    .single()

  if (error) {
    return null
  }

  return deck
}

export async function createDeck(formData: FormData) {
  const supabase = await createClient()

  // Mock user for development (auth disabled)
  const userId = '00000000-0000-0000-0000-000000000001'
  const user = { id: userId }

  const name = formData.get('name') as string
  const description = formData.get('description') as string | null

  // Validate inputs
  const validatedName = validateDeckName(name)
  const validatedDescription = validateDeckDescription(description)

  const { data: deck, error } = await supabase
    .from('decks')
    .insert({
      user_id: user.id,
      name: validatedName,
      description: validatedDescription,
    })
    .select()
    .single()

  if (error) throw error

  revalidatePath('/decks')
  return deck
}

export async function updateDeck(deckId: string, formData: FormData) {
  const supabase = await createClient()

  // Mock user for development (auth disabled)
  const userId = '00000000-0000-0000-0000-000000000001'
  const user = { id: userId }

  const name = formData.get('name') as string
  const description = formData.get('description') as string | null

  // Validate inputs
  const validatedName = validateDeckName(name)
  const validatedDescription = validateDeckDescription(description)

  // Verify ownership before update
  const { data: existingDeck } = await supabase
    .from('decks')
    .select('id')
    .eq('id', deckId)
    .eq('user_id', user.id)
    .single()

  if (!existingDeck) {
    throw new Error('Setul nu a fost găsit sau nu ai permisiunea de a-l modifica')
  }

  const { data: deck, error } = await supabase
    .from('decks')
    .update({
      name: validatedName,
      description: validatedDescription,
    })
    .eq('id', deckId)
    .eq('user_id', user.id)
    .select()
    .single()

  if (error) throw error

  revalidatePath('/decks')
  revalidatePath(`/decks/${deckId}`)
  return deck
}

export async function deleteDeck(deckId: string) {
  const supabase = await createClient()

  // Mock user for development (auth disabled)
  const userId = '00000000-0000-0000-0000-000000000001'
  const user = { id: userId }

  // Verify ownership before delete
  const { data: existingDeck } = await supabase
    .from('decks')
    .select('id')
    .eq('id', deckId)
    .eq('user_id', user.id)
    .single()

  if (!existingDeck) {
    throw new Error('Setul nu a fost găsit sau nu ai permisiunea de a-l șterge')
  }

  const { error } = await supabase
    .from('decks')
    .delete()
    .eq('id', deckId)
    .eq('user_id', user.id)

  if (error) throw error

  revalidatePath('/decks')
  return { success: true }
}

'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { Deck, DeckWithProgress } from '@/types'

export async function getDecks(): Promise<DeckWithProgress[]> {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  // Get all decks with card counts
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
    const cards_due = cards.filter((card: any) => {
      const stats = card.card_stats?.[0]
      if (!stats) return true // New cards are due
      return new Date(stats.next_review) <= now
    }).length

    const mastered_cards = cards.filter((card: any) => {
      const stats = card.card_stats?.[0]
      return stats && stats.repetitions >= 5 // 5+ successful reviews = mastered
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

  return decksWithProgress
}

export async function getDeck(deckId: string): Promise<Deck | null> {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const { data: deck, error } = await supabase
    .from('decks')
    .select('*')
    .eq('id', deckId)
    .eq('user_id', user.id)
    .single()

  if (error) return null
  return deck
}

export async function createDeck(formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const name = formData.get('name') as string
  const description = formData.get('description') as string | null

  if (!name || name.trim() === '') {
    throw new Error('Numele setului este obligatoriu')
  }

  const { data: deck, error } = await supabase
    .from('decks')
    .insert({
      user_id: user.id,
      name: name.trim(),
      description: description?.trim() || null,
    })
    .select()
    .single()

  if (error) throw error

  revalidatePath('/decks')
  return deck
}

export async function updateDeck(deckId: string, formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const name = formData.get('name') as string
  const description = formData.get('description') as string | null

  if (!name || name.trim() === '') {
    throw new Error('Numele setului este obligatoriu')
  }

  const { data: deck, error } = await supabase
    .from('decks')
    .update({
      name: name.trim(),
      description: description?.trim() || null,
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

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const { error } = await supabase
    .from('decks')
    .delete()
    .eq('id', deckId)
    .eq('user_id', user.id)

  if (error) throw error

  revalidatePath('/decks')
  return { success: true }
}

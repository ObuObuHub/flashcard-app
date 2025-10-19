'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { Flashcard, FlashcardWithStats } from '@/types'
import {
  validateFlashcardFront,
  validateFlashcardBack,
  validateFlashcardMnemonic,
} from '@/lib/validation'

export async function getFlashcards(deckId: string): Promise<FlashcardWithStats[]> {
  const supabase = await createClient()

  // Mock user for development (auth disabled)
  const userId = '00000000-0000-0000-0000-000000000001'
  const user = { id: userId }

  const { data: flashcards, error } = await supabase
    .from('flashcards')
    .select(`
      *,
      card_stats(*)
    `)
    .eq('deck_id', deckId)
    .order('created_at', { ascending: false })

  if (error) throw error

  return (flashcards || []).map((card) => ({
    ...card,
    stats: card.card_stats?.[0] || undefined,
  }))
}

export async function getFlashcard(cardId: string): Promise<Flashcard | null> {
  const supabase = await createClient()

  // Mock user for development (auth disabled)
  const userId = '00000000-0000-0000-0000-000000000001'
  const user = { id: userId }

  const { data: flashcard, error } = await supabase
    .from('flashcards')
    .select('*')
    .eq('id', cardId)
    .single()

  if (error) return null
  return flashcard
}

export async function createFlashcard(deckId: string, formData: FormData) {
  const supabase = await createClient()

  // Mock user for development (auth disabled)
  const userId = '00000000-0000-0000-0000-000000000001'
  const user = { id: userId }

  // Verify deck ownership
  const { data: deck } = await supabase
    .from('decks')
    .select('id')
    .eq('id', deckId)
    .eq('user_id', user.id)
    .single()

  if (!deck) throw new Error('Setul nu a fost găsit sau nu ai permisiunea să adaugi cărți')

  const front = formData.get('front') as string
  const back = formData.get('back') as string
  const mnemonic = formData.get('mnemonic') as string | null

  // Validate inputs
  const validatedFront = validateFlashcardFront(front)
  const validatedBack = validateFlashcardBack(back)
  const validatedMnemonic = validateFlashcardMnemonic(mnemonic)

  const { data: flashcard, error } = await supabase
    .from('flashcards')
    .insert({
      deck_id: deckId,
      front: validatedFront,
      back: validatedBack,
      mnemonic: validatedMnemonic,
    })
    .select()
    .single()

  if (error) throw error

  revalidatePath(`/decks/${deckId}`)
  revalidatePath('/decks')
  return flashcard
}

export async function updateFlashcard(cardId: string, formData: FormData) {
  const supabase = await createClient()

  // Mock user for development (auth disabled)
  const userId = '00000000-0000-0000-0000-000000000001'
  const user = { id: userId }

  const front = formData.get('front') as string
  const back = formData.get('back') as string
  const mnemonic = formData.get('mnemonic') as string | null

  // Validate inputs
  const validatedFront = validateFlashcardFront(front)
  const validatedBack = validateFlashcardBack(back)
  const validatedMnemonic = validateFlashcardMnemonic(mnemonic)

  // Get card and verify ownership through deck
  const { data: card } = await supabase
    .from('flashcards')
    .select(`
      deck_id,
      decks!inner(user_id)
    `)
    .eq('id', cardId)
    .single()

  const deck = card?.decks as { user_id: string } | undefined
  if (!card || deck?.user_id !== user.id) {
    throw new Error('Cartea nu a fost găsită sau nu ai permisiunea să o modifici')
  }

  const { data: flashcard, error } = await supabase
    .from('flashcards')
    .update({
      front: validatedFront,
      back: validatedBack,
      mnemonic: validatedMnemonic,
    })
    .eq('id', cardId)
    .select()
    .single()

  if (error) throw error

  revalidatePath(`/decks/${card.deck_id}`)
  revalidatePath('/decks')

  return flashcard
}

export async function deleteFlashcard(cardId: string) {
  const supabase = await createClient()

  // Mock user for development (auth disabled)
  const userId = '00000000-0000-0000-0000-000000000001'
  const user = { id: userId }

  // Get card and verify ownership through deck
  const { data: card } = await supabase
    .from('flashcards')
    .select(`
      deck_id,
      decks!inner(user_id)
    `)
    .eq('id', cardId)
    .single()

  const deck = card?.decks as { user_id: string } | undefined
  if (!card || deck?.user_id !== user.id) {
    throw new Error('Cartea nu a fost găsită sau nu ai permisiunea să o ștergi')
  }

  const { error } = await supabase
    .from('flashcards')
    .delete()
    .eq('id', cardId)

  if (error) throw error

  revalidatePath(`/decks/${card.deck_id}`)
  revalidatePath('/decks')

  return { success: true }
}

export async function getDueFlashcards(deckId: string): Promise<FlashcardWithStats[]> {
  const supabase = await createClient()

  // Mock user for development (auth disabled)
  const userId = '00000000-0000-0000-0000-000000000001'
  const user = { id: userId }

  // Get all cards with their stats
  const { data: flashcards, error } = await supabase
    .from('flashcards')
    .select(`
      *,
      card_stats(*)
    `)
    .eq('deck_id', deckId)
    .order('created_at', { ascending: true })

  if (error) throw error

  const now = new Date()

  // Filter and sort due cards in JavaScript
  const dueCards = (flashcards || [])
    .map((card) => ({
      ...card,
      stats: card.card_stats?.[0] || undefined,
    }))
    .filter((card) => {
      if (!card.stats) return true // New cards are due
      return new Date(card.stats.next_review) <= now
    })
    .sort((a, b) => {
      const aTime = a.stats?.next_review ? new Date(a.stats.next_review).getTime() : 0
      const bTime = b.stats?.next_review ? new Date(b.stats.next_review).getTime() : 0
      return aTime - bTime
    })

  return dueCards
}

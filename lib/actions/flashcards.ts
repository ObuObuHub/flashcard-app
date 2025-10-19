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

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

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

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

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

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

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

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

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

  if (!card || (card.decks as any)?.user_id !== user.id) {
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

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  // Get card and verify ownership through deck
  const { data: card } = await supabase
    .from('flashcards')
    .select(`
      deck_id,
      decks!inner(user_id)
    `)
    .eq('id', cardId)
    .single()

  if (!card || (card.decks as any)?.user_id !== user.id) {
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

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  // Get all cards with their stats
  const { data: flashcards, error } = await supabase
    .from('flashcards')
    .select(`
      *,
      card_stats!inner(*)
    `)
    .eq('deck_id', deckId)
    .lte('card_stats.next_review', new Date().toISOString())
    .order('card_stats.next_review', { ascending: true })

  if (error) throw error

  return (flashcards || []).map((card) => ({
    ...card,
    stats: card.card_stats?.[0] || undefined,
  }))
}

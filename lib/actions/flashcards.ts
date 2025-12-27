'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { Flashcard, FlashcardWithStats } from '@/types'
import {
  validateFlashcardFront,
  validateFlashcardBack,
  validateFlashcardMnemonic,
} from '@/lib/validation'

// Fisher-Yates shuffle algorithm
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export async function getFlashcards(deckId: string): Promise<FlashcardWithStats[]> {
  const supabase = await createClient()

  const { data: flashcards, error } = await supabase
    .from('flashcards')
    .select('*')
    .eq('deck_id', deckId)
    .order('created_at', { ascending: false })

  if (error) throw error

  return (flashcards || []).map((card) => ({
    ...card,
    tags: card.tags || [],
    extras: card.extras || null,
  })) as FlashcardWithStats[]
}

// Get all flashcards for study mode (shuffled)
export async function getFlashcardsForStudy(deckId: string): Promise<Flashcard[]> {
  const supabase = await createClient()

  const { data: flashcards, error } = await supabase
    .from('flashcards')
    .select('*')
    .eq('deck_id', deckId)

  if (error) throw error

  const cards = (flashcards || []).map((card) => ({
    ...card,
    tags: card.tags || [],
    extras: card.extras || null,
  })) as Flashcard[]

  // Shuffle for random order
  return shuffleArray(cards)
}

export async function getFlashcard(cardId: string): Promise<Flashcard | null> {
  const supabase = await createClient()

  const { data: flashcard, error } = await supabase
    .from('flashcards')
    .select('*')
    .eq('id', cardId)
    .single()

  if (error) return null
  return flashcard
}

export async function createFlashcard(deckId: string, formData: FormData): Promise<Flashcard> {
  const supabase = await createClient()

  // Mock user for development (auth disabled)
  const userId = '00000000-0000-0000-0000-000000000001'

  // Verify deck ownership
  const { data: deck } = await supabase
    .from('decks')
    .select('id')
    .eq('id', deckId)
    .eq('user_id', userId)
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
      tags: [],
      extras: null,
    })
    .select()
    .single()

  if (error) throw error

  revalidatePath(`/decks/${deckId}`)
  revalidatePath('/decks')
  return flashcard
}

export async function updateFlashcard(cardId: string, formData: FormData): Promise<Flashcard> {
  const supabase = await createClient()

  // Mock user for development (auth disabled)
  const userId = '00000000-0000-0000-0000-000000000001'

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
  if (!card || deck?.user_id !== userId) {
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

export async function deleteFlashcard(cardId: string): Promise<{ success: boolean }> {
  const supabase = await createClient()

  // Mock user for development (auth disabled)
  const userId = '00000000-0000-0000-0000-000000000001'

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
  if (!card || deck?.user_id !== userId) {
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

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

  const { data: flashcards, error } = await supabase
    .from('flashcards')
    .select(`
      *,
      card_stats(*),
      card_tags(tags(*))
    `)
    .eq('deck_id', deckId)
    .order('created_at', { ascending: false })

  if (error) throw error

  return (flashcards || []).map((card: Record<string, unknown>) => ({
    ...card,
    stats: (card.card_stats as Record<string, unknown>[] | undefined)?.[0] || undefined,
    tags: ((card.card_tags as Record<string, unknown>[] | undefined) || [])
      .map((ct: Record<string, unknown>) => ct.tags)
      .filter(Boolean),
  })) as FlashcardWithStats[]
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

export async function createFlashcard(deckId: string, formData: FormData) {
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
  const tagIds = formData.get('tagIds') as string | null

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

  // Add tags if provided
  if (tagIds && flashcard) {
    const tagIdArray = JSON.parse(tagIds) as string[]
    if (tagIdArray.length > 0) {
      await supabase
        .from('card_tags')
        .insert(tagIdArray.map((tagId) => ({ card_id: flashcard.id, tag_id: tagId })))
    }
  }

  revalidatePath(`/decks/${deckId}`)
  revalidatePath('/decks')
  return flashcard
}

export async function updateFlashcard(cardId: string, formData: FormData) {
  const supabase = await createClient()

  // Mock user for development (auth disabled)
  const userId = '00000000-0000-0000-0000-000000000001'

  const front = formData.get('front') as string
  const back = formData.get('back') as string
  const mnemonic = formData.get('mnemonic') as string | null
  const tagIds = formData.get('tagIds') as string | null

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

  // Update tags if provided
  if (tagIds) {
    const tagIdArray = JSON.parse(tagIds) as string[]
    // Remove all existing tags
    await supabase.from('card_tags').delete().eq('card_id', cardId)
    // Add new tags
    if (tagIdArray.length > 0) {
      await supabase
        .from('card_tags')
        .insert(tagIdArray.map((tagId) => ({ card_id: cardId, tag_id: tagId })))
    }
  }

  revalidatePath(`/decks/${card.deck_id}`)
  revalidatePath('/decks')

  return flashcard
}

export async function deleteFlashcard(cardId: string) {
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

// Fisher-Yates shuffle algorithm
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export async function getDueFlashcards(deckId: string): Promise<FlashcardWithStats[]> {
  const supabase = await createClient()

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

  // Map cards with their stats
  const allCards = (flashcards || []).map((card) => ({
    ...card,
    stats: card.card_stats?.[0] || undefined,
  }))

  // Separate into unrated (new) and rated cards
  const unratedCards = allCards.filter((card) => !card.stats || card.stats.repetitions === 0)
  const ratedCards = allCards.filter((card) => card.stats && card.stats.repetitions > 0)

  // Filter rated cards to only include due ones, sorted by next_review
  const dueRatedCards = ratedCards
    .filter((card) => new Date(card.stats!.next_review) <= now)
    .sort((a, b) => {
      const aTime = new Date(a.stats!.next_review).getTime()
      const bTime = new Date(b.stats!.next_review).getTime()
      return aTime - bTime
    })

  // Shuffle unrated cards and combine with due rated cards
  const shuffledUnrated = shuffleArray(unratedCards)

  return [...shuffledUnrated, ...dueRatedCards]
}

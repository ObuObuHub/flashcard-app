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
    let tagIdArray: string[] = []
    try {
      const parsed = JSON.parse(tagIds)
      if (Array.isArray(parsed)) {
        tagIdArray = parsed.filter((id): id is string => typeof id === 'string')
      }
    } catch {
      // Invalid JSON, skip tags
    }

    if (tagIdArray.length > 0) {
      const { error: tagError } = await supabase
        .from('card_tags')
        .insert(tagIdArray.map((tagId) => ({ card_id: flashcard.id, tag_id: tagId })))

      if (tagError) {
        console.error('Failed to add tags to flashcard:', tagError)
      }
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
    let tagIdArray: string[] = []
    try {
      const parsed = JSON.parse(tagIds)
      if (Array.isArray(parsed)) {
        tagIdArray = parsed.filter((id): id is string => typeof id === 'string')
      }
    } catch {
      // Invalid JSON, skip tag update
    }

    // Remove all existing tags
    const { error: deleteError } = await supabase.from('card_tags').delete().eq('card_id', cardId)
    if (deleteError) {
      console.error('Failed to remove existing tags:', deleteError)
    }

    // Add new tags
    if (tagIdArray.length > 0) {
      const { error: insertError } = await supabase
        .from('card_tags')
        .insert(tagIdArray.map((tagId) => ({ card_id: cardId, tag_id: tagId })))

      if (insertError) {
        console.error('Failed to add tags to flashcard:', insertError)
      }
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

  // Mock user for development (auth disabled)
  const userId = '00000000-0000-0000-0000-000000000001'

  // Try optimized RPC function first
  const { data: rpcData, error: rpcError } = await supabase.rpc('get_due_flashcards', {
    p_deck_id: deckId,
    p_user_id: userId,
  })

  // If RPC exists and succeeds, use it (much faster!)
  if (!rpcError && rpcData) {
    const cards = rpcData.map((row: Record<string, unknown>) => ({
      id: row.id as string,
      deck_id: row.deck_id as string,
      front: row.front as string,
      back: row.back as string,
      mnemonic: row.mnemonic as string | null,
      image_url: row.image_url as string | null,
      created_at: row.created_at as string,
      stats: row.stats_id
        ? {
            id: row.stats_id as string,
            card_id: row.id as string,
            user_id: userId,
            easiness_factor: Number(row.easiness_factor),
            interval: Number(row.interval),
            repetitions: Number(row.repetitions),
            next_review: row.next_review as string,
            last_reviewed: row.last_reviewed as string | null,
          }
        : undefined,
    })) as FlashcardWithStats[]

    // Shuffle unrated cards for variety
    const unratedCards = cards.filter((card) => !card.stats || card.stats.repetitions === 0)
    const ratedCards = cards.filter((card) => card.stats && card.stats.repetitions > 0)
    return [...shuffleArray(unratedCards), ...ratedCards]
  }

  // Fallback to old approach if RPC doesn't exist
  if (rpcError && rpcError.code !== '42883' && rpcError.code !== 'PGRST202') {
    // Real error, not just missing function
    throw rpcError
  }

  console.warn('Optimized RPC not found, using fallback query. Consider running migration 006.')

  // Get all cards with their stats (N+1 approach - slower)
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

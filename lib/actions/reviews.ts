'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { calculateNextReview } from '@/lib/srs'
import type { SRSRating } from '@/types'

export async function recordReview(cardId: string, rating: SRSRating) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  // Get current card stats and verify ownership
  const { data: stats } = await supabase
    .from('card_stats')
    .select(`
      *,
      flashcards!inner(
        deck_id,
        decks!inner(user_id)
      )
    `)
    .eq('card_id', cardId)
    .eq('user_id', user.id)
    .single()

  if (!stats) throw new Error('Cartea nu a fost găsită')

  // Verify ownership
  const flashcard = stats.flashcards as { deck_id: string; decks: { user_id: string } } | undefined
  if (flashcard?.decks?.user_id !== user.id) {
    throw new Error('Nu ai permisiunea să revizuiești această carte')
  }

  // Calculate next review using SM-2
  const srsResult = calculateNextReview(rating, stats)

  // Use RPC function for atomic transaction (stats update + review insert)
  const { error: rpcError } = await supabase.rpc('record_flashcard_review', {
    p_card_id: cardId,
    p_user_id: user.id,
    p_rating: rating,
    p_easiness_factor: srsResult.easiness_factor,
    p_interval: srsResult.interval,
    p_repetitions: srsResult.repetitions,
    p_next_review: srsResult.next_review.toISOString(),
  })

  // If RPC doesn't exist (migration not run), fall back to sequential operations
  if (rpcError && rpcError.code === '42883') {
    console.warn('RPC function not found, using sequential operations. Consider running migration.')

    // Update card stats
    const { error: statsError } = await supabase
      .from('card_stats')
      .update({
        easiness_factor: srsResult.easiness_factor,
        interval: srsResult.interval,
        repetitions: srsResult.repetitions,
        next_review: srsResult.next_review.toISOString(),
        last_reviewed: new Date().toISOString(),
      })
      .eq('card_id', cardId)
      .eq('user_id', user.id)

    if (statsError) {
      console.error('Failed to update stats:', statsError)
      throw new Error('Eroare la actualizarea statisticilor')
    }

    // Record the review - if this fails, stats are already updated (inconsistency)
    // But at least we tried and logged the error
    const { error: reviewError } = await supabase
      .from('reviews')
      .insert({
        card_id: cardId,
        user_id: user.id,
        rating,
      })

    if (reviewError) {
      console.error('Failed to insert review after updating stats:', reviewError)
      throw new Error('Eroare la salvarea revizuirii')
    }
  } else if (rpcError) {
    // Other RPC errors
    console.error('RPC error:', rpcError)
    throw new Error('Eroare la salvarea revizuirii')
  }

  // Get deck_id for revalidation
  const deckId = flashcard.deck_id

  if (deckId) {
    revalidatePath(`/study/${deckId}`)
    revalidatePath(`/decks/${deckId}`)
    revalidatePath('/decks')
  }

  return srsResult
}

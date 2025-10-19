'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { calculateNextReview } from '@/lib/srs'
import type { SRSRating } from '@/types'

export async function recordReview(cardId: string, rating: SRSRating) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  // Get current card stats
  const { data: stats } = await supabase
    .from('card_stats')
    .select('*')
    .eq('card_id', cardId)
    .eq('user_id', user.id)
    .single()

  if (!stats) throw new Error('Card stats not found')

  // Calculate next review using SM-2
  const srsResult = calculateNextReview(rating, stats)

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

  if (statsError) throw statsError

  // Record the review
  const { error: reviewError } = await supabase
    .from('reviews')
    .insert({
      card_id: cardId,
      user_id: user.id,
      rating,
    })

  if (reviewError) throw reviewError

  // Get deck_id for revalidation
  const { data: card } = await supabase
    .from('flashcards')
    .select('deck_id')
    .eq('id', cardId)
    .single()

  if (card) {
    revalidatePath(`/study/${card.deck_id}`)
    revalidatePath(`/decks/${card.deck_id}`)
    revalidatePath('/decks')
  }

  return srsResult
}

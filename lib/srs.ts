import { SRSRating, CardStats } from '@/types'

/**
 * SM-2 Algorithm for Spaced Repetition System
 * Based on SuperMemo 2 algorithm
 * https://www.supermemo.com/en/archives1990-2015/english/ol/sm2
 */

interface SRSResult {
  easiness_factor: number
  interval: number
  repetitions: number
  next_review: Date
}

/**
 * Calculate next review date based on SM-2 algorithm
 * @param rating - User rating (1=Again, 2=Hard, 3=Good, 4=Easy)
 * @param currentStats - Current card statistics
 * @returns Updated card statistics
 */
export function calculateNextReview(
  rating: SRSRating,
  currentStats?: CardStats
): SRSResult {
  // Default values for new cards
  let easinessFactor = currentStats?.easiness_factor ?? 2.5
  let interval = currentStats?.interval ?? 0
  let repetitions = currentStats?.repetitions ?? 0

  // Update easiness factor based on rating
  // Formula: EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
  const quality = rating
  easinessFactor = Math.max(
    1.3,
    easinessFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  )

  // Calculate new interval
  if (rating < 3) {
    // Again or Hard - restart
    repetitions = 0
    interval = 1
  } else {
    repetitions += 1

    if (repetitions === 1) {
      interval = 1
    } else if (repetitions === 2) {
      interval = 6
    } else {
      interval = Math.round(interval * easinessFactor)
    }
  }

  // Apply rating-specific adjustments
  if (rating === 2) {
    // Hard - increase interval slightly but less than Good
    interval = Math.ceil(interval * 1.2)
  } else if (rating === 4) {
    // Easy - bonus multiplier
    interval = Math.ceil(interval * 1.3)
  }

  // Calculate next review date
  const nextReview = new Date()
  nextReview.setDate(nextReview.getDate() + interval)
  nextReview.setHours(4, 0, 0, 0) // Set to 4 AM next day

  return {
    easiness_factor: easinessFactor,
    interval,
    repetitions,
    next_review: nextReview,
  }
}

/**
 * Check if a card is due for review
 * @param nextReview - Next scheduled review date
 * @returns true if card is due
 */
export function isDue(nextReview: string | Date): boolean {
  const now = new Date()
  const reviewDate = new Date(nextReview)
  return now >= reviewDate
}

/**
 * Get preview intervals for all rating options
 * Used to show users what interval each choice will give
 * @param currentStats - Current card statistics (optional for new cards)
 * @returns Object with interval in days for each rating
 */
export function getPreviewIntervals(currentStats?: CardStats): {
  again: number
  hard: number
  good: number
  easy: number
} {
  return {
    again: calculateNextReview(1, currentStats).interval,
    hard: calculateNextReview(2, currentStats).interval,
    good: calculateNextReview(3, currentStats).interval,
    easy: calculateNextReview(4, currentStats).interval,
  }
}


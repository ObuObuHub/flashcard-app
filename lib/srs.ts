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
 * Get card mastery level based on statistics
 * @param stats - Card statistics
 * @returns Mastery level (0-5)
 */
export function getMasteryLevel(stats?: CardStats): number {
  if (!stats) return 0

  const { repetitions, easiness_factor } = stats

  if (repetitions === 0) return 0
  if (repetitions < 3) return 1
  if (repetitions < 5) return 2
  if (easiness_factor < 2.0) return 2
  if (repetitions < 8) return 3
  if (easiness_factor < 2.5) return 3
  if (repetitions < 12) return 4
  return 5
}

/**
 * Get Romanian label for mastery level
 */
export function getMasteryLabel(level: number): string {
  const labels = [
    'Nou',
    'Începător',
    'Familiar',
    'Bine',
    'Foarte bine',
    'Stăpânit',
  ]
  return labels[level] || 'Necunoscut'
}

/**
 * Get color class for mastery level
 */
export function getMasteryColor(level: number): string {
  const colors = [
    'text-gray-400',
    'text-red-500',
    'text-orange-500',
    'text-yellow-500',
    'text-green-500',
    'text-blue-500',
  ]
  return colors[level] || 'text-gray-400'
}

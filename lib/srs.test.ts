import { describe, it, expect } from 'vitest'
import { calculateNextReview } from './srs'
import type { CardStats } from '@/types'

describe('SM-2 Algorithm - calculateNextReview', () => {
  describe('New cards (no previous stats)', () => {
    it('Again (1): should set interval to 1 day', () => {
      const result = calculateNextReview(1)
      expect(result.interval).toBe(1)
      expect(result.repetitions).toBe(0)
    })

    it('Hard (2): should set interval to 2 days (1 * 1.2 rounded up)', () => {
      const result = calculateNextReview(2)
      expect(result.interval).toBe(2)
      expect(result.repetitions).toBe(0)
    })

    it('Good (3): should set interval to 1 day (first repetition)', () => {
      const result = calculateNextReview(3)
      expect(result.interval).toBe(1)
      expect(result.repetitions).toBe(1)
    })

    it('Easy (4): should set interval to 2 days (1 * 1.3 rounded up)', () => {
      const result = calculateNextReview(4)
      expect(result.interval).toBe(2)
      expect(result.repetitions).toBe(1)
    })
  })

  describe('Second review (repetitions = 1)', () => {
    const statsAfterFirstGood: CardStats = {
      id: 'test',
      card_id: 'test',
      user_id: 'test',
      easiness_factor: 2.5,
      interval: 1,
      repetitions: 1,
      next_review: new Date().toISOString(),
      last_reviewed: null,
    }

    it('Good (3): should set interval to 6 days (second repetition)', () => {
      const result = calculateNextReview(3, statsAfterFirstGood)
      expect(result.interval).toBe(6)
      expect(result.repetitions).toBe(2)
    })

    it('Easy (4): should set interval to 8 days (6 * 1.3 rounded)', () => {
      const result = calculateNextReview(4, statsAfterFirstGood)
      expect(result.interval).toBe(8)
      expect(result.repetitions).toBe(2)
    })

    it('Again (1): should reset to interval 1, repetitions 0', () => {
      const result = calculateNextReview(1, statsAfterFirstGood)
      expect(result.interval).toBe(1)
      expect(result.repetitions).toBe(0)
    })
  })

  describe('Third+ review (repetitions >= 2)', () => {
    const statsAfterSecondGood: CardStats = {
      id: 'test',
      card_id: 'test',
      user_id: 'test',
      easiness_factor: 2.5,
      interval: 6,
      repetitions: 2,
      next_review: new Date().toISOString(),
      last_reviewed: null,
    }

    it('Good (3): should multiply interval by easiness factor', () => {
      const result = calculateNextReview(3, statsAfterSecondGood)
      // EF adjusts: 2.5 + (0.1 - 2*(0.08+0.04)) = 2.36, then 6 * 2.36 = 14.16 -> 14
      expect(result.interval).toBe(14)
      expect(result.repetitions).toBe(3)
    })

    it('Easy (4): should multiply interval by EF then by 1.3', () => {
      const result = calculateNextReview(4, statsAfterSecondGood)
      // 6 * 2.5 = 15, then 15 * 1.3 = 19.5 -> 20
      expect(result.interval).toBe(20)
      expect(result.repetitions).toBe(3)
    })

    it('Again (1): should reset completely', () => {
      const result = calculateNextReview(1, statsAfterSecondGood)
      expect(result.interval).toBe(1)
      expect(result.repetitions).toBe(0)
    })
  })

  describe('Easiness factor calculations', () => {
    it('should decrease EF for Again (1)', () => {
      const result = calculateNextReview(1)
      // Default EF is 2.5, formula for q=1: 2.5 + (0.1 - (5-1) * (0.08 + (5-1) * 0.02))
      // = 2.5 + (0.1 - 4 * (0.08 + 0.08)) = 2.5 + (0.1 - 0.64) = 2.5 - 0.54 = 1.96
      expect(result.easiness_factor).toBeCloseTo(1.96, 2)
    })

    it('should decrease EF for Hard (2)', () => {
      const result = calculateNextReview(2)
      // q=2: 2.5 + (0.1 - 3 * (0.08 + 3*0.02)) = 2.5 + (0.1 - 0.42) = 2.18
      expect(result.easiness_factor).toBeCloseTo(2.18, 2)
    })

    it('should keep EF roughly same for Good (3)', () => {
      const result = calculateNextReview(3)
      // q=3: 2.5 + (0.1 - 2 * (0.08 + 0.04)) = 2.5 + (0.1 - 0.24) = 2.36
      expect(result.easiness_factor).toBeCloseTo(2.36, 2)
    })

    it('should increase EF for Easy (4)', () => {
      const result = calculateNextReview(4)
      // q=4: 2.5 + (0.1 - 1 * (0.08 + 0.02)) = 2.5 + 0 = 2.5
      expect(result.easiness_factor).toBeCloseTo(2.5, 2)
    })

    it('should not go below 1.3 minimum', () => {
      // Create stats with low EF
      const lowEFStats: CardStats = {
        id: 'test',
        card_id: 'test',
        user_id: 'test',
        easiness_factor: 1.4,
        interval: 1,
        repetitions: 0,
        next_review: new Date().toISOString(),
        last_reviewed: null,
      }
      const result = calculateNextReview(1, lowEFStats)
      expect(result.easiness_factor).toBeGreaterThanOrEqual(1.3)
    })
  })

  describe('next_review date', () => {
    it('should set next_review to interval days from now', () => {
      const result = calculateNextReview(3)
      const now = new Date()
      const expectedDate = new Date()
      expectedDate.setDate(now.getDate() + result.interval)

      expect(result.next_review.getDate()).toBe(expectedDate.getDate())
    })
  })
})

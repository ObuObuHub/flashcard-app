/**
 * Validation constants and helpers for input sanitization
 */

export const VALIDATION_LIMITS = {
  DECK_NAME_MAX: 200,
  DECK_DESCRIPTION_MAX: 1000,
  FLASHCARD_FRONT_MAX: 50000, // 50k chars for exam questions
  FLASHCARD_BACK_MAX: 100000, // 100k chars for detailed answers
  FLASHCARD_MNEMONIC_MAX: 5000,
} as const

export class ValidationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ValidationError'
  }
}

export function validateDeckName(name: string): string {
  const trimmed = name.trim()

  if (!trimmed) {
    throw new ValidationError('Numele setului este obligatoriu')
  }

  if (trimmed.length > VALIDATION_LIMITS.DECK_NAME_MAX) {
    throw new ValidationError(
      `Numele setului este prea lung (max ${VALIDATION_LIMITS.DECK_NAME_MAX} caractere)`
    )
  }

  return trimmed
}

export function validateDeckDescription(description: string | null): string | null {
  if (!description) return null

  const trimmed = description.trim()

  if (trimmed.length > VALIDATION_LIMITS.DECK_DESCRIPTION_MAX) {
    throw new ValidationError(
      `Descrierea este prea lungă (max ${VALIDATION_LIMITS.DECK_DESCRIPTION_MAX} caractere)`
    )
  }

  return trimmed || null
}

export function validateFlashcardFront(front: string): string {
  const trimmed = front.trim()

  if (!trimmed) {
    throw new ValidationError('Întrebarea (față) este obligatorie')
  }

  if (trimmed.length > VALIDATION_LIMITS.FLASHCARD_FRONT_MAX) {
    throw new ValidationError(
      `Întrebarea este prea lungă (max ${VALIDATION_LIMITS.FLASHCARD_FRONT_MAX.toLocaleString()} caractere)`
    )
  }

  return trimmed
}

export function validateFlashcardBack(back: string): string {
  const trimmed = back.trim()

  if (!trimmed) {
    throw new ValidationError('Răspunsul (spate) este obligatoriu')
  }

  if (trimmed.length > VALIDATION_LIMITS.FLASHCARD_BACK_MAX) {
    throw new ValidationError(
      `Răspunsul este prea lung (max ${VALIDATION_LIMITS.FLASHCARD_BACK_MAX.toLocaleString()} caractere)`
    )
  }

  return trimmed
}

export function validateFlashcardMnemonic(mnemonic: string | null): string | null {
  if (!mnemonic) return null

  const trimmed = mnemonic.trim()

  if (trimmed.length > VALIDATION_LIMITS.FLASHCARD_MNEMONIC_MAX) {
    throw new ValidationError(
      `Mnemonicul este prea lung (max ${VALIDATION_LIMITS.FLASHCARD_MNEMONIC_MAX.toLocaleString()} caractere)`
    )
  }

  return trimmed || null
}

import { describe, it, expect } from 'vitest'
import {
  validateDeckName,
  validateDeckDescription,
  validateFlashcardFront,
  validateFlashcardBack,
  validateFlashcardMnemonic,
  validateTagName,
  ValidationError,
  VALIDATION_LIMITS,
} from './validation'

describe('validateDeckName', () => {
  it('should return trimmed valid name', () => {
    expect(validateDeckName('  My Deck  ')).toBe('My Deck')
  })

  it('should throw ValidationError for empty string', () => {
    expect(() => validateDeckName('')).toThrow(ValidationError)
    expect(() => validateDeckName('')).toThrow('Numele setului este obligatoriu')
  })

  it('should throw ValidationError for whitespace-only string', () => {
    expect(() => validateDeckName('   ')).toThrow(ValidationError)
  })

  it('should throw ValidationError if name exceeds max length', () => {
    const longName = 'a'.repeat(VALIDATION_LIMITS.DECK_NAME_MAX + 1)
    expect(() => validateDeckName(longName)).toThrow(ValidationError)
    expect(() => validateDeckName(longName)).toThrow('prea lung')
  })

  it('should accept name at exactly max length', () => {
    const maxName = 'a'.repeat(VALIDATION_LIMITS.DECK_NAME_MAX)
    expect(validateDeckName(maxName)).toBe(maxName)
  })
})

describe('validateDeckDescription', () => {
  it('should return trimmed valid description', () => {
    expect(validateDeckDescription('  My description  ')).toBe('My description')
  })

  it('should return null for null input', () => {
    expect(validateDeckDescription(null)).toBeNull()
  })

  it('should return null for empty string', () => {
    expect(validateDeckDescription('')).toBeNull()
  })

  it('should return null for whitespace-only string', () => {
    expect(validateDeckDescription('   ')).toBeNull()
  })

  it('should throw ValidationError if description exceeds max length', () => {
    const longDesc = 'a'.repeat(VALIDATION_LIMITS.DECK_DESCRIPTION_MAX + 1)
    expect(() => validateDeckDescription(longDesc)).toThrow(ValidationError)
    expect(() => validateDeckDescription(longDesc)).toThrow('prea lungă')
  })

  it('should accept description at exactly max length', () => {
    const maxDesc = 'a'.repeat(VALIDATION_LIMITS.DECK_DESCRIPTION_MAX)
    expect(validateDeckDescription(maxDesc)).toBe(maxDesc)
  })
})

describe('validateFlashcardFront', () => {
  it('should return trimmed valid front', () => {
    expect(validateFlashcardFront('  Question?  ')).toBe('Question?')
  })

  it('should throw ValidationError for empty string', () => {
    expect(() => validateFlashcardFront('')).toThrow(ValidationError)
    expect(() => validateFlashcardFront('')).toThrow('Întrebarea (față) este obligatorie')
  })

  it('should throw ValidationError for whitespace-only string', () => {
    expect(() => validateFlashcardFront('   ')).toThrow(ValidationError)
  })

  it('should throw ValidationError if front exceeds max length', () => {
    const longFront = 'a'.repeat(VALIDATION_LIMITS.FLASHCARD_FRONT_MAX + 1)
    expect(() => validateFlashcardFront(longFront)).toThrow(ValidationError)
    expect(() => validateFlashcardFront(longFront)).toThrow('prea lungă')
  })

  it('should accept front at exactly max length', () => {
    const maxFront = 'a'.repeat(VALIDATION_LIMITS.FLASHCARD_FRONT_MAX)
    expect(validateFlashcardFront(maxFront)).toBe(maxFront)
  })
})

describe('validateFlashcardBack', () => {
  it('should return trimmed valid back', () => {
    expect(validateFlashcardBack('  Answer!  ')).toBe('Answer!')
  })

  it('should throw ValidationError for empty string', () => {
    expect(() => validateFlashcardBack('')).toThrow(ValidationError)
    expect(() => validateFlashcardBack('')).toThrow('Răspunsul (spate) este obligatoriu')
  })

  it('should throw ValidationError for whitespace-only string', () => {
    expect(() => validateFlashcardBack('   ')).toThrow(ValidationError)
  })

  it('should throw ValidationError if back exceeds max length', () => {
    const longBack = 'a'.repeat(VALIDATION_LIMITS.FLASHCARD_BACK_MAX + 1)
    expect(() => validateFlashcardBack(longBack)).toThrow(ValidationError)
    expect(() => validateFlashcardBack(longBack)).toThrow('prea lung')
  })

  it('should accept back at exactly max length', () => {
    const maxBack = 'a'.repeat(VALIDATION_LIMITS.FLASHCARD_BACK_MAX)
    expect(validateFlashcardBack(maxBack)).toBe(maxBack)
  })
})

describe('validateFlashcardMnemonic', () => {
  it('should return trimmed valid mnemonic', () => {
    expect(validateFlashcardMnemonic('  Memory trick  ')).toBe('Memory trick')
  })

  it('should return null for null input', () => {
    expect(validateFlashcardMnemonic(null)).toBeNull()
  })

  it('should return null for empty string', () => {
    expect(validateFlashcardMnemonic('')).toBeNull()
  })

  it('should return null for whitespace-only string', () => {
    expect(validateFlashcardMnemonic('   ')).toBeNull()
  })

  it('should throw ValidationError if mnemonic exceeds max length', () => {
    const longMnemonic = 'a'.repeat(VALIDATION_LIMITS.FLASHCARD_MNEMONIC_MAX + 1)
    expect(() => validateFlashcardMnemonic(longMnemonic)).toThrow(ValidationError)
    expect(() => validateFlashcardMnemonic(longMnemonic)).toThrow('prea lung')
  })

  it('should accept mnemonic at exactly max length', () => {
    const maxMnemonic = 'a'.repeat(VALIDATION_LIMITS.FLASHCARD_MNEMONIC_MAX)
    expect(validateFlashcardMnemonic(maxMnemonic)).toBe(maxMnemonic)
  })
})

describe('validateTagName', () => {
  it('should return trimmed valid tag name', () => {
    expect(validateTagName('  My Tag  ')).toBe('My Tag')
  })

  it('should throw ValidationError for empty string', () => {
    expect(() => validateTagName('')).toThrow(ValidationError)
    expect(() => validateTagName('')).toThrow('Numele subiectului este obligatoriu')
  })

  it('should throw ValidationError for whitespace-only string', () => {
    expect(() => validateTagName('   ')).toThrow(ValidationError)
  })

  it('should throw ValidationError if tag name exceeds max length', () => {
    const longTag = 'a'.repeat(VALIDATION_LIMITS.TAG_NAME_MAX + 1)
    expect(() => validateTagName(longTag)).toThrow(ValidationError)
    expect(() => validateTagName(longTag)).toThrow('prea lung')
  })

  it('should accept tag name at exactly max length', () => {
    const maxTag = 'a'.repeat(VALIDATION_LIMITS.TAG_NAME_MAX)
    expect(validateTagName(maxTag)).toBe(maxTag)
  })
})

describe('ValidationError', () => {
  it('should be an instance of Error', () => {
    const error = new ValidationError('test')
    expect(error).toBeInstanceOf(Error)
    expect(error).toBeInstanceOf(ValidationError)
  })

  it('should have the correct name', () => {
    const error = new ValidationError('test')
    expect(error.name).toBe('ValidationError')
  })

  it('should have the correct message', () => {
    const error = new ValidationError('Custom message')
    expect(error.message).toBe('Custom message')
  })
})

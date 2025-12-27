export interface Deck {
  id: string
  user_id: string
  name: string
  description: string | null
  created_at: string
}

export interface FlashcardExtras {
  keyConcepts: string[]
  mnemonic: string
}

export interface Flashcard {
  id: string
  deck_id: string
  front: string
  back: string
  tags: string[]
  extras: FlashcardExtras | null
  created_at: string
}

export interface Tag {
  id: string
  name: string
  user_id: string
}

// Backwards compatibility - FlashcardWithStats is now just Flashcard
export type FlashcardWithStats = Flashcard & {
  stats?: unknown
  mnemonic?: string
}

export interface DeckWithProgress extends Deck {
  total_cards: number
  cards_due: number
  mastered_cards: number
}

// Romanian UI translations
export const translations = {
  // Decks
  decks: {
    title: 'Seturile mele',
    newDeck: 'Set nou',
    deckName: 'Nume set',
    deckDescription: 'Descriere',
    create: 'Creează',
    edit: 'Editează',
    delete: 'Șterge',
    cards: 'cărți',
    dueToday: 'de revizuit azi',
  },
  // Flashcards
  cards: {
    title: 'Cărți',
    newCard: 'Carte nouă',
    front: 'Față',
    back: 'Spate',
    mnemonic: 'Mnemonic (opțional)',
    image: 'Imagine (opțional)',
    create: 'Creează',
    edit: 'Editează',
    delete: 'Șterge',
    flipCard: 'Întoarce cartea',
  },
  // Study
  study: {
    title: 'Studiază',
    startStudying: 'Începe studiul',
    showAnswer: 'Arată răspunsul',
    again: 'Din nou',
    hard: 'Dificil',
    good: 'Bine',
    easy: 'Ușor',
    completed: 'Felicitări! Ai terminat toate cărțile pentru azi!',
    noCards: 'Nu ai cărți de revizuit azi.',
    cardsLeft: 'cărți rămase',
  },
  // Common
  common: {
    save: 'Salvează',
    cancel: 'Anulează',
    confirm: 'Confirmă',
    loading: 'Se încarcă...',
    error: 'Eroare',
    success: 'Succes!',
  },
}

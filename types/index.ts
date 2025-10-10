export interface Database {
  public: {
    Tables: {
      decks: {
        Row: Deck
        Insert: Omit<Deck, 'id' | 'created_at'>
        Update: Partial<Omit<Deck, 'id' | 'created_at'>>
      }
      flashcards: {
        Row: Flashcard
        Insert: Omit<Flashcard, 'id' | 'created_at'>
        Update: Partial<Omit<Flashcard, 'id' | 'created_at'>>
      }
      card_stats: {
        Row: CardStats
        Insert: Omit<CardStats, 'id'>
        Update: Partial<Omit<CardStats, 'id'>>
      }
      reviews: {
        Row: Review
        Insert: Omit<Review, 'id'>
        Update: Partial<Omit<Review, 'id'>>
      }
      tags: {
        Row: Tag
        Insert: Omit<Tag, 'id'>
        Update: Partial<Omit<Tag, 'id'>>
      }
      card_tags: {
        Row: CardTag
        Insert: CardTag
        Update: Partial<CardTag>
      }
    }
  }
}

export interface Deck {
  id: string
  user_id: string
  name: string
  description: string | null
  created_at: string
}

export interface Flashcard {
  id: string
  deck_id: string
  front: string
  back: string
  mnemonic: string | null
  image_url: string | null
  created_at: string
}

export interface CardStats {
  id: string
  card_id: string
  user_id: string
  easiness_factor: number
  interval: number
  repetitions: number
  next_review: string
  last_reviewed: string | null
}

export interface Review {
  id: string
  card_id: string
  user_id: string
  rating: 1 | 2 | 3 | 4 // 1=Again, 2=Hard, 3=Good, 4=Easy
  reviewed_at: string
}

export interface Tag {
  id: string
  name: string
  user_id: string
}

export interface CardTag {
  card_id: string
  tag_id: string
}

// View types with joined data
export interface FlashcardWithStats extends Flashcard {
  stats?: CardStats
  tags?: Tag[]
}

export interface DeckWithProgress extends Deck {
  total_cards: number
  cards_due: number
  mastered_cards: number
}

// SRS Rating type
export type SRSRating = 1 | 2 | 3 | 4

// Romanian UI translations
export const translations = {
  // Navigation
  nav: {
    decks: 'Seturi',
    study: 'Studiază',
    stats: 'Statistici',
    logout: 'Deconectare',
  },
  // Auth
  auth: {
    login: 'Autentificare',
    signup: 'Înregistrare',
    email: 'Email',
    password: 'Parolă',
    loginButton: 'Intră în cont',
    signupButton: 'Creează cont',
    noAccount: 'Nu ai cont?',
    hasAccount: 'Ai deja cont?',
  },
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
  // Stats
  stats: {
    title: 'Statistici',
    cardsReviewed: 'Cărți revizuite',
    accuracy: 'Acuratețe',
    streak: 'Zile consecutive',
    totalDecks: 'Total seturi',
    totalCards: 'Total cărți',
    masteredCards: 'Cărți stăpânite',
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

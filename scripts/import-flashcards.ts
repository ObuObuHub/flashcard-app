#!/usr/bin/env ts-node

/**
 * Bulk import flashcards from primariat exam materials
 * Usage: npx tsx scripts/import-flashcards.ts
 */

import { createClient } from '@supabase/supabase-js'
import { primatiatDecks } from './primariat-data'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing environment variables')
  console.error('Required: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

const DEV_USER_ID = '00000000-0000-0000-0000-000000000001'

interface FlashcardData {
  front: string
  back: string
  mnemonic?: string
}

async function createDeck(name: string, description: string): Promise<string> {
  const { data, error } = await supabase
    .from('decks')
    .insert({
      user_id: DEV_USER_ID,
      name,
      description,
    })
    .select('id')
    .single()

  if (error) throw error
  console.log(`✅ Created deck: ${name}`)
  return data.id
}

async function createFlashcards(deckId: string, flashcards: FlashcardData[]) {
  const cardsToInsert = flashcards.map((card) => ({
    deck_id: deckId,
    front: card.front,
    back: card.back,
    mnemonic: card.mnemonic || null,
  }))

  const { error } = await supabase.from('flashcards').insert(cardsToInsert)

  if (error) throw error
  console.log(`   ✅ Imported ${flashcards.length} flashcards`)
}

async function main() {
  console.log('🚀 Starting flashcard import from Subiecte Primariat...\n')

  try {
    let totalDecks = 0
    let totalCards = 0

    for (const deckData of primatiatDecks) {
      const deckId = await createDeck(deckData.name, deckData.description)
      await createFlashcards(deckId, deckData.flashcards)

      totalDecks++
      totalCards += deckData.flashcards.length
      console.log('')
    }

    console.log('✨ Import completed successfully!')
    console.log(`📚 Total decks created: ${totalDecks}`)
    console.log(`🃏 Total flashcards imported: ${totalCards}\n`)
  } catch (error) {
    console.error('❌ Import failed:', error)
    process.exit(1)
  }
}

main()

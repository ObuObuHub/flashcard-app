#!/usr/bin/env tsx

/**
 * Generic flashcard importer from JSON file
 * Usage: npx tsx scripts/import-flashcards.ts <json-file>
 *
 * JSON format:
 * [
 *   {
 *     "name": "Deck Name",
 *     "description": "Deck description",
 *     "flashcards": [
 *       { "front": "Question", "back": "Answer", "mnemonic": "Optional hint" }
 *     ]
 *   }
 * ]
 */

import { config } from 'dotenv'
config({ path: '.env.local' })

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing environment variables')
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

interface DeckData {
  name: string
  description: string
  flashcards: FlashcardData[]
}

async function getOrCreateDeck(name: string, description: string): Promise<string> {
  // Check if deck with same name already exists
  const { data: existing } = await supabase
    .from('decks')
    .select('id')
    .eq('user_id', DEV_USER_ID)
    .eq('name', name)
    .maybeSingle()

  if (existing) {
    // Update description and return existing deck
    await supabase.from('decks').update({ description }).eq('id', existing.id)
    console.log(`  (updating existing deck)`)
    return existing.id
  }

  // Create new deck
  const { data, error } = await supabase
    .from('decks')
    .insert({ user_id: DEV_USER_ID, name, description })
    .select('id')
    .single()

  if (error) throw error
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
}

async function main() {
  const jsonPath = process.argv[2]

  if (!jsonPath) {
    console.error('Usage: npx tsx scripts/import-flashcards.ts <json-file>')
    process.exit(1)
  }

  const decks: DeckData[] = JSON.parse(readFileSync(jsonPath, 'utf-8'))

  let totalDecks = 0
  let totalCards = 0

  for (const deckData of decks) {
    const deckId = await getOrCreateDeck(deckData.name, deckData.description)
    await createFlashcards(deckId, deckData.flashcards)
    console.log(`+ ${deckData.name} (${deckData.flashcards.length} cards)`)
    totalDecks++
    totalCards += deckData.flashcards.length
  }

  console.log(`\nImported ${totalDecks} decks, ${totalCards} cards`)
}

main().catch((err) => {
  console.error('Import failed:', err)
  process.exit(1)
})

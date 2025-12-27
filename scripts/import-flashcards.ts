#!/usr/bin/env tsx

/**
 * Import flashcards from JSON file into Supabase
 *
 * Usage: npx tsx scripts/import-flashcards.ts <path-to-json>
 * Example: npx tsx scripts/import-flashcards.ts /Users/andreichiper/Documents/Subiecte\ primariat/flashcards.json
 *
 * JSON format (from generate-flashcards.js):
 * [
 *   {
 *     "front": "Ce este eritropoeza?",
 *     "back": "Procesul de...",
 *     "tags": ["BIOCHIMIE", "Scris", "Enzime"],
 *     "extras": {
 *       "keyConcepts": ["concept1", "concept2"],
 *       "mnemonic": "EPO = E Postasul Oxigenului"
 *     }
 *   }
 * ]
 */

import { config } from 'dotenv'
config({ path: '.env.local' })

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { resolve } from 'path'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing environment variables')
  console.error('Required: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or NEXT_PUBLIC_SUPABASE_ANON_KEY)')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)
const DEV_USER_ID = '00000000-0000-0000-0000-000000000001'

interface FlashcardInput {
  front: string
  back: string
  tags: string[]
  extras: {
    keyConcepts: string[]
    mnemonic: string
  } | null
}

async function main(): Promise<void> {
  const jsonPath = process.argv[2] || '/Users/andreichiper/Documents/Subiecte primariat/flashcards.json'

  console.log('Reading flashcards from:', jsonPath)

  const absolutePath = resolve(jsonPath)
  const content = readFileSync(absolutePath, 'utf-8')
  const flashcards: FlashcardInput[] = JSON.parse(content)

  console.log(`Found ${flashcards.length} flashcards`)

  // Group flashcards by subject (first tag)
  const bySubject = new Map<string, FlashcardInput[]>()

  for (const fc of flashcards) {
    const subject = fc.tags[0] || 'UNCATEGORIZED'
    if (!bySubject.has(subject)) {
      bySubject.set(subject, [])
    }
    bySubject.get(subject)!.push(fc)
  }

  console.log('\nFlashcards per subject:')
  for (const [subject, cards] of bySubject) {
    console.log(`  ${subject}: ${cards.length}`)
  }

  // Delete existing decks for this user (clean slate)
  console.log('\nDeleting existing decks...')
  const { error: deleteError } = await supabase
    .from('decks')
    .delete()
    .eq('user_id', DEV_USER_ID)

  if (deleteError) {
    console.error('Error deleting existing decks:', deleteError)
  }

  // Create decks for each subject
  const deckMap = new Map<string, string>()

  console.log('\nCreating decks...')
  for (const subject of bySubject.keys()) {
    const { data: deck, error } = await supabase
      .from('decks')
      .insert({
        user_id: DEV_USER_ID,
        name: subject,
        description: `Flashcards pentru ${subject}`,
      })
      .select()
      .single()

    if (error) {
      console.error(`Error creating deck ${subject}:`, error)
      continue
    }

    deckMap.set(subject, deck.id)
    console.log(`  Created deck: ${subject} (${deck.id})`)
  }

  // Insert flashcards in batches
  console.log('\nImporting flashcards...')
  let imported = 0
  let errors = 0

  for (const [subject, cards] of bySubject) {
    const deckId = deckMap.get(subject)
    if (!deckId) {
      console.error(`No deck ID for subject: ${subject}`)
      errors += cards.length
      continue
    }

    // Insert in batches of 50
    const batchSize = 50
    for (let i = 0; i < cards.length; i += batchSize) {
      const batch = cards.slice(i, i + batchSize)

      const flashcardsToInsert = batch.map(fc => ({
        deck_id: deckId,
        front: fc.front,
        back: fc.back,
        tags: fc.tags,
        extras: fc.extras,
      }))

      const { error } = await supabase
        .from('flashcards')
        .insert(flashcardsToInsert)

      if (error) {
        console.error(`Error inserting batch for ${subject}:`, error)
        errors += batch.length
      } else {
        imported += batch.length
      }
    }
    console.log(`  ${subject}: ${cards.length} imported`)
  }

  console.log('\n=== Import Complete ===')
  console.log(`Total imported: ${imported}`)
  console.log(`Errors: ${errors}`)
  console.log(`Decks created: ${deckMap.size}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Import failed:', error)
    process.exit(1)
  })

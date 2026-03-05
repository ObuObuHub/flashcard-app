/**
 * Import subiecte primariat into Supabase
 * CommonJS version - run with: node scripts/import-subiecte-run.cjs
 */

const { createClient } = require('@supabase/supabase-js')
const { readFileSync } = require('fs')
const { resolve } = require('path')

// Load env
require('dotenv').config({ path: resolve(__dirname, '../.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)
const DEV_USER_ID = '00000000-0000-0000-0000-000000000001'

async function main() {
  const jsonPath = resolve(__dirname, '../data/subiecte-primariat.json')
  console.log('Reading subiecte from:', jsonPath)

  const content = readFileSync(jsonPath, 'utf-8')
  const data = JSON.parse(content)

  // Stats
  let totalSubjects = 0
  let totalCards = 0
  for (const spec of data) {
    for (const subj of spec.subjects) {
      totalSubjects++
      totalCards += subj.flashcards.length
    }
  }
  console.log(`Found ${data.length} specialities, ${totalSubjects} subjects, ${totalCards} flashcards\n`)

  // First, delete existing subiecte decks (those with [SPECIALITY] prefix)
  console.log('Checking for existing subiecte decks...')
  const { data: existingDecks } = await supabase
    .from('decks')
    .select('id, name')
    .eq('user_id', DEV_USER_ID)

  if (existingDecks) {
    const subiecteDecks = existingDecks.filter(d =>
      d.name.startsWith('[BIOCHIMIE]') ||
      d.name.startsWith('[HEMATOLOGIE]') ||
      d.name.startsWith('[BACTERIOLOGIE]') ||
      d.name.startsWith('[VIRUSOLOGIE]') ||
      d.name.startsWith('[PARAZITOLOGIE]')
    )

    if (subiecteDecks.length > 0) {
      console.log(`Deleting ${subiecteDecks.length} existing subiecte decks...`)
      for (const deck of subiecteDecks) {
        await supabase.from('decks').delete().eq('id', deck.id)
      }
      console.log('Deleted existing decks.')
    } else {
      console.log('No existing subiecte decks found.')
    }
  }

  // Create decks and import
  let imported = 0
  let errors = 0
  let decksCreated = 0

  for (const speciality of data) {
    console.log(`\n=== ${speciality.name} ===`)

    for (const subject of speciality.subjects) {
      if (subject.flashcards.length === 0) continue

      const deckName = `[${speciality.name}] ${subject.name}`

      // Create deck
      const { data: deck, error: deckError } = await supabase
        .from('decks')
        .insert({
          user_id: DEV_USER_ID,
          name: deckName,
          description: `${speciality.name} — ${subject.flashcards.length} flashcards`,
        })
        .select()
        .single()

      if (deckError) {
        console.error(`  Error creating deck "${deckName}":`, deckError.message)
        errors += subject.flashcards.length
        continue
      }

      decksCreated++

      // Insert flashcards in batches of 50
      const batchSize = 50
      for (let i = 0; i < subject.flashcards.length; i += batchSize) {
        const batch = subject.flashcards.slice(i, i + batchSize)

        const flashcardsToInsert = batch.map(fc => ({
          deck_id: deck.id,
          front: fc.front,
          back: fc.back,
          tags: [speciality.name, subject.name],
          extras: null,
        }))

        const { error } = await supabase
          .from('flashcards')
          .insert(flashcardsToInsert)

        if (error) {
          console.error(`  Error inserting batch for "${subject.name}":`, error.message)
          errors += batch.length
        } else {
          imported += batch.length
        }
      }

      console.log(`  ✓ ${subject.name}: ${subject.flashcards.length} cards`)
    }
  }

  console.log('\n=== Import Complete ===')
  console.log(`Decks created: ${decksCreated}`)
  console.log(`Flashcards imported: ${imported}`)
  console.log(`Errors: ${errors}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Import failed:', error)
    process.exit(1)
  })

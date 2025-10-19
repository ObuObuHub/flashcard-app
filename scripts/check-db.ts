#!/usr/bin/env ts-node

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function checkDatabase() {
  console.log('Checking database...\n')

  // Check decks
  const { data: decks, error: decksError } = await supabase
    .from('decks')
    .select('id, name, user_id')
    .limit(10)

  if (decksError) {
    console.error('Error fetching decks:', decksError)
  } else {
    console.log(`Found ${decks?.length || 0} decks:`)
    decks?.forEach((deck) => {
      console.log(`  - ${deck.name} (id: ${deck.id}, user: ${deck.user_id})`)
    })
  }

  // Check flashcards
  const { data: cards, error: cardsError } = await supabase
    .from('flashcards')
    .select('id, deck_id, front')
    .limit(5)

  if (cardsError) {
    console.error('\nError fetching flashcards:', cardsError)
  } else {
    console.log(`\nFound ${cards?.length || 0} flashcards (showing first 5):`)
    cards?.forEach((card) => {
      console.log(`  - "${card.front.substring(0, 50)}..." (deck: ${card.deck_id})`)
    })
  }
}

checkDatabase()

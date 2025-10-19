#!/usr/bin/env ts-node

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function testGetDeck() {
  console.log('Testing getDeck function...\n')

  // Get a deck ID from database
  const { data: decks } = await supabase
    .from('decks')
    .select('id, name, user_id')
    .limit(1)

  if (!decks || decks.length === 0) {
    console.log('No decks found in database!')
    return
  }

  const testDeckId = decks[0].id
  const userId = '00000000-0000-0000-0000-000000000001'

  console.log(`Testing with deck ID: ${testDeckId}`)
  console.log(`Expected user ID: ${userId}`)
  console.log(`Actual deck user ID: ${decks[0].user_id}`)
  console.log('')

  // Try the same query that getDeck uses
  const { data: deck, error } = await supabase
    .from('decks')
    .select('*')
    .eq('id', testDeckId)
    .eq('user_id', userId)
    .single()

  if (error) {
    console.error('ERROR:', error)
  } else if (deck) {
    console.log('✅ SUCCESS: Found deck:', deck.name)
  } else {
    console.log('❌ FAILED: Deck not found (returned null)')
  }

  // Try without user_id filter
  console.log('\n--- Testing WITHOUT user_id filter ---')
  const { data: deck2, error: error2 } = await supabase
    .from('decks')
    .select('*')
    .eq('id', testDeckId)
    .single()

  if (error2) {
    console.error('ERROR:', error2)
  } else if (deck2) {
    console.log('✅ Found deck without user filter:', deck2.name)
  }
}

testGetDeck()

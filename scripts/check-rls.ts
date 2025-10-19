#!/usr/bin/env ts-node

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Test with SERVICE key (bypasses RLS)
const serviceClient = createClient(supabaseUrl, supabaseServiceKey)

// Test with ANON key (RLS enforced)
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const anonClient = createClient(supabaseUrl, anonKey)

async function checkRLS() {
  const deckId = 'da67e3fb-e6e1-4fa3-86d6-2549f1333364'
  const userId = '00000000-0000-0000-0000-000000000001'

  console.log('Testing RLS...\n')

  // Test with service key
  console.log('1. Using SERVICE key (bypasses RLS):')
  const { data: deck1, error: error1 } = await serviceClient
    .from('decks')
    .select('*')
    .eq('id', deckId)
    .eq('user_id', userId)
    .single()

  if (error1) {
    console.error('   ERROR:', error1.message)
  } else {
    console.log('   ✅ Found:', deck1?.name)
  }

  // Test with anon key
  console.log('\n2. Using ANON key (RLS enforced):')
  const { data: deck2, error: error2 } = await anonClient
    .from('decks')
    .select('*')
    .eq('id', deckId)
    .eq('user_id', userId)
    .single()

  if (error2) {
    console.error('   ❌ ERROR:', error2.message)
    console.log('   Code:', error2.code)
  } else {
    console.log('   ✅ Found:', deck2?.name)
  }

  console.log('\n** RLS IS BLOCKING ANON ACCESS! **')
}

checkRLS()

#!/usr/bin/env tsx

import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import { resolve } from 'path'
import { writeFileSync } from 'fs'

// Load environment variables
dotenv.config({ path: resolve(process.cwd(), '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function backupDatabase() {
  console.log('🔒 BACKUP BAZĂ DE DATE')
  console.log('━'.repeat(60))

  try {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const backupFile = `backup-${timestamp}.json`

    // Fetch all data
    console.log('\n📥 Extragere date...')

    const [
      { data: decks },
      { data: flashcards },
      { data: cardStats },
      { data: reviews },
      { data: tags },
      { data: cardTags }
    ] = await Promise.all([
      supabase.from('decks').select('*'),
      supabase.from('flashcards').select('*'),
      supabase.from('card_stats').select('*'),
      supabase.from('reviews').select('*'),
      supabase.from('tags').select('*'),
      supabase.from('card_tags').select('*')
    ])

    const backup = {
      timestamp: new Date().toISOString(),
      version: '1.0',
      database: {
        decks: decks || [],
        flashcards: flashcards || [],
        card_stats: cardStats || [],
        reviews: reviews || [],
        tags: tags || [],
        card_tags: cardTags || []
      },
      stats: {
        decks_count: decks?.length || 0,
        flashcards_count: flashcards?.length || 0,
        card_stats_count: cardStats?.length || 0,
        reviews_count: reviews?.length || 0,
        tags_count: tags?.length || 0,
        card_tags_count: cardTags?.length || 0
      }
    }

    // Write to file
    const backupPath = resolve(process.cwd(), 'backups', backupFile)
    writeFileSync(backupPath, JSON.stringify(backup, null, 2))

    console.log('\n✅ Backup creat cu succes!')
    console.log(`📁 Fișier: ${backupPath}`)
    console.log('\n📊 Statistici:')
    console.log(`   Seturi: ${backup.stats.decks_count}`)
    console.log(`   Flashcard-uri: ${backup.stats.flashcards_count}`)
    console.log(`   Statistici cărți: ${backup.stats.card_stats_count}`)
    console.log(`   Revizuiri: ${backup.stats.reviews_count}`)
    console.log(`   Tag-uri: ${backup.stats.tags_count}`)
    console.log(`   Relații carte-tag: ${backup.stats.card_tags_count}`)

    console.log('\n━'.repeat(60))
    console.log('✨ Backup completat!')

  } catch (error) {
    console.error('\n❌ Eroare la creare backup:', error)
    process.exit(1)
  }
}

backupDatabase()

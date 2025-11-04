/**
 * Seed script to populate initial topics based on your medical exam folder structure
 * Run with: npx tsx scripts/seed-topics.ts
 */

import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import * as path from 'path'

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

// Mock user ID (matching the dev user from your setup)
const userId = '00000000-0000-0000-0000-000000000001'

// Topics based on your folder structure in ~/Documents/subiecte primariat
const topics = [
  // Biochemistry (Biochimie)
  { name: 'Biochimie Practic', description: 'Subiecte practice biochimie' },
  { name: 'Biochimie Scris', description: 'Subiecte scrise biochimie' },

  // Hematology (Hemato)
  { name: 'Hemato Practic', description: 'Subiecte practice hematologie' },
  { name: 'Hemato Scris', description: 'Subiecte scrise hematologie' },

  // Other subjects
  { name: 'Bacteriologie', description: 'Subiecte bacteriologie' },
  { name: 'Virusologie', description: 'Subiecte virusologie' },
  { name: 'Parazitologie', description: 'Subiecte parazitologie' },
  { name: 'Chimie Practic', description: 'Subiecte practice chimie' },
]

async function seedTopics() {
  console.log('🌱 Starting topic seeding...')
  console.log(`   Using user ID: ${userId}`)

  // Check if topics already exist
  const { data: existingTags, error: fetchError } = await supabase
    .from('tags')
    .select('name')
    .eq('user_id', userId)

  if (fetchError) {
    console.error('❌ Error fetching existing tags:', fetchError)
    process.exit(1)
  }

  const existingNames = new Set((existingTags || []).map((tag) => tag.name))

  // Filter out topics that already exist
  const topicsToCreate = topics.filter((topic) => !existingNames.has(topic.name))

  if (topicsToCreate.length === 0) {
    console.log('ℹ️  All topics already exist. Nothing to seed.')
    console.log(`   Existing topics: ${Array.from(existingNames).join(', ')}`)
    return
  }

  console.log(`   Creating ${topicsToCreate.length} new topics...`)

  // Insert topics
  const { data: createdTags, error: insertError } = await supabase
    .from('tags')
    .insert(
      topicsToCreate.map((topic) => ({
        user_id: userId,
        name: topic.name,
      }))
    )
    .select()

  if (insertError) {
    console.error('❌ Error creating topics:', insertError)
    process.exit(1)
  }

  console.log('✅ Topics created successfully!')
  console.log('\n📋 Created topics:')
  topicsToCreate.forEach((topic, index) => {
    console.log(`   ${index + 1}. ${topic.name}`)
  })

  if (existingNames.size > 0) {
    console.log('\n📋 Already existed:')
    Array.from(existingNames).forEach((name, index) => {
      console.log(`   ${index + 1}. ${name}`)
    })
  }

  console.log('\n✨ Seeding complete!')
  console.log('   You can now:')
  console.log('   1. Visit http://localhost:3000/topics to view your topics')
  console.log('   2. Create flashcards and tag them with these subjects')
  console.log('   3. Use the filter sidebar to study specific topics')
}

seedTopics().catch((error) => {
  console.error('❌ Seeding failed:', error)
  process.exit(1)
})

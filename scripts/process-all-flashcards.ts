#!/usr/bin/env tsx

/**
 * Process all flashcards with improved quality:
 * 1. Clean front (topic title only)
 * 2. Keep back as-is
 * 3. Extract key concepts from answer
 * 4. Generate appropriate mnemonic type
 */

import { readFileSync, writeFileSync } from 'fs'

interface FlashcardInput {
  front: string
  back: string
  tags: string[]
  extras?: {
    keyConcepts: string[]
    mnemonic: string
  } | null
}

interface FlashcardOutput {
  front: string
  back: string
  tags: string[]
  extras: {
    keyConcepts: string[]
    mnemonic: string
  }
}

// Clean the front text to be just the topic title
function cleanFront(front: string): string {
  let clean = front
    // Remove question patterns
    .replace(/^Ce este\s+/i, '')
    .replace(/^Care sunt\s+/i, '')
    .replace(/^Care este\s+/i, '')
    .replace(/^Cum se\s+/i, '')
    .replace(/^Cand\s+/i, '')
    .replace(/^De ce\s+/i, '')
    // Remove trailing question mark and colon
    .replace(/\?$/, '')
    .replace(/:$/, '')
    // Remove leading numbers like "4." or "13."
    .replace(/^\d+\.\s*/, '')
    // Remove leading colons
    .replace(/^:\s*/, '')
    // Trim whitespace
    .trim()

  // Capitalize first letter
  if (clean.length > 0) {
    clean = clean.charAt(0).toUpperCase() + clean.slice(1)
  }

  return clean
}

// Extract key concepts from answer text
function extractKeyConcepts(back: string): string[] {
  const concepts: string[] = []
  const lines = back.split('\n').filter(l => l.trim())

  // Look for specific patterns
  for (const line of lines) {
    const trimmed = line.replace(/^[•\-\d.]+\s*/, '').trim()

    // Extract number-based facts
    const numberMatch = trimmed.match(/(\d+[\d.,]*\s*(%|mg|g|ml|moli?|AA|ore|zile|ani)?)/i)
    if (numberMatch && trimmed.length < 150) {
      concepts.push(trimmed.substring(0, 120))
      if (concepts.length >= 4) break
      continue
    }

    // Extract equations/formulas
    if (trimmed.includes('→') || trimmed.includes('=') || trimmed.includes('+')) {
      if (trimmed.length < 150) {
        concepts.push(trimmed.substring(0, 120))
        if (concepts.length >= 4) break
        continue
      }
    }

    // Extract enzyme mentions
    if (/aza\b/i.test(trimmed) && trimmed.length < 100) {
      concepts.push(trimmed.substring(0, 120))
      if (concepts.length >= 4) break
      continue
    }

    // Extract location mentions
    if (/(ficat|rinichi|mitocondrie|citosol|plasma|sange)/i.test(trimmed) && trimmed.length < 100) {
      concepts.push(trimmed.substring(0, 120))
      if (concepts.length >= 4) break
      continue
    }
  }

  // If we didn't find enough, take first substantive lines
  if (concepts.length < 2) {
    for (const line of lines) {
      const trimmed = line.replace(/^[•\-\d.]+\s*/, '').trim()
      if (trimmed.length > 20 && trimmed.length < 150 && !concepts.includes(trimmed.substring(0, 120))) {
        concepts.push(trimmed.substring(0, 120))
        if (concepts.length >= 3) break
      }
    }
  }

  return concepts.slice(0, 4)
}

// Generate a placeholder mnemonic (to be enhanced later)
function generateMnemonic(front: string, back: string, existingMnemonic?: string): string {
  // Keep good existing mnemonics
  if (existingMnemonic &&
      existingMnemonic.length > 30 &&
      !existingMnemonic.startsWith('Acronim:') &&
      !existingMnemonic.startsWith('Reține:') &&
      !existingMnemonic.includes('imaginează-le ca etape')) {
    // Check if it seems relevant
    const frontWords = front.toLowerCase().split(/\s+/)
    const mnemonicLower = existingMnemonic.toLowerCase()
    const isRelevant = frontWords.some(word =>
      word.length > 3 && mnemonicLower.includes(word)
    )
    if (isRelevant) {
      return existingMnemonic
    }
  }

  // Generate based on content type
  const backLower = back.toLowerCase()

  // For lists, suggest acronym
  const listItems = back.split('\n').filter(l => l.trim().startsWith('•')).length
  if (listItems >= 3 && listItems <= 7) {
    return `[ACRONIM NECESAR] ${listItems} elemente de memorat - creează acronim cu explicații`
  }

  // For processes/steps
  if (/\d+\.\s/.test(back) || backLower.includes('etap') || backLower.includes('pas')) {
    return `[ACROSTIC NECESAR] Proces cu pași secvențiali - creează acrostic`
  }

  // For numbers
  if (/\d+[\d.,]*\s*(mg|g|ml|%|moli)/i.test(back)) {
    return `[ANCORĂ NUMERICĂ NECESARĂ] Valori de memorat - asociază cu ore, vârste, prețuri familiare`
  }

  // For enzymes
  if (/[a-z]+aza\b/i.test(back)) {
    return `[KEYWORD METHOD] Numele enzimei - găsește cuvânt similar și vizualizează`
  }

  return `[MNEMONIC NECESAR] Aplică framework AVOIR pentru acest topic`
}

async function main(): Promise<void> {
  const inputPath = '/Users/andreichiper/Documents/Subiecte primariat/flashcards.json'
  const outputPath = '/Users/andreichiper/Documents/Subiecte primariat/flashcards-v2-base.json'

  console.log('Reading flashcards from:', inputPath)
  const content = readFileSync(inputPath, 'utf-8')
  const flashcards: FlashcardInput[] = JSON.parse(content)

  console.log(`Processing ${flashcards.length} flashcards...`)

  const results: FlashcardOutput[] = flashcards.map((fc, i) => {
    if (i % 100 === 0) {
      console.log(`  Processing card ${i + 1}/${flashcards.length}...`)
    }

    const cleanedFront = cleanFront(fc.front)
    const keyConcepts = extractKeyConcepts(fc.back)
    const mnemonic = generateMnemonic(cleanedFront, fc.back, fc.extras?.mnemonic)

    return {
      front: cleanedFront,
      back: fc.back,
      tags: fc.tags,
      extras: {
        keyConcepts,
        mnemonic
      }
    }
  })

  // Save results
  writeFileSync(outputPath, JSON.stringify(results, null, 2), 'utf-8')

  console.log('\n=== COMPLETE ===')
  console.log(`Total processed: ${results.length}`)
  console.log(`Output saved to: ${outputPath}`)

  // Count cards needing mnemonic improvement
  const needsMnemonic = results.filter(r => r.extras.mnemonic.startsWith('[')).length
  console.log(`Cards needing mnemonic enhancement: ${needsMnemonic}`)

  // Show sample
  console.log('\n=== SAMPLE (first 5) ===')
  results.slice(0, 5).forEach((fc, i) => {
    console.log(`\n--- Card ${i + 1} ---`)
    console.log(`Front: ${fc.front}`)
    console.log(`Key Concepts: ${fc.extras.keyConcepts.join(' | ')}`)
    console.log(`Mnemonic: ${fc.extras.mnemonic.substring(0, 100)}...`)
  })
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Failed:', error)
    process.exit(1)
  })

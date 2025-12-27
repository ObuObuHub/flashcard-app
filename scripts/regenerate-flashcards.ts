#!/usr/bin/env tsx

/**
 * Regenerate flashcards with better quality:
 * 1. Clean front (topic title only, no "Ce este X?")
 * 2. Proper key concepts (distilled facts, not truncated answer)
 * 3. Mnemonics with explanations
 *
 * Usage: ANTHROPIC_API_KEY=xxx npx tsx scripts/regenerate-flashcards.ts
 */

import Anthropic from '@anthropic-ai/sdk'
import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY
if (!ANTHROPIC_API_KEY) {
  console.error('Missing ANTHROPIC_API_KEY environment variable')
  process.exit(1)
}

const anthropic = new Anthropic({ apiKey: ANTHROPIC_API_KEY })

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
    // Remove "Ce este X?" pattern
    .replace(/^Ce este\s+/i, '')
    .replace(/^Care sunt\s+/i, '')
    .replace(/^Care este\s+/i, '')
    .replace(/^Cum se\s+/i, '')
    // Remove trailing question mark
    .replace(/\?$/, '')
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

// Batch process flashcards with Claude
async function processFlashcardBatch(
  flashcards: FlashcardInput[],
  batchIndex: number
): Promise<FlashcardOutput[]> {
  const prompt = `Ești un expert medical specializat în crearea de materiale de memorare pentru studenți la medicină.

## TASK
Pentru fiecare flashcard de mai jos, generează:
1. **keyConcepts**: 2-4 fapte specifice DISTILATE (NU text copiat din răspuns!)
2. **mnemonic**: un mnemonic MEMORABIL cu explicație completă

## REGULI PENTRU KEY CONCEPTS
- EXTRAGE fapte specifice: numere exacte, enzime, locații anatomice, valori de referință
- NU copia fraze din răspuns - DISTILEAZĂ informația
- Exemple bune: "Pas helix: 3,6 AA/tur", "RF1 recunoaște UAA și UAG", "Keratină = 100% α-helix"
- Exemple RELE: "Procesul de elongare se oprește când..." (copie din răspuns)

## REGULI PENTRU MNEMONICS (Framework AVOIR)
Creează mnemonice folosind principiile AVOIR:
- **A**bsurd: Fă-l ciudat, neobișnuit, imposibil
- **V**ivid: Detalii senzoriale (culoare, sunet, textură)
- **O**rganizat: Structură clară (acronim, poveste, palace)
- **I**nteractiv: Elementele interacționează între ele
- **R**elevant: Conectează la cunoștințe existente

### Tehnici acceptate:
1. **Acronim CU EXPLICAȚIE**: "STOP = S-a Terminat Operația Proteică (pentru codoni UAA, UAG, UGA)"
2. **Asociere vizuală**: "Imaginează-ți α-helix ca un RESORT de arc - se rasucește la dreapta ca un tirbușon"
3. **Poveste/Link**: "Keratina e DIVA care vrea 100% atenție (100% α-helix în păr și unghii)"
4. **Number anchors**: "3,6 AA/tur = ca ceasul la 3:36 dimineața când helixul se trezește"
5. **Keyword method**: "Ribonucleaza sună ca RIBO-NUCLEU-AZA = taie (aza) nucleul ARN"

### OBLIGATORIU pentru fiecare mnemonic:
- EXPLICĂ fiecare literă/cuvânt din acronim
- sau DESCRIE imaginea mentală
- sau SPUNE povestea completă
- Limba: română SAU engleză (ce funcționează mai bine)

## OUTPUT FORMAT
JSON array cu exact ${flashcards.length} obiecte, în ordinea primită:
[
  {
    "keyConcepts": ["Fapt specific 1", "Fapt specific 2", "..."],
    "mnemonic": "Mnemonic complet cu explicație..."
  }
]

## FLASHCARDS DE PROCESAT:
${flashcards.map((fc, i) => `
[${i + 1}] Titlu: ${cleanFront(fc.front)}
Răspuns: ${fc.back.substring(0, 1500)}${fc.back.length > 1500 ? '...' : ''}
Tags: ${fc.tags.join(', ')}
`).join('\n---\n')}

Returnează DOAR JSON array valid, fără markdown code blocks sau alte texte.`

  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 8000,
      messages: [{ role: 'user', content: prompt }]
    })

    const content = response.content[0]
    if (content.type !== 'text') {
      throw new Error('Unexpected response type')
    }

    // Extract JSON from response
    let jsonText = content.text.trim()
    // Handle potential markdown code blocks
    if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '')
    }

    const extras = JSON.parse(jsonText) as Array<{
      keyConcepts: string[]
      mnemonic: string
    }>

    // Combine with cleaned fronts
    return flashcards.map((fc, i) => ({
      front: cleanFront(fc.front),
      back: fc.back,
      tags: fc.tags,
      extras: extras[i] || { keyConcepts: [], mnemonic: '' }
    }))
  } catch (error) {
    console.error(`Error processing batch ${batchIndex}:`, error)
    // Return with empty extras on error
    return flashcards.map(fc => ({
      front: cleanFront(fc.front),
      back: fc.back,
      tags: fc.tags,
      extras: { keyConcepts: [], mnemonic: 'Error generating mnemonic' }
    }))
  }
}

async function main(): Promise<void> {
  const inputPath = process.argv[2] || '/Users/andreichiper/Documents/Subiecte primariat/flashcards.json'
  const outputPath = '/Users/andreichiper/Documents/Subiecte primariat/flashcards-v2.json'
  const checkpointPath = '/Users/andreichiper/Documents/Subiecte primariat/flashcards-v2-checkpoint.json'

  console.log('Reading flashcards from:', inputPath)
  const absolutePath = resolve(inputPath)
  const content = readFileSync(absolutePath, 'utf-8')
  const flashcards: FlashcardInput[] = JSON.parse(content)

  console.log(`Found ${flashcards.length} flashcards to process`)

  // Check for existing checkpoint to resume
  let results: FlashcardOutput[] = []
  let startIndex = 0

  try {
    const checkpointContent = readFileSync(checkpointPath, 'utf-8')
    results = JSON.parse(checkpointContent)
    startIndex = results.length
    if (startIndex > 0) {
      console.log(`Resuming from checkpoint: ${startIndex} cards already processed`)
    }
  } catch {
    console.log('No checkpoint found, starting fresh')
  }

  // Process in batches
  const BATCH_SIZE = 10
  const totalBatches = Math.ceil(flashcards.length / BATCH_SIZE)

  for (let i = startIndex; i < flashcards.length; i += BATCH_SIZE) {
    const batchIndex = Math.floor(i / BATCH_SIZE) + 1
    const batch = flashcards.slice(i, i + BATCH_SIZE)

    console.log(`Processing batch ${batchIndex}/${totalBatches} (${batch.length} cards)...`)

    const processed = await processFlashcardBatch(batch, batchIndex)
    results.push(...processed)

    // Save checkpoint after each batch
    writeFileSync(checkpointPath, JSON.stringify(results, null, 2), 'utf-8')
    console.log(`  ✓ Saved checkpoint (${results.length}/${flashcards.length})`)

    // Rate limiting - wait 1.5 seconds between batches to avoid rate limits
    if (i + BATCH_SIZE < flashcards.length) {
      await new Promise(resolve => setTimeout(resolve, 1500))
    }
  }

  // Save final results
  writeFileSync(outputPath, JSON.stringify(results, null, 2), 'utf-8')

  console.log('\n=== COMPLETE ===')
  console.log(`Total processed: ${results.length}`)
  console.log(`Output saved to: ${outputPath}`)

  // Show sample
  console.log('\n=== SAMPLE (first 3) ===')
  results.slice(0, 3).forEach((fc, i) => {
    console.log(`\n--- Card ${i + 1} ---`)
    console.log(`Front: ${fc.front}`)
    console.log(`Key Concepts: ${fc.extras.keyConcepts.join(' | ')}`)
    console.log(`Mnemonic: ${fc.extras.mnemonic}`)
  })
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Failed:', error)
    process.exit(1)
  })

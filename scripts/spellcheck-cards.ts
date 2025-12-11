/**
 * Romanian Spellcheck Script for Flashcard Data
 *
 * This script scans all flashcard JSON files and identifies potential spelling issues:
 * 1. Missing diacritics (common issue)
 * 2. Common Romanian typos
 * 3. Inconsistent medical terminology
 *
 * Usage: npx tsx scripts/spellcheck-cards.ts
 */

import * as fs from 'fs'
import * as path from 'path'

interface Flashcard {
  front: string
  back: string
  mnemonic?: string
}

interface DeckData {
  name: string
  description?: string
  flashcards: Flashcard[]
}

interface SpellIssue {
  file: string
  cardIndex: number
  field: 'front' | 'back' | 'mnemonic' | 'name' | 'description'
  word: string
  suggestion: string
  context: string
  type: 'missing_diacritic' | 'typo' | 'inconsistent'
}

// Common words that should have diacritics
const diacriticPatterns: [RegExp, string][] = [
  // ă patterns
  [/\bca\b/gi, 'că'],
  [/\baceasta\b/gi, 'aceasta/această'],
  [/\bpana\b/gi, 'până'],
  [/\bbacteriofag\b/gi, 'bacteriofag'], // OK as is
  [/\badevar\b/gi, 'adevăr'],
  [/\bfara\b/gi, 'fără'],
  [/\binvatare\b/gi, 'învățare'],
  [/\bmasura\b/gi, 'măsură'],

  // â patterns
  [/\bcand\b/gi, 'când'],
  [/\bsunt\b/gi, 'sunt'], // OK
  [/\bin\b/gi, 'în'],

  // î patterns
  [/\bincepe\b/gi, 'începe'],
  [/\bintai\b/gi, 'întâi'],
  [/\bintrebare\b/gi, 'întrebare'],

  // ș patterns
  [/\bsi\b/gi, 'și'],
  [/\bstii\b/gi, 'știi'],
  [/\bstiinta\b/gi, 'știință'],
  [/\bstiut\b/gi, 'știut'],

  // ț patterns
  [/\binfectie\b/gi, 'infecție'],
  [/\breplicatie\b/gi, 'replicație'],
  [/\btransmitere\b/gi, 'transmitere'], // OK
  [/\bfunctie\b/gi, 'funcție'],
  [/\bprotectie\b/gi, 'protecție'],
  [/\breactie\b/gi, 'reacție'],
  [/\bselectie\b/gi, 'selecție'],
  [/\breproductie\b/gi, 'reproducție'],
]

// Words commonly misspelled without proper accents in medical context
const medicalDiacritics: [string, string][] = [
  ['celula', 'celulă'],
  ['molecula', 'moleculă'],
  ['membrana', 'membrană'],
  ['bacteria', 'bacterie'],
  ['capsula', 'capsulă'],
  ['anvelopa', 'anvelopă'],
  ['sinteza', 'sinteză'],
  ['enzima', 'enzimă'],
  ['proteina', 'proteină'],
  ['structura', 'structură'],
  ['temperatura', 'temperatură'],
  ['acuta', 'acută'],
  ['cronica', 'cronică'],
  ['infectioasa', 'infecțioasă'],
  ['specifica', 'specifică'],
  ['caracteristica', 'caracteristică'],
  ['terapeutica', 'terapeutică'],
]

// Common typos in Romanian
const commonTypos: [RegExp, string][] = [
  [/\bii\b/gi, 'îi'],
  [/\baceasi\b/gi, 'aceeași'],
  [/\bcateva\b/gi, 'câteva'],
  [/\bimpreuna\b/gi, 'împreună'],
  [/\bsingura\b/gi, 'singură'],
  [/\bexista\b/gi, 'există'],
  [/\bpoate\b/gi, 'poate'], // OK
  [/\btrei\b/gi, 'trei'], // OK
  [/\bdoi\b/gi, 'doi'], // OK
  [/\bcinci\b/gi, 'cinci'], // OK
]

// Medical terms that are allowed (don't flag these)
const allowedMedicalTerms = new Set([
  'virion', 'virusuri', 'virusologie', 'capsidă', 'nucleocapsidă',
  'icosaedrică', 'helicoidală', 'helicală', 'picornaviridae',
  'orthomyxoviridae', 'paramyxoviridae', 'rhabdoviridae',
  'hemaglutinină', 'neuraminidază', 'hepadnaviridae',
  'retroviridae', 'flaviviridae', 'adenoviridae',
  'herpesviridae', 'poxviridae', 'reoviridae',
  'parvoviridae', 'antigenic', 'antigenică', 'antigen',
  'anticorp', 'anticorpi', 'imunoglobuline', 'imunogen',
  'genom', 'genomul', 'adn', 'arn', 'polimerază',
  'replicare', 'transcripție', 'translație', 'ribosom',
  'hepatită', 'hepatite', 'hepatocelular', 'hepatocit',
  'hiv', 'vhb', 'vhc', 'vha', 'vhd', 'vhe',
  'elisa', 'pcr', 'riba', 'western', 'blot',
  'seroconversie', 'serologice', 'serologic',
  'epidemie', 'pandemie', 'endemic',
  'viremic', 'viremie', 'bacteriemie',
  'patogen', 'patogenitate', 'virulență',
  'citopatogen', 'citopatic', 'citoliză',
  'tropism', 'receptor', 'ligand',
  'carcinom', 'oncogen', 'transformare',
  'mnemonic', 'mnemonice',
])

function checkWord(word: string, file: string, cardIndex: number, field: string, context: string): SpellIssue | null {
  const lowerWord = word.toLowerCase()

  // Skip if it's an allowed medical term
  if (allowedMedicalTerms.has(lowerWord)) {
    return null
  }

  // Skip very short words, numbers, or words with special chars
  if (word.length < 3 || /^\d+$/.test(word) || /[\/\-\(\)\[\]]/.test(word)) {
    return null
  }

  // Check for missing diacritics
  for (const [pattern, suggestion] of diacriticPatterns) {
    if (pattern.test(word)) {
      // Only flag if the suggestion is different
      if (word.toLowerCase() !== suggestion.toLowerCase()) {
        return {
          file,
          cardIndex,
          field: field as SpellIssue['field'],
          word,
          suggestion,
          context,
          type: 'missing_diacritic',
        }
      }
    }
  }

  // Check medical diacritics
  for (const [wrong, correct] of medicalDiacritics) {
    if (lowerWord === wrong) {
      return {
        file,
        cardIndex,
        field: field as SpellIssue['field'],
        word,
        suggestion: correct,
        context,
        type: 'missing_diacritic',
      }
    }
  }

  return null
}

function extractWords(text: string): string[] {
  // Split by whitespace and punctuation, keeping only word characters
  return text.split(/[\s\n\r,.:;!?()\[\]{}\"\'\/\\]+/).filter(w => w.length > 0)
}

function getContext(text: string, word: string, contextLength = 40): string {
  const index = text.toLowerCase().indexOf(word.toLowerCase())
  if (index === -1) return text.slice(0, contextLength * 2)

  const start = Math.max(0, index - contextLength)
  const end = Math.min(text.length, index + word.length + contextLength)
  let context = text.slice(start, end)

  if (start > 0) context = '...' + context
  if (end < text.length) context = context + '...'

  return context
}

function checkText(text: string, file: string, cardIndex: number, field: string): SpellIssue[] {
  const issues: SpellIssue[] = []
  const words = extractWords(text)

  for (const word of words) {
    const issue = checkWord(word, file, cardIndex, field, getContext(text, word))
    if (issue) {
      issues.push(issue)
    }
  }

  return issues
}

function processFile(filePath: string): SpellIssue[] {
  const issues: SpellIssue[] = []
  const fileName = path.basename(filePath)

  try {
    const content = fs.readFileSync(filePath, 'utf-8')
    const rawData = JSON.parse(content)
    // Handle both array format [DeckData] and direct DeckData format
    const data: DeckData = Array.isArray(rawData) ? rawData[0] : rawData

    if (!data || !data.flashcards) {
      return issues
    }

    // Check deck name and description
    if (data.name) {
      issues.push(...checkText(data.name, fileName, -1, 'name'))
    }
    if (data.description) {
      issues.push(...checkText(data.description, fileName, -1, 'description'))
    }

    // Check each flashcard
    data.flashcards.forEach((card, index) => {
      if (card.front) {
        issues.push(...checkText(card.front, fileName, index, 'front'))
      }
      if (card.back) {
        issues.push(...checkText(card.back, fileName, index, 'back'))
      }
      if (card.mnemonic) {
        issues.push(...checkText(card.mnemonic, fileName, index, 'mnemonic'))
      }
    })
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error)
  }

  return issues
}

function main() {
  const dataDir = path.join(__dirname, '..', 'data')
  const outputFile = path.join(__dirname, '..', 'spellcheck-report.json')

  console.log('Romanian Flashcard Spellcheck')
  console.log('============================\n')

  const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json'))
  console.log(`Found ${files.length} data files to check\n`)

  const allIssues: SpellIssue[] = []
  let totalCards = 0

  for (const file of files) {
    const filePath = path.join(dataDir, file)
    const rawContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    // Handle both array format [DeckData] and direct DeckData format
    const content: DeckData = Array.isArray(rawContent) ? rawContent[0] : rawContent
    if (!content || !content.flashcards) {
      console.log(`${file}: skipped (no flashcards found)`)
      continue
    }
    totalCards += content.flashcards.length

    const issues = processFile(filePath)
    allIssues.push(...issues)

    console.log(`${file}: ${content.flashcards.length} cards, ${issues.length} potential issues`)
  }

  // Deduplicate issues by word
  const uniqueIssues = Array.from(
    new Map(allIssues.map(i => [`${i.file}-${i.cardIndex}-${i.field}-${i.word}`, i])).values()
  )

  console.log('\n============================')
  console.log(`Total: ${totalCards} cards checked`)
  console.log(`Found: ${uniqueIssues.length} potential spelling issues\n`)

  // Group by type
  const byType = {
    missing_diacritic: uniqueIssues.filter(i => i.type === 'missing_diacritic'),
    typo: uniqueIssues.filter(i => i.type === 'typo'),
    inconsistent: uniqueIssues.filter(i => i.type === 'inconsistent'),
  }

  if (byType.missing_diacritic.length > 0) {
    console.log('Missing Diacritics:')
    console.log('-------------------')
    byType.missing_diacritic.slice(0, 20).forEach(i => {
      console.log(`  ${i.file} [card ${i.cardIndex}] "${i.word}" → "${i.suggestion}"`)
    })
    if (byType.missing_diacritic.length > 20) {
      console.log(`  ... and ${byType.missing_diacritic.length - 20} more`)
    }
    console.log()
  }

  if (byType.typo.length > 0) {
    console.log('Typos:')
    console.log('------')
    byType.typo.forEach(i => {
      console.log(`  ${i.file} [card ${i.cardIndex}] "${i.word}" → "${i.suggestion}"`)
    })
    console.log()
  }

  // Save full report
  fs.writeFileSync(outputFile, JSON.stringify(uniqueIssues, null, 2))
  console.log(`Full report saved to: spellcheck-report.json`)

  // Generate summary stats
  const wordFrequency = new Map<string, number>()
  for (const issue of uniqueIssues) {
    const key = issue.word.toLowerCase()
    wordFrequency.set(key, (wordFrequency.get(key) || 0) + 1)
  }

  const topWords = Array.from(wordFrequency.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)

  if (topWords.length > 0) {
    console.log('\nMost common issues:')
    topWords.forEach(([word, count]) => {
      console.log(`  "${word}": ${count} occurrences`)
    })
  }
}

main()

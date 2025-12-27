#!/usr/bin/env tsx

/**
 * Improve flashcards quality:
 * 1. Clean front (topic title only, no "Ce este X?")
 * 2. Better key concepts (extract specific facts)
 * 3. Better mnemonics (with explanations)
 *
 * Usage: npx tsx scripts/improve-flashcards.ts
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
    // Remove "Ce este X?" pattern
    .replace(/^Ce este\s+/i, '')
    .replace(/^Care sunt\s+/i, '')
    .replace(/^Care este\s+/i, '')
    .replace(/^Cum se\s+(face|realizeaza|realizează)?\s*/i, '')
    .replace(/^Care sunt datele de\s+/i, '')
    // Remove trailing question mark and colon
    .replace(/[\?:]$/, '')
    // Remove leading numbers like "4." or "13."
    .replace(/^\d+\.\s*/, '')
    // Remove [Subject] prefix patterns
    .replace(/^\[[^\]]+\]\s*/, '')
    // Remove "Info suplimentară:" etc
    .replace(/Info suplimentară:?\s*/i, '')
    .replace(/Conținut:?\s*/i, '')
    .replace(/elementele pentru\s*/i, '')
    // Trim whitespace
    .trim()

  // Capitalize first letter
  if (clean.length > 0) {
    clean = clean.charAt(0).toUpperCase() + clean.slice(1)
  }

  return clean
}

// Extract specific facts from back text for key concepts
function extractKeyConcepts(back: string, front: string): string[] {
  const concepts: string[] = []
  const lines = back.split('\n').filter(l => l.trim())

  // Look for specific patterns

  // 1. Numeric values (normal ranges, percentages, counts)
  const numericPatterns = back.match(/\d+[\-–]\d+\s*[a-zA-Z%\/μµ]+/g)
  if (numericPatterns) {
    numericPatterns.slice(0, 2).forEach(v => {
      const context = findContextForValue(back, v)
      if (context && !concepts.some(c => c.includes(v))) {
        concepts.push(context)
      }
    })
  }

  // 2. Enzyme names (ending in -aza, -ază)
  const enzymeMatch = back.match(/[A-Za-zăâîșț]+-?(?:aza|ază|kinaza|kinază|transferaza|transferază|sintaza|sintază|polimeraz[aă]|oxidaz[aă]|reductaz[aă]|hidrolaz[aă])/gi)
  if (enzymeMatch) {
    const uniqueEnzymes = [...new Set(enzymeMatch)].slice(0, 3)
    if (uniqueEnzymes.length > 0) {
      concepts.push(`Enzime: ${uniqueEnzymes.join(', ')}`)
    }
  }

  // 3. Location patterns (la nivelul, în, localizare)
  const locationMatch = back.match(/(?:la nivelul|localizat[aă]? (?:la|în)|în (?:ficat|rinichi|măduvă|splină|plămâni|intestin|stomac|pancreas|creier|inimă|mușchi))[^.;]*/gi)
  if (locationMatch && locationMatch.length > 0) {
    concepts.push(locationMatch[0].trim())
  }

  // 4. Codons (UAA, UAG, UGA, AUG, etc.)
  const codonMatch = back.match(/[AUGC]{3}/g)
  if (codonMatch && codonMatch.length >= 2) {
    const unique = [...new Set(codonMatch)]
    if (unique.length >= 2) {
      concepts.push(`Codoni: ${unique.join(', ')}`)
    }
  }

  // 5. Roman numeral factors (Factor I, II, VII, etc.)
  const factorMatch = back.match(/[Ff]actor(?:ul|ii)?\s+[IVX]+/g)
  if (factorMatch && factorMatch.length > 0) {
    concepts.push(`Factori: ${[...new Set(factorMatch)].join(', ')}`)
  }

  // 6. Key definitions (first meaningful sentence if short)
  if (concepts.length < 2) {
    const firstBullet = lines.find(l => l.trim().startsWith('•') || l.trim().startsWith('-'))
    if (firstBullet) {
      let text = firstBullet.replace(/^[•\-]\s*/, '').trim()
      if (text.length > 20 && text.length < 150) {
        // Extract the key part
        const keyPart = text.split(/[,;]/)[0].trim()
        if (keyPart.length > 15 && !concepts.some(c => c.includes(keyPart.substring(0, 20)))) {
          concepts.push(keyPart)
        }
      }
    }
  }

  // 7. Clinical relevance (diagnostic, tratament, cauze)
  const clinicalMatch = back.match(/(?:diagnostic|tratament|cauza principală|indicație|contraindicație)[^.;]*/gi)
  if (clinicalMatch && clinicalMatch.length > 0 && concepts.length < 4) {
    concepts.push(clinicalMatch[0].trim())
  }

  // Ensure we have at least 2 concepts
  if (concepts.length < 2) {
    // Fall back to first 2 meaningful bullets
    const bullets = lines
      .filter(l => l.trim().startsWith('•') || l.trim().startsWith('-'))
      .map(l => l.replace(/^[•\-]\s*/, '').trim())
      .filter(l => l.length > 20 && l.length < 150)

    bullets.slice(0, 2 - concepts.length).forEach(b => {
      if (!concepts.some(c => c.includes(b.substring(0, 30)))) {
        concepts.push(b.length > 100 ? b.substring(0, 97) + '...' : b)
      }
    })
  }

  return concepts.slice(0, 4)
}

function findContextForValue(text: string, value: string): string | null {
  const idx = text.indexOf(value)
  if (idx === -1) return null

  // Find the sentence or bullet containing this value
  const start = Math.max(0, text.lastIndexOf('\n', idx))
  const end = text.indexOf('\n', idx + value.length)
  const line = text.substring(start, end === -1 ? undefined : end).trim()

  // Clean up
  let clean = line.replace(/^[•\-]\s*/, '').trim()
  if (clean.length > 100) {
    clean = clean.substring(0, 97) + '...'
  }

  return clean.length > 10 ? clean : value
}

// Expanded mnemonic database with EXPLANATIONS
const mnemonicDatabase: Record<string, string> = {
  // HEMATOLOGIE - Coagulare
  'factorii i-xiii': 'Factorii I-XIII: "Fragile People Take Calling, Lets See Accidents Can Start Producing Hemorrhage Forever" → I=Fibrinogen, II=Protrombină, III=Tromboplastină tisulară, IV=Calciu, V=Proaccelerina, VI=(deprecated), VII=Proconvertina, VIII=Factor antihemofilic A, IX=Factor Christmas, X=Factor Stuart, XI=PTA, XII=Factor Hageman, XIII=Factor stabilizator fibrinei',
  'vitamina k dependenti': 'Factori Vit K-dependenți: "1972" → II, VII, IX, X (toți sunt multipli sau apropiați de aceste cifre)',
  'cale intrinseca': 'Calea intrinsecă: "12-11-9-8 Start!" → XII→XI→IX→VIII (numerele scad)',
  'cale extrinseca': 'Calea extrinsecă: VII = Cel mai Scurt timp (T1/2 = 6h), activat de factorul tisular',
  'cale comuna': 'Calea comună: "X-V-II-I" = 10-5-2-1 (numărătoare inversă spre fibrina)',

  // HEMATOLOGIE - Celule
  'eritropoeza': 'Maturare eritrocitară: "Stem-Pro-Baz-Poli-Orto-Reti-Eritro" = SPBPORE → Stem cell→Proeritroblast→Bazofil→Policromatofil→Ortocromatic→Reticulocit→Eritrocit',
  'eritropoetina': 'EPO = "E Poștașul Oxigenului" - sintetizată 90% în RINICHI, 10% ficat; stimulată de HIPOXIE',
  'hemoglobina': 'Hb = TAXI cu 4 locuri: 2α + 2β = 4 subunități, fiecare cu 1 HEM = 4 molecule O₂ transportate',
  'transferina': 'Transferină = AUTOBUZ cu 2 locuri pentru Fe³⁺; CTLF = capacitate totală, CS% = ocupare',
  'reticulocit': 'Reticulocit = "Adolescent" eritrocitar - încă are ARN (colorabil cu albastru de crezil), 0.5-1.5%',

  // BIOCHIMIE - Proteine
  'structura proteica': 'Structuri proteice ca o CLĂDIRE: 1°=cărămizi(secvența AA), 2°=pereți(α-helix/β-sheet), 3°=camere(pliere 3D), 4°=bloc(mai multe subunități)',
  'aminoacizi esentiali': 'AA esențiali: "PVT TIM HALL" → Phe, Val, Thr, Trp, Ile, Met, His, Arg, Leu, Lys',
  'km si vmax': 'Km = "Jumătate din Vmax" - Km MIC = afinitate MARE (enzima "iubește" substratul)',

  // BIOCHIMIE - Metabolism
  'glicoliza': 'Glicoliza = 10 pași: "Goodness Gracious, Father Franklin Did Go By Picking Pumpkins to Prepare Pies" → Glucoză→G6P→F6P→F1,6BP→DHAP/G3P→1,3BPG→3PG→2PG→PEP→Piruvat; RANDAMENT: 2 ATP net',
  'krebs': 'Krebs = "Citrate Is Krebs Starting Substrate For Making Oxaloacetate" → Citrat→Izocitrat→α-KG→Succinil-CoA→Succinat→Fumarat→Malat→Oxaloacetat; RANDAMENT: 3 NADH, 1 FADH₂, 1 GTP per tur',
  'beta oxidare': 'β-oxidare = "TAIE SALAMUL" - îndepărtează câte 2C la fiecare ciclu; 1 palmitoil-CoA(16C) = 8 Acetil-CoA = 129 ATP',
  'uree': 'Ciclul ureei: "Ornitină Calls A Arginine to Unload" → Ornitina→Citrulină→Argininosuccinat→Arginină→Uree+Ornitina',

  // BIOCHIMIE - Sinteza proteica
  'codoni stop': 'Codoni STOP: "UAA UAG UGA" = "U Are Away, U Are Gone, U Go Away" sau OAO = Ocru, Ambru, Opal',
  'codon start': 'Codon START: AUG = Met = "AUGust starts the year" (începe traducerea)',
  'sinteza proteica': 'Sinteza proteică: "AIR" = Activare AA, Inițiere, Elongare, Terminare; consum = 4 legături macroergice/AA (2 ATP + 2 GTP)',

  // BACTERIOLOGIE - Colorații
  'gram pozitiv': 'Gram+ = VIOLET (reține cristal violet) - perete GROS de peptidoglican',
  'gram negativ': 'Gram- = ROZ/ROȘU (pierde cristal violet, ia safranina) - perete SUBȚIRE + membrană externă LPS',
  'ziehl neelsen': 'Ziehl-Neelsen = ROȘU pe fond albastru - pentru BAAR (Bacili Acid-Alcool Rezistenți = Mycobacterii)',

  // BACTERIOLOGIE - Specii
  'stafilococ aureus': 'S. aureus = "AURUL care UCIDE": Coagulază+, Catalază+, β-hemolitic, toxine multiple (TSST, enterotoxine, PVL)',
  'streptococ pyogenes': 'S. pyogenes (GAS) = "PIOS": Catalază-, β-hemolitic, sensibil bacitracină, PYR+; cauze: faringită, scarlatină, erizipel, fasceită',
  'streptococ pneumoniae': 'S. pneumoniae = "LANCIERUL cu SCUT(capsulă)": α-hemolitic, sensibil optochin, lizat de bilă; cauze: pneumonie, meningită, otită',
  'ecoli': 'E. coli = "TERMOMETRUL intestinal": Lactoză+, Indol+, crește la 44.5°C; cauze: ITU, diaree, sepsis neonatal',
  'pseudomonas': 'Pseudomonas = "ALBASTRU-VERDE PARFUMAT": Piocianină(albastru) + Pioverdină(verde) + miros de struguri; oxidază+, rezistent',
  'clostridium tetani': 'C. tetani = "TAMBURUL cu vârf": Spor terminal, tetanospasmin blochează inhibiția → spasme ("risus sardonicus")',
  'clostridium botulinum': 'C. botulinum = "PARALIZANTUL": Toxina blochează Ach → paralizie flască descendentă, "floppy baby"',
  'mycobacterium tuberculosis': 'M. tuberculosis = "BASTOANELE ROȘII LENTE": BAAR+, Niacin+, crește pe Löwenstein-Jensen în 4-6 săpt, cord factor+',

  // VIRUSOLOGIE
  'hepatita transmitere': 'Hepatite transmitere: "VOCALE vs CONSOANE" - A, E = fecal-oral (vocale); B, C, D = parenteral (consoane)',
  'hiv': 'HIV = "SPION cu CD4": GP120 se leagă de CD4, integrare în genom, latență, apoi atac; urmărire: CD4 count + viral load',
  'herpes': 'HSV = "Sus și Jos": HSV1 = oral (above belt), HSV2 = genital (below belt); latență în ganglioni',
  'influenza': 'Influenza = "DRIFT și SHIFT": Drift = mutații minore (epidemic), Shift = reasortare (pandemic); H = hemaglutinină, N = neuraminidază',

  // PARAZITOLOGIE
  'plasmodium': 'Plasmodium = "VAMPIR cu 2 GAZDE": Țânțar Anopheles(sexual) + Om(asexual în ficat→eritrocite); P. falciparum = cel mai grav',
  'toxoplasma': 'Toxoplasma = "PISICA PERICULOASĂ": Gazdă definitivă = pisică; pericol pentru gravide (malformații, avort) și imunosupresați',
  'giardia': 'Giardia = "ZMEU cu 8 FLAGELI": Chisturi în apă → trofozoiți în intestin → diaree, malabsorbție',
}

// Generate mnemonic based on content
function generateMnemonic(front: string, back: string, tags: string[]): string {
  const frontLower = front.toLowerCase()
  const backLower = back.toLowerCase()

  // Check database first (with partial matching)
  for (const [key, mnemonic] of Object.entries(mnemonicDatabase)) {
    if (frontLower.includes(key) || backLower.includes(key)) {
      return mnemonic
    }
  }

  // Generate based on content patterns

  // 1. Lists with bullets - create acronym with explanation
  const bullets = back.split('\n')
    .filter(l => l.trim().startsWith('•') || l.trim().startsWith('-'))
    .map(l => l.replace(/^[•\-]\s*/, '').trim())
    .filter(l => l.length > 5)

  if (bullets.length >= 3 && bullets.length <= 7) {
    const firstWords = bullets.map(b => {
      const word = b.split(/[\s,;:]/)[0]
      return word.charAt(0).toUpperCase()
    })
    const acronym = firstWords.join('')
    const explanation = bullets.map((b, i) => `${firstWords[i]}=${b.split(/[\s,;:]/)[0]}`).join(', ')
    return `Acronim "${acronym}": ${explanation}`
  }

  // 2. Processes with arrows - story method
  if (back.includes('→') || back.includes('->')) {
    const steps = back.match(/[A-Za-zăâîșțĂÂÎȘȚ]+(?=\s*→|->)/g)
    if (steps && steps.length >= 3) {
      return `Proces secvențial: ${steps.slice(0, 5).join('→')} (imaginează ca o linie de producție)`
    }
  }

  // 3. Numeric values - anchor
  const numbers = back.match(/\d+[\-–]?\d*\s*[%a-zA-Z\/]+/g)
  if (numbers && numbers.length > 0) {
    return `Ancoră numerică: "${numbers[0]}" - asociază cu ceva familiar (ore, vârste, prețuri)`
  }

  // 4. Default based on section
  const section = tags[0] || ''
  const sectionMnemonics: Record<string, string> = {
    'HEMATOLOGIE': 'Analogie: Sângele ca un ORAȘ - celulele sunt locuitorii, vasele sunt străzile, măduva este maternitatea',
    'BIOCHIMIE': 'Analogie: Celula ca o FABRICĂ - enzimele sunt muncitorii, ATP este moneda, substratele sunt materiile prime',
    'BACTERIOLOGIE': 'Personificare: Bacteria ca un PERSONAJ cu trăsături specifice - armele sunt toxinele, armura este capsula',
    'VIRUSOLOGIE': 'Analogie: Virusul ca un SPION - se infiltrează, folosește resursele gazdei, se multiplică, pleacă',
    'PARAZITOLOGIE': 'Analogie: Parazitul ca un CHIRIAȘ - ciclul de viață este călătoria între gazde'
  }

  return sectionMnemonics[section] || 'Vizualizare: creează o imagine ABSURDĂ și VIVIDĂ care leagă conceptul de ceva familiar'
}

async function main(): Promise<void> {
  const inputPath = '/Users/andreichiper/Documents/Subiecte primariat/flashcards.json'
  const outputPath = '/Users/andreichiper/Documents/Subiecte primariat/flashcards-v2.json'

  console.log('Reading flashcards from:', inputPath)
  const content = readFileSync(inputPath, 'utf-8')
  const flashcards: FlashcardInput[] = JSON.parse(content)

  console.log(`Processing ${flashcards.length} flashcards...`)

  const results: FlashcardOutput[] = flashcards.map((fc, idx) => {
    const cleanedFront = cleanFront(fc.front)
    const keyConcepts = extractKeyConcepts(fc.back, cleanedFront)
    const mnemonic = generateMnemonic(cleanedFront, fc.back, fc.tags)

    if ((idx + 1) % 200 === 0) {
      console.log(`  Processed ${idx + 1}/${flashcards.length}...`)
    }

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

  // Statistics
  const withDbMnemonic = results.filter(r =>
    Object.values(mnemonicDatabase).some(m => r.extras.mnemonic === m)
  ).length

  console.log(`\nStatistics:`)
  console.log(`  With database mnemonics: ${withDbMnemonic}`)
  console.log(`  With generated mnemonics: ${results.length - withDbMnemonic}`)

  // Show samples
  console.log('\n=== SAMPLES ===')

  // Sample 1: One with database mnemonic
  const dbSample = results.find(r =>
    Object.values(mnemonicDatabase).some(m => r.extras.mnemonic === m)
  )
  if (dbSample) {
    console.log('\n--- Sample (database mnemonic) ---')
    console.log(`Front: ${dbSample.front}`)
    console.log(`Key Concepts: ${dbSample.extras.keyConcepts.join(' | ')}`)
    console.log(`Mnemonic: ${dbSample.extras.mnemonic.substring(0, 150)}...`)
  }

  // Sample 2: Random
  const randomIdx = Math.floor(Math.random() * results.length)
  console.log(`\n--- Sample (random #${randomIdx}) ---`)
  console.log(`Front: ${results[randomIdx].front}`)
  console.log(`Key Concepts: ${results[randomIdx].extras.keyConcepts.join(' | ')}`)
  console.log(`Mnemonic: ${results[randomIdx].extras.mnemonic}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Failed:', error)
    process.exit(1)
  })

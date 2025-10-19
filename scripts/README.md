# Primariat Flashcard Import Scripts

This directory contains scripts to bulk import flashcards from the "Subiecte Primariat" exam materials.

## Setup

1. **Get Supabase Service Role Key:**
   - Go to https://supabase.com/dashboard/project/rotoryibpffwchojgmfs/settings/api
   - Copy the `service_role` key (NOT the anon key)
   - Add it to `.env.local`:
     ```
     SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...
     ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

## Usage

### Running the Import Script

```bash
npx tsx scripts/import-flashcards.ts
```

This will:
- Create decks for each subject
- Import all flashcards from `primariat-data.ts`
- Display progress and summary

### Adding More Flashcards

Edit `scripts/primariat-data.ts` and add new decks/flashcards to the `primatiatDecks` array:

```typescript
export const primatiatDecks: DeckData[] = [
  {
    name: 'Subject Name',
    description: 'Subject description',
    flashcards: [
      {
        front: 'Question or concept',
        back: 'Detailed answer with markdown formatting',
        mnemonic: 'Optional memory aid',
      },
      // Add more flashcards...
    ],
  },
  // Add more decks...
]
```

## Current Status

### Completed (8 flashcards):
- ✅ Hematologie - Practic (from PDF #01)
  - Pregătirea materialului venos
  - Pregătirea materialului capilar
  - Anticoagulante EDTA
  - Execuția frotiului
  - Colorația MGG
  - Colorația Giemsa
  - Colorații vitale
  - Picătura groasă

### Remaining Files to Process (35+ files):

**Hemato Practic PDFs (11 more):**
- 02. Numarătoarea eritrocitelor, leucocitelor, trombocitelor
- 03. Determinarea reticulocitelor. Indici eritrocitari. VSH
- 04. Teste citochimice
- 05_06. Mielograma
- 07. Concentratul leucocitelor
- 08. Rezistenta osmotica, autohemoliza, teste diverse
- 09. Determinarea grupelor sanguine
- 10. Teste boli autoimune
- 11. Testul rozetelor
- 12. Teste hemostaza si fibrinoliza

**Biochimie Practic PDFs (9 files):**
- Examen de urina
- Dozare substante minerale
- Dozare proteine sanguine
- Dozare uree, amoniac, acid uric, creatinina
- Dozare bilirubina
- Dozare glucoza
- Dozare lipide totale
- Determinare enzime serice
- Examen LCR

**Hemato Scris DOCX (12 files):**
- Productia si distructia eritrocite
- Metabolismul Fe
- Hemoliza
- Anomalii morfologice eritrocit
- Hemostaza si fibrinoliza
- Anemii
- Boli mieloproliferative cronice
- Leucemie limfatica cronica
- Leucemii acute
- Sindroame mielodisplazice
- Sindroame hemoragipare
- Sistemul ABO si Rh

**Biochimie Scris DOCX (4 files):**
- Proteinele
- Glucidele
- Lipidele
- Enzimele

**Main DOC files (5 files):**
- Hemato.doc (944 KB)
- Subiecte bacterio.doc (7.1 MB - very large!)
- Virusologie.doc
- Paraziti i.doc
- Practic chimie.doc

## Tips for Efficient Transcription

1. **Use Claude or AI** to help extract content from PDFs/DOCX
2. **Focus on key concepts** - don't transcribe everything verbatim
3. **Break into Q&A pairs** - front = question, back = answer
4. **Add mnemonics** where helpful for memorization
5. **Use markdown** for formatting (lists, bold, tables)
6. **Test import frequently** to catch errors early

## Example Workflow

1. Read a PDF file
2. Extract 5-10 key concepts
3. Format as flashcards in `primariat-data.ts`
4. Run import script to test
5. Repeat for next file

Estimated time: 30-60 minutes per file = 20-40 hours total for all 43 files

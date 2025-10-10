# Flashcard - Aplicație de Învățare Mnemonică

Aplicație web modernă pentru învățare cu flashcard-uri, utilizând repetare spațială (SRS) și tehnici mnemonice.

## 🚀 Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Deployment**: Vercel
- **SRS Algorithm**: SuperMemo 2 (SM-2)

## ✨ Caracteristici

- ✅ Autentificare cu Supabase (Email/Password + OAuth)
- ✅ Gestionare seturi de flashcard-uri (CRUD)
- ✅ Sistem de repetare spațială (SM-2 algorithm)
- ✅ Indicii mnemonice pentru fiecare carte
- ✅ Suport pentru imagini
- ✅ Statistici și urmărire progres
- ✅ Interfață 100% în limba română
- ✅ Design responsive (mobile-first)
- ✅ Mod întunecat

## 📋 Cerințe

- Node.js 18+
- npm sau pnpm
- Cont Supabase (gratuit)

## 🛠️ Setup Local

### 1. Clonează repository-ul

```bash
git clone <repository-url>
cd flashcard-app
```

### 2. Instalează dependențele

```bash
npm install
```

### 3. Configurează Supabase

1. Creează un proiect nou pe [supabase.com](https://supabase.com)
2. Du-te la **SQL Editor** și rulează fișierul de migrare:
   - Copiază conținutul din `supabase/migrations/001_initial_schema.sql`
   - Rulează în SQL Editor

3. Obține credențialele:
   - **Project URL**: Settings → API → Project URL
   - **Anon Key**: Settings → API → Project API keys → anon/public

### 4. Configurează variabilele de mediu

Creează fișierul `.env.local` (deja există un template):

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url-here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 5. Pornește serverul de development

```bash
npm run dev
```

Aplicația va fi disponibilă la [http://localhost:3000](http://localhost:3000)

## 📁 Structura Proiectului

```
flashcard-app/
├── app/                      # Next.js App Router
│   ├── (auth)/              # Auth routes (login, signup)
│   ├── (dashboard)/         # Protected routes (decks, study, stats)
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── flashcard/           # Flashcard components
│   ├── deck/                # Deck components
│   └── stats/               # Statistics components
├── lib/
│   ├── supabase/            # Supabase clients
│   ├── srs.ts               # SM-2 algorithm
│   └── utils.ts
├── types/
│   └── index.ts             # TypeScript types
├── supabase/
│   └── migrations/          # Database migrations
└── hooks/                   # Custom React hooks
```

## 🗄️ Schema Bază de Date

### Tables

- `decks` - Seturi de flashcard-uri
- `flashcards` - Cărțile individuale
- `card_stats` - Statistici SRS pentru fiecare carte
- `reviews` - Istoric revizuiri
- `tags` - Etichete pentru organizare
- `card_tags` - Legătură many-to-many între cărți și etichete

### Row Level Security (RLS)

Toate tabelele au RLS activat pentru a asigura că utilizatorii văd doar propriile date.

## 🎯 Algoritmul SM-2

Aplicația folosește algoritmul SuperMemo 2 pentru a optimiza intervalele de revizuire:

- **Again (1)**: Restartează intervalul (1 zi)
- **Hard (2)**: Crește intervalul cu 20%
- **Good (3)**: Crește intervalul normal
- **Easy (4)**: Crește intervalul cu 30%

Easiness Factor (EF) se ajustează automat pe baza performanței.

## 📱 UI/UX în Română

Toată interfața este în limba română, inclusiv:
- Navigare și meniuri
- Formulare și validări
- Mesaje de eroare și succes
- Instrucțiuni și tooltips

## 🚀 Deployment pe Vercel

1. Push codul pe GitHub
2. Conectează repository-ul la Vercel
3. Adaugă variabilele de mediu în Vercel Dashboard
4. Deploy automat!

```bash
# Sau folosește Vercel CLI
npm i -g vercel
vercel
```

## 📝 Următorii Pași

După instalarea inițială, poți:

1. **Creează un cont** - Înregistrează-te în aplicație
2. **Adaugă un set** - Creează primul tău set de flashcard-uri
3. **Adaugă cărți** - Completează setul cu informații de învățat
4. **Începe studiul** - Pornește sesiunea de revizuire
5. **Urmărește progresul** - Verifică statisticile tale

## 🔒 Securitate

- Autentificare securizată cu Supabase Auth
- Row Level Security pe toate tabelele
- Validare input pe client și server
- HTTPS obligatoriu în producție
- Toate credențialele în variabile de mediu

## 🤝 Contribuții

Contribuțiile sunt binevenite! Te rog:
1. Fork repository-ul
2. Creează un branch pentru feature (`git checkout -b feature/amazing-feature`)
3. Commit schimbările (`git commit -m 'feat: add amazing feature'`)
4. Push pe branch (`git push origin feature/amazing-feature`)
5. Deschide un Pull Request

## 📄 Licență

MIT License - vezi fișierul LICENSE pentru detalii

## 🆘 Suport

Pentru probleme sau întrebări:
- Deschide un issue pe GitHub
- Consultă documentația Supabase: [supabase.com/docs](https://supabase.com/docs)
- Consultă documentația Next.js: [nextjs.org/docs](https://nextjs.org/docs)

---

**Făcut cu ❤️ pentru învățare eficientă**

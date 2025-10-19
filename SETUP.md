# Setup Guide - Ghid de Configurare

## 🎯 Pasul 1: Creează Proiect Supabase

1. Mergi la [supabase.com](https://supabase.com) și creează un cont gratuit
2. Click pe **"New Project"**
3. Completează detaliile:
   - **Name**: flashcard-app (sau alt nume)
   - **Database Password**: Generează o parolă sigură (salvează-o!)
   - **Region**: Alege cea mai apropiată de tine (eu: Europe West)
   - **Pricing Plan**: Free

4. Așteaptă 2-3 minute pentru finalizarea creării proiectului

## 🗄️ Pasul 2: Rulează Migrarea Bazei de Date

1. În Supabase Dashboard, du-te la **SQL Editor** (bara din stânga)
2. Click pe **"New query"**
3. Deschide fișierul local `supabase/migrations/001_initial_schema.sql`
4. Copiază ÎNTREGUL conținut
5. Lipește în SQL Editor din Supabase
6. Click pe **"Run"** (sau Ctrl/Cmd + Enter)
7. Ar trebui să vezi: "Success. No rows returned"

Aceasta va crea:
- ✅ Toate tabelele necesare (decks, flashcards, card_stats, etc.)
- ✅ Row Level Security policies
- ✅ Indexuri pentru performanță
- ✅ Trigger automat pentru card_stats

## 🔑 Pasul 3: Obține Credențialele API

1. În Supabase Dashboard, du-te la **Settings** (icon cu roată dințată, jos în stânga)
2. Click pe **API** în meniul Settings
3. Găsești două valori importante:

### Project URL
```
https://xxxxxxxxxxx.supabase.co
```
Copiază această valoare!

### Project API Keys
Scroll în jos până la secțiunea "Project API keys"

**anon/public key** - O cheie lungă care începe cu `eyJ...`
Copiază această valoare!

⚠️ **NU** copia `service_role` key - aceea e secretă și nu trebuie expusă!

## 📝 Pasul 4: Configurează `.env.local`

1. În proiectul tău local, deschide fișierul `.env.local`
2. Înlocuiește valorile placeholder:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

3. Salvează fișierul

## ✅ Pasul 5: Configurează URL-urile Supabase (OBLIGATORIU) ⚠️

**IMPORTANT**: Fără acest pas, autentificarea NU VA FUNCȚIONA!

1. În Supabase Dashboard → **Authentication** → **URL Configuration**

2. Setează **Site URL**:
   ```
   http://localhost:3000
   ```
   ⚠️ Obligatoriu pentru CORS!

3. Adaugă **Redirect URLs** (click "Add URL"):
   ```
   http://localhost:3000/**
   ```

4. Click **Save** și așteaptă 30 secunde

5. **Verifică configurarea**:
   - Du-te la `http://localhost:3000/test-connection`
   - Click "Run All Tests"
   - Toate testele ar trebui să fie ✓ PASS

### De ce e necesar?

Fără această configurare, browser-ul va bloca cererile către Supabase (CORS error) și vei vedea eroarea **"Load failed"** la login.

## ✅ Pasul 6: Testează Conexiunea

1. Deschide terminalul în folderul proiectului
2. Rulează:
```bash
npm run dev
```

3. Deschide browserul la [http://localhost:3000](http://localhost:3000)

4. Ar trebui să vezi landing page-ul aplicației în română! 🇷🇴

5. **Testează autentificarea**:
   - Mergi la `/signup`
   - Creează un cont de test
   - Verifică că poți face login

## 🎨 Pasul 7 (Opțional): Personalizează Email Templates

Pentru ca utilizatorii să primească emailuri de confirmare:

1. În Supabase Dashboard → **Authentication** → **Email Templates**
2. Personalizează template-urile pentru:
   - Confirm signup
   - Magic Link
   - Change Email
   - Reset Password

## 🚀 Pasul 8: Deploy pe Vercel

### Opțiunea 1: Vercel Dashboard
1. Push codul pe GitHub
2. Mergi la [vercel.com](https://vercel.com) și autentifică-te
3. Click **"New Project"**
4. Import repository-ul tău GitHub
5. Adaugă Environment Variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
   ```
6. Click **"Deploy"**

### Opțiunea 2: Vercel CLI
```bash
npm i -g vercel
vercel login
vercel
# Urmează instrucțiunile
# Adaugă env variables când ești întrebat
```

## 🔍 Verificare Finală

După deployment, verifică:
- ✅ Landing page se încarcă
- ✅ Poți crea un cont nou
- ✅ Primești email de confirmare
- ✅ Poți face login după confirmare

## 🐛 Troubleshooting

### 🚨 Error: "Load failed" la Login
**Soluție**: Vezi Pasul 5 - trebuie să configurezi URL-urile în Supabase!

### Error: "Invalid API Key"
- Verifică că ai copiat cheia `anon` nu `service_role`
- Asigură-te că nu ai spații extra în `.env.local`

### Error: "relation does not exist"
- Nu ai rulat migrarea SQL
- Du-te înapoi la Pasul 2

### Nu primesc emailuri de confirmare
- Verifică folder-ul Spam
- În Supabase Dashboard → Authentication → Settings
  - Setează **"Confirm email"** la **Enabled**
  - Sau dezactivează pentru testare locală

### Erori TypeScript
```bash
npm run typecheck
```

### Build failed
```bash
rm -rf .next node_modules
npm install
npm run build
```

### 📘 Mai multe probleme?
Vezi **[TROUBLESHOOTING.md](./TROUBLESHOOTING.md)** pentru ghid complet de rezolvare probleme!

## 📚 Resurse Utile

- [Supabase Docs](https://supabase.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)

## 💡 Pro Tips

1. **Local Development**: Folosește [Supabase CLI](https://supabase.com/docs/guides/cli) pentru dev local
2. **Database Browser**: În Supabase Dashboard → Table Editor poți vedea datele
3. **Logs**: În Supabase Dashboard → Logs poți vedea query-urile
4. **Backup**: Supabase face backup automat zilnic

---

**Need help?** Deschide un issue pe GitHub! 🙋‍♂️

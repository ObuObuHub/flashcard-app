# Troubleshooting Guide

Quick solutions for common problems with the flashcard app.

---

## 🚨 Authentication Error: "Load failed"

**Symptom**: When trying to login or signup, you see a generic "Load failed" error in the browser.

**Root Cause**: Supabase is rejecting requests due to CORS (Cross-Origin Resource Sharing) misconfiguration.

### ✅ Solution

1. **Open Supabase Dashboard** → Your Project → **Authentication** → **URL Configuration**

2. **Configure Site URL**:
   ```
   Site URL: http://localhost:3000
   ```
   (For production, use your Vercel URL: `https://your-app.vercel.app`)

3. **Configure Redirect URLs**:
   Add these URLs (one per line):
   ```
   http://localhost:3000/**
   ```
   (For production, add: `https://your-app.vercel.app/**`)

4. **Save Changes** and wait 30 seconds

5. **Test Connection**:
   - Visit `http://localhost:3000/test-connection`
   - Click "Run All Tests"
   - All tests should pass ✓

### Why This Happens

Browsers block cross-origin requests by default for security. Supabase needs to know which origins (websites) are allowed to make requests to your authentication API. Without this configuration, the browser shows "Load failed" when trying to contact Supabase.

### Alternative Diagnostic Steps

1. **Open Browser DevTools** (F12 or Right Click → Inspect)
2. Go to **Console** tab
3. Try to login again
4. Look for errors mentioning:
   - `CORS`
   - `Access-Control-Allow-Origin`
   - `Failed to fetch`
   - `Load failed`

If you see any of these, the CORS configuration is the issue.

---

## 🔑 Authentication Error: "Invalid API Key"

**Symptom**: Errors mentioning invalid or missing API key.

**Causes**:
1. Wrong API key copied (used `service_role` instead of `anon`)
2. Extra spaces in `.env.local`
3. Environment variables not loaded

### ✅ Solution

1. **Check `.env.local`**:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
   ```

2. **Verify Keys in Supabase**:
   - Dashboard → Settings → API
   - Copy the **anon/public** key (NOT service_role)
   - Copy the Project URL

3. **Check for Spaces**:
   ```bash
   # BAD (has space)
   NEXT_PUBLIC_SUPABASE_URL= https://xxx.supabase.co

   # GOOD
   NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
   ```

4. **Restart Dev Server**:
   ```bash
   # Kill all servers
   lsof -ti:3000 | xargs kill -9

   # Clear cache
   rm -rf .next

   # Restart
   npm run dev
   ```

---

## 🗄️ Database Error: "relation does not exist"

**Symptom**: Errors mentioning tables don't exist (decks, flashcards, etc.)

**Cause**: Database migrations haven't been run.

### ✅ Solution

1. **Go to Supabase Dashboard** → SQL Editor

2. **Open Migration File**: `supabase/migrations/001_initial_schema.sql`

3. **Copy ALL content** from the file

4. **Paste into SQL Editor**

5. **Click Run** (or Ctrl/Cmd + Enter)

6. **Verify Success**: Should see "Success. No rows returned"

7. **Check Tables**: Dashboard → Table Editor → Should see all tables

---

## 📧 Email Confirmation Not Working

**Symptom**: Not receiving confirmation emails after signup.

### ✅ Solution

#### Option 1: Disable Email Confirmation (Local Dev Only)
1. Supabase Dashboard → Authentication → Settings
2. Find **"Confirm email"**
3. Toggle to **Disabled**
4. Users can login immediately without confirming

#### Option 2: Check Email Settings
1. Check **Spam folder**
2. Verify email in Supabase Dashboard → Authentication → Users
3. Manually confirm user:
   - Click on user in dashboard
   - Click "Confirm Email"

#### Option 3: Configure Email Provider
1. Supabase Dashboard → Authentication → Email
2. **Use Custom SMTP** for better deliverability
3. Configure with SendGrid, Mailgun, etc.

---

## 🔨 Build Errors on Vercel

**Symptom**: Deployment fails with TypeScript or ESLint errors.

### ✅ Solution

1. **Run Locally First**:
   ```bash
   npm run build
   ```

2. **Fix TypeScript Errors**:
   ```bash
   npx tsc --noEmit
   ```

3. **Fix ESLint Errors**:
   ```bash
   npx eslint .
   ```

4. **Common Issues**:
   - Unused variables → Use them or prefix with `_`
   - `any` types → Replace with proper types
   - Missing imports → Add them

5. **Push Fixed Code**:
   ```bash
   git add .
   git commit -m "fix: resolve build errors"
   git push
   ```

---

## 🌐 Vercel Environment Variables Missing

**Symptom**: App works locally but fails in production.

**Cause**: Environment variables in `.env.local` aren't uploaded to Vercel.

### ✅ Solution

1. **Go to Vercel Dashboard** → Your Project → Settings → Environment Variables

2. **Add Variables**:
   ```
   Name: NEXT_PUBLIC_SUPABASE_URL
   Value: https://xxx.supabase.co
   Environment: Production, Preview, Development
   ```

   ```
   Name: NEXT_PUBLIC_SUPABASE_ANON_KEY
   Value: eyJ...
   Environment: Production, Preview, Development
   ```

3. **Redeploy**:
   - Deployments tab → Click "..." → Redeploy

4. **Update Supabase URLs**:
   - Supabase → Authentication → URL Configuration
   - Add your Vercel URL: `https://your-app.vercel.app`
   - Add redirect: `https://your-app.vercel.app/**`

---

## 🐌 Slow Performance / N+1 Queries

**Symptom**: Deck list loads slowly, many database queries.

### ✅ Solution

Run the optimization migrations:

1. **Migration 002** (Atomic Reviews):
   ```sql
   -- Run in Supabase SQL Editor
   -- Paste contents of supabase/migrations/002_atomic_review_function.sql
   ```

2. **Migration 003** (Deck Stats Optimization):
   ```sql
   -- Run in Supabase SQL Editor
   -- Paste contents of supabase/migrations/003_optimize_deck_stats.sql
   ```

These create optimized database functions and views that reduce query count from 100+ to 1.

---

## 🔐 RLS Error: "new row violates row-level security policy"

**Symptom**: Can't create decks or flashcards even when logged in.

**Cause**: Row Level Security policies aren't configured correctly.

### ✅ Solution

1. **Verify You're Logged In**:
   - Visit `/test-auth`
   - Should show your user info

2. **Check RLS Policies**:
   - Supabase → Table Editor → Select table → RLS tab
   - Should see policies for INSERT, SELECT, UPDATE, DELETE

3. **Re-run Migration**:
   - If policies missing, re-run `001_initial_schema.sql`

4. **Check User ID Match**:
   ```sql
   -- Run in SQL Editor to check
   SELECT auth.uid();
   ```
   Should return your user ID, not null

---

## 🧪 Diagnostic Tools

### Test Connection Page
Visit `/test-connection` to run automated diagnostics:
- Environment variables check
- Supabase client creation
- Network connectivity
- Auth API accessibility
- CORS configuration

### Test Auth Page
Visit `/test-auth` to check authentication status:
- Current user info
- Session details
- Login status

### Browser Console
Open DevTools (F12) → Console tab:
- All errors are logged here
- Network tab shows failed requests
- Look for red errors

---

## 📞 Still Stuck?

If none of these solutions work:

1. **Check Logs**:
   - Supabase Dashboard → Logs
   - Vercel Dashboard → Deployments → Function Logs

2. **Verify Setup**:
   - Review `SETUP.md` step by step
   - Ensure all migrations ran successfully
   - Confirm environment variables are correct

3. **Get Help**:
   - Open an issue on GitHub with:
     - Error message (copy full text)
     - Screenshots of error
     - Steps to reproduce
     - What you've tried

4. **Common Questions**:
   - "Works locally but not in production" → Check Vercel env vars and Supabase URLs
   - "Login works but can't create decks" → Check RLS policies
   - "Nothing works" → Start with `/test-connection` diagnostic

---

**Last Updated**: January 2025

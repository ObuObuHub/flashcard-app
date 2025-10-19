# 🧪 Testing Guide

## Quick Test Checklist

Visit http://localhost:3000 and follow this test plan:

### ✅ Phase 1: Authentication Flow

1. **Signup Test**
   - [ ] Visit `/signup`
   - [ ] Create account with email/password
   - [ ] Verify email confirmation sent
   - [ ] Click confirmation link from email
   - [ ] Should redirect to `/decks`

2. **Login Test**
   - [ ] Visit `/login`
   - [ ] Login with credentials
   - [ ] Should redirect to `/decks`

3. **Logout Test**
   - [ ] Click "Deconectare" button
   - [ ] Should redirect to `/`

### ✅ Phase 2: Deck Management

4. **Create Deck**
   - [ ] Click "Set nou" button
   - [ ] Enter name: "Drept Civil - Test"
   - [ ] Enter description: "Test deck for validation"
   - [ ] Click "Creează"
   - [ ] Should see new deck in grid

5. **Validation Tests**
   - [ ] Try creating deck with empty name → Should show error
   - [ ] Try creating deck with 300 character name → Should show error (max 200)
   - [ ] Create deck with 200 character name → Should succeed

6. **Delete Deck**
   - [ ] Click three-dot menu on deck
   - [ ] Click "Șterge"
   - [ ] Confirm deletion
   - [ ] Deck should disappear

### ✅ Phase 3: Flashcard Management

7. **Create Flashcard**
   - [ ] Click on a deck to open it
   - [ ] Click "Carte nouă"
   - [ ] Enter front: "Ce este un contract?"
   - [ ] Enter back: "Un acord de voință între două sau mai multe părți..."
   - [ ] (Optional) Enter mnemonic: "CON-tract = CON-sens"
   - [ ] Click "Creează"
   - [ ] Should see flashcard in list

8. **Large Text Test** (Critical for exam studying)
   - [ ] Create flashcard with 10,000 character answer
   - [ ] Should succeed (max is 100,000)
   - [ ] Verify text displays correctly with auto-expand
   - [ ] Character counter should show count

9. **Edit Flashcard**
   - [ ] Click pencil icon on flashcard
   - [ ] Modify text
   - [ ] Click "Salvează"
   - [ ] Changes should be visible

10. **Delete Flashcard**
    - [ ] Click trash icon
    - [ ] Confirm deletion
    - [ ] Flashcard should disappear

### ✅ Phase 4: Study Mode

11. **Start Study Session**
    - [ ] From deck page, click "Studiază" button
    - [ ] Should see first flashcard with question
    - [ ] Click "Arată răspunsul"
    - [ ] Should see answer + mnemonic (if added)

12. **Rate Flashcards**
    - [ ] Click "Din nou" → Next card should appear
    - [ ] Click "Arată răspunsul" → Click "Dificil"
    - [ ] Click "Arată răspunsul" → Click "Bine"
    - [ ] Click "Arată răspunsul" → Click "Ușor"
    - [ ] After last card, should redirect to deck page

13. **Progress Tracking**
    - [ ] Return to `/decks`
    - [ ] Deck should show updated stats (cards reviewed)
    - [ ] Badge should show cards due for review

### ✅ Phase 5: Security Tests

14. **Authorization Tests** (Requires 2 accounts)
    - [ ] Copy deck ID from URL
    - [ ] Logout and login as different user
    - [ ] Try to access `/decks/{other-user-deck-id}`
    - [ ] Should not see deck or get error

15. **Validation Edge Cases**
    - [ ] Try to create flashcard with empty front → Should error
    - [ ] Try to create flashcard with empty back → Should error
    - [ ] Try 50,001 character front → Should error (max 50,000)
    - [ ] Try 100,001 character back → Should error (max 100,000)

### ✅ Phase 6: Performance Tests

16. **Large Dataset Test**
    - [ ] Create deck with 100 flashcards (use script below)
    - [ ] Visit `/decks` page
    - [ ] Should load quickly (<1s with optimization)
    - [ ] Check browser console for warnings about fallback queries

17. **Race Condition Test**
    - [ ] Start study session
    - [ ] Show answer
    - [ ] Rapidly click same rating button 5 times
    - [ ] Should only record ONE review
    - [ ] Should not show errors

### ✅ Phase 7: Migrations Test

18. **Check if Migrations Needed**
    - [ ] Open browser console (F12)
    - [ ] Visit `/decks` page
    - [ ] Look for warnings about "RPC not found"
    - [ ] If warnings present, run migrations in Supabase

---

## 🤖 Automated Test Script (Browser Console)

Paste this in browser console to create 100 flashcards for testing:

```javascript
async function createTestFlashcards(deckId, count = 100) {
  for (let i = 1; i <= count; i++) {
    const formData = new FormData();
    formData.append('front', `Întrebare ${i}: Ce este conceptul numărul ${i}?`);
    formData.append('back', `Răspuns ${i}: Acesta este un răspuns detaliat pentru conceptul numărul ${i}. `.repeat(10));
    formData.append('mnemonic', `Mnemonic pentru ${i}`);

    await fetch('/api/flashcards/create', {
      method: 'POST',
      body: formData
    });

    if (i % 10 === 0) console.log(`Created ${i} flashcards...`);
  }
  console.log('Done! Reload the page.');
}

// Usage: createTestFlashcards('YOUR_DECK_ID_HERE', 100)
```

---

## 🐛 Known Issues to Test

1. **First Migration Run**
   - RPC functions won't exist until you run migrations
   - App should show console warnings but still work
   - Test both before and after running migrations

2. **Network Failures**
   - Try disconnecting internet during study session
   - Should show user-friendly error
   - Progress should be saved for completed reviews

3. **Browser Refresh During Study**
   - Start study session
   - Refresh browser
   - Should restart session (progress not saved yet - future feature)

---

## 📊 Performance Benchmarks

Expected performance with optimization:

| Operation | Small Dataset (10 decks, 50 cards) | Large Dataset (100 decks, 5000 cards) |
|-----------|-------------------------------------|----------------------------------------|
| Load `/decks` | <100ms | <200ms (with RPC), ~2s (without RPC) |
| Open deck detail | <150ms | <150ms |
| Create flashcard | <200ms | <200ms |
| Study session start | <300ms | <300ms |
| Record review | <150ms | <150ms (with RPC), could fail (without RPC) |

---

## ✅ Success Criteria

All tests should pass with:
- ✅ No TypeScript errors
- ✅ No console errors (warnings OK for missing migrations)
- ✅ All CRUD operations work
- ✅ Data persists after refresh
- ✅ Validation prevents invalid input
- ✅ Authorization prevents unauthorized access
- ✅ Performance meets benchmarks above

---

## 🔧 Troubleshooting

### "RPC function not found" warnings
**Solution**: Run migrations 002 and 003 in Supabase SQL Editor

### "Unauthorized" errors
**Solution**: Logout and login again, check Supabase auth settings

### Slow `/decks` page load
**Solution**: Run migration 003 for optimized queries

### Reviews not saving
**Solution**: Run migration 002 for atomic transaction function

---

## 📝 Test Results Template

```
Date: ___________
Tester: ___________

Phase 1 (Auth): ☐ PASS ☐ FAIL
Phase 2 (Decks): ☐ PASS ☐ FAIL
Phase 3 (Flashcards): ☐ PASS ☐ FAIL
Phase 4 (Study): ☐ PASS ☐ FAIL
Phase 5 (Security): ☐ PASS ☐ FAIL
Phase 6 (Performance): ☐ PASS ☐ FAIL
Phase 7 (Migrations): ☐ PASS ☐ FAIL

Notes:
_________________________________
_________________________________
_________________________________
```

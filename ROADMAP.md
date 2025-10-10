# 🗺️ Roadmap - Plan de Dezvoltare

## ✅ Phase 1: Scaffolding (COMPLETED)

- [x] Next.js 14 + TypeScript setup
- [x] Tailwind CSS + shadcn/ui
- [x] Supabase integration
- [x] Database schema & migrations
- [x] SM-2 algorithm implementation
- [x] Romanian UI translations
- [x] Landing page
- [x] Documentation (README, SETUP)

**Status**: ✅ DONE - Ready to add features!

---

## 🚧 Phase 2: Authentication & Core UI

### Authentication
- [ ] Login page (`/login`)
- [ ] Signup page (`/signup`)
- [ ] Password reset flow
- [ ] Email verification
- [ ] Protected route middleware
- [ ] User profile page

### Dashboard Layout
- [ ] Main navigation bar (Romanian)
- [ ] Sidebar with deck list
- [ ] Mobile responsive menu
- [ ] User menu dropdown
- [ ] Breadcrumbs

**Priority**: HIGH
**Estimated Time**: 1-2 days

---

## 📚 Phase 3: Deck Management

### Deck CRUD
- [ ] Create new deck (dialog/modal)
- [ ] List all decks (card grid)
- [ ] Edit deck (name, description)
- [ ] Delete deck (with confirmation)
- [ ] Deck detail page
- [ ] Empty states

### Deck Features
- [ ] Deck statistics (cards count, due today)
- [ ] Deck cover image
- [ ] Duplicate deck
- [ ] Export deck to JSON
- [ ] Import deck from JSON

**Priority**: HIGH
**Estimated Time**: 2-3 days

---

## 🎴 Phase 4: Flashcard Management

### Card CRUD
- [ ] Add card to deck (form)
- [ ] Edit card
- [ ] Delete card (with confirmation)
- [ ] Bulk add cards (textarea → multiple)
- [ ] Reorder cards (drag & drop)

### Card Features
- [ ] Rich text editor (front/back)
- [ ] Image upload (Supabase Storage)
- [ ] Mnemonic hints field
- [ ] Card preview
- [ ] Search within deck
- [ ] Filter by tags

**Priority**: HIGH
**Estimated Time**: 3-4 days

---

## 📖 Phase 5: Study Mode (Core Feature)

### Basic Study
- [ ] Study session page
- [ ] Card flip animation
- [ ] Show question (front)
- [ ] Reveal answer (back)
- [ ] Rating buttons (Again/Hard/Good/Easy)
- [ ] Progress bar (cards left)
- [ ] Session complete screen

### Advanced Study
- [ ] Keyboard shortcuts (Space, 1-4)
- [ ] Touch gestures (mobile)
- [ ] Show mnemonic hint toggle
- [ ] Skip card (for later)
- [ ] Undo last rating
- [ ] Timer per card
- [ ] Review only due cards

### Study Settings
- [ ] Cards per session limit
- [ ] Shuffle cards option
- [ ] Show timer toggle
- [ ] Auto-flip after N seconds

**Priority**: CRITICAL
**Estimated Time**: 4-5 days

---

## 📊 Phase 6: Statistics & Analytics

### Basic Stats
- [ ] Overview dashboard
- [ ] Cards reviewed today
- [ ] Accuracy percentage
- [ ] Current streak
- [ ] Total cards/decks

### Advanced Analytics
- [ ] Calendar heatmap (study activity)
- [ ] Cards by mastery level (pie chart)
- [ ] Review history timeline
- [ ] Deck comparison
- [ ] Weekly/monthly reports
- [ ] Forecast (upcoming reviews)

### Visualizations
- [ ] Charts with Recharts
- [ ] Progress bars
- [ ] Badges for achievements
- [ ] Streak flames 🔥

**Priority**: MEDIUM
**Estimated Time**: 3-4 days

---

## 🏷️ Phase 7: Tags & Organization

### Tags System
- [ ] Create tags
- [ ] Assign tags to cards
- [ ] Tag autocomplete
- [ ] Tag management page
- [ ] Filter cards by tag
- [ ] Tag colors
- [ ] Tag statistics

**Priority**: LOW
**Estimated Time**: 1-2 days

---

## 🎨 Phase 8: Polish & UX

### User Experience
- [ ] Loading skeletons
- [ ] Error boundaries
- [ ] Toast notifications (success/error)
- [ ] Smooth transitions
- [ ] Optimistic updates
- [ ] Offline support (PWA)

### Accessibility
- [ ] ARIA labels
- [ ] Keyboard navigation
- [ ] Screen reader support
- [ ] Focus indicators
- [ ] Color contrast (WCAG AA)

### Performance
- [ ] Image optimization
- [ ] Code splitting
- [ ] Lazy loading
- [ ] Caching strategy
- [ ] Bundle size optimization

**Priority**: MEDIUM
**Estimated Time**: 2-3 days

---

## 🌟 Phase 9: Advanced Features

### Collaboration
- [ ] Share deck (public link)
- [ ] Import shared deck
- [ ] Community decks marketplace
- [ ] Deck ratings & reviews

### AI Features
- [ ] Generate mnemonic hints (OpenAI)
- [ ] Auto-generate cards from text
- [ ] Image OCR for cards
- [ ] Smart card suggestions

### Gamification
- [ ] Achievement system
- [ ] Daily challenges
- [ ] Leaderboards
- [ ] Experience points (XP)
- [ ] Level system

**Priority**: LOW (Future)
**Estimated Time**: Each feature 1-3 days

---

## 🔧 Phase 10: DevOps & Maintenance

### Testing
- [ ] Unit tests (Vitest)
- [ ] Integration tests (Playwright)
- [ ] E2E tests
- [ ] Test coverage >80%

### CI/CD
- [ ] GitHub Actions
- [ ] Automated tests
- [ ] Automated deployments
- [ ] Environment previews

### Monitoring
- [ ] Error tracking (Sentry)
- [ ] Analytics (Vercel Analytics)
- [ ] Performance monitoring
- [ ] User feedback widget

**Priority**: MEDIUM
**Estimated Time**: 2-3 days

---

## 🎯 Suggested Next Steps

### Immediate (This Week)
1. **Authentication** - Get users able to sign up and log in
2. **Deck CRUD** - Let users create and manage decks
3. **Basic Card CRUD** - Add/edit/delete cards

### Short Term (Next 2 Weeks)
4. **Study Mode** - Core learning functionality
5. **SRS Integration** - Connect SM-2 algorithm
6. **Basic Stats** - Show progress

### Medium Term (Next Month)
7. **Advanced Study Features** - Keyboard shortcuts, settings
8. **Analytics Dashboard** - Charts and visualizations
9. **Polish & UX** - Make it beautiful and smooth

### Long Term (2-3 Months)
10. **Tags & Organization**
11. **Advanced Features** - AI, sharing, gamification
12. **Mobile App** - React Native or PWA

---

## 💡 Feature Ideas (Backlog)

- [ ] Dark/Light/Auto theme switcher
- [ ] Multiple languages support
- [ ] Audio pronunciation (text-to-speech)
- [ ] Markdown support in cards
- [ ] LaTeX math equations
- [ ] Code syntax highlighting
- [ ] Anki import/export
- [ ] Browser extension
- [ ] Desktop app (Electron)
- [ ] Spaced repetition variants (Leitner, FSRS)
- [ ] Custom card templates
- [ ] Notion integration
- [ ] Obsidian plugin

---

## 📌 Notes

### Current State
The scaffolding is complete! You have:
- ✅ Working Next.js app with Turbopack
- ✅ Supabase setup ready
- ✅ Database schema designed
- ✅ SM-2 algorithm implemented
- ✅ Romanian UI translations defined
- ✅ Beautiful landing page
- ✅ Complete documentation

### What's Ready to Build
Everything is in place to start building features. The foundation is solid:
- Type-safe with TypeScript
- Beautiful UI with shadcn/ui
- Secure backend with Supabase RLS
- Smart learning with SM-2

### Development Approach
**Recommended**: Build vertically, not horizontally
- ✅ Complete one full feature end-to-end
- ❌ Build all backends, then all frontends

Example: Auth → Decks → Cards → Study (in that order)

---

**Ready to code? Start with Phase 2: Authentication!** 🚀

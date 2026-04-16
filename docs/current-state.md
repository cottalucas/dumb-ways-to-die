# SteadyStep — Current State

## Status
Prototype functional with Firebase backend. All 8 screens reachable. Builds and runs without errors.

## What's Built
- Onboarding (2-step: welcome + setup) — writes profile to Firestore on submit, seeds demo progress data
- Home (greeting, AI card, session card, streak bar, balance check entry) — weekly streak from Firestore
- Exercises (session list + all 6 exercises with detail bottom sheet) — static data (no user state)
- Exercise Session (overview → active → transition → complete) — logs session to Firestore on complete
- Chat (real-time Firestore messages, quick-reply chips, scripted AI responses, seeded on first visit)
- Progress (balance score, bar chart, sway trend, milestones, recent sessions) — all from Firestore
- Balance Check (intro → 30s countdown → results) — logs sway score to Firestore on complete
- Profile (name edit, reminders toggle, privacy screen, reset) — name/confidence edits write to Firestore

## Firebase Integration
- **Project:** dumb-ways-to-die-81794
- **Auth:** Anonymous (UUID in localStorage, key `steadystep_user_id`)
- **Collections:** `users/{userId}` + subcollections: `sessions`, `balanceChecks`, `weeklyProgress`, `chatMessages`
- **Seeding:** `createProfile()` seeds 4 weeks of weekly progress + 3 balance checks from mock data
- **Exercise library:** `exercises/` top-level collection — seed with `src/scripts/seedExercises.ts`
- **Security rules:** Must be applied manually in Firebase console (see Step 8 in integration spec)

## Deployment
- **Firebase Hosting:** https://dumb-ways-to-die-81794.web.app (primary)
- **Config files:** `firebase.json` (public: dist, SPA rewrite), `.firebaserc` (project: dumb-ways-to-die-81794)
- **Deploy command:** `npm run build && firebase deploy --only hosting`

## Known Issues
- Firestore security rules have not been applied yet — default rules may block reads/writes after trial period
- Exercise library (`exercises/` collection) has not been seeded — `exerciseService.getExercises()` exists but screens still read from `src/data/exercises.ts` directly

## What's Next
- Apply Firestore security rules in Firebase console
- Seed exercise library if needed for future dynamic exercise loading

## Design System Tokens
- **text-primary:** `#1E293B`
- **text-secondary:** `#475569` (darkened from #64748B for WCAG AA compliance)
- **text-muted:** `#64748B` (darkened from #94A3B8 — old value failed contrast entirely)
- **Button default:** h-16 (64px), text-lg
- **Button sm:** h-14 (56px), text-base
- **Input:** h-16 (64px), text-xl, border-2 always (no ring)
- **Card padding:** p-6
- **TabBar:** h-[84px], icons 28px, labels 13px
- **AppShell bottom padding:** pb-[84px] (matches TabBar height)
- **AppShell layout split:** `showTabBar=true` → scroll container with pb-[84px] on inner div; `showTabBar=false` → flex-1 flex flex-col (screens use flex-1 to fill frame)

## Session Log

### 2026-04-16 (session 1)
- Fixed Onboarding CTA pinning bug on both steps.
  - Step 1 (Welcome): changed outer container from `min-h-screen` to `h-screen`, moved "Get Started" button and disclaimer outside the scrollable `flex-1 overflow-y-auto` div into a `pb-8 pt-3 bg-surface` footer.
  - Step 2 (Setup): same treatment — back arrow and CTA footer are now `flex-shrink-0` siblings of the scrollable content, not inside it.
- Created this file (`docs/current-state.md`).

### 2026-04-16 (session 2)
- Integrated Firebase Firestore across the full app.
- New files: `src/lib/firebase.ts`, `src/lib/userId.ts`, `src/services/{user,session,balance,progress,chat,exercise}Service.ts`, `src/scripts/seedExercises.ts`, `docs/firebase-schema.md`.
- `UserContext` rewritten: loads profile from Firestore on mount, exposes `loading` boolean, `completeOnboarding()` (atomic write), `setName`/`setBalanceConfidence` (partial updates).
- `App.tsx`: shows branded loading screen while profile loads to prevent redirect flash.
- `Onboarding`: uses `completeOnboarding()` — single Firestore write with all three values.
- `Home`: weekly streak from Firestore, falls back to mock if empty.
- `ExerciseSession`: calls `logSession()` on completion.
- `Progress`: all data from Firestore (weeklyProgress, balanceChecks, sessions); falls back to mock if empty; pulse skeleton loading states.
- `Chat`: replaced local state with `subscribeToMessages()` real-time listener; seeds greeting messages on first visit; `addMessage()` on every send.
- `BalanceCheck`: calls `logBalanceCheck()` with simulated score on completion.
- `BalanceScoreCard`: refactored to accept `weeklyData` as prop (no longer reads mock directly).
- Privacy copy in Profile updated to accurately reflect Firebase usage.

### 2026-04-16 (session 3)
- Fixed layout system: all screens use `flex-1 flex flex-col` instead of `h-screen`/`min-h-screen`.
- AppShell split into two modes: scrollable (showTabBar) uses scroll container with inner `pb-[84px]`; full-height (no TabBar) uses `flex-1 flex flex-col` so screens fill the frame via `flex-1`.
- Added Firebase Hosting: `firebase.json`, `.firebaserc` — live at https://dumb-ways-to-die-81794.web.app
- Accessibility pass for elderly users (65+):
  - Text contrast tokens darkened (text-secondary `#475569`, text-muted `#64748B`) — all pass WCAG AA
  - Button heights increased: default 64px (h-16, text-lg), sm 56px (h-14, text-base)
  - Input height 64px (h-16), text-xl; fixed unequal border (border-2 always, no ring)
  - Card padding p-5 → p-6
  - TabBar: h-[84px], icons 28px, labels 13px
  - Profile: row tap targets py-5, icons 22px, toggle h-9 w-16 with aria role=switch, text-lg rows
  - Home: "Chat with me" text link replaced with full-width tappable pill button
  - Onboarding: Yes/No fallen buttons h-16, text-lg

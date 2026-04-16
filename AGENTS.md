# SteadyStep — Agent Orientation

Mobile-first demo prototype of a fall-prevention app for Swiss seniors 65+. Shown on a phone during a dinner with a potential clinical co-founder. Must feel polished and credible.

## Read first
1. `docs/PRD.md` — product context
2. `docs/prototype-spec.md` — every screen, every interaction
3. `docs/design-system.md` — full visual system
4. `docs/data-mocks.md` — all mock data

## Hard constraints
- No backend. All data in `src/data/`.
- Mobile viewport only. 390x844px. Desktop = centered phone frame.
- Senior accessibility: 14px min text, 48px min tap targets, WCAG AA.
- English only.
- No authentication.

## Build order
1. App shell + routing + tab bar
2. Home
3. Exercise session flow
4. Progress dashboard
5. AI chat
6. Balance check
7. Onboarding

## Done
A Vercel URL that opens on a phone, lets user navigate all 8 screens, complete an exercise session, chat with AI, view progress, run balance check. No bugs, no console errors, no Lorem Ipsum.

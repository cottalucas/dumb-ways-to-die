# SteadyStep

A mobile-first demo prototype for a fall-prevention exercise app targeting Swiss seniors (65+).

## What this is

SteadyStep is a prototype built for a clinical co-founder meeting. It demonstrates a full exercise and balance app flow — onboarding, exercise sessions, AI companion chat, progress tracking, and a simulated balance check. All data is mocked; there is no backend.

## Running locally

```bash
npm install
npm run dev
```

Open `http://localhost:5173` in your browser. On desktop it renders in a phone frame. On a real phone it fills the screen.

## Deploying to Vercel

1. Push this repo to GitHub
2. Connect to Vercel and import the repo
3. Vercel will auto-detect Vite — no configuration needed
4. Deploy

The `vercel.json` includes an SPA rewrite rule so all routes resolve correctly.

## Stack

- **Vite + React + TypeScript**
- **Tailwind CSS v3** — custom design tokens
- **React Router v6** — HashRouter for static deployment
- **Recharts** — progress charts
- **Lucide React** — icons
- **Source Serif 4 + DM Sans** — typography

## Note

This is a prototype only, not intended for production or medical use. Always consult a healthcare professional for exercise guidance.

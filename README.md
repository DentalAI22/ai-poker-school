# AI Poker School

**AI is beating the best. Why not train with the best?**

The world's most advanced AI poker coach. Master GTO strategy across 25+ game types.

## Features

- **AI Coach Andrew** — Chat with an AI poker coach trained on strategies of Doyle Brunson, Phil Ivey, and modern GTO theorists
- **Interactive Poker Table** — Play hands with real-time coaching and GTO analysis
- **25+ Poker Variants** — From No-Limit Hold'em to Badugi, learn every game
- **GTO Trainer** — Study preflop charts and quiz yourself on optimal play
- **Poker History** — Timeline of poker from 1800s saloons to the AI era
- **Tournament Tracker** — Track your tournament results and ROI
- **Bankroll Management** — Smart bankroll recommendations and tracking
- **Trivia** — 100+ poker trivia questions across 6 categories

## Tech Stack

- **Frontend:** Next.js 14+ (App Router), TypeScript, Tailwind CSS v4
- **AI:** Anthropic Claude API (Coach Andrew)
- **Voice:** ElevenLabs TTS
- **Database:** Supabase (PostgreSQL + Auth)
- **Hosting:** Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/DentalAI22/ai-poker-school.git
cd ai-poker-school
npm install
```

### Environment Setup

Copy `.env.example` to `.env.local` and fill in your API keys:

```bash
cp .env.example .env.local
```

Required environment variables:
- `ANTHROPIC_API_KEY` — Get from [console.anthropic.com](https://console.anthropic.com)
- `NEXT_PUBLIC_SUPABASE_URL` — From your Supabase project
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — From your Supabase project
- `SUPABASE_SERVICE_ROLE_KEY` — From your Supabase project settings
- `ELEVENLABS_API_KEY` — From [elevenlabs.io](https://elevenlabs.io)
- `ELEVENLABS_VOICE_ID` — Default: `DXFkLCBUTmvXpp2QwZjA`

### Database Setup

Run the SQL in `supabase-schema.sql` in your Supabase SQL editor to create all tables.

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build

```bash
npm run build
```

### Deploy

Deploy to Vercel:

```bash
npx vercel
```

## Project Structure

```
src/
  app/           — Next.js App Router pages
  components/    — React components
    poker-table/ — Interactive poker table
    coach/       — Chat interface
    ui/          — Shared UI components
  lib/           — Core logic
    poker-engine.ts     — Game engine (9 variants)
    gto-solver.ts       — GTO decision engine
    hand-evaluator.ts   — Hand evaluation
    range-calculator.ts — Range parsing & equity
    icm-calculator.ts   — ICM for tournaments
    bankroll-calculator.ts — Bankroll math
  data/          — Static data
    poker-variants.ts   — 25+ variant definitions
    gto-charts.ts       — Preflop GTO charts
    poker-history.ts    — Historical content
    trivia-questions.ts — 100+ trivia questions
```

## Disclaimer

AI Poker School is for educational simulation purposes only. No real money wagering.

## License

Private — All rights reserved.

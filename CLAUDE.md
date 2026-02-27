# AI Poker School — aipokerschool.com

## What is this?
AI-powered poker education platform. AI coach "Andrew" teaches GTO strategy across 25+ poker variants with an interactive poker table, progress tracking, and bankroll management.

## Tech Stack
Next.js 14+ (App Router), TypeScript, Tailwind CSS v4, Supabase, Anthropic Claude API, ElevenLabs TTS, Vercel

## Key Architecture
- /src/app/ — Next.js App Router pages
- /src/components/poker-table/ — Interactive poker table with React rendering
- /src/components/coach/ — Andrew chat interface and voice integration
- /src/lib/poker-engine.ts — Core poker game logic (9 variants)
- /src/lib/gto-solver.ts — GTO decision engine with preflop charts
- /src/lib/hand-evaluator.ts — Hand evaluation (high, low, razz, 2-7, badugi, short deck)
- /src/lib/range-calculator.ts — Hand range parsing and equity calculation
- /src/lib/icm-calculator.ts — ICM for tournament play
- /src/lib/bankroll-calculator.ts — Bankroll management math
- /src/data/ — Poker variants, history, trivia, GTO charts, famous hands, prop bets

## AI Coach: Andrew
- System prompt in /src/app/api/chat/route.ts
- Voice ID: DXFkLCBUTmvXpp2QwZjA (ElevenLabs)
- Personality: Confident poker pro, GTO-focused, knows all history
- Tracks user patterns, identifies leaks, personalizes coaching
- Model: claude-sonnet-4-20250514

## API Routes
- /api/chat — Chat with Andrew (Anthropic Claude)
- /api/tts — Text-to-speech (ElevenLabs)
- /api/hand-analysis — Hand analysis with GTO scoring

## Important Rules
- NO real money gambling features — educational simulation only
- Disclaimer must appear on landing page and table
- GTO is the foundation of all coaching
- Andrew never gives actual financial advice
- All poker content is original synthesis, not copied from books

## Design
- Dark premium casino feel: dark green felt, gold accents, deep blacks
- Tailwind v4 with custom theme (felt, gold, dark-bg colors)
- Fonts: Inter (sans), Playfair Display (serif headings)
- Custom CSS: bg-felt, btn-gold, btn-felt, card-gold-border, text-gold-gradient

## Monetization
- Free: 3 chats/day, 5 hands/day, read-only access
- Pro: $9.99/mo or $99/yr — unlimited everything

## Database
- Supabase with schema in /supabase-schema.sql
- RLS policies for user data protection

## Environment Variables
See .env.example for required variables

## Git: DentalAI22/ai-poker-school
## Domain: aipokerschool.com (GoDaddy → Vercel)

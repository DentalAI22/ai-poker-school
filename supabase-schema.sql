-- AI Poker School — Supabase Database Schema
-- Run this in your Supabase SQL editor to create all tables

-- Users
create table if not exists users (
  id uuid references auth.users primary key,
  email text,
  username text unique,
  display_name text,
  player_type text,
  skill_level text default 'beginner',
  preferred_game text default 'no_limit_holdem',
  bankroll_total decimal default 0,
  bankroll_currency text default 'USD',
  subscription_tier text default 'free',
  subscription_expires_at timestamptz,
  hands_played integer default 0,
  coaching_sessions integer default 0,
  ai_sessions_today integer default 0,
  gto_accuracy_score decimal default 0,
  streak_days integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Hand History
create table if not exists hand_history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  variant text not null,
  game_type text not null,
  blinds text,
  ante decimal default 0,
  position text,
  hole_cards text[],
  community_cards text[],
  actions jsonb,
  result text,
  pot_size decimal,
  profit_loss decimal,
  gto_score decimal,
  coach_notes text,
  mistakes jsonb,
  created_at timestamptz default now()
);

-- Coaching Sessions
create table if not exists coaching_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  session_type text,
  messages jsonb,
  duration_seconds integer,
  key_takeaways text[],
  created_at timestamptz default now()
);

-- User Progress / Stats
create table if not exists user_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  variant text,
  total_hands integer default 0,
  gto_accuracy decimal default 0,
  preflop_accuracy decimal default 0,
  flop_accuracy decimal default 0,
  turn_accuracy decimal default 0,
  river_accuracy decimal default 0,
  biggest_leak text,
  common_mistakes text[],
  skill_rating integer default 1000,
  updated_at timestamptz default now()
);

-- Tournament Tracker
create table if not exists tournament_tracker (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  tournament_name text,
  venue text,
  date timestamptz,
  buy_in decimal,
  game_type text,
  entries integer,
  finish_position integer,
  prize_won decimal,
  notes text,
  created_at timestamptz default now()
);

-- Bankroll Ledger
create table if not exists bankroll_ledger (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  entry_type text,
  amount decimal,
  description text,
  balance_after decimal,
  created_at timestamptz default now()
);

-- Waitlist
create table if not exists waitlist (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  player_type text,
  experience_level text,
  favorite_game text,
  created_at timestamptz default now()
);

-- Row Level Security Policies
alter table users enable row level security;
alter table hand_history enable row level security;
alter table coaching_sessions enable row level security;
alter table user_progress enable row level security;
alter table tournament_tracker enable row level security;
alter table bankroll_ledger enable row level security;

-- Users can read/update their own profile
create policy "Users can view own profile" on users
  for select using (auth.uid() = id);
create policy "Users can update own profile" on users
  for update using (auth.uid() = id);

-- Users can manage their own hand history
create policy "Users can view own hands" on hand_history
  for select using (auth.uid() = user_id);
create policy "Users can insert own hands" on hand_history
  for insert with check (auth.uid() = user_id);

-- Users can manage their own coaching sessions
create policy "Users can view own sessions" on coaching_sessions
  for select using (auth.uid() = user_id);
create policy "Users can insert own sessions" on coaching_sessions
  for insert with check (auth.uid() = user_id);

-- Users can manage their own progress
create policy "Users can view own progress" on user_progress
  for select using (auth.uid() = user_id);
create policy "Users can update own progress" on user_progress
  for update using (auth.uid() = user_id);
create policy "Users can insert own progress" on user_progress
  for insert with check (auth.uid() = user_id);

-- Users can manage their own tournaments
create policy "Users can view own tournaments" on tournament_tracker
  for select using (auth.uid() = user_id);
create policy "Users can insert own tournaments" on tournament_tracker
  for insert with check (auth.uid() = user_id);
create policy "Users can update own tournaments" on tournament_tracker
  for update using (auth.uid() = user_id);
create policy "Users can delete own tournaments" on tournament_tracker
  for delete using (auth.uid() = user_id);

-- Users can manage their own bankroll
create policy "Users can view own bankroll" on bankroll_ledger
  for select using (auth.uid() = user_id);
create policy "Users can insert own bankroll" on bankroll_ledger
  for insert with check (auth.uid() = user_id);

-- Waitlist is insert-only for anyone
create policy "Anyone can join waitlist" on waitlist
  for insert with check (true);

-- Create updated_at trigger
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger users_updated_at
  before update on users
  for each row execute function update_updated_at();

create trigger user_progress_updated_at
  before update on user_progress
  for each row execute function update_updated_at();

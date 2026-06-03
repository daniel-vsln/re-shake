-- ============================================================
-- Migration: initial_schema
-- Tables: categories, ingredients, cocktails, cocktail_categories,
--         cocktail_ingredients, profiles, user_cocktail_progress,
--         training_sessions, collections, collection_cocktails
-- ============================================================

-- CATEGORIES
create table categories (
  id         text primary key,
  label      text not null,
  sort_order int  not null default 0
);

insert into categories (id, label, sort_order) values
  ('classics',     'Classics',     0),
  ('contemporary', 'Contemporary', 1),
  ('sours',        'Sours',        2),
  ('highballs',    'Highballs',    3),
  ('low-abv',      'Low ABV',      4),
  ('shots',        'Shots',        5);

-- INGREDIENTS
create table ingredients (
  id        text primary key,
  name      text not null,
  category  text not null,  -- 'spirit' | 'liqueur' | 'juice' | 'sweetener' | 'bitters' | 'wine' | 'other'
  image_url text,           -- Supabase Storage public URL
  color     text,           -- hex, e.g. '#c8e6ff'
  unit      text not null   -- 'ml' | 'dash' | 'tsp' | 'oz'
);

-- COCKTAILS
create table cocktails (
  id          text primary key,
  name        text        not null,
  difficulty  text        not null check (difficulty in ('easy', 'medium', 'hard')),
  prep_time   text,
  abv         numeric(4, 1),
  image       text,
  glass       text,
  method      text,
  garnish     text,
  notes       text,
  tags        text[],
  is_public   boolean     not null default true,
  cloned_from text        references cocktails (id),
  created_by  uuid        references auth.users (id),
  created_at  timestamptz not null default now()
);

-- COCKTAIL ↔ CATEGORIES (many-to-many)
create table cocktail_categories (
  cocktail_id text references cocktails (id)  on delete cascade,
  category_id text references categories (id) on delete restrict,
  primary key (cocktail_id, category_id)
);

-- COCKTAIL ↔ INGREDIENTS
create table cocktail_ingredients (
  id            bigint generated always as identity primary key,
  cocktail_id   text           not null references cocktails (id)   on delete cascade,
  ingredient_id text           not null references ingredients (id) on delete restrict,
  amount        numeric(6, 1)  not null,
  -- unit is inherited from ingredients.unit; add unit_override here if ever needed
  sort_order    int            not null default 0
);

-- PROFILES (mirrors auth.users; created automatically via trigger in 003_functions)
create table profiles (
  id         uuid        primary key references auth.users (id) on delete cascade,
  username   text        unique,
  avatar_url text,
  created_at timestamptz not null default now()
);

-- USER PROGRESS per cocktail
create table user_cocktail_progress (
  id               bigint      generated always as identity primary key,
  user_id          uuid        not null references profiles (id) on delete cascade,
  cocktail_id      text        not null references cocktails (id) on delete cascade,
  mastery_percent  int         not null default 0,
  stars            smallint    not null default 0 check (stars between 0 and 3),
  is_favorite      boolean     not null default false,
  attempts_count   int         not null default 0,
  best_score       int         not null default 0,
  last_trained_at  timestamptz,
  unique (user_id, cocktail_id)
);

-- TRAINING SESSION LOG
create table training_sessions (
  id                    bigint      generated always as identity primary key,
  user_id               uuid        not null references profiles (id) on delete cascade,
  cocktail_id           text        not null references cocktails (id) on delete cascade,
  score                 int         not null,
  ingredient_score      numeric(5, 2),
  measurement_score     numeric(5, 2),
  serving_correct       boolean,
  selected_ingredients  text[],
  measurements          jsonb,      -- { "gin": 45, "campari": 30 }
  serving_glass         text,
  serving_method        text,
  completed_at          timestamptz not null default now()
);

-- COLLECTIONS
create table collections (
  id          bigint      generated always as identity primary key,
  user_id     uuid        not null references profiles (id) on delete cascade,
  name        text        not null,
  description text,
  cover_image text,
  is_public   boolean     not null default false,
  created_at  timestamptz not null default now()
);

-- COLLECTION ↔ COCKTAILS (many-to-many)
create table collection_cocktails (
  collection_id bigint      not null references collections (id) on delete cascade,
  cocktail_id   text        not null references cocktails (id)   on delete cascade,
  added_at      timestamptz not null default now(),
  primary key (collection_id, cocktail_id)
);

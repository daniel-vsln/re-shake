-- ============================================================
-- Migration: rls
-- Enable Row Level Security and define access policies
-- ============================================================

alter table categories             enable row level security;
alter table ingredients            enable row level security;
alter table cocktails              enable row level security;
alter table cocktail_categories    enable row level security;
alter table cocktail_ingredients   enable row level security;
alter table profiles               enable row level security;
alter table user_cocktail_progress enable row level security;
alter table training_sessions      enable row level security;
alter table collections            enable row level security;
alter table collection_cocktails   enable row level security;

-- ── REFERENCE TABLES: public read ──────────────────────────

create policy "public read" on categories
  for select using (true);

create policy "public read" on ingredients
  for select using (true);

-- cocktail_categories / cocktail_ingredients follow cocktail visibility
create policy "read via cocktail" on cocktail_categories
  for select using (
    exists (
      select 1 from cocktails c
      where c.id = cocktail_id
        and (c.is_public = true or c.created_by = auth.uid())
    )
  );

create policy "read via cocktail" on cocktail_ingredients
  for select using (
    exists (
      select 1 from cocktails c
      where c.id = cocktail_id
        and (c.is_public = true or c.created_by = auth.uid())
    )
  );

-- ── COCKTAILS ──────────────────────────────────────────────

create policy "read cocktails" on cocktails
  for select using (is_public = true or auth.uid() = created_by);

create policy "insert cocktail" on cocktails
  for insert with check (auth.uid() = created_by);

create policy "update own cocktail" on cocktails
  for update using (auth.uid() = created_by);

create policy "delete own cocktail" on cocktails
  for delete using (auth.uid() = created_by);

-- owners can manage their cocktail's ingredients and categories
create policy "write via cocktail" on cocktail_categories
  for all using (
    exists (
      select 1 from cocktails c
      where c.id = cocktail_id and c.created_by = auth.uid()
    )
  );

create policy "write via cocktail" on cocktail_ingredients
  for all using (
    exists (
      select 1 from cocktails c
      where c.id = cocktail_id and c.created_by = auth.uid()
    )
  );

-- ── USER DATA: own rows only ────────────────────────────────

create policy "own profile" on profiles
  for all using (auth.uid() = id);

create policy "own progress" on user_cocktail_progress
  for all using (auth.uid() = user_id);

create policy "own sessions" on training_sessions
  for all using (auth.uid() = user_id);

-- ── COLLECTIONS ─────────────────────────────────────────────

create policy "read collections" on collections
  for select using (is_public = true or auth.uid() = user_id);

create policy "write collections" on collections
  for all using (auth.uid() = user_id);

create policy "own collection_cocktails" on collection_cocktails
  for all using (
    auth.uid() = (select user_id from collections where id = collection_id)
  );

-- ============================================================
-- Migration: functions
-- Triggers and stored procedures
-- ============================================================

-- ── AUTO-CREATE PROFILE ON SIGNUP ──────────────────────────

create or replace function handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into profiles (id, avatar_url)
  values (
    new.id,
    new.raw_user_meta_data ->> 'avatar_url'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

-- ── CLONE COCKTAIL (deep copy) ──────────────────────────────
-- Creates a private copy of any visible cocktail for the current user.
-- Call from the app: select clone_cocktail('negroni', 'my-negroni', 'My Negroni')

create or replace function clone_cocktail(
  source_id text,
  new_id    text,
  new_name  text
)
returns text
language plpgsql
security definer set search_path = public
as $$
begin
  -- verify caller can see the source cocktail
  if not exists (
    select 1 from cocktails
    where id = source_id
      and (is_public = true or created_by = auth.uid())
  ) then
    raise exception 'cocktail not found or not accessible';
  end if;

  -- copy recipe row (private by default)
  insert into cocktails
    (id, name, difficulty, prep_time, abv, image, glass, method,
     garnish, notes, tags, is_public, cloned_from, created_by)
  select
    new_id, new_name, difficulty, prep_time, abv, image, glass, method,
    garnish, notes, tags, false, source_id, auth.uid()
  from cocktails
  where id = source_id;

  -- deep copy ingredients
  insert into cocktail_ingredients (cocktail_id, ingredient_id, amount, sort_order)
  select new_id, ingredient_id, amount, sort_order
  from cocktail_ingredients
  where cocktail_id = source_id;

  -- deep copy categories
  insert into cocktail_categories (cocktail_id, category_id)
  select new_id, category_id
  from cocktail_categories
  where cocktail_id = source_id;

  return new_id;
end;
$$;

-- ── RECORD TRAINING RESULT ──────────────────────────────────
-- Writes session log + upserts user_cocktail_progress in one call.

create or replace function record_training_result(
  p_cocktail_id         text,
  p_score               int,
  p_ingredient_score    numeric,
  p_measurement_score   numeric,
  p_serving_correct     boolean,
  p_selected_ingredients text[],
  p_measurements        jsonb,
  p_serving_glass       text,
  p_serving_method      text
)
returns void
language plpgsql
security definer set search_path = public
as $$
declare
  v_stars smallint;
begin
  -- write full session log
  insert into training_sessions (
    user_id, cocktail_id, score, ingredient_score, measurement_score,
    serving_correct, selected_ingredients, measurements,
    serving_glass, serving_method
  ) values (
    auth.uid(), p_cocktail_id, p_score, p_ingredient_score, p_measurement_score,
    p_serving_correct, p_selected_ingredients, p_measurements,
    p_serving_glass, p_serving_method
  );

  -- derive stars
  v_stars := case
    when p_score >= 90 then 3
    when p_score >= 75 then 2
    when p_score >= 50 then 1
    else 0
  end;

  -- upsert progress (keep best results, never downgrade)
  insert into user_cocktail_progress (
    user_id, cocktail_id, mastery_percent, stars,
    attempts_count, best_score, last_trained_at
  ) values (
    auth.uid(), p_cocktail_id, p_score, v_stars,
    1, p_score, now()
  )
  on conflict (user_id, cocktail_id) do update set
    attempts_count  = user_cocktail_progress.attempts_count + 1,
    best_score      = greatest(user_cocktail_progress.best_score,      p_score),
    mastery_percent = greatest(user_cocktail_progress.mastery_percent,  p_score),
    stars           = greatest(user_cocktail_progress.stars,            v_stars),
    last_trained_at = now();
end;
$$;

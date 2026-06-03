-- ============================================================
-- seed.sql — reference data for local development
-- Run automatically by: supabase db reset
-- DO NOT run on production (prod data comes from the app)
-- ============================================================

-- INGREDIENTS (migrated from TrainingFlowClient.tsx ALL_INGREDIENTS)
-- image_url is null until assets are uploaded to Storage

insert into ingredients (id, name, category, color, unit) values
  ('gin',          'Gin',               'spirit',    '#c8e6ff', 'ml'),
  ('campari',      'Campari',           'liqueur',   '#ff3b30', 'ml'),
  ('sweet-vermouth','Sweet Vermouth',   'wine',      '#8b1a1a', 'ml'),
  ('tequila',      'Tequila',           'spirit',    '#f5e6a3', 'ml'),
  ('triple-sec',   'Triple Sec',        'liqueur',   '#ffaa44', 'ml'),
  ('lime-juice',   'Lime Juice',        'juice',     '#c8e63c', 'ml'),
  ('bourbon',      'Bourbon',           'spirit',    '#c0732a', 'ml'),
  ('simple-syrup', 'Simple Syrup',      'sweetener', '#f5d76e', 'ml'),
  ('angostura',    'Angostura Bitters', 'bitters',   '#5c1a00', 'dash'),
  ('vodka',        'Vodka',             'spirit',    '#e8e8e8', 'ml'),
  ('espresso',     'Espresso',          'other',     '#3b1f0a', 'ml'),
  ('kahlua',       'Kahlúa',            'liqueur',   '#5c2c00', 'ml'),
  ('lemon-juice',  'Lemon Juice',       'juice',     '#f5e642', 'ml'),
  ('egg-white',    'Egg White',         'other',     '#fffbf0', 'ml'),
  ('rum',          'Rum',               'spirit',    '#d4a574', 'ml'),
  ('dry-vermouth', 'Dry Vermouth',      'wine',      '#e8dcc8', 'ml'),
  ('cointreau',    'Cointreau',         'liqueur',   '#ff8c00', 'ml')
on conflict (id) do nothing;

-- COCKTAILS (migrated from lib/mock-cocktails.ts)

insert into cocktails (id, name, difficulty, prep_time, abv, image, glass, method, garnish, notes, tags, is_public, created_by) values
  ('negroni',      'Negroni',      'easy',   '3 min',  24.0, '🍊', 'rocks',    'stir',  'Orange peel',  'Stir with ice until well chilled.', array['classic','bitter'],      true, null),
  ('margarita',    'Margarita',    'easy',   '3 min',  15.0, '🍋', 'margarita','shake', 'Lime wheel',   'Shake hard with ice, strain into salted glass.', array['classic','sour'], true, null),
  ('old-fashioned','Old Fashioned','medium', '5 min',  32.0, '🥃', 'rocks',    'stir',  'Orange twist', 'Muddle sugar and bitters before adding bourbon.', array['classic','spirit-forward'], true, null),
  ('espresso-martini','Espresso Martini','medium','4 min',15.0,'☕','martini',  'shake', 'Coffee beans', 'Shake vigorously to create foam.', array['contemporary','coffee'], true, null),
  ('whiskey-sour', 'Whiskey Sour', 'medium', '4 min',  14.0, '🍋', 'rocks',    'shake', 'Cherry',       'Dry shake first, then shake with ice.', array['classic','sour'], true, null)
on conflict (id) do nothing;

-- COCKTAIL ↔ CATEGORIES

insert into cocktail_categories (cocktail_id, category_id) values
  ('negroni',          'classics'),
  ('margarita',        'classics'),
  ('margarita',        'sours'),
  ('old-fashioned',    'classics'),
  ('espresso-martini', 'contemporary'),
  ('whiskey-sour',     'classics'),
  ('whiskey-sour',     'sours')
on conflict do nothing;

-- COCKTAIL INGREDIENTS

insert into cocktail_ingredients (cocktail_id, ingredient_id, amount, sort_order) values
  -- Negroni
  ('negroni', 'gin',           30, 0),
  ('negroni', 'campari',       30, 1),
  ('negroni', 'sweet-vermouth',30, 2),
  -- Margarita
  ('margarita', 'tequila',    45, 0),
  ('margarita', 'cointreau',  20, 1),
  ('margarita', 'lime-juice', 20, 2),
  -- Old Fashioned
  ('old-fashioned', 'bourbon',       60, 0),
  ('old-fashioned', 'angostura',      2, 1),
  ('old-fashioned', 'simple-syrup',  10, 2),
  -- Espresso Martini
  ('espresso-martini', 'vodka',        50, 0),
  ('espresso-martini', 'kahlua',       20, 1),
  ('espresso-martini', 'espresso',     30, 2),
  ('espresso-martini', 'simple-syrup', 10, 3),
  -- Whiskey Sour
  ('whiskey-sour', 'bourbon',      45, 0),
  ('whiskey-sour', 'lemon-juice',  25, 1),
  ('whiskey-sour', 'simple-syrup', 15, 2),
  ('whiskey-sour', 'egg-white',    30, 3)
on conflict do nothing;

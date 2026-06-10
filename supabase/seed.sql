-- ============================================================
-- seed.sql — reference data for local/remote development
-- Run: cat supabase/seed.sql | supabase db query
-- Migration already created the 6 base categories; seed adds 4 more.
-- ============================================================

-- ── CATEGORIES ───────────────────────────────────────────────
insert into categories (id, label, sort_order) values
  ('classics',     'Classics',     0),
  ('contemporary', 'Contemporary', 1),
  ('sours',        'Sours',        2),
  ('highballs',    'Highballs',    3),
  ('low-abv',      'Low ABV',      4),
  ('shots',        'Shots',        5),
  ('tiki',         'Tiki',         6),
  ('from-movies',  'From Movies',  7),
  ('tropical',     'Tropical',     8),
  ('brunch',       'Brunch',       9)
on conflict (id) do update set label = excluded.label, sort_order = excluded.sort_order;

-- ── INGREDIENTS ──────────────────────────────────────────────
insert into ingredients (id, name, category, color, unit) values
  -- Spirits
  ('gin',             'Gin',               'spirit',    '#c8e6ff', 'ml'),
  ('vodka',           'Vodka',             'spirit',    '#e8e8e8', 'ml'),
  ('rum',             'White Rum',         'spirit',    '#f0ead8', 'ml'),
  ('dark-rum',        'Dark Rum',          'spirit',    '#6b3a1f', 'ml'),
  ('overproof-rum',   'Overproof Rum',     'spirit',    '#d4c4a0', 'ml'),
  ('bourbon',         'Bourbon',           'spirit',    '#c0732a', 'ml'),
  ('rye-whiskey',     'Rye Whiskey',       'spirit',    '#b8622a', 'ml'),
  ('scotch',          'Scotch',            'spirit',    '#c4892b', 'ml'),
  ('irish-whiskey',   'Irish Whiskey',     'spirit',    '#c8922e', 'ml'),
  ('cognac',          'Cognac',            'spirit',    '#c07030', 'ml'),
  ('brandy',          'Brandy',            'spirit',    '#b05820', 'ml'),
  ('mezcal',          'Mezcal',            'spirit',    '#e0d68a', 'ml'),
  ('tequila',         'Tequila',           'spirit',    '#f5e6a3', 'ml'),
  ('absinthe',        'Absinthe',          'spirit',    '#7dce6e', 'ml'),
  -- Liqueurs
  ('campari',         'Campari',           'liqueur',   '#ff3b30', 'ml'),
  ('aperol',          'Aperol',            'liqueur',   '#ff6600', 'ml'),
  ('cointreau',       'Cointreau',         'liqueur',   '#ff8c00', 'ml'),
  ('triple-sec',      'Triple Sec',        'liqueur',   '#ffaa44', 'ml'),
  ('kahlua',          'Kahlúa',            'liqueur',   '#5c2c00', 'ml'),
  ('amaretto',        'Amaretto',          'liqueur',   '#8b3a00', 'ml'),
  ('maraschino',      'Maraschino',        'liqueur',   '#dc143c', 'ml'),
  ('chartreuse-green','Green Chartreuse',  'liqueur',   '#7ec850', 'ml'),
  ('chartreuse-yellow','Yellow Chartreuse','liqueur',   '#d4c800', 'ml'),
  ('benedictine',     'Bénédictine',       'liqueur',   '#8b6914', 'ml'),
  ('elderflower',     'Elderflower Liqueur','liqueur',  '#e8f0c0', 'ml'),
  ('creme-de-violette','Crème de Violette','liqueur',   '#6a0dad', 'ml'),
  ('creme-de-menthe', 'Crème de Menthe',   'liqueur',   '#00a550', 'ml'),
  ('creme-de-cacao',  'Crème de Cacao',    'liqueur',   '#f0ead8', 'ml'),
  ('galliano',        'Galliano',          'liqueur',   '#e8c800', 'ml'),
  ('baileys',         'Baileys',           'liqueur',   '#c8a040', 'ml'),
  ('fernet',          'Fernet-Branca',     'liqueur',   '#2a4a1a', 'ml'),
  ('blue-curacao',    'Blue Curaçao',      'liqueur',   '#0080ff', 'ml'),
  ('peach-schnapps',  'Peach Schnapps',    'liqueur',   '#ffcc80', 'ml'),
  ('cherry-brandy',   'Cherry Brandy',     'liqueur',   '#8b1a2a', 'ml'),
  ('chambord',        'Chambord',          'liqueur',   '#8b0050', 'ml'),
  ('falernum',        'Falernum',          'liqueur',   '#f0d890', 'ml'),
  ('allspice-dram',   'Allspice Dram',     'liqueur',   '#6b2800', 'ml'),
  ('suze',            'Suze',              'liqueur',   '#f0d820', 'ml'),
  ('creme-de-cassis', 'Crème de Cassis',   'liqueur',   '#5a0030', 'ml'),
  -- Wine / Fortified
  ('sweet-vermouth',  'Sweet Vermouth',    'wine',      '#8b1a1a', 'ml'),
  ('dry-vermouth',    'Dry Vermouth',      'wine',      '#e8dcc8', 'ml'),
  ('champagne',       'Champagne',         'wine',      '#f5f0c0', 'ml'),
  ('prosecco',        'Prosecco',          'wine',      '#f0ece0', 'ml'),
  ('lillet-blanc',    'Lillet Blanc',      'wine',      '#f0e8b0', 'ml'),
  ('sherry',          'Dry Sherry',        'wine',      '#c08040', 'ml'),
  ('red-wine',        'Red Wine',          'wine',      '#5a0a1a', 'ml'),
  -- Bitters
  ('angostura',       'Angostura Bitters', 'bitters',   '#5c1a00', 'dash'),
  ('peychauds',       'Peychaud''s Bitters','bitters',  '#c50000', 'dash'),
  -- Juices
  ('lime-juice',      'Lime Juice',        'juice',     '#c8e63c', 'ml'),
  ('lemon-juice',     'Lemon Juice',       'juice',     '#f5e642', 'ml'),
  ('orange-juice',    'Orange Juice',      'juice',     '#ff8c00', 'ml'),
  ('grapefruit-juice','Grapefruit Juice',  'juice',     '#ff6040', 'ml'),
  ('cranberry-juice', 'Cranberry Juice',   'juice',     '#8b0000', 'ml'),
  ('pineapple-juice', 'Pineapple Juice',   'juice',     '#f5e040', 'ml'),
  ('tomato-juice',    'Tomato Juice',      'juice',     '#cc2a14', 'ml'),
  ('watermelon-juice','Watermelon Juice',  'juice',     '#ff5060', 'ml'),
  ('cucumber-juice',  'Cucumber Juice',    'juice',     '#90d890', 'ml'),
  -- Sweeteners
  ('simple-syrup',    'Simple Syrup',      'sweetener', '#f5d76e', 'ml'),
  ('honey-syrup',     'Honey Syrup',       'sweetener', '#f0b040', 'ml'),
  ('agave-syrup',     'Agave Syrup',       'sweetener', '#d4e840', 'ml'),
  ('orgeat',          'Orgeat',            'sweetener', '#f0e0b0', 'ml'),
  ('grenadine',       'Grenadine',         'sweetener', '#cc2244', 'ml'),
  ('passion-fruit-syrup','Passion Fruit Syrup','sweetener','#ff6600','ml'),
  ('raspberry-syrup', 'Raspberry Syrup',   'sweetener', '#cc2244', 'ml'),
  ('ginger-syrup',    'Ginger Syrup',      'sweetener', '#d0b050', 'ml'),
  -- Other
  ('egg-white',       'Egg White',         'other',     '#fffbf0', 'ml'),
  ('espresso',        'Espresso',          'other',     '#3b1f0a', 'ml'),
  ('cream',           'Heavy Cream',       'other',     '#fffaf5', 'ml'),
  ('coconut-cream',   'Coconut Cream',     'other',     '#fff8e8', 'ml'),
  ('soda-water',      'Soda Water',        'other',     '#e8f4ff', 'ml'),
  ('tonic-water',     'Tonic Water',       'other',     '#e0ecd0', 'ml'),
  ('ginger-beer',     'Ginger Beer',       'other',     '#c8a850', 'ml'),
  ('cola',            'Cola',              'other',     '#4a2800', 'ml'),
  ('beer',            'Beer',              'other',     '#f0c840', 'ml'),
  ('mint',            'Fresh Mint',        'other',     '#90ee90', 'sprig'),
  ('peach-puree',     'Peach Purée',       'other',     '#ffb850', 'ml'),
  ('strawberry-puree','Strawberry Purée',  'other',     '#cc3344', 'ml'),
  ('mango-puree',     'Mango Purée',       'other',     '#ffa040', 'ml'),
  ('passion-fruit-puree','Passion Fruit Purée','other', '#ff8030', 'ml'),
  ('worcestershire',  'Worcestershire',    'other',     '#3b2800', 'ml'),
  ('tabasco',         'Tabasco',           'other',     '#cc0000', 'ml'),
  ('horseradish',     'Horseradish',       'other',     '#f0e8e0', 'tsp')
on conflict (id) do update
  set name     = excluded.name,
      category = excluded.category,
      color    = excluded.color,
      unit     = excluded.unit;

-- ── COCKTAILS ─────────────────────────────────────────────────
insert into cocktails (id, name, difficulty, prep_time, abv, image, glass, method, garnish, notes, tags, is_public, created_by) values
  -- CLASSICS
  ('negroni',           'Negroni',            'easy',   '3 min',  24.0, '🍊', 'rocks',         'stir',  'Orange peel',           'Stir 30 sec over ice. Express orange peel over glass.',              array['stirred','bitter','classic'],           true, null),
  ('margarita',         'Margarita',          'easy',   '4 min',  14.0, '🍋', 'margarita',     'shake', 'Salt rim + lime wheel',  'Shake hard with ice. Strain into salt-rimmed glass.',               array['shaken','sour','classic'],              true, null),
  ('old-fashioned',     'Old Fashioned',      'medium', '5 min',  32.0, '🥃', 'rocks',         'stir',  'Orange peel + cherry',   'Muddle sugar with bitters, add bourbon, stir over ice.',            array['stirred','spirit-forward','classic'],    true, null),
  ('whiskey-sour',      'Whiskey Sour',       'easy',   '4 min',  15.0, '🍋', 'rocks',         'shake', 'Orange + cherry',        'Dry shake first if using egg white, then shake with ice.',          array['shaken','sour','egg'],                  true, null),
  ('daiquiri',          'Daiquiri',           'easy',   '3 min',  20.0, '🍸', 'coupe',         'shake', 'Lime wheel',             'Shake with ice and double strain into chilled coupe.',              array['shaken','sour','rum','classic'],         true, null),
  ('manhattan',         'Manhattan',          'medium', '4 min',  28.0, '🍸', 'coupe',         'stir',  'Brandied cherry',        'Stir 30 sec over ice. Strain into chilled coupe.',                  array['stirred','whiskey','classic'],           true, null),
  ('martini',           'Dry Martini',        'medium', '3 min',  30.0, '🍸', 'martini',       'stir',  'Lemon twist or olive',   'Stir with ice until very cold. Strain into chilled glass.',         array['stirred','spirit-forward','classic'],    true, null),
  ('gimlet',            'Gimlet',             'easy',   '3 min',  22.0, '🍸', 'coupe',         'shake', 'Lime wheel',             'Shake vigorously with ice and double strain.',                      array['shaken','sour','gin','classic'],         true, null),
  ('sidecar',           'Sidecar',            'medium', '4 min',  25.0, '🍸', 'coupe',         'shake', 'Sugar rim + lemon peel', 'Shake hard. Strain into sugar-rimmed coupe.',                       array['shaken','sour','cognac','classic'],      true, null),
  ('mojito',            'Mojito',             'medium', '5 min',  12.0, '🌿', 'highball',      'build', 'Mint sprig + lime',      'Muddle mint with lime and syrup. Add rum, fill with soda.',         array['built','fresh','rum','classic'],         true, null),
  ('sazerac',           'Sazerac',            'hard',   '5 min',  34.0, '🥃', 'rocks',         'stir',  'Lemon peel (no juice)',   'Rinse glass with absinthe. Stir rye with bitters and syrup.',       array['stirred','spirit-forward','new-orleans'], true, null),
  ('french-75',         'French 75',          'easy',   '4 min',  13.0, '🥂', 'champagne-flute','shake','Lemon twist',            'Shake gin, juice and syrup. Strain and top with Champagne.',        array['shaken','bubbly','classic'],             true, null),
  ('last-word',         'Last Word',          'medium', '3 min',  24.0, '🍸', 'coupe',         'shake', 'Brandied cherry',        'Equal parts. Shake vigorously with ice.',                           array['shaken','equal-parts','classic'],        true, null),
  ('aviation',          'Aviation',           'hard',   '4 min',  20.0, '🟣', 'coupe',         'shake', 'Brandied cherry',        'Shake all ingredients with ice and double strain.',                 array['shaken','floral','classic'],             true, null),
  ('bees-knees',        'Bee''s Knees',       'easy',   '3 min',  22.0, '🍯', 'coupe',         'shake', 'Lemon peel',             'Shake vigorously until very cold. Double strain.',                  array['shaken','sour','prohibition'],           true, null),
  ('tom-collins',       'Tom Collins',        'easy',   '4 min',  10.0, '🍋', 'highball',      'build', 'Lemon slice + cherry',   'Shake gin, juice and syrup. Pour over ice, top with soda.',        array['built','refreshing','classic'],          true, null),
  ('mint-julep',        'Mint Julep',         'medium', '5 min',  30.0, '🌿', 'julep',         'build', 'Mint bouquet',           'Gently muddle mint with syrup. Pack with crushed ice, add bourbon.',array['built','crushed-ice','kentucky'],        true, null),
  ('blood-and-sand',    'Blood and Sand',     'medium', '4 min',  18.0, '🩸', 'coupe',         'shake', 'Orange peel',            'Equal parts. Shake with ice and double strain.',                    array['shaken','equal-parts','scotch'],         true, null),
  ('clover-club',       'Clover Club',        'hard',   '5 min',  15.0, '🍓', 'coupe',         'shake', 'Raspberries',            'Dry shake first, then shake with ice. Double strain.',              array['shaken','sour','egg','classic'],         true, null),
  ('americano',         'Americano',          'easy',   '2 min',   9.0, '🍊', 'highball',      'build', 'Orange slice',           'Build over ice. Top with soda water.',                              array['built','bitter','low-abv','classic'],    true, null),
  ('vieux-carre',       'Vieux Carré',        'hard',   '5 min',  26.0, '🥃', 'rocks',         'stir',  'Lemon peel',             'Stir all ingredients over ice. Strain into rocks glass.',           array['stirred','classic','new-orleans'],       true, null),
  ('rob-roy',           'Rob Roy',            'medium', '4 min',  28.0, '🍸', 'coupe',         'stir',  'Cherry or lemon peel',   'Stir with ice until chilled. Strain into coupe.',                   array['stirred','scotch','classic'],            true, null),
  ('stinger',           'Stinger',            'easy',   '3 min',  28.0, '🍸', 'coupe',         'shake', 'Mint sprig',             'Shake vigorously with crushed ice. Strain into chilled glass.',     array['shaken','spirit-forward','classic'],     true, null),
  ('corpse-reviver-no2','Corpse Reviver #2',  'hard',   '4 min',  22.0, '🍸', 'coupe',         'shake', 'Lemon peel',             'Rinse coupe with absinthe. Shake rest and strain in.',              array['shaken','sour','classic','absinthe'],    true, null),
  ('hanky-panky',       'Hanky Panky',        'medium', '3 min',  28.0, '🍸', 'coupe',         'stir',  'Orange peel',            'Stir all ingredients over ice. Strain into coupe.',                 array['stirred','bitter','classic'],            true, null),
  ('twentieth-century', 'Twentieth Century',  'hard',   '4 min',  20.0, '🍸', 'coupe',         'shake', 'Lemon peel',             'Shake all ingredients with ice and double strain.',                 array['shaken','floral','classic'],             true, null),
  ('gin-rickey',        'Gin Rickey',         'easy',   '2 min',  10.0, '🍹', 'highball',      'build', 'Lime wedge',             'Build over ice. Top with soda water.',                              array['built','refreshing','low-sugar'],        true, null),
  ('sherry-cobbler',    'Sherry Cobbler',     'easy',   '3 min',   7.0, '🍷', 'wine',          'build', 'Seasonal fruits',        'Fill glass with crushed ice. Layer ingredients and stir gently.',   array['built','low-abv','fruity','classic'],    true, null),
  ('jack-rose',         'Jack Rose',          'medium', '3 min',  20.0, '🌹', 'coupe',         'shake', 'Lemon peel',             'Shake with ice and double strain into chilled coupe.',              array['shaken','sour','applejack'],             true, null),
  ('tipperary',         'Tipperary',          'medium', '3 min',  26.0, '🍸', 'coupe',         'stir',  'Orange peel',            'Stir all ingredients over ice. Strain into coupe.',                 array['stirred','bitter','irish'],              true, null),
  -- CONTEMPORARY
  ('espresso-martini',  'Espresso Martini',   'medium', '5 min',  18.0, '☕', 'martini',       'shake', '3 coffee beans',         'Shake vigorously with fresh espresso. Double strain for foam.',     array['shaken','coffee','after-dinner'],        true, null),
  ('paper-plane',       'Paper Plane',        'medium', '4 min',  20.0, '✈️', 'coupe',         'shake', 'None',                   'Equal parts. Shake hard with ice and strain.',                      array['shaken','equal-parts','sour'],           true, null),
  ('penicillin',        'Penicillin',         'hard',   '6 min',  17.0, '💊', 'rocks',         'shake', 'Candied ginger',         'Shake Scotch, lemon, honey and ginger syrups. Float Islay Scotch.',array['shaken','sour','smoky','modern-classic'],true, null),
  ('naked-and-famous',  'Naked and Famous',   'medium', '3 min',  20.0, '🍸', 'coupe',         'shake', 'None',                   'Equal parts. Shake with ice and double strain.',                    array['shaken','equal-parts','mezcal'],         true, null),
  ('pornstar-martini',  'Pornstar Martini',   'medium', '5 min',  16.0, '⭐', 'martini',       'shake', 'Passion fruit half',     'Shake and strain. Serve Prosecco shot on the side.',               array['shaken','fruity','contemporary'],        true, null),
  ('tommys-margarita',  'Tommy''s Margarita', 'easy',   '3 min',  14.0, '🌵', 'rocks',         'shake', 'Lime wheel',             'Shake with ice. Serve over rocks in a salted glass.',               array['shaken','sour','agave'],                 true, null),
  ('amaretto-sour',     'Amaretto Sour',      'medium', '4 min',  14.0, '🍒', 'rocks',         'shake', 'Orange + cherry',        'Dry shake first, then shake with ice.',                             array['shaken','sour','egg'],                  true, null),
  ('new-york-sour',     'New York Sour',      'hard',   '5 min',  17.0, '🍷', 'rocks',         'shake', 'Lemon wheel',            'Dry shake, then shake with ice. Float red wine gently on top.',     array['shaken','sour','egg','float'],           true, null),
  ('oaxacan-old-fashioned','Oaxacan Old Fashioned','medium','5 min',30.0,'🥃','rocks',         'stir',  'Orange peel',            'Combine spirits with bitters and syrup. Stir over ice.',            array['stirred','mezcal','spirit-forward'],     true, null),
  ('white-negroni',     'White Negroni',      'medium', '3 min',  22.0, '🍸', 'rocks',         'stir',  'Lemon peel',             'Stir all ingredients over ice. Strain into rocks glass.',           array['stirred','bitter','contemporary'],       true, null),
  ('spicy-margarita',   'Spicy Margarita',    'medium', '5 min',  14.0, '🌶️', 'rocks',         'shake', 'Jalapeño + lime',        'Muddle jalapeño, add spirits, shake with ice.',                    array['shaken','sour','spicy'],                 true, null),
  ('hugo-spritz',       'Hugo Spritz',        'easy',   '2 min',   7.0, '🌿', 'wine',          'build', 'Mint + lime slice',      'Build over ice. Top with Prosecco and soda.',                       array['built','bubbly','low-abv','fresh'],      true, null),
  ('garibaldi',         'Garibaldi',          'easy',   '2 min',   8.0, '🍊', 'highball',      'build', 'Orange slice',           'Pour Campari over ice. Top with freshly squeezed OJ.',             array['built','bitter','low-abv','fluffy'],     true, null),
  ('jungle-bird',       'Jungle Bird',        'medium', '4 min',  16.0, '🦜', 'rocks',         'shake', 'Pineapple wedge',        'Shake all ingredients with ice and strain over fresh ice.',         array['shaken','tropical','bitter'],            true, null),
  ('french-martini',    'French Martini',     'easy',   '3 min',  16.0, '🍇', 'martini',       'shake', 'Raspberry',              'Shake hard with ice and double strain into chilled glass.',         array['shaken','fruity','contemporary'],        true, null),
  ('lemon-drop',        'Lemon Drop',         'easy',   '3 min',  18.0, '🍋', 'martini',       'shake', 'Sugar rim + lemon twist','Shake with ice. Strain into sugar-rimmed martini glass.',          array['shaken','sour','vodka'],                 true, null),
  ('cosmopolitan',      'Cosmopolitan',       'easy',   '4 min',  16.0, '🌆', 'martini',       'shake', 'Flamed orange peel',     'Shake all with ice. Double strain into chilled martini glass.',     array['shaken','sour','vodka','contemporary'],  true, null),
  ('ranch-water',       'Ranch Water',        'easy',   '2 min',  11.0, '🌵', 'highball',      'build', 'Lime wedge',             'Build over ice. Top with sparkling water.',                         array['built','refreshing','tequila'],          true, null),
  ('watermelon-margarita','Watermelon Margarita','easy','4 min',  13.0, '🍉', 'rocks',         'shake', 'Watermelon + salt rim',  'Shake all with ice. Serve over rocks with salted rim.',             array['shaken','sour','fruity'],                true, null),
  ('cucumber-gimlet',   'Cucumber Gimlet',    'medium', '4 min',  19.0, '🥒', 'coupe',         'shake', 'Cucumber ribbon',        'Shake with ice and double strain into chilled coupe.',              array['shaken','sour','fresh'],                 true, null),
  ('elderflower-spritz','Elderflower Spritz', 'easy',   '2 min',   6.0, '🌸', 'wine',          'build', 'Cucumber slice',         'Build over ice. Top with soda water.',                              array['built','low-abv','floral','fresh'],      true, null),
  ('french-connection', 'French Connection',  'easy',   '2 min',  28.0, '🇫🇷','rocks',         'build', 'None',                   'Build over ice and stir briefly.',                                  array['built','spirit-forward','after-dinner'], true, null),
  -- TIKI
  ('mai-tai',           'Mai Tai',            'medium', '5 min',  18.0, '🌺', 'tiki-mug',      'shake', 'Mint + lime shell + cherry','Shake with ice. Serve over crushed ice in tiki mug.',           array['shaken','tiki','rum','tropical'],        true, null),
  ('zombie',            'Zombie',             'hard',   '6 min',  22.0, '🧟', 'tiki-mug',      'shake', 'Mint + lime + cherry',   'Blend or shake all with crushed ice. Limit: 2 per customer.',      array['shaken','tiki','rum','strong'],          true, null),
  ('blue-hawaiian',     'Blue Hawaiian',      'easy',   '4 min',  14.0, '🌊', 'hurricane',     'shake', 'Pineapple + cherry',     'Shake or blend with ice. Strain into glass.',                       array['shaken','tiki','tropical','blue'],       true, null),
  ('painkiller',        'Painkiller',         'easy',   '4 min',  15.0, '🏝️', 'tiki-mug',     'shake', 'Grated nutmeg + orange', 'Shake vigorously. Serve over ice and grate fresh nutmeg on top.',  array['shaken','tiki','tropical','creamy'],     true, null),
  ('scorpion-bowl',     'Scorpion Bowl',      'hard',   '6 min',  17.0, '🦂', 'tiki-mug',      'blend', 'Gardenia + fruit',       'Blend with ice. Serve communal with long straws.',                  array['blended','tiki','rum','party'],          true, null),
  ('rum-punch',         'Rum Punch',          'easy',   '3 min',  14.0, '🍹', 'highball',      'build', 'Fruit skewer',           'One sour, two sweet, three strong, four weak. Shake and pour.',    array['shaken','tiki','tropical','rum'],        true, null),
  ('pineapple-daiquiri','Pineapple Daiquiri', 'easy',   '4 min',  18.0, '🍍', 'coupe',         'shake', 'Pineapple slice',        'Shake vigorously with ice and double strain.',                      array['shaken','tiki','sour','rum'],            true, null),
  ('fog-cutter',        'Fog Cutter',         'hard',   '6 min',  16.0, '🌫️', 'highball',     'shake', 'Mint + orange',          'Shake all with ice. Pour over ice, float sherry on top.',          array['shaken','tiki','rum','gin'],             true, null),
  ('three-dots-and-a-dash','Three Dots and a Dash','hard','6 min',17.0,'•••-','tiki-mug',      'shake', 'Three cherries + lime',  'Shake all with crushed ice. Serve in tiki mug.',                    array['shaken','tiki','rum','complex'],         true, null),
  ('suffering-bastard', 'Suffering Bastard',  'medium', '5 min',  14.0, '😫', 'highball',      'build', 'Mint + cucumber',        'Build in glass over ice. Top with ginger beer.',                    array['built','tiki','hangover-cure'],          true, null),
  ('hurricane',         'Hurricane',          'easy',   '4 min',  16.0, '🌀', 'hurricane',     'shake', 'Orange + cherry',        'Shake all with ice. Strain into hurricane glass over fresh ice.',   array['shaken','tiki','tropical','rum'],        true, null),
  ('pina-colada',       'Piña Colada',        'easy',   '5 min',  13.0, '🥥', 'hurricane',     'blend', 'Pineapple + cherry',     'Blend with ice until smooth.',                                      array['blended','tiki','tropical','creamy'],    true, null),
  ('navy-grog',         'Navy Grog',          'hard',   '5 min',  18.0, '⚓', 'tiki-mug',      'shake', 'Lime shell',             'Shake all with crushed ice. Serve in tiki mug.',                    array['shaken','tiki','rum','sour'],            true, null),
  ('sharks-tooth',      'Shark''s Tooth',     'medium', '4 min',  14.0, '🦈', 'tiki-mug',      'shake', 'Lime wheel',             'Shake all with ice. Strain into glass with fresh ice, top soda.',  array['shaken','tiki','rum','fruity'],          true, null),
  ('port-light',        'Port Light',         'medium', '4 min',  17.0, '🚢', 'rocks',         'shake', 'Lime wheel',             'Shake all ingredients with ice. Strain over fresh ice.',            array['shaken','tiki','mezcal','smoky'],        true, null),
  -- HIGHBALLS
  ('paloma',            'Paloma',             'easy',   '3 min',  11.0, '🌷', 'highball',      'build', 'Salted rim + lime',      'Build in glass over ice. Top with grapefruit soda or juice.',       array['built','refreshing','tequila'],          true, null),
  ('aperol-spritz',     'Aperol Spritz',      'easy',   '2 min',   8.0, '🍊', 'wine',          'build', 'Orange slice',           'Pour Aperol and Prosecco over ice. Top with soda.',                 array['built','bubbly','low-abv','aperitif'],   true, null),
  ('moscow-mule',       'Moscow Mule',        'easy',   '3 min',  11.0, '🐴', 'copper-mug',    'build', 'Lime wedge + mint',      'Build in copper mug over ice. Top with ginger beer.',               array['built','refreshing','vodka','ginger'],   true, null),
  ('dark-and-stormy',   'Dark and Stormy',    'easy',   '2 min',  13.0, '⛈️', 'highball',     'build', 'Lime wedge',             'Pour ginger beer over ice. Float dark rum on top.',                 array['built','refreshing','rum','ginger'],     true, null),
  ('gin-and-tonic',     'Gin and Tonic',      'easy',   '2 min',  10.0, '🌿', 'highball',      'build', 'Lime + botanicals',      'Build in glass over ice. Top with tonic water.',                    array['built','refreshing','gin','classic'],    true, null),
  ('cuba-libre',        'Cuba Libre',         'easy',   '2 min',  11.0, '🇨🇺','highball',      'build', 'Lime wedge',             'Squeeze lime into glass, add ice and rum, top with cola.',         array['built','refreshing','rum'],              true, null),
  ('whiskey-highball',  'Whiskey Highball',   'easy',   '2 min',  11.0, '🥃', 'highball',      'build', 'Lemon peel',             'Pour scotch over large ice. Top with soda water.',                  array['built','refreshing','scotch','simple'],  true, null),
  -- FROM MOVIES
  ('vesper-martini',    'Vesper Martini',     'medium', '4 min',  28.0, '🕵️','martini',       'shake', 'Lemon peel',             'Casino Royale (2006). "Shaken, not stirred." Double strain.',      array['shaken','bond','spy','classic'],         true, null),
  ('white-russian',     'White Russian',      'easy',   '3 min',  17.0, '🎳', 'rocks',         'build', 'None',                   'The Big Lebowski (1998). "The Dude" abides. Build over ice.',       array['built','creamy','kahlua','film'],        true, null),
  ('singapore-sling',   'Singapore Sling',    'hard',   '6 min',  15.0, '🌺', 'highball',      'shake', 'Pineapple + cherry',     'Fear & Loathing in Las Vegas. Shake, strain over ice, top soda.',  array['shaken','fruity','gin','film'],          true, null),
  ('grasshopper',       'Grasshopper',        'easy',   '3 min',  16.0, '🦗', 'coupe',         'shake', 'Chocolate shavings',     'Shake vigorously with ice. Double strain into chilled coupe.',     array['shaken','creamy','dessert','film'],      true, null),
  ('brandy-alexander',  'Brandy Alexander',   'easy',   '4 min',  18.0, '🎬', 'coupe',         'shake', 'Grated nutmeg',          'Shake with ice and strain into chilled coupe.',                     array['shaken','creamy','dessert','classic'],   true, null),
  ('harvey-wallbanger', 'Harvey Wallbanger',  'easy',   '3 min',  12.0, '🏄', 'highball',      'build', 'Orange slice + cherry',  'Build vodka and OJ over ice. Float Galliano on top.',               array['built','fruity','vodka','70s'],          true, null),
  ('long-island-iced-tea','Long Island Iced Tea','medium','4 min',22.0,'🍹','highball',        'shake', 'Lemon wedge',            'Shake spirits and lemon. Strain over ice, top with cola.',          array['shaken','strong','party','film'],        true, null),
  ('tequila-sunrise',   'Tequila Sunrise',    'easy',   '3 min',  12.0, '🌅', 'highball',      'build', 'Orange + cherry',        'Pour tequila and OJ over ice. Slowly add grenadine — don''t stir.',array['built','fruity','tequila','film'],       true, null),
  ('sex-on-the-beach',  'Sex on the Beach',   'easy',   '3 min',  12.0, '🏖️', 'highball',     'build', 'Orange slice',           'Shake all with ice. Strain over ice in highball glass.',            array['shaken','fruity','tropical'],            true, null),
  ('bay-breeze',        'Bay Breeze',         'easy',   '2 min',  10.0, '🌊', 'highball',      'build', 'Pineapple + lime',       'Build in glass over ice.',                                          array['built','fruity','tropical','vodka'],     true, null),
  -- TROPICAL
  ('blue-lagoon',       'Blue Lagoon',        'easy',   '3 min',  11.0, '🔵', 'highball',      'build', 'Cherry + lemon slice',   'Build over ice. Top with soda water.',                              array['built','fruity','blue','tropical'],      true, null),
  ('strawberry-daiquiri','Strawberry Daiquiri','easy',  '5 min',  14.0, '🍓', 'hurricane',     'blend', 'Strawberry on rim',      'Blend with ice until smooth.',                                      array['blended','fruity','sour','rum'],         true, null),
  ('mango-margarita',   'Mango Margarita',    'easy',   '4 min',  13.0, '🥭', 'margarita',     'blend', 'Mango slice + salt rim', 'Blend with ice. Serve in salted glass.',                            array['blended','fruity','sour','tequila'],     true, null),
  ('chi-chi',           'Chi Chi',            'easy',   '5 min',  12.0, '🥥', 'hurricane',     'blend', 'Pineapple + cherry',     'Blend all with ice until smooth.',                                  array['blended','tropical','creamy','vodka'],   true, null),
  -- BRUNCH
  ('bellini',           'Bellini',            'easy',   '2 min',   5.0, '🍑', 'champagne-flute','build','None',                   'Add peach purée to chilled glass. Slowly pour Prosecco over.',      array['built','bubbly','brunch','fruity'],      true, null),
  ('mimosa',            'Mimosa',             'easy',   '2 min',   6.0, '🥂', 'champagne-flute','build','Orange twist',           'Pour orange juice and Champagne in equal parts over ice.',          array['built','bubbly','brunch','classic'],     true, null),
  ('bloody-mary',       'Bloody Mary',        'hard',   '7 min',  12.0, '🍅', 'highball',      'build', 'Celery + lemon + pickle','Build over ice. Season to taste. Garnish aggressively.',           array['built','savory','brunch','vodka'],       true, null),
  ('michelada',         'Michelada',          'medium', '4 min',   5.0, '🍺', 'highball',      'build', 'Lime + salted rim',      'Build in salt-rimmed glass over ice. Top with cold beer.',          array['built','savory','beer','brunch'],        true, null),
  ('kir-royale',        'Kir Royale',         'easy',   '2 min',   8.0, '🫐', 'champagne-flute','build','Lemon twist',            'Pour Crème de Cassis into chilled glass. Top with Champagne.',      array['built','bubbly','brunch','fruity'],      true, null),
  -- LOW ABV
  ('bamboo',            'Bamboo',             'medium', '3 min',  12.0, '🎋', 'coupe',         'stir',  'Lemon peel',             'Stir all with ice for 30 sec. Strain into chilled coupe.',          array['stirred','low-abv','sherry','elegant'],  true, null),
  ('spritz-veneziano',  'Spritz Veneziano',   'easy',   '2 min',   7.0, '🍊', 'wine',          'build', 'Orange slice + olive',   'Build over ice. Finish with a splash of soda.',                     array['built','bitter','low-abv','venetian'],   true, null),
  -- SHOTS
  ('b52',               'B-52',               'medium', '3 min',  20.0, '💥', 'shot',          'layer', 'None',                   'Layer carefully: Kahlúa → Baileys → Cointreau.',                    array['layered','shot','creamy'],               true, null),
  ('lemon-drop-shot',   'Lemon Drop Shot',    'easy',   '2 min',  20.0, '🍋', 'shot',          'shake', 'Sugar rim',              'Shake with ice and strain into sugar-rimmed shot glass.',           array['shaken','shot','sour'],                  true, null),
  ('tequila-shot',      'Tequila Shot',       'easy',   '1 min',  35.0, '🌵', 'shot',          'build', 'Lime + salt',            'Pour tequila into shot glass. Salt hand, lick, shoot, bite lime.', array['shot','tequila','simple'],               true, null),
  ('boilermaker',       'Boilermaker',        'easy',   '2 min',  10.0, '🍺', 'shot',          'build', 'None',                   'Drop the shot of whiskey into the beer, or drink separately.',      array['shot','beer','whiskey','simple'],        true, null),
  ('cement-mixer',      'Cement Mixer',       'easy',   '2 min',  14.0, '🍦', 'shot',          'layer', 'None',                   'Layer Baileys over lime juice in shot glass. Hold in mouth to mix.',array['layered','shot','novelty'],              true, null)
on conflict (id) do update
  set name       = excluded.name,
      difficulty = excluded.difficulty,
      prep_time  = excluded.prep_time,
      abv        = excluded.abv,
      image      = excluded.image,
      glass      = excluded.glass,
      method     = excluded.method,
      garnish    = excluded.garnish,
      notes      = excluded.notes,
      tags       = excluded.tags;

-- ── COCKTAIL ↔ CATEGORIES ────────────────────────────────────
insert into cocktail_categories (cocktail_id, category_id) values
  -- Classics
  ('negroni',              'classics'),
  ('margarita',            'classics'),   ('margarita',         'sours'),
  ('old-fashioned',        'classics'),
  ('whiskey-sour',         'classics'),   ('whiskey-sour',      'sours'),
  ('daiquiri',             'classics'),   ('daiquiri',          'sours'),
  ('manhattan',            'classics'),
  ('martini',              'classics'),
  ('gimlet',               'classics'),   ('gimlet',            'sours'),
  ('sidecar',              'classics'),   ('sidecar',           'sours'),
  ('mojito',               'classics'),   ('mojito',            'highballs'),
  ('sazerac',              'classics'),
  ('french-75',            'classics'),   ('french-75',         'highballs'),
  ('last-word',            'classics'),   ('last-word',         'sours'),
  ('aviation',             'classics'),   ('aviation',          'sours'),
  ('bees-knees',           'classics'),   ('bees-knees',        'sours'),
  ('tom-collins',          'classics'),   ('tom-collins',       'highballs'),
  ('mint-julep',           'classics'),
  ('blood-and-sand',       'classics'),
  ('clover-club',          'classics'),   ('clover-club',       'sours'),
  ('americano',            'classics'),   ('americano',         'highballs'),   ('americano', 'low-abv'),
  ('vieux-carre',          'classics'),
  ('rob-roy',              'classics'),   ('rob-roy',           'from-movies'),
  ('stinger',              'classics'),   ('stinger',           'from-movies'),
  ('corpse-reviver-no2',   'classics'),   ('corpse-reviver-no2','sours'),
  ('hanky-panky',          'classics'),
  ('twentieth-century',    'classics'),   ('twentieth-century', 'sours'),
  ('gin-rickey',           'classics'),   ('gin-rickey',        'highballs'),
  ('sherry-cobbler',       'classics'),   ('sherry-cobbler',    'low-abv'),
  ('jack-rose',            'classics'),   ('jack-rose',         'sours'),
  ('tipperary',            'classics'),
  -- Contemporary
  ('espresso-martini',     'contemporary'),
  ('paper-plane',          'contemporary'),('paper-plane',       'sours'),
  ('penicillin',           'contemporary'),('penicillin',        'sours'),
  ('naked-and-famous',     'contemporary'),('naked-and-famous',  'sours'),
  ('pornstar-martini',     'contemporary'),
  ('tommys-margarita',     'contemporary'),('tommys-margarita',  'sours'),
  ('amaretto-sour',        'contemporary'),('amaretto-sour',     'sours'),
  ('new-york-sour',        'contemporary'),('new-york-sour',     'sours'),
  ('oaxacan-old-fashioned','contemporary'),
  ('white-negroni',        'contemporary'),
  ('spicy-margarita',      'contemporary'),('spicy-margarita',   'sours'),
  ('hugo-spritz',          'contemporary'),('hugo-spritz',       'highballs'),  ('hugo-spritz',   'low-abv'),
  ('garibaldi',            'contemporary'),('garibaldi',         'low-abv'),
  ('jungle-bird',          'contemporary'),('jungle-bird',       'tiki'),
  ('french-martini',       'contemporary'),
  ('lemon-drop',           'contemporary'),('lemon-drop',        'sours'),
  ('cosmopolitan',         'contemporary'),('cosmopolitan',      'sours'),
  ('ranch-water',          'contemporary'),('ranch-water',       'highballs'),
  ('watermelon-margarita', 'contemporary'),('watermelon-margarita','sours'),    ('watermelon-margarita','tropical'),
  ('cucumber-gimlet',      'contemporary'),('cucumber-gimlet',   'sours'),
  ('elderflower-spritz',   'contemporary'),('elderflower-spritz','low-abv'),
  ('french-connection',    'contemporary'),
  -- Tiki
  ('mai-tai',              'tiki'),       ('mai-tai',            'tropical'),
  ('zombie',               'tiki'),
  ('blue-hawaiian',        'tiki'),       ('blue-hawaiian',      'tropical'),
  ('painkiller',           'tiki'),       ('painkiller',         'tropical'),
  ('scorpion-bowl',        'tiki'),
  ('rum-punch',            'tiki'),       ('rum-punch',          'tropical'),
  ('pineapple-daiquiri',   'tiki'),       ('pineapple-daiquiri', 'sours'),
  ('fog-cutter',           'tiki'),
  ('three-dots-and-a-dash','tiki'),
  ('suffering-bastard',    'tiki'),
  ('hurricane',            'tiki'),       ('hurricane',          'tropical'),
  ('pina-colada',          'tiki'),       ('pina-colada',        'tropical'),
  ('navy-grog',            'tiki'),       ('navy-grog',          'sours'),
  ('sharks-tooth',         'tiki'),
  ('port-light',           'tiki'),
  -- Highballs
  ('paloma',               'highballs'),
  ('aperol-spritz',        'highballs'),  ('aperol-spritz',      'low-abv'),    ('aperol-spritz','contemporary'),
  ('moscow-mule',          'highballs'),
  ('dark-and-stormy',      'highballs'),
  ('gin-and-tonic',        'highballs'),  ('gin-and-tonic',      'classics'),
  ('cuba-libre',           'highballs'),  ('cuba-libre',         'from-movies'),
  ('whiskey-highball',     'highballs'),
  -- From Movies
  ('vesper-martini',       'from-movies'),('vesper-martini',     'classics'),
  ('white-russian',        'from-movies'),
  ('singapore-sling',      'from-movies'),('singapore-sling',    'classics'),
  ('grasshopper',          'from-movies'),
  ('brandy-alexander',     'from-movies'),('brandy-alexander',   'classics'),
  ('harvey-wallbanger',    'from-movies'),('harvey-wallbanger',  'tropical'),
  ('long-island-iced-tea', 'from-movies'),
  ('tequila-sunrise',      'from-movies'),('tequila-sunrise',    'tropical'),
  ('sex-on-the-beach',     'from-movies'),('sex-on-the-beach',   'tropical'),
  ('bay-breeze',           'tropical'),   ('bay-breeze',         'highballs'),
  -- Tropical
  ('blue-lagoon',          'tropical'),
  ('strawberry-daiquiri',  'tropical'),   ('strawberry-daiquiri','sours'),
  ('mango-margarita',      'tropical'),   ('mango-margarita',    'sours'),
  ('chi-chi',              'tropical'),
  -- Brunch
  ('bellini',              'brunch'),     ('bellini',            'low-abv'),
  ('mimosa',               'brunch'),     ('mimosa',             'low-abv'),
  ('bloody-mary',          'brunch'),
  ('michelada',            'brunch'),
  ('kir-royale',           'brunch'),     ('kir-royale',         'low-abv'),
  -- Low ABV
  ('bamboo',               'low-abv'),    ('bamboo',             'classics'),
  ('spritz-veneziano',     'low-abv'),    ('spritz-veneziano',   'highballs'),
  -- Shots
  ('b52',                  'shots'),
  ('lemon-drop-shot',      'shots'),      ('lemon-drop-shot',    'sours'),
  ('tequila-shot',         'shots'),
  ('boilermaker',          'shots'),
  ('cement-mixer',         'shots')
on conflict do nothing;

-- ── COCKTAIL ↔ INGREDIENTS ───────────────────────────────────
-- Format: (cocktail_id, ingredient_id, amount, sort_order)
insert into cocktail_ingredients (cocktail_id, ingredient_id, amount, sort_order) values
  -- negroni
  ('negroni','gin',30,0), ('negroni','campari',30,1), ('negroni','sweet-vermouth',30,2),
  -- margarita
  ('margarita','tequila',50,0), ('margarita','cointreau',20,1), ('margarita','lime-juice',25,2),
  -- old-fashioned
  ('old-fashioned','bourbon',60,0), ('old-fashioned','simple-syrup',10,1), ('old-fashioned','angostura',2,2),
  -- whiskey-sour
  ('whiskey-sour','bourbon',50,0), ('whiskey-sour','lemon-juice',25,1), ('whiskey-sour','simple-syrup',20,2), ('whiskey-sour','egg-white',30,3),
  -- daiquiri
  ('daiquiri','rum',50,0), ('daiquiri','lime-juice',25,1), ('daiquiri','simple-syrup',15,2),
  -- manhattan
  ('manhattan','rye-whiskey',60,0), ('manhattan','sweet-vermouth',30,1), ('manhattan','angostura',2,2),
  -- martini
  ('martini','gin',60,0), ('martini','dry-vermouth',15,1),
  -- gimlet
  ('gimlet','gin',50,0), ('gimlet','lime-juice',25,1), ('gimlet','simple-syrup',10,2),
  -- sidecar
  ('sidecar','cognac',45,0), ('sidecar','cointreau',20,1), ('sidecar','lemon-juice',20,2),
  -- mojito
  ('mojito','rum',50,0), ('mojito','lime-juice',30,1), ('mojito','simple-syrup',15,2), ('mojito','mint',6,3), ('mojito','soda-water',60,4),
  -- sazerac
  ('sazerac','rye-whiskey',60,0), ('sazerac','simple-syrup',10,1), ('sazerac','peychauds',3,2), ('sazerac','absinthe',5,3),
  -- french-75
  ('french-75','gin',30,0), ('french-75','lemon-juice',15,1), ('french-75','simple-syrup',15,2), ('french-75','champagne',90,3),
  -- last-word
  ('last-word','gin',25,0), ('last-word','chartreuse-green',25,1), ('last-word','maraschino',25,2), ('last-word','lime-juice',25,3),
  -- aviation
  ('aviation','gin',45,0), ('aviation','maraschino',15,1), ('aviation','creme-de-violette',10,2), ('aviation','lemon-juice',15,3),
  -- bees-knees
  ('bees-knees','gin',45,0), ('bees-knees','lemon-juice',20,1), ('bees-knees','honey-syrup',20,2),
  -- tom-collins
  ('tom-collins','gin',45,0), ('tom-collins','lemon-juice',30,1), ('tom-collins','simple-syrup',15,2), ('tom-collins','soda-water',60,3),
  -- mint-julep
  ('mint-julep','bourbon',60,0), ('mint-julep','simple-syrup',15,1), ('mint-julep','mint',8,2),
  -- blood-and-sand
  ('blood-and-sand','scotch',25,0), ('blood-and-sand','sweet-vermouth',25,1), ('blood-and-sand','cherry-brandy',25,2), ('blood-and-sand','orange-juice',25,3),
  -- clover-club
  ('clover-club','gin',45,0), ('clover-club','lemon-juice',20,1), ('clover-club','raspberry-syrup',20,2), ('clover-club','egg-white',30,3),
  -- americano
  ('americano','campari',30,0), ('americano','sweet-vermouth',30,1), ('americano','soda-water',90,2),
  -- vieux-carre
  ('vieux-carre','rye-whiskey',30,0), ('vieux-carre','cognac',30,1), ('vieux-carre','sweet-vermouth',30,2), ('vieux-carre','benedictine',10,3), ('vieux-carre','angostura',2,4),
  -- rob-roy
  ('rob-roy','scotch',50,0), ('rob-roy','sweet-vermouth',25,1), ('rob-roy','angostura',2,2),
  -- stinger
  ('stinger','cognac',45,0), ('stinger','creme-de-menthe',20,1),
  -- corpse-reviver-no2
  ('corpse-reviver-no2','gin',25,0), ('corpse-reviver-no2','cointreau',25,1), ('corpse-reviver-no2','lillet-blanc',25,2), ('corpse-reviver-no2','lemon-juice',25,3), ('corpse-reviver-no2','absinthe',5,4),
  -- hanky-panky
  ('hanky-panky','gin',45,0), ('hanky-panky','sweet-vermouth',45,1), ('hanky-panky','fernet',5,2),
  -- twentieth-century
  ('twentieth-century','gin',40,0), ('twentieth-century','lillet-blanc',20,1), ('twentieth-century','creme-de-cacao',20,2), ('twentieth-century','lemon-juice',20,3),
  -- gin-rickey
  ('gin-rickey','gin',45,0), ('gin-rickey','lime-juice',25,1), ('gin-rickey','soda-water',90,2),
  -- sherry-cobbler
  ('sherry-cobbler','sherry',90,0), ('sherry-cobbler','simple-syrup',20,1), ('sherry-cobbler','orange-juice',30,2),
  -- jack-rose
  ('jack-rose','cognac',45,0), ('jack-rose','grenadine',20,1), ('jack-rose','lemon-juice',20,2),
  -- tipperary
  ('tipperary','irish-whiskey',45,0), ('tipperary','sweet-vermouth',30,1), ('tipperary','chartreuse-green',20,2),
  -- espresso-martini
  ('espresso-martini','vodka',50,0), ('espresso-martini','espresso',30,1), ('espresso-martini','kahlua',20,2), ('espresso-martini','simple-syrup',10,3),
  -- paper-plane
  ('paper-plane','bourbon',25,0), ('paper-plane','aperol',25,1), ('paper-plane','amaretto',25,2), ('paper-plane','lemon-juice',25,3),
  -- penicillin
  ('penicillin','scotch',45,0), ('penicillin','lemon-juice',25,1), ('penicillin','honey-syrup',20,2), ('penicillin','ginger-syrup',10,3),
  -- naked-and-famous
  ('naked-and-famous','mezcal',25,0), ('naked-and-famous','aperol',25,1), ('naked-and-famous','chartreuse-yellow',25,2), ('naked-and-famous','lime-juice',25,3),
  -- pornstar-martini
  ('pornstar-martini','vodka',50,0), ('pornstar-martini','passion-fruit-puree',25,1), ('pornstar-martini','passion-fruit-syrup',15,2), ('pornstar-martini','lime-juice',15,3), ('pornstar-martini','prosecco',60,4),
  -- tommys-margarita
  ('tommys-margarita','tequila',50,0), ('tommys-margarita','lime-juice',25,1), ('tommys-margarita','agave-syrup',15,2),
  -- amaretto-sour
  ('amaretto-sour','amaretto',45,0), ('amaretto-sour','bourbon',15,1), ('amaretto-sour','lemon-juice',25,2), ('amaretto-sour','egg-white',30,3),
  -- new-york-sour
  ('new-york-sour','bourbon',50,0), ('new-york-sour','lemon-juice',25,1), ('new-york-sour','simple-syrup',20,2), ('new-york-sour','egg-white',30,3), ('new-york-sour','red-wine',15,4),
  -- oaxacan-old-fashioned
  ('oaxacan-old-fashioned','mezcal',45,0), ('oaxacan-old-fashioned','tequila',15,1), ('oaxacan-old-fashioned','angostura',2,2), ('oaxacan-old-fashioned','simple-syrup',10,3),
  -- white-negroni
  ('white-negroni','gin',30,0), ('white-negroni','suze',25,1), ('white-negroni','dry-vermouth',25,2),
  -- spicy-margarita
  ('spicy-margarita','tequila',50,0), ('spicy-margarita','cointreau',20,1), ('spicy-margarita','lime-juice',25,2), ('spicy-margarita','simple-syrup',10,3),
  -- hugo-spritz
  ('hugo-spritz','elderflower',30,0), ('hugo-spritz','prosecco',90,1), ('hugo-spritz','soda-water',30,2), ('hugo-spritz','mint',2,3),
  -- garibaldi
  ('garibaldi','campari',60,0), ('garibaldi','orange-juice',120,1),
  -- jungle-bird
  ('jungle-bird','dark-rum',45,0), ('jungle-bird','campari',20,1), ('jungle-bird','pineapple-juice',45,2), ('jungle-bird','lime-juice',15,3), ('jungle-bird','simple-syrup',15,4),
  -- french-martini
  ('french-martini','vodka',40,0), ('french-martini','chambord',20,1), ('french-martini','pineapple-juice',40,2),
  -- lemon-drop
  ('lemon-drop','vodka',45,0), ('lemon-drop','triple-sec',15,1), ('lemon-drop','lemon-juice',25,2), ('lemon-drop','simple-syrup',10,3),
  -- cosmopolitan
  ('cosmopolitan','vodka',40,0), ('cosmopolitan','cointreau',20,1), ('cosmopolitan','cranberry-juice',20,2), ('cosmopolitan','lime-juice',15,3),
  -- ranch-water
  ('ranch-water','tequila',50,0), ('ranch-water','lime-juice',25,1), ('ranch-water','soda-water',120,2),
  -- watermelon-margarita
  ('watermelon-margarita','tequila',45,0), ('watermelon-margarita','watermelon-juice',60,1), ('watermelon-margarita','lime-juice',20,2), ('watermelon-margarita','triple-sec',15,3),
  -- cucumber-gimlet
  ('cucumber-gimlet','gin',50,0), ('cucumber-gimlet','cucumber-juice',30,1), ('cucumber-gimlet','lime-juice',20,2), ('cucumber-gimlet','simple-syrup',10,3),
  -- elderflower-spritz
  ('elderflower-spritz','elderflower',30,0), ('elderflower-spritz','soda-water',150,1), ('elderflower-spritz','cucumber-juice',30,2),
  -- french-connection
  ('french-connection','cognac',45,0), ('french-connection','amaretto',25,1),
  -- mai-tai
  ('mai-tai','rum',30,0), ('mai-tai','dark-rum',30,1), ('mai-tai','lime-juice',30,2), ('mai-tai','orgeat',15,3), ('mai-tai','cointreau',15,4),
  -- zombie
  ('zombie','rum',45,0), ('zombie','dark-rum',30,1), ('zombie','overproof-rum',15,2), ('zombie','lime-juice',20,3), ('zombie','grapefruit-juice',20,4), ('zombie','passion-fruit-syrup',15,5), ('zombie','grenadine',10,6),
  -- blue-hawaiian
  ('blue-hawaiian','rum',45,0), ('blue-hawaiian','blue-curacao',20,1), ('blue-hawaiian','coconut-cream',30,2), ('blue-hawaiian','pineapple-juice',90,3),
  -- painkiller
  ('painkiller','rum',60,0), ('painkiller','coconut-cream',30,1), ('painkiller','pineapple-juice',90,2), ('painkiller','orange-juice',30,3),
  -- scorpion-bowl
  ('scorpion-bowl','rum',45,0), ('scorpion-bowl','cognac',45,1), ('scorpion-bowl','orange-juice',60,2), ('scorpion-bowl','lemon-juice',45,3), ('scorpion-bowl','orgeat',30,4),
  -- rum-punch
  ('rum-punch','dark-rum',60,0), ('rum-punch','orange-juice',60,1), ('rum-punch','pineapple-juice',60,2), ('rum-punch','grenadine',20,3), ('rum-punch','lime-juice',30,4),
  -- pineapple-daiquiri
  ('pineapple-daiquiri','rum',50,0), ('pineapple-daiquiri','pineapple-juice',45,1), ('pineapple-daiquiri','lime-juice',20,2), ('pineapple-daiquiri','simple-syrup',10,3),
  -- fog-cutter
  ('fog-cutter','rum',60,0), ('fog-cutter','cognac',30,1), ('fog-cutter','gin',30,2), ('fog-cutter','orange-juice',90,3), ('fog-cutter','lemon-juice',45,4), ('fog-cutter','orgeat',30,5), ('fog-cutter','sherry',30,6),
  -- three-dots-and-a-dash
  ('three-dots-and-a-dash','rum',60,0), ('three-dots-and-a-dash','falernum',20,1), ('three-dots-and-a-dash','lime-juice',25,2), ('three-dots-and-a-dash','orange-juice',30,3), ('three-dots-and-a-dash','honey-syrup',15,4), ('three-dots-and-a-dash','allspice-dram',5,5),
  -- suffering-bastard
  ('suffering-bastard','gin',30,0), ('suffering-bastard','bourbon',30,1), ('suffering-bastard','lime-juice',25,2), ('suffering-bastard','angostura',2,3), ('suffering-bastard','ginger-beer',90,4),
  -- hurricane
  ('hurricane','dark-rum',60,0), ('hurricane','passion-fruit-syrup',30,1), ('hurricane','lime-juice',20,2), ('hurricane','orange-juice',45,3), ('hurricane','grenadine',20,4),
  -- pina-colada
  ('pina-colada','rum',60,0), ('pina-colada','coconut-cream',45,1), ('pina-colada','pineapple-juice',90,2),
  -- navy-grog
  ('navy-grog','rum',30,0), ('navy-grog','dark-rum',30,1), ('navy-grog','lime-juice',25,2), ('navy-grog','grapefruit-juice',30,3), ('navy-grog','honey-syrup',20,4),
  -- sharks-tooth
  ('sharks-tooth','rum',45,0), ('sharks-tooth','lime-juice',20,1), ('sharks-tooth','passion-fruit-syrup',20,2), ('sharks-tooth','grenadine',10,3), ('sharks-tooth','soda-water',60,4),
  -- port-light
  ('port-light','mezcal',45,0), ('port-light','passion-fruit-syrup',30,1), ('port-light','honey-syrup',15,2), ('port-light','lime-juice',25,3),
  -- paloma
  ('paloma','tequila',50,0), ('paloma','grapefruit-juice',90,1), ('paloma','lime-juice',15,2), ('paloma','soda-water',30,3),
  -- aperol-spritz
  ('aperol-spritz','aperol',60,0), ('aperol-spritz','prosecco',90,1), ('aperol-spritz','soda-water',30,2),
  -- moscow-mule
  ('moscow-mule','vodka',50,0), ('moscow-mule','ginger-beer',120,1), ('moscow-mule','lime-juice',20,2),
  -- dark-and-stormy
  ('dark-and-stormy','dark-rum',60,0), ('dark-and-stormy','ginger-beer',120,1), ('dark-and-stormy','lime-juice',15,2),
  -- gin-and-tonic
  ('gin-and-tonic','gin',50,0), ('gin-and-tonic','tonic-water',120,1),
  -- cuba-libre
  ('cuba-libre','rum',50,0), ('cuba-libre','cola',120,1), ('cuba-libre','lime-juice',15,2),
  -- whiskey-highball
  ('whiskey-highball','scotch',45,0), ('whiskey-highball','soda-water',120,1),
  -- vesper-martini
  ('vesper-martini','gin',45,0), ('vesper-martini','vodka',15,1), ('vesper-martini','lillet-blanc',10,2),
  -- white-russian
  ('white-russian','vodka',50,0), ('white-russian','kahlua',20,1), ('white-russian','cream',30,2),
  -- singapore-sling
  ('singapore-sling','gin',30,0), ('singapore-sling','cherry-brandy',15,1), ('singapore-sling','cointreau',10,2), ('singapore-sling','benedictine',5,3), ('singapore-sling','grenadine',10,4), ('singapore-sling','lime-juice',15,5), ('singapore-sling','pineapple-juice',90,6), ('singapore-sling','angostura',1,7),
  -- grasshopper
  ('grasshopper','creme-de-menthe',30,0), ('grasshopper','creme-de-cacao',30,1), ('grasshopper','cream',30,2),
  -- brandy-alexander
  ('brandy-alexander','cognac',30,0), ('brandy-alexander','creme-de-cacao',30,1), ('brandy-alexander','cream',30,2),
  -- harvey-wallbanger
  ('harvey-wallbanger','vodka',45,0), ('harvey-wallbanger','orange-juice',90,1), ('harvey-wallbanger','galliano',20,2),
  -- long-island-iced-tea
  ('long-island-iced-tea','vodka',15,0), ('long-island-iced-tea','gin',15,1), ('long-island-iced-tea','rum',15,2), ('long-island-iced-tea','tequila',15,3), ('long-island-iced-tea','triple-sec',15,4), ('long-island-iced-tea','lemon-juice',25,5), ('long-island-iced-tea','cola',60,6),
  -- tequila-sunrise
  ('tequila-sunrise','tequila',50,0), ('tequila-sunrise','orange-juice',90,1), ('tequila-sunrise','grenadine',15,2),
  -- sex-on-the-beach
  ('sex-on-the-beach','vodka',40,0), ('sex-on-the-beach','peach-schnapps',20,1), ('sex-on-the-beach','orange-juice',60,2), ('sex-on-the-beach','cranberry-juice',60,3),
  -- bay-breeze
  ('bay-breeze','vodka',50,0), ('bay-breeze','cranberry-juice',90,1), ('bay-breeze','pineapple-juice',60,2),
  -- blue-lagoon
  ('blue-lagoon','vodka',40,0), ('blue-lagoon','blue-curacao',20,1), ('blue-lagoon','lemon-juice',30,2), ('blue-lagoon','soda-water',70,3),
  -- strawberry-daiquiri
  ('strawberry-daiquiri','rum',50,0), ('strawberry-daiquiri','strawberry-puree',45,1), ('strawberry-daiquiri','lime-juice',20,2), ('strawberry-daiquiri','simple-syrup',10,3),
  -- mango-margarita
  ('mango-margarita','tequila',45,0), ('mango-margarita','mango-puree',45,1), ('mango-margarita','lime-juice',20,2), ('mango-margarita','triple-sec',15,3),
  -- chi-chi
  ('chi-chi','vodka',60,0), ('chi-chi','coconut-cream',30,1), ('chi-chi','pineapple-juice',90,2),
  -- bellini
  ('bellini','prosecco',120,0), ('bellini','peach-puree',30,1),
  -- mimosa
  ('mimosa','champagne',120,0), ('mimosa','orange-juice',60,1),
  -- bloody-mary
  ('bloody-mary','vodka',50,0), ('bloody-mary','tomato-juice',100,1), ('bloody-mary','lemon-juice',15,2), ('bloody-mary','worcestershire',5,3), ('bloody-mary','tabasco',3,4), ('bloody-mary','horseradish',1,5),
  -- michelada
  ('michelada','beer',300,0), ('michelada','lime-juice',30,1), ('michelada','tomato-juice',60,2), ('michelada','worcestershire',5,3), ('michelada','tabasco',3,4),
  -- kir-royale
  ('kir-royale','champagne',150,0), ('kir-royale','creme-de-cassis',20,1),
  -- bamboo
  ('bamboo','sherry',45,0), ('bamboo','dry-vermouth',45,1), ('bamboo','angostura',2,2),
  -- spritz-veneziano
  ('spritz-veneziano','campari',30,0), ('spritz-veneziano','prosecco',90,1), ('spritz-veneziano','soda-water',30,2),
  -- b52
  ('b52','kahlua',25,0), ('b52','baileys',25,1), ('b52','cointreau',25,2),
  -- lemon-drop-shot
  ('lemon-drop-shot','vodka',30,0), ('lemon-drop-shot','triple-sec',10,1), ('lemon-drop-shot','lemon-juice',15,2),
  -- tequila-shot
  ('tequila-shot','tequila',50,0),
  -- boilermaker
  ('boilermaker','bourbon',50,0), ('boilermaker','beer',150,1),
  -- cement-mixer
  ('cement-mixer','baileys',25,0), ('cement-mixer','lime-juice',25,1)
on conflict do nothing;

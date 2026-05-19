export interface Cocktail {
  id: string
  name: string
  category: string
  difficulty: 'easy' | 'medium' | 'hard'
  prepTime: string
  abv: number
  image: string
  glass: string
  method: string
  garnish: string
  notes?: string
  ingredients: {
    id: string
    name: string
    amount: number
    unit: string
    emoji?: string
    color?: string
  }[]
  tags?: string[]
}

export const COCKTAILS: Cocktail[] = [
  {
    id: 'negroni',
    name: 'Negroni',
    category: 'Classics',
    difficulty: 'easy',
    prepTime: '3 min',
    abv: 24,
    image: '🍊',
    glass: 'rocks',
    method: 'stir',
    garnish: 'Orange peel',
    notes: 'Stir for 30 seconds over ice. Express orange peel over the glass.',
    ingredients: [
      { id: 'gin', name: 'Gin', amount: 30, unit: 'ml', emoji: '🫙', color: '#c8e6ff' },
      { id: 'campari', name: 'Campari', amount: 30, unit: 'ml', emoji: '🔴', color: '#ff3b30' },
      {
        id: 'sweet-vermouth',
        name: 'Sweet Vermouth',
        amount: 30,
        unit: 'ml',
        emoji: '🍷',
        color: '#8b1a1a',
      },
    ],
    tags: ['stirred', 'bitter', 'classic'],
  },
  {
    id: 'margarita',
    name: 'Margarita',
    category: 'Classics',
    difficulty: 'easy',
    prepTime: '4 min',
    abv: 14,
    image: '🍋',
    glass: 'margarita',
    method: 'shake',
    garnish: 'Salt rim + lime wheel',
    notes: 'Shake hard with ice. Strain into a salt-rimmed glass.',
    ingredients: [
      { id: 'tequila', name: 'Tequila', amount: 50, unit: 'ml', emoji: '🌵', color: '#f5e6a3' },
      {
        id: 'triple-sec',
        name: 'Triple Sec',
        amount: 25,
        unit: 'ml',
        emoji: '🍊',
        color: '#ffaa44',
      },
      {
        id: 'lime-juice',
        name: 'Lime Juice',
        amount: 25,
        unit: 'ml',
        emoji: '🍋',
        color: '#c8e63c',
      },
    ],
    tags: ['shaken', 'sour', 'classic'],
  },
  {
    id: 'old-fashioned',
    name: 'Old Fashioned',
    category: 'Classics',
    difficulty: 'medium',
    prepTime: '5 min',
    abv: 32,
    image: '🥃',
    glass: 'rocks',
    method: 'stir',
    garnish: 'Orange peel + cherry',
    notes: 'Muddle sugar with bitters. Add whiskey and stir with ice.',
    ingredients: [
      { id: 'bourbon', name: 'Bourbon', amount: 60, unit: 'ml', emoji: '🥃', color: '#c0732a' },
      {
        id: 'simple-syrup',
        name: 'Simple Syrup',
        amount: 10,
        unit: 'ml',
        emoji: '🍯',
        color: '#f5d76e',
      },
      {
        id: 'angostura',
        name: 'Angostura Bitters',
        amount: 2,
        unit: 'dash',
        emoji: '💧',
        color: '#5c1a00',
      },
    ],
    tags: ['stirred', 'spirit-forward', 'classic'],
  },
  {
    id: 'espresso-martini',
    name: 'Espresso Martini',
    category: 'Contemporary',
    difficulty: 'medium',
    prepTime: '5 min',
    abv: 18,
    image: '☕',
    glass: 'martini',
    method: 'shake',
    garnish: '3 coffee beans',
    notes: 'Shake vigorously with espresso. Double strain for a thick foam.',
    ingredients: [
      { id: 'vodka', name: 'Vodka', amount: 50, unit: 'ml', emoji: '🫙', color: '#e8e8e8' },
      {
        id: 'espresso',
        name: 'Espresso',
        amount: 30,
        unit: 'ml',
        emoji: '☕',
        color: '#3b1f0a',
      },
      {
        id: 'kahlua',
        name: 'Kahlúa',
        amount: 20,
        unit: 'ml',
        emoji: '🍫',
        color: '#5c2c00',
      },
      {
        id: 'simple-syrup-em',
        name: 'Simple Syrup',
        amount: 10,
        unit: 'ml',
        emoji: '🍯',
        color: '#f5d76e',
      },
    ],
    tags: ['shaken', 'coffee', 'after-dinner'],
  },
  {
    id: 'whiskey-sour',
    name: 'Whiskey Sour',
    category: 'Sours',
    difficulty: 'easy',
    prepTime: '4 min',
    abv: 15,
    image: '🍋',
    glass: 'rocks',
    method: 'shake',
    garnish: 'Orange slice + cherry',
    notes: 'Dry shake first (no ice) if using egg white, then shake with ice.',
    ingredients: [
      { id: 'bourbon-ws', name: 'Bourbon', amount: 50, unit: 'ml', emoji: '🥃', color: '#c0732a' },
      {
        id: 'lemon-juice',
        name: 'Lemon Juice',
        amount: 25,
        unit: 'ml',
        emoji: '🍋',
        color: '#f5e642',
      },
      {
        id: 'simple-syrup-ws',
        name: 'Simple Syrup',
        amount: 20,
        unit: 'ml',
        emoji: '🍯',
        color: '#f5d76e',
      },
      {
        id: 'egg-white',
        name: 'Egg White',
        amount: 15,
        unit: 'ml',
        emoji: '🥚',
        color: '#fffbf0',
      },
    ],
    tags: ['shaken', 'sour', 'egg'],
  },
]

export function getCocktail(id: string): Cocktail | undefined {
  return COCKTAILS.find((c) => c.id === id)
}

export const CATEGORIES = [...new Set(COCKTAILS.map((c) => c.category))]

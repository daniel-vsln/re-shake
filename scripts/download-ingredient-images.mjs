#!/usr/bin/env node
/**
 * Downloads ingredient images from TheCocktailDB.
 * Images land in public/ingredients/{id}.png
 *
 * Run: node scripts/download-ingredient-images.mjs
 */

import fs from 'fs'
import path from 'path'
import https from 'https'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT_DIR = path.resolve(__dirname, '../public/ingredients')
const BASE_URL = 'https://www.thecocktaildb.com/images/ingredients'
const DELAY_MS = 300 // pause between requests

// Map: our ingredient ID → TheCocktailDB ingredient name
// null = no match found, will be skipped and reported
const INGREDIENTS = [
  // ── Spirits ──────────────────────────────────────────────
  { id: 'gin',             db: 'Gin' },
  { id: 'vodka',           db: 'Vodka' },
  { id: 'rum',             db: 'White rum' },
  { id: 'dark-rum',        db: 'Dark rum' },
  { id: 'overproof-rum',   db: '151 proof rum' },
  { id: 'bourbon',         db: 'Bourbon' },
  { id: 'rye-whiskey',     db: 'Rye whiskey' },
  { id: 'scotch',          db: 'Blended Scotch' },
  { id: 'irish-whiskey',   db: 'Irish whiskey' },
  { id: 'cognac',          db: 'Cognac' },
  { id: 'brandy',          db: 'Brandy' },
  { id: 'mezcal',          db: 'Mezcal' },
  { id: 'tequila',         db: 'Tequila' },
  { id: 'absinthe',        db: 'Absinthe' },

  // ── Liqueurs ─────────────────────────────────────────────
  { id: 'campari',             db: 'Campari' },
  { id: 'aperol',              db: 'Aperol' },
  { id: 'cointreau',           db: 'Cointreau' },
  { id: 'triple-sec',          db: 'Triple sec' },
  { id: 'kahlua',              db: 'Kahlua' },
  { id: 'amaretto',            db: 'Amaretto' },
  { id: 'maraschino',          db: 'Maraschino' },
  { id: 'chartreuse-green',    db: 'Green Chartreuse' },
  { id: 'chartreuse-yellow',   db: 'Yellow Chartreuse' },
  { id: 'benedictine',         db: 'Benedictine' },
  { id: 'elderflower',         db: 'Elderflower cordial' },
  { id: 'creme-de-violette',   db: 'Creme de Violette' },
  { id: 'creme-de-menthe',     db: 'Green Creme de Menthe' },
  { id: 'creme-de-cacao',      db: 'Creme de Cacao' },
  { id: 'galliano',            db: 'Galliano' },
  { id: 'baileys',             db: 'Baileys irish cream' },
  { id: 'fernet',              db: 'Fernet' },
  { id: 'blue-curacao',        db: 'Blue Curacao' },
  { id: 'peach-schnapps',      db: 'Peach Schnapps' },
  { id: 'cherry-brandy',       db: 'Cherry brandy' },
  { id: 'chambord',            db: 'Chambord raspberry liqueur' },
  { id: 'falernum',            db: 'Falernum' },
  { id: 'allspice-dram',       db: 'Allspice Dram' },
  { id: 'suze',                db: 'Suze' },
  { id: 'creme-de-cassis',     db: 'Creme de Cassis' },

  // ── Wine / Vermouth / Champagne ──────────────────────────
  { id: 'sweet-vermouth',  db: 'Sweet Vermouth' },
  { id: 'dry-vermouth',    db: 'Dry Vermouth' },
  { id: 'champagne',       db: 'Champagne' },
  { id: 'prosecco',        db: 'Prosecco' },
  { id: 'lillet-blanc',    db: 'Lillet Blanc' },
  { id: 'sherry',          db: 'Dry Sherry' },
  { id: 'red-wine',        db: 'Red Wine' },

  // ── Bitters ──────────────────────────────────────────────
  { id: 'angostura',   db: 'Angostura Bitters' },
  { id: 'peychauds',   db: 'Peychauds Bitters' },

  // ── Juices ───────────────────────────────────────────────
  { id: 'lime-juice',         db: 'Lime juice' },
  { id: 'lemon-juice',        db: 'Lemon juice' },
  { id: 'orange-juice',       db: 'Orange juice' },
  { id: 'grapefruit-juice',   db: 'Grapefruit juice' },
  { id: 'cranberry-juice',    db: 'Cranberry juice' },
  { id: 'pineapple-juice',    db: 'Pineapple juice' },
  { id: 'tomato-juice',       db: 'Tomato juice' },
  { id: 'watermelon-juice',   db: 'Watermelon' },
  { id: 'cucumber-juice',     db: 'Cucumber' },

  // ── Syrups ───────────────────────────────────────────────
  { id: 'simple-syrup',        db: 'Sugar' },
  { id: 'honey-syrup',         db: 'Honey' },
  { id: 'agave-syrup',         db: 'Agave' },
  { id: 'orgeat',              db: 'Orgeat syrup' },
  { id: 'grenadine',           db: 'Grenadine' },
  { id: 'passion-fruit-syrup', db: 'Passion Fruit Syrup' },
  { id: 'raspberry-syrup',     db: 'Raspberry syrup' },
  { id: 'ginger-syrup',        db: 'Ginger' },

  // ── Dairy / Eggs ─────────────────────────────────────────
  { id: 'egg-white',     db: 'Egg White' },
  { id: 'espresso',      db: 'Espresso' },
  { id: 'cream',         db: 'Heavy cream' },
  { id: 'coconut-cream', db: 'Coconut cream' },

  // ── Mixers ───────────────────────────────────────────────
  { id: 'soda-water',   db: 'Carbonated water' },
  { id: 'tonic-water',  db: 'Tonic Water' },
  { id: 'ginger-beer',  db: 'Ginger Beer' },
  { id: 'cola',         db: 'Coca-Cola' },
  { id: 'beer',         db: 'Beer' },

  // ── Fresh / Other ────────────────────────────────────────
  { id: 'mint',               db: 'Mint' },
  { id: 'peach-puree',        db: 'Peach' },
  { id: 'strawberry-puree',   db: 'Strawberries' },
  { id: 'mango-puree',        db: 'Mango' },
  { id: 'passion-fruit-puree', db: 'Passion Fruit' },
  { id: 'worcestershire',     db: 'Worcestershire sauce' },
  { id: 'tabasco',            db: 'Tabasco sauce' },
  { id: 'horseradish',        db: 'Horseradish' },
]

// ── helpers ──────────────────────────────────────────────────────────────────

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest)
    https.get(url, (res) => {
      if (res.statusCode === 404) {
        file.close()
        fs.unlinkSync(dest)
        return reject(new Error('404'))
      }
      if (res.statusCode !== 200) {
        file.close()
        fs.unlinkSync(dest)
        return reject(new Error(`HTTP ${res.statusCode}`))
      }
      res.pipe(file)
      file.on('finish', () => file.close(resolve))
    }).on('error', (err) => {
      fs.unlink(dest, () => {})
      reject(err)
    })
  })
}

// ── main ─────────────────────────────────────────────────────────────────────

fs.mkdirSync(OUT_DIR, { recursive: true })

const ok = []
const failed = []

console.log(`Downloading ${INGREDIENTS.length} ingredients to ${OUT_DIR}\n`)

for (const { id, db } of INGREDIENTS) {
  const encodedName = encodeURIComponent(db)
  const url = `${BASE_URL}/${encodedName}.png`
  const dest = path.join(OUT_DIR, `${id}.png`)

  process.stdout.write(`  ${id.padEnd(24)} ← ${db} ... `)

  try {
    await download(url, dest)
    const size = fs.statSync(dest).size
    console.log(`✓  (${(size / 1024).toFixed(1)} KB)`)
    ok.push(id)
  } catch (err) {
    console.log(`✗  ${err.message}`)
    failed.push({ id, db, error: err.message })
  }

  await sleep(DELAY_MS)
}

// ── summary ──────────────────────────────────────────────────────────────────

console.log(`\n────────────────────────────────────────`)
console.log(`✓  ${ok.length} downloaded`)
console.log(`✗  ${failed.length} failed`)

if (failed.length > 0) {
  console.log(`\nFailed ingredients (need manual substitution):`)
  for (const { id, db, error } of failed) {
    console.log(`   ${id.padEnd(24)} (tried: "${db}") — ${error}`)
  }
}

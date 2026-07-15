#!/usr/bin/env node
/**
 * Downloads cocktail images from TheCocktailDB.
 * Searches by name, grabs strDrinkThumb, saves to public/cocktails/{id}.jpg
 *
 * Run: node scripts/download-cocktail-images.mjs
 */

import fs from 'fs'
import path from 'path'
import https from 'https'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT_DIR = path.resolve(__dirname, '../public/cocktails')
const API_BASE = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
const DELAY_MS = 400

// Map: our cocktail ID → search name for TheCocktailDB
// Where our name differs from what the DB calls it, the DB name is used.
const COCKTAILS = [
  // ── Classics ──────────────────────────────────────────────────────────
  { id: 'negroni',              search: 'Negroni' },
  { id: 'margarita',           search: 'Margarita' },
  { id: 'old-fashioned',       search: 'Old Fashioned' },
  { id: 'whiskey-sour',        search: 'Whiskey Sour' },
  { id: 'daiquiri',            search: 'Daiquiri' },
  { id: 'manhattan',           search: 'Manhattan' },
  { id: 'martini',             search: 'Dry Martini' },
  { id: 'gimlet',              search: 'Gimlet' },
  { id: 'sidecar',             search: 'Sidecar' },
  { id: 'mojito',              search: 'Mojito' },
  { id: 'sazerac',             search: 'Sazerac' },
  { id: 'french-75',           search: 'French 75' },
  { id: 'last-word',           search: 'Last Word' },
  { id: 'bees-knees',          search: "Bee's Knees" },
  { id: 'tom-collins',         search: 'Tom Collins' },
  { id: 'mint-julep',          search: 'Mint Julep' },
  { id: 'blood-and-sand',      search: 'Blood and Sand' },
  { id: 'clover-club',         search: 'Clover Club' },
  { id: 'americano',           search: 'Americano' },
  { id: 'rob-roy',             search: 'Rob Roy' },
  { id: 'stinger',             search: 'Stinger' },
  { id: 'corpse-reviver-no2',  search: 'Corpse Reviver No.2' },
  { id: 'gin-rickey',          search: 'Gin Rickey' },
  { id: 'jack-rose',           search: 'Jack Rose' },
  { id: 'aviation',            search: 'Aviation' },
  { id: 'hanky-panky',         search: 'Hanky Panky' },
  { id: 'tipperary',           search: 'Tipperary' },
  { id: 'vieux-carre',         search: 'Vieux Carre' },
  { id: 'twentieth-century',   search: 'Twentieth Century' },
  { id: 'white-negroni',       search: 'White Negroni' },

  // ── Contemporary ──────────────────────────────────────────────────────
  { id: 'espresso-martini',    search: 'Espresso Martini' },
  { id: 'paper-plane',         search: 'Paper Plane' },
  { id: 'penicillin',          search: 'Penicillin' },
  { id: 'naked-and-famous',    search: 'Naked and Famous' },
  { id: 'pornstar-martini',    search: 'Porn Star Martini' },
  { id: 'tommys-margarita',    search: "Tommy's Margarita" },
  { id: 'amaretto-sour',       search: 'Amaretto Sour' },
  { id: 'new-york-sour',       search: 'New York Sour' },
  { id: 'oaxacan-old-fashioned', search: 'Oaxacan Old Fashioned' },
  { id: 'spicy-margarita',     search: 'Spicy Margarita' },
  { id: 'jungle-bird',         search: 'Jungle Bird' },
  { id: 'port-light',          search: 'Port Light' },

  // ── Highballs ─────────────────────────────────────────────────────────
  { id: 'hugo-spritz',         search: 'Hugo Spritz' },
  { id: 'garibaldi',           search: 'Garibaldi' },
  { id: 'aperol-spritz',       search: 'Aperol Spritz' },
  { id: 'moscow-mule',         search: 'Moscow Mule' },
  { id: 'dark-and-stormy',     search: 'Dark and Stormy' },
  { id: 'gin-and-tonic',       search: 'Gin and Tonic' },
  { id: 'cuba-libre',          search: 'Cuba Libre' },
  { id: 'whiskey-highball',    search: 'Whiskey Highball' },
  { id: 'paloma',              search: 'Paloma' },
  { id: 'ranch-water',         search: 'Ranch Water' },
  { id: 'tom-collins',         search: 'Tom Collins' },
  { id: 'gin-rickey',          search: 'Gin Rickey' },

  // ── Low ABV ───────────────────────────────────────────────────────────
  { id: 'bamboo',              search: 'Bamboo' },
  { id: 'spritz-veneziano',    search: 'Spritz Veneziano' },
  { id: 'sherry-cobbler',      search: 'Sherry Cobbler' },
  { id: 'elderflower-spritz',  search: 'Elderflower Spritz' },

  // ── Shots ─────────────────────────────────────────────────────────────
  { id: 'b52',                 search: 'B-52' },
  { id: 'lemon-drop-shot',     search: 'Lemon Drop Shot' },
  { id: 'tequila-shot',        search: 'Tequila Shot' },
  { id: 'boilermaker',         search: 'Boilermaker' },
  { id: 'cement-mixer',        search: 'Cement Mixer' },

  // ── Tiki ──────────────────────────────────────────────────────────────
  { id: 'mai-tai',             search: 'Mai Tai' },
  { id: 'zombie',              search: 'Zombie' },
  { id: 'blue-hawaiian',       search: 'Blue Hawaiian' },
  { id: 'painkiller',          search: 'Painkiller' },
  { id: 'scorpion-bowl',       search: 'Scorpion Bowl' },
  { id: 'rum-punch',           search: 'Rum Punch' },
  { id: 'pineapple-daiquiri',  search: 'Pineapple Daiquiri' },
  { id: 'fog-cutter',          search: 'Fog Cutter' },
  { id: 'three-dots-and-a-dash', search: 'Three Dots and a Dash' },
  { id: 'suffering-bastard',   search: 'Suffering Bastard' },
  { id: 'hurricane',           search: 'Hurricane' },
  { id: 'pina-colada',         search: 'Pina Colada' },
  { id: 'navy-grog',           search: 'Navy Grog' },
  { id: 'sharks-tooth',        search: "Shark's Tooth" },

  // ── From Movies ───────────────────────────────────────────────────────
  { id: 'vesper-martini',      search: 'Vesper Martini' },
  { id: 'white-russian',       search: 'White Russian' },
  { id: 'singapore-sling',     search: 'Singapore Sling' },
  { id: 'grasshopper',         search: 'Grasshopper' },
  { id: 'brandy-alexander',    search: 'Brandy Alexander' },
  { id: 'harvey-wallbanger',   search: 'Harvey Wallbanger' },
  { id: 'long-island-iced-tea', search: 'Long Island Tea' },
  { id: 'tequila-sunrise',     search: 'Tequila Sunrise' },

  // ── Tropical ──────────────────────────────────────────────────────────
  { id: 'sex-on-the-beach',    search: 'Sex on the Beach' },
  { id: 'bay-breeze',          search: 'Bay Breeze' },
  { id: 'blue-lagoon',         search: 'Blue Lagoon' },
  { id: 'watermelon-margarita', search: 'Watermelon Margarita' },
  { id: 'cucumber-gimlet',     search: 'Cucumber Gimlet' },
  { id: 'mango-margarita',     search: 'Mango Margarita' },
  { id: 'chi-chi',             search: 'Chi Chi' },
  { id: 'strawberry-daiquiri', search: 'Strawberry Daiquiri' },
  { id: 'french-martini',      search: 'French Martini' },

  // ── Brunch ────────────────────────────────────────────────────────────
  { id: 'bellini',             search: 'Bellini' },
  { id: 'mimosa',              search: 'Mimosa' },
  { id: 'bloody-mary',         search: 'Bloody Mary' },
  { id: 'michelada',           search: 'Michelada' },
  { id: 'kir-royale',          search: 'Kir Royale' },

  // ── Sours / other ────────────────────────────────────────────────────
  { id: 'french-connection',   search: 'French Connection' },
  { id: 'lemon-drop',          search: 'Lemon Drop' },
  { id: 'cosmopolitan',        search: 'Cosmopolitan' },
]

// Deduplicate by id (tom-collins and gin-rickey appear twice above)
const seen = new Set()
const UNIQUE = COCKTAILS.filter(({ id }) => {
  if (seen.has(id)) return false
  seen.add(id)
  return true
})

// ── helpers ──────────────────────────────────────────────────────────────────

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = ''
      res.on('data', (chunk) => (data += chunk))
      res.on('end', () => {
        try { resolve(JSON.parse(data)) }
        catch (e) { reject(e) }
      })
    }).on('error', reject)
  })
}

function downloadUrl(url, dest) {
  return new Promise((resolve, reject) => {
    // Follow redirects (TheCocktailDB images may redirect)
    const get = (u) => {
      https.get(u, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          return get(res.headers.location)
        }
        if (res.statusCode !== 200) {
          return reject(new Error(`HTTP ${res.statusCode}`))
        }
        const file = fs.createWriteStream(dest)
        res.pipe(file)
        file.on('finish', () => file.close(resolve))
        file.on('error', (e) => { fs.unlink(dest, () => {}); reject(e) })
      }).on('error', reject)
    }
    get(url)
  })
}

// ── main ─────────────────────────────────────────────────────────────────────

fs.mkdirSync(OUT_DIR, { recursive: true })

const ok = []
const failed = []

console.log(`Downloading ${UNIQUE.length} cocktails to ${OUT_DIR}\n`)

for (const { id, search } of UNIQUE) {
  process.stdout.write(`  ${id.padEnd(28)} ← "${search}" ... `)

  try {
    const encoded = encodeURIComponent(search)
    const json = await fetchJson(`${API_BASE}${encoded}`)

    if (!json.drinks || json.drinks.length === 0) {
      throw new Error('not found in DB')
    }

    // Pick the best match: exact name match first, otherwise first result
    const exact = json.drinks.find(
      (d) => d.strDrink.toLowerCase() === search.toLowerCase()
    )
    const drink = exact ?? json.drinks[0]

    const imgUrl = drink.strDrinkThumb
    if (!imgUrl) throw new Error('no image URL')

    // Determine extension from URL
    const ext = imgUrl.split('?')[0].split('.').pop() || 'jpg'
    const dest = path.join(OUT_DIR, `${id}.${ext}`)

    await downloadUrl(imgUrl, dest)
    const size = fs.statSync(dest).size
    console.log(`✓  ${drink.strDrink} (${(size / 1024).toFixed(0)} KB)`)
    ok.push(id)
  } catch (err) {
    console.log(`✗  ${err.message}`)
    failed.push({ id, search, error: err.message })
  }

  await sleep(DELAY_MS)
}

// ── summary ──────────────────────────────────────────────────────────────────

console.log(`\n────────────────────────────────────────`)
console.log(`✓  ${ok.length} downloaded`)
console.log(`✗  ${failed.length} failed`)

if (failed.length > 0) {
  console.log(`\nFailed (need manual search or placeholder):`)
  for (const { id, search, error } of failed) {
    console.log(`   ${id.padEnd(28)} (searched: "${search}") — ${error}`)
  }
}

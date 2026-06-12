# Orfeas Tales — New Chat Start Here

_Last updated: 2026-06-12 (session 12)_

## What Is This Project?

A Greek/English children's comic website built by Pantelis for his son Orfeas. Each story is a Dogman-style comic (panels + speech bubbles + audio narration) with EN/GR toggle. Live at https://orfeas-tales.vercel.app

## Read These Docs First (in order)

1. This file ← you are here
2. `_docs/PROGRESS.md` — what's done, what's next
3. `_docs/CHARACTERS.md` — **critical before any Midjourney work**
4. `_docs/DECISIONS.md` — why things were done the way they were
5. `_docs/CLAUDE_STORY_UPDATE_GUIDE.md` — step-by-step process for adding stories

## Most Important Things to Know

### The Website — 4-File Architecture (as of session 12)
- **`index.html`** — HTML shell only; loads CSS and JS via tags (~180 KB total)
- **`styles.css`** — all CSS; loaded as `styles.css?v=2`
- **`app.js`** — all JavaScript; loaded as `app.js?v=2`
- **`stories-data.js`** — all story data (storyText, storyImages, audioFiles, comicData); loaded as `stories-data.js?v=2`
- **`vercel.json`** — immutable caching for CSS/JS/WebP/MP3; must-revalidate for index.html
- Deployed to Vercel via GitHub — auto-deploys on every push to `main`
- GitHub: https://github.com/ptsportsbookcom-sudo/orfeas-tales

### How to Push Files to GitHub (PRIMARY METHOD)

Write a `.bat` file and have Pantelis run it via Win+R:

```bat
@echo off
cd /d "D:\Orfeas tales"
git add styles.css app.js stories-data.js index.html
git commit -m "Your message"
git push origin main
pause
```

Run: Press **Win+R** → type `"D:\Orfeas tales\yourscript.bat"` → Enter  
(Quotes are required — folder name has a space)

**If local git is broken**: use `clone_and_push.bat` in the root folder.  
**Git repair**: use `repair_git_v2.bat` in the root folder.  
**DO NOT** try git from the bash sandbox — proxy blocks GitHub (HTTP 403).

### Cache Busting
When you change `styles.css`, `app.js`, or `stories-data.js`, increment the `?v=N` in `index.html`:
- Line near bottom: `<link rel="stylesheet" href="styles.css?v=2">`
- Near very bottom: `<script src="stories-data.js?v=2">` and `<script src="app.js?v=2">`
- When you bump: use `?v=3`, `?v=4` etc. Do NOT change audio/image `?v=` strings.

### Watch & Listen (WAL) — Key Facts
- Opens a fullscreen-capable comic reader with audio + TTS narration
- EN/GR language toggle syncs both audio and panel text
- Sync button (`🔄 Sync ON` / `⏸ Sync OFF`) auto-advances panels with audio
- **Mobile fullscreen**: tap Fullscreen → enters fullscreen; Exit button or Back exits
- **Browser Back/Forward** works correctly between all pages
- `beforePageChange(nextPage)` must be called BEFORE `showPage(nextPage)` — it handles WAL cleanup safely
- `showPage()` is pure: only DOM switching, nav class update, scroll top, history push

### showPage() / Navigation Pattern
```javascript
// ALWAYS call beforePageChange first when navigating:
beforePageChange('stories');
showPage('stories');

// beforePageChange() safely stops audio, exits fullscreen, hides wal-bar
// Each cleanup step is wrapped in try/catch — failures never block navigation
```

### Images
- All live panel/character images use **WebP** (compressed for web)
- Original **PNG** source files kept in folders as reference — **do not delete**
- All `<img>` tags use `loading="lazy" decoding="async"`

### Audio Generation
- **Primary tool**: `generate_audio.js` — run with `node generate_audio.js` from `D:\Orfeas tales\`
- Saves MP3s to root; move to correct story subfolder after
- No browser needed, no CORS issues
- To add a new story: add entry to the `STORIES` object in `generate_audio.js`

### Greek Text Rule
- Story text, speech bubbles, captions: **standard Modern Greek only**
- Audio narration: Cypriot dialect is fine
- Do NOT write Cypriot dialect in any text that appears on screen

### Character Consistency (Midjourney)
- **ALWAYS use `_docs/CHARACTERS.md`** before generating any panels
- Master style ref CDN: `https://cdn.midjourney.com/u/d02684e1-f98d-45c7-b961-84a5b639e7dd/03c393d85014a35cdbac164ffb9b622c756f0b9368d72525342d22c5930baa2e_384_N.png`
- Use `--cref [URL] --cw 80` directly in prompt text
- For each new story: generate a story-specific master ref first (see DECISIONS.md)

## Current Status (as of 2026-06-12)

### ✅ Fully Live and Working
- Story 1 — "The Lost Friends" (12 panels, 3 pages, EN+GR audio, auto-sync)
- Story 2 — "Rillas the Gorilla / Zoo Escape" (15 panels, 4 pages, EN+GR audio, auto-sync)
- Story 3 — "Rillas the Wrestler" (15+ panels, 4 pages, EN+GR audio, auto-sync)
- Story 4 — (panels + audio live; see PROGRESS.md for details)
- All audio files return HTTP 200 with correct content ✓
- SEO/social metadata, robots.txt, sitemap.xml
- All images compressed to WebP, lazy-loaded
- Illustrated Read mode — panels injected between story paragraphs
- Watch & Listen — clean panels (speech bubbles hidden), audio narrates
- Browser Back/Forward navigation across all pages
- `beforePageChange()` extracted — `showPage()` is pure
- CSS/JS/data assets cached with `?v=2`; Vercel immutable caching via vercel.json

### File Architecture
```
D:\Orfeas tales\
├── index.html          ← HTML shell (loads the 3 below)
├── styles.css          ← all CSS (?v=2)
├── app.js              ← all JS logic (?v=2)
├── stories-data.js     ← all story data (?v=2)
├── vercel.json         ← Vercel caching rules
├── generate_audio.js   ← Node.js TTS audio generator
├── repair_git_v2.bat   ← emergency git repair tool
├── clone_and_push.bat  ← push when local git is broken
├── characters/         ← character images (PNG + WebP)
├── music/              ← background music
├── story1/panels/      ← story 1 WebP panels + MP3s
├── story2/             ← story 2 assets
├── story3/             ← story 3 assets
├── story4/             ← story 4 assets
└── _docs/              ← this documentation
```

### 🔜 Next Steps
- Story 5 when ready (same pipeline as 1–4)
- Review live site and adjust any panel placements in Read mode that feel off

## Do Not Touch Unless Pantelis Asks
- Story text, audio, panel images, character names
- Folder structure
- Background music (`music/The Pyre.mp3`)
- Original PNG source files
- `?v=` strings on audio/image URLs

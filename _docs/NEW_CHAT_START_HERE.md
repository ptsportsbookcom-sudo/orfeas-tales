# Orfeas Tales — New Chat Start Here

_Last updated: 2026-06-10 (session 9)_

## What Is This Project?

A Greek/English children's comic website built by Pantelis for his son Orfeas. Each story is a Dogman-style comic (panels + speech bubbles + audio narration) with EN/GR toggle. Live at https://orfeas-tales.vercel.app

## Read These Docs First (in order)

1. This file ← you are here
2. `_docs/PROGRESS.md` — what's done, what's next
3. `_docs/CHARACTERS.md` — **critical before any Midjourney work**
4. `_docs/DECISIONS.md` — why things were done the way they were
5. `_docs/CLAUDE_STORY_UPDATE_GUIDE.md` — step-by-step process for adding stories

## Most Important Things to Know

### The Website
- Single file: `D:\Orfeas tales\index.html` — all CSS/JS inline (~137 KB)
- 2 stories live, Story 3 not started yet
- Deployed to Vercel via GitHub — auto-deploys on every push to `main`
- GitHub: https://github.com/ptsportsbookcom-sudo/orfeas-tales

### How to Push Files to GitHub (ONLY method that works)
The proxy blocks git/terminal. Use the Claude in Chrome extension:
1. Navigate to `https://github.com/ptsportsbookcom-sudo/orfeas-tales/upload/main`
2. Use `mcp__Claude_in_Chrome__find` → "file input upload" → get ref
3. Call `mcp__Claude_in_Chrome__file_upload` with paths from `D:\Orfeas tales\`
4. Triple-click the commit message field and type the message
5. Scroll down, click "Commit changes"

For files in subfolders (e.g. `_docs/`), navigate to the subfolder upload URL first:
`https://github.com/ptsportsbookcom-sudo/orfeas-tales/upload/main/_docs`

### Watch & Listen (WAL) — Key Facts
- Opens a fullscreen-capable comic reader with audio + TTS narration
- EN/GR language toggle syncs both audio and panel text
- Sync button (`🔄 Sync ON` / `⏸ Sync OFF`) auto-advances panels with audio
- **Mobile fullscreen**: tap Fullscreen button → enters fullscreen; Exit button or Back exits
- **Browser Back/Forward** works correctly between all pages (uses `history.pushState`)
- WAL state variables: `walSyncOn`, `walSyncPausedUntil`, `walLang`, `walAudio`, etc.
- All WAL variables are declared with `let` in the WAL init block (~line 2195)

### Images
- All live panel/character images in `index.html` use **WebP** (compressed for web)
- Original **PNG** source files are kept in their folders as reference — **do not delete them**
- `characters/og-image.jpg` is used for social sharing previews
- All `<img>` tags use `loading="lazy" decoding="async"`

### Audio Generation
- **Primary tool**: `generate_audio.js` in `D:\Orfeas tales\` — run with `node generate_audio.js` from a terminal in that folder (Cursor IDE works great)
- No browser, no CORS issues — Node.js calls Google Translate TTS directly
- Saves MP3s directly to `D:\Orfeas tales\` root; move to correct story subfolder after
- `tts-generator.html` also exists but has CORS issues from all browser origins (file://, Vercel, proxies all fail)
- ~1–2 min for both stories; 64kbps mono to stay under 10MB for GitHub upload

### Greek Text Rule
- Story text, speech bubbles, captions: **standard Modern Greek only**
- Audio narration: Cypriot dialect is fine (it's a family recording)
- Do NOT write Cypriot dialect in any text that appears on screen

### Character Consistency (Midjourney)
- **ALWAYS use `_docs/CHARACTERS.md`** before generating any panels
- Master style ref: `https://cdn.midjourney.com/35197821-c4da-45e8-89c9-a71ca313d5dd/0_1_640_N.webp`
- Use `--cref [URL] --cw 80` directly in prompt text (not the UI button)
- For each new story: generate a story-specific master ref first (see DECISIONS.md)

## Current Status (as of 2026-06-10)

### ✅ Fully Live and Working
- Story 1 — "The Lost Friends" (12 panels, 3 pages, EN+GR audio, auto-sync)
- Story 2 — "Rillas the Gorilla / Zoo Escape" (15 panels, 4 pages, EN+GR audio, auto-sync)
- Story 3 — **text complete** (`story3_en.txt`, `story3_gr.txt`); panels + comic reader + audio **still needed**
- All audio files return HTTP 200 with correct content (EN=English, GR=Greek) ✓
- SEO/social metadata, robots.txt, sitemap.xml
- All images compressed to WebP, lazy-loaded
- Accessibility: accessible comic nav buttons, menu/modal labels, Escape key closes
- Watch & Listen: mobile fullscreen, Exit button, Back exits fullscreen
- Browser Back/Forward navigation across all pages
- `audioFiles` uses `?v=2` cache-buster on all MP3 URLs

### 🔜 Next: Story 3 Panels + Comic Reader
1. Generate story-specific master 
# Orfeas Tales — New Chat Start Here

_Last updated: 2026-06-09 (session 7)_

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
- Tool: `tts-generator.html` in `D:\Orfeas tales\` — open in Chrome
- **Must run from** a translate.google.com tab (CORS requirement)
- Generates MP3 via Google Translate TTS API (free, no login)
- ~2 min per language

### Greek Text Rule
- Story text, speech bubbles, captions: **standard Modern Greek only**
- Audio narration: Cypriot dialect is fine (it's a family recording)
- Do NOT write Cypriot dialect in any text that appears on screen

### Character Consistency (Midjourney)
- **ALWAYS use `_docs/CHARACTERS.md`** before generating any panels
- Master style ref: `https://cdn.midjourney.com/35197821-c4da-45e8-89c9-a71ca313d5dd/0_1_640_N.webp`
- Use `--cref [URL] --cw 80` directly in prompt text (not the UI button)
- For each new story: generate a story-specific master ref first (see DECISIONS.md)

## Current Status (as of 2026-06-09)

### ✅ Fully Live and Working
- Story 1 — "The Lost Friends" (12 panels, 3 pages, EN+GR audio, auto-sync)
- Story 2 — "Rillas the Escape Artist" (15 panels, 4 pages, EN+GR audio, auto-sync)
- SEO/social metadata, robots.txt, sitemap.xml
- All images compressed to WebP, lazy-loaded
- Accessibility: accessible comic nav buttons, menu/modal labels, Escape key closes
- Watch & Listen: mobile fullscreen, Exit button, Back exits fullscreen
- Browser Back/Forward navigation across all pages

### 🔜 Next: Story 3
1. Pantelis records narration → shares with Claude
2. Claude transcribes → cleans to standard Greek + English
3. Generate story-specific master ref in Midjourney
4. Generate 12–15 panels using `--cref [story ref] --cw 80`
5. Generate audio with `tts-generator.html`
6. Add comic reader in `index.html` (new `s3p-` IDs, `COMIC_PAGES[3]`, `storyText[3]`)
7. Update hero stats bar (3 stories, new character count)
8. Push to GitHub

## Do Not Touch Unless Pantelis Asks
- Story text, audio, panel images, character names
- Folder structure
- Background music (`music/The Pyre.mp3`)
- Original PNG source files

# Orfeas Tales — Progress Tracker
_Last updated: 2026-06-13 (session 14)_

## ✅ Done

### Website
- [x] Built single-file `index.html` with character gallery, story reader, music toggle
- [x] Deployed to Vercel via GitHub auto-deploy
- [x] Background music set to `music/The Pyre.mp3` (medieval track, user chose this)
- [x] Character images updated to use panel-cropped versions (6_Aristotelis.png, 7_Thetokis.png)
- [x] All file paths updated after folder reorganisation (characters/, music/, story1/)

### Story 1 — "The Lost Friends"
- [x] Story written in English (`story1/story1_en.txt`, ~922 words)
- [x] Story written in Greek (`story1/story1_gr.txt`, ~944 words)
- [x] All 12 comic panels generated in Midjourney
- [x] Panels downloaded, renamed panel_01–panel_12, saved to `story1/panels/`
- [x] Folder reorganised and documented
- [x] Comic reader built in index.html (3 pages × 4 panels, speech bubbles, EN/GR toggle, prev/next nav)
- [x] "Read Comic" button added to Story 1 card
- [x] "Comic" nav link added to side nav
- [x] All files pushed to GitHub — live at https://orfeas-tales.vercel.app
- [x] **Greek audio generated** (`story1_gr.mp3`, 3.6MB) — via Google Translate TTS chunking in browser
- [x] **English audio generated** (`story1_en.mp3`, 3.0MB) — same method
- [x] Both MP3s pushed to GitHub, live and working on site (verified with HTTP 200)
- [x] `tts-generator.html` built — reusable tool in `D:\Orfeas tales\` for generating future story audio (no Claude needed)
- [x] **Audio ↔ panel auto-sync** added to comic reader — panels advance automatically as audio plays
  - Sync toggle button (🔄 Sync ON / ⏸ Sync OFF) in WAL bar
  - Manual prev/next navigation pauses auto-sync for 15 seconds so user can browse freely
  - Logic: `targetPage = floor(currentTime/duration * COMIC_PAGES) + 1`
- [x] index.html pushed to GitHub — live on Vercel
- [x] **Progress bar click area fixed** — bar was 4px tall (impossible to click); increased to 20px with centred visual track so users can seek audio by clicking/tapping

## 🔄 In Progress / Next Steps

### ✅ Story 2 — "Rillas the Escape Artist" — COMPLETE
Story 2 is fully live. 15 panels, 4 comic pages, EN+GR audio, bilingual bubbles, auto-sync. All pushed to GitHub/Vercel.

### Session 8 — 2026-06-09 (Story 3 text complete)
- [x] **Story 3 narration received** — WhatsApp audio recorded by Pantelis (6:31, Cypriot Greek dialect)
- [x] **Story 3 transcribed** — Pantelis used gemini.google.com directly (Claude's browser-based transcription attempts failed due to HuggingFace ZeroGPU quota exhaustion)
- [x] **`story3_gr.txt` rewritten** from real transcript — standard Modern Greek, correct characters and plot
- [x] **`story3_en.txt` rewritten** from real transcript — correct English version
- Story 3 title: **"Ο Ρίλλας ο Γορίλλας" / "Rillas the Gorilla"**
- Key story facts: ACW wrestling comes to Nicosia; Aristotelis (book-lover Theotokis reluctantly agrees); they recruit Rillas; Rillas disguised as wrestler with mask; doorman lets him in when he hears the winner gets anything; Rillas wins everything including a 30-athlete battle royale; prize = 1,001 bananas; Theotokis: "never again, we were lucky we didn't go to jail"
- Characters: Θεοτόκης (Theotokis), Αριστοτέλης (Aristotelis), Ρίλλας (Rillas) — quad bikes ("γουρούνες") as transport
- Opponent in first match: Πολυδεύκης ο Αλουπός (Polydefkis the Fox)

### 🔜 Story 3 — When Ready
Same pipeline as Stories 1 & 2:
1. **Pantelis records himself narrating** Story 3 to Orfeas (save as MP3/AAC)
2. **Share recording with Claude** — Claude transcribes → cleans Cypriot dialect → writes standard Greek + English versions
3. **Generate panels in Midjourney** — always generate a story-specific master ref first (see DECISIONS.md), then use `--cref [that ref URL] --cw 80`
4. **Generate audio** — use `tts-generator.html` in root folder; open in Chrome from translate.google.com tab
5. **Assemble comic reader** in index.html — new `s3p-` page IDs, add to `COMIC_PAGES`, `storyText[3]`
6. **Update stats**: increment Characters Unlocked and Stories Available in hero stats bar
7. **Push to GitHub** via upload interface

### Known Audio Generation Method (for future reference)
- **Tool**: `tts-generator.html` in `D:\Orfeas tales\` — open in Chrome, paste text, click Generate
- **Source**: Google Translate TTS API (free, no account needed)
- **Must be run from**: translate.google.com tab in Chrome (CORS requirement)
- **Speed**: ~2 min per language
- **Greek text rule**: Write in standard Modern Greek (NOT Cypriot dialect) — audio can stay Cypriot, written text must be standard

### Future Stories
- Each story gets its own folder: `story3/`, `story4/` etc.
- Same pipeline every time

### Session 6 — 2026-06-09 (bug fixes + Greek dialect cleanup)
- [x] **Stats bar fixed**: now shows "3 Characters Unlocked / 2 Stories Available" (was 2/1)
- [x] **Badge fixed**: hero badge now reads "2 Episodes Now Live"
- [x] **`goToComicPage` bug fixed**: was only hiding one page instead of all `.comic-page` divs; fixed with `querySelectorAll`
- [x] **Rillas image path fixed**: `characters/rillas.png` (was wrong path); `rillas.png` uploaded to GitHub characters folder
- [x] **4 corrupt character images fixed**: `9_Rilena.png`, `2_Arxigeena.png`, `3_Geas.png`, `5_Geena.png` were all-zero placeholder files; regenerated by cropping from `characters/00_collage_all.png` using Python PIL; all uploaded to GitHub
- [x] **Story 2 Greek text rewritten from Cypriot to standard Greek** — `storyText[2].gr` in index.html; all dialect words replaced (see DECISIONS.md for substitution list)
- [x] **Speech bubble attribution fixed** — Rillas' bubbles in panels 4, 6, 7 were appearing on the boys' side; corrected CSS classes (left-bubble → right-bubble / center-bubble)
- [x] **All panel `data-gr` bubble/caption attributes converted to standard Greek** — panels 1, 2, 3, 4, 6, 7, 9, 10, 13, 15 all updated; dialect removed throughout
- [x] **Pushed updated index.html to GitHub** — live on Vercel

### Session 7 — 2026-06-09 (website performance, accessibility, fullscreen, navigation)
- [x] **SEO/social metadata added** to `<head>`: Open Graph tags, Twitter card, page description, canonical URL
- [x] **`robots.txt` added** to repo root — allows all crawlers, references sitemap
- [x] **`sitemap.xml` added** to repo root — includes main site URL
- [x] **Claude Story Update Guide created** — `_docs/CLAUDE_STORY_UPDATE_GUIDE.md` — step-by-step process doc for adding stories
- [x] **All live panel/character images converted to WebP** in `index.html` — story1 and story2 panels, all character images now use compressed `.webp` files
- [x] **Original PNG source files kept** — not deleted; kept as reference for future Midjourney work
- [x] **`characters/og-image.jpg` added** — used for social sharing (Open Graph / Twitter preview image)
- [x] **All `<img>` tags now have `loading="lazy" decoding="async"`** — improves page load performance
- [x] **Comic navigation dots made accessible** — converted to `<button>` elements with `aria-label`
- [x] **Menu and modal accessibility improved** — added `aria-label` attributes, keyboard Escape closes both menu and modal
- [x] **Watch & Listen mobile fullscreen added** — Fullscreen button enters true browser fullscreen on mobile; Exit button and device Back button exit cleanly
- [x] **`walExitFullscreen({ fromPopState: true })` added** — Back button exits fullscreen without also navigating back in site history
- [x] **Browser Back/Forward navigation implemented** across all pages (Home, Stories, Characters, Read, Watch & Listen) — uses `history.pushState` in `showPage()`, `history.replaceState` on init, and `popstate` listener
- [x] **Watch & Listen language sync fixed** — EN/GR toggle now syncs both MP3 audio playback language and comic panel text (speech bubbles + captions) simultaneously
- [x] **Sync button encoding fixed** — `🔄 Sync ON` / `⏸ Sync OFF` emoji text restored after hex-extraction corruption from previous session's WAL function reconstruction
- [x] **TTS text splitter regex fixed** — middle dot `·` character restored to `/(?<=[.!?;·,])\s+/` (was corrupted to `?` during reconstruction)
- [x] **`let walSyncOn = true` and `let walSyncPausedUntil = 0` declarations added** — these were silently missing after the WAL function reconstruction; caused Sync toggle to throw ReferenceError
- [x] **Null bytes and control chars cleaned** — 119 `%\x00` null bytes and 2 `\x14` control chars removed from JS section-separator comments in `index.html`
- [x] **All changes pushed to GitHub** — live on Vercel; full verification pass done (site loads, WAL opens, Sync toggle works, navigation works)

### Session 9 — 2026-06-10 (English audio fixed for Stories 2 & 3)

#### Problem
- `story2_en.mp3` and `story3_en.mp3` on GitHub/Vercel contained **Greek narration** (wrong AAC source files had been converted in a previous session — both the Greek and English filenames had been populated from the same Greek recording).

#### What Was Done
- [x] **`generate_audio.js` created** — Node.js script saved to `D:\Orfeas tales\generate_audio.js`; fetches Google Translate TTS in chunks (no proxy, no browser CORS issues); generates both stories in one run
- [x] **Story 2 EN text added to `tts-generator.html`** — `'2-en'` entry now exists in the STORIES object with the full English zoo-escape story text
- [x] **Node.js script run via Cursor IDE** — Pantelis ran it from Cursor; generated `story2/story2_en.mp3` (2.3MB) and `story3/story3_en.mp3` (3.4MB) with correct English TTS narration
- [x] **Both files uploaded to GitHub** via Chrome extension file_upload → `story2/story2_en.mp3` and `story3/story3_en.mp3` — committed and deployed (Vercel production deploy confirmed)
- [x] **Cache-busting added** — `audioFiles` in `index.html` now uses `?v=2` on all MP3 URLs so existing open browser tabs get the fresh files instead of cached old ones
- [x] **index.html pushed to GitHub** with cache-bust change

#### Verification
- `story2_en.mp3` live size: 2,343,168 bytes ✓ (was 3,227,949 — old wrong file)
- `story3_en.mp3` live size: 3,498,240 bytes ✓ (was 3,130,221 — old wrong file)
- Both return HTTP 200 ✓

#### Tools / Lessons Learned
- **Google Translate TTS is blocked from Vercel origin** (CORS) — cannot call it from the live site's JS
- **CORS proxies (corsproxy.io, allorigins)** block TTS requests — 403/fail
- **Bash sandbox proxy** blocks `translate.googleapis.com` — Python requests fails
- **Chrome extension `navigate` blocks `file://` URLs** — can't open local HTML directly
- **Working method**: Node.js script on user's machine (no system proxy by default) → direct HTTPS to Google TTS → saves MP3 locally → Chrome extension uploads to GitHub
- **For future audio regeneration**: run `node generate_audio.js` from `D:\Orfeas tales\`

### Session 11 — 2026-06-11 (Name spelling fix)

- [x] **Fixed name spelling throughout `index.html`** — replaced all instances of `Theodokis` → `Theotokis` and `Θεοδόκης` → `Θεοτόκης` in Story 3 content (panel captions lines 1778, 1779, 1837, 1838 and full `storyText[3]` EN + GR text)
- [x] **Image filenames unchanged** — `characters/7_Thetokis.webp` left as-is (loads correctly; only displayed text was fixed)
- [x] **Pushed to GitHub** — commit "Fix name spelling: Theodokis → Theotokis, Θεοδόκης → Θεοτόκης in Story 3"; Vercel deployed

### Session 10 — 2026-06-11 (Illustrated Read mode + clean Watch & Listen)

#### What Was Done
- [x] **Illustrated Read mode built** — `_renderStoryReader` now interleaves panel images between story paragraphs
  - Added `const storyImages` object to `index.html` — maps each panel to the paragraph index it illustrates (0-based)
  - Story 1: 12 panels mapped across 43 paragraphs
  - Story 2: 15 panels mapped across ~56 paragraphs
  - Story 3: 15 panels mapped across ~63 paragraphs
  - CSS: `.story-illustration` — block, max-width 520px, centred, rounded corners, shadow
- [x] **Speech bubbles and captions hidden in Watch & Listen** — two CSS rules added:
  `.comic-panel .speech-bubble, .comic-panel .panel-caption { display:none; }`
  Panels now show as clean illustrations — audio narrates, no conflicting on-screen text
- [x] **Confirmed all panels are already clean images** — no baked-in text in any WebP files across stories 1, 2, 3. The "text" was always HTML overlays, not image content.
- [x] **Both changes pushed to GitHub** — two separate commits, Vercel deployed both

#### Key Facts for Next Session
- `storyImages` is defined just above `_renderStoryReader` in `index.html` (~line 2671)
- Panel → paragraph mapping is approximate (0-indexed). If any panel appears in the wrong place, adjust the `after` value by ±1-2
- Watch & Listen: comic grid still exists and functions — audio sync, prev/next, language toggle all intact. Only bubbles/captions are hidden.
- Read mode: same `story-reader` page as before, just now with panel images injected

### Session 12 — 2026-06-12 (4-file refactor shipped + hardening + git repair)

#### Architecture Refactor (completed, live)
- [x] **Refactored single `index.html` into 4 files**: `index.html` (HTML only), `styles.css`, `app.js`, `stories-data.js`
  - `styles.css` — all CSS extracted (~8 KB)
  - `stories-data.js` — all story data (storyText, storyImages, audioFiles, comicData) extracted (~77 KB)
  - `app.js` — all JavaScript logic extracted (~21 KB)
  - `index.html` — pure HTML shell, loads the three above via `<link>` and `<script src>` tags
- [x] **Static asset caching added** — `vercel.json` added: CSS/JS/WebP/MP3 assets get `Cache-Control: immutable` (1 year); `index.html` gets `must-revalidate`
- [x] **All 4 files pushed to GitHub** — live and verified on orfeas-tales.vercel.app

#### Hardening Pass (completed, live)
- [x] **`beforePageChange(nextPage)` extracted** — cleanup (walStop, walExitFullscreen, hide wal-bar) moved OUT of `showPage()` into a separate safety function. All 5 call sites in app.js updated.
- [x] **`showPage()` is now pure** — only validates page, switches DOM, updates nav classes, closes nav, scrolls to top, updates history. Zero audio/WAL side-effects.
- [x] **Cache versions bumped to `?v=2`** for `styles.css`, `app.js`, `stories-data.js` in `index.html`. Audio/image `?v=` strings left unchanged.
- [x] **All smoke checks passed**:
  - `node -c app.js` → PASS
  - `node -c stories-data.js` → PASS
  - 0 `onclick` in index.html ✓
  - 0 inline `<style>` in index.html ✓
  - 0 inline `<script>` in index.html ✓
  - No duplicate function declarations in app.js ✓
  - 5 `beforePageChange` call sites confirmed ✓
  - `?v=2` on all 3 assets confirmed ✓
- [x] **Live verification**: `typeof beforePageChange === 'function'` ✓, `showPage()` contains no `walStop` ✓, deployed assets return HTTP 200 ✓

#### Git Repair (completed)
- [x] **Diagnosed corrupted `.git` object store** — pack file (`pack-3fa33dbe...pack`, 116 MB) was all zeros; multiple loose objects also corrupt with `inflate: data stream error`. Root cause: Linux sandbox NTFS mount mangled the git object store over multiple sessions.
- [x] **Repaired via `repair_git_v2.bat`**: cloned fresh from GitHub to `D:\temp-git-fix`, backed up corrupt `.git` to `.git.bak` via PowerShell `Move-Item`, moved fresh `.git` in, cleaned up. `git fsck` now shows zero errors.
- [x] **Hardening commit pushed via `clone_and_push.bat`** (before repair): fresh clone → copy modified files → commit → push → delete temp. Commit `75696a6` is live on GitHub main.

#### Key Files Created This Session
- `D:\Orfeas tales\styles.css` — extracted CSS
- `D:\Orfeas tales\app.js` — extracted JS
- `D:\Orfeas tales\stories-data.js` — extracted story data
- `D:\Orfeas tales\vercel.json` — caching rules
- `D:\Orfeas tales\repair_git_v2.bat` — git repair tool (keep for emergencies)
- `D:\Orfeas tales\clone_and_push.bat` — push-without-local-git tool (keep for emergencies)

### Session 13 — 2026-06-13 (Repo audit, critical restore, .gitignore, cleanup)

#### Repo Audit
- [x] **Full local repo state audit** — identified all modified tracked files and untracked files; categorised by: website-critical, real project work, noise/temp, keep/ask
- [x] **Critical finding: styles.css truncated locally** — local copy ended at `box-shadow:0 -8p` (line 1,178); deployed HEAD had 1,215 complete lines including all fullscreen-mode CSS. Committed via Codex.
- [x] **Critical finding: vercel.json corrupted locally** — local file was invalid JSON (unterminated string, missing closing `}` and `]`). Restored via Codex.
- [x] **Critical finding: story3/panels/ 01–09 were 0 bytes locally** — the `story3/panels/` folder had a Windows NTFS `.gitattributes` path issue (Invalid argument on `ls`). Panels 01–09 were empty/missing locally but intact in git HEAD. Restored via Codex.
- [x] **Discovery: story3 has 4 new panels** — `panel_12.webp`, `panel_13b.webp`, `panel_14.webp`, `panel_15.webp` are present locally but not yet committed. Story 3 now has 15+ panels ready.
- [x] **Confirmed safe files** — `index.html`, `app.js`, `stories-data.js` were all identical to HEAD (CRLF line-ending difference only — functionally unchanged). `styles.css`, `vercel.json` match HEAD after restore.

#### Cleanup
- [x] **`.gitignore` created and committed** — commit `40e412c`. Covers: `.git.bak/`, `story3/panels_corrupt_backup_*/`, `*.bat`, `*.ps1`, `*_log.txt`, `debug_*.png`, `test_write.txt`, `*.aac`, `**/WhatsApp Audio*`, `story4/panels/*.png`, `story1/panels/u663*.png`, `characters/u663*.png`, `story1/panels/preview.html`, `music/background_music.mp3`
- [x] **30 confirmed temp files deleted** — all `.bat`/`.ps1` repair scripts, all `*_log.txt` files, `debug_row3_full.png`, `debug_row3_labels.png`, `test_write.txt`. Deleted via Codex on Windows side.
- [x] **Source assets, backups, docs all preserved** — `.git.bak/`, `story3/panels_corrupt_backup_*/`, raw audio (`.aac`, WhatsApp), story text, PNG source masters, character refs, prompts, `index_good.html` all untouched.

#### Workflow Discovery
- [x] **Bash sandbox has stale Windows mount cache** — Claude's Linux sandbox cannot reliably read, write, or git-commit files that were modified by Codex or other Windows tools in the same session. Git operations and file deletions must go through Codex (Windows-side).
- [x] **Established clean workflow**: Claude analyses/plans → Codex executes on Windows → Claude verifies via sandbox (understanding sandbox may lag)

#### Deferred (not yet committed — awaiting separate decisions)
- Compressed audio: `music/The Pyre.mp3`, `story2/story2_gr.mp3`, `story3/story3_gr.mp3` (re-encoded to ~1/3 size)
- Updated docs: all `_docs/*.md` + root `CLAUDE_STORY_UPDATE_GUIDE.md`
- Story text: `story2_en.txt`, `story2_gr.txt`, `story3/story3_en.txt`, `story3/story3_gr.txt`
- Character refs: `characters/aristotelis_ref.webp`, `theotokis_ref.webp`, `panel_master_ref.webp`
- `tts-generator.html` (expanded)
- `robots.txt`, `sitemap.xml` (Story 4 entries)
- `story4/panels/panel12a_aristotelis_closeup_v1.webp`
- Story 3 new panels: `panel_12.webp`, `panel_13b.webp`, `panel_14.webp`, `panel_15.webp`
- Untracked source files: story text `.txt` files, prompt `.md` files, `generate_audio.js`, `_docs/PROJECT.md`
- Character PNGs in root (`1_Arxigeas.png` etc.) — marked modified but same byte size; cause unclear

### Session 14 — 2026-06-13 (Story 5 started: texts, audio script, 3 new characters, pushed)

#### Story 5 — "Saving Gorillatsos / Σώζοντας τον Γορίλλατσο"
- [x] **`story5/story5_gr.txt` created** — full standard Modern Greek version of Story 5. Cleaned from Cypriot dialect raw transcript. Title: "Σώζοντας τον Γορίλλατσο"
- [x] **`story5/story5_en.txt` created** — full English version. Title: "Saving Gorillatsos"
- [x] **Key story facts**: Gorillatsos is Rillas's **cousin** (ξάδερφος) — NOT nephew. Boys + Rillas track Poachers to their hideout. Rillas wears knight's armour as decoy (arrows bounce off shield). Boys sneak in ninja-style, find 3 cages, free Gorillatsos + Maimudakis + Rilena. Rillas hears cousin's voice and smashes through walls. All escape on quad bikes ("γουρούνες"). Rilena catches Rillas's eye (his ears go red). All become friends.
- [x] **`generate_a
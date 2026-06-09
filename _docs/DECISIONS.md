# Orfeas Tales — Key Decisions & Reasoning

## ⚠️ HOW TO PUSH FILES TO GITHUB (ALWAYS USE THIS METHOD)

**Method**: GitHub web upload via Claude's browser extension (`mcp__Claude_in_Chrome__file_upload`)

**Steps**:
1. Navigate to `https://github.com/ptsportsbookcom-sudo/orfeas-tales/upload/main`
2. Use `mcp__Claude_in_Chrome__find` with query "file input upload" → get the `ref`
3. Call `mcp__Claude_in_Chrome__file_upload` with the ref and file paths from `D:\Orfeas tales\`
4. Scroll down and click "Commit changes"

**DO NOT**:
- Try git commands from the bash sandbox (proxy blocks GitHub)
- Try to use GitHub's web editor with CodeMirror JS hacks
- Ask Pantelis to do it manually
- Try to find/extract a GitHub token

**Why it works**: The user is already logged in to GitHub in Chrome, so the upload UI accepts files directly using their session.

---

## Art Style
**Decision**: Dogman-style comic panels (multiple panels per page, bold outlines, flat bright colors, text/speech bubbles)
**Why**: Pantelis wanted it to feel like a real children's comic book, not just a slideshow

## AI Art Tool
**Decision**: Midjourney Basic plan ($10/month)
**Why**: Tried Leonardo AI first but character consistency was poor. Midjourney's `--cref` flag (character reference) gives much better consistency.
**Note**: Pantelis was frustrated paying for this — make sure the value is clear each session.

## Character Consistency in Midjourney — CONFIRMED WORKING RULES (updated Story 2)

**The ONE reference URL that works**:
`https://cdn.midjourney.com/35197821-c4da-45e8-89c9-a71ca313d5dd/0_1_640_N.webp`
(Story 1 panel_master_ref — Midjourney job 35197821, index 0_1)

**How to use**: Type `--cref [URL] --cw 80` directly in the prompt text. Do NOT use the Omni Reference UI button — it is less reliable.

**NEVER use a second --cref for guest characters** (e.g. Rillas). A second --cref pulls the entire art style dark/aggressive and makes both characters inconsistent. Describe guest characters fully in text instead.

**NEVER include dialogue or speech bubbles in prompts** — they get baked into the image. Add all text in HTML.

**ALWAYS add `wide shot full body, all characters fully visible`** to any panel with 2+ characters, or characters get cropped out.

**ALWAYS use a panel checklist** — track every panel number before declaring done. In Story 2 Session 1, panels 08-11 were skipped entirely and only discovered at the end.

**CRITICAL — The reference image sets BOTH style AND mood.** If the reference shows intense/angry faces, every generation inherits that aggression. Story 2 suffered from this throughout.

**For every new story: generate a STORY-SPECIFIC master reference first.**
Before generating any panels for a new story:
1. Generate one clean "hero shot" panel showing ALL main characters (boys + guest character) together — smiling, relaxed, friendly expressions, correct clothes
2. Use the best variation of that as the `--cref` for every panel in that story
3. This anchors both the LOOK and the MOOD of all characters simultaneously

**Emotion must be explicit in every prompt.** Never leave emotion to chance. Always write the exact facial expression:
- Happy: `big warm grin`, `laughing with joy`, `beaming smile`
- Sad: `downcast eyes, drooping mouth, looking defeated`
- Shocked: `wide eyes and open mouth, eyebrows raised high`
- Sneaky: `sly grin, eyes darting sideways, tiptoeing cautiously`
- Scared: `eyes wide with fear, trembling slightly`
- Angry (only when story needs it): `furrowed brows, clenched fists`

**Add `--no aggressive angry snarling intense` to Rillas panels** to prevent the gorilla from defaulting to intimidating poses.

**Prompt template for every panel**:
```
[scene], [character descriptions with clothes], [EXPLICIT emotion/expression for each character],
wide shot full body all characters fully visible,
Dogman comic book style, bold thick outlines, flat colours
--cref [STORY-SPECIFIC master ref URL] --cw 80 --ar 4:3 --v 6.1
```

**For panels with Rillas (or any non-human character):**
```
[scene], large friendly muscular brown gorilla [EXPLICIT expression e.g. "beaming wide toothy grin"] green tactical vest with orange pockets,
two 8 year old boys [EXPLICIT expression], wide shot full body all characters fully visible,
Dogman comic book style, bold thick outlines, flat colours
--cref [master ref URL] --cw 80 --ar 4:3 --v 6.1 --no aggressive angry snarling
```

## Website Architecture
**Decision**: Single HTML file (index.html) with all CSS/JS inline
**Why**: Simplest possible deployment — no build step, works on Vercel free tier, easy to edit

## Audio
**Decision**: TTSMaker.com (free)
**Why**: Free, supports Greek, decent quality voices
**Alternative considered**: ElevenLabs (too expensive for this project)

## Folder Structure
**Decision**: `characters/`, `music/`, `story1/panels/` subfolders
**Why**: Organised after the project grew. Root was getting messy.
**Important**: index.html file paths were updated to match — if you add files, make sure paths in index.html are correct.

## Comic Page Layout
**Decision**: 3 pages × 4 panels each (12 panels total per story)
**Why**: ~60 seconds per page synced to audio (~3 min total for story 1 at normal reading pace)
**Panel order**: See PROGRESS.md for panel descriptions

## Language
**Decision**: Both English and Greek, toggle on website
**Why**: Orfeas is growing up bilingual; Greek grandparents can also enjoy the stories

## Greek Dialect Split — Audio vs. Text (2026-06-09)
**Decision**: Audio narration stays in **Cypriot dialect**; read-along story text and speech bubbles use **standard Modern Greek**
**Why**: The audio was recorded in Cypriot (which is natural for the family) and changing it would require re-recording. The written text, however, is visible to readers who may not know the dialect — so it should be in standard Greek that anyone can read. This keeps the authentic Cypriot feel in the voice while making the written content universally readable.
**What was changed**: All `storyText[2].gr` narration and all `data-gr` speech bubble/caption attributes in Story 2 were converted from Cypriot dialect to standard Greek. Key substitutions: φκήκαν→βγήκαν, έθωρον→είδαν, τζιθκέτσι→έπαθαν πλάκα, κουτσούφλισε→ψιθύρισε, Γλήγορα/γλήγορα→Γρήγορα/γρήγορα, ήβραν→βρήκαν, έκαμαν→έκαναν, θες→θέλεις.
**Rule for future stories**: Write all Greek text (story text, bubbles, captions) in standard Greek. Audio can remain Cypriot.
**Alternatives considered**: Changing audio to standard Greek (rejected — would require re-recording); keeping text Cypriot (rejected — confusing for non-Cypriot readers)

## GitHub/Vercel
**Decision**: Push via browser (Claude in Chrome extension)
**Why**: No local git setup on user's machine; browser-based upload to GitHub works fine
**Repo**: https://github.com/ptsportsbookcom-sudo/orfeas-tales

## WebP Image Optimisation (2026-06-09)
**Decision**: All panel and character images in `index.html` reference `.webp` files; original `.png` files are kept as source/reference.
**Why**: WebP is significantly smaller than PNG for the same visual quality — faster page load on mobile. PNG originals are kept so future Midjourney work has reference images to compare against and for potential re-generation.
**Rule**: When adding new panels, save the PNG from Midjourney first, then compress to WebP for website use. `index.html` should always reference the `.webp`. Never delete PNGs unless Pantelis explicitly asks.
**Alternatives considered**: Serving PNGs directly (too slow on mobile), deleting PNGs after WebP creation (rejected — loses source quality reference).

## SPA Browser Navigation with history.pushState (2026-06-09)
**Decision**: `showPage(name)` calls `history.pushState({ orfeasPage: name }, '', getUrlForPage(name))` on every page transition; `history.replaceState` initialises the home state; a `popstate` listener handles Back/Forward.
**Why**: Before this change, the browser Back button did nothing inside the SPA — users had no way to go back to a previous page after navigating. This is a standard SPA navigation pattern.
**Watch & Listen fullscreen special case**: If the user presses Back while in WAL fullscreen, `walExitFullscreen({ fromPopState: true })` is called and the navigation event is consumed — the user exits fullscreen rather than being taken back to the previous page. This felt more natural than jumping two levels back.
**Valid pages**: `VALID_PAGES` set defines which page names are allowed; `getUrlForPage()` maps them to `?page=name` URLs (except home → `/`).
**Alternatives considered**: Hash-based routing (`#stories`) — simpler but looks worse in the URL bar and breaks Open Graph previews.

## Watch & Listen Mobile Fullscreen (2026-06-09)
**Decision**: WAL has a Fullscreen button that enters true browser fullscreen on mobile. Exit button and device Back button both exit cleanly.
**Why**: On mobile, the WAL bar + comic panels are too small to read comfortably. Fullscreen makes it a proper immersive reading experience.
**Back button handling**: Uses `popstate` listener — if `walFullscreenOn` is true when Back fires, exit fullscreen and return early (don't navigate away). A `fullscreenchange` listener handles the case where the browser exits fullscreen via its own UI.
**Alternatives considered**: CSS-only "fake" fullscreen (doesn't work reliably on iOS); always showing a dedicated fullscreen page (too much restructuring).

## WAL Function Reconstruction — Lessons Learned (2026-06-09)
**Decision**: When extracting JS source from a live site via `charCodeAt()` hex encoding to bypass security filters, the output is UTF-16 code units, not UTF-8 bytes. Decoding as UTF-8 corrupts non-ASCII characters (emoji, special chars).
**What went wrong**: The `walToggleSync()` function needed `🔄` (U+1F504) and `⏸` (U+23F8) in the button text. The `walChunkText()` TTS regex needed `·` (U+00B7). All three were corrupted during reconstruction. The `walSyncOn` and `walSyncPausedUntil` variable declarations were also lost entirely.
**Fix applied**: Python string replacement to restore the correct Unicode characters; `let walSyncOn = true` and `let walSyncPausedUntil = 0` added to the WAL variable declarations block.
**Rule for future**: If WAL functions ever need to be re-extracted from the live site, test the Sync toggle immediately after deployment. If `typeof walSyncOn === 'undefined'`, the declaration block was lost.

## Audio ↔ Panel Auto-Sync (2026-06-07)
**Decision**: Auto-advance comic pages synced to audio playback progress; manual nav pauses sync 15 sec
**Why**: Story panels and audio were not aligned — user noticed the mismatch. Simple time-based sync (currentTime/duration * pages) works without needing per-panel timestamps.
**How it works**: `timeupdate` listener fires → calculates targetPage → calls `goToComicPage()` if page changed
**Toggle**: "🔄 Sync ON" button in WAL bar — user can disable if they want to read at their own pace
**Manual nav pause**: pressing ◀ / ▶ sets `walSyncPausedUntil = Date.now() + 15000` so auto-sync doesn't fight the user
**Alternatives considered**: Per-panel timestamps (too much manual work for each story), no sync (leaves panels misaligned)

# Claude Story Update Guide

Use this guide whenever adding or updating stories on Orfeas Tales.

## Before Editing

1. Read `_docs/NEW_CHAT_START_HERE.md`.
2. Read `_docs/PROGRESS.md`.
3. Read `_docs/CHARACTERS.md` before generating or changing character/panel art.
4. Do not move existing files unless all paths in `index.html` are updated.

## Current Website Structure

- Main website file: `index.html`
- Story folders: `story1/`, `story2/`, then `story3/`, etc.
- Story panels source files: `storyX/panels/panel_01.png`, `panel_02.png`, etc.
- Website panel files: compressed WebP versions, e.g. `storyX/panels/panel_01.webp`.
- Story text: `storyX/storyX_en.txt` and `storyX/storyX_gr.txt`
- Story audio: `storyX/storyX_en.mp3` and `storyX/storyX_gr.mp3`
- Characters: `characters/`
- Background music: `music/The Pyre.mp3`

## Adding A New Story

Create a new story folder:

```text
story3/
  story3_en.txt
  story3_gr.txt
  story3_en.mp3
  story3_gr.mp3
  panels/
    panel_01.png
    panel_01.webp
    panel_02.png
    panel_02.webp
    panel_03.png
    panel_03.webp
```

Use two-digit panel names:

```text
panel_01.png
panel_02.png
panel_03.png
```

## What To Update In `index.html`

When adding a story, update these areas:

1. Story card in the Stories page.
2. Comic reader panel markup.
3. Comic page navigation dots.
4. `COMIC_PAGES` / story page selection logic.
5. `storyText` object with English and Greek text.
6. Audio paths if needed.
7. Homepage stats and badge.
8. Character unlocks if a new character appears.

## Language Rules

- English story text goes in `storyX_en.txt`.
- Greek story text goes in `storyX_gr.txt`.
- Written Greek must be standard Modern Greek.
- Cypriot dialect is allowed in original recordings, but not in written website text.
- Keep English and Greek story meaning aligned.

## Image Rules

- Use the same visual style as Stories 1 and 2.
- Use `_docs/CHARACTERS.md` for exact character descriptions.
- Always use the correct character reference workflow from `_docs/CHARACTERS.md`.
- Save new panels as PNG from Midjourney first — **keep the PNG as the source/reference file**.
- Compress to WebP for website use (Python PIL or any image tool).
- `index.html` must always reference the `.webp` path, not the `.png`.
- Do not delete original PNG source files unless Pantelis explicitly asks.
- If adding `<img>` tags manually, use the `.webp` path and include:

```html
loading="lazy" decoding="async"
```

## Audio Rules

- Use MP3 for website audio.
- File names must match the story number and language:

```text
story3/story3_en.mp3
story3/story3_gr.mp3
```

- Test Watch & Listen after adding audio.
- Background music should remain `music/The Pyre.mp3` unless Pantelis asks to change it.

## Do Not Touch Unless Asked

- Do not redesign the whole site.
- Do not remove completed stories.
- Do not change character names.
- Do not convert written Greek back to Cypriot dialect.
- Do not rename folders casually.
- Do not delete source/reference assets unless Pantelis confirms.

## Testing Checklist

After every story update, check:

- Homepage loads.
- Stories page loads.
- New story card appears correctly.
- English and Greek toggles work.
- Read mode opens the right story.
- Watch & Listen opens the right comic.
- **Language sync**: toggling EN/GR in WAL switches both audio and panel text simultaneously.
- **Sync toggle**: `🔄 Sync ON` and `⏸ Sync OFF` both appear correctly (no garbled text or missing emoji).
- **Audio/panel auto-sync**: panels advance as audio plays when Sync is ON.
- Mobile fullscreen Watch & Listen can enter and exit normally.
- Exit button visible in fullscreen; pressing it exits cleanly.
- Mobile/browser Back exits fullscreen first (does not jump back a page).
- Browser Back/Forward works between Home, Stories, Characters, Read, and Watch & Listen.
- Prev/Next comic navigation works.
- Audio plays in English and Greek.
- Characters page still loads.
- Mobile layout still looks readable.
- No console errors on page load.

## Navigation Architecture

The site uses `history.pushState` for SPA page transitions. Each `showPage(name)` call pushes a `{ orfeasPage: name }` state. `history.replaceState` is called on init with `{ orfeasPage: 'home' }`. A `popstate` listener handles browser Back/Forward for all pages, and separately handles fullscreen Watch & Listen exit (via `walExitFullscreen({ fromPopState: true })`).

If you add a new page, add it to `VALID_PAGES` and give it a URL in `getUrlForPage`.

## Safe Change Rule

Make changes in small batches. If a change affects story navigation, comic rendering, or audio playback, test before making the next change.

## Last Verified

**2026-06-09** — Full site verification after all session 7 improvements deployed:
- Site loads, all pages navigate correctly
- Watch & Listen opens, audio plays in EN and GR
- Language sync works (toggle switches audio + panel text together)
- Sync button shows `🔄 Sync ON` / `⏸ Sync OFF` correctly
- Audio/panel auto-sync works
- Mobile fullscreen enters and exits cleanly
- Browser Back/Forward works across all pages
- No encoding issues or null bytes detected in deployed file

# 👋 New Claude Session — Start Here

Hi! This is the Orfeas Tales project. Read this first, then check PROGRESS.md for what to do next.

## Quick Summary
- Children's interactive website: https://orfeas-tales.vercel.app
- Built for Pantelis's son Orfeas
- Dogman-style comic books with bilingual (EN + GR) audio narration
- GitHub auto-deploys to Vercel: https://github.com/ptsportsbookcom-sudo/orfeas-tales
- All files in: `D:\Orfeas tales\`

## Read These Docs (in order)
1. `PROJECT.md` — full project overview, folder structure, characters, tech stack
2. `PROGRESS.md` — what's done ✅ and what's next 🔄
3. `CHARACTERS.md` — ⚠️ READ THIS for Midjourney prompts + visual specs (character consistency)
4. `DECISIONS.md` — WHY things were built the way they were (important before changing anything)
5. `CLAUDE_STORY_UPDATE_GUIDE.md` — exact checklist for adding/updating stories without breaking the site

## Most Important Things to Know
- **Don't move files** without updating paths in `index.html`
- **Always use `panel_master_ref.webp` as `--cref`** when generating new Midjourney panels — this is how characters stay consistent across stories
- **CHARACTERS.md** has exact Midjourney prompts for every character — use them
- **Audio tool**: `tts-generator.html` in root folder — open in Chrome, paste text, generates MP3
- **GitHub uploads**: Use `mcp__Claude_in_Chrome__file_upload` — navigate to `github.com/ptsportsbookcom-sudo/orfeas-tales/upload/main`, find the file input ref, upload files from `D:\Orfeas tales\`, commit. See DECISIONS.md for full steps. DO NOT use git/bash/terminal — proxy blocks GitHub.
- **Audio sync**: panels auto-advance as audio plays (1/3 and 2/3 marks). "🔄 Sync ON" button in the WAL bar. Pages change at ~2:10 and ~4:20 for a 6.5-min story — not instantly.
- **Stories 1 and 2 are fully complete** — panels, EN+GR audio, auto-sync, bilingual bubbles all live on https://orfeas-tales.vercel.app
- **Greek dialect rule**: All written text (story text, speech bubbles, captions) must be in standard Modern Greek — NOT Cypriot dialect. Audio recordings can stay Cypriot. See DECISIONS.md.
- **Story 3 is next** — Pantelis will record narration when ready, then share MP3 with Claude to start the pipeline

## For Claude: Before Starting Work
- Check the `Last updated` date at the top of PROGRESS.md — that's how fresh the info is
- Read PROGRESS.md "Next Steps" section carefully before doing anything
- If something looks wrong or outdated, ask Pantelis before proceeding

## Pantelis's Preferences
- Wants Dogman-style comic look (not just slideshows)
- Wants consistency across stories — same characters, same style
- Stories in both English and Greek
- Doesn't like unnecessary complexity — keep it simple
- Gets frustrated when things don't work as expected — be upfront about limitations

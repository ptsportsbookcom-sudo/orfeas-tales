# Orfeas Tales — Character Visual Bible

_Last updated: 2026-07-10 (session 19 — restored after local file corruption; see RESTORATION NOTE below)_

> ⚠️ **CRITICAL FOR CONSISTENCY**: When generating ANY new Midjourney panels, ALWAYS use:
> `--cref characters/panel_master_ref.webp --cw 80`
> This locks the art style across all stories.

---

## ⚠️ RESTORATION NOTE (2026-07-10, session 19)

This file was found completely corrupted at the start of session 19 (18,851 bytes, entirely null bytes — same NTFS-mount corruption pattern documented elsewhere in this project). `_docs/DECISIONS.md` was corrupted the same way.

**What happened during restore:**
- The version of this file last pushed to GitHub (`git show origin/main:_docs/CHARACTERS.md`, June 13 commit) was recovered — but that committed version was **itself truncated mid-sentence** in the Gorillatsos section, and never contained Maimudakis/Maimudakena entries at all.
- Everything through **Rilena** below is the original, unmodified git-recovered text.
- **Gorillatsos** was completed this session by re-examining `gorillatsas_ref.webp` directly.
- **Maimudakis** and **Maimudakena** sections are new this session, written from `11_Maimudakis.webp` / `12_Maimudakena.webp` / `base designs/Maimoudakena.png`.
- The **"Story 8 Hard Rules"** section below is a **reconstruction**, not the original text — the original was never committed to git and was lost with the corrupted file. It's rebuilt from the summary line that survived in `NEW_CHAT_START_HERE.md`: *"never combine Rillas with boys or with Rilena; Rilena needs `--cw 15–25` not 80; composition-only prompts can beat `--cref` for tricky poses."* Treat the wording as a paraphrase of the original intent, not verbatim.
- **Not yet documented** (never had entries in any version of this file found): Rilaki, Dakis, Akis, Kakeas, and the Arxigeas alien family. Their `id`/`role`/`file` are in `stories-data.js`'s `characters` array if needed before Rilaki/Dakis/Akis appear in a story — write full entries then.
- **Known bug found during this restore**: `stories-data.js` character #6 (Maimudakis) points to `characters/maimudakis_ref.webp`, which does not exist on disk. The real file is `characters/11_Maimudakis.webp`. This is a live broken-image bug on the character gallery page — flagged separately, not yet fixed.

---

## Art Style Reference

- **Master style ref**: `characters/panel_master_ref.webp` — use as `--cref` in every panel
- **CDN URL (use this directly — no re-upload needed)**:
  `https://cdn.midjourney.com/u/d02684e1-f98d-45c7-b961-84a5b639e7dd/03c393d85014a35cdbac164ffb9b622c756f0b9368d72525342d22c5930baa2e_384_N.png`
- **Style**: Dogman-style children's comic — bold outlines, flat colours, expressive faces
- **Midjourney version**: v6.1
- **Panel aspect ratio**: `--ar 4:3`
- **Portrait aspect ratio**: `--ar 1:1`

### How to use references in Midjourney web UI:
- **Panels WITHOUT Rillas**: Click "Add Images" → "Omni Reference" → upload panel_master_ref.webp (or use CDN URL above in --cref)
- **Panels WITH Rillas**: Use `--cref https://cdn.midjourney.com/699b54bb-8630-4af2-bc55-0aec7f0bc736/0_0.png` in prompt text

### ⚠️ Global settings pitfalls (confirmed across Stories 6–8):
- **Global V7/V8 Profile silently overrides `--v 6.1` text flag** → must set version in the Settings UI dropdown, not just the text flag
- **Character References UI and Omni Reference UI both force v7+** → NEVER USE these buttons; always put `--cref [URL] --cw N` directly in the prompt text
- **`--cw` only works in v6.1** — silently fails (no error, just ignored) in v7/v8
- **Wrong boys CDN URL (`03c393d8` hash)** generates anime-style characters, not Dogman-style → always use the `e8051e74` hash below for the boys
- **React textarea in the Midjourney web UI** requires `document.execCommand('insertText', false, prompt)` — setting `.value =` directly does not register with the page's JS framework

**✅ CORRECT boys CDN**: `https://cdn.midjourney.com/u/d02684e1-f98d-45c7-b961-84a5b639e7dd/e8051e74efc07f2fc75bbcc1e4afce8ce63a405b68932ddbcd93b3e96bad8ce7.webp`
**❌ WRONG boys CDN** (`03c393d8` hash) — generates anime-style characters. DO NOT USE.

---

## MAIN CHARACTERS (Story 1+)

### Aristotelis
**Role**: Main character — the energetic, impulsive one  
**Species**: Human boy  
**Age**: ~8 years old  

**Physical Description** (from aristotelis_ref.webp):
- Hair: VERY wild, explosive black hair sticking out in all directions
- Eyes: Wide, bright, slightly mischievous green eyes, big smile
- Skin: Olive/tan Mediterranean
- Clothes: Teal/blue t-shirt, patterned shorts with blue spots, colourful sneakers (orange/blue)
- Props: Lit fire torch held in right hand, aviator goggles pushed up on forehead, adventure backpack (gold/brown explorer style), wristbands
- Distinguishing features: The hair. Unmistakable explosion of black hair is his #1 feature

**In panel style** (from panel_master_ref.webp — use this for comic panels):
- Wild black hair, orange t-shirt, school backpack, bold outlines, arms often crossed or gesturing
- Dogman-style: thick outlines, flat colours, very expressive angry/excited face

**Midjourney Prompt for comic panels**:
```
8 year old boy, wild explosive black hair sticking out everywhere, olive skin, orange t-shirt,
school backpack, bold thick outlines, flat colours, Dogman comic book style, expressive cartoon face,
white background --cref characters/panel_master_ref.webp --cw 100 --ar 4:3 --v 6.1
```

**Midjourney Prompt for character portraits**:
```
8 year old adventurous boy, wild explosive black messy hair, olive skin, bright green eyes,
teal t-shirt, patterned shorts, colourful sneakers, holding a fire torch, aviator goggles on forehead,
explorer backpack, anime illustration style, detailed, white background --ar 1:1 --v 6.1
```

**Reference Images**:
- `characters/aristotelis_ref.webp` — detailed portrait (anime style)
- `characters/6_Aristotelis.png` — comic panel style portrait
- `characters/panel_master_ref.webp` — ⭐ MASTER PANEL REF — use as --cref for all panels

**Transport**: Rides a four-wheel dirt bike (quad bike) — both boys always use these to get around

**Appears in**: Story 1 ("The Lost Friends"), all future stories

---

### Theotokis
**Role**: Main character — the careful, thoughtful planner  
**Species**: Human boy  
**Age**: ~8 years old  

**Physical Description** (from theotokis_ref.webp):
- Hair: Dark brown messy hair
- Eyes: Purple/violet eyes behind large round purple-framed glasses
- Skin: Olive/tan Mediterranean
- Clothes: Green t-shirt, dark shorts, regular school backpack (yellow/tan)
- Props: Round purple glasses (ALWAYS on, never removed), always carrying or surrounded by books
- Distinguishing features: The white/silver hair + round purple glasses combo. Very distinctive.

**In panel style** (from panel_master_ref.webp — use this for comic panels):
- Brown/dark hair (panel style differs from portrait!), round glasses, yellow t-shirt, backpack
- Dogman-style: thick outlines, flat colours, serious/frowning expression

**Midjourney Prompt for comic panels**:
```
8 year old boy, neat brown hair, round glasses, olive skin, yellow t-shirt, school backpack,
bold thick outlines, flat colours, Dogman comic book style, expressive serious cartoon face,
white background --cref characters/panel_master_ref.webp --cw 100 --ar 4:3 --v 6.1
```

**Midjourney Prompt for character portraits**:
```
8 year old thoughtful boy, fluffy silver-white curly hair, round purple glasses, olive skin,
purple eyes, green t-shirt, dark shorts, school backpack, surrounded by books, anime illustration
style, detailed, white background --ar 1:1 --v 6.1
```

**Reference Images**:
- `characters/theotokis_ref.webp` — detailed portrait (anime style)
- `characters/7_Thetokis.png` — comic panel style portrait
- `characters/panel_master_ref.webp` — ⭐ MASTER PANEL REF — use as --cref for all panels

**Appears in**: Story 1 ("The Lost Friends"), all future stories

---

## GORILLA CHARACTERS

### Rillas
**Role**: Friendly gorilla who escapes the zoo — becomes the boys' best friend  
**Species**: Gorilla  
**Age**: Adult  

**Physical Description**:
- Large brown gorilla, very muscular, enormous shoulders
- Big wide grin showing all teeth — signature look
- Green tactical/military vest with orange pockets and buttons
- Fists clenched at sides, confident powerful stance
- Bold comic book style, thick outlines, flat colours

**⭐ MASTER REFERENCE IMAGE (use as --cref for ALL panels with Rillas)**:
```
https://cdn.midjourney.com/699b54bb-8630-4af2-bc55-0aec7f0bc736/0_0.png
```

**Midjourney prompt for panels WITH Rillas** — use the Story 2 master ref only (⚠️ NEVER use two --cref flags — it pulls style dark/aggressive):
```
[scene description], large friendly muscular brown gorilla [EXPLICIT expression] green tactical vest with orange pockets,
two 8 year old boys [EXPLICIT expression], wide shot full body all characters fully visible,
Dogman comic book style, bold thick outlines, flat colours
--cref https://cdn.midjourney.com/699b54bb-8630-4af2-bc55-0aec7f0bc736/0_0.png --cw 80 --ar 4:3 --v 6.1 --no aggressive angry snarling
```

**Reference**: `characters/8_Rilas.png` (old), Story 2 character sheet = CDN URL above  
**Appears in**: Story 2 ("Rillas the Gorilla"), all future stories

### Rilena
**Role**: Kind female gorilla — first appears in Story 5 (rescued from Poachers); marries Rillas in Story 9  
**Species**: Gorilla  
**Age**: Adult  
**Relationship**: Rillas's love interest, later wife (Story 8: they get together; Story 9: they marry)

**Physical Description** (from rilena_ref.webp, session 14):
- Build: Slender female gorilla, graceful pose
- Clothes: Lavender/purple dress
- Props: Purple flower (in hair or held)
- Eyes: Warm, expressive, big lashes — clearly feminine
- Expression: Gentle warm smile

**Midjourney Portrait Prompt** (used session 14):
```
female gorilla, clearly feminine, big warm eyelashes, lavender dress, purple flower,
graceful pose, warm smile, Dogman comic book style, bold thick outlines, flat colours,
white background --cref https://cdn.midjourney.com/699b54bb-8630-4af2-bc55-0aec7f0bc736/0_0.png
--cw 60 --ar 1:1 --v 6.1 --no aggressive angry masculine dark
```

**⚠️ Story 8 correction**: use `--cw 15–25` for Rilena, NOT `--cw 80` — see "Story 8 Hard Rules" section below.

**Reference Images**:
- `characters/rilena_ref.webp` ← ⭐ USE THIS (109KB, MJ job 02392124, option 3) — committed session 14
- `characters/9_Rilena.png` — old placeholder, ignore

**Appears in**: Story 5 ("Saving Gorillatsos"), Story 8 ("Rillas and Rilena"), Story 9 (wedding), future stories  
**Website**: Unlocked (session 14) — id:4 in characters array

---

### Rilaki
**Role**: Rillas and Rilena's son — born in Story 10 ("The Birth of Rilaki")
**Species**: Gorilla
**Age**: Newborn in Story 10; character gallery card shows his grown design (same convention as the boys always being shown at a fixed age)
**Relationship**: Son of Rillas and Rilena

**⚠️ CORRECTION (session 20, Story 10)**: `stories-data.js` character #5 (Rilaki) previously pointed to `characters/10_Rilaki.webp` — this is a WRONG/mislabeled image (a small cartoon monkey on roller-skates, completely unrelated design, not even a gorilla). Same recurring "wrong reference" bug pattern as Maimudakis/Maimudakena in session 19. The true reference is `base desgins/Rillakis.png` (note: same misspelled "desgins" folder as Maimoudakena's file), confirmed directly by Pantelis. Converted to `characters/rilaki_ref.webp` for site use.

**Physical Description** (from `base desgins/Rillakis.png`):
- Build: Muscular gorilla, same heavy-set powerful build as Rillas
- Hair: Distinctive spiky/flame-shaped tuft of brown hair on top of the head — his own signature look, different from Rillas's flatter head
- Face: Angled smirking grin showing teeth, confident/cocky expression, amber/orange eyes
- Clothes: Green tactical vest with orange pockets over a dark undershirt with torn/rolled sleeves, camo-style pants — echoes Rillas's military look but with his own styling
- Vibe: Confident, cocky, energetic — reads as a spirited chip-off-the-old-block

**Reference Images**:
- `characters/rilaki_ref.webp` ← ⭐ USE THIS (converted from `base desgins/Rillakis.png`)
- `characters/10_Rilaki.webp` / `.png` — ⚠️ DO NOT USE for identity; wrong character (monkey on roller-skates)

**Appears in**: Story 10 ("The Birth of Rilaki" — debut, born as a newborn baby; this reference shows his standard/grown character-gallery design)
**Website**: Unlocked as part of the Story 10 deploy — id:5 in characters array

---

### Gorillatsos
**Role**: Rillas's cousin — kidnapped by Poachers before Story 5, rescued during it; helps organize Rillas's surprise wedding in Story 9  
**Species**: Gorilla  
**Age**: Young adult  
**Relationship**: Rillas's cousin (ξάδερφος) — calls Rillas "ξάδερφε Ρίλλα"

**Physical Description** (from gorillatsas_ref.webp, verified session 19 — the actual reference renders bigger/more muscular than the "small, young gorilla" description originally implied; use what's actually in the image for `--cref` consistency):
- Build: Muscular brown gorilla, broad chest and shoulders — similar heavy build to Rillas, though a bit leaner
- Face: Angled, slightly furrowed brow but with a huge warm toothy grin — reads as friendly/excited, not angry
- Clothes: Red tank top with a bold yellow star on the chest, dark green tactical straps/vest across the shoulders (echoes Rillas's vest), dark belt
- Fur: Dark brown, shaggy on the head, neatly kept on the body
- Vibe: Energetic, enthusiastic, always up for a plan

**Reference Images**:
- `characters/gorillatsas_ref.webp` ← ⭐ USE THIS

**Appears in**: Story 5 ("Saving Gorillatsos"), Story 9 (wedding — helps organize surprise, attends)  
**Website**: Unlocked — id:16 in characters array

---

## MONKEY CHARACTERS

### Maimudakis
**Role**: Friend of the group; father figure in the Maimudakis monkey family; falls for Maimudakena in Story 9  
**Species**: Monkey (smaller than gorillas — distinct species from Rillas/Rilena/Gorillatsos)  
**Age**: Older/mature — reads as a distinguished, wise adult, not a young character

**⚠️ CORRECTION (session 19)**: An earlier version of this entry described him from `characters/11_Maimudakis.webp` (young, reddish-orange hair, mechanic/tool-belt vibe) — that was wrong. `characters/11_Maimudakis.webp` appears to be an outdated or mislabeled image. The authoritative reference is `base designs/maimudakis_ref.webp`, confirmed by direct comparison this session after a bad panel generation used the wrong ref.

**Physical Description** (from `base designs/maimudakis_ref.webp`, verified session 19):
- Age/vibe: Older, dignified, calm — a wise-uncle or mentor presence, not a young excitable sidekick
- Hair: Grey/white streaked hair on top, mostly bald/thinning
- Face: Big round floppy ears, pink-tan monkey face and muzzle, warm knowing smile
- Facial hair: Distinctive grey moustache and beard — his single most identifying feature
- Clothes: Brown vest worn open over a tan/khaki button-up shirt, hands often in pockets
- Tail: Long curved monkey tail
- Vibe: Calm, warm, a little old-fashioned — think kindly grandfather/mentor, not "tinkerer" or "mechanic"

**Reference Images**:
- `base designs/maimudakis_ref.webp` ← ⭐ USE THIS (the true reference)
- `characters/11_Maimudakis.webp` / `.png` — ⚠️ DO NOT USE for identity; wrong character design, unclear origin, kept only because it's what `stories-data.js` currently is not pointing to (see below)
- `stories-data.js`'s character-gallery card correctly points to `characters/maimudakis_ref.webp` — that exact filename **does** exist, just in `base designs/` rather than `characters/`. Fix: copy/move `base designs/maimudakis_ref.webp` → `characters/maimudakis_ref.webp` (not a broken-path bug as previously noted — just a missing copy into the folder the site expects).

**Appears in**: Story 5 (background), Story 9 ("The Wedding of Rillas and Rilena" — helps organize the surprise, meets Maimudakena)  
**Website**: Unlocked — id:6 in characters array

---

### Maimudakena
**Role**: New character — the uninvited party guest at Rillas & Rilena's wedding who Maimudakis instantly falls for; mother figure in the Maimudakis monkey family going forward  
**Species**: Monkey  
**Age**: Adult  
**Relationship**: Maimudakis's love interest, first meeting in Story 9

**⚠️ CORRECTION (session 19, part 2)**: `characters/12_Maimudakena.webp` — the file this entry previously pointed to as "USE THIS" — is actually a WRONG/mislabeled image: green hair, gold/tan fur, bright yellow outfit, anime style. Do not use it. The one true reference is `base desgins/Maimoudakena.png` (note: folder is misspelled "desgins" on disk). Two Midjourney panel attempts drifted toward a rounder/cuter/painterly look before this was caught by direct side-by-side comparison — see notes below on the exact style to hit.

**Physical Description** (from `base desgins/Maimoudakena.png`, re-verified session 19 part 2):
- Build: Slim, small monkey build (not gorilla-sized) — long expressive limbs, elongated sinuous pose
- Tail: Very long, elegant S-curve flourish tail (not a tight coil) — a signature feature, distinct from any gorilla character (gorillas have no tail)
- Fur: Near-solid black/very dark grey, minimal shading/texture — flat and graphic, not painted/furry-textured
- Hair: Sleek, swept dramatically to ONE side (asymmetric, not centered/messy), dark with a cream/light streak
- Ears: Large, rounded, held close/back (not floppy-forward)
- Face: Sly sideways glance, half-lidded eyes with defined lash/eyeliner, closed-mouth smirk — confident and a little mischievous, NOT wide-eyed/innocent/shy-cute
- Clothes: Red/pink + gold/yellow bodice with teal visible at the skirt hem — angular color-block pattern, not a smooth all-over wrap
- Line style: Loose, bold ink-brush linework — thinner/looser than the flat "Dogman" comic style used for the boys/gorillas; this is closer to a sketchy illustration than a flat-color comic panel
- Vibe: Playful, a little mysterious, confident — she shows up at the party uninvited, drawn in by the music

**Reference Images**:
- `base desgins/Maimoudakena.png` ← ⭐ USE THIS (the true reference; note misspelled folder)
- `characters/12_Maimudakena.webp` / `.png` — ⚠️ DO NOT USE for identity; wrong character design

**Appears in**: Story 9 ("The Wedding of Rillas and Rilena" — debut)  
**Website**: Currently locked (id:7, `unlocked:false`) — **unlock her (`unlocked:true`) as part of the Story 9 deploy**, same pattern as every other new-character debut

---

### Dakis
**Role**: Maimudakis and Maimudakena's older son — debuts in Story 11 ("New Friends for Rilaki")
**Species**: Monkey (child)
**Age**: Young, older of the two brothers

**⚠️ CORRECTION (session 21, Story 11)**: `stories-data.js` character #8 (Dakis) previously pointed to `characters/13_Dakis.webp` — same recurring "wrong reference" bug pattern as Maimudakis/Maimudakena/Rilaki: it's a fully-rendered fantasy/anime digital painting (orange-haired monkey in a jetpack, cosmic background), completely wrong style and design. The true reference is `base desgins/Dakis.png`, confirmed by Pantelis. Converted to `characters/dakis_ref.webp` for site use.

**Physical Description** (from `base desgins/Dakis.png`):
- Build: Slim young monkey, energetic stance
- Hair: Spiky black hair with blonde/tan tips, messy and wild
- Ears: Big, round, floppy — held out to the sides
- Face: Pink-tan muzzle, wide amber/orange eyes, huge toothy grin — mischievous and upbeat
- Clothes: Red hoodie/polo shirt, grey shorts, gold-and-red sneakers
- Tail: Long, curled, cream/tan colored — a signature loose spiral
- Line style: Loose, sketchy ink-brush linework with watercolor-style flat washes — same family style as Maimudakena, distinct from the flat "Dogman" comic style used for the boys/gorillas
- Vibe: The bolder, more mischievous of the two brothers — first to sneak a banana

**Reference Images**:
- `characters/dakis_ref.webp` ← ⭐ USE THIS (converted from `base desgins/Dakis.png`)
- `characters/13_Dakis.webp` / `.png` — ⚠️ DO NOT USE for identity; wrong character (fantasy jetpack monkey)

**Appears in**: Story 11 ("New Friends for Rilaki" — debut)
**Website**: Currently locked (id:8, `unlocked:false`) — unlock as part of the Story 11 deploy

---

### Akis
**Role**: Maimudakis and Maimudakena's younger son — debuts in Story 11 ("New Friends for Rilaki")
**Species**: Monkey (child)
**Age**: Young, younger of the two brothers

**⚠️ CORRECTION (session 21, Story 11)**: `stories-data.js` character #9 (Akis) previously pointed to `characters/14_Akis.webp` — same bug pattern: a fully-rendered fantasy/anime digital painting (green-haired monkey holding a magic staff, cosmic background), completely wrong style and design. The true reference is `base desgins/Akis.png`, confirmed by Pantelis. Converted to `characters/akis_ref.webp` for site use.

**Physical Description** (from `base desgins/Akis.png`):
- Build: Smaller and younger-looking than Dakis
- Hair: Spiky black hair with orange/tan tips, slightly less wild than Dakis's
- Ears: Smaller and rounder than Dakis's
- Face: Tan-brown fur, big round solid dark eyes (no bright iris highlight like Dakis — reads as a touch more innocent/impish), warm smile
- Clothes: Red-and-orange striped shirt, grey pants, tan boots
- Tail: Shaggier, bushier than Dakis's, drawn with loose energetic linework suggesting movement
- Line style: Same loose ink-brush family style as Dakis and Maimudakena
- Vibe: The quieter, more cautious little brother — tags along on Dakis's mischief

**Reference Images**:
- `characters/akis_ref.webp` ← ⭐ USE THIS (converted from `base desgins/Akis.png`)
- `characters/14_Akis.webp` / `.png` — ⚠️ DO NOT USE for identity; wrong character (fantasy staff-wielding monkey)

**Appears in**: Story 11 ("New Friends for Rilaki" — debut)
**Website**: Currently locked (id:9, `unlocked:false`) — unlock as part of the Story 11 deploy

---

## ⚠️ STORY 8 HARD RULES (reconstructed — see Restoration Note at top)

These rules came out of repeated Midjourney failures while generating Story 8 ("Rillas and Rilena") multi-character panels. The original detailed writeup was lost in the file corruption; this is a reconstruction of the rule of thumb that survived in `NEW_CHAT_START_HERE.md`. Apply with judgement, and update this section with specifics as they're re-confirmed during Story 9 panel work.

1. **Never combine Rillas with the boys (Aristotelis/Theotokis) or with Rilena in a single `--cref`-driven panel.** Combining a gorilla `--cref` subject with other named characters in the same generation tends to break consistency for one or both. Prefer solo shots or careful composition-only prompts (see #3) for scenes that need multiple named characters together.
2. **Rilena needs `--cw 15–25`, not `--cw 80`.** At high `--cw`, Rilena's reference pulls too much of Rillas's masculine/aggressive styling into her render (they share the base gorilla `--cref` URL). A much lower character-weight keeps her feminine and distinct.
3. **Composition-only prompts can beat `--cref` for tricky multi-character poses.** For scenes where the reference-image approach keeps failing (e.g. two characters interacting closely), sometimes describing the full scene and composition in plain text — without leaning on `--cref` at all for that specific panel — produces a more reliable result. Worth trying as a fallback when `--cref` combinations keep breaking.

**Relevance for Story 9**: the wedding scene stacks up to 7 characters (Rillas, Rilena, Theotokis, Aristotelis, Maimudakis, Gorillatsos, Maimudakena) in the same location. Per Pantelis (session 19): shoot each character on their own, or in small groups, rather than one crowded combined panel — this is a direct extension of hard rule #1 above.

---

## NOT YET DOCUMENTED

These characters exist in `stories-data.js`'s `characters` array (with `id`/`role`/`file`) but have no written visual-bible entry in any version of this file found during restoration. Write a full entry (following the pattern above) before generating panels featuring them:

- **Kakeas** — id:15, "The Villain", `characters/15_Kakeas.webp`, currently locked, `villain:true`
- **Arxigeas** (id:10), **Arxigeena** (id:11), **Geas** (id:12), **Eas** (id:13), **Geena** (id:14) — alien family, all currently locked

(Dakis and Akis now documented above — see MONKEY CHARACTERS section.)

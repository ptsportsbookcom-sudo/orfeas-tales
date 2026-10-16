# Story 30 release review — 2026-10-16

Title: Lost in Limassol / Χαμένος στη Λεμεσό.

- Read both complete narrative drafts against each other: 85 corresponding text blocks, including title and ending. Standard Modern Greek and story meaning align.
- Visually reviewed all 34 source PNGs. The two electrician-disguise exports are byte-identical. Selected 33 distinct images in story order, documented in verified_panel_mapping.md. Original PNGs remain untouched.
- Prepared 33 WebP panels, both texts, supplied English MP3 (441.072 seconds), and original Greek AAC (464.608443 seconds).
- Added Episode XXX card, translated Greek card synopsis, story/audio/image mappings, homepage total of 30 and script cache versions.
- Full-site smoke check passed. Both complete audio files decoded through FFmpeg without errors.
- Chrome checks passed: EN/GR card language round trips (episode/title/synopsis/metadata/actions), exact full reader paragraph contents in both languages, 33 reader pictures, all nine comic pages and 33 successfully decoded comic pictures in both languages, translated comic page labels and image descriptions, both narrations playing with advancing time and no media error, Sync labels/toggle, previous/next, browser history, mobile fullscreen entry/exit, and no JavaScript page errors. Viewports 320 and 390 px fit without horizontal overflow. Card and mobile screenshots inspected visually.

Limits: narration sampled in browser and fully decoded, not listened to end-to-end or transcribed word for word. Existing evenly distributed comic synchronization retained. Physical-phone testing not performed. Art retains the supplied choices, including stern expressions, a stylized map, and minor guard-cap lettering. No artwork regenerated.

Local environment: main repository has a corrupt Git object. Used _story29_release on branch codex/story30 from current origin/main. Recovered nulled legacy local files from their exact committed bytes, including stylesheet and deployment config; these are not intentional release changes.

Production verification pending deployment.

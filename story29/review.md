# Story 29 preparation — 2026-10-13

Prepared website: `D:\Orfeas tales\_story29_deploy`. Local preview: http://127.0.0.1:8030.

- Compared all 35 English/Greek text blocks. Corrected Greek phone greeting, photo-taking wording, contest dialogue, banana purchase meaning, and ninja declension.
- Reviewed the 30 source PNGs in a contact sheet against the plan. The two Rillas phone images are alternatives; selected the first. Original PNGs are retained. Exact 29-panel sequence is in verified_panel_mapping.md.
- Prepared 29 WebP panels (4,513,092 bytes), both texts, English MP3 and original Greek AAC. Updated episode card, homepage count, Roman numeral, reader image placement, audio mappings, Greek card description and cache versions.
- Browser verified Greek card title, synopsis, episode, metadata and actions; Greek reader's 35 paragraphs and 29 pictures; all eight Greek comic page labels; language round trip, image descriptions and page accessibility labels; both narration files playing; fullscreen entry, Exit and browser Back exit; Sync on/off. Browser reported no console errors.
- Fixed existing comic language controls to change narration too, and connected the missing Sync click handler. Release smoke check passed after restoring damaged legacy PNG copies from the existing Git snapshot.

## Completed follow-up verification

- Mobile viewport checks at 320 × 740 and 390 × 844: comic and both language readers fit without horizontal overflow. Desktop viewport restored after testing. These are browser viewport checks, not physical phone tests.
- Observed real timed page advancement in Greek at 58.4 seconds and English at 42.5 seconds. Seeking to the middle selected page 5. Sync OFF held page 1 while English audio continued from 1:53 to 3:04. Pause stopped playback. Sync ON and OFF labels worked.
- Mobile fullscreen entry and Exit worked; browser Back exited fullscreen and left the comic open. Reader Back/Forward restored Stories and Story 29 reader. Characters and homepage loaded; homepage shows 29 stories.
- Revisited every English and Greek comic page, including final Greek page 8. All 29 images loaded successfully, with translated image descriptions. English and Greek readers each contained 35 paragraphs and 29 images. No browser console errors were reported.
- Fully decoded both audio files with FFmpeg: no decoder errors. Durations: English 221.136 seconds; Greek 462.784459 seconds.
- Improved narration toolbar contrast against the cream comic background, and synchronized play/pause icon and accessible label with actual audio state. Updated CSS and JavaScript cache versions.
- Recovered missing/damaged legacy preview panel directories for stories 5, 21, 24 and 26 from the previous release Git snapshot. Damaged directories retained as backups. Final full-site smoke check passed.

Limits: not published; main workspace Git repository contains a corrupt object. Prepared site is isolated from that repository. Audio was fully decoded and sampled in playback, but not transcribed word for word or listened to end-to-end. Automatic page advancement uses the site's existing evenly distributed timing, rather than sentence-level synchronization. Original chosen art includes small plan deviations: flyer lettering, several judges rather than exactly three in the establishing scene, and instrument/composition differences. No artwork regenerated.

# Off The Record Drop

Build a brand-new ecommerce/editorial website for ARC NOIRE, centered on the FALL 2026 collection OFF THE RECORD. This should be a new project, not an edit of the previous site.

CREATIVE DIRECTION
Create an original retro-industrial visual language inspired by 2016–2018 underground fashion/music internet culture, photocopied zines, record-label catalogs, CD/vinyl packaging, late-night flash photography, Japanese fashion archives, brutalist web design, and sparse physical-media packaging. The feeling should be raw, physical, unfinished, utilitarian, confrontational, and minimal, while remaining entirely original and not copying any existing album art, artist branding, logos, typography, layouts, or copyrighted artwork.

VISUAL SYSTEM
- Main palette: washed black, charcoal, warm dirty white, concrete gray.
- RED is a major identity color, around 20–25% of the visual system, not a tiny accent. Use strong signal red in large type, full-bleed interstitial sections, stickers, catalog marks, progress indicators, labels, borders, and interaction states.
- Secondary garment colors: deep green and faded denim blue, used sparingly.
- No gradients, no glossy luxury effects, no generic startup UI.
- Add subtle scan lines, JPEG/photocopy imperfections, paper grain, registration marks, tape/sticker motifs, tiny technical text, crude rules and borders, and occasional 4:3 framing.
- Typography: one expressive editorial serif for headlines, one condensed grotesk/neutral sans for navigation and product names, and a small monospace/typewriter-style font for metadata.

SITE CONCEPT
The website should feel like a strange physical artifact from 2017 that became interactive. It should merge fashion ecommerce with an underground record-label archive.

3D / ENTRY EXPERIENCE
Create one memorable but restrained 3D interaction on the homepage using lightweight web 3D (Three.js / React Three Fiber if appropriate):
- A physical record/CD-style sleeve or transparent jewel-case-inspired object floating in a dark neutral space.
- It can be rotated slightly with pointer/touch.
- Front uses original ARC NOIRE / OFF THE RECORD typography and catalog markings.
- Back contains FALL 2026 metadata, SIDE A / SIDE B, tracklist-style product names, catalog no. AN-001.
- A red physical label/sticker element should be prominent.
- Clicking/tapping ENTER / OPEN DROP transitions naturally into the collection.
- Keep performance strong on mobile and provide a graceful reduced-motion/static fallback.
- Do not make users navigate an entire 3D world. 3D is for discovery; shopping stays simple.

MUSIC / AUDIO
Add a small optional audio player that visually resembles old physical-media equipment / a tiny archival player.
- Audio must NEVER autoplay. User explicitly presses PLAY.
- Build the interface with a placeholder audio source designed to be swapped later with Arc Noire's own original industrial/minimal electronic track.
- Player language can include PLAY, STOP, TRACK 01, AN-001, elapsed time.
- Keep player persistent but unobtrusive.

HOMEPAGE
1. Minimal header: ARC NOIRE left. SHOP / OFF THE RECORD / ARCHIVE / ABOUT. SEARCH and BAG (0) right. Tiny catalog metadata in mono.
2. Full-screen 3D artifact hero with OFF THE RECORD, FALL 2026, DROP 001, CATALOG NO. AN-001, plus ENTER DROP.
3. Red interruption panel: bold red field with sparse black typography such as ARC NOIRE / AN-001 / FALL 2026.
4. Liner-notes manifesto section: minimal copy, lots of space, catalog metadata.
5. Product tracklist section: products presented as SIDE A / SIDE B tracks with A1, A2, A3, B1, B2, B3.
6. Product cards should look like album sleeves / archive records but remain clear ecommerce cards.
7. Editorial image/contact-sheet section with placeholders that feel like harsh-flash nighttime photography: parking garage, concrete, elevator, wet street, bedroom, night bus, blurry movement.
8. Zine/photocopy spread with layered paper, red marker typography, scan artifacts.
9. Archive teaser styled like a crate/catalog of old records and previous Arc Noire work.
10. Email signup like a red label/sticker or catalog insert.
11. Sleeve-like footer with tiny technical metadata.

COLLECTION / PRODUCTS
Use exactly these six products as the OFF THE RECORD Fall 2026 lineup, with editable placeholder photography and pricing fields:
- A1 / AN-001-A1 — Red OFF THE RECORD hoodie — campaign hero.
- A2 / AN-001-A2 — Dark green NIGHTFALL zip hoodie.
- A3 / AN-001-A3 — Black/white long-sleeve tee.
- B1 / AN-001-B1 — Black/white striped rugby / long-sleeve.
- B2 / AN-001-B2 — Light gray relaxed sweatpant.
- B3 / AN-001-B3 — Faded blue baggy jeans.

SHOP PAGE
- Record-store/catalog layout.
- Square sleeve-like product images.
- Catalog number, side/track, product name, price.
- Minimal useful filters only.
- No fake scarcity, fake reviews, fake countdowns, or invented social proof.

PRODUCT PAGE
Make it feel like opening a physical sleeve while remaining fast and conversion-focused:
- Large image gallery.
- ARC NOIRE / catalog number / SIDE + TRACK metadata.
- Product title, price, size selector, ADD TO BAG.
- Expandable fit, material, care, shipping/returns.
- Liner-note style description.
- Editorial images below.
- COMPLETE THE LOOK presented as RELATED RECORDS / FROM THE SAME RELEASE.
- Mobile sticky add-to-bag where appropriate.

CAMPAIGN WORLD
Visually prepare the site for fashion-film campaign videos made from the real garments as references. The visual world should resemble lost 2017 fashion-film fragments: harsh flash, grain, motion blur, security-camera angles, 4:3 clips, fisheye, abrupt zooms, blown highlights, nighttime streets, parking garages, concrete interiors, red lighting, and found-media energy. Build campaign blocks/placeholders that can later accept these videos without redesign.

INTERACTIONS
- Slightly awkward/retro hover states, red underlines, catalog numbers shifting, sleeves tilting a few degrees.
- Optional cursor treatment on desktop, but never harm usability.
- Page transitions can resemble flipping a sleeve/insert or a hard red flash, kept brief.
- Respect prefers-reduced-motion.

RESPONSIVE + ECOMMERCE
- Mobile-first and fully responsive.
- Fast loading, lazy-load heavy media/3D.
- Accessible labels and contrast.
- Functional cart/bag interaction and product selection using mocked/local data if no backend is configured.
- Build components/data cleanly so it can later be translated into Shopify or connected to a commerce backend.

COPY / TONE
Sparse, enigmatic, archival. Use phrases like OFF THE RECORD, SIDE A, SIDE B, TRACK 01, CATALOG NO. AN-001, FALL 2026, DROP 001, ARCHIVE, LINER NOTES. Avoid corny luxury language and avoid references to real musicians or albums in visible site copy.

FINAL STANDARD
The site should feel more like an underground fashion label + record release + art object than a conventional ecommerce template, but purchasing must still be obvious and easy. It should be memorable within 3 seconds, with RED, the 3D artifact, and the AN-001 catalog system as the core recognizable identity. Build the full experience now and verify responsiveness and core interactions.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://arc-noire-off-the-record.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/be71a888-0e49-47ff-98b2-a12273d12c72).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

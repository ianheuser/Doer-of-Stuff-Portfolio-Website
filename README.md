# The Doer of Stuff — Portfolio

Portfolio site for Ian McCarthy, built with SvelteKit (Svelte 5) from the Figma mock.

## Develop

```bash
npm install
npm run dev
```

`npm run build` outputs a fully static site to `build/` (adapter-static, prerendered) — deployable to any static host.

## Structure

- `src/routes/+page.svelte` — page layout: space section (hero, definition cards, astronaut), wave transition, underwater projects section
- `src/lib/components/`
  - `ParticleField.svelte` — rising stars (space) / bubbles (underwater); randomized size, opacity, speed, sway; respects `prefers-reduced-motion`
  - `WaveDivider.svelte` — four layered tiling wave crests with slow horizontal drift; the astronaut z-indexes between layers
  - `DefinitionCard.svelte` — "doer" / "stuff" dictionary cards; speaker icon pronounces the word via SpeechSynthesis
  - `ProjectShowcase.svelte` — featured project + 4-thumbnail looping carousel with prev/next arrows
  - `Nav.svelte`, `Footer.svelte`
- `src/lib/data/projects.js` — **project content lives here.** First entry is real; the rest are placeholders to replace.
- `static/images/` — optimized assets exported from Figma (astronaut & screenshots as WebP, waves/logo/bubble as SVG)
- `design-assets-originals/` — full-resolution PNG originals from Figma (not deployed)

## Still to come

- Blog and Experiments sections (menu shows them as "coming soon")
- Real content + imagery for the five placeholder projects

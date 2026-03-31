# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

WME E58 is a TamperMonkey/GreaseMonkey userscript for Waze Map Editor (WME). It adds small map preview windows (Google Maps and OpenStreetMap) inside the editor, toggled via a sidebar tab or keyboard shortcut (Alt+N).

Source is written in TypeScript under `src/`, built with Rollup into a single IIFE at `dist/WME-E58.user.js`. GreasyFork auto-syncs from the dist output.

## Commands

- **Install:** `npm install`
- **Build:** `npm run build`
- **Watch:** `npm run watch` (rebuild on changes)
- No test or lint steps exist.

## Architecture

```
src/
├── meta.ts              # userscript header (comment block, not TS code)
├── style.css            # plain CSS, imported as string
├── globals.d.ts         # declares WME runtime globals (WMEBase, WMEUI, etc.)
├── translations.ts      # NAME constant, TRANSLATION (en, uk, ru)
├── settings.ts          # SETTINGS (default map provider, options)
├── map-preview.ts       # MapPreview base class, GooglePreview, OSMPreview
├── e58.ts               # E58 class (extends WMEBase)
└── index.ts             # bootstrap: registers translations/CSS, instantiates E58
```

**Build output:** `dist/WME-E58.user.js` -- IIFE with userscript header prepended as banner. Version is read from `package.json` via `{{version}}` placeholder in `meta.ts`.

**Key external dependencies** (loaded via `@require` in userscript header, not bundled):
- WME-Bootstrap.js, WME-Base.js, WME-UI.js, CommonUtils.js (WME script ecosystem)
- Google Maps API (available via WME runtime)

## Coding Conventions

- TypeScript with `strict: false` -- minimal type annotations, `any` for WME SDK types
- MapPreview is the base class; GooglePreview and OSMPreview extend it
- Both map providers use the Google Maps JS API (OSM uses custom tile layer on top)
- GitHub Actions auto-builds `dist/` on push to master

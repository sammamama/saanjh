# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev    # Start development server
npm run build  # Production build
npm run start  # Start production server
npm run lint   # Run ESLint
```

No test suite is configured.

## Architecture

This is a **Next.js 16 App Router** marketing/booking website for "Saanjh — The Musical Sunset", a Himalayan homestay in Shimla with two properties (Saanjh and Rua).

### Page structure

`app/page.tsx` is a single-page site that assembles full-page sections in order: `Navbar → Hero → Services → Rooms → Testimonials → About → Contact → Footer`. Each section corresponds to a component in `components/`.

`app/rooms/` is a stub page (not yet built out) intended as a dedicated rooms listing page.

### Data layer

Room data lives in two places:
- **`data/roomData.ts`** — canonical source for `individualRooms` and `groupRooms` arrays used on the `/rooms` page. Images are loaded via a `CDN` env var (`process.env.CDN`).
- **`components/rooms.tsx`** — has its own inline room arrays (Dusk/Luna/Horizon for individuals, group combos) used for the homepage preview. These are a simplified subset and do not use the CDN.

**`data/featureData.ts`** exports named highlight/feature arrays for each room (e.g. `duskHighlights`, `duskFeatures`), imported by `roomData.ts`.

**`types/roomType.ts`** defines the `Room<T>` and `GroupRoom` interfaces, along with the `featureIcons` map that resolves highlight strings (e.g. `"Mountain View"`, `"Jacuzzi"`) to lucide-react icon components. When adding new highlights to any room, add the icon mapping here first.

### Styling

- Tailwind CSS v4 with CSS variables defined in `app/globals.css`
- Brand palette: primary `#C2703E` (burnt orange), background `#FAF5F0` (warm cream)
- Two fonts: `font-sans` = DM Sans, `font-serif` = Playfair Display (used for headings)
- No dark mode configured (only light theme variables are set)
- shadcn/ui components live in `components/ui/` — use these primitives rather than writing raw HTML elements for common UI patterns

### Animation pattern

Sections use an `IntersectionObserver` + `useState(visible)` pattern for scroll-triggered fade/slide-in animations. The `visible` state toggles Tailwind transition classes (`translate-y-0 opacity-100` vs `translate-y-8 opacity-0`).

### Environment variables

- `CDN` — base URL for room cover images used in `data/roomData.ts`. Define in `.env`.

### Package manager

This project uses **npm**. Do not use pnpm or yarn.

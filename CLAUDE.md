# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev          # Dev server → http://localhost:3000
npm run build        # Production build (static + SSG pages)
npm run start        # Serve production build
npm run lint         # ESLint
```

## Architecture

**Static content-driven blog** built with Next.js 16 (App Router), React 19, Tailwind CSS v4, and `next-mdx-remote` v6 for MDX rendering. All pages are pre-rendered at build time — no runtime server needed.

### Content pipeline

```
content/{section}/*.mdx          ← Author writes frontmatter + Markdown body
       ↓
src/lib/content/{section}.ts     ← Loader: fs + gray-matter → typed array
       ↓
src/app/{section}/page.tsx       ← Server Component: calls loader, renders UI
       ↓
src/components/mdx/MdxWrapper    ← Client Component: MDXRemote renders body
```

Each section (game-reviews, portfolio, learning-journal, about, timeline, home) has its own loader in `src/lib/content/`. Loaders use `fs.readdirSync` + `gray-matter` to extract YAML frontmatter and Markdown body from `.mdx` files. No database, no CMS — filesystem is the content source.

### Server/Client split

- **Server Components** (default): pages, layouts, loaders, `GlassCard`, `Tag`, `Badge`, `Rating`, `SectionHeading`, `Button`, `Footer`
- **Client Components** (`"use client"`): `Header` (scroll detection), `MobileMenu` (toggle), `HeroSection` (hover effect), `ScrollReveal` (IntersectionObserver), `AnimatedText` (CSS animation stagger), `MdxWrapper` (MDXRemote runtime), `AudioPlayer`, `VideoBackground`

### Key dependencies

| Package | Role |
|---------|------|
| `gray-matter` | Parse YAML frontmatter from `.mdx` files |
| `next-mdx-remote` | `MDXRemote` renders MDX body in RSC |
| `framer-motion` | Page transitions (used sparingly) |
| `tailwind-merge` + `clsx` | `cn()` utility for class merging |

## Design system (Tailwind v4)

Unlike Tailwind v3, **Tailwind v4 uses CSS-based configuration**. All design tokens are in `src/app/globals.css` via `@theme inline { ... }`:

- **Colors**: `gold-*` (primary accent palette), `surface-*` (dark backgrounds from deepest to high), `text-*` (primary/secondary/muted), `border-*`
- **Fonts**: `--font-heading` (Playfair Display, serif), `--font-body` (Inter, sans-serif), loaded via `next/font/google` in root layout
- **Animations**: 10 custom `@keyframes` defined in globals.css, registered as `--animate-*` custom properties
- **Fluid type/space**: `--text-hero`, `--text-display`, `--text-h1` etc. use `clamp()` for responsive scaling; same for `--spacing-section`

Custom utility classes: `.glass-surface`, `.glass-surface-gold`, `.gold-gradient-text`, `.gold-gradient-border`, `.grain-overlay`

## Content modules

Each content section follows an identical pattern. To add a new game review:

1. Create `content/game-reviews/{slug}.mdx` with YAML frontmatter
2. The loader automatically picks it up — no code changes needed
3. `generateStaticParams()` in `[slug]/page.tsx` generates the page at build time

Frontmatter fields differ per section. See `MAINTENANCE.md` for the full field reference for each type.

**Draft mode**: set `draft: true` in frontmatter to hide a post from lists. Loaders filter by `!draft`.

**Status badges**: game reviews support `status: "maintained"` (gold badge) and `status: "ongoing"` (green badge; portfolio and learning-journal entries also support status badges).

## Image/assets management

All static assets go in `public/`. Images are organized by section and slug:

```
public/images/{section}/{slug}/cover.jpg
```

Referenced in frontmatter as `/images/{section}/{slug}/cover.jpg`. Video at `public/videos/background.mp4`, audio at `public/audio/bgm.mp3`.

## Deployment

**Primary**: Vercel (zero-config, auto-deploys on `git push` to main). See `README.md` for setup steps.

**Alternative**: Static export to GitHub Pages. Edit `next.config.ts` to add `output: "export"` and `images: { unoptimized: true }`, then `npm run build` → deploy `out/` directory.

## Gotchas

- **Tailwind v4**: no `tailwind.config.ts` — all theme config is in `globals.css` via `@theme inline`. Class names work the same as v3.
- **Next.js 16**: App Router, React 19, Turbopack by default in dev. See `node_modules/next/dist/docs/` for framework docs.
- **Static generation**: all routes use `generateStaticParams` for detail pages or are fully static. `MDXRemote` from `next-mdx-remote/rsc` runs at build time for SSG pages.
- **Windows CRLF**: git warns about LF→CRLF conversion on Windows. Harmless, but be aware when reading files from bash tools on Windows.

## Agent skills

### Issue tracker

Issues tracked as GitHub Issues on `g3260089513/PersonalWebPage`. See `docs/agents/issue-tracker.md`.

### Triage labels

Standard five-label vocabulary (needs-triage / needs-info / ready-for-agent / ready-for-human / wontfix). See `docs/agents/triage-labels.md`.

### Domain docs

Single-context repo — one `CONTEXT.md` + `docs/adr/` at root. See `docs/agents/domain.md`.

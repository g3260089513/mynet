# CLAUDE.md

> 本文档为 Claude Code 提供项目上下文指引，包含架构、命令、设计系统和维护规则。中文注释标注各章节用途。

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands · 命令

```bash
npm run dev          # 启动开发服务器 → http://localhost:3000
npm run build        # 生产构建（静态 + SSG 页面）
npm run start        # 启动生产服务器
npm run lint         # ESLint 代码检查
```

## Architecture · 项目架构

**Static content-driven blog** built with Next.js 16 (App Router), React 19, Tailwind CSS v4, and `next-mdx-remote` v6 for MDX rendering. All pages are pre-rendered at build time — no runtime server needed.

### Content pipeline · 内容管线

```
content/{section}/*.mdx          ← 作者编写 frontmatter + Markdown 正文
       ↓
src/lib/content/{section}.ts     ← Loader：fs + gray-matter → 类型化数组
       ↓
src/app/{section}/page.tsx       ← Server Component：调用 loader，渲染 UI
       ↓
src/components/mdx/MdxWrapper    ← Client Component：MDXRemote 渲染正文
```

Each section (game-reviews, portfolio, learning-journal, about, timeline, home) has its own loader in `src/lib/content/`. Loaders use `fs.readdirSync` + `gray-matter` to extract YAML frontmatter and Markdown body from `.mdx` files. No database, no CMS — filesystem is the content source.

### Server/Client split · 服务端/客户端组件划分

- **Server Components** (default): pages, layouts, loaders, `GlassCard`, `Tag`, `Badge`, `Rating`, `SectionHeading`, `Button`, `Footer`
- **Client Components** (`"use client"`): `Header` (scroll detection), `MobileMenu` (toggle), `HeroSection` (hover effect), `ScrollReveal` (IntersectionObserver), `AnimatedText` (CSS animation stagger), `MdxWrapper` (MDXRemote runtime), `AudioPlayer`, `VideoBackground`

### Key dependencies · 核心依赖

| Package | Role |
|---------|------|
| `gray-matter` | 解析 .mdx 文件的 YAML frontmatter |
| `next-mdx-remote` | 在 RSC 中渲染 MDX 正文 |
| `framer-motion` | 页面过渡动画（谨慎使用） |
| `tailwind-merge` + `clsx` | `cn()` 工具函数，合并 CSS 类名 |

## Design system (Tailwind v4) · 设计系统

Unlike Tailwind v3, **Tailwind v4 uses CSS-based configuration**. All design tokens are in `src/app/globals.css` via `@theme inline { ... }`:

- **Colors**: `gold-*` (primary accent palette), `surface-*` (dark backgrounds from deepest to high), `text-*` (primary/secondary/muted), `border-*`
- **Fonts**: `--font-heading` (Playfair Display, serif), `--font-body` (Inter, sans-serif), loaded via `next/font/google` in root layout
- **Animations**: 10 custom `@keyframes` defined in globals.css, registered as `--animate-*` custom properties
- **Fluid type/space**: `--text-hero`, `--text-display`, `--text-h1` etc. use `clamp()` for responsive scaling; same for `--spacing-section`

Custom utility classes: `.glass-surface`, `.glass-surface-gold`, `.gold-gradient-text`, `.gold-gradient-border`, `.grain-overlay`

## Content modules · 内容模块

Each content section follows an identical pattern. To add a new game review:

1. Create `content/game-reviews/{slug}.mdx` with YAML frontmatter
2. The loader automatically picks it up — no code changes needed
3. `generateStaticParams()` in `[slug]/page.tsx` generates the page at build time

Frontmatter fields differ per section. See `MAINTENANCE.md` for the full field reference for each type.

**Draft mode · 草稿模式**: set `draft: true` in frontmatter to hide a post from lists. Loaders filter by `!draft`.

**Status badges · 状态徽章**: game reviews support `status: "maintained"` (gold badge) and `status: "ongoing"` (green badge; portfolio and learning-journal entries also support status badges).

## Image/assets management · 图片/资源管理

All static assets go in `public/`. Images are organized by section and slug:

```
public/images/{section}/{slug}/cover.jpg
```

Referenced in frontmatter as `/images/{section}/{slug}/cover.jpg`. Video at `public/videos/background.mp4`, audio at `public/audio/bgm.mp3`.

## Deployment · 部署

**Primary**: Vercel (zero-config, auto-deploys on `git push` to main). See `README.md` for setup steps.

**Alternative**: Static export to GitHub Pages. Edit `next.config.ts` to add `output: "export"` and `images: { unoptimized: true }`, then `npm run build` → deploy `out/` directory.

## Gotchas · 注意事项

- **Tailwind v4**: no `tailwind.config.ts` — all theme config is in `globals.css` via `@theme inline`. Class names work the same as v3.
- **Next.js 16**: App Router, React 19, Turbopack by default in dev. See `node_modules/next/dist/docs/` for framework docs.
- **Static generation**: all routes use `generateStaticParams` for detail pages or are fully static. `MDXRemote` from `next-mdx-remote/rsc` runs at build time for SSG pages.
- **Windows CRLF**: git warns about LF→CRLF conversion on Windows. Harmless, but be aware when reading files from bash tools on Windows.

## Agent skills · Agent 技能配置

### Issue tracker · 问题跟踪

Issues tracked as GitHub Issues on `g3260089513/PersonalWebPage`. See `docs/agents/issue-tracker.md`.

### Triage labels · 分类标签

Standard five-label vocabulary (needs-triage / needs-info / ready-for-agent / ready-for-human / wontfix). See `docs/agents/triage-labels.md`.

### Domain docs · 领域文档

Single-context repo — one `CONTEXT.md` + `docs/adr/` at root. See `docs/agents/domain.md`.

### Skills catalog · 技能目录

Full inventory of all installed skills (14 Matt Pocock + 34 ECC Skills + 48 ECC Agents + 78 ECC Commands). See `skills-catalog.md` at project root. **This catalog must be updated whenever new skills are installed.**

### ECC (Everything Claude Code) · 全局 AI 编码插件

Global AI coding plugin v1.10.0 providing 48 agents, 183 skills, 79 commands. Installed at `~/.claude/`, available in all projects.

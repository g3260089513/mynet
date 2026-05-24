# Lara's Portfolio — 个人生涯展示博客

基于 Next.js 构建的个人博客，涵盖**个人简介、游戏测评、作品展示、学习笔记、职业历程**五大板块。采用暗色奢华（Dark Luxury）视觉风格，所有内容通过 Markdown/MDX 文件管理，模块化设计，方便日常维护。

## 快速开始

```bash
npm install        # 安装依赖
npm run dev        # 启动开发服务器 → http://localhost:3000
npm run build      # 生产构建
```

---

## 目录结构总览

```
aclaudepro/
├── content/                          # 📝 所有内容文件
│   ├── home/hero.mdx                 #   首页 Hero 数据
│   ├── about/index.mdx               #   个人简介（属性 + 长文）
│   ├── game-reviews/                 #   游戏测评（一篇一文件）
│   ├── portfolio/                    #   作品展示（一篇一文件）
│   ├── learning-journal/             #   学习笔记（一篇一文件）
│   └── timeline/milestones.mdx       #   职业历程时间线
│
├── public/
│   ├── images/                       # 🖼️ 图片资源（按板块分目录）
│   │   ├── about/                    #   个人照片
│   │   ├── game-reviews/{slug}/      #   游戏封面 + 截图
│   │   ├── portfolio/{slug}/         #   作品缩略图 + 截图
│   │   └── learning-journal/{slug}/  #   笔记封面
│   └── textures/grain.svg            #   噪点纹理
│
├── src/
│   ├── app/                          # 🧭 路由页面（Next.js App Router）
│   │   ├── page.tsx                  #   首页
│   │   ├── about/page.tsx            #   关于我
│   │   ├── game-reviews/
│   │   │   ├── page.tsx              #   测评列表
│   │   │   └── [slug]/page.tsx       #   测评详情
│   │   ├── portfolio/
│   │   │   ├── page.tsx              #   作品列表
│   │   │   └── [slug]/page.tsx       #   作品详情
│   │   ├── learning-journal/
│   │   │   ├── page.tsx              #   笔记列表
│   │   │   └── [slug]/page.tsx       #   笔记详情
│   │   ├── timeline/page.tsx         #   职业历程
│   │   └── contact/page.tsx          #   联系我
│   │
│   ├── components/                   # 🧩 组件库
│   │   ├── layout/                   #   全局布局：Header / Footer / 导航
│   │   ├── ui/                       #   通用组件：GlassCard / Tag / Rating 等
│   │   ├── home/                     #   首页专用：HeroSection / FeaturedGrid
│   │   └── mdx/                      #   MDX 渲染器
│   │
│   ├── lib/
│   │   ├── content/                  # 📦 内容加载器（每个板块一个）
│   │   │   ├── home.ts               #   读取 content/home/ 并解析
│   │   │   ├── about.ts              #   读取 content/about/ 并解析
│   │   │   ├── game-reviews.ts       #   读取 content/game-reviews/ 并解析
│   │   │   ├── portfolio.ts          #   读取 content/portfolio/ 并解析
│   │   │   ├── learning-journal.ts   #   读取 content/learning-journal/ 并解析
│   │   │   └── timeline.ts           #   读取 content/timeline/ 并解析
│   │   ├── types/                    # 📋 TypeScript 类型定义
│   │   ├── utils/                    # 🛠 工具函数（cn / date / animation）
│   │   └── constants/                # ⚙️ 常量（导航 / 站点配置 / 设计 token）
│   │
│   └── styles/（已合并到 globals.css） # 🎨 全局样式 + 设计系统
│
├── next.config.ts                    # Next.js 配置
├── tsconfig.json                     # TypeScript 配置
└── package.json                      # 依赖管理
```

---

## 部件职责说明

### 1. 内容层（`content/`）

**这是你最常打交道的目录。** 所有文章、简历信息、时间线数据都以 MDX 文件存储。每个板块独立一个子目录，板块之间互不影响。

### 2. 路由页面（`src/app/`）

| 路由 | 文件 | 职责 |
|------|------|------|
| `/` | `page.tsx` | 组装 HeroSection + SectionNav + FeaturedGrid |
| `/about` | `about/page.tsx` | 显示个人简介、技能网格、工作经历 |
| `/game-reviews` | `game-reviews/page.tsx` | 遍历所有测评生成卡片列表 |
| `/game-reviews/[slug]` | `game-reviews/[slug]/page.tsx` | 渲染单篇测评正文 |
| `/portfolio` | `portfolio/page.tsx` | 遍历所有作品生成卡片列表 |
| `/portfolio/[slug]` | `portfolio/[slug]/page.tsx` | 渲染单个作品正文 |
| `/learning-journal` | `learning-journal/page.tsx` | 遍历所有笔记生成卡片列表 |
| `/learning-journal/[slug]` | `learning-journal/[slug]/page.tsx` | 渲染单篇笔记正文 |
| `/timeline` | `timeline/page.tsx` | 垂直时间线展示职业里程碑 |
| `/contact` | `contact/page.tsx` | 联系方式和合作方向 |

### 3. 组件库（`src/components/`）

**layout/** — 全局外观：
- `Header.tsx` — 固定顶部导航栏，滚动后出现毛玻璃背景
- `Footer.tsx` — 页脚（导航链接 + 社交链接 + 版权）
- `MobileMenu.tsx` — 移动端汉堡菜单
- `GrainOverlay.tsx` — 全屏 SVG 噪点纹理叠加层

**ui/** — 可复用的基础组件：
- `GlassCard` — 毛玻璃卡片（3 种样式 × 3 种悬停效果）
- `SectionHeading` — 带金色菱形装饰的标题
- `Tag` / `Badge` — 标签和状态徽章
- `Rating` — 评分显示（0~10 分，按分数变色）
- `Button` — 按钮（主色/次要/金色）
- `ScrollReveal` — 滚动触发揭示动画（Intersection Observer）
- `AnimatedText` — 逐字显示动画

**home/** — 首页专用组件：
- `HeroSection` — 全屏欢迎区（逐字动画 + CTA 按钮）
- `SectionNav` — 四个快捷导航卡片
- `FeaturedGrid` — Bento 网格精选内容

**mdx/** — MDX 内容渲染：
- `MdxWrapper` — 接收 MDX 源码字符串，渲染为格式化 HTML（标题、段落、代码块、引用等）

### 4. 内容加载器（`src/lib/content/`）

每个加载器做同一件事：**读取 `content/` 下对应目录的 MDX 文件 → 用 `gray-matter` 分离 frontmatter 和正文 → 返回类型安全的数组**。

以游戏测评为例：
- `getAllReviews()` — 返回所有非草稿测评，按发布时间倒序
- `getReviewBySlug(slug)` — 根据文件名查找单篇测评
- `getFeaturedReviews(limit)` — 返回标记为 `featured: true` 的前 N 篇
- `getAllGenres()` — 去重统计所有游戏类型

### 5. 设计系统（`src/app/globals.css`）

所有视觉 token 通过 Tailwind CSS v4 的 `@theme inline` 定义：
- **颜色**：金色系（`gold-*`）、暗色表面（`surface-*`）、文字色（`text-*`）
- **字体**：Playfair Display（标题，衬线）+ Inter（正文，无衬线）
- **动画**：10 个 `@keyframes`（淡入、滑入、逐字揭示、金色闪烁等）
- **工具类**：`.glass-surface`、`.glass-surface-gold`、`.gold-gradient-text`、`.gold-gradient-border`

---

## 内容管理指南

### 新增一篇文章

以游戏测评为例，在 `content/game-reviews/` 下新建一个 `.mdx` 文件：

```mdx
---
gameName: "游戏名称"
developer: "开发商"
releaseYear: 2024
platform: ["PC", "PS5"]
genre: ["动作RPG", "开放世界"]
rating: 8.5
playTime: "50小时"
coverImage: "/images/game-reviews/slug/cover.jpg"
tags: ["标签1", "标签2"]
summary: "一句话总结这个游戏"
publishedAt: "2024-06-01"
featured: true
draft: false
---

## 游戏正文
这里写测评内容...
```

**保存文件后，文章自动出现。** 不需要修改任何代码。

各板块的 frontmatter 字段：

<details>
<summary>🏠 首页 Hero（content/home/hero.mdx）</summary>

| 字段 | 类型 | 说明 |
|------|------|------|
| `greeting` | string | 问候语 |
| `name` | string | 显示名称 |
| `roles` | string[] | 身份标签列表 |
| `tagline` | string | 一句话介绍 |
| `ctaPrimary.label` | string | 主按钮文字 |
| `ctaPrimary.href` | string | 主按钮链接 |
| `ctaSecondary.label` | string | 次按钮文字 |
| `ctaSecondary.href` | string | 次按钮链接 |
</details>

<details>
<summary>👤 关于我（content/about/index.mdx）</summary>

| 字段 | 类型 | 说明 |
|------|------|------|
| `name` | string | 姓名 |
| `title` | string | 职业头衔 |
| `location` | string | 所在地 |
| `avatar` | string | 头像路径 |
| `highlights` | `{label, value}[]` | 数据一览卡片 |
| `skills` | `{category, items[]}[]` | 技能矩阵 |
| `experience` | `{role, company, period, description}[]` | 工作经历 |
</details>

<details>
<summary>🎮 游戏测评（content/game-reviews/*.mdx）</summary>

| 字段 | 类型 | 说明 |
|------|------|------|
| `gameName` | string | 游戏名 |
| `developer` | string | 开发商 |
| `releaseYear` | number | 发行年份 |
| `platform` | string[] | 平台 |
| `genre` | string[] | 类型 |
| `rating` | number | 评分（0~10） |
| `playTime` | string | 游戏时长 |
| `coverImage` | string | 封面图路径 |
| `tags` | string[] | 标签 |
| `summary` | string | 简介 |
| `publishedAt` | string | 发布日期（YYYY-MM-DD） |
| `featured` | boolean | 是否在首页精选展示 |
| `draft` | boolean | 草稿（为 true 则不显示） |
</details>

<details>
<summary>💼 作品集（content/portfolio/*.mdx）</summary>

| 字段 | 类型 | 说明 |
|------|------|------|
| `title` | string | 项目名 |
| `category` | string | 分类（web/mobile/game/cli/design） |
| `thumbnail` | string | 缩略图路径 |
| `techStack` | string[] | 技术栈 |
| `summary` | string | 项目简介 |
| `status` | string | 状态（completed/in-progress/maintained） |
| `role` | string | 担任角色 |
| `liveUrl` | string? | 在线地址 |
| `repoUrl` | string? | 仓库地址 |
</details>

<details>
<summary>📝 学习笔记（content/learning-journal/*.mdx）</summary>

| 字段 | 类型 | 说明 |
|------|------|------|
| `title` | string | 标题 |
| `tool` | string | 学习的工具/语言 |
| `category` | string | 分类（language/framework/tool/engine） |
| `difficulty` | string | 难度（beginner/intermediate/advanced） |
| `timeSpent` | string | 学习耗时 |
| `outcome` | string | 学习成果 |
| `tags` | string[] | 标签 |
</details>

<details>
<summary>📅 职业历程（content/timeline/milestones.mdx）</summary>

| 字段 | 类型 | 说明 |
|------|------|------|
| `items[].date` | string | 日期（YYYY-MM 或 YYYY） |
| `items[].title` | string | 标题 |
| `items[].company` | string? | 公司/组织 |
| `items[].type` | string | 类型（work/education/milestone/certification） |
| `items[].description` | string | 描述 |
| `items[].highlight` | boolean | 是否高亮显示 |
| `items[].tags` | string[] | 标签 |
</details>

### 草稿功能

设置 `draft: true` 即可隐藏文章（不会出现在列表和首页精选）。设为 `false` 或删除该行后重新出现。

### 图片资源管理

```
public/images/
├── about/
│   └── avatar.jpg               → 在 frontmatter 中引用为 /images/about/avatar.jpg
├── game-reviews/
│   └── elden-ring/
│       └── cover.jpg            → 在 frontmatter 中引用为 /images/game-reviews/elden-ring/cover.jpg
├── portfolio/
│   └── pixel-editor/
│       └── thumb.jpg            → 在 frontmatter 中引用为 /images/portfolio/pixel-editor/thumb.jpg
└── learning-journal/
    └── learning-rust/
        └── cover.jpg            → 在 frontmatter 中引用为 /images/learning-journal/learning-rust/cover.jpg
```

**规则**：每个文章的资源放在 `public/images/{板块名}/{slug}/` 下，frontmatter 中写 `/images/{板块名}/{slug}/文件名`。

### 修改导航菜单

编辑 [src/lib/constants/navigation.ts](src/lib/constants/navigation.ts)，增删或修改 `navigation` 数组中的条目即可。

### 修改设计风格

编辑 [src/app/globals.css](src/app/globals.css) 中的 `@theme inline` 块：
- 金色主色 → `--color-gold-*` 系列
- 背景深度 → `--color-surface-*` 系列
- 标题字体 → `--font-heading`
- 正文字体 → `--font-body`

---

## 部署指南

### 方案一：Vercel（推荐）

Vercel 是 Next.js 的创建者，零配置部署，**免费额度充足**。

**步骤：**

1. 将项目推送到 GitHub 仓库：
   ```bash
   git remote add origin https://github.com/你的用户名/仓库名.git
   git add .
   git commit -m "feat: initial blog project"
   git push -u origin main
   ```
2. 访问 [vercel.com](https://vercel.com) 注册（用 GitHub 账号登录）
3. 点击 **"New Project"** → 选择你的仓库 → 点击 **"Deploy"**
4. 部署完成后，你会得到 `https://你的项目名.vercel.app` 的公开链接
5. （可选）在 Vercel 控制台绑定自定义域名

**免费额度**：100GB 带宽/月，1000 张图片优化/月，对于个人博客绰绰有余。

**后续更新**：`git push` 到 main 分支后 Vercel 自动重新部署，无需手动操作。

### 方案二：GitHub Pages（纯静态导出）

适用于只想用 GitHub Pages 托管的情况。

**步骤：**

1. 修改 [next.config.ts](next.config.ts)：
   ```ts
   const nextConfig: NextConfig = {
     output: "export",
     images: { unoptimized: true },
   };
   ```
2. 构建：
   ```bash
   npm run build
   ```
   HTML 文件生成在 `out/` 目录。
3. 部署 `out/` 到 GitHub Pages：
   - 最简单的方式是将 `out/` 内容推到 `gh-pages` 分支
   - 或使用 GitHub Actions 自动部署（见下方）

**GitHub Actions 自动部署：**

在仓库中创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pages: write
      id-token: write
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./out
      - uses: actions/deploy-pages@v4
```

然后在 GitHub 仓库设置中启用 Pages，Source 选择 **"GitHub Actions"**。

> **注意**：GitHub Pages 不支持 Next.js 服务端特性。项目已配置为纯静态生成，所有页面在构建时预渲染，因此兼容 GitHub Pages。

### 方案三：Cloudflare Pages

类似 GitHub Pages，免费额度更大：

1. 修改 `next.config.ts` 添加 `output: "export"` 和 `images: { unoptimized: true }`
2. 安装 Cloudflare 适配器：`npm install -D @cloudflare/next-on-pages`
3. 推送代码到 GitHub 后在 Cloudflare Dashboard 连接仓库

---

## 技术栈

| 技术 | 用途 |
|------|------|
| Next.js 16 | 应用框架（App Router） |
| React 19 | UI 库 |
| TypeScript | 类型安全 |
| Tailwind CSS v4 | 原子化 CSS |
| framer-motion | 页面过渡动画 |
| gray-matter | Markdown frontmatter 解析 |
| next-mdx-remote | MDX 服务端渲染 |
| Playfair Display + Inter | 字体（Google Fonts） |

## 构建状态

```
Route (app)                            Size   First Load JS
┌ ○ /                                 138 B          99 kB
├ ○ /about                            138 B          99 kB
├ ○ /game-reviews                     138 B          99 kB
├ ● /game-reviews/[slug]              138 B          99 kB
├ ○ /learning-journal                 138 B          99 kB
├ ● /learning-journal/[slug]          138 B          99 kB
├ ○ /portfolio                        138 B          99 kB
├ ● /portfolio/[slug]                 138 B          99 kB
├ ○ /timeline                         138 B          99 kB
└ ○ /contact                          138 B          99 kB
```

# 项目更新与维护指南

本文档详细记录博客项目的日常更新操作流程，包括内容修改、新增文章、样式调整、本地验证和部署推送的每一步操作。

---

## 目录

- [一、日常内容更新](#一日常内容更新)
  - [1.1 修改已有文章](#11-修改已有文章)
  - [1.2 新增游戏测评](#12-新增游戏测评)
  - [1.3 新增作品展示](#13-新增作品展示)
  - [1.4 新增学习笔记](#14-新增学习笔记)
  - [1.5 修改个人简介](#15-修改个人简介)
  - [1.6 更新职业历程](#16-更新职业历程)
  - [1.7 修改首页 Hero](#17-修改首页-hero)
  - [1.8 修改联系信息](#18-修改联系信息)
- [二、图片与资源管理](#二图片与资源管理)
- [三、样式与布局调整](#三样式与布局调整)
- [四、导航菜单修改](#四导航菜单修改)
- [五、新增整个板块](#五新增整个板块)
- [六、本地验证](#六本地验证)
- [七、提交与部署](#七提交与部署)
- [八、常见问题排查](#八常见问题排查)

---

## 一、日常内容更新

所有文章内容以 `.mdx` 文件存储在 `content/` 目录下。**增删文章不需要改代码**，只需操作文件。

### 1.1 修改已有文章

**操作步骤：**

1. 打开 `content/` 目录下对应板块的 `.mdx` 文件
2. 用任意文本编辑器（VS Code、记事本等）编辑
3. 保存文件

**文件结构说明：**

每个 `.mdx` 文件分为两部分：

```mdx
---                           ← 三个短横线标记开始
gameName: "游戏名"             ← 这里是 YAML 前置数据（frontmatter）
rating: 8.5                   ← 控制列表页卡片显示的信息
featured: true                ←
---                           ← 三个短横线标记结束

这里开始是 Markdown 正文       ← 详情页的富文本内容
可以包含标题、段落、列表等
```

- **三个短横线 `---` 之间的部分**：称为 frontmatter，用 YAML 格式定义文章的元数据（标题、日期、评分、标签等）
- **短横线之后的部分**：Markdown 格式的正文，会渲染在文章详情页

**示例：修改游戏评分**

打开 `content/game-reviews/hollow-knight.mdx`，找到：
```yaml
rating: 9.3
```
改为：
```yaml
rating: 9.5
```
保存即可。网站上的评分显示会自动更新。

### 1.2 新增游戏测评

**操作步骤：**

1. 在 `content/game-reviews/` 目录下新建文件，命名为 `游戏英文名.mdx`
   - 文件名会变成页面链接：`elden-ring.mdx` → `/game-reviews/elden-ring`
   - 建议用英文+连字符：`zelda-tears-of-kingdom.mdx`

2. 写入以下模板（**复制粘贴后修改**）：

```mdx
---
gameName: "游戏中文名"
developer: "开发商名称"
releaseYear: 2024
platform:
  - "PC"
  - "PS5"
genre:
  - "动作RPG"
  - "开放世界"
rating: 8.5
playTime: "50小时"
coverImage: "/images/game-reviews/你的文件名/cover.jpg"
tags:
  - "标签1"
  - "标签2"
summary: "一句话总结这个游戏（会显示在列表卡片上）"
publishedAt: "2024-06-01"
featured: true
draft: false
---

## 游戏概述

这里写游戏简介...

## 玩法分析

这里写详细的玩法分析...

## 优点

- 优点1
- 优点2

## 缺点

- 缺点1

## 总结

总结段落...
```

3. 保存文件

**字段说明：**

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `gameName` | 文字 | 是 | 游戏名称，显示在卡片和详情页标题 |
| `developer` | 文字 | 是 | 开发商 |
| `releaseYear` | 数字 | 是 | 发行年份，纯数字不加引号 |
| `platform` | 列表 | 是 | 平台，每个一行，前面加 `- ` |
| `genre` | 列表 | 是 | 游戏类型 |
| `rating` | 数字 | 是 | 评分 0~10，支持一位小数如 8.5 |
| `playTime` | 文字 | 是 | 游玩时长，如 "50小时" |
| `coverImage` | 文字 | 是 | 封面图路径，以 `/images/` 开头 |
| `tags` | 列表 | 是 | 标签，用于筛选和展示 |
| `summary` | 文字 | 是 | 一句话简介，显示在卡片上 |
| `publishedAt` | 文字 | 是 | 发布日期，格式 YYYY-MM-DD |
| `featured` | 布尔 | 否 | 是否在首页精选展示，`true` 或 `false` |
| `draft` | 布尔 | 否 | 设为 `true` 则隐藏文章（草稿模式） |

### 1.3 新增作品展示

在 `content/portfolio/` 下新建 `.mdx` 文件：

```mdx
---
title: "项目名称"
category: "web"
thumbnail: "/images/portfolio/你的文件名/thumb.jpg"
images:
  - "/images/portfolio/你的文件名/screen1.jpg"
techStack:
  - "Next.js"
  - "TypeScript"
  - "Tailwind CSS"
liveUrl: "https://项目在线地址.com"
repoUrl: "https://github.com/你的用户名/仓库名"
summary: "一句话介绍这个项目"
publishedAt: "2024-06-01"
featured: true
draft: false
status: "completed"
role: "Solo Developer"
---

## 项目概述

...

## 技术亮点

...

## 挑战与收获

...
```

**字段说明：**

| 字段 | 类型 | 说明 |
|------|------|------|
| `category` | 文字 | 分类：`web` / `mobile` / `game` / `cli` / `library` / `design` |
| `status` | 文字 | 状态：`completed`(已完成) / `in-progress`(开发中) / `maintained`(维护中) |
| `role` | 文字 | 担任角色，如 "Solo Developer" / "Frontend Lead" |
| `liveUrl` | 文字 | 在线体验地址，没有则删除这行 |
| `repoUrl` | 文字 | 源代码仓库地址，没有则删除这行 |

### 1.4 新增学习笔记

在 `content/learning-journal/` 下新建 `.mdx` 文件：

```mdx
---
title: "学习 XXX 的历程"
tool: "工具或语言名"
category: "language"
difficulty: "intermediate"
timeSpent: "3 周"
coverImage: "/images/learning-journal/你的文件名/cover.jpg"
tags:
  - "标签1"
  - "标签2"
summary: "一句话总结"
publishedAt: "2024-06-01"
featured: true
draft: false
outcome: "构建了一个 XXX 项目"
---

## 为什么学习这个？

...

## 学习路径

...

## 关键收获

...
```

**字段说明：**

| 字段 | 类型 | 说明 |
|------|------|------|
| `category` | 文字 | `language`(编程语言) / `framework`(框架) / `tool`(工具) / `concept`(概念) / `engine`(游戏引擎) |
| `difficulty` | 文字 | `beginner`(入门) / `intermediate`(进阶) / `advanced`(高级) |
| `timeSpent` | 文字 | 学习耗时，如 "3 周" |
| `outcome` | 文字 | 学习成果描述 |

### 1.5 修改个人简介

编辑 `content/about/index.mdx`：

```mdx
---
name: "你的名字"
title: "你的头衔"
location: "所在地"
avatar: "/images/about/avatar.jpg"
highlights:
  - label: "游戏测评"
    value: "50+"
  - label: "开发项目"
    value: "20+"
skills:
  - category: "前端开发"
    items:
      - "React"
      - "Next.js"
      - "TypeScript"
experience:
  - role: "高级前端工程师"
    company: "某科技公司"
    period: "2023 - 至今"
    description: "负责核心产品的前端架构设计"
---

## 关于我

这里是长文自我介绍，支持 Markdown 格式...
```

**修改要点：**
- `highlights` 是首页"数据一览"的四个数字卡片，可自行增减
- `skills` 是技能矩阵，`category` 为分类名，`items` 为具体技能
- `experience` 是工作经历，每条有角色、公司、时间和描述
- `---` 之后的 Markdown 正文会渲染为富文本

### 1.6 更新职业历程

编辑 `content/timeline/milestones.mdx`：

```mdx
---
items:
  - date: "2024-06"
    title: "事件的标题"
    company: "公司或组织名（可选）"
    type: "milestone"
    description: "简要描述"
    highlight: true
    tags:
      - "标签1"
      - "标签2"
  - date: "2024-03"
    title: "下一个事件"
    # ...
---

（时间线文件没有正文部分，所有数据在 frontmatter 中）
```

**字段说明：**

| 字段 | 说明 |
|------|------|
| `date` | 日期，格式 YYYY-MM 或 YYYY |
| `title` | 事件标题 |
| `company` | 公司/组织（可选，没有则删除此行） |
| `type` | `work`(工作) / `education`(教育) / `milestone`(里程碑) / `certification`(认证) |
| `highlight` | `true` 则卡片带金色边框突出显示 |
| `tags` | 标签列表 |

### 1.7 修改首页 Hero

编辑 `content/home/hero.mdx`：

```mdx
---
greeting: "你好，我是"
name: "你的名字"
roles:
  - "身份标签1"
  - "身份标签2"
  - "身份标签3"
tagline: "一句话个性签名"
ctaPrimary:
  label: "查看作品集"
  href: "/portfolio"
ctaSecondary:
  label: "阅读测评"
  href: "/game-reviews"
---

## 欢迎来到我的个人空间

可以在这里写一段欢迎词...
```

### 1.8 修改联系信息

编辑 `src/app/contact/page.tsx`，找到以下两处修改：

**电子邮箱：**
```tsx
<Button variant="secondary" href="mailto:你的邮箱@example.com" external>
  你的邮箱@example.com
</Button>
```

**GitHub 链接：**
```tsx
<Button variant="secondary" href="https://github.com/你的用户名" external>
  @你的用户名
</Button>
```

---

## 二、图片与资源管理

### 图片存放规则

```
public/images/
├── about/
│   └── avatar.jpg                    ← 个人头像
├── game-reviews/
│   └── elden-ring/                   ← 以文章文件名为目录名
│       └── cover.jpg                 ← 封面图
├── portfolio/
│   └── pixel-editor/
│       ├── thumb.jpg                 ← 缩略图
│       └── screen1.jpg               ← 截图
└── learning-journal/
    └── learning-rust/
        └── cover.jpg
```

### 添加图片操作步骤

1. 在 `public/images/` 对应板块下创建目录，**目录名 = 文章的 .mdx 文件名**（去掉 .mdx 后缀）
2. 将图片放入该目录
3. 在文章 frontmatter 中引用：`/images/板块名/目录名/文件名.jpg`

**示例：** 为 `elden-ring.mdx` 添加封面图

```bash
# 1. 把图片放到这里
public/images/game-reviews/elden-ring/cover.jpg

# 2. 在 frontmatter 中写
coverImage: "/images/game-reviews/elden-ring/cover.jpg"
```

**关键规则：**
- 所有图片的根目录是 `public/`
- frontmatter 中的路径以 `/images/` 开头（对应磁盘上的 `public/images/`）
- 支持的格式：`.jpg` `.png` `.webp` `.avif`
- 建议使用 `.webp` 格式，体积更小

### 替换已有图片

直接覆盖原文件即可，文件名不变则无需修改 frontmatter。

---

## 三、样式与布局调整

### 修改配色方案

打开 `src/app/globals.css`，找到 `@theme inline` 块：

```css
@theme inline {
  --color-gold-400: #d4a853;    /* ← 主金色，改这里 */
  --color-surface-deepest: #0a0a0a;  /* ← 最深背景 */
  --color-surface-base: #111111;     /* ← 基础背景 */
  /* ... */
}
```

只改颜色值（`#` 后面的部分），不要改变量名。

### 修改字体

在 `src/app/layout.tsx` 中：

```tsx
import { Playfair_Display, Inter } from "next/font/google";
// 换成你想要的 Google Fonts 字体名
```

同时修改 `src/app/globals.css` 中的：
```css
--font-heading: "Playfair Display", Georgia, serif;
--font-body: "Inter", system-ui, -apple-system, sans-serif;
```

### 修改动画速度

在 `src/app/globals.css` 中找到动画的 `animation-duration` 数值，改小则更快，改大则更慢。例如逐字动画默认 0.4 秒：

```css
--animate-char-reveal: charReveal 0.4s ...;  /* 改成 0.2s 更快，0.6s 更慢 */
```

---

## 四、导航菜单修改

编辑 `src/lib/constants/navigation.ts`：

```ts
export const navigation: NavItem[] = [
  { label: "首页", href: "/" },
  { label: "关于我", href: "/about" },
  // 添加新条目 ↓
  { label: "新页面", href: "/新页面的路由" },
  // 删除不需要的条目即可
  { label: "游戏测评", href: "/game-reviews" },
  // ...
];
```

保存后自动更新顶部导航栏和移动端菜单。

页脚导航在 `src/components/layout/Footer.tsx` 中单独编辑。

---

## 五、新增整个板块

如果要增加一个全新的内容板块（如"阅读笔记"），需要创建以下文件：

### 第 1 步：创建内容目录

```bash
mkdir content/reading-notes
```

### 第 2 步：写第一篇示例文章

创建 `content/reading-notes/first-book.mdx`，参照游戏测评的模板自定义 frontmatter 字段。

### 第 3 步：创建内容加载器

创建 `src/lib/content/reading-notes.ts`：

```ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const dir = path.join(process.cwd(), "content/reading-notes");

export interface ReadingNote {
  slug: string;
  title: string;
  author: string;
  rating: number;
  tags: string[];
  summary: string;
  publishedAt: string;
  content: string;
}

function readFiles(): ReadingNote[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf-8");
      const { data, content } = matter(raw);
      return {
        slug: file.replace(/\.mdx$/, ""),
        title: data.title ?? "",
        author: data.author ?? "",
        rating: data.rating ?? 0,
        tags: data.tags ?? [],
        summary: data.summary ?? "",
        publishedAt: data.publishedAt ?? "",
        content,
      };
    });
}

export function getAllNotes(): ReadingNote[] {
  return readFiles().sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getNoteBySlug(slug: string): ReadingNote | undefined {
  return readFiles().find((n) => n.slug === slug);
}
```

### 第 4 步：创建列表页

创建 `src/app/reading-notes/page.tsx`（参照 `src/app/game-reviews/page.tsx`）。

### 第 5 步：创建详情页

创建 `src/app/reading-notes/[slug]/page.tsx`（参照 `src/app/game-reviews/[slug]/page.tsx`）。

### 第 6 步：添加到导航

在 `src/lib/constants/navigation.ts` 中添加条目。

---

## 六、本地验证

### 启动开发服务器

```bash
cd d:/aclaudepro
npm run dev
```

浏览器打开 `http://localhost:3000`，可以实时预览所有页面。

### 验证检查清单

- [ ] 首页正常显示，Hero 动画正常
- [ ] 新增/修改的文章出现在列表页
- [ ] 文章详情页内容正确渲染
- [ ] 评分、标签、日期等信息正确
- [ ] 图片正常加载
- [ ] 导航菜单链接有效
- [ ] 移动端汉堡菜单正常（浏览器窗口缩小到手机宽度）
- [ ] 所有页面没有报错

### 生产构建验证

```bash
npm run build
```

确认终端输出中**没有 Error**，所有路由都标记为 `○ (Static)` 或 `● (SSG)`，即为成功。

---

## 七、提交与部署

### 完整更新流程

每次修改完内容后，按以下步骤操作：

```bash
# 1. 进入项目目录
cd d:/aclaudepro

# 2. 查看修改了什么
git status

# 3. 查看具体改动内容
git diff

# 4. 添加所有修改到暂存区
git add .

# 5. 提交（commit message 写清楚改了什么）
git commit -m "feat: 新增塞尔达传说测评"

# 6. 推送到 GitHub
git push

# 推送后 Vercel 会自动检测并重新部署（约 1-2 分钟）
```

### Commit 消息规范

```
feat: 新增XXX       — 新增文章或功能
fix: 修复XXX        — 修复错误
chore: 更新XXX      — 修改配置或资源
refactor: 重构XXX   — 代码结构调整
```

### 部署状态查看

1. 打开 [vercel.com](https://vercel.com) 登录
2. 进入你的项目 → 点击 **"Deployments"** 标签
3. 最新的 deployment 会显示状态：
   - 🟢 **Ready** — 部署成功，网站已更新
   - 🟡 **Building** — 正在构建中
   - 🔴 **Error** — 构建失败，点进去看错误日志

### 如何获取公开访问链接

部署成功后，链接格式为：
```
https://mynet-XXXX.vercel.app
```

在 Vercel Dashboard 项目的 Overview 页面可以看到。也可以绑定自定义域名。

---

## 八、常见问题排查

### Q: 新增文章后列表页看不到？

1. 检查 `draft` 是否为 `false` 或没有写 `draft` 字段
2. 检查文件名后缀是否为 `.mdx`
3. 确认文件在正确的目录下（如测评必须在 `content/game-reviews/`）
4. 重新运行 `npm run dev`

### Q: 图片不显示？

1. 确认图片在 `public/images/` 下
2. frontmatter 中的路径以 `/images/` 开头（不是 `public/images/`）
3. 文件名拼写是否正确（包括大小写和扩展名）
4. 图片路径中的目录名是否与文章文件名一致

### Q: 本地 `npm run dev` 报错？

1. 先运行 `npm install` 确保依赖安装完整
2. 检查报错信息中提到的文件和行号
3. 最常见：frontmatter 格式错误（`---` 必须成对出现，冒号后要有空格）

### Q: Vercel 部署失败？

1. 确认 `npm run build` 在本地能通过
2. 把本地修改 push 到 GitHub 后再触发部署
3. 在 Vercel Dashboard 查看构建日志找具体错误

### Q: 提交后 Vercel 没有自动部署？

1. 确认 `git push` 成功
2. 去 Vercel Dashboard → Settings → Git → 确认仓库连接正常
3. 可以手动点击 **"Redeploy"** 触发部署

---

## 快速参考卡片

```
📝 改文章        → 编辑 content/xxx/文件.mdx → 保存 → git add . → git commit -m "更新" → git push
🖼️ 加图片        → 放到 public/images/板块/文件名/ → frontmatter 里写 /images/板块/文件名/xxx.jpg
🎨 改颜色        → 编辑 src/app/globals.css 中 @theme inline 块
🧭 改导航        → 编辑 src/lib/constants/navigation.ts
🆕 加文章        → 复制模板 → 改 frontmatter → 写入正文 → 保存
🏠 本地预览      → npm run dev → http://localhost:3000
🏗️ 构建检查      → npm run build
🚀 推送部署      → git add . → git commit -m "..." → git push
```

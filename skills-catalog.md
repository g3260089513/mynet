# Agent Skills 目录

> 本文档记录项目中所有已安装的 Agent Skills，按来源和功能分类并备注用途。
> **安装新 Skills 后需同步更新此文档。**

---

## 概览

| 来源 | 安装位置 | 组件 | 数量 |
|------|----------|------|------|
| Matt Pocock Skills | 项目级 `.agents/skills/` | Skills | 14 |
| ECC (Everything Claude Code) | 全局 `~/.claude/` | Skills / Agents / Commands / Rules / Hooks | 34 / 48 / 78 / 89 / 30+ |
| **合计** | | | **279+** |

### 触发机制说明

| 来源 | 触发方式 |
|------|----------|
| **Matt Pocock Skills** | 主要通过 `/` 斜杠命令显式调用（如 `/tdd`、`/diagnose`） |
| **ECC Skills** | **绝大多数自动触发** — Agent 读取 Skill 的 `description` 字段，匹配当前任务场景后自动加载。仅少数带 `disable-model-invocation: true` 标记的需要显式 `/` 命令 |

> **注意**：Matt Pocock Skills 是项目级的，每个新项目需要重新安装。
> ECC Skills 是全局的，安装一次后所有项目通用。

---

# Part A: Matt Pocock Skills（项目级 · 14 个）

工程化工作流技能，覆盖规划、开发、诊断、项目管理全流程。

## A1. 规划与设计

| Skill | 触发方式 | 功能说明 |
|-------|----------|----------|
| `grill-with-docs` | `/grill-with-docs` | 对照 CONTEXT.md 和 ADR 对设计方案逐层盘问，精炼术语，决议落地后即时更新文档 |
| `grill-me` | `/grill-me` | 反过来盘问用户，逐分支走查设计决策树，每次只问一个问题 |
| `zoom-out` | `/zoom-out` | 将代码片段放到更大架构图景中，输出相关模块和调用者全景地图 |
| `prototype` | `/prototype` | 构建一次性原型验证设计假设。分逻辑原型（终端交互）和 UI 原型（多方案切换）两条分支 |

## A2. 开发与实现

| Skill | 触发方式 | 功能说明 |
|-------|----------|----------|
| `tdd` | `/tdd` | 严格 TDD：RED → GREEN → REFACTOR，竖切而非横切，强调测试行为而非实现细节 |
| `diagnose` | `/diagnose` | 六阶段诊断循环：反馈回路 → 复现 → 假设 → 插桩 → 修复 → 复盘 |
| `improve-codebase-architecture` | `/improve-codebase-architecture` | 扫描架构摩擦点，提出"深化"建议，输出 HTML 可视化报告 |
| `caveman` | `/caveman` | 超压缩通信模式，节省约 75% token，持续生效直到手动关闭 |

## A3. 项目管理

| Skill | 触发方式 | 功能说明 |
|-------|----------|----------|
| `triage` | `/triage` | Issue 状态机流转：needs-triage → needs-info / ready-for-agent / ready-for-human / wontfix |
| `to-issues` | `/to-issues` | 将计划按竖切拆分为独立 Issue，标注 AFK/HITL 类型和依赖关系 |
| `to-prd` | `/to-prd` | 将当前对话合成为完整 PRD，发布到 Issue 追踪器 |

## A4. 协作与工作流

| Skill | 触发方式 | 功能说明 |
|-------|----------|----------|
| `handoff` | `/handoff` | 将当前对话压缩为交接文档，自动引用已有 PRD/ADR/Issue |
| `write-a-skill` | `/write-a-skill` | 引导创建新 Agent Skill：需求收集 → 结构设计 → 草稿审查 |

## A5. 安装与配置

| Skill | 触发方式 | 功能说明 |
|-------|----------|----------|
| `setup-matt-pocock-skills` | `/setup-matt-pocock-skills` | 配置 Issue 追踪器 + 分流标签 + 域文档布局，生成 `docs/agents/` 配置 |

---

# Part B: ECC Skills（全局级 · 34 个）

全栈 AI 编程插件，覆盖开发工程、AI 自动化、内容创作、商业市场四大领域。

## B1. 开发与工程（14 个）

| Skill | 触发场景 | 功能说明 |
|-------|----------|----------|
| `api-design` | 设计新 API、审查 API 契约 | REST API 设计规范：资源命名、状态码、分页、过滤、版本化、限流 |
| `backend-patterns` | 后端架构、数据库优化 | 仓储模式、服务层、中间件、缓存策略、N+1 预防、后台任务队列 |
| `bun-runtime` | 选择运行时、迁移 | Bun vs Node.js 对比、包管理、打包器、测试运行器、Vercel 兼容性 |
| `claude-api` | 构建 Claude API 应用 | Anthropic Messages API、流式、工具调用、视觉、扩展思考、批处理、Agent SDK |
| `coding-standards` | 代码审查、新项目初始化 | 通用编码规范：命名、不可变性、KISS/DRY/YAGNI、错误处理、代码坏味检测 |
| `documentation-lookup` | 查框架/库文档 | 通过 Context7 MCP 获取最新文档，替代训练数据中的过时信息 |
| `e2e-testing` | E2E 测试编写 | Playwright 模式、Page Object Model、CI/CD 集成、artifact 管理、flaky 测试策略 |
| `frontend-design` | 构建 Web 组件/页面 | 产出有设计感的、生产级前端界面，注重视觉质量 |
| `frontend-patterns` | React/Next.js 开发 | 组件组合、状态管理、性能优化、自定义 Hook、条件渲染 |
| `frontend-slides` | 制作演示文稿 | 从零创建动画丰富的 HTML 演示文稿，或从 PPT/PPTX 转换 |
| `mcp-server-patterns` | 构建 MCP 服务器 | Node/TypeScript SDK：tools、resources、prompts、Zod 校验、stdio vs HTTP |
| `nextjs-turbopack` | Next.js 16+ 开发 | Turbopack 增量打包、FS 缓存、开发速度优化、Turbopack vs webpack |
| `security-review` | 认证/支付/敏感功能 | 安全审查清单：密钥管理、输入验证、XSS/CSRF/SQL 注入防护 |
| `tdd-workflow` | 新功能/Bug 修复/重构 | TDD 工作流：单元测试 + 集成测试 + E2E 测试，80%+ 覆盖率 |

## B2. AI 工程与自动化（8 个）

| Skill | 触发场景 | 功能说明 |
|-------|----------|----------|
| `agent-introspection-debugging` | Agent 运行失败、循环、token 消耗异常 | AI Agent 结构化自调试：故障捕获 → 根因诊断 → 受控恢复 → 自省报告 |
| `agent-sort` | 为项目定制 ECC 安装面 | 基于仓库实际技术栈将 Skills/Agents/Commands/Rules 分类为 DAILY（常驻加载）和 LIBRARY（按需检索） |
| `dmux-workflows` | 并行运行多个 Agent 会话 | 使用 dmux（tmux 窗格管理器）编排多 Agent 并行工作流 |
| `eval-harness` | EDD 评估驱动开发 | Claude Code 会话的正式评估框架 |
| `everything-claude-code-conventions` | ECC 项目本身开发 | everything-claude-code 项目的开发约定与规范 |
| `product-capability` | PRD 转实施计划 | 将 PRD 意图转化为实施就绪的能力计划，暴露约束、不变量、接口和未决决策 |
| `strategic-compact` | 长时间任务保护上下文 | 在逻辑间隔点建议手动压缩上下文，避免自动压缩打断任务流 |
| `verification-loop` | 代码变更后验证 | Claude Code 会话的综合验证系统 |

## B3. 内容创作与媒体（7 个）

| Skill | 触发场景 | 功能说明 |
|-------|----------|----------|
| `article-writing` | 写文章、指南、博客、教程 | 长文写作，保持风格一致性和结构清晰。支持从示例或品牌指南中提取写作风格 |
| `brand-voice` | 统一写作风格 | 从真实文章/博客/文档中提取风格特征文件，跨内容/外联/社交工作流复用 |
| `content-engine` | 社交媒体内容创作 | 平台原生内容系统：X、LinkedIn、TikTok、YouTube、Newsletter，支持一对多改编 |
| `crosspost` | 多平台分发 | 跨 X、LinkedIn、Threads、Bluesky 分发，每平台独立适配，不为所有平台发布相同内容 |
| `deep-research` | 深度调研 | 使用 firecrawl + exa MCP 多源搜索，合成带引用的研究报告 |
| `fal-ai-media` | AI 生成图片/视频/音频 | 统一媒体生成：文生图(Nano Banana)、文/图生视频(Seedance/Kling/Veo3)、文生语音(CSM-1B) |
| `video-editing` | 视频剪辑 | AI 辅助视频编辑全流程：FFmpeg → Remotion → ElevenLabs → fal.ai → Descript/CapCut 精修 |

## B4. 商业与市场（5 个）

| Skill | 触发场景 | 功能说明 |
|-------|----------|----------|
| `exa-search` | 网络搜索、代码示例、公司调研 | 通过 Exa MCP 进行神经搜索，支持网页、代码、公司和人物查询 |
| `investor-materials` | 制作融资材料 | Pitch Deck、一页纸、投资人备忘录、财务模型、加速器申请 |
| `investor-outreach` | 投资人沟通 | 冷邮件、暖场介绍、跟进邮件、投资人更新通讯 |
| `market-research` | 市场调研、竞品分析 | 市场规模、竞争对手对比、基金调研、技术扫描，附带来源引用和决策导向摘要 |
| `x-api` | X/Twitter 编程操作 | X API 集成：发推、线程序列、时间线读取、搜索、分析，含 OAuth 和限流处理 |

---

# Part C: ECC Agents（全局级 · 48 个）

可被调用的专业子 Agent，每个专注于特定领域任务。通过 Agent 工具启动，支持并行执行。

## C1. 通用开发（16 个）

| Agent | 模型 | 用途 |
|-------|------|------|
| `planner` | Opus | 复杂功能和重构的专家规划，自动激活 |
| `architect` | Opus | 软件架构、系统设计、技术决策 |
| `code-architect` | Sonnet | 分析现有代码库模式，输出实现蓝图（文件、接口、数据流、构建顺序） |
| `code-explorer` | Sonnet | 深度分析现有功能：追踪执行路径、映射架构层、记录依赖关系 |
| `code-reviewer` | Sonnet | 代码审查：质量、安全、可维护性。所有代码变更必须使用 |
| `code-simplifier` | Sonnet | 简化和精炼代码，保持行为不变 |
| `build-error-resolver` | Sonnet | 构建和 TypeScript 错误修复，最小 diff，专注让构建变绿 |
| `tdd-guide` | Sonnet | TDD 专家，强制先写测试，确保 80%+ 覆盖率 |
| `refactor-cleaner` | Sonnet | 死代码清理：knip、depcheck、ts-prune 分析后安全移除 |
| `doc-updater` | Haiku | 文档和 codemap 更新（运行 /update-codemaps、/update-docs） |
| `performance-optimizer` | Sonnet | 性能分析与优化：瓶颈识别、包体积、内存泄漏、渲染优化 |
| `comment-analyzer` | Sonnet | 分析代码注释的准确性、完整性和腐烂风险 |
| `silent-failure-hunter` | Sonnet | 审查静默失败、被吞掉的错误、不良回退、缺失的错误传播 |
| `type-design-analyzer` | Sonnet | 分析类型设计的封装性、不变量表达、实用性和强制执行 |
| `harness-optimizer` | Sonnet | 分析和改进 Agent 基础设施配置的可靠性、成本和吞吐量 |
| `loop-operator` | Sonnet | 运行自主 Agent 循环、监控进度、安全干预停滞的循环 |

## C2. 安全与质量（3 个）

| Agent | 模型 | 用途 |
|-------|------|------|
| `security-reviewer` | Sonnet | 安全漏洞检测：密钥、SSRF、注入、不安全加密、OWASP Top 10 |
| `pr-test-analyzer` | Sonnet | PR 测试覆盖质量审查，强调行为覆盖和真实 Bug 预防 |
| `conversation-analyzer` | Sonnet | 分析对话记录，找到值得用 hooks 预防的行为（/hookify 触发） |

## C3. 语言特定审查（10 个）

| Agent | 模型 | 用途 |
|-------|------|------|
| `typescript-reviewer` | Sonnet | TS/JS 审查：类型安全、异步正确性、Node/web 安全、惯用模式 |
| `python-reviewer` | Sonnet | Python 审查：PEP 8、Pythonic 惯用法、类型提示、安全、性能 |
| `go-reviewer` | Sonnet | Go 审查：惯用 Go、并发模式、错误处理、性能 |
| `rust-reviewer` | Sonnet | Rust 审查：所有权、生命周期、错误处理、unsafe、惯用模式 |
| `cpp-reviewer` | Sonnet | C++ 审查：内存安全、现代 C++、并发、性能 |
| `csharp-reviewer` | Sonnet | C# 审查：.NET 约定、async 模式、安全、可空引用类型 |
| `java-reviewer` | Sonnet | Java/Spring Boot 审查：分层架构、JPA 模式、安全、并发 |
| `kotlin-reviewer` | Sonnet | Kotlin/Android 审查：惯用模式、协程安全、Compose 最佳实践 |
| `flutter-reviewer` | Sonnet | Flutter/Dart 审查：Widget 最佳实践、状态管理、无障碍、性能 |
| `database-reviewer` | Sonnet | PostgreSQL/Supabase：查询优化、Schema 设计、安全、性能 |

## C4. 语言特定构建修复（7 个）

| Agent | 模型 | 用途 |
|-------|------|------|
| `cpp-build-resolver` | Sonnet | C++/CMake 构建、链接器、模板错误修复 |
| `go-build-resolver` | Sonnet | Go 构建、go vet、linter 警告修复 |
| `rust-build-resolver` | Sonnet | Rust cargo build、borrow checker、Cargo.toml 问题修复 |
| `java-build-resolver` | Sonnet | Java/Maven/Gradle 构建、编译、依赖错误修复 |
| `kotlin-build-resolver` | Sonnet | Kotlin/Gradle 构建、编译器错误修复 |
| `dart-build-resolver` | Sonnet | Dart/Flutter 分析、编译、pub 依赖冲突修复 |
| `pytorch-build-resolver` | Sonnet | PyTorch/CUDA：张量形状、设备错误、梯度、DataLoader、混合精度 |

## C5. 专业领域（12 个）

| Agent | 模型 | 用途 |
|-------|------|------|
| `a11y-architect` | Sonnet | WCAG 2.2 无障碍架构师：UI 组件设计、设计系统、包容性审计 |
| `seo-specialist` | Sonnet | SEO 专家：技术审计、结构化数据、Core Web Vitals、内容映射 |
| `healthcare-reviewer` | Opus | 医疗应用审查：临床安全、CDSS 准确性、PHI 合规、医疗数据完整性 |
| `chief-of-staff` | Opus | 个人通讯参谋长：邮件/Slack/LINE 分流、生成回复草稿 |
| `e2e-runner` | Sonnet | E2E 测试专家：Playwright、测试旅程管理、flaky 测试隔离 |
| `docs-lookup` | Sonnet | 通过 Context7 MCP 获取最新框架/库文档和代码示例 |
| `opensource-forker` | Sonnet | 开源 fork 第一阶段：复制文件、剥离密钥(20+模式)、清理 git 历史 |
| `opensource-sanitizer` | Sonnet | 开源 fork 第二阶段：扫描泄露密钥/PII，生成 PASS/FAIL 报告 |
| `opensource-packager` | Sonnet | 开源 fork 第三阶段：生成 CLAUDE.md/setup.sh/README/LICENSE 等 |
| `gan-planner` | Opus | GAN 套件：将一句话 prompt 扩展为完整产品规格 |
| `gan-generator` | Opus | GAN 套件：按规格实现功能，根据评估反馈迭代 |
| `gan-evaluator` | Opus | GAN 套件：通过 Playwright 测试应用，按评分标准打分 |

---

# Part D: ECC Commands（全局级 · 78 个）

显式 `/` 斜杠命令。注意：标记为 "Legacy shim" 的命令正在被同名 Skill 取代，建议直接使用 Skill。

## D1. 开发流程（11 个）

| Command | 用途 |
|---------|------|
| `/feature-dev` | 引导式功能开发：理解代码库 + 架构焦点 |
| `/plan` | 复述需求、评估风险、创建分步实施计划（等待用户确认后才动代码） |
| `/code-review` | 代码审查：本地未提交变更或 GitHub PR |
| `/review-pr` | 使用多个专业 Agent 进行综合 PR 审查 |
| `/build-fix` | 增量修复构建和类型错误，最小安全变更 |
| `/tdd` | Legacy shim → 建议直接用 `tdd-workflow` skill |
| `/refactor-clean` | 安全识别并移除死代码，每步有测试验证 |
| `/test-coverage` | 分析测试覆盖、识别缺口、生成测试达到 80%+ |
| `/verify` | Legacy shim → 建议直接用 `verification-loop` skill |
| `/checkpoint` | 创建或验证工作流检查点 |
| `/quality-gate` | 按需对文件或项目范围运行 ECC 质量流水线 |

## D2. PRP 流程（5 个）

PRP = Plan → PRD → Implement → PR → Commit，一套端到端功能交付流水线。

| Command | 用途 |
|---------|------|
| `/prp-plan` | 创建综合功能实施计划（含代码库分析和模式提取） |
| `/prp-prd` | 交互式 PRD 生成器：问题优先、假设驱动的产品规格 |
| `/prp-implement` | 执行实施计划，含严格验证循环 |
| `/prp-pr` | 从当前分支创建 GitHub PR（自动发现模板、分析变更、推送） |
| `/prp-commit` | 自然语言快速提交：用普通话描述要提交的内容 |

## D3. 语言特定命令（17 个）

| Command | 用途 |
|---------|------|
| `/cpp-build` | 修复 C++/CMake/链接器错误 → 调用 cpp-build-resolver |
| `/cpp-review` | C++ 综合审查：内存安全、现代 C++、并发、安全 → cpp-reviewer |
| `/cpp-test` | C++ TDD：先写 GoogleTest → 实现 → gcov/lcov 验证覆盖 |
| `/go-build` | 修复 Go build/vet/linter 错误 → go-build-resolver |
| `/go-review` | Go 综合审查：惯用模式、并发安全、错误处理 → go-reviewer |
| `/go-test` | Go TDD：先写 table-driven 测试 → 实现 → 80%+ 覆盖 |
| `/rust-build` | 修复 Rust cargo/borrow checker/依赖错误 → rust-build-resolver |
| `/rust-review` | Rust 综合审查：所有权、生命周期、unsafe → rust-reviewer |
| `/rust-test` | Rust TDD：先写测试 → cargo-llvm-cov 验证 80%+ |
| `/python-review` | Python 综合审查：PEP 8、类型提示、安全 → python-reviewer |
| `/flutter-build` | 修复 Flutter/Dart 分析和构建错误 → dart-build-resolver |
| `/flutter-review` | Flutter/Dart 审查：Widget、状态管理、无障碍 → flutter-reviewer |
| `/flutter-test` | Flutter/Dart 测试：单元/Widget/Golden/集成测试 |
| `/kotlin-build` | 修复 Kotlin/Gradle 构建和编译器错误 → kotlin-build-resolver |
| `/kotlin-review` | Kotlin 审查：惯用模式、空安全、协程 → kotlin-reviewer |
| `/kotlin-test` | Kotlin TDD：先写 Kotest → Kover 验证 80%+ |
| `/gradle-build` | 修复 Android/KMP 项目的 Gradle 构建错误 |

## D4. 多模型协作（6 个）

| Command | 用途 |
|---------|------|
| `/multi-plan` | 多模型协作规划：上下文检索 + 双模型分析 → 分步实施计划 |
| `/multi-execute` | 多模型协作执行：从计划取原型 → Claude 重构实现 → 多模型审计交付 |
| `/multi-frontend` | 前端工作流（Gemini 主导）：Research → Ideation → Plan → Execute → Optimize → Review |
| `/multi-backend` | 后端工作流（Codex 主导）：Research → Ideation → Plan → Execute → Optimize → Review |
| `/multi-workflow` | 多模型协作开发：智能路由（前端→Gemini, 后端→Codex），含质量门 |
| `/orchestrate` | Legacy shim → 建议直接用 `dmux-workflows` skill |

## D5. 会话管理（6 个）

| Command | 用途 |
|---------|------|
| `/save-session` | 保存当前会话状态到 `~/.claude/session-data/`，支持后续恢复 |
| `/resume-session` | 加载最近会话文件，恢复完整上下文继续工作 |
| `/sessions` | 管理会话历史、别名和元数据 |
| `/model-route` | 根据任务复杂度和预算推荐最佳模型层级 |
| `/context-budget` | Legacy shim → 建议直接用 `context-budget` skill |
| `/aside` | 回答快速偏题问题，不中断主任务上下文，自动恢复 |

## D6. Hook 系统（4 个）

| Command | 用途 |
|---------|------|
| `/hookify` | 从对话分析或显式指令创建 hooks，预防不期望的行为 |
| `/hookify-configure` | 交互式启用/禁用 hookify 规则 |
| `/hookify-list` | 列出所有已配置的 hookify 规则 |
| `/hookify-help` | 获取 hookify 系统帮助 |

## D7. 学习与进化（12 个）

| Command | 用途 |
|---------|------|
| `/learn` | 从当前会话提取可复用模式，保存为 skill |
| `/learn-eval` | 提取模式 + 自评估质量 + 决定保存位置（全局/项目） |
| `/evolve` | 分析 instincts 并建议或生成进化结构 |
| `/instinct-export` | 从项目/全局 scope 导出 instincts 到文件 |
| `/instinct-import` | 从文件或 URL 导入 instincts 到项目/全局 scope |
| `/instinct-status` | 显示已学习的 instincts（项目 + 全局）及置信度 |
| `/promote` | 将项目级 instincts 提升为全局 |
| `/prune` | 删除超过 30 天未提升的待处理 instincts |
| `/projects` | 列出已知项目及其 instinct 统计 |
| `/skill-create` | 分析本地 git 历史提取编码模式 → 生成 SKILL.md（Skill Creator 本地版） |
| `/skill-health` | 显示 skill 组合健康仪表盘（图表和分析） |
| `/rules-distill` | Legacy shim → 建议直接用 `rules-distill` skill |

## D8. 项目管理与运维（10 个）

| Command | 用途 |
|---------|------|
| `/agent-sort` | Legacy shim → 建议直接用 `agent-sort` skill |
| `/setup-pm` | 配置首选包管理器（npm/pnpm/yarn/bun） |
| `/pm2` | 自动分析项目并生成 PM2 服务命令 |
| `/jira` | 获取/分析/更新 Jira 工单，使用 MCP 或 REST API |
| `/docs` | Legacy shim → 建议直接用 `documentation-lookup` skill |
| `/e2e` | Legacy shim → 建议直接用 `e2e-testing` skill |
| `/eval` | Legacy shim → 建议直接用 `eval-harness` skill |
| `/update-codemaps` | 分析代码库结构 → 生成 token 精简的架构文档 |
| `/update-docs` | 从真实来源文件同步文档到代码库 |
| `/prompt-optimize` | Legacy shim → 建议直接用 `prompt-optimizer` skill |

## D9. 自主循环与质量（7 个）

| Command | 用途 |
|---------|------|
| `/gan-build` | GAN 构建循环：Generator ↔ Evaluator 迭代直到质量达标（默认 15 轮） |
| `/gan-design` | GAN 设计循环：Design ↔ Evaluate 迭代直到设计达标（默认 10 轮） |
| `/santa-loop` | 对抗双审查收敛循环：两个独立模型审查者都必须批准代码才能发布 |
| `/loop-start` | 启动受管理的自主循环模式，含安全默认值 |
| `/loop-status` | 检查活跃循环的状态、进度和失败信号 |
| `/claw` | Legacy shim → 建议直接用 `nanoclaw-repl` skill |
| `/devfleet` | Legacy shim → 建议直接用 `claude-devfleet` skill |

---

# 快速索引：我该用哪个？

## Matt Pocock Skills

| 我想做的事 | 用这个 |
|------------|--------|
| 写代码前验证设计方案靠不靠谱 | `grill-with-docs` |
| 让 AI 反过来问我问题，帮我理清思路 | `grill-me` |
| 看不懂某段代码，需要理解它在全局的位置 | `zoom-out` |
| 想快速搭个原型试试手感 | `prototype` |
| 用 TDD 方式写功能/修 Bug | `tdd` |
| 遇到难搞的 Bug，需要系统性地排查 | `diagnose` |
| 感觉代码结构越来越乱，想找重构方向 | `improve-codebase-architecture` |
| 想省 token，让回复更简短 | `caveman` |
| 管理 GitHub Issue 的流转状态 | `triage` |
| 把一个大计划拆成可以执行的小任务 | `to-issues` |
| 把当前讨论的内容整理成正式 PRD | `to-prd` |
| 把当前进度打包交给别人继续做 | `handoff` |
| 创建一个新的 Agent Skill | `write-a-skill` |
| 新项目首次配置 Skills 环境 | `setup-matt-pocock-skills` |

## ECC Skills

| 我想做的事 | 用这个 |
|------------|--------|
| 设计一套规范的 REST API | `api-design` |
| 搭建后端架构 / 优化数据库查询 | `backend-patterns` |
| 确认 Bun vs Node.js 选型 | `bun-runtime` |
| 用 Claude API 构建 AI 应用 | `claude-api` |
| 统一代码风格和命名规范 | `coding-standards` |
| 查最新框架文档（替代训练数据） | `documentation-lookup` |
| 写 Playwright E2E 测试 | `e2e-testing` |
| 打造高设计质量的前端页面 | `frontend-design` |
| 优化 React 组件/状态/性能 | `frontend-patterns` |
| 做演示文稿 / 转换 PPT 到 Web | `frontend-slides` |
| 构建 MCP 服务器 | `mcp-server-patterns` |
| 处理 Next.js 16 + Turbopack 问题 | `nextjs-turbopack` |
| 安全审查（认证/支付/敏感数据） | `security-review` |
| TDD 开发（80%+ 覆盖率要求） | `tdd-workflow` |
| Agent 执行出问题了，需要自检修复 | `agent-introspection-debugging` |
| 精简 ECC，只保留和项目相关的部分 | `agent-sort` |
| 并行跑多个 Agent 会话 | `dmux-workflows` |
| PRD 转成可实施的技术方案 | `product-capability` |
| 长任务中保护上下文不被过早压缩 | `strategic-compact` |
| 代码改完了需要验证 | `verification-loop` |
| 写文章/博客/教程 | `article-writing` |
| 从已有内容提取并统一写作风格 | `brand-voice` |
| 做社交媒体内容（X/LinkedIn/TikTok） | `content-engine` |
| 一条内容适配多平台分发 | `crosspost` |
| 需要深入调研某个主题（带引用） | `deep-research` |
| AI 生成图片/视频/音频 | `fal-ai-media` |
| 剪辑视频（vlog/课程/宣传片） | `video-editing` |
| 网络搜索 / 找代码示例 | `exa-search` |
| 制作 Pitch Deck / 融资材料 | `investor-materials` |
| 写投资人邮件 / 融资外联 | `investor-outreach` |
| 做市场调研 / 竞品分析 | `market-research` |
| 编程操作 X/Twitter（发推/读时间线） | `x-api` |

## ECC Agents

| 我想做的事 | 用这个 Agent |
|------------|-------------|
| 制定复杂功能的实施计划 | `planner` |
| 做架构决策 / 系统设计 | `architect` |
| 代码审查（每次写完代码必用） | `code-reviewer` |
| 修复构建和类型错误 | `build-error-resolver` |
| TDD 开发（先写测试） | `tdd-guide` |
| 清理死代码 | `refactor-cleaner` |
| 安全漏洞检测 | `security-reviewer` |
| 性能分析与优化 | `performance-optimizer` |
| 分析代码注释质量 | `comment-analyzer` |
| 追踪代码执行路径和理解架构 | `code-explorer` |
| TypeScript/JavaScript 审查 | `typescript-reviewer` |
| Python 审查 | `python-reviewer` |
| Go 审查 | `go-reviewer` |
| Rust 审查 | `rust-reviewer` |
| C++ 审查 | `cpp-reviewer` |
| C# 审查 | `csharp-reviewer` |
| Java/Spring Boot 审查 | `java-reviewer` |
| Kotlin/Android 审查 | `kotlin-reviewer` |
| Flutter/Dart 审查 | `flutter-reviewer` |
| 数据库 Schema/查询审查 | `database-reviewer` |
| E2E 测试 | `e2e-runner` |
| WCAG 2.2 无障碍审计 | `a11y-architect` |
| SEO 审计和优化 | `seo-specialist` |
| 医疗应用代码审查 | `healthcare-reviewer` |
| 开源 fork 前清洗项目 | `opensource-sanitizer` |

## ECC Commands

| 我想做的事 | 用这个 Command |
|------------|---------------|
| 引导式功能开发 | `/feature-dev` |
| 创建实施计划（等你确认） | `/plan` |
| 代码审查（PR 或本地） | `/code-review` |
| 完整 PR 审查 | `/review-pr` |
| 修复构建错误 | `/build-fix` |
| 移除死代码 | `/refactor-clean` |
| 查测试覆盖并补测试 | `/test-coverage` |
| 端到端需求→代码→PR→提交 | `/prp-plan` → `/prp-prd` → `/prp-implement` → `/prp-pr` → `/prp-commit` |
| C++/Go/Rust/Flutter/Kotlin 构建修复 | `/{lang}-build` |
| C++/Go/Rust/Python/Flutter/Kotlin 代码审查 | `/{lang}-review` |
| C++/Go/Rust/Kotlin TDD | `/{lang}-test` |
| 多模型协作规划 | `/multi-plan` |
| 前端/后端专项工作流 | `/multi-frontend` / `/multi-backend` |
| 保存当前会话供后续恢复 | `/save-session` |
| 恢复之前的会话 | `/resume-session` |
| 创建自定义 Hook 预防坏行为 | `/hookify` |
| 从对话提取可复用模式 | `/learn` |
| Git 历史 → 生成 SKILL.md | `/skill-create` |
| Jira 工单操作 | `/jira` |
| 生成代码库架构文档 | `/update-codemaps` |
| GAN 质量循环 | `/gan-build` / `/gan-design` |
| 双审查对抗循环（高标准发布） | `/santa-loop` |
| 配置包管理器 | `/setup-pm` |

---

> **最后更新**: 2026-05-28
> **项目级 — Matt Pocock Skills**: 14
> **全局级 — ECC v1.10.0**: 34 Skills + 48 Agents + 78 Commands + 89 Rules + 30+ Hooks
> **Catalog 收录合计**: 174（Skills 48 + Agents 48 + Commands 78）

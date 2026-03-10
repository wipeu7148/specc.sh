# specc.sh

> **Spec Coding 远胜 Vibe Coding。**
> 给 Claude Code / Copilot / Cursor / Codex 一套规范——让它每次都写出生产级代码。

[English](./README.md) · [Demo](https://specc.sh) · [GitHub](https://github.com/luckyyyyy/specc.sh)

---

## 一行命令快速上手

```bash
curl -fsSL https://specc.sh/install.sh | bash
```

或手动 Clone：

```bash
git clone https://github.com/luckyyyyy/specc.sh.git
cd specc.sh
make init
```

---

## 这是什么？

**Vibe Coding** 让 AI 随意发挥，结果一团乱麻。
**Spec Coding** 给 AI 规范和约束——这个模板就是那个规范。

specc.sh 是一套为 AI 辅助开发而生的生产级 TypeScript Monorepo 模板。将任意 AI 工具指向 `.github/copilot-instructions.md` 和自定义指令，它就会生成能编译、通过 Lint、直接上生产的代码——无需手动审查类型或样式。

**技术栈：**
- `packages/server` — Hono + tRPC + Prisma ORM + PostgreSQL 18
- `packages/web` — React 19 + Vite 7 + TailwindCSS 4 + TanStack Query v5
- `packages/types` — 共享 Zod v4 Schema + TypeScript 类型
- `packages/components` — 可复用 UI 设计系统
- `packages/i18n` — 国际化资源（开箱即用中英双语）

---

## 环境要求

| 工具 | 版本 | 备注 |
|------|------|------|
| [Docker](https://docs.docker.com/get-docker/) | 24+ | 运行 PostgreSQL + MinIO 容器 |
| [Node.js](https://nodejs.org/) | 20+ | 推荐 LTS 版本 |
| [pnpm](https://pnpm.io/installation) | 10+ | `npm install -g pnpm` |

### Windows（WSL2）

Windows 用户**必须在 WSL2 内运行**，不支持原生 CMD/PowerShell。

1. 安装 WSL2：以管理员身份打开 PowerShell，执行：
   ```powershell
   wsl --install
   ```
2. 安装 [Docker Desktop for Windows](https://docs.docker.com/desktop/install/windows-install/)，在设置中开启 **"Use the WSL 2 based engine"**。
3. 打开 WSL2 终端（推荐 Ubuntu），按照下方 **Linux** 步骤操作。

### macOS

```bash
# 安装 Homebrew（如果没有）
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 安装 Node.js 和 pnpm
brew install node
npm install -g pnpm

# 安装 Docker Desktop
# 下载地址：https://docs.docker.com/desktop/install/mac-install/
```

### Linux

```bash
# Ubuntu / Debian
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
npm install -g pnpm

# 安装 Docker
# 参考：https://docs.docker.com/engine/install/ubuntu/
```

---

## 快速开始

```bash
# 1. 克隆仓库
git clone https://github.com/luckyyyyy/specc.sh.git
cd specc.sh

# 2. 初始化项目（安装依赖、启动 Docker 服务、同步数据库 Schema）
make init

# 3. 启动开发服务器
make dev
```

`make dev` 启动后：

| 服务 | 地址 |
|------|------|
| Web（React） | http://localhost:5173 |
| API（Hono） | http://localhost:4000 |
| MinIO 控制台 | http://localhost:9001 |

---

## 可用命令

| 命令 | 说明 |
|------|------|
| `make init` | 首次初始化：安装依赖、启动服务、同步数据库 Schema |
| `make dev` | 启动开发环境（数据库 + 开发服务器） |
| `make build` | 编译生产版本 |
| `make docker` | 构建所有 Docker 镜像 |
| `make prod` | 构建镜像并启动完整生产栈 |
| `make lint` | Biome lint 检查 |
| `make tsc` | TypeScript 类型检查（所有包） |

### 数据库命令

```bash
pnpm --filter @specc/server db:push      # 同步 Schema 到数据库（开发用，无迁移文件）
pnpm --filter @specc/server db:migrate   # 创建迁移文件并应用（生产用）
pnpm --filter @specc/server db:generate  # Schema 变更后重新生成 Prisma Client
```

---

## 项目结构

```
specc.sh/
├── packages/
│   ├── server/        # Hono + tRPC + Prisma（后端）
│   ├── web/           # React 19 + Vite 7（前端）
│   ├── types/         # Zod v4 Schema（共享）
│   ├── components/    # UI 设计系统
│   └── i18n/          # 国际化资源
├── docker-compose.yml
├── Makefile
└── .github/
    └── copilot-instructions.md   # ← AI 读取的规范文件
```

---

## 核心特性

- **端到端类型安全** — tRPC + Zod v4 全链路推导，编译器即时捕获 AI 的每一处错误。
- **兼容一切 AI 工具** — Claude Code、Copilot、Cursor、Codex、Gemini CLI、GLM、Qwen，规范在模板里，不在工具里。
- **多租户开箱即用** — 工作区隔离 + Session 认证 + 邀请机制 + 角色权限，企业级需求即装即用。
- **i18n 国际化开箱即用** — React i18next 预配置中英双语，新增语言包无需修改任何组件。
- **多主题开箱即用** — 亮色 / 暗色 / 跟随系统，CSS 变量驱动。
- **Biome Lint** — Rust 极速 lint 取代 ESLint + Prettier，`make lint` 永远通过。
- **模块完全解耦** — 路由、认证、存储、UI 均可独立替换，改一处不坏其余。
- **S3 兼容存储** — 本地用 MinIO，通过环境变量一键切换至 AWS S3 或阿里云 OSS。

---

## AI 辅助开发流程

1. **用自然语言描述需求**，告诉你的 AI 工具你想要什么。
2. **AI 生成规范化代码** — Schema、tRPC Router、React 组件，全部遵循 `.github/copilot-instructions.md` 中的模板约定。
3. **执行 `make lint && make tsc`** — 不符合规范的输出立即报错，无需人工审查。
4. **直接上线。** 类型安全、零运行时错误、Lint 通过——代码质量与手工打磨无异，但你一行都没写。

---

## 环境变量

复制示例文件并按需修改：

```bash
cp .env.example .env
cp packages/server/.env.example packages/server/.env
cp packages/web/.env.example packages/web/.env
```

主要变量：

| 变量 | 文件位置 | 说明 |
|------|----------|------|
| `DATABASE_URL` | `packages/server/.env` | PostgreSQL 连接字符串 |
| `STORAGE_ENDPOINT` | `packages/server/.env` | S3/MinIO 端点 |
| `VITE_TRPC_URL` | `packages/web/.env` | tRPC API 端点（前端） |
| `VITE_STORAGE_PUBLIC_URL` | `packages/web/.env` | 存储文件公开访问 URL 前缀 |

---

## 技术栈

| 层级 | 技术 |
|------|------|
| 后端框架 | [Hono](https://hono.dev/) |
| API 层 | [tRPC v11](https://trpc.io/) |
| ORM | [Prisma](https://www.prisma.io/) |
| 数据库 | PostgreSQL 18 |
| 前端框架 | React 19 |
| 构建工具 | Vite 7 |
| 样式方案 | TailwindCSS 4 |
| 数据获取 | TanStack Query v5 |
| Schema 校验 | Zod v4 |
| Lint 工具 | Biome |
| 包管理器 | pnpm（Workspaces） |
| 对象存储 | MinIO（S3 兼容） |
| 缓存 / 限流 | Redis 7 |

---

## License

MIT

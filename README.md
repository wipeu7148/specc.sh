# specc.sh

> **Spec Coding beats Vibe Coding.**
> A full-stack AI template that gives your Claude Code / Copilot / Cursor / Codex a spec to follow — so it produces production-grade code every time.

[中文文档](./README.zh.md) · [Demo](https://specc.sh) · [GitHub](https://github.com/luckyyyyy/specc.sh)

---

## One-Line Setup

```bash
curl -fsSL https://specc.sh/install.sh | bash
```

Or clone manually:

```bash
git clone https://github.com/luckyyyyy/specc.sh.git
cd specc.sh
make init
```

---

## What Is specc.sh?

**Vibe Coding** lets AI freestyle — the result is a mess.
**Spec Coding** gives AI rules and constraints — this template _is_ the spec.

specc.sh is a production-ready TypeScript monorepo template designed for AI-assisted development. Point any AI tool at the `.github/copilot-instructions.md` and the custom instructions, and it will generate code that compiles, passes lint, and ships to production — without a single manual review of types or style.

**Built on:**
- `packages/server` — Hono + tRPC + Prisma ORM + PostgreSQL 18
- `packages/web` — React 19 + Vite 7 + TailwindCSS 4 + TanStack Query v5
- `packages/types` — Shared Zod v4 schemas + TypeScript types
- `packages/components` — Reusable UI design system
- `packages/i18n` — i18n locale resources (EN + ZH out of the box)

---

## Prerequisites

| Tool | Version | Notes |
|------|---------|-------|
| [Docker](https://docs.docker.com/get-docker/) | 24+ | Required for PostgreSQL + MinIO |
| [Node.js](https://nodejs.org/) | 20+ | LTS recommended |
| [pnpm](https://pnpm.io/installation) | 10+ | `npm install -g pnpm` |

### Windows (WSL2)

Windows users **must** run inside WSL2. Native Windows (CMD/PowerShell) is not supported.

1. Install WSL2: open PowerShell as Administrator and run:
   ```powershell
   wsl --install
   ```
2. Install [Docker Desktop for Windows](https://docs.docker.com/desktop/install/windows-install/) and enable **"Use the WSL 2 based engine"** in settings.
3. Open your WSL2 terminal (Ubuntu recommended) and follow the **Linux** steps below.

### macOS

```bash
# Install Homebrew if needed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js and pnpm
brew install node
npm install -g pnpm

# Install Docker Desktop
# Download from https://docs.docker.com/desktop/install/mac-install/
```

### Linux

```bash
# Ubuntu / Debian
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
npm install -g pnpm

# Install Docker
# Follow https://docs.docker.com/engine/install/ubuntu/
```

---

## Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/luckyyyyy/specc.sh.git
cd specc.sh

# 2. Initialize the project (installs deps, starts Docker services, syncs DB schema)
make init

# 3. Start the development server
make dev
```

After `make dev`:

| Service | URL |
|---------|-----|
| Web (React) | http://localhost:5173 |
| API (Hono) | http://localhost:4000 |
| MinIO Console | http://localhost:9001 |

---

## Available Commands

| Command | Description |
|---------|-------------|
| `make init` | First-time setup: install deps, start services, sync DB schema |
| `make dev` | Start development environment (DB + dev servers) |
| `make build` | Build production bundles |
| `make docker` | Build all Docker images |
| `make prod` | Build images and start the full production stack |
| `make lint` | Biome lint check |
| `make tsc` | TypeScript type check across all packages |

### Database

```bash
pnpm --filter @specc/server db:push      # Sync schema to DB (dev, no migration files)
pnpm --filter @specc/server db:migrate   # Create + apply migration files (production)
pnpm --filter @specc/server db:generate  # Regenerate Prisma client after schema change
```

---

## Project Structure

```
specc.sh/
├── packages/
│   ├── server/        # Hono + tRPC + Prisma (backend)
│   ├── web/           # React 19 + Vite 7 (frontend)
│   ├── types/         # Zod v4 schemas (shared)
│   ├── components/    # UI design system
│   └── i18n/          # i18n locale resources
├── docker-compose.yml
├── Makefile
└── .github/
    └── copilot-instructions.md   # ← The spec AI reads
```

---

## Key Features

- **End-to-End Type Safety** — tRPC + Zod v4 full-chain inference. Compiler catches every AI mistake instantly.
- **Works with Any AI Tool** — Claude Code, Copilot, Cursor, Codex, Gemini CLI, GLM, Qwen. The spec lives in the template, not the tool.
- **Multi-Tenant Out of the Box** — Workspace isolation + session auth + invite system + role-based permissions.
- **i18n Out of the Box** — React i18next pre-configured with EN/ZH. Add new locales with zero component changes.
- **Multi-Theme Out of the Box** — Light / dark / system modes, CSS variable-driven.
- **Biome Linting** — Rust-powered lint replaces ESLint + Prettier. `make lint` always passes.
- **Zero-Coupling Modules** — Routing, auth, storage, and UI are all independently replaceable.
- **S3-Compatible Storage** — MinIO locally, swap to AWS S3 or Alibaba Cloud OSS via env vars.

---

## How AI Coding Works With This Template

1. **Describe what you want** in plain language to your AI tool.
2. **AI generates standardized code** — schema, tRPC router, React component — all following template conventions enforced by `.github/copilot-instructions.md`.
3. **Run `make lint && make tsc`** — any non-compliant output fails instantly. No manual review needed.
4. **Ship.** Type-safe, zero runtime errors, lint passes — code quality rivals handcrafted work.

---

## Environment Variables

Copy the example files and edit as needed:

```bash
cp .env.example .env
cp packages/server/.env.example packages/server/.env
cp packages/web/.env.example packages/web/.env
```

Key variables:

| Variable | Location | Description |
|----------|----------|-------------|
| `DATABASE_URL` | `packages/server/.env` | PostgreSQL connection string |
| `STORAGE_ENDPOINT` | `packages/server/.env` | S3/MinIO endpoint |
| `VITE_TRPC_URL` | `packages/web/.env` | tRPC API endpoint (frontend) |
| `VITE_STORAGE_PUBLIC_URL` | `packages/web/.env` | Public storage URL prefix |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend framework | [Hono](https://hono.dev/) |
| API layer | [tRPC v11](https://trpc.io/) |
| ORM | [Prisma](https://www.prisma.io/) |
| Database | PostgreSQL 18 |
| Frontend framework | React 19 |
| Build tool | Vite 7 |
| Styling | TailwindCSS 4 |
| Data fetching | TanStack Query v5 |
| Schema validation | Zod v4 |
| Linting | Biome |
| Package manager | pnpm (workspaces) |
| Object storage | MinIO (S3-compatible) |
| Cache / rate-limit | Redis 7 |

---

## License

MIT

#!/usr/bin/env bash
# specc.sh installer
# Usage: curl -fsSL https://specc.sh | bash

set -e

REPO_URL="https://github.com/luckyyyyy/specc.sh.git"
INSTALL_DIR="${SPECC_DIR:-specc.sh}"

# ── colors ────────────────────────────────────────────────────────────────────
if [ -t 1 ]; then
  GREEN="\033[0;32m"
  YELLOW="\033[0;33m"
  BLUE="\033[0;34m"
  RED="\033[0;31m"
  CYAN="\033[0;36m"
  BOLD="\033[1m"
  NC="\033[0m"
else
  GREEN="" YELLOW="" BLUE="" RED="" CYAN="" BOLD="" NC=""
fi

info()    { printf "${BLUE}  → %s${NC}\n" "$*"; }
success() { printf "${GREEN}  ✓ %s${NC}\n" "$*"; }
warn()    { printf "${YELLOW}  ⚠ %s${NC}\n" "$*"; }
error()   { printf "${RED}  ✗ %s${NC}\n" "$*" >&2; exit 1; }
step()    { printf "\n${BOLD}${BLUE}── %s${NC}\n\n" "$*"; }

# ── detect OS ────────────────────────────────────────────────────────────────
detect_os() {
  case "$OSTYPE" in
    linux*)
      [ -f /etc/debian_version ] && echo "debian" && return
      [ -f /etc/redhat-release ] && echo "rhel"   && return
      echo "linux" ;;
    darwin*) echo "macos" ;;
    *)       echo "unknown" ;;
  esac
}
OS=$(detect_os)

# ── WSL2 detection ───────────────────────────────────────────────────────────
IS_WSL2=false
if [ -f /proc/version ] && grep -qi "microsoft\|wsl" /proc/version 2>/dev/null; then
  IS_WSL2=true
fi

# ── banner ────────────────────────────────────────────────────────────────────
printf "\n"
printf "${BLUE}╔══════════════════════════════════════╗${NC}\n"
printf "${BLUE}║${NC}  ${GREEN}specc.sh${NC} — AI Full-Stack Template  ${BLUE}║${NC}\n"
printf "${BLUE}╚══════════════════════════════════════╝${NC}\n\n"

# ── language selection ────────────────────────────────────────────────────────
LANG_MODE="en"
# Auto-detect from system locale
if echo "${LANG:-} ${LC_ALL:-} ${LC_MESSAGES:-}" | grep -qi "zh"; then
  LANG_MODE="zh"
fi

# Read from /dev/tty so this works even when piped via curl | bash
if [ -e /dev/tty ]; then
  printf "  Select language / 选择语言:\n"
  printf "    ${GREEN}[1]${NC} English\n"
  printf "    ${BLUE}[2]${NC} 中文\n"
  if [ "$LANG_MODE" = "zh" ]; then
    printf "  请选择 / Your choice [1/2] (默认 / default: 2): "
  else
    printf "  请选择 / Your choice [1/2] (默认 / default: 1): "
  fi
  read -r _lang_input </dev/tty || true
  case "$_lang_input" in
    1) LANG_MODE="en" ;;
    2) LANG_MODE="zh" ;;
    "") ;;   # keep auto-detected default
    *)  LANG_MODE="en" ;;
  esac
fi

printf "\n"
if [ "$LANG_MODE" = "zh" ]; then
  success "已选择中文模式"
  info "代码将从 GitHub 克隆（速度慢可配置代理：export https_proxy=http://your-proxy:port）"
  info "pnpm 将使用淘宝镜像 (registry.npmmirror.com)"
else
  success "English mode selected"
fi

# ── install instructions ──────────────────────────────────────────────────────
show_install_instructions() {
  local cmd="$1"

  if [ "$LANG_MODE" = "zh" ]; then
    printf "\n${RED}  ✗ 未找到命令 ${BOLD}%s${NC}${RED}，请先安装后重新运行此脚本。${NC}\n\n" "$cmd"
    case "$cmd" in
      git)
        printf "  ${YELLOW}▸ 安装 git：${NC}\n"
        case "$OS" in
          debian)
            printf "      ${CYAN}sudo apt-get update && sudo apt-get install -y git${NC}\n" ;;
          rhel)
            printf "      ${CYAN}sudo yum install -y git${NC}\n" ;;
          macos)
            printf "      Xcode 命令行工具： ${CYAN}xcode-select --install${NC}\n"
            printf "      或 Homebrew：      ${CYAN}brew install git${NC}\n" ;;
          *)
            printf "      Ubuntu/Debian:  ${CYAN}sudo apt-get update && sudo apt-get install -y git${NC}\n"
            printf "      CentOS/RHEL:    ${CYAN}sudo yum install -y git${NC}\n"
            printf "      macOS:          ${CYAN}xcode-select --install${NC}\n" ;;
        esac
        ;;
      docker)
        printf "  ${YELLOW}▸ 安装 Docker：${NC}\n"
        if $IS_WSL2; then
          printf "\n  ${CYAN}检测到 WSL2 环境，推荐使用 Docker Desktop for Windows：${NC}\n\n"
          printf "      1. 在 Windows 宿主机下载并安装 Docker Desktop：\n"
          printf "         ${CYAN}https://www.docker.com/products/docker-desktop/${NC}\n\n"
          printf "      2. 安装后打开 Settings → Resources → WSL Integration\n"
          printf "         → 勾选当前 WSL2 发行版（如 Ubuntu），保存并重启 Docker Desktop\n\n"
          printf "      3. 重新打开 WSL2 终端，运行 ${CYAN}docker info${NC} 验证是否生效\n\n"
          printf "  ${YELLOW}▸ 也可直接在 WSL2 内安装 Docker Engine（systemd 支持有限，不推荐）：${NC}\n"
          printf "        ${CYAN}curl -fsSL https://get.docker.com | sh${NC}\n"
          printf "        ${CYAN}sudo service docker start${NC}\n"
          printf "        ${CYAN}sudo usermod -aG docker \$USER && newgrp docker${NC}\n"
        else
          case "$OS" in
            debian|rhel|linux)
              printf "      方法一（阿里云镜像脚本，推荐国内）：\n"
              printf "        ${CYAN}curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun${NC}\n\n"
              printf "      方法二（官方脚本）：\n"
              printf "        ${CYAN}curl -fsSL https://get.docker.com | sh${NC}\n\n"
              printf "      安装完成后，启用并启动服务：\n"
              printf "        ${CYAN}sudo systemctl enable --now docker${NC}\n\n"
              printf "      将当前用户加入 docker 组（之后无需 sudo）：\n"
              printf "        ${CYAN}sudo usermod -aG docker \$USER && newgrp docker${NC}\n" ;;
            macos)
              printf "      下载 Docker Desktop：\n"
              printf "        ${CYAN}https://docs.docker.com/desktop/install/mac-install/${NC}\n"
              printf "      或使用 Homebrew：\n"
              printf "        ${CYAN}brew install --cask docker${NC}\n" ;;
          esac
        fi
        printf "\n  ${YELLOW}▸ 配置 Docker 国内加速镜像（可选，加速 Hub 拉取）：${NC}\n"
        printf "      编辑 /etc/docker/daemon.json（Linux）或 Docker Desktop → Settings → Docker Engine：\n"
        printf "        ${CYAN}{\n          \"registry-mirrors\": [\n            \"https://docker.mirrors.ustc.edu.cn\",\n            \"https://hub-mirror.c.163.com\"\n          ]\n        }${NC}\n"
        printf "      注意：国内镜像可用性可能变化，请自行确认当前是否有效。\n"
        ;;
      node)
        printf "  ${YELLOW}▸ 安装 Node.js 22 LTS：${NC}\n\n"
        printf "      方法一：nvm（推荐，支持多版本管理）：\n"
        printf "        ${CYAN}# 设置淘宝 Node 镜像${NC}\n"
        printf "        ${CYAN}export NVM_NODEJS_ORG_MIRROR=https://npmmirror.com/mirrors/node${NC}\n"
        printf "        ${CYAN}# 安装 nvm${NC}\n"
        printf "        ${CYAN}curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash${NC}\n"
        printf "        ${CYAN}# 重新加载 shell${NC}\n"
        printf "        ${CYAN}source ~/.bashrc   # 或 source ~/.zshrc${NC}\n"
        printf "        ${CYAN}# 安装并使用 Node 22${NC}\n"
        printf "        ${CYAN}NVM_NODEJS_ORG_MIRROR=https://npmmirror.com/mirrors/node nvm install 22${NC}\n"
        printf "        ${CYAN}nvm use 22${NC}\n\n"
        printf "      方法二：从淘宝镜像直接下载安装包：\n"
        printf "        ${CYAN}https://npmmirror.com/mirrors/node/v22.0.0/${NC}\n"
        ;;
      pnpm)
        printf "  ${YELLOW}▸ 安装 pnpm：${NC}\n\n"
        printf "      方法一（推荐，使用淘宝镜像）：\n"
        printf "        ${CYAN}npm install -g pnpm --registry=https://registry.npmmirror.com${NC}\n\n"
        printf "      方法二（corepack，Node.js 内置）：\n"
        printf "        ${CYAN}corepack enable pnpm${NC}\n"
        ;;
      make)
        printf "  ${YELLOW}▸ 安装 make：${NC}\n"
        case "$OS" in
          debian|linux)
            printf "      ${CYAN}sudo apt-get update && sudo apt-get install -y make${NC}\n" ;;
          rhel)
            printf "      ${CYAN}sudo yum install -y make${NC}\n" ;;
          macos)
            printf "      Xcode 命令行工具（已包含 make）：${CYAN}xcode-select --install${NC}\n"
            printf "      或通过 Homebrew：${CYAN}brew install make${NC}\n" ;;
          *)
            printf "      Ubuntu/Debian：${CYAN}sudo apt-get install -y make${NC}\n"
            printf "      CentOS/RHEL：  ${CYAN}sudo yum install -y make${NC}\n"
            printf "      macOS：        ${CYAN}xcode-select --install${NC}\n" ;;
        esac
        ;;
    esac
  else
    printf "\n${RED}  ✗ Command ${BOLD}%s${NC}${RED} not found. Please install it and re-run this script.${NC}\n\n" "$cmd"
    case "$cmd" in
      git)
        printf "  ${YELLOW}▸ Install git:${NC}\n"
        case "$OS" in
          debian)
            printf "      ${CYAN}sudo apt-get update && sudo apt-get install -y git${NC}\n" ;;
          rhel)
            printf "      ${CYAN}sudo yum install -y git${NC}\n" ;;
          macos)
            printf "      Xcode CLI tools: ${CYAN}xcode-select --install${NC}\n"
            printf "      Or via Homebrew: ${CYAN}brew install git${NC}\n" ;;
          *)
            printf "      Ubuntu/Debian:  ${CYAN}sudo apt-get update && sudo apt-get install -y git${NC}\n"
            printf "      CentOS/RHEL:    ${CYAN}sudo yum install -y git${NC}\n"
            printf "      macOS:          ${CYAN}xcode-select --install${NC}\n" ;;
        esac
        ;;
      docker)
        printf "  ${YELLOW}▸ Install Docker:${NC}\n"
        if $IS_WSL2; then
          printf "\n  ${CYAN}WSL2 environment detected. Recommended: Docker Desktop for Windows:${NC}\n\n"
          printf "      1. Install Docker Desktop on your Windows host:\n"
          printf "         ${CYAN}https://www.docker.com/products/docker-desktop/${NC}\n\n"
          printf "      2. In Docker Desktop: Settings → Resources → WSL Integration\n"
          printf "         → Enable your WSL2 distro (e.g. Ubuntu), save & restart Docker Desktop\n\n"
          printf "      3. Reopen your WSL2 terminal and run ${CYAN}docker info${NC} to verify\n\n"
          printf "  ${YELLOW}▸ Alternatively, install Docker Engine directly in WSL2 (not recommended):${NC}\n"
          printf "        ${CYAN}curl -fsSL https://get.docker.com | sh${NC}\n"
          printf "        ${CYAN}sudo service docker start${NC}\n"
          printf "        ${CYAN}sudo usermod -aG docker \$USER && newgrp docker${NC}\n"
        else
          case "$OS" in
            debian|rhel|linux)
              printf "      One-liner (official):\n"
              printf "        ${CYAN}curl -fsSL https://get.docker.com | sh${NC}\n\n"
              printf "      Enable and start the service:\n"
              printf "        ${CYAN}sudo systemctl enable --now docker${NC}\n\n"
              printf "      Add your user to the docker group (no sudo needed after):\n"
              printf "        ${CYAN}sudo usermod -aG docker \$USER && newgrp docker${NC}\n" ;;
            macos)
              printf "      Download Docker Desktop:\n"
              printf "        ${CYAN}https://www.docker.com/products/docker-desktop/${NC}\n"
              printf "      Or via Homebrew:\n"
              printf "        ${CYAN}brew install --cask docker${NC}\n" ;;
            *)
              printf "      See: ${CYAN}https://docs.docker.com/get-docker/${NC}\n" ;;
          esac
        fi
        ;;
      node)
        printf "  ${YELLOW}▸ Install Node.js 22 LTS:${NC}\n\n"
        printf "      Option 1 — nvm (recommended):\n"
        printf "        ${CYAN}curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash${NC}\n"
        printf "        ${CYAN}source ~/.bashrc   # or source ~/.zshrc${NC}\n"
        printf "        ${CYAN}nvm install 22 && nvm use 22${NC}\n\n"
        printf "      Option 2 — official installer:\n"
        printf "        ${CYAN}https://nodejs.org/en/download/${NC}\n"
        ;;
      pnpm)
        printf "  ${YELLOW}▸ Install pnpm:${NC}\n\n"
        printf "      Option 1 (recommended): ${CYAN}npm install -g pnpm${NC}\n"
        printf "      Option 2 (corepack):    ${CYAN}corepack enable pnpm${NC}\n"
        ;;
      make)
        printf "  ${YELLOW}▸ Install make:${NC}\n"
        case "$OS" in
          debian|linux)
            printf "      ${CYAN}sudo apt-get update && sudo apt-get install -y make${NC}\n" ;;
          rhel)
            printf "      ${CYAN}sudo yum install -y make${NC}\n" ;;
          macos)
            printf "      Xcode CLI tools (includes make): ${CYAN}xcode-select --install${NC}\n"
            printf "      Or via Homebrew: ${CYAN}brew install make${NC}\n" ;;
          *)
            printf "      Ubuntu/Debian: ${CYAN}sudo apt-get install -y make${NC}\n"
            printf "      CentOS/RHEL:   ${CYAN}sudo yum install -y make${NC}\n"
            printf "      macOS:         ${CYAN}xcode-select --install${NC}\n" ;;
        esac
        ;;
    esac
  fi

  printf "\n"
  exit 1
}

# ── prerequisite checks ───────────────────────────────────────────────────────
check_command() {
  if ! command -v "$1" >/dev/null 2>&1; then
    show_install_instructions "$1"
  fi
  success "$1 found ($(command -v "$1"))"
}

if [ "$LANG_MODE" = "zh" ]; then
  step "检查依赖..."
else
  step "Checking prerequisites..."
fi
check_command git
check_command make
check_command docker
check_command node
check_command pnpm
printf "\n"

# ── Node.js version check ─────────────────────────────────────────────────────
NODE_VERSION=$(node -e "process.stdout.write(process.versions.node.split('.')[0])")
if [ "$NODE_VERSION" -lt 20 ]; then
  if [ "$LANG_MODE" = "zh" ]; then
    warn "需要 Node.js 20 或更高版本（当前：v$(node --version)）"
    info "使用 nvm 升级：NVM_NODEJS_ORG_MIRROR=https://npmmirror.com/mirrors/node nvm install 22"
    error "Node.js 版本不满足要求，请升级后重试"
  else
    error "Node.js 20+ is required (found v$(node --version)). Please upgrade: https://nodejs.org/"
  fi
fi
if [ "$LANG_MODE" = "zh" ]; then
  success "Node.js v$(node --version) 版本检查通过"
else
  success "Node.js v$(node --version) OK"
fi

# ── Docker daemon check ───────────────────────────────────────────────────────
if ! docker info >/dev/null 2>&1; then
  if [ "$LANG_MODE" = "zh" ]; then
    error "Docker 守护进程未运行。请启动 Docker Desktop 或执行：sudo systemctl start docker"
  else
    error "Docker daemon is not running. Please start Docker Desktop (or the Docker service) and retry."
  fi
fi
if [ "$LANG_MODE" = "zh" ]; then
  success "Docker 守护进程运行中"
else
  success "Docker daemon is running"
fi
printf "\n"

# ── port conflict check helpers ───────────────────────────────────────────────
port_in_use() {
  local port="$1"
  if command -v ss >/dev/null 2>&1; then
    ss -tlnp 2>/dev/null | awk '{print $4}' | grep -qE ":${port}$" && return 0
  fi
  if command -v lsof >/dev/null 2>&1; then
    lsof -i "TCP:${port}" -sTCP:LISTEN >/dev/null 2>&1 && return 0
  fi
  if command -v nc >/dev/null 2>&1; then
    nc -z 127.0.0.1 "$port" 2>/dev/null && return 0
  fi
  return 1
}

check_ports() {
  local has_conflict=false
  for pair in "5432:PostgreSQL" "6379:Redis" "9000:MinIO(S3)" "9001:MinIO-Console" "4000:API" "5173:Web-Dev"; do
    local port="${pair%%:*}"
    local label="${pair##*:}"
    if port_in_use "$port"; then
      warn "Port $port ($label) is already in use"
      has_conflict=true
    fi
  done
  if $has_conflict; then
    printf "\n"
    if [ "$LANG_MODE" = "zh" ]; then
      printf "${YELLOW}  ⚠ 以上端口将被 specc.sh 服务占用，冲突可能导致服务启动失败。${NC}\n"
      printf "  按 ${GREEN}Enter${NC} 继续，或按 ${RED}Ctrl+C${NC} 退出先释放端口... "
    else
      printf "${YELLOW}  ⚠ These ports are required by specc.sh. Conflicts may cause startup failures.${NC}\n"
      printf "  Press ${GREEN}Enter${NC} to continue, or ${RED}Ctrl+C${NC} to exit and free the ports first... "
    fi
    [ -e /dev/tty ] && read -r _ </dev/tty || true
    printf "\n"
  else
    if [ "$LANG_MODE" = "zh" ]; then
      success "端口检查通过（所有端口可用）"
    else
      success "All required ports are available"
    fi
  fi
}

# ── configure pnpm registry for Chinese users ─────────────────────────────────
if [ "$LANG_MODE" = "zh" ]; then
  step "配置 pnpm 淘宝镜像..."
  pnpm config set registry https://registry.npmmirror.com
  success "pnpm 镜像已设置为 https://registry.npmmirror.com"
fi

# ── clone ─────────────────────────────────────────────────────────────────────
if [ "$LANG_MODE" = "zh" ]; then
  step "克隆项目（来自 GitHub）..."
else
  step "Cloning repository..."
fi

if [ -d "$INSTALL_DIR" ]; then
  if [ "$LANG_MODE" = "zh" ]; then
    warn "目录 '$INSTALL_DIR' 已存在，跳过克隆。"
  else
    warn "Directory '$INSTALL_DIR' already exists. Skipping clone."
  fi
else
  if [ "$LANG_MODE" = "zh" ]; then
    info "正在克隆 specc.sh 到 ./$INSTALL_DIR ..."
  else
    info "Cloning specc.sh into ./$INSTALL_DIR ..."
  fi
  git clone --depth=1 "$REPO_URL" "$INSTALL_DIR"
  if [ "$LANG_MODE" = "zh" ]; then
    success "已克隆到 ./$INSTALL_DIR"
  else
    success "Cloned into ./$INSTALL_DIR"
  fi
fi

cd "$INSTALL_DIR"
printf "\n"

# ── port check ───────────────────────────────────────────────────────────────
if [ "$LANG_MODE" = "zh" ]; then
  step "检查端口占用..."
else
  step "Checking port availability..."
fi
check_ports
printf "\n"

# ── init ──────────────────────────────────────────────────────────────────────
if [ "$LANG_MODE" = "zh" ]; then
  step "初始化项目（make init）..."
else
  step "Running project initialization (make init)..."
fi
printf "\n"
make init

# ── done / start dev ─────────────────────────────────────────────────────────
printf "\n"
if [ "$LANG_MODE" = "zh" ]; then
  printf "${BLUE}╔══════════════════════════════════════╗${NC}\n"
  printf "${BLUE}║${NC}  ${GREEN}✨ 初始化完成，启动开发服务器...${NC}      ${BLUE}║${NC}\n"
  printf "${BLUE}╚══════════════════════════════════════╝${NC}\n\n"
  printf "  前端  → ${GREEN}http://localhost:5173${NC}\n"
  printf "  API   → ${GREEN}http://localhost:4000${NC}\n"
  printf "  MinIO → ${GREEN}http://localhost:9001${NC}\n\n"
  printf "  ${YELLOW}提示：按 Ctrl+C 可停止开发服务器${NC}\n\n"
else
  printf "${BLUE}╔══════════════════════════════════════╗${NC}\n"
  printf "${BLUE}║${NC}  ${GREEN}✨ Init complete — starting dev server${NC} ${BLUE}║${NC}\n"
  printf "${BLUE}╚══════════════════════════════════════╝${NC}\n\n"
  printf "  Web   → ${GREEN}http://localhost:5173${NC}\n"
  printf "  API   → ${GREEN}http://localhost:4000${NC}\n"
  printf "  MinIO → ${GREEN}http://localhost:9001${NC}\n\n"
  printf "  ${YELLOW}Tip: press Ctrl+C to stop the dev server${NC}\n\n"
fi
make dev

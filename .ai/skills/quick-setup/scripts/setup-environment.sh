#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "${SCRIPT_DIR}/../../../.." && pwd)"

info() {
  printf '[INFO] %s\n' "$1"
}

ok() {
  printf '[OK] %s\n' "$1"
}

warn() {
  printf '[WARN] %s\n' "$1"
}

fail() {
  printf '[ERROR] %s\n' "$1" >&2
  exit 1
}

has_cmd() {
  command -v "$1" >/dev/null 2>&1
}

detect_os() {
  case "$(uname -s)" in
    Darwin) echo "macos" ;;
    Linux) echo "linux" ;;
    *) echo "unknown" ;;
  esac
}

install_git_if_possible() {
  local os="$1"
  if has_cmd git; then
    ok "git already installed"
    return
  fi

  if [[ "$os" == "macos" ]] && has_cmd brew; then
    info "Installing git via Homebrew..."
    brew install git
    ok "git installed"
    return
  fi

  if [[ "$os" == "linux" ]] && has_cmd apt-get; then
    info "Installing git via apt-get..."
    sudo apt-get update
    sudo apt-get install -y git
    ok "git installed"
    return
  fi

  fail "git is missing. Install git first: https://git-scm.com/downloads"
}

install_node_if_possible() {
  local os="$1"
  if has_cmd node; then
    ok "node already installed"
    return
  fi

  if [[ "$os" == "macos" ]] && has_cmd brew; then
    info "Installing node via Homebrew..."
    brew install node
    ok "node installed"
    return
  fi

  if [[ "$os" == "linux" ]] && has_cmd apt-get; then
    info "Installing node via apt-get..."
    sudo apt-get update
    sudo apt-get install -y nodejs npm
    ok "node installed"
    return
  fi

  fail "node is missing. Install Node.js 20+ first: https://nodejs.org/en/download"
}

ensure_node_version() {
  local version major
  version="$(node -v | sed 's/^v//')"
  major="${version%%.*}"
  if [[ "$major" -lt 20 ]]; then
    warn "Detected node ${version}. Node 20+ is required."
    fail "Please install Node.js 20+ and rerun this script."
  fi
  ok "node version ${version} is supported"
}

install_pnpm_if_possible() {
  if has_cmd pnpm; then
    ok "pnpm already installed"
    return
  fi

  if has_cmd corepack; then
    info "Installing pnpm via corepack..."
    corepack enable
    corepack prepare pnpm@10 --activate
  elif has_cmd npm; then
    info "Installing pnpm via npm..."
    npm install -g pnpm
  else
    fail "pnpm is missing and npm/corepack is unavailable. Install pnpm first: https://pnpm.io/installation"
  fi

  has_cmd pnpm || fail "pnpm installation failed"
  ok "pnpm installed"
}

main() {
  info "Starting one-click environment setup in ${ROOT_DIR}"
  local os
  os="$(detect_os)"
  info "Detected OS: ${os}"

  install_git_if_possible "$os"
  install_node_if_possible "$os"
  ensure_node_version
  install_pnpm_if_possible

  cd "$ROOT_DIR"
  info "Installing project dependencies..."
  if ! CI=true pnpm install; then
    fail "Dependency install failed. Read .ai/skills/quick-setup/references/troubleshooting.md"
  fi
  ok "Dependencies installed"

  printf '\nNext step:\n  pnpm dev\n'
}

main "$@"

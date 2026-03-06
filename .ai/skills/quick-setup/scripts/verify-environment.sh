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

fail() {
  printf '[ERROR] %s\n' "$1" >&2
  exit 1
}

has_cmd() {
  command -v "$1" >/dev/null 2>&1
}

main() {
  cd "$ROOT_DIR"
  info "Verifying website-launchpad environment in ${ROOT_DIR}"

  has_cmd node || fail "node not found"
  has_cmd pnpm || fail "pnpm not found"

  info "node: $(node -v)"
  info "pnpm: $(pnpm -v)"

  info "Running lint..."
  pnpm lint
  ok "lint passed"

  info "Running type-check..."
  pnpm type-check
  ok "type-check passed"

  ok "Environment verification complete"
}

main "$@"

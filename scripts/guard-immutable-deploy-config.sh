#!/usr/bin/env bash
set -euo pipefail

BASE_REF="${1:-origin/main}"
HEAD_REF="${2:-HEAD}"

# Absolute rule: these files must not be modified.
PROTECTED_FILES=(
  "frontend/railway.json"
  "railway.json"
  "nixpacks.toml"
)

# Absolute rule: these paths must never exist again (they caused Nixpacks conflicts).
BANNED_PATHS=(
  "frontend/nixpacks.toml"
  "frontend/.nixpacks"
)

changed="$(git diff --name-only "${BASE_REF}...${HEAD_REF}" -- "${PROTECTED_FILES[@]}" || true)"
if [[ -n "${changed}" ]]; then
  echo "ERROR: immutable deploy config changed between ${BASE_REF} and ${HEAD_REF}:"
  echo "${changed}"
  exit 1
fi

for p in "${BANNED_PATHS[@]}"; do
  if [[ -e "${p}" ]]; then
    echo "ERROR: banned path exists: ${p}"
    exit 1
  fi
done

echo "OK: immutable deploy config unchanged; banned paths absent."


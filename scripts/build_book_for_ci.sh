#!/usr/bin/env bash

set -euo pipefail

BOOK_DIR="src"
CONFIG_PATH="${BOOK_DIR}/_config.yml"
CI_CONFIG_PATH="${BOOK_DIR}/_config.ci.yml"
BACKUP_PATH="${BOOK_DIR}/_config.yml.bak"

cleanup() {
  if [[ -f "${BACKUP_PATH}" ]]; then
    mv "${BACKUP_PATH}" "${CONFIG_PATH}"
  fi
  rm -f "${CI_CONFIG_PATH}"
}

trap cleanup EXIT

python3 scripts/render_ci_config.py
cp "${CONFIG_PATH}" "${BACKUP_PATH}"
mv "${CI_CONFIG_PATH}" "${CONFIG_PATH}"

OPAMSWITCH=textbook jupyter-book build "${BOOK_DIR}"

#!/usr/bin/env bash
# Builds apps/web as a static export and publishes it to the gh-pages branch,
# which GitHub Pages is configured to serve at
# https://jcvdeveloper.github.io/projetos-orquestration/.
#
# Stopgap host for v1 of the landing page (see docs/decisions/0001-tech-stack.md
# for why Vercel is the default long-term choice). Run manually until CI has
# the `workflow` OAuth scope needed to automate this — see README.
set -euo pipefail

cd "$(dirname "$0")/.."

pnpm --filter web build:pages

worktree_dir=$(mktemp -d)
trap 'rm -rf "$worktree_dir"' EXIT

git fetch origin gh-pages
git worktree add "$worktree_dir" gh-pages

find "$worktree_dir" -mindepth 1 -maxdepth 1 -not -name '.git' -exec rm -rf {} +
cp -R apps/web/out/. "$worktree_dir"/
touch "$worktree_dir/.nojekyll"

git -C "$worktree_dir" add -A
if git -C "$worktree_dir" diff --cached --quiet; then
  echo "No changes to deploy."
else
  git -C "$worktree_dir" commit -m "Deploy landing page static export"
  git -C "$worktree_dir" push origin gh-pages
fi

git worktree remove "$worktree_dir" --force

#!/usr/bin/env bash
# Publică build-ul static pe GitHub Pages (staging), branch gh-pages.
set -euo pipefail
cd "$(dirname "$0")/.."

OWNER="macminim4agents-rgb"
REPO="qarvenda-site"

export NEXT_PUBLIC_BASE_PATH="/$REPO"
export NEXT_PUBLIC_SITE_URL="https://$OWNER.github.io/$REPO"
export NEXT_PUBLIC_HOSTING="GitHub Pages (GitHub, Inc.)"

npm run build
touch out/.nojekyll   # altfel Jekyll ar ignora directorul _next/

cd out
rm -rf .git
git init -q -b gh-pages
git add -A
git commit -qm "staging $(date +%F_%H%M)"
git push -f "https://github.com/$OWNER/$REPO.git" gh-pages
echo "OK: https://$OWNER.github.io/$REPO/"

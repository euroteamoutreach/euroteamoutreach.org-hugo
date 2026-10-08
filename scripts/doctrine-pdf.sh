#!/usr/bin/env bash
# Regenerates static/pdf/doctrine.pdf (the /doctrine/ "Download PDF") from the
# same section files, through the same Hugo renderer, as the page — so the two
# can never drift apart. Run it after any change under content/doctrine/ and
# commit the PDF with that change.
#
# Hugo's pdf environment (config/pdf/hugo.toml) adds a print rendering of the
# page; weasyprint lays it out with scripts/doctrine-pdf.css. Needs weasyprint
# (local only; this never runs in CI or on Netlify).
# Usage: scripts/doctrine-pdf.sh
set -euo pipefail
cd "$(dirname "$0")/.."

build=tmp/pdf-build # tmp/ is git-ignored
hugo --environment pdf --quiet -d "$build"
weasyprint --base-url "$PWD/static/" -s scripts/doctrine-pdf.css \
  "$build/doctrine/print.html" static/pdf/doctrine.pdf

echo "Wrote static/pdf/doctrine.pdf"

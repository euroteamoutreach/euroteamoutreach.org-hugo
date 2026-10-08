#!/usr/bin/env bash
# Regenerates static/pdf/doctrine.pdf (the /doctrine/ "Download PDF") from the
# same section files the page renders, so the two can never drift apart. Run it
# after any change under content/doctrine/ and commit the PDF with that change.
#
# Needs pandoc and weasyprint (local only; neither runs in CI or on Netlify).
# Usage: scripts/doctrine-pdf.sh
set -euo pipefail
cd "$(dirname "$0")/.."

src=content/doctrine
out=static/pdf/doctrine.pdf

# Front matter off: the body of a file, i.e. everything after its second ---.
body() { awk 'n >= 2 { print } /^---$/ { n++ }' "$1"; }
title() { sed -n 's/^title: "\(.*\)"$/\1/p' "$1" | head -1; }

{
  printf '# %s\n\n' "$(title "$src/index.md")"
  body "$src/index.md"
  for f in "$src"/sections/*.md; do
    printf '\n## %s\n' "$(title "$f")"
    body "$f"
  done
} |
  # +smart gives the same curly quotes and ellipses as Hugo's typographer.
  pandoc -f markdown+smart -t html5 --standalone \
    --metadata pagetitle="Doctrine — Euro Team Outreach" \
    --css "$PWD/scripts/doctrine-pdf.css" |
  weasyprint --base-url "$PWD/static/" - "$out"

echo "Wrote $out"

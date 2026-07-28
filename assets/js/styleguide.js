// Styleguide-only. Bundled per-page by layouts/styleguide.html, not by the
// global scripts partial — none of this ships to real visitors.
//
// Its whole job is to keep /styleguide/ honest. The page must not contain a
// literal hex anywhere (see the header comment in layouts/styleguide.html), so
// every value it DISPLAYS is read back here from what the browser actually
// resolved: token values from the custom properties on :root, contrast ratios
// from the colours painted on the samples themselves. Change a token and this
// page follows; there is nothing to keep in sync by hand.
//
// ⚠️ Do not have this file add Tailwind utility classes at runtime. Tailwind's
// JIT scans hugo_stats.json, which records classes from the RENDERED HTML — a
// class that only ever exists in JS is never generated. Verdicts below use
// text symbols for that reason.

const root = document.documentElement;

// Longer values (the font stacks) get cut to their first family so a census
// row cannot blow out its width; the full value stays in the title attribute.
const TRUNCATE_AT = 24;

function tokenValue(name) {
  return getComputedStyle(root).getPropertyValue(name).trim();
}

// Computed colours serialize as rgb()/rgba(), so pulling the numbers out is
// enough. Returns null for anything unexpected rather than guessing.
function toRgb(color) {
  const parts = color.match(/-?[\d.]+/g);
  if (!parts || parts.length < 3) return null;
  return parts.slice(0, 3).map(Number);
}

// WCAG 2.1 relative luminance.
function relativeLuminance([r, g, b]) {
  const [rl, gl, bl] = [r, g, b].map((channel) => {
    const s = channel / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rl + 0.7152 * gl + 0.0722 * bl;
}

function contrastRatio(fg, bg) {
  const a = relativeLuminance(fg);
  const b = relativeLuminance(bg);
  const [hi, lo] = a > b ? [a, b] : [b, a];
  return (hi + 0.05) / (lo + 0.05);
}

// 4.5:1 is AA for body text, 3:1 is AA for large text (18.66px bold / 24px
// regular), 7:1 is AAA.
function verdict(ratio) {
  if (ratio >= 7) return "AAA ✓";
  if (ratio >= 4.5) return "AA ✓";
  if (ratio >= 3) return "AA large text only ✕";
  return "fail ✕";
}

function renderTokenValues() {
  document.querySelectorAll("[data-token-value]").forEach((el) => {
    const value = tokenValue(el.dataset.tokenValue);
    if (!value) {
      el.textContent = "(not declared)";
      return;
    }
    el.title = value;
    const truncate =
      "tokenTruncate" in el.dataset && value.length > TRUNCATE_AT;
    el.textContent = truncate ? `${value.split(",")[0]} …` : value;
  });
}

function renderContrastRatios() {
  document.querySelectorAll("[data-contrast]").forEach((block) => {
    const sample = block.querySelector("[data-contrast-sample]");
    const ground = block.querySelector("[data-contrast-ground]");
    const out = block.querySelector("[data-contrast-out]");
    if (!sample || !ground || !out) return;

    const fg = toRgb(getComputedStyle(sample).color);
    const bg = toRgb(getComputedStyle(ground).backgroundColor);
    if (!fg || !bg) {
      out.textContent = "(not measurable)";
      return;
    }

    const ratio = contrastRatio(fg, bg);
    out.textContent = `${ratio.toFixed(2)}:1 · ${verdict(ratio)}`;
  });
}

renderTokenValues();
renderContrastRatios();

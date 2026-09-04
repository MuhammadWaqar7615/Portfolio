/**
 * WCAG 2.1 AA Contrast Ratio Verification Script
 * Standard formula from W3C Web Content Accessibility Guidelines:
 * Relative Luminance L = 0.2126*R + 0.7152*G + 0.0722*B
 * Contrast Ratio = (L1 + 0.05) / (L2 + 0.05)
 */

function hexToRgb(hex) {
  const clean = hex.replace("#", "");
  const num = parseInt(clean, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

function channelLuminance(c) {
  const norm = c / 255;
  return norm <= 0.04045
    ? norm / 12.92
    : Math.pow((norm + 0.055) / 1.055, 2.4);
}

function getRelativeLuminance({ r, g, b }) {
  return (
    0.2126 * channelLuminance(r) +
    0.7152 * channelLuminance(g) +
    0.0722 * channelLuminance(b)
  );
}

function getContrastRatio(fgHex, bgHex) {
  const L1 = getRelativeLuminance(hexToRgb(fgHex));
  const L2 = getRelativeLuminance(hexToRgb(bgHex));
  const lighter = Math.max(L1, L2);
  const darker = Math.min(L1, L2);
  return (lighter + 0.05) / (darker + 0.05);
}

// All foreground-to-background combinations in the rebuild
const pairings = [
  // Primary Page Background (#090A0F)
  { element: "Hero Headline (h1)", fg: "#FFFFFF", bg: "#090A0F", size: "large" },
  { element: "Hero Name Italic (Waqar)", fg: "#D1D5DB", bg: "#090A0F", size: "large" },
  { element: "Hero Lead Paragraph", fg: "#D1D5DB", bg: "#090A0F", size: "normal" },
  { element: "Hero Eyebrow / Label (Sky-400)", fg: "#38BDF8", bg: "#090A0F", size: "normal" },
  { element: "Hero Index Header text", fg: "#9CA3AF", bg: "#090A0F", size: "normal" },
  
  // Card Container Background (#0C0E14)
  { element: "Card Heading (h2 / h3)", fg: "#FFFFFF", bg: "#0C0E14", size: "large" },
  { element: "Card Body (Problem / Decisions)", fg: "#D1D5DB", bg: "#0C0E14", size: "normal" },
  { element: "Card Highlight (Outcome Sky-400)", fg: "#38BDF8", bg: "#0C0E14", size: "normal" },
  { element: "Tech Tag Pill text (gray-300)", fg: "#D1D5DB", bg: "#0C0E14", size: "normal" },
  { element: "Secondary Text / Metadata (gray-400)", fg: "#9CA3AF", bg: "#0C0E14", size: "normal" },
  
  // High Contrast Buttons
  { element: "Primary Button Text (Black on White)", fg: "#000000", bg: "#FFFFFF", size: "normal" },
  { element: "Hover Button (Black on Sky-400)", fg: "#000000", bg: "#38BDF8", size: "normal" },
  { element: "Secondary Button Text (White on Translucent)", fg: "#FFFFFF", bg: "#090A0F", size: "normal" },

  // Forms and Inputs (#090A0F inside #0C0E14)
  { element: "Input Text", fg: "#FFFFFF", bg: "#090A0F", size: "normal" },
  { element: "Input Label", fg: "#D1D5DB", bg: "#0C0E14", size: "normal" },
  { element: "Success Alert Text", fg: "#6EE7B7", bg: "#064E3B", size: "normal" },
  { element: "Error Alert Text", fg: "#FDA4AF", bg: "#881337", size: "normal" },

  // Footer (#06070A)
  { element: "Footer Copyright text", fg: "#9CA3AF", bg: "#06070A", size: "normal" },
  { element: "Footer Links", fg: "#9CA3AF", bg: "#06070A", size: "normal" },
  { element: "Footer Link Hover", fg: "#38BDF8", bg: "#06070A", size: "normal" },
];

console.log("=========================================================================");
console.log("               WCAG 2.1 AA COLOR CONTRAST AUDIT REPORT                  ");
console.log("=========================================================================");
console.log("Standard Requirements:");
console.log("- Normal Text (< 18pt / 24px): Minimum 4.5:1 ratio");
console.log("- Large Text (>= 18pt / 24px or >= 14pt / 18.66px bold): Minimum 3.0:1 ratio");
console.log("-------------------------------------------------------------------------\n");

let passedCount = 0;
let failedCount = 0;

pairings.forEach((p, idx) => {
  const ratio = getContrastRatio(p.fg, p.bg);
  const minRequired = p.size === "large" ? 3.0 : 4.5;
  const isPass = ratio >= minRequired;

  if (isPass) passedCount++;
  else failedCount++;

  const status = isPass ? "PASS [AA]" : "FAIL [AA]";
  console.log(
    `[${(idx + 1).toString().padStart(2, "0")}] ${status.padEnd(10)} | Ratio: ${ratio.toFixed(2).padStart(5)}:1 (Req: ${minRequired}:1) | FG: ${p.fg} BG: ${p.bg} | ${p.element}`
  );
});

console.log("\n-------------------------------------------------------------------------");
console.log(`Summary: ${passedCount} / ${pairings.length} checks passed.`);
if (failedCount === 0) {
  console.log("STATUS: 100% WCAG 2.1 AA COMPLIANT. Zero contrast violations detected.");
} else {
  console.log(`STATUS: ${failedCount} contrast violation(s) detected. Adjust colors.`);
}
console.log("=========================================================================");

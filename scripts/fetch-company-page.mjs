#!/usr/bin/env node
/**
 * Re-fetch the Framer-published /company page and write company/index.html.
 * Strips Framer editor and analytics scripts that are not needed in production.
 *
 * Usage: node scripts/fetch-company-page.mjs
 */

import { execSync } from "node:child_process";
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const FRAMER_URL =
  "https://physical-cogwheel-976158.framer.app/company";
const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "company", "index.html");

function stripProductionScripts(html) {
  return html
    .replace(
      /\s*<script>try\{if\(localStorage\.get\("__framer_force_showing_editorbar_since"\)\).*?<\/script>\s*/s,
      "\n"
    )
    .replace(
      /\s*<script[^>]*src="https:\/\/events\.framer\.com\/script\?v=\d+"[^>]*><\/script>\s*/g,
      "\n"
    );
}

console.log(`Fetching ${FRAMER_URL} ...`);
const raw = execSync(`curl -fsSL "${FRAMER_URL}"`, {
  encoding: "utf8",
  maxBuffer: 10 * 1024 * 1024,
});

const html = stripProductionScripts(raw);
mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, html, "utf8");

console.log(`Wrote ${OUT} (${html.length} bytes)`);

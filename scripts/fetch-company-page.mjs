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

const HIDE_FRAMER_CHROME = `
	<style id="hide-framer-chrome">
		#__framer-editorbar,
		#__framer-badge-container {
			display: none !important;
		}
	</style>`;

function stripProductionScripts(html) {
  let out = html
    .replace(
      /\s*<script>try\{if\(localStorage\.get\("__framer_force_showing_editorbar_since"\)\).*?<\/script>\s*/s,
      "\n"
    )
    .replace(
      /\s*<script[^>]*src="https:\/\/events\.framer\.com\/script\?v=\d+"[^>]*><\/script>\s*/g,
      "\n"
    )
    .replace(/\s*<style id="hide-framer-chrome">[\s\S]*?<\/style>\s*/g, "\n");

  if (!out.includes('id="hide-framer-chrome"')) {
    out = out.replace(
      /<!-- End of headStart -->\s*/,
      `<!-- End of headStart -->${HIDE_FRAMER_CHROME}\n`
    );
  }

  return out;
}

function ensureRobotsIndexFollow(html) {
  const robotsMeta = /<meta\s+name="robots"\s+content="([^"]*)"\s*\/?>/i;
  const match = html.match(robotsMeta);
  if (!match) {
    return html.replace(
      /<head>/i,
      '<head>\n\t<meta name="robots" content="index,follow">'
    );
  }

  const directives = new Set(
    match[1]
      .split(",")
      .map((d) => d.trim().toLowerCase())
      .filter(Boolean)
  );
  directives.delete("noindex");
  directives.delete("nofollow");
  directives.add("index");
  directives.add("follow");

  const content = [...directives].join(",");
  return html.replace(robotsMeta, `<meta name="robots" content="${content}">`);
}

console.log(`Fetching ${FRAMER_URL} ...`);
const raw = execSync(`curl -fsSL "${FRAMER_URL}"`, {
  encoding: "utf8",
  maxBuffer: 10 * 1024 * 1024,
});

const html = ensureRobotsIndexFollow(stripProductionScripts(raw));
mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, html, "utf8");

console.log(`Wrote ${OUT} (${html.length} bytes)`);

#!/usr/bin/env node
/**
 * Re-fetch Framer-published company pages and write them under public/company/.
 * Strips Framer editor and analytics scripts that are not needed in production.
 *
 * Usage: node scripts/fetch-company-page.mjs
 */

import { execSync } from "node:child_process";
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const FRAMER_ORIGIN = "https://physical-cogwheel-976158.framer.app";
const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

const PAGES = [
  { path: "/company", out: join(ROOT, "public", "company", "index.html") },
  {
    path: "/company/hr",
    out: join(ROOT, "public", "company", "hr", "index.html"),
  },
];

const HIDE_FRAMER_CHROME = `
	<style id="hide-framer-chrome">
		#__framer-editorbar,
		#__framer-badge-container {
			display: none !important;
			visibility: hidden !important;
			opacity: 0 !important;
			pointer-events: none !important;
		}
	</style>
	<script id="block-framer-editorbar">
	(function () {
		var key = "__framer_force_showing_editorbar_since";
		try { localStorage.removeItem(key); } catch (e) {}

		function removeChrome() {
			var editor = document.getElementById("__framer-editorbar");
			var badge = document.getElementById("__framer-badge-container");
			if (editor) editor.remove();
			if (badge) badge.remove();
		}

		removeChrome();
		new MutationObserver(removeChrome).observe(document.documentElement, {
			childList: true,
			subtree: true,
		});
	})();
	</script>`;

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
    .replace(/\s*<style id="hide-framer-chrome">[\s\S]*?<\/style>\s*/g, "\n")
    .replace(/\s*<script id="block-framer-editorbar">[\s\S]*?<\/script>\s*/g, "\n");

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

function fetchPage({ path, out }) {
  const url = `${FRAMER_ORIGIN}${path}`;
  console.log(`Fetching ${url} ...`);
  const raw = execSync(`curl -fsSL "${url}"`, {
    encoding: "utf8",
    maxBuffer: 10 * 1024 * 1024,
  });

  const html = ensureRobotsIndexFollow(stripProductionScripts(raw));
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, html, "utf8");
  console.log(`Wrote ${out} (${html.length} bytes)`);
}

for (const page of PAGES) {
  fetchPage(page);
}

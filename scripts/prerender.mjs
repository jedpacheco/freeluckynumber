// Static prerender: runs after `vite build` (client) and `vite build --ssr` (server bundle).
// Writes dist/<route>/index.html with real content, unique title/description/canonical,
// plus dist/404.html, dist/sitemap.xml.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const ssrEntry = path.join(root, "dist-ssr", "entry-server.js");
const { render, getMeta, allRoutes, sitemapExclude, SITE_URL, notFoundMeta } = await import(pathToFileURL(ssrEntry).href);

const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function page(url, meta, { noindex = false } = {}) {
  const html = render(url);
  const head =
    `<title>${esc(meta.title)}</title>\n    <meta name="description" content="${esc(meta.description)}" />\n` +
    (noindex ? `    <meta name="robots" content="noindex" />\n` : `    <link rel="canonical" href="${SITE_URL}${meta.canonical === "/" ? "/" : meta.canonical}" />\n`) +
    `    <meta property="og:title" content="${esc(meta.title)}" />\n    <meta property="og:description" content="${esc(meta.description)}" />\n    <meta property="og:type" content="website" />\n    <meta property="og:site_name" content="LuckyVibe Daily" />`;
  let out = template
    .replace(/<title>[\s\S]*?<\/title>/, "")
    .replace(/<meta\s+name="description"[\s\S]*?\/>/, "")
    .replace("<head>", `<head>\n    ${head}`)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`);
  if (!out.includes(html.slice(0, 50))) throw new Error("root injection failed for " + url);
  return out;
}

const routes = allRoutes();
for (const url of routes) {
  const meta = getMeta(url);
  if (meta === notFoundMeta) throw new Error("No meta for route " + url);
  const file = url === "/" ? path.join(dist, "index.html") : path.join(dist, url.slice(1), "index.html");
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, page(url, meta));
}
fs.writeFileSync(path.join(dist, "404.html"), page("/this-page-does-not-exist", notFoundMeta, { noindex: true }));

const today = new Date().toISOString().slice(0, 10);
const urls = routes
  .filter((r) => !sitemapExclude.includes(r))
  .map((r) => `  <url>\n    <loc>${SITE_URL}${r === "/" ? "/" : r}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`)
  .join("\n");
fs.writeFileSync(
  path.join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
);
// keep a copy in public/ so the source tree always has the current sitemap
fs.copyFileSync(path.join(dist, "sitemap.xml"), path.join(root, "public", "sitemap.xml"));
fs.rmSync(path.join(root, "dist-ssr"), { recursive: true, force: true });
console.log(`Prerendered ${routes.length} routes + 404.html; sitemap has ${routes.length - sitemapExclude.length} URLs.`);

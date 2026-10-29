// Checks the built dist/: every route has real text, unique titles, real robots/sitemap, 404 page.
import fs from "node:fs";
import path from "node:path";
const dist = path.resolve("dist");
const files = [];
(function walk(d) { for (const f of fs.readdirSync(d)) { const p = path.join(d, f); if (fs.statSync(p).isDirectory()) { if (f !== "assets") walk(p); } else if (f.endsWith(".html")) files.push(p); } })(dist);
const strip = (h) => h.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<style[\s\S]*?<\/style>/g, " ").replace(/<header[\s\S]*?<\/header>/g, " ").replace(/<footer[\s\S]*?<\/footer>/g, " ").replace(/<[^>]+>/g, " ").replace(/&[a-z#0-9]+;/gi, " ");
const titles = new Map(); let total = 0; let problems = 0;
const rows = [];
for (const f of files.sort()) {
  const html = fs.readFileSync(f, "utf8");
  const root = (html.split('<div id="root">')[1] || "").split("<script")[0];
  const words = strip(root).split(/\s+/).filter((w) => /[A-Za-z0-9]/.test(w)).length;
  const title = (html.match(/<title>(.*?)<\/title>/) || [])[1];
  const canon = (html.match(/rel="canonical" href="(.*?)"/) || [])[1] || "(none)";
  const route = "/" + path.relative(dist, f).replace(/index\.html$/, "").replace(/\/$/, "");
  rows.push([words, route, title, canon]);
  total += words;
  if (!title) { problems++; console.log("NO TITLE", route); }
  if (words < 150) { problems++; console.log("LOW WORDS", route, words); }
  titles.set(title, (titles.get(title) || []).concat(route));
}
for (const r of rows) console.log(String(r[0]).padStart(5), r[1].padEnd(62), r[3]);
for (const [t, rs] of titles) if (rs.length > 1) { problems++; console.log("DUP TITLE", t, rs); }
const robots = fs.readFileSync(path.join(dist, "robots.txt"), "utf8");
const sm = fs.readFileSync(path.join(dist, "sitemap.xml"), "utf8");
if (!robots.includes("Sitemap: https://freeluckynumber.com/sitemap.xml")) { problems++; console.log("robots bad"); }
if (!sm.startsWith("<?xml")) { problems++; console.log("sitemap bad"); }
if (!fs.readFileSync(path.join(dist, "404.html"), "utf8").includes("Page Not Found")) { problems++; console.log("404 bad"); }
console.log(`\n${files.length} HTML files, ${total} words in page bodies (header/footer excluded), ${(sm.match(/<loc>/g) || []).length} sitemap URLs, ${problems} problems`);

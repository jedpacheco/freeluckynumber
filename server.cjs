// Serves the prerendered site in dist/ with clean URLs and real 404s.
const http = require('http');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, 'dist');
const port = process.env.PORT || 8080;
const types = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.webp': 'image/webp', '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.woff': 'font/woff'
};

function send(res, file, status) {
  res.writeHead(status, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
}

http.createServer((req, res) => {
  let p;
  try { p = decodeURIComponent(req.url.split('?')[0]); } catch { p = '/'; }
  const base = path.normalize(path.join(root, p));
  if (!base.startsWith(root)) { res.writeHead(400); return res.end(); }
  for (const f of [base, path.join(base, 'index.html'), base + '.html']) {
    try { if (fs.statSync(f).isFile()) return send(res, f, 200); } catch {}
  }
  send(res, path.join(root, '404.html'), 404);
}).listen(port, () => console.log('Serving dist on ' + port));

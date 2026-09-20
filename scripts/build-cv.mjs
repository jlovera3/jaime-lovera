// Prints the CV to PDF in every language from the built site (`?cv=en|es`).
//   npm run cv      → builds the app, then writes src/assets/cv/Jaime-Lovera-CV-{en,es}.pdf
// Needs Google Chrome / Chromium; override its path with CHROME_PATH.
import { createReadStream, existsSync, mkdirSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';

const root = fileURLToPath(new URL('..', import.meta.url));
const dist = join(root, 'www');
const out = join(root, 'src/assets/cv');
const languages = ['en', 'es'];


const chrome =
  process.env.CHROME_PATH ??
  [
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
  ].find(existsSync);
if (!chrome) throw new Error('Chrome not found. Set CHROME_PATH to its executable.');
if (!existsSync(join(dist, 'index.html'))) throw new Error('Run `ng build` first (www/ is missing).');

const types = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.woff2': 'font/woff2', '.json': 'application/json',
};

const server = createServer((req, res) => {
  const path = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname));
  let file = join(dist, path.endsWith('/') ? `${path}index.html` : path);
  if (!file.startsWith(dist) || !existsSync(file)) file = join(dist, 'index.html');
  res.setHeader('Content-Type', types[extname(file)] ?? 'application/octet-stream');
  createReadStream(file).pipe(res);
});
await new Promise((resolve) => server.listen(0, resolve));
const base = `http://localhost:${server.address().port}`;

mkdirSync(out, { recursive: true });
const browser = await puppeteer.launch({ executablePath: chrome, headless: 'new' });
try {
  for (const lang of languages) {
    const page = await browser.newPage();
    await page.goto(`${base}/?cv=${lang}`, { waitUntil: 'networkidle0' });
    await page.evaluate(() => document.fonts.ready);
    const path = join(out, `Jaime-Lovera-CV-${lang}.pdf`);
    await page.pdf({
      path,
      format: 'A4',
      printBackground: true,
      // Explicit: Puppeteer's default (0) would override the CSS @page margins
      margin: { top: '13mm', bottom: '13mm', left: '15mm', right: '15mm' },
    });
    console.log(`✔ ${path}`);
    await page.close();
  }
} finally {
  await browser.close();
  server.close();
}

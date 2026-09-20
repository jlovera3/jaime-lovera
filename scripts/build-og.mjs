// Renders the social-sharing image (Open Graph / Twitter card, 1200×630) from scripts/og-template.html.
//   npm run og                       → src/assets/og/og-image.jpg
//   PHOTO=path/to/photo.jpg npm run og   → use a different portrait (a square-ish crop works best)
// Needs Google Chrome / Chromium; override its path with CHROME_PATH.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import puppeteer from 'puppeteer-core';

const root = fileURLToPath(new URL('..', import.meta.url));
const photo = resolve(process.env.PHOTO ?? join(root, 'src/assets/pictures/portrait.webp'));
const out = join(root, 'src/assets/og/og-image.jpg');

const chrome =
  process.env.CHROME_PATH ??
  [
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
  ].find(existsSync);
if (!chrome) throw new Error('Chrome not found. Set CHROME_PATH to its executable.');
if (!existsSync(photo)) throw new Error(`Photo not found: ${photo}`);

const html = readFileSync(join(root, 'scripts/og-template.html'), 'utf8').replace('{{PHOTO}}', pathToFileURL(photo).href);
// Written next to the template so its relative font URLs resolve
const page = join(root, 'scripts/.og-render.html');
writeFileSync(page, html);

mkdirSync(join(root, 'src/assets/og'), { recursive: true });
const browser = await puppeteer.launch({ executablePath: chrome, headless: 'new', args: ['--allow-file-access-from-files'] });
try {
  const tab = await browser.newPage();
  await tab.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
  await tab.goto(pathToFileURL(page).href, { waitUntil: 'networkidle0' });
  await tab.evaluate(() => document.fonts.ready);
  // JPEG keeps it well under the ~300 KB that WhatsApp and similar apps prefer
  await tab.screenshot({ path: out, type: 'jpeg', quality: 92 });
  console.log(`✔ ${out}`);
} finally {
  await browser.close();
}

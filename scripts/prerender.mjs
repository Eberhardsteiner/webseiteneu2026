// Vorab-Rendern (SSG) für die festen Routen.
// Läuft nach `vite build` (siehe package.json "build"):
//  1. baut src/entry-prerender.tsx als SSR-Bundle nach .prerender/,
//  2. rendert jede Route zu HTML (inkl. Helmet-Titel/Meta/Canonical/JSON-LD),
//  3. schreibt dist/index.html, dist/<route>/index.html und dist/404.html,
//  4. räumt .prerender/ wieder weg.
// Keine neuen Abhängigkeiten: nutzt Vite + react-dom/server aus dem Projekt.
import { execSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const ssrOutDir = join(root, '.prerender');

// Route -> Ausgabedatei relativ zu dist/
const ROUTES = [
  { path: '/', out: 'index.html' },
  { path: '/unternehmen', out: 'unternehmen/index.html' },
  { path: '/fuehrungskraeftequalifizierung', out: 'fuehrungskraeftequalifizierung/index.html' },
  { path: '/impressum', out: 'impressum/index.html' },
  { path: '/datenschutz', out: 'datenschutz/index.html' },
  // Unbekannter Pfad -> NotFoundPage; viele Static-Hosts liefern 404.html automatisch aus
  { path: '/__not_found__', out: '404.html' },
];

console.log('[prerender] SSR-Bundle bauen …');
execSync('npx vite build --ssr src/entry-prerender.tsx --outDir .prerender --emptyOutDir', {
  cwd: root,
  stdio: 'inherit',
});

const { render } = await import(pathToFileURL(join(ssrOutDir, 'entry-prerender.js')).href);
const template = readFileSync(join(root, 'dist', 'index.html'), 'utf8');

for (const { path, out } of ROUTES) {
  const { html, helmet } = render(path);

  const headTags = [
    helmet.title.toString(),
    helmet.meta.toString(),
    helmet.link.toString(),
    helmet.script.toString(),
  ]
    .filter(Boolean)
    .join('\n    ');

  let page = template
    // Fallback-<title> aus der Vorlage durch den Helmet-Titel ersetzen
    .replace(/<title>[\s\S]*?<\/title>/, headTags)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`);

  const target = join(root, 'dist', out);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, page);
  console.log(`[prerender] ${path} -> dist/${out} (${Math.round(page.length / 1024)} kB)`);
}

rmSync(ssrOutDir, { recursive: true, force: true });
console.log('[prerender] fertig.');

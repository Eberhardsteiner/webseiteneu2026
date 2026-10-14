// Prüft interne Links im Build: liest alle HTML-Dateien in dist, sammelt
// interne href-Ziele (beginnend mit "/", ohne "//") und prüft, dass jedes Ziel
// als Datei existiert (Verzeichnis -> index.html). Anker (#...) und
// Query-Strings werden für die Prüfung abgeschnitten.
// Aufruf nach dem Build: node scripts/links.mjs  (Exit-Code 1 bei kaputten Links)
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');

function htmlDateien(verzeichnis) {
  return readdirSync(verzeichnis).flatMap((name) => {
    const pfad = join(verzeichnis, name);
    if (statSync(pfad).isDirectory()) return htmlDateien(pfad);
    return name.endsWith('.html') ? [pfad] : [];
  });
}

function zielExistiert(href) {
  const pfad = decodeURI(href.split('#')[0].split('?')[0]);
  const ziel = join(dist, pfad);
  if (pfad.endsWith('/')) return existsSync(join(ziel, 'index.html'));
  if (existsSync(ziel) && statSync(ziel).isFile()) return true;
  return existsSync(join(ziel, 'index.html'));
}

const dateien = htmlDateien(dist);
const ziele = new Map(); // href -> Set der Dateien, in denen er vorkommt

for (const datei of dateien) {
  const html = readFileSync(datei, 'utf8');
  for (const treffer of html.matchAll(/href="([^"]*)"/g)) {
    const href = treffer[1].replace(/&amp;/g, '&');
    if (!href.startsWith('/') || href.startsWith('//')) continue;
    if (!ziele.has(href)) ziele.set(href, new Set());
    ziele.get(href).add(relative(dist, datei).replace(/\\/g, '/'));
  }
}

const kaputt = [...ziele.entries()].filter(([href]) => !zielExistiert(href));

console.log(`[links] ${dateien.length} HTML-Dateien, ${ziele.size} verschiedene interne Ziele geprüft.`);
for (const [href] of [...ziele.entries()].sort(([a], [b]) => a.localeCompare(b))) {
  console.log(`  ${zielExistiert(href) ? 'ok    ' : 'FEHLT '} ${href}`);
}
if (kaputt.length > 0) {
  console.log(`[links] ${kaputt.length} kaputte Links:`);
  for (const [href, quellen] of kaputt) console.log(`  ${href}  (in ${[...quellen].join(', ')})`);
  process.exit(1);
}
console.log('[links] 0 kaputte Links.');

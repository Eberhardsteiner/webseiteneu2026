// Deploy liegt im Domain-Root (www.uvm-consultinggroup.de/...). Wird sowohl als Router-basename
// (dort als '/' via BASE_PATH || '/') als auch als Präfix aller lokalen
// Bildpfade genutzt — immer beide Verwendungen gemeinsam ändern!
export const BASE_PATH = '';

// Alle Routen außer HOME enden mit Schrägstrich (so liefert der Server
// dist/<route>/index.html ohne Umleitung aus, und Canonical/Sitemap stimmen überein).
export const ROUTES = {
  HOME: '/',
  FUEHRUNGSKRAEFTEQUALIFIZIERUNG: '/fuehrungskraeftequalifizierung/',
  IMPRESSUM: '/impressum/',
  DATENSCHUTZ: '/datenschutz/',
  AKTUELLES: '/aktuelles/',
  VERWALTUNG: '/verwaltung/',
} as const;

export const SECTIONS = {
  MODELL: '#modell',
  PROZESS: '#prozess',
  LEISTUNGEN: '#leistungen',
  KONTAKT: '#kontakt',
} as const;

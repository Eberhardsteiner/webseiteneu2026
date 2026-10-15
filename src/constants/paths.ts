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
  LEISTUNGEN: '/leistungen/',
} as const;

export const ROUTES_LEISTUNGEN = {
  KI_STRATEGIE: '/leistungen/ki-strategie-und-digitalisierung/',
  CHANGE_MANAGEMENT: '/leistungen/change-management-und-unternehmenskultur/',
  CODE_OF_CONDUCT: '/leistungen/leadership-principles-und-code-of-conduct/',
  KOMPETENZMANAGEMENT: '/leistungen/kompetenzmanagement-und-future-skills/',
  FEMALE_LEADERSHIP: '/leistungen/female-leadership/',
  COACHING: '/leistungen/coaching-fuer-fuehrungskraefte/',
} as const;

export const SECTIONS = {
  ANSATZ: '#ansatz',
  PROZESS: '#prozess',
  LEISTUNGEN: '#leistungen',
  KONTAKT: '#kontakt',
} as const;

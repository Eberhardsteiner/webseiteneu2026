// Deploy liegt im Domain-Root (uvm-cg.de/...). Wird sowohl als Router-basename
// (dort als '/' via BASE_PATH || '/') als auch als Präfix aller lokalen
// Bildpfade genutzt — immer beide Verwendungen gemeinsam ändern!
export const BASE_PATH = '';

export const ROUTES = {
  HOME: '/',
  UNTERNEHMEN: '/unternehmen',
  FUEHRUNGSKRAEFTEQUALIFIZIERUNG: '/fuehrungskraeftequalifizierung',
  IMPRESSUM: '/impressum',
  DATENSCHUTZ: '/datenschutz',
} as const;

export const SECTIONS = {
  MODELL: '#modell',
  PROZESS: '#prozess',
  LEISTUNGEN: '#leistungen',
  KONTAKT: '#kontakt',
} as const;

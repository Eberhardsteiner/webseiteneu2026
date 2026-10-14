// Datentypen und Hilfsfunktionen für die Seite "Aktuelles".

export type AktuellesTyp =
  | 'linkedin'
  | 'podcast'
  | 'buch'
  | 'artikel'
  | 'video'
  | 'veranstaltung'
  | 'link';

export const TYPEN: AktuellesTyp[] = [
  'linkedin',
  'podcast',
  'buch',
  'artikel',
  'video',
  'veranstaltung',
  'link',
];

export const TYP_LABEL: Record<AktuellesTyp, string> = {
  linkedin: 'LinkedIn',
  podcast: 'Podcast',
  buch: 'Buch',
  artikel: 'Artikel',
  video: 'Video',
  veranstaltung: 'Veranstaltung',
  link: 'Link',
};

export const TYP_LINKTEXT: Record<AktuellesTyp, string> = {
  linkedin: 'Beitrag auf LinkedIn öffnen',
  podcast: 'Zum Podcast',
  buch: 'Zum Buch',
  artikel: 'Zum Artikel',
  video: 'Zum Video',
  veranstaltung: 'Zur Veranstaltung',
  link: 'Link öffnen',
};

export type Beitrag = {
  id: string;
  datum: string;
  typ: AktuellesTyp;
  titel: string;
  kurztext: string | null;
  url: string | null;
  bild_url: string | null;
  einbettung_url: string | null;
  veroeffentlicht: boolean;
  erstellt_von: string | null;
  erstellt_am: string;
  aktualisiert_am: string;
};

export type BeitragEingabe = Omit<Beitrag, 'id' | 'erstellt_am' | 'aktualisiert_am' | 'erstellt_von'>;

/**
 * Nur diese Anbieter dürfen als Einbettung (iframe) auf der Seite erscheinen.
 * Alles andere wird abgewiesen, auch wenn es in der Datenbank stünde.
 */
const EINBETTUNGS_ANBIETER: { host: string; name: string; hoehe: number }[] = [
  { host: 'www.linkedin.com', name: 'LinkedIn', hoehe: 560 },
  { host: 'open.spotify.com', name: 'Spotify', hoehe: 232 },
  { host: 'embed.podcasts.apple.com', name: 'Apple Podcasts', hoehe: 175 },
  { host: 'www.youtube-nocookie.com', name: 'YouTube', hoehe: 0 },
  { host: 'www.youtube.com', name: 'YouTube', hoehe: 0 },
  { host: 'player.vimeo.com', name: 'Vimeo', hoehe: 0 },
  { host: 'embed.podigee.io', name: 'Podigee', hoehe: 200 },
  { host: 'widget.deezer.com', name: 'Deezer', hoehe: 300 },
];

export function einbettungAnbieter(url: string): { name: string; hoehe: number } | null {
  try {
    const u = new URL(url);
    if (u.protocol !== 'https:') return null;
    const anbieter = EINBETTUNGS_ANBIETER.find((a) => a.host === u.hostname);
    return anbieter ? { name: anbieter.name, hoehe: anbieter.hoehe } : null;
  } catch {
    return null;
  }
}

/**
 * Macht aus der Eingabe im Verwaltungsformular eine geprüfte Einbettungs-URL.
 * Erlaubt sind:
 *  - der komplette Einbettungscode (<iframe src="…">) von LinkedIn, Spotify,
 *    Apple Podcasts, YouTube, Vimeo, Podigee oder Deezer,
 *  - eine direkte Einbettungs-URL dieser Anbieter,
 *  - ein normaler YouTube- oder Spotify-Link (wird umgewandelt).
 * Liefert null, wenn nichts Verwertbares erkannt wurde.
 */
export function einbettungsUrlAusEingabe(eingabe: string): string | null {
  const text = eingabe.trim();
  if (!text) return null;

  let kandidat = text;
  const iframeSrc = text.match(/<iframe[^>]*\ssrc=["']([^"']+)["']/i);
  if (iframeSrc) kandidat = iframeSrc[1];

  let u: URL;
  try {
    u = new URL(kandidat.replace(/&amp;/g, '&'));
  } catch {
    return null;
  }
  if (u.protocol !== 'https:') return null;

  // Normale Links in Einbettungs-Links umwandeln
  if (u.hostname === 'youtu.be') {
    const id = u.pathname.replace('/', '');
    return id ? `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}` : null;
  }
  if ((u.hostname === 'www.youtube.com' || u.hostname === 'youtube.com') && u.pathname === '/watch') {
    const id = u.searchParams.get('v');
    return id ? `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}` : null;
  }
  if (u.hostname === 'www.youtube.com' && u.pathname.startsWith('/embed/')) {
    return `https://www.youtube-nocookie.com${u.pathname}`;
  }
  if (u.hostname === 'open.spotify.com' && !u.pathname.startsWith('/embed/')) {
    const m = u.pathname.match(/^\/(?:intl-[a-z]{2}\/)?(episode|show|track|album)\/([A-Za-z0-9]+)/);
    return m ? `https://open.spotify.com/embed/${m[1]}/${m[2]}` : null;
  }
  if (u.hostname === 'www.linkedin.com' && !u.pathname.startsWith('/embed/')) {
    // Normale LinkedIn-Beitragslinks lassen sich nicht einbetten,
    // dafür ist der Einbettungscode ("Einbetten" am Beitrag) nötig.
    return null;
  }

  const anbieter = EINBETTUNGS_ANBIETER.find((a) => a.host === u.hostname);
  if (!anbieter) return null;
  u.hash = '';
  return u.toString();
}

export function datumFormatiert(isoDatum: string): string {
  const d = new Date(`${isoDatum}T00:00:00`);
  if (Number.isNaN(d.getTime())) return isoDatum;
  return new Intl.DateTimeFormat('de-DE', { day: '2-digit', month: 'long', year: 'numeric' }).format(d);
}

export function heuteIso(): string {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${mm}-${dd}`;
}

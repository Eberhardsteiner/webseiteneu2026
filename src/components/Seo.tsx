import { Helmet } from 'react-helmet-async';

export const SITE_URL = 'https://www.uvm-consultinggroup.de';

/** Absolute URL zu einem Pfad, immer mit abschließendem Schrägstrich (Startseite: SITE_URL + '/'). */
export function absoluteUrl(path: string): string {
  const mitSchraegstrich = path.endsWith('/') ? path : `${path}/`;
  return `${SITE_URL}${mitSchraegstrich}`;
}

type SeoProps = {
  title: string;
  description?: string;
  /** Pfad der Route (z. B. '/aktuelles/') für den Canonical-Link */
  canonicalPath?: string;
  /** Rechtstexte (Impressum/Datenschutz) sollen nicht ranken */
  noindex?: boolean;
};

export default function Seo({ title, description, canonicalPath, noindex = false }: SeoProps) {
  const canonical = canonicalPath !== undefined ? absoluteUrl(canonicalPath) : undefined;

  return (
    // defer={false}: Head-Tags synchron setzen statt per requestAnimationFrame
    // (sonst bleibt in Hintergrund-Tabs der Fallback-Titel stehen)
    <Helmet defer={false}>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      {canonical && <meta property="og:url" content={canonical} />}
      {canonical && <link rel="canonical" href={canonical} />}
      {noindex && <meta name="robots" content="noindex, follow" />}
    </Helmet>
  );
}

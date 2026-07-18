import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://uvm-cg.de';

type SeoProps = {
  title: string;
  description?: string;
  /** Pfad der Route (z. B. '/unternehmen') für den Canonical-Link */
  canonicalPath?: string;
  /** Rechtstexte (Impressum/Datenschutz) sollen nicht ranken */
  noindex?: boolean;
};

export default function Seo({ title, description, canonicalPath, noindex = false }: SeoProps) {
  return (
    // defer={false}: Head-Tags synchron setzen statt per requestAnimationFrame
    // (sonst bleibt in Hintergrund-Tabs der Fallback-Titel stehen)
    <Helmet defer={false}>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      {canonicalPath !== undefined && (
        <link rel="canonical" href={`${SITE_URL}${canonicalPath === '/' ? '/' : canonicalPath}`} />
      )}
      {noindex && <meta name="robots" content="noindex, follow" />}
    </Helmet>
  );
}

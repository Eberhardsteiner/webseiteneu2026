import { Helmet } from 'react-helmet-async';

type SeoProps = {
  title: string;
  description?: string;
  /** Rechtstexte (Impressum/Datenschutz) sollen nicht ranken */
  noindex?: boolean;
};

export default function Seo({ title, description, noindex = false }: SeoProps) {
  return (
    // defer={false}: Head-Tags synchron setzen statt per requestAnimationFrame
    // (sonst bleibt in Hintergrund-Tabs der Fallback-Titel stehen)
    <Helmet defer={false}>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      {noindex && <meta name="robots" content="noindex, follow" />}
    </Helmet>
  );
}

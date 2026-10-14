import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ChevronRight, Mail, Phone } from 'lucide-react';

import Header from './Header';
import Footer from './Footer';
import Seo, { SITE_URL, absoluteUrl } from './Seo';
import { ROUTES } from '../constants/paths';
import {
  FORMATE,
  LEISTUNGSSEITEN,
  LEISTUNGSSEITEN_REIHENFOLGE,
  quadrants,
  type Format,
  type LeistungsseitenKey,
  type Produkt,
  type Thema,
} from '../data/leistungen';

export type Brotkrume = { label: string; pfad: string };

/** Sichtbare Brotkrumen-Navigation plus JSON-LD BreadcrumbList mit absoluten URLs. */
export function Brotkrumen({ items }: { items: Brotkrume[] }) {
  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: absoluteUrl(item.pfad),
    })),
  });

  return (
    <>
      <Helmet defer={false}>
        <script type="application/ld+json">{jsonLd}</script>
      </Helmet>
      <nav aria-label="Brotkrumen" className="text-sm text-gray-600">
        <ol className="flex flex-wrap items-center gap-1">
          {items.map((item, index) => {
            const aktuell = index === items.length - 1;
            return (
              <li key={item.pfad} className="flex items-center gap-1">
                {index > 0 && <ChevronRight size={14} className="text-gray-400" aria-hidden="true" />}
                {aktuell ? (
                  <span aria-current="page" className="font-medium text-gray-900">
                    {item.label}
                  </span>
                ) : (
                  <Link to={item.pfad} className="hover:text-violet-700 transition-colors">
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}

export const BROTKRUME_STARTSEITE: Brotkrume = { label: 'Startseite', pfad: ROUTES.HOME };
export const BROTKRUME_LEISTUNGEN: Brotkrume = { label: 'Leistungen', pfad: ROUTES.LEISTUNGEN };

/** Abschlussblock "Unverbindliches Erstgespräch", gestaltet wie der Kontaktblock der Führungskräfteseite. */
export function Erstgespraech() {
  return (
    <div className="mt-12 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 md:p-10 text-white">
      <h2 className="text-2xl font-bold">Unverbindliches Erstgespräch</h2>
      <p className="mt-3 text-base text-white/90 leading-relaxed max-w-2xl">
        In 30 Minuten verstehen wir Ihre Ausgangslage und sagen Ihnen, ob und wie wir helfen können.
      </p>
      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <a
          href="mailto:info@uvm-cg.de"
          className="inline-flex items-center justify-center gap-2 bg-white text-primary-700 px-6 py-3 rounded-lg text-base font-medium hover:bg-primary-50 transition-colors"
        >
          <Mail size={18} />
          info@uvm-cg.de
        </a>
        <a
          href="tel:+498915900075"
          className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-lg text-base font-medium hover:bg-white/20 transition-colors"
        >
          <Phone size={18} />
          +49 89 15 9000 75
        </a>
      </div>
    </div>
  );
}

/** Link-Stil für externe Hinweise auf den Leistungsseiten */
export const linkKlasse = 'text-primary-600 hover:text-primary-700 underline font-medium';

function ProduktBeschreibung({ produkt }: { produkt: Produkt }) {
  const absaetze = Array.isArray(produkt.description) ? produkt.description : [produkt.description];
  return (
    <div className="mt-4 space-y-4 text-base text-gray-700 leading-relaxed">
      {absaetze.map((absatz, index) =>
        // Nicht-Text-Bausteine (z. B. Buchcover) enthalten Blockelemente und dürfen nicht in <p> stehen
        typeof absatz === 'string' ? <p key={index}>{absatz}</p> : <div key={index}>{absatz}</div>
      )}
    </div>
  );
}

type LeistungsseiteLayoutProps = {
  seite: LeistungsseitenKey;
  /** Zugeordnetes Thema aus dem aufklappbaren Bereich der Startseite */
  thema?: Thema;
  /** Alternativ zum Thema: zugeordneter Format-Text (Coaching-Seite) */
  format?: Format;
  /** Zusätzlicher Inhalt unter einzelnen Produkten, Schlüssel = Produktname */
  produktZusatz?: Record<string, ReactNode>;
  nachEinleitung?: ReactNode;
  nachProdukten?: ReactNode;
  nachThema?: ReactNode;
};

export default function LeistungsseiteLayout({
  seite,
  thema,
  format,
  produktZusatz = {},
  nachEinleitung,
  nachProdukten,
  nachThema,
}: LeistungsseiteLayoutProps) {
  const daten = LEISTUNGSSEITEN[seite];
  const quadrant = quadrants.find((q) => q.slug === daten.pfad);
  const canonical = absoluteUrl(daten.pfad);

  const serviceJsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: daten.h1,
    description: daten.description,
    url: canonical,
    provider: { '@type': 'Organization', name: 'UVM Consulting Group', url: SITE_URL },
    areaServed: 'DE',
  });

  const verwandte: Brotkrume[] = LEISTUNGSSEITEN_REIHENFOLGE.filter((key) => key !== seite).map((key) => ({
    label: LEISTUNGSSEITEN[key].h1,
    pfad: LEISTUNGSSEITEN[key].pfad,
  }));
  verwandte.push({ label: 'Führungskräftequalifizierung', pfad: ROUTES.FUEHRUNGSKRAEFTEQUALIFIZIERUNG });

  return (
    <div className="min-h-screen bg-white">
      <Seo title={daten.title} description={daten.description} canonicalPath={daten.pfad} />
      <Helmet defer={false}>
        <script type="application/ld+json">{serviceJsonLd}</script>
      </Helmet>
      <Header />

      <main id="main-content" className="pt-16 md:pt-20">
        <section className="py-16 md:py-20 bg-gradient-to-br from-violet-50 to-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <Brotkrumen items={[BROTKRUME_STARTSEITE, BROTKRUME_LEISTUNGEN, { label: daten.h1, pfad: daten.pfad }]} />

            <h1 className="mt-8 text-4xl md:text-5xl font-bold text-gray-900">{daten.h1}</h1>
            {daten.einleitung.map((absatz, index) => (
              <p key={index} className="mt-4 text-lg text-gray-700 leading-relaxed">
                {absatz}
              </p>
            ))}
            {nachEinleitung}

            {quadrant && (
              <div className="mt-12">
                <p className="text-sm font-bold uppercase tracking-[0.15em] text-[#4E9188]">Was wir anbieten</p>
                <div className="mt-4 space-y-5">
                  {quadrant.products.map((produkt) => (
                    <article
                      key={produkt.name}
                      className="bg-white rounded-2xl border border-[rgba(78,145,136,0.24)] shadow-sm p-6 md:p-8"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-[rgba(78,145,136,0.12)]">
                          <produkt.icon size={20} className="text-[#4E9188]" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-[#233238]">{produkt.name}</h2>
                      </div>
                      <ProduktBeschreibung produkt={produkt} />
                      {produktZusatz[produkt.name]}
                    </article>
                  ))}
                </div>
              </div>
            )}
            {nachProdukten}

            {thema && (
              <div className="mt-12 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{thema.titel}</h2>
                <p className="mt-3 text-lg italic text-gray-600 leading-relaxed">{thema.frage}</p>
                {thema.absaetze.map((absatz, index) => (
                  <p key={index} className="mt-3 text-base text-gray-700 leading-relaxed">
                    {absatz}
                  </p>
                ))}
              </div>
            )}
            {format && (
              <div className="mt-12 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{format.titel}</h2>
                <p className="mt-3 text-base text-gray-700 leading-relaxed">{format.text}</p>
              </div>
            )}
            {nachThema}

            <div className="mt-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">So arbeiten wir mit Ihnen</h2>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                {FORMATE.map((f) => (
                  <div key={f.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <h3 className="text-xl font-bold text-gray-900">{f.titel}</h3>
                    <p className="mt-2 text-base text-gray-700 leading-relaxed">{f.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Verwandte Leistungen</h2>
              <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {verwandte.map((v) => (
                  <li key={v.pfad}>
                    <Link
                      to={v.pfad}
                      className="flex items-center justify-between gap-3 bg-white rounded-xl border border-gray-100 shadow-sm px-5 py-4 text-base font-medium text-gray-900 hover:border-violet-200 hover:text-violet-700 transition-colors"
                    >
                      {v.label}
                      <ChevronRight size={18} className="flex-shrink-0 text-gray-400" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <Erstgespraech />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

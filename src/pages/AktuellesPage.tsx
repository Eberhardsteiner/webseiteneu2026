import { useEffect, useMemo, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Seo from '../components/Seo';
import Einbettung from '../components/Einbettung';
import { getSupabase, supabaseKonfiguriert } from '../lib/supabase';
import {
  TYPEN,
  TYP_LABEL,
  TYP_LINKTEXT,
  datumFormatiert,
  type AktuellesTyp,
  type Beitrag,
} from '../lib/aktuelles';

type Ladezustand = 'laedt' | 'fertig' | 'fehler';

const GRUPPEN_TITEL: Record<AktuellesTyp, string> = {
  linkedin: 'LinkedIn-Beiträge',
  podcast: 'Podcasts',
  buch: 'Bücher',
  artikel: 'Artikel',
  video: 'Videos',
  veranstaltung: 'Veranstaltungen',
  link: 'Links',
};

const TYP_FARBE: Record<AktuellesTyp, string> = {
  linkedin: 'bg-sky-100 text-sky-800',
  podcast: 'bg-violet-100 text-violet-800',
  buch: 'bg-amber-100 text-amber-800',
  artikel: 'bg-emerald-100 text-emerald-800',
  video: 'bg-rose-100 text-rose-800',
  veranstaltung: 'bg-teal-100 text-teal-800',
  link: 'bg-gray-100 text-gray-800',
};

export default function AktuellesPage() {
  const [beitraege, setBeitraege] = useState<Beitrag[]>([]);
  const [zustand, setZustand] = useState<Ladezustand>('laedt');

  useEffect(() => {
    let aktiv = true;
    if (!supabaseKonfiguriert) {
      setZustand('fehler');
      return;
    }
    getSupabase()
      .from('aktuelles')
      .select('*')
      .eq('veroeffentlicht', true)
      .order('datum', { ascending: false })
      .order('erstellt_am', { ascending: false })
      .then(({ data, error }) => {
        if (!aktiv) return;
        if (error) {
          console.error('[aktuelles] Laden fehlgeschlagen:', error.message);
          setZustand('fehler');
          return;
        }
        setBeitraege((data ?? []) as Beitrag[]);
        setZustand('fertig');
      });
    return () => {
      aktiv = false;
    };
  }, []);

  // Feste Reihenfolge der Gruppen: LinkedIn, Podcasts, Bücher, Artikel, Videos,
  // Veranstaltungen, Links. Innerhalb einer Gruppe neueste zuerst (Sortierung
  // kommt bereits so aus der Datenbank). Leere Gruppen werden nicht gezeigt.
  const gruppen = useMemo(
    () =>
      TYPEN.map((typ) => ({ typ, beitraege: beitraege.filter((b) => b.typ === typ) })).filter(
        (g) => g.beitraege.length > 0
      ),
    [beitraege]
  );

  return (
    <div className="min-h-screen bg-white">
      <Seo
        title="Aktuelles – UVM Consulting Group"
        canonicalPath="/aktuelles"
        description="Aktuelle Beiträge der UVM Consulting Group: LinkedIn-Beiträge, Podcasts, Bücher, Artikel und Veranstaltungen zu Führung, Organisation und Strategie."
      />
      <Header />
      <main id="main-content" className="pt-16 md:pt-20">
        <section className="bg-gray-50 py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Aktuelles</h1>
            <p className="mt-4 max-w-2xl text-base md:text-lg text-gray-700 leading-relaxed">
              Beiträge, Podcasts, Bücher und Veranstaltungen der UVM Consulting Group.
            </p>

            {gruppen.length > 1 && (
              <nav className="mt-8 flex flex-wrap gap-2" aria-label="Zu einer Gruppe springen">
                {gruppen.map((g) => (
                  <a
                    key={g.typ}
                    href={`#${g.typ}`}
                    className="px-4 py-2 rounded-full text-sm font-medium bg-white text-gray-700 border border-gray-300 hover:border-primary-500 hover:text-primary-600 transition-colors"
                  >
                    {GRUPPEN_TITEL[g.typ]} ({g.beitraege.length})
                  </a>
                ))}
              </nav>
            )}
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {zustand === 'laedt' && (
              <p className="text-base text-gray-600" aria-live="polite">
                Beiträge werden geladen …
              </p>
            )}
            {zustand === 'fehler' && (
              <p className="text-base text-gray-600" aria-live="polite">
                Die Beiträge können gerade nicht geladen werden. Bitte versuchen Sie es später noch einmal.
              </p>
            )}
            {zustand === 'fertig' && gruppen.length === 0 && (
              <p className="text-base text-gray-600">Derzeit liegen keine Beiträge vor.</p>
            )}
            {zustand === 'fertig' && gruppen.length > 0 && (
              <div className="space-y-16">
                {gruppen.map((g) => (
                  <section key={g.typ} id={g.typ} aria-labelledby={`${g.typ}-titel`} className="scroll-mt-24 md:scroll-mt-28">
                    <h2 id={`${g.typ}-titel`} className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-200">
                      {GRUPPEN_TITEL[g.typ]}
                    </h2>
                    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                      {g.beitraege.map((b) => (
                        <BeitragKarte key={b.id} beitrag={b} />
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function BeitragKarte({ beitrag }: { beitrag: Beitrag }) {
  const b = beitrag;
  return (
    <article className="flex flex-col bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {b.bild_url && (
        <a href={b.url ?? b.bild_url} target="_blank" rel="noopener noreferrer" className="block bg-gray-100">
          <img
            src={b.bild_url}
            alt=""
            loading="lazy"
            className="w-full h-52 object-cover"
          />
        </a>
      )}
      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-center justify-between gap-3 mb-3">
          <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${TYP_FARBE[b.typ]}`}>
            {TYP_LABEL[b.typ]}
          </span>
          <time dateTime={b.datum} className="text-sm text-gray-500">
            {datumFormatiert(b.datum)}
          </time>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 leading-snug">
          {b.url ? (
            <a href={b.url} target="_blank" rel="noopener noreferrer" className="hover:text-primary-600 transition-colors">
              {b.titel}
            </a>
          ) : (
            b.titel
          )}
        </h3>
        {b.kurztext && (
          <p className="mt-3 text-base text-gray-700 leading-relaxed whitespace-pre-line">{b.kurztext}</p>
        )}
        {b.einbettung_url && (
          <div className="mt-4">
            <Einbettung url={b.einbettung_url} titel={b.titel} />
          </div>
        )}
        {b.url && (
          <div className="mt-auto pt-5">
            <a
              href={b.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-base font-medium text-primary-600 hover:text-primary-700 transition-colors"
            >
              {TYP_LINKTEXT[b.typ]}
              <ExternalLink size={16} />
            </a>
          </div>
        )}
      </div>
    </article>
  );
}

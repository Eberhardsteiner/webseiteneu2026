import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Seo from '../../components/Seo';
import {
  BROTKRUME_LEISTUNGEN,
  BROTKRUME_STARTSEITE,
  Brotkrumen,
  Erstgespraech,
} from '../../components/LeistungsseiteLayout';
import { ROUTES } from '../../constants/paths';
import {
  FUEHRUNGSKRAEFTE_EINLEITUNG,
  LEISTUNGEN_EINLEITUNG,
  LEISTUNGSSEITEN,
  LEISTUNGSSEITEN_REIHENFOLGE,
} from '../../data/leistungen';

const kacheln = [
  ...LEISTUNGSSEITEN_REIHENFOLGE.map((key) => ({
    titel: LEISTUNGSSEITEN[key].h1,
    text: LEISTUNGSSEITEN[key].kurztext,
    pfad: LEISTUNGSSEITEN[key].pfad,
  })),
  {
    titel: 'Führungskräftequalifizierung',
    text: FUEHRUNGSKRAEFTE_EINLEITUNG,
    pfad: ROUTES.FUEHRUNGSKRAEFTEQUALIFIZIERUNG,
  },
];

export default function LeistungenPage() {
  return (
    <div className="min-h-screen bg-white">
      <Seo
        title="Leistungen – UVM Consulting Group"
        canonicalPath={ROUTES.LEISTUNGEN}
        description="Beratung an der Schnittstelle von Ökonomie und Psychologie: KI-Strategie, Change Management, Code of Conduct, Kompetenzmanagement, Female Leadership, Coaching."
      />
      <Header />

      <main id="main-content" className="pt-16 md:pt-20">
        <section className="py-16 md:py-20 bg-gradient-to-br from-violet-50 to-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <Brotkrumen items={[BROTKRUME_STARTSEITE, BROTKRUME_LEISTUNGEN]} />

            <h1 className="mt-8 text-4xl md:text-5xl font-bold text-gray-900">Leistungen der UVM Consulting Group</h1>
            <p className="mt-4 text-lg text-gray-700 leading-relaxed">{LEISTUNGEN_EINLEITUNG}</p>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5">
              {kacheln.map((kachel) => (
                <div
                  key={kachel.pfad}
                  className="flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-7"
                >
                  <h2 className="text-2xl font-bold text-gray-900">{kachel.titel}</h2>
                  <p className="mt-3 flex-1 text-base text-gray-700 leading-relaxed">{kachel.text}</p>
                  <Link
                    to={kachel.pfad}
                    className="mt-5 inline-flex items-center gap-2 text-base font-medium text-primary-600 hover:text-primary-700 transition-colors"
                    aria-label={`Mehr erfahren: ${kachel.titel}`}
                  >
                    Mehr erfahren
                    <ArrowRight size={18} />
                  </Link>
                </div>
              ))}
            </div>

            <Erstgespraech />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

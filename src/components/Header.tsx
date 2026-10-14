import { useState, useEffect, useRef, type RefObject } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES, ROUTES_LEISTUNGEN } from '../constants/paths';
import logoImage from '../assets/UVM_Institut_HighRes.png';

type MenuEintrag = { label: string; href: string };
type Aufklappmenue = 'unternehmen' | 'leistungen';

// Anker auf der Startseite als normale <a>-Links, damit die Startseite
// vollständig geladen wird und der Browser zum Anker springt.
const unternehmenItems: MenuEintrag[] = [
  { label: 'UVM Consulting Group', href: `${ROUTES.HOME}#uvm-consulting` },
  { label: 'Geschäftsführung', href: `${ROUTES.HOME}#geschaeftsfuehrung` },
  { label: 'Werte und Haltung', href: `${ROUTES.HOME}#werte` },
  { label: 'Netzwerk', href: `${ROUTES.HOME}#netzwerk` },
  { label: 'Referenzen', href: `${ROUTES.HOME}#referenzen` },
  { label: 'Publikationen', href: `${ROUTES.HOME}#publikationen` },
];

const leistungenItems: MenuEintrag[] = [
  { label: 'Alle Leistungen', href: ROUTES.LEISTUNGEN },
  { label: 'KI-Strategie und Digitalisierung', href: ROUTES_LEISTUNGEN.KI_STRATEGIE },
  { label: 'Change Management und Unternehmenskultur', href: ROUTES_LEISTUNGEN.CHANGE_MANAGEMENT },
  { label: 'Leadership Principles und Code of Conduct', href: ROUTES_LEISTUNGEN.CODE_OF_CONDUCT },
  { label: 'Kompetenzmanagement und Future Skills', href: ROUTES_LEISTUNGEN.KOMPETENZMANAGEMENT },
  { label: 'Female Leadership', href: ROUTES_LEISTUNGEN.FEMALE_LEADERSHIP },
  { label: 'Coaching für Führungskräfte', href: ROUTES_LEISTUNGEN.COACHING },
  { label: 'Führungskräftequalifizierung', href: ROUTES.FUEHRUNGSKRAEFTEQUALIFIZIERUNG },
];

const KONTAKT_HREF = `${ROUTES.HOME}#kontakt`;

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [offenesMenue, setOffenesMenue] = useState<Aufklappmenue | null>(null);
  const unternehmenRef = useRef<HTMLDivElement>(null);
  const leistungenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      setOffenesMenue(null);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const ziel = event.target as Node;
      if (!unternehmenRef.current?.contains(ziel) && !leistungenRef.current?.contains(ziel)) {
        setOffenesMenue(null);
      }
    };

    if (offenesMenue && !isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [offenesMenue, isOpen]);

  const umschalten = (menue: Aufklappmenue) =>
    setOffenesMenue((aktuell) => (aktuell === menue ? null : menue));

  const desktopMenue = (
    menue: Aufklappmenue,
    label: string,
    items: MenuEintrag[],
    ref: RefObject<HTMLDivElement>,
    alsRouterLink: boolean
  ) => (
    <div className="relative" ref={ref}>
      <button
        type="button"
        aria-expanded={offenesMenue === menue}
        aria-haspopup="true"
        onClick={() => umschalten(menue)}
        className="flex items-center gap-1 text-base text-gray-700 hover:text-primary-500 transition-colors font-medium"
      >
        {label}
        <ChevronDown size={16} className={`transition-transform ${offenesMenue === menue ? 'rotate-180' : ''}`} />
      </button>

      {offenesMenue === menue && (
        <div className="absolute top-full left-0 pt-1 w-72">
          <div className="bg-white rounded-lg shadow-xl border border-slate-200/60 py-2">
            {items.map((item) =>
              alsRouterLink ? (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setOffenesMenue(null)}
                  className="block px-4 py-3 text-sm text-gray-700 hover:text-primary-500 hover:bg-primary-50 transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOffenesMenue(null)}
                  className="block px-4 py-3 text-sm text-gray-700 hover:text-primary-500 hover:bg-primary-50 transition-colors"
                >
                  {item.label}
                </a>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );

  const mobilesMenue = (menue: Aufklappmenue, label: string, items: MenuEintrag[], alsRouterLink: boolean) => (
    <div>
      <button
        type="button"
        aria-expanded={offenesMenue === menue}
        onClick={() => umschalten(menue)}
        className="w-full flex items-center justify-between py-3 text-base text-gray-700 hover:text-primary-500 transition-colors font-medium"
      >
        {label}
        <ChevronDown size={16} className={`transition-transform ${offenesMenue === menue ? 'rotate-180' : ''}`} />
      </button>
      {offenesMenue === menue && (
        <div className="pl-4 space-y-2">
          {items.map((item) =>
            alsRouterLink ? (
              <Link
                key={item.href}
                to={item.href}
                className="block py-2 text-sm text-gray-600 hover:text-primary-500 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.href}
                href={item.href}
                className="block py-2 text-sm text-gray-600 hover:text-primary-500 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            )
          )}
        </div>
      )}
    </div>
  );

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary-500 focus:text-white focus:text-base focus:rounded-lg focus:shadow-lg"
      >
        Zum Hauptinhalt springen
      </a>
      <header className="fixed top-0 left-0 right-0 bg-white/92 backdrop-blur-md z-50 border-b border-slate-200/60 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 min-h-[64px] md:min-h-[80px]">
          <Link to={ROUTES.HOME} className="flex items-center">
            <img
              src={logoImage}
              alt="Logo des UVM-Instituts"
              width={2101}
              height={650}
              className="h-12 md:h-14 w-auto object-contain"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {desktopMenue('unternehmen', 'Unternehmen', unternehmenItems, unternehmenRef, false)}

            <a
              href={`${ROUTES.HOME}#ansatz`}
              className="text-base text-gray-700 hover:text-primary-500 transition-colors font-medium whitespace-nowrap"
            >
              Beratungsansatz
            </a>

            {desktopMenue('leistungen', 'Leistungen', leistungenItems, leistungenRef, true)}

            <Link
              to={ROUTES.AKTUELLES}
              className="text-base transition-colors font-medium whitespace-nowrap text-primary-600 hover:text-primary-700 border-b-2 border-primary-500/50 pb-0.5"
            >
              Aktuelles
            </Link>

            <a
              href={KONTAKT_HREF}
              className="text-base text-gray-700 hover:text-primary-500 transition-colors font-medium whitespace-nowrap"
            >
              Kontakt
            </a>

            <a
              href={KONTAKT_HREF}
              className="bg-primary-500 text-white px-5 py-2.5 rounded-lg text-base hover:bg-primary-600 transition-colors font-medium whitespace-nowrap"
            >
              Gespräch starten
            </a>
          </nav>

          <button
            className="md:hidden p-2 text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <nav className="md:hidden py-4 border-t border-slate-200/60 bg-white/95">
            {mobilesMenue('unternehmen', 'Unternehmen', unternehmenItems, false)}

            <a
              href={`${ROUTES.HOME}#ansatz`}
              className="block py-3 text-base text-gray-700 hover:text-primary-500 transition-colors font-medium"
              onClick={() => setIsOpen(false)}
            >
              Beratungsansatz
            </a>

            {mobilesMenue('leistungen', 'Leistungen', leistungenItems, true)}

            <Link
              to={ROUTES.AKTUELLES}
              className="block py-3 text-base text-gray-700 hover:text-primary-500 transition-colors font-medium"
              onClick={() => setIsOpen(false)}
            >
              Aktuelles
            </Link>

            <a
              href={KONTAKT_HREF}
              className="block py-3 text-base text-gray-700 hover:text-primary-500 transition-colors font-medium"
              onClick={() => setIsOpen(false)}
            >
              Kontakt
            </a>

            <a
              href={KONTAKT_HREF}
              className="block mt-4 bg-primary-500 text-white px-5 py-2.5 rounded-lg text-base hover:bg-primary-600 transition-colors font-medium text-center"
              onClick={() => setIsOpen(false)}
            >
              Gespräch starten
            </a>
          </nav>
        )}
      </div>
    </header>
    </>
  );
}

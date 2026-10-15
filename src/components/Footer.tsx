import { Linkedin, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES, ROUTES_LEISTUNGEN, SECTIONS } from '../constants/paths';

const leistungsLinks = [
  { label: 'KI-Strategie und Digitalisierung', pfad: ROUTES_LEISTUNGEN.KI_STRATEGIE },
  { label: 'Change Management und Unternehmenskultur', pfad: ROUTES_LEISTUNGEN.CHANGE_MANAGEMENT },
  { label: 'Leadership Principles und Code of Conduct', pfad: ROUTES_LEISTUNGEN.CODE_OF_CONDUCT },
  { label: 'Kompetenzmanagement und Future Skills', pfad: ROUTES_LEISTUNGEN.KOMPETENZMANAGEMENT },
  { label: 'Female Leadership', pfad: ROUTES_LEISTUNGEN.FEMALE_LEADERSHIP },
  { label: 'Coaching für Führungskräfte', pfad: ROUTES_LEISTUNGEN.COACHING },
  { label: 'Führungskräftequalifizierung', pfad: ROUTES.FUEHRUNGSKRAEFTEQUALIFIZIERUNG },
];

export default function Footer() {
  return (
    <footer className="bg-[#101420] text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">
              UVM <span className="font-normal">Consulting Group</span>
            </h3>
            <p className="text-base text-gray-400 mb-4 max-w-md">
              Wissenschaftlich fundiert. Praktisch erprobt. Wir befähigen Organisationen,
              zukunftsfähig zu werden.
            </p>
            <p className="text-sm text-gray-400 mb-4">
              Seminare und Programme:{' '}
              <a
                href="https://uvm-akademie.de/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-primary-400 transition-colors"
              >
                uvm-akademie.de
              </a>
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.linkedin.com/company/uvm-consulting"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary-500 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="mailto:info@uvm-cg.de"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary-500 transition-colors"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
              <a
                href="tel:+498915900075"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary-500 transition-colors"
                aria-label="Phone"
              >
                <Phone size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-4">4C-Modell</h4>
            {/* Normale <a>-Links: Die Startseite lädt vollständig und der Browser springt zum Anker
                (ein React-Router-Link ändert nur die Adresse und bleibt oben auf der Seite) */}
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href={`${ROUTES.HOME}${SECTIONS.ANSATZ}`} className="inline-block py-1 text-sm hover:text-primary-400 transition-colors">Culture</a>
              </li>
              <li>
                <a href={`${ROUTES.HOME}${SECTIONS.ANSATZ}`} className="inline-block py-1 text-sm hover:text-primary-400 transition-colors">Competences</a>
              </li>
              <li>
                <a href={`${ROUTES.HOME}${SECTIONS.ANSATZ}`} className="inline-block py-1 text-sm hover:text-primary-400 transition-colors">Code of Conduct</a>
              </li>
              <li>
                <a href={`${ROUTES.HOME}${SECTIONS.ANSATZ}`} className="inline-block py-1 text-sm hover:text-primary-400 transition-colors">Corporate Strategy</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-4">Leistungen</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {leistungsLinks.map((link) => (
                <li key={link.pfad}>
                  <Link to={link.pfad} className="inline-block py-1 text-sm hover:text-primary-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            2026 UVM Consulting Group. Alle Rechte vorbehalten.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link to={ROUTES.AKTUELLES} className="inline-block py-1 text-sm hover:text-primary-400 transition-colors">Aktuelles</Link>
            <Link to={ROUTES.IMPRESSUM} className="inline-block py-1 text-sm hover:text-primary-400 transition-colors">Impressum</Link>
            <Link to={ROUTES.DATENSCHUTZ} className="inline-block py-1 text-sm hover:text-primary-400 transition-colors">Datenschutz</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

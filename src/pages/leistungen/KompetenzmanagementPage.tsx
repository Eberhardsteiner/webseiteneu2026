import { Link } from 'react-router-dom';
import LeistungsseiteLayout, { linkKlasse } from '../../components/LeistungsseiteLayout';
import { ROUTES } from '../../constants/paths';

export default function KompetenzmanagementPage() {
  return (
    <LeistungsseiteLayout
      seite="KOMPETENZMANAGEMENT"
      produktZusatz={{
        Führungskräftequalifizierung: (
          <p className="mt-4 text-base">
            <Link to={ROUTES.FUEHRUNGSKRAEFTEQUALIFIZIERUNG} className={linkKlasse}>
              Zu den Qualifizierungsmodulen
            </Link>
          </p>
        ),
      }}
      nachProdukten={
        <div className="mt-12 bg-violet-50 rounded-2xl border border-violet-100 p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Seminare und Programme der UVM-Akademie</h2>
          <p className="mt-3 text-base text-gray-700 leading-relaxed">
            Unsere offenen und firmeninternen Seminare, Führungsprogramme und E-Learning-Angebote bündeln wir in der
            UVM-Akademie.
          </p>
          <p className="mt-4 text-base">
            <a href="https://uvm-akademie.de/" target="_blank" rel="noopener" className={linkKlasse}>
              Zur UVM-Akademie
            </a>
          </p>
        </div>
      }
    />
  );
}

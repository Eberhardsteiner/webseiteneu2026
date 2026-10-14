import LeistungsseiteLayout, { linkKlasse } from '../../components/LeistungsseiteLayout';
import { ROUTES } from '../../constants/paths';
import { themaNachId } from '../../data/leistungen';

export default function FemaleLeadershipPage() {
  return (
    <LeistungsseiteLayout
      seite="FEMALE_LEADERSHIP"
      thema={themaNachId('intro-female-leadership')}
      nachEinleitung={
        <p className="mt-4 text-base">
          {/* normales <a>, damit die Startseite vollständig lädt und zum Anker springt */}
          <a href={`${ROUTES.HOME}#geschaeftsfuehrung`} className={linkKlasse}>
            Zur Geschäftsführung
          </a>
        </p>
      }
    />
  );
}

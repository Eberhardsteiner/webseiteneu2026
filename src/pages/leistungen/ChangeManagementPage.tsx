import LeistungsseiteLayout, { linkKlasse } from '../../components/LeistungsseiteLayout';
import { themaNachId } from '../../data/leistungen';

export default function ChangeManagementPage() {
  return (
    <LeistungsseiteLayout
      seite="CHANGE_MANAGEMENT"
      thema={themaNachId('intro-disruption')}
      produktZusatz={{
        'Zertifikat „Empfehlenswerter Arbeitgeber"': (
          <p className="mt-4 text-base">
            <a
              href="https://www.empfehlenswerter-arbeitgeber.de"
              target="_blank"
              rel="noopener"
              className={linkKlasse}
            >
              Zur Zertifizierung
            </a>
          </p>
        ),
      }}
    />
  );
}

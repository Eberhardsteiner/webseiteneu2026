import LeistungsseiteLayout from '../../components/LeistungsseiteLayout';
import { themaNachId } from '../../data/leistungen';

export default function KiStrategiePage() {
  return <LeistungsseiteLayout seite="KI_STRATEGIE" thema={themaNachId('intro-trust-ki')} />;
}

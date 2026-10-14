import LeistungsseiteLayout from '../../components/LeistungsseiteLayout';
import { themaNachId } from '../../data/leistungen';

export default function CodeOfConductPage() {
  return <LeistungsseiteLayout seite="CODE_OF_CONDUCT" thema={themaNachId('intro-trustful-leadership')} />;
}

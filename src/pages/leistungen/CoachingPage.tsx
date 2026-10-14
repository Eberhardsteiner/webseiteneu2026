import LeistungsseiteLayout, { linkKlasse } from '../../components/LeistungsseiteLayout';
import { formatNachId } from '../../data/leistungen';

export default function CoachingPage() {
  return (
    <LeistungsseiteLayout
      seite="COACHING"
      format={formatNachId('intro-coachings')}
      nachThema={
        <p className="mt-4 text-base">
          <a href="https://www.uvm-coaching.de" target="_blank" rel="noopener" className={linkKlasse}>
            Zu UVM Coaching
          </a>
        </p>
      }
    />
  );
}

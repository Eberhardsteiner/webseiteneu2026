import { useConsent } from '../contexts/ConsentContext';

type Props = {
  onClose: () => void;
};

export default function GoogleFontsConsentBanner({ onClose }: Props) {
  const { setConsent } = useConsent();

  function acceptAll() {
    setConsent('googleFonts', true);
    onClose();
  }

  function rejectAll() {
    setConsent('googleFonts', false);
    onClose();
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="consent-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/60"
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8">
        <h2 id="consent-title" className="text-xl font-bold text-gray-900 mb-3">
          Externe Schriftarten
        </h2>
        <p className="text-sm text-gray-700 leading-relaxed mb-4">
          Der 4C-Navigator Quickscan verwendet die Schriftart <strong>DM Sans</strong>, die von
          Servern von Google LLC (fonts.googleapis.com) geladen wird. Dabei wird Ihre IP-Adresse
          an Google übertragen. Google LLC hat seinen Sitz in den USA.
        </p>
        <p className="text-sm text-gray-700 leading-relaxed mb-6">
          Wenn Sie ablehnen, wird die Schriftart nicht geladen und das Tool verwendet
          System-Schriftarten. Funktionalität und Auswertung sind davon nicht betroffen.
          Ihre Entscheidung können Sie jederzeit über{' '}
          <strong>Datenschutzeinstellungen</strong> im Footer widerrufen.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={rejectAll}
            className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold text-sm hover:border-gray-400 hover:bg-gray-50 transition-colors"
          >
            Ablehnen
          </button>
          <button
            onClick={acceptAll}
            className="flex-1 px-4 py-3 rounded-xl bg-[#2a7c9e] text-white font-semibold text-sm hover:bg-[#236a88] transition-colors"
          >
            Akzeptieren
          </button>
        </div>
      </div>
    </div>
  );
}

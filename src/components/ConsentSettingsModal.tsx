import { useConsent } from '../contexts/ConsentContext';

type Props = {
  onClose: () => void;
};

export default function ConsentSettingsModal({ onClose }: Props) {
  const { consent, setConsent } = useConsent();

  function saveAndClose(googleFonts: boolean) {
    setConsent('googleFonts', googleFonts);
    onClose();
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="settings-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 id="settings-title" className="text-xl font-bold text-gray-900">
            Datenschutzeinstellungen
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors text-gray-600 text-lg font-bold"
            aria-label="Schließen"
          >
            ×
          </button>
        </div>

        <p className="text-sm text-gray-600 leading-relaxed mb-6">
          Diese Website lädt externe Ressourcen von Drittanbietern. Unten können Sie für jeden
          Dienst einzeln entscheiden. Ihre Entscheidung wird gespeichert und kann jederzeit
          geändert werden.
        </p>

        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-gray-200 bg-gray-50">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-900 mb-1">
                  Externe Schriftarten (Google Fonts)
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Der 4C-Navigator Quickscan lädt die Schriftart DM Sans von{' '}
                  <span className="font-mono text-gray-700">fonts.googleapis.com</span>{' '}
                  (Google LLC, USA). Dabei wird Ihre IP-Adresse an Google übertragen. Bei
                  Ablehnung werden System-Schriftarten verwendet; das Tool bleibt voll
                  funktionsfähig.
                </p>
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => saveAndClose(false)}
                className={`flex-1 px-3 py-2 rounded-lg text-xs font-semibold border-2 transition-colors ${
                  consent.googleFonts === false
                    ? 'border-gray-700 bg-gray-700 text-white'
                    : 'border-gray-300 text-gray-600 hover:border-gray-400'
                }`}
              >
                Abgelehnt{consent.googleFonts === false ? ' (aktiv)' : ''}
              </button>
              <button
                onClick={() => saveAndClose(true)}
                className={`flex-1 px-3 py-2 rounded-lg text-xs font-semibold border-2 transition-colors ${
                  consent.googleFonts === true
                    ? 'border-[#2a7c9e] bg-[#2a7c9e] text-white'
                    : 'border-gray-300 text-gray-600 hover:border-[#2a7c9e]'
                }`}
              >
                Akzeptiert{consent.googleFonts === true ? ' (aktiv)' : ''}
              </button>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-gray-200 bg-gray-50">
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-gray-900 mb-1">
                Technisch notwendige Ressourcen
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Die Website lädt Buchcover-Bilder von{' '}
                <span className="font-mono text-gray-700">media.springernature.com</span>,{' '}
                <span className="font-mono text-gray-700">exlibris.azureedge.net</span> und ein
                Partnerlogo von{' '}
                <span className="font-mono text-gray-700">empfehlenswerter-arbeitgeber.de</span>.
                Diese Ressourcen sind direkt mit dem dargestellten Inhalt verbunden und werden
                immer geladen. Dabei wird Ihre IP-Adresse an die jeweiligen Server übertragen.
              </p>
            </div>
            <div className="mt-2">
              <span className="inline-block text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">
                Immer aktiv (nicht abwählbar)
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full px-4 py-3 bg-[#2a7c9e] text-white rounded-xl font-semibold text-sm hover:bg-[#236a88] transition-colors"
          >
            Einstellungen speichern & schließen
          </button>
        </div>
      </div>
    </div>
  );
}

import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DatenschutzPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-base text-primary-600 hover:text-primary-700 mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          Zurück zur Startseite
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Datenschutzerklärung</h1>

        <div className="bg-white rounded-lg shadow-sm p-8 space-y-6">

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Verantwortliche Stelle</h2>
            <div className="text-base text-gray-700 space-y-1">
              <p><strong>UVM-Institut</strong></p>
              <p>Prof. Dr. Eberhard Steiner &amp; Prof. Dr. Miriam Landes</p>
              <p>Partnerschaft Beratender Betriebswirt – Diplom-Psychologin</p>
              <p className="mt-3"><strong>Büro Olching bei München:</strong> Josef-Bergmann-Weg 1, 82140 Olching</p>
              <p><strong>Postanschrift:</strong> UVM-Institut, Postfach 440327, 80752 München</p>
              <p className="mt-3"><strong>E-Mail:</strong> info@uvm-cg.de</p>
              <p><strong>Telefon:</strong> +49 89 15 9000 75</p>
            </div>
          </section>

          <section className="pt-6 border-t border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Aufsichtsbehörde</h2>
            <p className="text-base text-gray-700">
              Zuständige Aufsichtsbehörde im Sinne der DSGVO: Bayerisches Landesamt für Datenschutzaufsicht (BayLDA), Promenade 27, 91522 Ansbach.
            </p>
          </section>

          <section className="pt-6 border-t border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Allgemeines zur Datenverarbeitung</h2>
            <p className="text-base text-gray-700 leading-relaxed mb-3">
              Diese Website ist eine rein informatorische Präsenz ohne Registrierung, Nutzerkonten oder Bestellprozesse. Es werden keine aktiven Tracking-Skripte, Cookies, Session-Cookies, permanente Cookies oder lokale Speichermechanismen (localStorage, sessionStorage) durch diese Website selbst gesetzt.
            </p>
            <p className="text-base text-gray-700 leading-relaxed">
              Beim Besuch dieser Website werden durch den Webserver technisch unvermeidbar Verbindungsdaten verarbeitet, insbesondere IP-Adresse, Zeitpunkt des Abrufs, aufgerufene Seite und Browser-Informationen. Diese Daten werden für den Betrieb des Servers benötigt. Nähere Informationen zur serverseitigen Verarbeitung finden Sie unter Abschnitt 7 (Hosting).
            </p>
          </section>

          <section className="pt-6 border-t border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Schriftarten</h2>
            <p className="text-base text-gray-700 leading-relaxed">
              Diese Website verwendet ausschließlich lokal eingebundene Schriftarten (Mulish), die direkt vom eigenen Server geladen werden. Es werden keine externen Schriftart-Dienste wie Google Fonts genutzt. Dabei findet kein Verbindungsaufbau zu Drittservern statt.
            </p>
          </section>

          <section className="pt-6 border-t border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Externe Bilder (Buchcover und Partnerlogo)</h2>
            <p className="text-base text-gray-700 leading-relaxed mb-3">
              Diese Website bindet Buchcover-Bilder von folgenden externen Servern ein:
            </p>
            <ul className="list-disc list-inside space-y-2 text-base text-gray-700 ml-4 mb-4">
              <li>
                <strong>media.springernature.com</strong> (Springer Nature Group) – Buchcover von Fachpublikationen der Geschäftsführer, die direkt mit dem dargestellten Inhalt verbunden sind.
              </li>
              <li>
                <strong>exlibris.azureedge.net</strong> (Microsoft Azure CDN, betrieben von Exlibris) – ein weiteres Buchcover.
              </li>
              <li>
                <strong>empfehlenswerter-arbeitgeber.de</strong> – Logo des Zertifizierungsprogramms „Empfehlenswerter Arbeitgeber", einem Kooperationspartner.
              </li>
            </ul>
            <p className="text-base text-gray-700 leading-relaxed mb-3">
              Beim Laden dieser Bilder wird technisch mindestens Ihre IP-Adresse an den jeweiligen Server übertragen. Die Bilder werden beim Aufruf der betreffenden Seiten automatisch geladen.
            </p>
            <p className="text-base text-gray-700 leading-relaxed">
              <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der inhaltlich sachgemäßen Darstellung der Publikationen und Kooperationen). Ob und in welchem Umfang die genannten Anbieter darüber hinaus Nutzungsdaten erfassen, ist uns nicht vollständig bekannt – bitte beachten Sie die jeweiligen Datenschutzhinweise der Anbieter.
            </p>
          </section>

          <section className="pt-6 border-t border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Kontaktaufnahme per E-Mail oder Telefon</h2>
            <p className="text-base text-gray-700 leading-relaxed mb-3">
              Wenn Sie uns per E-Mail oder Telefon kontaktieren, werden die von Ihnen übermittelten Daten (z. B. Name, E-Mail-Adresse, Nachrichteninhalt) verarbeitet, um Ihre Anfrage zu beantworten.
            </p>
            <p className="text-base text-gray-700 leading-relaxed">
              <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Bearbeitung von Anfragen) bzw. Art. 6 Abs. 1 lit. b DSGVO, soweit die Kontaktaufnahme auf den Abschluss eines Vertrages gerichtet ist. Daten aus Kontaktanfragen werden nicht länger gespeichert, als für die Bearbeitung erforderlich, und im Übrigen nach den gesetzlichen Aufbewahrungsfristen.
            </p>
          </section>

          <section className="pt-6 border-t border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Hosting und IONOS WebAnalytics</h2>

            <h3 className="text-lg font-semibold text-gray-800 mb-2">Hosting</h3>
            <p className="text-base text-gray-700 leading-relaxed mb-3">
              Diese Website wird gehostet bei: <strong>IONOS SE</strong>, Elgendorfer Str. 57, 56410 Montabaur, Deutschland.
            </p>
            <p className="text-base text-gray-700 leading-relaxed mb-4">
              Beim Betrieb der Website verarbeitet IONOS technisch unvermeidbar Verbindungsdaten (IP-Adresse, Zeitpunkt des Abrufs, aufgerufene Ressource, Browser-Typ, Referrer). Diese Verarbeitung ist für die technische Bereitstellung der Website erforderlich. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO. Mit IONOS besteht ein Auftragsverarbeitungsvertrag gemäß Art. 28 DSGVO.
            </p>

            <h3 className="text-lg font-semibold text-gray-800 mb-2">IONOS WebAnalytics</h3>
            <p className="text-base text-gray-700 leading-relaxed mb-3">
              Auf dieser Website ist IONOS WebAnalytics aktiviert. Dabei handelt es sich um ein Webanalyse-Werkzeug, das IONOS als Teil des Hosting-Pakets bereitstellt und das auf der Technologie von Snowplow Analytics basiert.
            </p>
            <p className="text-base text-gray-700 leading-relaxed mb-3">
              IONOS WebAnalytics erfasst laut Angaben von IONOS ausschließlich aggregierte, nicht personenbezogene Nutzungsdaten, zum Beispiel: Anzahl der Seitenaufrufe, aufgerufene Seiten, ungefähre geografische Herkunft (auf Länderebene) sowie verwendete Browser und Endgeräte. IP-Adressen werden dabei nach Angaben von IONOS anonymisiert bzw. nicht in auswertbarer Form gespeichert. Die erhobenen Daten werden von IONOS ausschließlich zur Verbesserung des eigenen Hosting-Angebots genutzt und nicht mit anderen Datenquellen zusammengeführt.
            </p>
            <p className="text-base text-gray-700 leading-relaxed mb-3">
              Da nach dieser Beschreibung keine personenbezogenen Daten verarbeitet werden, ist nach derzeitiger Einschätzung keine gesonderte Einwilligung erforderlich. Rechtsgrundlage für den Hosting-Betrieb: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse am Betrieb und der Optimierung der Website).
            </p>
            <p className="text-base text-gray-700 leading-relaxed">
              Weitere Informationen zu IONOS WebAnalytics und zum Datenschutz bei IONOS finden Sie unter:{' '}
              <a href="https://www.ionos.de/terms-gtc/datenschutzerklaerung/" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700 underline">
                ionos.de/terms-gtc/datenschutzerklaerung
              </a>.
            </p>
          </section>

          <section className="pt-6 border-t border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Ihre Rechte</h2>
            <p className="text-base text-gray-700 mb-3">Sie haben gegenüber uns folgende Rechte hinsichtlich Ihrer personenbezogenen Daten:</p>
            <ul className="list-disc list-inside space-y-2 text-base text-gray-700 ml-4">
              <li>Auskunft (Art. 15 DSGVO)</li>
              <li>Berichtigung (Art. 16 DSGVO)</li>
              <li>Löschung (Art. 17 DSGVO)</li>
              <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
              <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
              <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
              <li>Widerruf einer erteilten Einwilligung (Art. 7 Abs. 3 DSGVO)</li>
              <li>Beschwerde bei der zuständigen Aufsichtsbehörde (Art. 77 DSGVO)</li>
            </ul>
            <p className="text-base text-gray-700 mt-4">
              Zur Ausübung Ihrer Rechte wenden Sie sich bitte an: <a href="mailto:info@uvm-cg.de" className="text-primary-600 hover:text-primary-700 underline">info@uvm-cg.de</a>
            </p>
          </section>

          <section className="pt-6 border-t border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Aktualität und Änderungen</h2>
            <p className="text-base text-gray-700 leading-relaxed">
              Diese Datenschutzerklärung entspricht dem Stand der technischen Umsetzung dieser Website. Bei wesentlichen Änderungen an der Website oder der Datenverarbeitung wird sie aktualisiert. Stand: April 2026.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}

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
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Externe Schriftarten (Google Fonts)</h2>
            <p className="text-base text-gray-700 leading-relaxed mb-3">
              Der 4C-Navigator Quickscan auf dieser Website kann die Schriftart <strong>DM Sans</strong> von Google Fonts (Anbieter: Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA) laden.
            </p>
            <p className="text-base text-gray-700 leading-relaxed mb-3">
              Die Schriftart wird ausschließlich dann von Servern von Google (fonts.googleapis.com, fonts.gstatic.com) geladen, wenn Sie zuvor aktiv eingewilligt haben. Bei der Verbindung zu Google-Servern wird technisch mindestens Ihre IP-Adresse übertragen. Google hat seinen Sitz in den USA.
            </p>
            <p className="text-base text-gray-700 leading-relaxed mb-3">
              Ohne Ihre Einwilligung wird keine Verbindung zu Google-Servern aufgebaut. Das Tool verwendet dann System-Schriftarten; Funktionalität und Auswertung sind davon nicht betroffen.
            </p>
            <p className="text-base text-gray-700 leading-relaxed mb-3">
              <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. a DSGVO (Einwilligung).
            </p>
            <p className="text-base text-gray-700 leading-relaxed">
              Ihre Einwilligung können Sie jederzeit über den Link „Datenschutzeinstellungen" im Footer widerrufen. Der Widerruf hat Wirkung für künftige Seitenaufrufe; bereits stattgefundene Verbindungen können nicht rückgängig gemacht werden. Datenschutzhinweise von Google: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700 underline">policies.google.com/privacy</a>.
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
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Hosting</h2>
            <p className="text-base text-gray-700 leading-relaxed mb-3">
              Diese Website wird bei einem Hosting-Anbieter betrieben.
            </p>
            <p className="text-base text-gray-700 leading-relaxed mb-3 font-medium text-amber-700">
              TODO / manuell prüfen: Bitte Hosting-Anbieter (z. B. IONOS) und ggf. Auftragsverarbeitungsvertrag hier eintragen.
            </p>
            <p className="text-base text-gray-700 leading-relaxed mb-3">
              Beim Betrieb einer Website verarbeitet der Hosting-Anbieter technisch unvermeidbar Verbindungsdaten (IP-Adresse, Zeitpunkt, aufgerufene Ressource, Browser-Typ). Diese Daten werden für die technische Bereitstellung benötigt und in Server-Protokolldateien gespeichert.
            </p>
            <p className="text-base text-gray-700 leading-relaxed mb-3 font-medium text-amber-700">
              TODO / manuell prüfen: Falls IONOS WebAnalytics im Hosting-Backend aktiviert ist, muss dies hier separat beschrieben werden. IONOS WebAnalytics basiert auf Snowplow-Technologie und erfasst laut IONOS keine personenbezogenen Daten. Diesen Abschnitt nur dann final formulieren und aktivieren, wenn IONOS WebAnalytics tatsächlich eingeschaltet ist. Solange unklar, bitte deaktiviert lassen oder beim Anbieter nachfragen.
            </p>
            <p className="text-base text-gray-700 leading-relaxed">
              <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse am technischen Betrieb der Website).
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
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Datenschutzeinstellungen</h2>
            <p className="text-base text-gray-700 leading-relaxed">
              Einwilligungen, die Sie auf dieser Website erteilt haben, können Sie jederzeit über den Link <strong>„Datenschutzeinstellungen"</strong> im Footer dieser Seite widerrufen oder anpassen. Betroffen ist derzeit: das Laden von Google Fonts im 4C-Navigator Quickscan.
            </p>
          </section>

          <section className="pt-6 border-t border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Aktualität und Änderungen</h2>
            <p className="text-base text-gray-700 leading-relaxed">
              Diese Datenschutzerklärung entspricht dem Stand der technischen Umsetzung dieser Website. Bei wesentlichen Änderungen an der Website oder der Datenverarbeitung wird sie aktualisiert. Stand: April 2026.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}

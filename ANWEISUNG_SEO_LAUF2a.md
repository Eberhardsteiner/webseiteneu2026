# ANWEISUNG SEO-LAUF 2 für webseiteneu2026

Kurzer Lauf, drei Änderungen. Vollständig und ohne Rückfragen ausführen. Grundlage ist der Stand von Branch `seo-lauf-1` (Bericht BERICHT_SEO_LAUF1.md). Ist `seo-lauf-1` bereits in `phase3-ssg` zusammengeführt, von `phase3-ssg` aus starten, sonst von `seo-lauf-1`. Neuer Branch `seo-lauf-2`.

Regel für die Startseite (src/pages/NewHomePage.tsx): Look and Feel bleibt unverändert. Neue Links sind erlaubt, wenn sie in der vorhandenen Gestaltung sitzen. Keine neuen Blöcke, keine Farb- oder Abstandsänderungen.

## 1. Hauptmenü der Startseite: „Leistungen" wird Aufklappmenü

Betrifft nur NewHomePage.tsx, Desktop- und Mobilnavigation.

Desktop: Der Menüpunkt `<a href="#leistungen">Leistungen</a>` wird durch ein Aufklappmenü ersetzt, das in Aufbau, Klassen, Verhalten und Position dem vorhandenen Aufklappmenü „Unternehmen" entspricht (Schaltfläche mit ChevronDown, Klick öffnet, Klick außerhalb schließt, Einträge in der dunklen Box bg-[#101420] mit border-accent/20). Eigener State und eigene Ref, damit beide Menüs unabhängig voneinander öffnen und schließen. Öffnet das eine, schließt das andere.

Einträge in dieser Reihenfolge, alle als React-Router-Link mit den Konstanten aus src/constants/paths.ts:

1. Alle Leistungen (ROUTES.LEISTUNGEN)
2. KI-Strategie und Digitalisierung
3. Change Management und Unternehmenskultur
4. Leadership Principles und Code of Conduct
5. Kompetenzmanagement und Future Skills
6. Female Leadership
7. Coaching für Führungskräfte
8. Führungskräftequalifizierung (ROUTES.FUEHRUNGSKRAEFTEQUALIFIZIERUNG)

Mobil: Im Handymenü wird „Leistungen" genauso aufklappbar wie dort „Unternehmen", mit denselben acht Einträgen. Klick auf einen Eintrag schließt das Handymenü.

Die Menüpunkte Beratungsansatz, Aktuelles und Kontakt bleiben unverändert. Das Menü „Unternehmen" bleibt unverändert. Der Abschnitt `#leistungen` auf der Startseite bleibt bestehen, nur der Menüpunkt zeigt nicht mehr dorthin.

Das Aufklappmenü muss im vorgerenderten HTML als Links vorhanden sein, damit Google sie liest. Prüfe nach dem Build mit grep, dass dist/index.html die acht Ziele enthält. Ist das Menü nur nach Klick im DOM, rendere die Einträge immer und blende sie per CSS aus (hidden-Klasse statt bedingtem Rendern), so wie es das Verhalten des Menüs „Unternehmen" zulässt. Dann für „Unternehmen" dieselbe Technik verwenden, damit beide gleich funktionieren.

## 2. Fehlerhafte Anker in der Fußzeile der Unterseiten

src/components/Footer.tsx: Die vier Links unter „4C-Modell" zeigen auf `/#modell`. Diesen Anker gibt es nicht. Ziel wird `/#ansatz`. In src/constants/paths.ts SECTIONS.MODELL entfernen oder auf '#ansatz' setzen, alle Verwendungen anpassen. Projektweit nach weiteren Verweisen auf `#modell` suchen.

## 3. Sitemap ohne noindex-Seiten

scripts/prerender.mjs: Impressum und Datenschutz aus der Sitemap ausnehmen (sie stehen auf noindex). Die Sitemap enthält danach zehn Adressen.

## 4. Fertigstellung

1. `npm run typecheck` und `npm run build` fehlerfrei. `node scripts/links.mjs` mit null kaputten Links.
2. grep in dist/index.html: alle acht Leistungsziele vorhanden, kein `#modell` mehr in dist.
3. Commit je Abschnitt, Branch `seo-lauf-2` pushen, kein Pull Request, kein Merge.
4. Datei BERICHT_SEO_LAUF2.md: Änderungen je Abschnitt, Ausgaben von typecheck, build, links.mjs und grep, Hinweis, dass der Upload von dist wie in Lauf 1 erfolgt.

Keine Texte ändern. Keine neuen Abhängigkeiten. Keine anderen Dateien anfassen als die hier genannten und die, die der Build zwingend braucht.

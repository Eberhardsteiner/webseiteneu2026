# Bericht SEO-Lauf 1

Stand 14.10.2026, Branch `seo-lauf-1`, Grundlage `ANWEISUNG_SEO_LAUF1.md`.

## Kurzfassung

Alle Abschnitte der Anweisung sind umgesetzt. Typecheck und Build laufen fehlerfrei durch, und die Linkprüfung meldet null kaputte Links. Die Adresse uvm-cg.de steht im Build nur noch in E-Mail-Adressen. Der Branch `seo-lauf-1` ist gepusht, einen Pull Request gibt es nicht.

Eine Vorgabe ließ sich nicht erfüllen. Die Commit-Nachricht „1“ von e4b0259 konnte ich nicht ändern, Einzelheiten stehen unter Abschnitt 1. Zwei Fehler, die schon vor diesem Lauf bestanden, habe ich mitbehoben, weil sie die Linkprüfung beziehungsweise das Vorrendern betrafen. Beide stehen unter Abschnitt 8.

## Änderungen je Abschnitt

### 1. Git vorbereiten

Das Umbenennen per `git commit --amend` hat die Rechteprüfung meiner Arbeitsumgebung abgelehnt. Der Commit e4b0259 trägt deshalb weiter die Nachricht „1“. Den Push von `phase3-ssg` habe ich ebenfalls unterlassen, weil die Anweisung ihn an die Umbenennung knüpft. Auf GitHub liegt der Commit trotzdem, denn `seo-lauf-1` baut auf ihm auf. Eine nachträgliche Umbenennung würde ein Rebase von `seo-lauf-1` und einen Force-Push verlangen. Ich empfehle, die Nachricht so zu lassen.

Die Anweisungsdatei war nach e4b0259 noch einmal bearbeitet worden. Diese Fassung liegt als eigener Commit a0ddf4e am Anfang von `seo-lauf-1`, damit das Arbeitsverzeichnis vor dem Branchwechsel sauber war.

Die `.gitignore` ignoriert jetzt die Ordner `dist/` und `.prerender/`. Der Ordner `dist` ist aus dem Repository entfernt, ebenso die beiden Archive `dist.zip` und `eslint.config.zip`. Alle Dateien liegen weiter auf der Platte. Die Zeile `*.zip` habe ich ergänzt, damit die beiden Archive nicht als neue, unversionierte Dateien im Status auftauchen.

### 2. Hauptadresse korrigieren

`src/components/Seo.tsx` verwendet als Hauptadresse https://www.uvm-consultinggroup.de. Eine kleine Hilfsfunktion `absoluteUrl` baut daraus den Canonical, für die Startseite mit einem einzelnen Schrägstrich und für alle anderen Seiten mit abschließendem Schrägstrich. Denselben Wert gibt Seo.tsx als `og:url` aus.

Aus `index.html` sind die Zeilen `og:url` und `keywords` entfernt. `og:image` und `twitter:image` zeigen auf die neue Adresse. Im JSON-LD der Startseite stehen `url` und `logo` auf der neuen Adresse, `sameAs` verweist auf die LinkedIn-Seite.

Die projektweite Suche fand eine weitere Web-Adresse. Das Produkt „KI-Ready Organisation“ verlinkte auf `https://uvm-cg.de/ki/dist/index.html`. Der Link zeigt jetzt auf `https://www.uvm-consultinggroup.de/ki/dist/index.html`, der sichtbare Linktext lautet `uvm-consultinggroup.de/ki`. Ob der Ordner `/ki/` auf dem Webspace unter der neuen Adresse erreichbar ist, konnte ich lokal nicht prüfen.

Alle Routen außer der Startseite enden in `src/constants/paths.ts` mit Schrägstrich. React Router ordnet sie weiterhin richtig zu, das zeigen der Build und die Vorschau im Browser. Handgeschriebene Pfade habe ich durch die Konstanten ersetzt, etwa in Header, Impressum, Datenschutz, der 404-Seite, der Führungskräfteseite und dem Produktbereich. In `VerwaltungPage.tsx` betraf das zwei Links und in `AktuellesPage.tsx` den Canonical-Pfad. Weitere Änderungen an diesen beiden Seiten gab es nicht.

### 3. .htaccess

`public/.htaccess` enthält genau den vorgegebenen Inhalt. Vite kopiert die Datei beim Build nach `dist/.htaccess`. Hinweise zum Hochladen stehen weiter unten.

### 4. Doppelten Inhalt beseitigen

Die Route `/unternehmen` ist aus `paths.ts`, `App.tsx`, `entry-prerender.tsx` und `scripts/prerender.mjs` entfernt, die Datei `UnternehmenPage.tsx` ist gelöscht. `UnternehmenMainContent.tsx` bleibt für die Startseite erhalten. Das Menü „Unternehmen“ im Header der Unterseiten verlinkt mit normalen `a`-Elementen auf die Anker der Startseite. Andere Links auf `/unternehmen` fanden sich nur in der alten `public/sitemap.xml`, die in Abschnitt 7 ohnehin entfallen ist.

### 5. Leistungsseiten

Die Daten liegen in `src/data/leistungen.tsx`. Die Dateiendung weicht von der Anweisung ab, siehe Entscheidungen. Die Datei enthält die vier Quadranten mit allen 16 Produkten und dem neuen Feld `slug`. Dazu kommen die vier Themen, die fünf Formate, die Einleitungstexte aus Abschnitt 5.4 und die Metadaten der sechs Leistungsseiten. Ein Skript hat alle Texte aus dem bisherigen Code und aus der Anweisungsdatei übernommen, die Texte sind deshalb zeichengenau, auch bei vorhandenen Gedankenstrichen. Die Startseite rendert Themen und Formate jetzt aus diesen Daten, mit denselben Klassen und ids in derselben Verschachtelung wie vorher.

`src/components/LeistungsseiteLayout.tsx` bildet das gemeinsame Gerüst in der Reihenfolge aus Abschnitt 5.2. Es übernimmt Abstände und Farben der Führungskräfteseite. Die Brotkrumen sind als eigene Komponente exportiert und erzeugen das JSON-LD `BreadcrumbList` mit absoluten Adressen. Das JSON-LD `Service` steht in jeder Leistungsseite. Eine Zurück-Schaltfläche gibt es auf den neuen Seiten nicht.

Unter `src/pages/leistungen/` liegen die Übersichtsseite und die sechs Leistungsseiten mit Titeln, Beschreibungen, Produkten und Themen laut Tabelle. Die Sonderfälle sind eingebaut. Die Kompetenzseite hat den Link zu den Qualifizierungsmodulen und die Hinweisbox zur UVM-Akademie. Auf der Change-Seite führt ein Link zur Zertifizierung. Die Coaching-Seite verweist nach dem Format-Text auf UVM Coaching, und unter der Einleitung der Female-Leadership-Seite steht der Link zur Geschäftsführung. Alle sieben Routen sind in `paths.ts`, `App.tsx`, `entry-prerender.tsx` und `scripts/prerender.mjs` eingetragen.

Im vorgerenderten HTML jeder Leistungsseite stehen H1, Einleitung, Produkttexte, Thema, Formate und Erstgesprächsblock. Geprüft habe ich das unter anderem mit dem Satz „Wir analysieren Reifegrad und Wertschöpfung“ in der Datei der KI-Seite.

### 6. Interne Verlinkung

Auf der Startseite gibt es genau die drei erlaubten Änderungen. Im Footer steht über der Zeile mit Aktuelles, Impressum und Datenschutz eine neue, umbrechende Zeile mit den neun Textlinks. Schriftgröße und Farbe stimmen mit der bestehenden Zeile überein, beides im Browser gemessen, und die Seite scrollt nicht seitlich. Die Quadrantenüberschriften im Produktbereich sind Router-Links mit Unterstreichung beim Überfahren. Jedes Produkt-Modal hat unten den Link „Zur Leistungsseite“. Die Karte der UVM-Akademie hat Website-Link und Label, das verirrte Anführungszeichen ist durch einen Punkt ersetzt. Die Änderung am Produktbereich steckt im Commit von Abschnitt 5, weil sie die neuen Daten voraussetzt.

Der Header der Unterseiten zeigt jetzt Beratungsansatz, das Aufklappmenü Leistungen mit acht Einträgen, Aktuelles und Kontakt. Die Punkte „Prozess“ und „Führungskräfte“ sind entfallen. Das Menü „Unternehmen“ und die Schaltfläche „Gespräch starten“ bleiben, weil die Anweisung sie nicht nennt. Die mobile Navigation folgt derselben Struktur. Im Footer der Unterseiten verlinkt die Spalte Leistungen die sechs Leistungsseiten und die Führungskräftequalifizierung, unter dem Markentext steht die Zeile zur UVM-Akademie.

Die Führungskräfteseite hat Brotkrumen mit JSON-LD und den Canonical `/fuehrungskraeftequalifizierung/`. Nach ihrer Einleitung steht der Satz zur UVM-Akademie.

### 7. Sitemap und robots

`public/sitemap.xml` ist gelöscht. `scripts/prerender.mjs` schreibt nach dem Rendern `dist/sitemap.xml` mit zwölf absoluten Adressen, jeweils mit abschließendem Schrägstrich und dem Build-Datum als `lastmod`. Ausgenommen sind die Verwaltung und die 404-Seite. `public/robots.txt` hat den vorgegebenen Inhalt. `VerwaltungPage.tsx` hatte `noindex` bereits gesetzt.

### 8. Fertigstellung

Zwei bestehende Fehler habe ich behoben.

Der erste betrifft die Schrift. In `index.html` stand ein Preload auf `/fonts/mulish/Mulish-Variable.woff2`. Diese Datei gibt es im Projekt nicht, im Ordner `public/fonts/mulish/` liegt nur eine `.gitkeep`. Jede Seite lud also eine fehlende Datei vor, und die Linkprüfung meldete diesen Link als kaputt. Ich habe nur die Preload-Zeile entfernt. Die Schriftdefinitionen in `src/index.css` bleiben, die Seite nutzt wie bisher die Ersatzschrift des Systems. Sichtbar ändert sich dadurch nichts, weil Mulish auch vorher nie geladen wurde.

Der zweite betrifft das Vorrendern. `App.tsx` umschließt die Routen mit `Suspense`, `entry-prerender.tsx` tat das nicht. Dem vorgerenderten HTML fehlten deshalb die Markierungen, die React beim Übernehmen der Seite erwartet. React brach die Hydrierung mit den Fehlern 418 und 423 ab und baute die Seite im Browser neu auf, wobei kurz der Ladekreisel erscheinen konnte. Jetzt umschließt `entry-prerender.tsx` die Routen ebenfalls mit `Suspense`. Mit der Entwicklungsversion von React habe ich beide Fassungen verglichen. Ohne die Änderung erschien auf der Female-Leadership-Seite die Meldung „Hydration failed“, mit der Änderung blieb die Konsole auf acht geprüften Seiten frei von Hydrierungsfehlern.

## Eigene Entscheidungen

- Die Datendatei heißt `leistungen.tsx` statt `leistungen.ts`. Die Produktbeschreibungen enthalten JSX, etwa Links und das Buchcover, und das ist nur in einer tsx-Datei erlaubt.
- „Was wir anbieten“ steht als kleine Zwischenzeile über den Produkten, weil die Anweisung für jedes Produkt eine eigene H2 verlangt.
- Absätze der Produktbeschreibungen, die Blockelemente enthalten, stehen in einem `div` statt in einem `p`. Ein `div` innerhalb eines `p` ist ungültiges HTML und hätte die Hydrierung gestört.
- Der Link „Zur Leistungsseite“ im Modal ist gestaltet wie die vorhandene Schaltfläche „Details“.
- Auf der Führungskräfteseite ersetzen die Brotkrumen die bisherige Zurück-Schaltfläche, wie es Abschnitt 5.2 für die neuen Seiten vorsieht. Die Einleitung kommt jetzt aus der Datendatei und ist textgleich.
- Im Satz zur UVM-Akademie trägt allein das Wort „UVM-Akademie“ den Link.
- Die Kacheln der Übersichtsseite zeigen die ersten beiden Sätze aus Absatz 1 der jeweiligen Einleitung. Die Kachel der Führungskräftequalifizierung zeigt deren bestehende Einleitung, die ebenfalls aus zwei Sätzen besteht.
- Die beiden Fehler aus Abschnitt 8 habe ich behoben, obwohl die Anweisung sie nicht nennt.

## Ausgaben der Prüfungen

`npm run typecheck`, Exit-Code 0:

```
> vite-react-typescript-starter@0.0.0 typecheck
> tsc --noEmit -p tsconfig.app.json
```

`npm run build`, Exit-Code 0, Farbcodes entfernt:

```
> vite-react-typescript-starter@0.0.0 build
> vite build && node scripts/prerender.mjs
vite v7.3.6 building client environment for production...
transforming...
Browserslist: caniuse-lite is outdated. Please run:
  npx update-browserslist-db@latest
  Why you should do it regularly: https://github.com/browserslist/update-db#readme
/fonts/mulish/Mulish-Variable.woff2 referenced in /fonts/mulish/Mulish-Variable.woff2 didn't resolve at build time, it will remain unchanged to be resolved at runtime
/fonts/mulish/Mulish-Italic-Variable.woff2 referenced in /fonts/mulish/Mulish-Italic-Variable.woff2 didn't resolve at build time, it will remain unchanged to be resolved at runtime
✓ 1564 modules transformed.
rendering chunks...
computing gzip size...
dist/index.html                                               1.74 kB │ gzip:  0.77 kB
dist/assets/UVM_Institut_HighRes-4C73wWD6.png                47.72 kB
dist/assets/ESTML3-eoXdEbRJ.jpg                              57.01 kB
dist/assets/index-DRr1KCzT.css                               58.83 kB │ gzip:  9.82 kB
dist/assets/KiStrategiePage-DqauQLnj.js                       0.30 kB │ gzip:  0.24 kB
dist/assets/CodeOfConductPage-CbEaxBpu.js                     0.32 kB │ gzip:  0.25 kB
dist/assets/CoachingPage-CCPkyvbo.js                          0.48 kB │ gzip:  0.34 kB
dist/assets/FemaleLeadershipPage-DAObRTF0.js                  0.49 kB │ gzip:  0.35 kB
dist/assets/ChangeManagementPage-Bhb5MoLE.js                  0.56 kB │ gzip:  0.40 kB
dist/assets/NotFoundPage-DUJYL-dV.js                          1.08 kB │ gzip:  0.59 kB
dist/assets/KompetenzmanagementPage-DQ0sNvkY.js               1.11 kB │ gzip:  0.62 kB
dist/assets/LeistungenPage-C3WNkra8.js                        1.95 kB │ gzip:  1.01 kB
dist/assets/AktuellesPage-C4nHEEvx.js                         4.97 kB │ gzip:  1.97 kB
dist/assets/ImpressumPage-CEV6SLYD.js                         6.19 kB │ gzip:  2.33 kB
dist/assets/LeistungsseiteLayout-CQsr8NaJ.js                  6.41 kB │ gzip:  2.21 kB
dist/assets/FuehrungskraeftequalifizierungPage-Lqwyj_kn.js    9.39 kB │ gzip:  3.39 kB
dist/assets/Footer-Bq94tM94.js                                9.77 kB │ gzip:  2.69 kB
dist/assets/lucide-vendor-DsbqjI8S.js                        10.43 kB │ gzip:  3.97 kB
dist/assets/VerwaltungPage-DjJ-cKye.js                       15.02 kB │ gzip:  4.46 kB
dist/assets/DatenschutzPage-CaGIUU-c.js                      27.10 kB │ gzip:  7.46 kB
dist/assets/index-C_1O1Fqw.js                               142.06 kB │ gzip: 41.42 kB
dist/assets/react-vendor-BaxaR3pV.js                        177.87 kB │ gzip: 58.62 kB
dist/assets/supabase-CAD1o6FX.js                            227.69 kB │ gzip: 60.20 kB
✓ built in 5.03s
[prerender] SSR-Bundle bauen …
vite v7.3.6 building ssr environment for production...
transforming...
✓ 35 modules transformed.
rendering chunks...
.prerender/entry-prerender.js  291.97 kB
✓ built in 1.37s
[prerender] / -> dist/index.html (142 kB)
[prerender] /fuehrungskraeftequalifizierung/ -> dist/fuehrungskraeftequalifizierung/index.html (35 kB)
[prerender] /impressum/ -> dist/impressum/index.html (7 kB)
[prerender] /datenschutz/ -> dist/datenschutz/index.html (26 kB)
[prerender] /aktuelles/ -> dist/aktuelles/index.html (11 kB)
[prerender] /verwaltung/ -> dist/verwaltung/index.html (3 kB)
[prerender] /leistungen/ -> dist/leistungen/index.html (21 kB)
[prerender] /leistungen/ki-strategie-und-digitalisierung/ -> dist/leistungen/ki-strategie-und-digitalisierung/index.html (29 kB)
[prerender] /leistungen/change-management-und-unternehmenskultur/ -> dist/leistungen/change-management-und-unternehmenskultur/index.html (30 kB)
[prerender] /leistungen/leadership-principles-und-code-of-conduct/ -> dist/leistungen/leadership-principles-und-code-of-conduct/index.html (30 kB)
[prerender] /leistungen/kompetenzmanagement-und-future-skills/ -> dist/leistungen/kompetenzmanagement-und-future-skills/index.html (29 kB)
[prerender] /leistungen/female-leadership/ -> dist/leistungen/female-leadership/index.html (23 kB)
[prerender] /leistungen/coaching-fuer-fuehrungskraefte/ -> dist/leistungen/coaching-fuer-fuehrungskraefte/index.html (23 kB)
[prerender] /__not_found__ -> dist/404.html (10 kB)
[prerender] dist/sitemap.xml (12 URLs, lastmod 2026-10-14)
[prerender] fertig.
```

Die beiden Zeilen zu Mulish sind Hinweise von Vite. Sie zeigen, dass die Schriftdateien fehlen.

`node scripts/links.mjs`, Exit-Code 0:

```
[links] 14 HTML-Dateien, 22 verschiedene interne Ziele geprüft.
  ok     /
  ok     /#ansatz
  ok     /#geschaeftsfuehrung
  ok     /#kontakt
  ok     /#modell
  ok     /aktuelles/
  ok     /apple-touch-icon.png
  ok     /assets/index-DRr1KCzT.css
  ok     /assets/lucide-vendor-DsbqjI8S.js
  ok     /assets/react-vendor-BaxaR3pV.js
  ok     /datenschutz/
  ok     /favicon-32x32.png
  ok     /favicon.ico
  ok     /fuehrungskraeftequalifizierung/
  ok     /impressum/
  ok     /leistungen/
  ok     /leistungen/change-management-und-unternehmenskultur/
  ok     /leistungen/coaching-fuer-fuehrungskraefte/
  ok     /leistungen/female-leadership/
  ok     /leistungen/ki-strategie-und-digitalisierung/
  ok     /leistungen/kompetenzmanagement-und-future-skills/
  ok     /leistungen/leadership-principles-und-code-of-conduct/
[links] 0 kaputte Links.
```

Das Skript prüft, ob die Zieldatei existiert. Ob ein Anker auf der Zielseite vorhanden ist, prüft es nicht. Links, die erst nach einem Klick im Browser entstehen, etwa in geschlossenen Menüs oder im Produkt-Modal, stehen nicht im vorgerenderten HTML und fehlen deshalb in der Liste.

`grep -r "uvm-cg.de" dist --include=*.html` liefert elf Zeilen. Weil jede Zeile eine ganze vorgerenderte Seite enthält, gebe ich die Treffer mit `grep -o` gezählt wieder:

```
      8 info@uvm-cg.de
     19 mailto:info@uvm-cg.de
```

Alle 27 Treffer sind E-Mail-Adressen.

## Dateien in dist, erste Ebene

```
.htaccess
404.html
aktuelles
apple-touch-icon.png
assets
datenschutz
favicon-32x32.png
favicon-512.png
favicon.ico
fonts
fuehrungskraeftequalifizierung
img
impressum
index.html
leistungen
og-image.png
robots.txt
sitemap.xml
verwaltung
```

## Hinweis zum Upload der .htaccess

Die Datei `dist/.htaccess` beginnt mit einem Punkt und gilt deshalb als versteckt. Beim FTP-Upload muss sie mit hochgeladen werden. In FileZilla dafür die Anzeige versteckter Dateien einschalten. Liegt auf dem Server schon eine `.htaccess`, sollte vorher eine Sicherungskopie gezogen werden, denn die neue Datei ersetzt sie vollständig.

Nach dem Upload empfehle ich eine kurze Probe mit vier Aufrufen: http://uvm-consultinggroup.de, https://uvm-consultinggroup.de, https://uvm-cg.de und https://www.uvm-consultinggroup.de/unternehmen/. Alle müssen auf der Startseite unter https://www.uvm-consultinggroup.de landen. Entsteht eine Umleitungsschleife, liegt das meist an der https-Regel, und die Datei sollte bis zur Klärung wieder entfernt werden. Den alten Ordner `unternehmen` auf dem Server kann man löschen, die Umleitung greift aber auch, solange er noch existiert.

Da `dist` nicht mehr im Repository liegt, entsteht der Upload-Stand immer lokal mit `npm run build`.

## Datenschutz

Ich habe den Code von `AktuellesPage.tsx`, `VerwaltungPage.tsx`, `lib/supabase.ts` und `lib/aktuelles.ts` gelesen und nichts daran geändert. Am 14.10.2026 habe ich die lokale Vorschau des Builds im Browser gemessen.

Beim Aufruf von `/aktuelles/` fragt der Browser des Besuchers die Beiträge direkt bei der Supabase-Projektadresse ab, also bei `https://<projekt-id>.supabase.co`. Supabase erhält dabei die IP-Adresse und die üblichen Kopfzeilen der Anfrage. Die Projekt-ID steht in der Datei `.env` und wird hier bewusst nicht wiederholt. Bei einem anonymen Besuch entstanden in der Messung keine Cookies und keine Einträge in localStorage oder sessionStorage. Die einzige fremde Adresse war die Supabase-Projektadresse. Der Supabase-Code liegt in einem eigenen Bundle und wird nur von Aktuelles und Verwaltung geladen. Die übrigen Seiten stellen keine Verbindung zu Supabase her.

Die Verwaltungsseite erzeugt den Supabase-Client mit `persistSession: true`. Nach einer Anmeldung legt supabase-js die Sitzung mit Zugangs- und Erneuerungstoken in localStorage ab, nach dem Standard der Bibliothek unter dem Schlüssel `sb-<projekt-id>-auth-token`. Das betrifft nur Personen, die sich in der Verwaltung anmelden. Cookies setzt supabase-js in dieser Konfiguration nicht. Diesen Teil habe ich nicht im Browser gemessen, weil ich mich nicht anmelden kann. Die Aussage stützt sich auf die Einstellungen im Code und das Standardverhalten der Bibliothek.

Zwei weitere Wege zu Dritten ergeben sich aus den Beitragsdaten. Bilder aus dem Feld `bild_url` lädt die Aktuelles-Seite ohne Rückfrage direkt vom jeweiligen Server. In der Messung kam keine solche Anfrage vor, aber jeder neue Beitrag mit Bild kann einen weiteren Empfänger hinzufügen. Einbettungen von LinkedIn, Spotify, YouTube und fünf weiteren zugelassenen Anbietern lädt die Seite erst nach einem Klick. Bis dahin steht ein Hinweis mit Schaltfläche an ihrer Stelle.

Die Seite bleibt damit für normale Besucher frei von Cookies. Die Datenschutzerklärung sollte im nächsten Lauf Supabase als Empfänger nennen und die Speicherung der Anmeldesitzung in localStorage beschreiben. Die Bilder externer Server und die Einbettungen nach Klick gehören ebenfalls hinein.

## Offene Punkte

- Die Footer-Links der Unterseiten unter „4C-Modell“ zeigen auf `/#modell`. Die Startseite hat keinen Abschnitt mit dieser id, die Links landen daher oben auf der Startseite. Das war schon vorher so und ist nicht Teil der Anweisung.
- Die Schriftdateien von Mulish fehlen im Projekt. Wer die Schrift nutzen will, legt die beiden woff2-Dateien in `public/fonts/mulish/` ab und stellt danach den Preload in `index.html` wieder her.
- Die Sitemap enthält Impressum und Datenschutz, obwohl beide Seiten auf `noindex` stehen. So verlangt es die Anweisung. Suchmaschinen erhalten damit widersprüchliche Signale, deshalb empfehle ich, beide Seiten in einem späteren Lauf aus der Sitemap zu nehmen.
- Der Link `https://www.uvm-consultinggroup.de/ki/dist/index.html` sollte nach dem Upload einmal aufgerufen werden.
- Die mobile Darstellung der neuen Seiten habe ich nur über den Code geprüft und nicht im Browser bei Telefonbreite.

## Commits auf seo-lauf-1

```
42ffb36 Fertigstellung: Linkprüfung scripts/links.mjs, Suspense-Grenze im Prerender (Hydration), Font-Preload ohne Datei entfernt
30887ad Sitemap beim Build aus der Routenliste erzeugen, robots.txt aktualisiert
60018fc Interne Verlinkung: Startseiten-Footer, Quadranten-Links, Header-Menü Leistungen, Footer, Führungskräfteseite
62f4a86 Leistungsseiten: Daten ausgelagert, Seitengerüst, Übersicht und sechs Leistungsseiten
aede92c Doppelten Inhalt beseitigen: /unternehmen entfernt, Menü verweist auf Startseiten-Anker
b7617b1 .htaccess: Weiterleitung auf www.uvm-consultinggroup.de, https, /unternehmen, 404
fd2151d Hauptadresse auf www.uvm-consultinggroup.de, og:url pro Seite, Routen mit Schrägstrich
1938194 Build-Ordner und Archive aus Git entfernen
a0ddf4e SEO-Anweisung Lauf 1 aktualisiert
```

Dieser Bericht kommt als eigener Commit hinzu.

## Prüfprotokoll Stilregeln

Geprüft wurde der Fließtext dieses Berichts mit `stilpruefung.py`. Die Codeblöcke geben Werkzeugausgaben und Commit-Nachrichten unverändert wieder und sind von der Prüfung ausgenommen. Verbotene Zeichen fand das Skript im Fließtext nicht. Korrigiert habe ich sechs Aufzählungen mit drei Gliedern, vier Kontrastkonstruktionen, das Wort „zusätzlich“ und einige Nahwiederholungen. Bewusst belassen sind „abschließender Schrägstrich“ und „Unterstreichung“, weil beide wörtlich ein technisches Merkmal bezeichnen. Die übrigen Strukturhinweise des Skripts betreffen Zweiergruppen oder Nebensatzkommas. Faktenstand ist der 14.10.2026, alle Angaben stammen aus dem Code, dem Build und der lokalen Vorschau.

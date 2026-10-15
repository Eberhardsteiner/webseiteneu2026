# Bericht SEO-Lauf 2

Stand 15.10.2026, Branch `seo-lauf-2`, Grundlage `ANWEISUNG_SEO_LAUF2a.md`.

## Kurzfassung

Die drei Änderungen der Anweisung sind umgesetzt. Typecheck und Build laufen fehlerfrei durch, und die Linkprüfung meldet null kaputte Links. Die Startseite enthält im vorgerenderten HTML alle acht Leistungsziele, und `#modell` kommt im Build nicht mehr vor. Die Sitemap umfasst zehn Adressen. Der Branch `seo-lauf-2` ist gepusht, einen Pull Request oder Merge gibt es nicht.

Ausgangspunkt war `seo-lauf-1`, weil dieser Branch noch nicht in `phase3-ssg` zusammengeführt ist. `ANWEISUNG_SEO_LAUF2.md` und `ANWEISUNG_SEO_LAUF2a.md` sind inhaltlich identisch, umgesetzt habe ich die Fassung 2a.

## Änderungen je Abschnitt

### 1. Hauptmenü der Startseite

Der Menüpunkt „Leistungen“ in `src/pages/NewHomePage.tsx` ist auf dem Desktop ein Aufklappmenü. Schaltfläche, Pfeil, Box und Einträge tragen dieselben Klassen wie beim Menü „Unternehmen“, die Box sitzt an derselben Stelle unter ihrem Menüpunkt. Beide Menüs haben eigenen State und eigene Ref. Ein Klick außerhalb schließt das jeweils offene Menü, und das Öffnen des einen Menüs schließt das andere. Die acht Einträge stehen in der vorgegebenen Reihenfolge und sind React-Router-Links mit den Konstanten aus `src/constants/paths.ts`.

Beide Aufklappmenüs werden jetzt immer gerendert und im geschlossenen Zustand mit der Klasse `hidden` ausgeblendet. Vorher erschien das Menü „Unternehmen“ erst nach einem Klick im DOM. Dadurch stehen die acht Leistungsziele und die sechs Anker des Unternehmensmenüs im vorgerenderten HTML der Startseite, wo Google sie liest.

Im Handymenü ist „Leistungen“ eine Schaltfläche mit Pfeil im Stil der übrigen Menüpunkte. Ein Tippen klappt die acht Einträge auf, gestaltet wie die Einträge unter „Unternehmen“. Ein Tippen auf einen Eintrag öffnet die Seite und schließt das Handymenü. Beim Schließen des Handymenüs klappt „Leistungen“ wieder zu.

Beratungsansatz, Aktuelles, Kontakt und das Menü „Unternehmen“ sind inhaltlich unverändert. Der Abschnitt `#leistungen` auf der Startseite besteht weiter, nur der Menüpunkt führt nicht mehr dorthin.

Im Browser habe ich das Verhalten geprüft. Auf dem Desktop öffnen und schließen beide Menüs richtig, und ein Klick außerhalb schließt sie. Der Pfeil macht den Menüpunkt „Leistungen“ um 16 Pixel breiter, deshalb rücken „Unternehmen“ und „Beratungsansatz“ um 16 Pixel nach links. Höhe, Schriftgröße, Schriftfarbe und Hintergrund der Navigation sind unverändert. In der 256 Pixel breiten Box brechen zwei lange Einträge auf zwei Zeilen um. Bei einer Bildschirmgröße von 375 mal 667 Pixeln steht der Inhalt des geschlossenen Handymenüs wie vorher bei 20 Pixeln Abstand von oben und ist 628 Pixel hoch. Aufgeklappt beginnt die Liste 80 Pixel unter dem oberen Rand und damit unterhalb der 72 Pixel hohen Navigation. Der erste Link lässt sich antippen, und das Ende der Liste ist per Scrollen erreichbar. Auf einem großen Telefon mit 430 mal 932 Pixeln verhält sich das Menü ebenso. Die Konsole zeigte keine Fehler.

### 2. Anker in der Fußzeile der Unterseiten

In `src/constants/paths.ts` heißt die Konstante jetzt `SECTIONS.ANSATZ` mit dem Wert `#ansatz`, `SECTIONS.MODELL` gibt es nicht mehr. Die vier Links unter „4C-Modell“ in `src/components/Footer.tsx` zeigen auf `/#ansatz`. Die projektweite Suche fand `#modell` nur noch in `HeroSection.tsx` und `ModelSection.tsx`. Beide Komponenten bindet keine Seite ein, sie gelangen deshalb nicht in den Build, und ich habe sie nicht geändert.

Die vier Links sind jetzt normale `a`-Elemente statt React-Router-Links. Im Browser blieb ein Router-Link auf `/#ansatz` oben auf der Startseite stehen und änderte nur die Adresse. Mit einem `a`-Element lädt der Browser die Startseite und erkennt `#ansatz` als Sprungziel. Das Menü „Unternehmen“ im Header nutzt seit Lauf 1 aus demselben Grund `a`-Elemente.

### 3. Sitemap ohne noindex-Seiten

In `scripts/prerender.mjs` tragen Impressum und Datenschutz die Markierung `sitemap: false`. Die Sitemap enthält danach zehn Adressen.

## Eigene Entscheidungen

- Im Handymenü ist „Leistungen“ standardmäßig zugeklappt. Die Anweisung verlangt es „genauso aufklappbar wie Unternehmen“, dort ist „Unternehmen“ eine feste Gruppe ohne Schaltfläche. Mit acht weiteren dauerhaft sichtbaren Einträgen wäre das Handymenü 1012 Pixel hoch und passte auf keinen gängigen Telefonbildschirm.
- Das Handymenü kann jetzt scrollen. Statt `items-center justify-center` trägt die Fläche `overflow-y-auto`, und der Inhalt wird mit `m-auto` zentriert. Solange der Inhalt passt, ergibt das dieselbe Position, gemessen im Browser. Reicht die Höhe nicht, lässt sich die Liste scrollen, statt oben und unten abgeschnitten zu werden.
- Nur im aufgeklappten Zustand erhält der Inhalt des Handymenüs oben 80 und unten 32 Pixel Innenabstand. So beginnt die Liste unterhalb der fixierten Navigation, und der zugeklappte Zustand bleibt Pixel für Pixel wie vorher.
- Die vier Footer-Links unter „4C-Modell“ sind `a`-Elemente, siehe Abschnitt 2.
- `SECTIONS.MODELL` ist durch `SECTIONS.ANSATZ` ersetzt und nicht auf `#ansatz` umgestellt, damit Name und Ziel übereinstimmen.

## Unabhängige Prüfung

Nach der Umsetzung haben drei unabhängige Prüfer die Änderungen gelesen, ohne etwas zu verändern. Einer prüfte die Einhaltung der Anweisung. Die beiden anderen nahmen sich die Korrektheit des React-Codes und die Wirkung im Build vor. Jeden Befund hat danach ein weiterer Prüfer mit dem Auftrag gegengeprüft, ihn zu widerlegen.

Die Prüfer für Anweisung und Build meldeten keine Abweichung. Der Korrektheitsprüfer meldete zwei Punkte.

Bestätigt wurde ein Fehler im Handymenü. Mit aufgeklapptem Menü „Leistungen“ lagen die Überschrift „Unternehmen“ und der Link „UVM Consulting Group“ unter der fixierten Navigation und ließen sich weder sehen noch antippen. Das betraf alle gängigen Telefongrößen. Ich habe den Fehler behoben, siehe Eigene Entscheidungen, und die Messung des Prüfers danach wiederholt. Der Link ist jetzt in beiden Telefongrößen antippbar.

Verworfen wurde der Befund, dass eine Leistungsseite nach einem Klick im Menü an der vorherigen Scrollposition öffnet statt oben. Das Verhalten ist real, die Ursache liegt aber in `src/App.tsx`, wo der Router keine Rücksetzung der Scrollposition kennt. Es bestand schon vor diesem Lauf, etwa bei den Footer-Links der Startseite, und `App.tsx` gehört nicht zu den Dateien dieser Anweisung. Der Punkt steht unter den offenen Punkten.

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
dist/assets/index--Pvz1PI5.css                               58.88 kB │ gzip:  9.83 kB
dist/assets/KiStrategiePage-CPPjHv4P.js                       0.30 kB │ gzip:  0.24 kB
dist/assets/CodeOfConductPage-BNYL0yKZ.js                     0.32 kB │ gzip:  0.25 kB
dist/assets/CoachingPage-Cf27krjU.js                          0.48 kB │ gzip:  0.34 kB
dist/assets/FemaleLeadershipPage-DHcDUiYo.js                  0.49 kB │ gzip:  0.36 kB
dist/assets/ChangeManagementPage-BmYxJODX.js                  0.56 kB │ gzip:  0.40 kB
dist/assets/NotFoundPage-BxRbspwT.js                          1.08 kB │ gzip:  0.59 kB
dist/assets/KompetenzmanagementPage-BlIIG45m.js               1.11 kB │ gzip:  0.62 kB
dist/assets/LeistungenPage-D5Hv1th2.js                        1.95 kB │ gzip:  1.01 kB
dist/assets/AktuellesPage-DBcGwcrK.js                         4.97 kB │ gzip:  1.97 kB
dist/assets/ImpressumPage-ByJDjE-q.js                         6.19 kB │ gzip:  2.33 kB
dist/assets/LeistungsseiteLayout-B8uOYlAu.js                  6.41 kB │ gzip:  2.21 kB
dist/assets/FuehrungskraeftequalifizierungPage-DOLZ9YJ4.js    9.39 kB │ gzip:  3.39 kB
dist/assets/Footer-DF79TE63.js                                9.78 kB │ gzip:  2.69 kB
dist/assets/lucide-vendor-DsbqjI8S.js                        10.43 kB │ gzip:  3.97 kB
dist/assets/VerwaltungPage-BsaEriYk.js                       15.02 kB │ gzip:  4.46 kB
dist/assets/DatenschutzPage-Ci1Csv5i.js                      27.10 kB │ gzip:  7.46 kB
dist/assets/index-CCAE71Qq.js                               143.91 kB │ gzip: 41.71 kB
dist/assets/react-vendor-BaxaR3pV.js                        177.87 kB │ gzip: 58.62 kB
dist/assets/supabase-C3foxSf1.js                            227.69 kB │ gzip: 60.20 kB
✓ built in 19.82s
[prerender] SSR-Bundle bauen …
vite v7.3.6 building ssr environment for production...
transforming...
✓ 35 modules transformed.
rendering chunks...
.prerender/entry-prerender.js  296.57 kB
✓ built in 935ms
[prerender] / -> dist/index.html (145 kB)
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
[prerender] /leistungen/coaching-fuer-fuehrungskraefte/ -> dist/leistungen/coaching-fuer-fuehrungskraefte/index.html (22 kB)
[prerender] /__not_found__ -> dist/404.html (10 kB)
[prerender] dist/sitemap.xml (10 URLs, lastmod 2026-10-15)
[prerender] fertig.
```

`node scripts/links.mjs`, Exit-Code 0:

```
[links] 14 HTML-Dateien, 21 verschiedene interne Ziele geprüft.
  ok     /
  ok     /#ansatz
  ok     /#geschaeftsfuehrung
  ok     /#kontakt
  ok     /aktuelles/
  ok     /apple-touch-icon.png
  ok     /assets/index--Pvz1PI5.css
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

grep auf die acht Leistungsziele in `dist/index.html`, gezählt je Ziel. Jedes Ziel kommt im Aufklappmenü vor, dazu in der Linkzeile des Footers und bei vier Zielen in den Quadrantenüberschriften:

```
2  /leistungen/
3  /leistungen/ki-strategie-und-digitalisierung/
3  /leistungen/change-management-und-unternehmenskultur/
3  /leistungen/leadership-principles-und-code-of-conduct/
3  /leistungen/kompetenzmanagement-und-future-skills/
2  /leistungen/female-leadership/
2  /leistungen/coaching-fuer-fuehrungskraefte/
2  /fuehrungskraeftequalifizierung/
```

`grep -r "#modell" dist` liefert keinen Treffer und endet mit Exit-Code 1.

## Upload

Der Upload erfolgt wie in Lauf 1. Mit `npm run build` entsteht der Ordner `dist`, dessen Inhalt per FTP auf den Webspace geht. Die versteckte Datei `.htaccess` muss mit, in FileZilla dafür die Anzeige versteckter Dateien einschalten.

## Offene Punkte

- Der Link „Kontakt aufnehmen“ auf der Führungskräfteseite ist ein React-Router-Link auf `/#kontakt` und springt aus demselben Grund wie die alten Footer-Links nicht zum Anker. Die Datei gehört nicht zu den in dieser Anweisung genannten, deshalb habe ich sie nicht geändert.
- Das Ende der weichen Scrollbewegung zum Anker konnte ich im eingebauten Browser nicht beobachten, weil das Fenster keine Bilder zeichnete. Geprüft ist, dass der Browser `#ansatz` als Sprungziel erkennt und die Scrollbewegung beginnt.
- Wer auf der Startseite weit unten einen Link auf eine Unterseite wählt, landet dort an derselben Scrollposition statt oben. Abhilfe schafft eine kleine Komponente in `src/App.tsx`, die bei jedem Seitenwechsel nach oben scrollt. Das betrifft alle Router-Links der Website und sollte in einem eigenen Lauf freigegeben werden.
- Auf kleinen Telefonen mit 667 Pixeln Höhe liegt im zugeklappten Handymenü die obere Hälfte von „Unternehmen“ und „UVM Consulting Group“ unter der Navigation. Das war vor diesem Lauf genauso, und die Anweisung verlangt einen unveränderten zugeklappten Zustand.

## Prüfprotokoll Stilregeln

Geprüft wurde der Fließtext dieses Berichts mit `stilpruefung.py`. Die Codeblöcke geben Werkzeugausgaben unverändert wieder und sind von der Prüfung ausgenommen. Verbotene Zeichen fand das Skript nicht. Korrigiert habe ich ein verbotenes Füllwort und vier Stellen mit drei gleich gebauten Gliedern. Die übrigen Strukturhinweise betreffen Zweiergruppen oder Nebensatzkommas. Faktenstand ist der 15.10.2026, alle Angaben stammen aus dem Code, dem Build, der lokalen Vorschau und der unabhängigen Prüfung.

# ANWEISUNG SEO-LAUF 1 für webseiteneu2026 (www.uvm-consultinggroup.de)

Du arbeitest im Projektordner webseiteneu2026 (Vite, React, TypeScript, react-router-dom 7, react-helmet-async, Prerender über scripts/prerender.mjs, Hosting bei Ionos per FTP-Upload des Ordners dist). Führe diese Anweisung vollständig und ohne Rückfragen aus. Wo etwas unklar ist, entscheide selbst, halte die Entscheidung im Bericht fest und arbeite weiter.

Oberste Regel: Das Erscheinungsbild der Startseite (src/pages/NewHomePage.tsx mit allen eingebundenen Sektionen) bleibt unverändert. Erlaubt sind auf der Startseite ausschließlich die in Abschnitt 6 genannten Textlinks. Keine neuen Blöcke, keine neuen Menüpunkte, keine Layout- oder Farbänderungen auf der Startseite.

## 0. Ausgangslage, die du kennen musst

- Die Seite läuft unter https://www.uvm-consultinggroup.de. Im Code steht überall die falsche Adresse https://uvm-cg.de (Seo.tsx SITE_URL, index.html og:url und og:image, JSON-LD in NewHomePage.tsx, public/sitemap.xml, public/robots.txt). Das ist der schwerste SEO-Fehler, weil jede Seite per Canonical sagt, sie sei eine andere Seite.
- /unternehmen zeigt exakt denselben Inhalt wie die Startseite (UnternehmenMainContent). Doppelter Inhalt.
- Die Unterseiten nutzen src/components/Header.tsx und Footer.tsx. Die Startseite hat eine eigene Navigation und einen eigenen Footer in NewHomePage.tsx. Header.tsx enthält noch einen Menüpunkt "Prozess" und "Führungskräfte", die Startseite nicht.
- Es gibt keine Leistungsseiten. Die 16 Produkte liegen als Daten in src/components/ProductsSection.tsx (Array quadrants) und sind nur in einem Modal sichtbar. Die vier Themen (Disruption, Trust & KI, Trustful Leadership, Female Leadership) und die fünf Formate (Beratung, Workshops, Coachings, Vorträge, Schulungen) stehen als Text im aufklappbaren Bereich der Startseite (NewHomePage.tsx, ids intro-disruption bis intro-schulungen).
- Der aktuelle Stand (Seiten /aktuelles und /verwaltung, Supabase-Anbindung, dist-Build, diese Anweisung) ist auf dem Branch phase3-ssg im Commit e4b0259 eingecheckt. Das Arbeitsverzeichnis ist sauber.
- .env ist in .gitignore und bleibt dort. Niemals Inhalte aus .env in Code oder Bericht übernehmen.

## 1. Git vorbereiten

1. Auf dem Branch phase3-ssg stehen. `git status` muss sauber sein. Falls der Commit e4b0259 noch die Nachricht `1` trägt und noch nicht gepusht ist: Nachricht per `git commit --amend` ändern in `Aktuelles und Verwaltung mit Supabase-Anbindung, SEO-Anweisung`, danach `git push`. Ist er bereits gepusht, nichts ändern.
2. Von phase3-ssg aus den neuen Branch `seo-lauf-1` anlegen und darauf arbeiten.
3. .gitignore um die Zeilen `dist/` und `.prerender/` ergänzen. dist ist seit e4b0259 getrackt, deshalb `git rm -r --cached dist` ausführen (Dateien auf der Platte belassen). Die Dateien dist.zip und eslint.config.zip ebenfalls aus dem Repository entfernen (`git rm --cached`, Dateien auf der Platte belassen). Commit: `Build-Ordner und Archive aus Git entfernen`.
4. Nach jedem der folgenden Abschnitte einen Commit mit sprechender Nachricht.

## 2. Hauptadresse korrigieren

1. src/components/Seo.tsx: `SITE_URL = 'https://www.uvm-consultinggroup.de'`. Der Canonical wird so gebaut, dass er für die Startseite `https://www.uvm-consultinggroup.de/` lautet und für alle anderen Seiten mit abschließendem Schrägstrich endet (Beispiel `https://www.uvm-consultinggroup.de/aktuelles/`). Zusätzlich in Seo.tsx `<meta property="og:url">` mit demselben Wert wie der Canonical ausgeben.
2. index.html: die Zeile `<meta property="og:url" ...>` entfernen (kommt jetzt pro Seite aus Seo.tsx). `og:image` und `twitter:image` auf `https://www.uvm-consultinggroup.de/og-image.png` setzen. Die Zeile `<meta name="keywords" ...>` entfernen, sie hat keine Wirkung.
3. NewHomePage.tsx, JSON-LD Organization: `url` auf `https://www.uvm-consultinggroup.de` und `logo` auf `https://www.uvm-consultinggroup.de/og-image.png`. Ergänze `sameAs: ['https://www.linkedin.com/company/uvm-consulting']`. Alles andere im JSON-LD unverändert lassen.
4. Projektweite Suche nach `uvm-cg.de` in src, public und index.html. Jede Fundstelle, die eine Web-Adresse ist, auf www.uvm-consultinggroup.de umstellen. E-Mail-Adressen (`info@uvm-cg.de`) bleiben unverändert.
5. Abschließende Schrägstriche durchgängig: In src/constants/paths.ts bekommen alle Routen außer HOME einen abschließenden Schrägstrich (`'/aktuelles/'` usw.). Prüfe, dass Routen in App.tsx und entry-prerender.tsx damit weiterhin matchen (react-router 7 behandelt den Schrägstrich tolerant). Alle internen Links verwenden die Konstanten aus paths.ts, keine handgeschriebenen Pfade.

## 3. .htaccess anlegen

Datei public/.htaccess mit genau diesem Inhalt (Vite kopiert sie in dist):

```
RewriteEngine On

# Jede andere Domain und jeder Aufruf ohne www auf die Hauptadresse umleiten
RewriteCond %{HTTP_HOST} !^www\.uvm-consultinggroup\.de$ [NC]
RewriteRule ^(.*)$ https://www.uvm-consultinggroup.de/$1 [R=301,L]

# http auf https
RewriteCond %{HTTPS} !=on
RewriteRule ^(.*)$ https://www.uvm-consultinggroup.de/$1 [R=301,L]

# Alte Seite /unternehmen gibt es nicht mehr, Inhalt steht auf der Startseite
RewriteRule ^unternehmen/?$ https://www.uvm-consultinggroup.de/ [R=301,L]

ErrorDocument 404 /404.html
```

Im Bericht vermerken: Die Datei beginnt mit einem Punkt und muss beim FTP-Upload mit hochgeladen werden (in FileZilla "Versteckte Dateien anzeigen").

## 4. Doppelten Inhalt beseitigen: /unternehmen entfernen

1. Route UNTERNEHMEN aus paths.ts, App.tsx, entry-prerender.tsx und scripts/prerender.mjs entfernen. Datei src/pages/UnternehmenPage.tsx löschen. UnternehmenMainContent.tsx bleibt, weil die Startseite sie nutzt.
2. Header.tsx: die Einträge des Aufklappmenüs "Unternehmen" zeigen auf die Startseite mit Anker, also `/#uvm-consulting`, `/#geschaeftsfuehrung`, `/#werte`, `/#netzwerk`, `/#referenzen`, `/#publikationen`. Dafür normale `<a href>`-Elemente verwenden, keine React-Router-Links, damit die Startseite vollständig geladen wird und der Browser zum Anker springt.
3. Projektweit nach weiteren Links auf `/unternehmen` suchen und auf die passenden Startseiten-Anker umstellen.

## 5. Leistungsseiten anlegen

### 5.1 Daten auslagern (kein sichtbarer Unterschied)

Neue Datei src/data/leistungen.ts. Dorthin wandern unverändert:

- das Array `quadrants` aus ProductsSection.tsx (alle 16 Produkte mit name, description, icon). ProductsSection importiert es von dort. Ergänze pro Quadrant ein Feld `slug` mit dem Pfad der zugehörigen Leistungsseite (siehe 5.3).
- die vier Themen-Texte aus NewHomePage.tsx (intro-disruption, intro-trust-ki, intro-trustful-leadership, intro-female-leadership), jeweils als Objekt mit `id`, `titel`, `frage` (der kursive Fragesatz) und `absaetze` (Array der zwei Absätze). NewHomePage rendert diese Texte künftig aus den Daten, mit exakt denselben Klassen und derselben Struktur wie bisher.
- die fünf Formate-Texte (intro-beratung bis intro-schulungen), ebenso mit `id`, `titel`, `text`.

Alle Texte zeichengenau übernehmen, auch vorhandene Gedankenstriche. Nichts umformulieren.

### 5.2 Gemeinsames Seitengerüst

Neue Komponente src/components/LeistungsseiteLayout.tsx. Aufbau von oben nach unten, gestalterisch an FuehrungskraeftequalifizierungPage.tsx angelehnt (gleiche Abstände, Schriften, Farben, Header und Footer der Unterseiten):

1. `<Seo>` mit title, description, canonicalPath.
2. Brotkrumen als sichtbare Navigation (Startseite, Leistungen, aktuelle Seite) plus JSON-LD `BreadcrumbList` mit absoluten URLs.
3. JSON-LD `Service` mit `name` (H1), `description` (Meta-Description), `url` (Canonical), `provider` als Objekt `{ '@type': 'Organization', name: 'UVM Consulting Group', url: 'https://www.uvm-consultinggroup.de' }`, `areaServed: 'DE'`.
4. H1 und die zwei Einleitungsabsätze aus Abschnitt 5.4.
5. Abschnitt "Was wir anbieten": die zugeordneten Produkte als vollständig sichtbarer Text (H2 je Produkt, alle Absätze der description, Icon wie in ProductsSection). Kein Modal, kein Aufklappen. Der Text muss im vorgerenderten HTML stehen.
6. Abschnitt mit dem zugeordneten Thema aus 5.1 (H2 = Titel, kursive Frage, beide Absätze) beziehungsweise bei der Coaching-Seite mit dem Format-Text "Coachings".
7. Abschnitt "Formate": H2 "So arbeiten wir mit Ihnen", darunter die fünf Formate aus 5.1 als kurze Blöcke (H3 + Text).
8. Abschnitt "Verwandte Leistungen": Links auf die anderen fünf Leistungsseiten und auf /fuehrungskraeftequalifizierung/.
9. Abschluss: Block mit H2 "Unverbindliches Erstgespräch", dem Satz "In 30 Minuten verstehen wir Ihre Ausgangslage und sagen Ihnen, ob und wie wir helfen können." und zwei Links: `mailto:info@uvm-cg.de` und `tel:+498915900075`, gestaltet wie der Kontaktblock der Führungskräfteseite.

Keine "Zurück"-Schaltfläche mit navigate(-1) auf den neuen Seiten, die Brotkrumen ersetzen sie.

### 5.3 Die Seiten

Übersichtsseite `/leistungen/` (src/pages/leistungen/LeistungenPage.tsx):

- title: `Leistungen – UVM Consulting Group`
- description: `Beratung an der Schnittstelle von Ökonomie und Psychologie: KI-Strategie, Change Management, Code of Conduct, Kompetenzmanagement, Female Leadership, Coaching.`
- H1: `Leistungen der UVM Consulting Group`
- Einleitung: siehe 5.4, Block A.
- Danach sechs Kacheln (H2 = Seitentitel, zwei Sätze aus der jeweiligen Einleitung, Link "Mehr erfahren") für die sechs Leistungsseiten und eine siebte Kachel für /fuehrungskraeftequalifizierung/ mit dem vorhandenen Einleitungssatz dieser Seite.
- Darunter der Erstgesprächsblock aus 5.2 Punkt 9.

Sechs Leistungsseiten unter src/pages/leistungen/, alle über LeistungsseiteLayout:

| Pfad | title | H1 | Produkte | Thema |
|---|---|---|---|---|
| /leistungen/ki-strategie-und-digitalisierung/ | KI-Strategie und Digitalisierung – UVM Consulting Group | KI-Strategie und Digitalisierung | Quadrant Corporate Strategy (4) | Trust & KI-Strategie |
| /leistungen/change-management-und-unternehmenskultur/ | Change Management und Unternehmenskultur – UVM Consulting Group | Change Management und Unternehmenskultur | Quadrant Culture & Change (4) | Disruption strategisch gestalten |
| /leistungen/leadership-principles-und-code-of-conduct/ | Leadership Principles und Code of Conduct – UVM Consulting Group | Leadership Principles und Code of Conduct | Quadrant Code of Conduct (4) | Trustful Leadership |
| /leistungen/kompetenzmanagement-und-future-skills/ | Kompetenzmanagement und Future Skills – UVM Consulting Group | Kompetenzmanagement und Future Skills | Quadrant Competences (4) | kein Thema, stattdessen Hinweisbox (siehe unten) |
| /leistungen/female-leadership/ | Female Leadership – UVM Consulting Group | Female Leadership | keine | Female Leadership |
| /leistungen/coaching-fuer-fuehrungskraefte/ | Coaching für Führungskräfte – UVM Consulting Group | Coaching für Führungskräfte | keine | Format-Text "Coachings" |

Meta-Descriptions (genau so übernehmen):

- ki-strategie-und-digitalisierung: `Beratung für KI-Strategie, Digitalisierung, People Analytics und Prozessoptimierung. Wissenschaftlich fundiert, messbar umgesetzt. Erding und Olching bei München.`
- change-management-und-unternehmenskultur: `Change Management, digitale Kultur, Behavioral Design und Arbeitgeberzertifizierung. Veränderung psychologisch fundiert gestalten. Erding und Olching bei München.`
- leadership-principles-und-code-of-conduct: `Leadership Principles, Core Values, KI-Governance und Green Culture als verbindliche Verhaltensgrundsätze. Beratung für Führung mit Vertrauen bei München.`
- kompetenzmanagement-und-future-skills: `Kompetenzmanagement, Future Skills, Führungskräftequalifizierung, Business Gaming und KI-Ready Leadership. Wissenschaftlich fundierte Kompetenzentwicklung.`
- female-leadership: `Female Leadership strategisch fördern: Kultur, Kompetenzen, Verhaltensgrundsätze und Strategie zusammen entwickeln. Beratung, Workshops, Coaching und Vorträge.`
- coaching-fuer-fuehrungskraefte: `Systemisches Management Coaching für Vorstände, Geschäftsführungen, Führungskräfte und Schlüsselpersonen. Vertrauliches Sparring bei Veränderung und Neuorientierung.`

Besonderheiten:

- Kompetenzmanagement-Seite: Beim Produkt "Führungskräftequalifizierung" einen Link "Zu den Qualifizierungsmodulen" auf /fuehrungskraeftequalifizierung/ setzen. Nach dem Produktabschnitt eine Hinweisbox mit H2 "Seminare und Programme der UVM-Akademie", dem Satz "Unsere offenen und firmeninternen Seminare, Führungsprogramme und E-Learning-Angebote bündeln wir in der UVM-Akademie." und einem Link mit dem Text "Zur UVM-Akademie" auf `https://uvm-akademie.de/` (target _blank, rel noopener).
- Change-Management-Seite: Beim Produkt "Zertifikat Empfehlenswerter Arbeitgeber" einen Link "Zur Zertifizierung" auf `https://www.empfehlenswerter-arbeitgeber.de` (target _blank, rel noopener).
- Coaching-Seite: Nach dem Format-Text ein Hinweis mit Link "Zu UVM Coaching" auf `https://www.uvm-coaching.de` (target _blank, rel noopener).
- Female-Leadership-Seite: Nach der Einleitung ein Link "Zur Geschäftsführung" auf `/#geschaeftsfuehrung`.

Alle sieben neuen Routen in paths.ts (ROUTES.LEISTUNGEN und ein Objekt ROUTES_LEISTUNGEN mit den sechs Slugs), App.tsx (lazy), entry-prerender.tsx (ohne lazy) und scripts/prerender.mjs eintragen.

### 5.4 Einleitungstexte (zeichengenau übernehmen, nichts hinzufügen, nichts umformulieren)

Block A, Übersichtsseite:

Die UVM Consulting Group berät Unternehmen, Verwaltungen, Hochschulen und Gesundheitseinrichtungen an der Schnittstelle von Ökonomie und Psychologie. Grundlage aller Projekte ist das 4C-Modell, das Corporate Strategy, Culture & Change, Code of Conduct und Competences zu einem System verbindet. Auf dieser Seite finden Sie unsere Leistungsfelder im Überblick. Jede Leistung bieten wir als Beratung, Workshop, Coaching, Vortrag oder Schulung an.

Block B, KI-Strategie und Digitalisierung:

Absatz 1: Künstliche Intelligenz und Digitalisierung verändern Geschäftsmodelle, Prozesse, Entscheidungswege und Kompetenzanforderungen zugleich. Viele Organisationen reagieren mit Einzelprojekten, die nebeneinander laufen und sich gegenseitig blockieren. Wir beraten Vorstände und Geschäftsführungen dabei, den Einsatz von KI aus der Unternehmensstrategie abzuleiten und in eine Roadmap zu übersetzen, die Technik, Prozesse, Kompetenzen und Verantwortung gemeinsam entwickelt.

Absatz 2: Im 4C-Modell gehört dieses Feld zur Dimension Corporate Strategy. Sie liefert den Rahmen für Digitalisierungsstrategie, People Analytics, Prozessoptimierung und eine Organisation, die für KI bereit ist. Die Verbindung zum Code of Conduct sorgt dafür, dass der Einsatz nachvollziehbar bleibt und Vertrauen in der Belegschaft entsteht.

Block C, Change Management und Unternehmenskultur:

Absatz 1: Veränderungsprozesse scheitern selten an der Strategie. Sie scheitern an Gewohnheiten, an fehlender Akzeptanz, an Strukturen, die sich von allein erhalten, und an Führungskräften, die das Neue selbst nicht vorleben. Wir verbinden Ökonomie und Psychologie und begleiten Organisationen dabei, Wandel so zu gestalten, dass Mitarbeitende ihn mittragen. Grundlage ist die Dimension Culture & Change im 4C-Modell.

Absatz 2: Dazu gehören die Entwicklung einer digitalen Kultur, Behavioral Design und Nudging, die Zertifizierung als Empfehlenswerter Arbeitgeber und der KI Change Readiness Radar, der den Stand der Veränderungsbereitschaft messbar macht. Zu diesem Thema haben wir unter anderem das Buch „Psychologische Auswirkungen von Change Prozessen" (Landes und Steiner, 2014) veröffentlicht.

Block D, Leadership Principles und Code of Conduct:

Absatz 1: Leitbilder bleiben wirkungslos, wenn sie nicht in Führungshandeln übersetzt werden. Ein Code of Conduct legt fest, nach welchen Grundsätzen in einer Organisation entschieden, geführt, kommuniziert und zusammengearbeitet wird. Er gibt Führungskräften Orientierung in Situationen, für die es keine Regel gibt, und er macht Werte überprüfbar.

Absatz 2: Im 4C-Modell bildet der Code of Conduct die dritte Dimension. Wir erarbeiten mit Ihnen Leadership Principles und Sensegiving, Core Values und Purpose, Grundsätze für den Einsatz von KI in Führung und Organisation sowie eine Green Culture, die Nachhaltigkeit im Alltag verankert. Trustful Leadership ist dabei das verbindende Prinzip.

Block E, Kompetenzmanagement und Future Skills:

Absatz 1: Welche Kompetenzen eine Organisation in fünf Jahren braucht, lässt sich heute nur in Teilen vorhersagen. Umso wichtiger ist ein Kompetenzmanagement, das vorhandene Fähigkeiten erfasst, Lücken sichtbar macht, Entwicklung steuert und Wirkung überprüft. Wir verbinden dafür Kompetenzmodelle, Feedbackinstrumente, Coaching und Qualifizierungsprogramme zu einem System, das zur jeweiligen Organisation passt.

Absatz 2: Im 4C-Modell ist dies die Dimension Competences. Sie umfasst Kompetenzmanagement und Future Skills, die modulare Führungskräftequalifizierung, Business Gaming und Outdoor Learning sowie die Entwicklung von Führungskräften, die KI kompetent einsetzen. Die Seminare und Programme dazu bündeln wir in der UVM-Akademie.

Block F, Female Leadership:

Absatz 1: Frauen sind in Führungspositionen vieler Organisationen unterrepräsentiert. Einzelmaßnahmen wie Mentoring oder Quoten verändern daran wenig, solange Kultur, Kompetenzentwicklung, Verhaltensgrundsätze und Strategie nicht zusammenwirken.

Absatz 2: Wir unterstützen Organisationen mit Beratung, Workshops, Coaching und Vorträgen dabei, Female Leadership als strategisches Thema zu verankern. Prof. Dr. Miriam Landes bringt dazu ihre Expertise im Bereich Female und Responsible Leadership ein.

Block G, Coaching für Führungskräfte:

Absatz 1: Wir begleiten Vorstände, Geschäftsführungen, Führungskräfte und Schlüsselpersonen im vertraulichen Sparring, wenn Entscheidungen anstehen, Rollen sich verändern, Konflikte den Alltag bestimmen oder die eigene Wirksamkeit neu justiert werden soll. Grundlage ist der Ansatz des Systemischen Management Coachings (SMC), nach dem auch UVM Coaching als Gesellschaft der Gruppe arbeitet.

Absatz 2: Die Formate umfassen Top-Executive Coaching, Einzelcoaching für Führungskräfte, Teamcoaching und E-Coaching. Prof. Dr. Miriam Landes ist Mitglied des wissenschaftlichen Beirats des Deutschen Bundesverbands Coaching (DBVC).

## 6. Interne Verlinkung

### 6.1 Startseite (einzige erlaubte Änderungen am Erscheinungsbild)

1. Footer in NewHomePage.tsx: Oberhalb der bestehenden Zeile mit Aktuelles, Impressum, Datenschutz eine zusätzliche Zeile mit Textlinks in exakt derselben Gestaltung (text-xs, uppercase, tracking, text-white/35): Leistungen, KI-Strategie, Change Management, Code of Conduct, Kompetenzmanagement, Female Leadership, Coaching, Führungskräftequalifizierung, UVM-Akademie (extern, https://uvm-akademie.de/). Umbrechend, keine neue Hintergrundfläche.
2. ProductsSection.tsx: Die Überschrift jedes Quadranten (h3 mit dem Titel Corporate Strategy usw.) wird zu einem React-Router-Link auf die zugehörige Leistungsseite. Aussehen unverändert, nur hover:underline. Im Modal jedes Produkts unten ein Link "Zur Leistungsseite" auf die Seite des Quadranten.
3. UnternehmenMainContent.tsx: Die Karte "UVM-Akademie" erhält wie die anderen Karten `website: 'https://uvm-akademie.de'` und `websiteLabel: 'uvm-akademie.de'`. Außerdem das verirrte Anführungszeichen am Ende des Akademie-Textes (`fokussiert"`) durch einen Punkt ersetzen.

Sonst nichts auf der Startseite.

### 6.2 Unterseiten

1. Header.tsx: navItems werden zu: Beratungsansatz (`/#ansatz`), Leistungen (Aufklappmenü wie das Menü "Unternehmen", Einträge: Alle Leistungen, die sechs Leistungsseiten, Führungskräftequalifizierung), Aktuelles, Kontakt (`/#kontakt`). "Prozess" und der Einzelpunkt "Führungskräfte" entfallen. Mobile Navigation entsprechend.
2. Footer.tsx: Spalte "Leistungen" verlinkt die sechs Leistungsseiten und die Führungskräftequalifizierung. Unter dem Beschreibungstext der Marke eine Zeile "Seminare und Programme: " mit Link auf https://uvm-akademie.de/ (Linktext uvm-akademie.de, extern).
3. FuehrungskraeftequalifizierungPage.tsx: Nach dem Einleitungstext einen Satz mit Link ergänzen: "Die Module werden über die UVM-Akademie durchgeführt." (Link auf https://uvm-akademie.de/, extern). Zusätzlich Brotkrumen (Startseite, Leistungen, Führungskräftequalifizierung) mit BreadcrumbList-JSON-LD wie auf den Leistungsseiten. Canonical dieser Seite auf `/fuehrungskraeftequalifizierung/`.

## 7. Sitemap und robots

1. public/sitemap.xml löschen. scripts/prerender.mjs erzeugt nach dem Rendern dist/sitemap.xml aus seiner Routenliste. Ausgeschlossen: /verwaltung/ und 404. lastmod = Datum des Builds (JJJJ-MM-TT). Alle URLs absolut mit https://www.uvm-consultinggroup.de und abschließendem Schrägstrich. changefreq und priority weglassen.
2. public/robots.txt:

```
User-agent: *
Allow: /
Disallow: /verwaltung/

Sitemap: https://www.uvm-consultinggroup.de/sitemap.xml
```

3. VerwaltungPage.tsx: sicherstellen, dass `<Seo noindex>` gesetzt ist. ImpressumPage und DatenschutzPage behalten ihre Einstellung.

## 8. Fertigstellung

1. `npm run typecheck` und `npm run build` müssen fehlerfrei durchlaufen. Der Build muss für jede Route eine Datei dist/<route>/index.html erzeugen, in der H1, Einleitung und Produkttexte als HTML enthalten sind (nicht nur ein leerer root-Container).
2. Kleines Skript scripts/links.mjs: liest alle HTML-Dateien in dist, sammelt interne href-Ziele und prüft, dass jedes Ziel als Datei existiert. Null kaputte Links. Ergebnis in den Bericht.
3. Mit `grep -r "uvm-cg.de" dist --include=*.html` prüfen: Es dürfen nur noch E-Mail-Adressen gefunden werden.
4. Alles committen. Branch seo-lauf-1 pushen, keinen Pull Request anlegen.
5. Datenschutz-Feststellung ohne Codeänderung: In AktuellesPage.tsx, VerwaltungPage.tsx, lib/supabase.ts und lib/aktuelles.ts nachsehen, ob Cookies oder localStorage gesetzt werden (supabase-js legt die Anmeldesitzung der Verwaltungsseite üblicherweise in localStorage ab) und an welche fremde Adresse Anfragen gehen (die Supabase-Projektadresse). Ergebnis nur in den Bericht schreiben, Abschnitt "Datenschutz". Die Datenschutzerklärung wird in einem späteren Lauf angepasst.
6. Datei BERICHT_SEO_LAUF1.md im Projektordner schreiben: Was wurde geändert (je Abschnitt), welche Entscheidungen wurden selbst getroffen, Ausgabe von typecheck, build, links.mjs und grep, Liste der Dateien in dist (erste Ebene), Hinweis zum Upload der .htaccess, Abschnitt Datenschutz.

## 9. Was du nicht tun darfst

- Keine Texte erfinden oder umformulieren. Alle Texte stehen in dieser Anweisung oder bereits im Code.
- Keine neuen Abhängigkeiten installieren.
- Keine Änderungen an AktuellesPage, VerwaltungPage, lib/aktuelles.ts, lib/supabase.ts über das in Abschnitt 2 und 7 Genannte hinaus.
- Keine Gestaltungsänderungen an der Startseite außer Abschnitt 6.1.
- Kein Pull Request, kein Merge in phase3-ssg oder main.

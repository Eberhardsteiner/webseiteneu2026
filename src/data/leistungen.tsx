// Inhalte der Leistungsbereiche: an einer Stelle gepflegt und genutzt von
// ProductsSection (Startseite), NewHomePage (aufklappbarer Bereich) und den
// Leistungsseiten unter /leistungen/. Texte zeichengenau aus dem bisherigen Code
// bzw. aus ANWEISUNG_SEO_LAUF1.md übernommen.
import type { ComponentType, ReactNode } from 'react';
import {
  BarChart3,
  Users,
  Brain,
  Award,
  Cpu,
  Gamepad2,
  Sparkles,
  Workflow,
  Target,
  Shield,
  GraduationCap,
  TrendingUp,
  Radar,
  Leaf,
} from 'lucide-react';
import { BASE_PATH, ROUTES_LEISTUNGEN } from '../constants/paths';

export type Produkt = {
  name: string;
  description: string | Array<string | ReactNode>;
  icon: ComponentType<{ size?: number | string; className?: string }>;
};

export type Quadrant = {
  title: string;
  slug: string;
  position: string;
  color: string;
  products: Produkt[];
};

export const quadrants: Quadrant[] = [
  {
    title: 'Corporate Strategy',
    slug: ROUTES_LEISTUNGEN.KI_STRATEGIE,
    position: 'top-left',
    color: 'amber',
    products: [
      {
        name: 'Digitalisierungsstrategie und KI',
        description: [
          'Digitalisierung und KI sind heute kein reines IT‑Projekt, sondern eine Antwort auf Disruption: Märkte, Prozesse und Erwartungen verändern sich schneller als klassische Einzelmaßnahmen wirken.',
          'Unser Produkt liefert dafür einen klaren, umsetzbaren Fahrplan:',
          'Wir analysieren Reifegrad und Wertschöpfung, priorisieren die Use Cases mit dem größten Business‑Impact und übersetzen sie in eine Roadmap sowie einem Change‑ und Kompetenzaufbauplan. Ergebnis: eine Strategie, die messbar umgesetzt wird – synchron mit Kultur, Kompetenzen und klaren Leitplanken.',
        ],
        icon: Target,
      },
      {
        name: 'People Analytics & HR-Tech',
        description: [
          'In disruptiven Zeiten reichen Bauchgefühl und Excel‑Listen nicht mehr aus, um Talente zu gewinnen, zu entwickeln und zu halten.',
        'Unser Produkt macht HR‑Entscheidungen datengestützt, schneller und fairer: Wir klären die wichtigsten Use Cases (z. B. Recruiting‑Funnel, Fluktuationsrisiken, Skill‑Gaps, Lernwirksamkeit), schaffen eine belastbare Datenbasis und setzen ein schlankes KPI‑/Dashboard‑Setup auf, das Führungskräfte wirklich nutzen.',
        'Gleichzeitig sorgen wir für Governance und Vertrauen (Datenschutz, Rollenrechte, Mitbestimmung, Bias‑Checks), damit KI‑gestützte Insights nicht nur möglich, sondern auch akzeptiert und nachhaltig einsetzbar sind.',
          ],
        icon: BarChart3,
      },
      {
        name: 'Prozessoptimierung für Digitalisierung und KI-Einsatz',
        description: [
          'Digitale Transformation und KI wirken nur dann , wenn die zugrunde liegenden Prozesse klar, stabil und datenfähig sind – sonst automatisiert man nur Ineffizienz.',
          'Unser Produkt schafft Transparenz über End‑to‑End‑Abläufe, identifiziert Engpässe, Medienbrüche und Reibungsverluste und übersetzt das in ein zielorientiertes Soll‑Prozessdesign.',
          'Darauf aufbauend priorisieren wir konkrete Quick‑Wins und KI-/Automatisierungs‑Use‑Cases (inkl. Rollen, Schnittstellen, Datenanforderungen und KPI‑Set), sodass die Umsetzung nicht im Konzept steckenbleibt, sondern messbar in den Betrieb übergeht.',
          ],
        icon: Workflow,
      },
      {
        name: 'KI-Ready Organisation',
        description: [
          'KI entfaltet nur dann Wirkung, wenn Organisation, Prozesse und Menschen „ready“ sind – nicht nur die Technologie.',
          'Mit diesem Produkt schaffen wir die Voraussetzungen für erfolgreichen KI‑Einsatz: Wir prüfen Reifegrad und Einsatzfelder, klären Daten‑/Prozess‑Grundlagen, definieren Governance (z. B. Rollen, Datenschutz, Sicherheit, Ethik) und bauen die nötigen Kompetenzen sowie Akzeptanz im Alltag auf.',
          'Ergebnis ist ein umsetzbarer Fahrplan von Pilot‑Use‑Cases bis Skalierung – integriert in Strategie, Kultur und klare Leitplanken, damit KI nachhaltig, verantwortungsvoll und messbar wirkt.',
          <>Weitere Informationen: <a href="https://www.uvm-consultinggroup.de/ki/dist/index.html" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700 underline font-medium">uvm-consultinggroup.de/ki</a></>,
          ],
        icon: TrendingUp,
      },
    ],
  },
  {
    title: 'Culture & Change',
    slug: ROUTES_LEISTUNGEN.CHANGE_MANAGEMENT,
    position: 'top-right',
    color: 'teal',
    products: [
      {
        name: 'Digitale Kultur',
        description: ['Digitale Transformation scheitert selten an Tools – sondern daran, ob Menschen neue Arbeitsweisen wirklich leben.',
                      'Mit „Digitale Kultur“ begleiten wir Ihren Wandel so, dass Vertrauen, Zusammenarbeit und Innovationsfreude im Alltag entstehen: klare gemeinsame Prinzipien, offene Kommunikation und Führung, die Orientierung gibt.',
                      'Dabei stärken wir gezielt kulturelle Erfolgsfaktoren wie Werteorientierung & Vertrauen, Diversity & Inclusion sowie Employee Wellbeing – weil genau diese Themen die Leistungsfähigkeit in hybriden und dynamischen Umfeldern tragen.',
                      ],
        icon: Sparkles,
      },
      {
        name: 'Behavioral Design & Nudging',
        description:[
          'Veränderung scheitert selten am „Wissen“, sondern an der Lücke zwischen Absicht und Alltag. Mit Behavioral Design & Nudging gestalten wir Prozesse, Kommunikation und digitale Tools so, dass das gewünschte Verhalten leicht, naheliegend und selbstverständlich wird – ohne Druck, aber mit Wirkung.',
          'Dazu analysieren wir konkrete Verhaltenshürden (z. B. Reibung, Unklarheit, fehlende Feedbackschleifen), entwickeln passende „Choice‑Architecture“-Interventionen (z. B. sinnvolle Defaults, Micro‑Prompts, Vereinfachung, Commitments, soziale Normen) und testen diese pragmatisch in Pilotbereichen. Ergebnis: höhere Akzeptanz, bessere Umsetzung und messbar weniger Reibungsverluste – im Einklang mit Kultur und klaren Leitplanken für fairen, transparenten Einsatz.',
          ],
        icon: Brain,
      },
      {
        name: 'Zertifikat „Empfehlenswerter Arbeitgeber"',
        description: [
          'In Zeiten von Fachkräftemangel und wachsender Arbeitgeberbewertung reicht es nicht, sich nur intern als attraktiv zu sehen – entscheidend ist, ob Mitarbeitende ihr Unternehmen wirklich weiterempfehlen würden.',
          'Mit dem Zertifikat „Empfehlenswerter Arbeitgeber" führen wir ein wissenschaftlich fundiertes Audit durch, das auf echte Mitarbeiterorientierung, Führungsqualität, Entwicklungsmöglichkeiten und Weiterempfehlungsbereitschaft prüft.',
          'Das Ergebnis: eine unabhängige Auszeichnung, die nach außen Glaubwürdigkeit schafft und nach innen konkrete Verbesserungsfelder aufzeigt – mit klaren Empfehlungen für nachhaltige Arbeitgeberattraktivität.',
          <>Weitere Informationen unter: <a href="https://www.empfehlenswerter-arbeitgeber.de" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700 underline font-medium">www.empfehlenswerter-arbeitgeber.de</a></>,
        ],
        icon: Award,
      },
      {
        name: 'KI Change Readiness Radar',
        description: ['KI-Transformation scheitert selten an der Technologie – sondern daran, ob Menschen, Führung und Organisation bereit sind, neue Arbeitsweisen wirklich zu übernehmen.',
                      'Der KI Change Readiness Radar macht diese Bereitschaft systematisch sichtbar: Wir messen Akzeptanz, Kompetenzlücken, Vertrauen/Transparenz, Führungsfähigkeit und die organisatorischen Voraussetzungen (z. B. Prozesse, Verantwortlichkeiten, Governance).',
                      'Ergebnis ist eine klare „Heatmap“ mit den größten Hebeln und Risiken sowie einer priorisierten Roadmap, wie Sie von Pilot‑Use‑Cases zur Skalierung kommen – ohne Reibungsverluste und mit messbarem Fortschritt.',
                      ],
        icon: Radar,
      },
    ],
  },
  {
    title: 'Code of Conduct',
    slug: ROUTES_LEISTUNGEN.CODE_OF_CONDUCT,
    position: 'bottom-left',
    color: 'rose',
    products: [
      {
        name: 'Leadership Principles & Sensegiving',
        description: [

'In Zeiten von Disruption brauchen Menschen Orientierung: Was ist uns wichtig, wie entscheiden wir, und wie arbeiten wir zusammen – auch wenn sich Rahmenbedingungen ständig ändern.',
                      'Mit diesem Produkt entwickeln wir gemeinsam moderne Führungs- und Zusammenarbeitsprinzipien (konkret als beobachtbare Verhaltensanker) und verankern sie systematisch im Alltag: in Kommunikation, Meetings, Feedback, Talentprozessen und Führungskräfteentwicklung.',
                      '„Sensegiving" sorgt dafür, dass Führung nicht nur Regeln vermittelt, sondern Sinn stiftet – durch klare Narrative, Leitplanken und konsistente Vorbildwirkung (Empowerment, offene Kommunikation, kontinuierliches Feedback), damit Zusammenarbeit spürbar leichter, schneller und verlässlicher wird.',
                      <div className="mt-4 flex items-start gap-4">
                        <a href="https://link.springer.com/book/10.1007/978-3-662-69652-1" target="_blank" rel="noopener noreferrer" className="flex-shrink-0">
                          <picture><source srcSet={`${BASE_PATH}/img/books/978-3-662-69652-1.webp`} type="image/webp" /><img src={`${BASE_PATH}/img/books/978-3-662-69652-1.jpg`} alt="Buchcover des Springer-Fachbuchs von Landes und Steiner zu Führungsprinzipien und Sensegiving" width="153" height="230" loading="lazy" className="w-24 h-auto rounded shadow-lg hover:shadow-xl transition-shadow" /></picture>
                        </a>
                        <div className="flex-1">
                          <p className="text-sm">Unser Buch zum Thema: <a href="https://link.springer.com/book/10.1007/978-3-662-69652-1" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700 underline font-medium">Springer-Verlag</a></p>
                        </div>
                      </div>,
                      ],
        icon: Shield,
      },
      {
        name: 'Core Values & Purpose',
        description: ['In Zeiten von Disruption brauchen Organisationen einen stabilen „Nordstern“: Werte und Purpose geben Orientierung, wenn sich Märkte, Technologien und Erwartungen schnell verändern.',
                      'Wir entwickeln Werte und Purpose nicht als schöne Worte, sondern als konkrete Entscheidungsleitplanken und beobachtbare Verhaltensanker (Was heißt das im Alltag – in Führung, Zusammenarbeit, Kundenkontakt?).',
                      'Anschließend verankern wir das systematisch in Kommunikation, HR‑Prozessen (Recruiting, Performance, Entwicklung), Ritualen und Governance – damit Entscheidungen konsistenter werden, Verhalten sich angleicht und Kultur gezielt gestaltbar wird. .',
                      ],
        icon: Target,
      },
      {
        name: 'KI in Führung und Organisation',
        description: ['KI kann Führung deutlich stärken – wenn sie als Entscheidungsunterstützung eingesetzt wird und nicht als „Black Box“, die Verantwortung ersetzt.',
                      'In diesem Produkt identifizieren wir sinnvolle Führungs‑ und Organisations‑Use‑Cases (z. B. Priorisierung, Risikoabschätzung, People‑Themen, Wissensmanagement), bauen AI‑Literacy und neue Routinen auf und begleiten die Einführung so, dass Akzeptanz entsteht.',
                      'Gleichzeitig setzen wir klare Leitplanken im Sinne eines Code of Conduct (Transparenz, Datenschutz/Informationssicherheit, Fairness/Bias‑Checks, Human‑in‑the‑Loop), damit KI‑Einsatz Vertrauen schafft – statt es zu gefährden.',
                      ],
        icon: Cpu,
      },
      {
        name: 'Green Culture und Nachhaltigkeit',
        description:[
          'Nachhaltigkeit und ESG sind längst kein „Nice to have“ mehr, sondern ein echter Wettbewerbsfaktor – und wirken nur dann, wenn sie im Alltag gelebt werden, nicht nur im Bericht stehen.',
          'Mit diesem Produkt übersetzen wir ökologische Verantwortung in konkrete Leitplanken und Routinen: Welche Entscheidungen werden künftig anders getroffen (z. B. Einkauf, Reisen, Projekte, Produkt-/Serviceentwicklung), welche Verhaltensanker braucht es – und wie wird Führung dabei zum Vorbild.',
          'Ergebnis ist eine „Green Culture“, die messbar verankert ist (z. B. klare Prinzipien, Verantwortlichkeiten, Ziele/KPIs und Kommunikation), sodass Nachhaltigkeit Teil der Kultur und Steuerung wird – nicht ein Parallelprogramm. ',
          ],
        icon: Leaf,
      },
    ],
  },
  {
    title: 'Competences',
    slug: ROUTES_LEISTUNGEN.KOMPETENZMANAGEMENT,
    position: 'bottom-right',
    color: 'cyan',
    products: [
      {
        name: 'Kompetenzmanagement, Future Skills & Coaching',
        description: [
          'Wenn sich Anforderungen durch Disruption so schnell verschieben, entscheidet nicht „mehr Training“, sondern die richtigen Fähigkeiten zur richtigen Zeit.',
          'Mit diesem Produkt machen wir Kompetenzen steuerbar: Wir leiten Future Skills aus Strategie und Rollen ab, erfassen den Ist‑Stand (Skill‑Profil, Skill‑Gap, kritische Rollen) und priorisieren die größten Hebel. Durch 270- oder 360 Grad-Feedbacks evaluieren wir Kompetenzen und empfehlen in individuellen Feedbackgesprächen Entwicklungsmaßnahmen.',
          'Wir bauen eine unternehmensspezifische Lernumgebung, die wirklich wirkt (Praxisprojekte, Peer‑Learning, kurze Lernformate, Transfer in den Alltag) – inklusive Messgrößen, damit Entwicklung sichtbar wird und die Organisation dauerhaft lernfähig bleibt. Durch unsere zertifizierten Coaches begleichten wir Führungskräfte in ihrer Entwicklung auch langfristig.',
  <>Weitere Informationen unter: <a href="https://www.uvm-coaching.de" target="_blank" rel="noopener noreferrer" className="text-tertiary-600 hover:text-tertiary-700 underline font-medium">www.uvm-coaching.de</a></>,],

        icon: Users,
      },
      {
        name: 'Führungskräftequalifizierung',
        description: 'Gezielte Entwicklung von Führungskompetenzen für die Anforderungen der digitalen Arbeitswelt.',
        icon: GraduationCap,
      },
      {
        name: 'Business Gaming & Outdoor Learning',
        description: [ 'In disruptiven Zeiten braucht es Lernformate, die nicht nur Wissen vermitteln, sondern Handeln trainieren und dadurch Handlungskompetenz aufbauen.',
                      'Mit Business Gaming & Outdoor Learning schaffen wir realitätsnahe Simulationen und herausfordernde Settings, in denen Teams Entscheidungen unter Unsicherheit treffen, Rollen klären, kommunizieren und zusammenarbeiten – mit unmittelbarem Feedback.',
                      'Der entscheidende Teil ist der Transfer: Wir reflektieren gemeinsam, was funktioniert hat, wo Reibungsverluste entstanden sind und welche konkreten Routinen/Prinzipien daraus in den Arbeitsalltag übernommen werden. So werden Kompetenzen, Zusammenarbeit und Führungsverhalten spürbar weiterentwickelt – praxisnah und wirksam.',
                      <>Weitere Informationen unter: <a href="https://www.uvm-active.de" target="_blank" rel="noopener noreferrer" className="text-tertiary-600 hover:text-tertiary-700 underline font-medium">www.uvm-active.de</a></>,
                      ],
        icon: Gamepad2,
      },
      {
        name: 'KI-Ready Leader & Augmented Leadership',
        description: [
          'KI verändert Führung nicht nur technisch, sondern im Kern: Entscheidungen, Kommunikation und Mitarbeiterentwicklung können deutlich schneller und besser vorbereitet werden – wenn Führungskräfte wissen, wie man KI sinnvoll, sicher und verantwortungsvoll einsetzt.',
          'In diesem Produkt qualifizieren wir Führungskräfte in AI‑Literacy, identifizieren die wirksamsten Führungs‑Use‑Cases (z. B. Entscheidungs‑Vorbereitung, Meeting‑Design, Coaching/Feedback, Talent- & Skill‑Entwicklung) und integrieren passende KI‑Tools als „Co‑Pilot“ in die tägliche Führungspraxis.',
          'Gleichzeitig setzen wir klare Leitplanken (Transparenz, Datenschutz/DSGVO, Fairness/Bias, Human‑in‑the‑Loop) und begleiten den Change, damit Akzeptanz, Vertrauen und Compliance nicht leiden, sondern gestärkt werden.',
          ],
        icon: Cpu,
      },
    ],
  },
];

export type Thema = { id: string; titel: string; frage: string; absaetze: string[] };

export const THEMEN: Thema[] = [
  {
    id: 'intro-disruption',
    titel: 'Disruption strategisch gestalten',
    frage: 'Wie bereite ich meine Organisation auf Umbrüche vor, die noch niemand kommen sieht?',
    absaetze: [
      'Disruption trifft die, die sich für unverwundbar halten. Viele Organisationen investieren in Innovationsprogramme, agile Methoden und digitale Transformation. Dennoch scheitern Veränderungsprozesse regelmäßig – nicht an der Strategie, sondern an der Fähigkeit, Gewohntes loszulassen.',
      'Wer Disruption nur als technologisches Phänomen begreift, übersieht ihren eigentlichen Hebel: die Bereitschaft von Führungskräften, das eigene Geschäftsmodell radikal zu hinterfragen. Der 4C-Navigator beginnt bei der Corporate Strategy – nicht als Planungsübung, sondern als ehrliche Standortbestimmung: Wie weit tragen Ihre Prozesse, wenn sich die Spielregeln ändern?',
    ],
  },
  {
    id: 'intro-trust-ki',
    titel: 'Trust & KI-Strategie',
    frage: 'Wie schaffe ich Vertrauen in einer Organisation, die zunehmend von Algorithmen mitgesteuert wird?',
    absaetze: [
      'Künstliche Intelligenz verändert nicht nur Prozesse – sie verschiebt die Grundlagen, auf denen Vertrauen in Organisationen entsteht. Die entscheidende Hürde ist nicht die Technologie, sondern die Akzeptanz. Mitarbeitende fragen sich, ob Entscheidungen noch nachvollziehbar sind. Führungskräfte stehen vor der Herausforderung, Verantwortung zu übernehmen für Ergebnisse, die sie nicht vollständig durchdringen.',
      'Im 4C-Modell greifen hier zwei Dimensionen ineinander: Corporate Strategy liefert den Rahmen für den KI-Einsatz – von der Digitalisierungsstrategie über People Analytics bis zur Prozessoptimierung. Der Code of Conduct stellt sicher, dass dieser Einsatz ethisch fundiert und nachvollziehbar bleibt. Vertrauenswürdige KI-Strategie beginnt nicht im Serverraum, sondern dort, wo Prinzipien auf Entscheidungen treffen – in der Führungsetage.',
    ],
  },
  {
    id: 'intro-trustful-leadership',
    titel: 'Trustful Leadership',
    frage: 'Wie führe ich so, dass Menschen mir auch dann folgen, wenn der Weg unsicher ist?',
    absaetze: [
      'In Zeiten permanenter Veränderung wird Vertrauen zur knappsten Ressource in Organisationen. Klassische Führungsmodelle setzen auf Kontrolle, Zielvorgaben und Reporting. Diese Instrumente verlieren ihre Wirksamkeit, wenn Märkte sich schneller verändern als Planungszyklen reichen.',
      'Trustful Leadership ist im 4C-Modell kein Einzelbaustein, sondern das verbindende Prinzip: Culture & Change schafft die psychologische Sicherheit, in der Offenheit möglich wird. Die Competences-Dimension entwickelt die Fähigkeiten, die vertrauensbasierte Führung im Alltag braucht – von systemischer Gesprächsführung bis zur Fähigkeit, Verletzlichkeit als Stärke zu begreifen. Nicht als weiches Kulturprogramm, sondern als strategische Kernkompetenz.',
    ],
  },
  {
    id: 'intro-female-leadership',
    titel: 'Female Leadership',
    frage: 'Wie entfaltet Führung ihre volle Wirkung, wenn Perspektivenvielfalt kein Lippenbekenntnis bleibt?',
    absaetze: [
      'Diversity in Führungspositionen ist kein Fairness-Thema – es ist eine Frage der strategischen Intelligenz. Diverse Führungsteams treffen bessere Entscheidungen, erkennen Risiken früher und reagieren flexibler auf Veränderungen. Dennoch verharren viele Organisationen in homogenen Strukturen – nicht aus bösem Willen, sondern weil Systeme sich selbst reproduzieren.',
      'Hier zeigt der 4C-Navigator, warum isolierte Maßnahmen scheitern: Mentoring allein ändert keine Culture, Quoten allein ersetzen keine Competence-Entwicklung, und Leitbilder bleiben wirkungslos ohne einen Code of Conduct, der Perspektivenvielfalt in konkretes Führungshandeln übersetzt. Female Leadership strategisch zu fördern bedeutet, alle vier Dimensionen gleichzeitig in den Blick zu nehmen.',
    ],
  },
];

export type Format = { id: string; titel: string; text: string };

export const FORMATE: Format[] = [
  { id: 'intro-beratung', titel: 'Beratung', text: 'Wir begleiten Vorstände, Geschäftsführungen und Führungsteams bei strategischen Fragen zu Disruption, Digitalisierung, KI und Führung. Gemeinsam klären wir Ausgangslage, Zielbild und Prioritäten und übersetzen komplexe Entwicklungen in belastbare Entscheidungen, klare Verantwortlichkeiten und realistische nächste Schritte.' },
  { id: 'intro-workshops', titel: 'Workshops', text: 'Unsere Workshops schaffen einen strukturierten Raum, um Perspektiven zu bündeln, Spannungen sichtbar zu machen und tragfähige Lösungen zu erarbeiten. So entstehen nicht nur gute Diskussionen, sondern konkrete Entscheidungen, belastbare Roadmaps und eine gemeinsame Grundlage für wirksame Umsetzung.' },
  { id: 'intro-coachings', titel: 'Coachings', text: 'In unseren Coachings begleiten wir Führungskräfte und Schlüsselpersonen in Phasen hoher Dynamik, Unsicherheit oder persönlicher Neuorientierung. Im vertraulichen Sparring stärken wir Entscheidungsfähigkeit, kommunikative Klarheit und Führungswirksamkeit, besonders im Zusammenspiel von KI, Veränderung und Verantwortung.' },
  { id: 'intro-vortraege', titel: 'Vorträge', text: 'Unsere Vorträge verbinden wissenschaftliche Fundierung mit strategischer Relevanz und klarer Sprache. Wir geben Impulse zu KI, Trustful Leadership, Disruption, Kulturwandel und Female Leadership, die Orientierung geben, Diskussionen öffnen und den Blick auf konkrete Handlungsfelder lenken.' },
  { id: 'intro-schulungen', titel: 'Schulungen', text: 'Unsere Schulungen vermitteln Wissen praxisnah, anschlussfähig und auf die Realität Ihrer Organisation zugeschnitten. Wir qualifizieren Führungskräfte, Mitarbeitende und Multiplikatoren in Themen wie KI-Kompetenz, Veränderungsfähigkeit, Kommunikation und Führung, damit aus Erkenntnis tatsächlich neue Praxis entsteht.' },
];

/** Einleitung der Übersichtsseite /leistungen/ */
export const LEISTUNGEN_EINLEITUNG = 'Die UVM Consulting Group berät Unternehmen, Verwaltungen, Hochschulen und Gesundheitseinrichtungen an der Schnittstelle von Ökonomie und Psychologie. Grundlage aller Projekte ist das 4C-Modell, das Corporate Strategy, Culture & Change, Code of Conduct und Competences zu einem System verbindet. Auf dieser Seite finden Sie unsere Leistungsfelder im Überblick. Jede Leistung bieten wir als Beratung, Workshop, Coaching, Vortrag oder Schulung an.';

export type Leistungsseite = {
  pfad: string;
  /** Sichtbarer Seitentitel (H1) */
  h1: string;
  /** <title> */
  title: string;
  description: string;
  einleitung: [string, string];
  /** Die ersten zwei Sätze der Einleitung (Kacheln auf /leistungen/) */
  kurztext: string;
};

export const LEISTUNGSSEITEN = {
  KI_STRATEGIE: {
    pfad: ROUTES_LEISTUNGEN.KI_STRATEGIE,
    h1: 'KI-Strategie und Digitalisierung',
    title: 'KI-Strategie und Digitalisierung – UVM Consulting Group',
    description: 'Beratung für KI-Strategie, Digitalisierung, People Analytics und Prozessoptimierung. Wissenschaftlich fundiert, messbar umgesetzt. Erding und Olching bei München.',
    einleitung: [
      'Künstliche Intelligenz und Digitalisierung verändern Geschäftsmodelle, Prozesse, Entscheidungswege und Kompetenzanforderungen zugleich. Viele Organisationen reagieren mit Einzelprojekten, die nebeneinander laufen und sich gegenseitig blockieren. Wir beraten Vorstände und Geschäftsführungen dabei, den Einsatz von KI aus der Unternehmensstrategie abzuleiten und in eine Roadmap zu übersetzen, die Technik, Prozesse, Kompetenzen und Verantwortung gemeinsam entwickelt.',
      'Im 4C-Modell gehört dieses Feld zur Dimension Corporate Strategy. Sie liefert den Rahmen für Digitalisierungsstrategie, People Analytics, Prozessoptimierung und eine Organisation, die für KI bereit ist. Die Verbindung zum Code of Conduct sorgt dafür, dass der Einsatz nachvollziehbar bleibt und Vertrauen in der Belegschaft entsteht.',
    ],
    kurztext: 'Künstliche Intelligenz und Digitalisierung verändern Geschäftsmodelle, Prozesse, Entscheidungswege und Kompetenzanforderungen zugleich. Viele Organisationen reagieren mit Einzelprojekten, die nebeneinander laufen und sich gegenseitig blockieren.',
  },
  CHANGE_MANAGEMENT: {
    pfad: ROUTES_LEISTUNGEN.CHANGE_MANAGEMENT,
    h1: 'Change Management und Unternehmenskultur',
    title: 'Change Management und Unternehmenskultur – UVM Consulting Group',
    description: 'Change Management, digitale Kultur, Behavioral Design und Arbeitgeberzertifizierung. Veränderung psychologisch fundiert gestalten. Erding und Olching bei München.',
    einleitung: [
      'Veränderungsprozesse scheitern selten an der Strategie. Sie scheitern an Gewohnheiten, an fehlender Akzeptanz, an Strukturen, die sich von allein erhalten, und an Führungskräften, die das Neue selbst nicht vorleben. Wir verbinden Ökonomie und Psychologie und begleiten Organisationen dabei, Wandel so zu gestalten, dass Mitarbeitende ihn mittragen. Grundlage ist die Dimension Culture & Change im 4C-Modell.',
      'Dazu gehören die Entwicklung einer digitalen Kultur, Behavioral Design und Nudging, die Zertifizierung als Empfehlenswerter Arbeitgeber und der KI Change Readiness Radar, der den Stand der Veränderungsbereitschaft messbar macht. Zu diesem Thema haben wir unter anderem das Buch „Psychologische Auswirkungen von Change Prozessen" (Landes und Steiner, 2014) veröffentlicht.',
    ],
    kurztext: 'Veränderungsprozesse scheitern selten an der Strategie. Sie scheitern an Gewohnheiten, an fehlender Akzeptanz, an Strukturen, die sich von allein erhalten, und an Führungskräften, die das Neue selbst nicht vorleben.',
  },
  CODE_OF_CONDUCT: {
    pfad: ROUTES_LEISTUNGEN.CODE_OF_CONDUCT,
    h1: 'Leadership Principles und Code of Conduct',
    title: 'Leadership Principles und Code of Conduct – UVM Consulting Group',
    description: 'Leadership Principles, Core Values, KI-Governance und Green Culture als verbindliche Verhaltensgrundsätze. Beratung für Führung mit Vertrauen bei München.',
    einleitung: [
      'Leitbilder bleiben wirkungslos, wenn sie nicht in Führungshandeln übersetzt werden. Ein Code of Conduct legt fest, nach welchen Grundsätzen in einer Organisation entschieden, geführt, kommuniziert und zusammengearbeitet wird. Er gibt Führungskräften Orientierung in Situationen, für die es keine Regel gibt, und er macht Werte überprüfbar.',
      'Im 4C-Modell bildet der Code of Conduct die dritte Dimension. Wir erarbeiten mit Ihnen Leadership Principles und Sensegiving, Core Values und Purpose, Grundsätze für den Einsatz von KI in Führung und Organisation sowie eine Green Culture, die Nachhaltigkeit im Alltag verankert. Trustful Leadership ist dabei das verbindende Prinzip.',
    ],
    kurztext: 'Leitbilder bleiben wirkungslos, wenn sie nicht in Führungshandeln übersetzt werden. Ein Code of Conduct legt fest, nach welchen Grundsätzen in einer Organisation entschieden, geführt, kommuniziert und zusammengearbeitet wird.',
  },
  KOMPETENZMANAGEMENT: {
    pfad: ROUTES_LEISTUNGEN.KOMPETENZMANAGEMENT,
    h1: 'Kompetenzmanagement und Future Skills',
    title: 'Kompetenzmanagement und Future Skills – UVM Consulting Group',
    description: 'Kompetenzmanagement, Future Skills, Führungskräftequalifizierung, Business Gaming und KI-Ready Leadership. Wissenschaftlich fundierte Kompetenzentwicklung.',
    einleitung: [
      'Welche Kompetenzen eine Organisation in fünf Jahren braucht, lässt sich heute nur in Teilen vorhersagen. Umso wichtiger ist ein Kompetenzmanagement, das vorhandene Fähigkeiten erfasst, Lücken sichtbar macht, Entwicklung steuert und Wirkung überprüft. Wir verbinden dafür Kompetenzmodelle, Feedbackinstrumente, Coaching und Qualifizierungsprogramme zu einem System, das zur jeweiligen Organisation passt.',
      'Im 4C-Modell ist dies die Dimension Competences. Sie umfasst Kompetenzmanagement und Future Skills, die modulare Führungskräftequalifizierung, Business Gaming und Outdoor Learning sowie die Entwicklung von Führungskräften, die KI kompetent einsetzen. Die Seminare und Programme dazu bündeln wir in der UVM-Akademie.',
    ],
    kurztext: 'Welche Kompetenzen eine Organisation in fünf Jahren braucht, lässt sich heute nur in Teilen vorhersagen. Umso wichtiger ist ein Kompetenzmanagement, das vorhandene Fähigkeiten erfasst, Lücken sichtbar macht, Entwicklung steuert und Wirkung überprüft.',
  },
  FEMALE_LEADERSHIP: {
    pfad: ROUTES_LEISTUNGEN.FEMALE_LEADERSHIP,
    h1: 'Female Leadership',
    title: 'Female Leadership – UVM Consulting Group',
    description: 'Female Leadership strategisch fördern: Kultur, Kompetenzen, Verhaltensgrundsätze und Strategie zusammen entwickeln. Beratung, Workshops, Coaching und Vorträge.',
    einleitung: [
      'Frauen sind in Führungspositionen vieler Organisationen unterrepräsentiert. Einzelmaßnahmen wie Mentoring oder Quoten verändern daran wenig, solange Kultur, Kompetenzentwicklung, Verhaltensgrundsätze und Strategie nicht zusammenwirken.',
      'Wir unterstützen Organisationen mit Beratung, Workshops, Coaching und Vorträgen dabei, Female Leadership als strategisches Thema zu verankern. Prof. Dr. Miriam Landes bringt dazu ihre Expertise im Bereich Female und Responsible Leadership ein.',
    ],
    kurztext: 'Frauen sind in Führungspositionen vieler Organisationen unterrepräsentiert. Einzelmaßnahmen wie Mentoring oder Quoten verändern daran wenig, solange Kultur, Kompetenzentwicklung, Verhaltensgrundsätze und Strategie nicht zusammenwirken.',
  },
  COACHING: {
    pfad: ROUTES_LEISTUNGEN.COACHING,
    h1: 'Coaching für Führungskräfte',
    title: 'Coaching für Führungskräfte – UVM Consulting Group',
    description: 'Systemisches Management Coaching für Vorstände, Geschäftsführungen, Führungskräfte und Schlüsselpersonen. Vertrauliches Sparring bei Veränderung und Neuorientierung.',
    einleitung: [
      'Wir begleiten Vorstände, Geschäftsführungen, Führungskräfte und Schlüsselpersonen im vertraulichen Sparring, wenn Entscheidungen anstehen, Rollen sich verändern, Konflikte den Alltag bestimmen oder die eigene Wirksamkeit neu justiert werden soll. Grundlage ist der Ansatz des Systemischen Management Coachings (SMC), nach dem auch UVM Coaching als Gesellschaft der Gruppe arbeitet.',
      'Die Formate umfassen Top-Executive Coaching, Einzelcoaching für Führungskräfte, Teamcoaching und E-Coaching. Prof. Dr. Miriam Landes ist Mitglied des wissenschaftlichen Beirats des Deutschen Bundesverbands Coaching (DBVC).',
    ],
    kurztext: 'Wir begleiten Vorstände, Geschäftsführungen, Führungskräfte und Schlüsselpersonen im vertraulichen Sparring, wenn Entscheidungen anstehen, Rollen sich verändern, Konflikte den Alltag bestimmen oder die eigene Wirksamkeit neu justiert werden soll. Grundlage ist der Ansatz des Systemischen Management Coachings (SMC), nach dem auch UVM Coaching als Gesellschaft der Gruppe arbeitet.',
  },
} satisfies Record<keyof typeof ROUTES_LEISTUNGEN, Leistungsseite>;

export type LeistungsseitenKey = keyof typeof LEISTUNGSSEITEN;

export const LEISTUNGSSEITEN_REIHENFOLGE: LeistungsseitenKey[] = [
  'KI_STRATEGIE',
  'CHANGE_MANAGEMENT',
  'CODE_OF_CONDUCT',
  'KOMPETENZMANAGEMENT',
  'FEMALE_LEADERSHIP',
  'COACHING',
];

/** Einleitungstext der Seite /fuehrungskraeftequalifizierung/ (auch Kachel auf /leistungen/) */
export const FUEHRUNGSKRAEFTE_EINLEITUNG =
  'Die Qualifizierung ist modular aufgebaut. Je nach Rolle, Erfahrung und Zielsetzung lassen sich einzelne Trainings oder komplette Lernpfade zur Führungskräfteentwicklung kombinieren.';

export function themaNachId(id: string): Thema {
  const thema = THEMEN.find((t) => t.id === id);
  if (!thema) throw new Error(`Thema ${id} fehlt`);
  return thema;
}

export function formatNachId(id: string): Format {
  const format = FORMATE.find((f) => f.id === id);
  if (!format) throw new Error(`Format ${id} fehlt`);
  return format;
}

import { useCallback, useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import type { Session } from '@supabase/supabase-js';
import { Eye, EyeOff, LogOut, Pencil, Plus, Trash2, X } from 'lucide-react';
import Seo from '../components/Seo';
import Einbettung from '../components/Einbettung';
import { getSupabase, supabaseKonfiguriert } from '../lib/supabase';
import {
  TYPEN,
  TYP_LABEL,
  datumFormatiert,
  einbettungsUrlAusEingabe,
  heuteIso,
  type AktuellesTyp,
  type Beitrag,
} from '../lib/aktuelles';
import logoImage from '../assets/UVM_Institut_HighRes.png';

type Formular = {
  typ: AktuellesTyp;
  datum: string;
  titel: string;
  kurztext: string;
  url: string;
  bild_url: string;
  einbettung: string;
  veroeffentlicht: boolean;
};

const LEERES_FORMULAR: Formular = {
  typ: 'linkedin',
  datum: heuteIso(),
  titel: '',
  kurztext: '',
  url: '',
  bild_url: '',
  einbettung: '',
  veroeffentlicht: true,
};

type Redakteur = { email: string; name: string | null };

export default function VerwaltungPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [sessionGeprueft, setSessionGeprueft] = useState(false);
  const [istRedakteur, setIstRedakteur] = useState<boolean | null>(null);

  // Anmeldung
  const [email, setEmail] = useState('');
  const [passwort, setPasswort] = useState('');
  const [anmeldeFehler, setAnmeldeFehler] = useState<string | null>(null);
  const [anmeldungLaeuft, setAnmeldungLaeuft] = useState(false);

  // Beiträge
  const [beitraege, setBeitraege] = useState<Beitrag[]>([]);
  const [formular, setFormular] = useState<Formular>(LEERES_FORMULAR);
  const [bearbeiteId, setBearbeiteId] = useState<string | null>(null);
  const [formularOffen, setFormularOffen] = useState(false);
  const [speichert, setSpeichert] = useState(false);
  const [meldung, setMeldung] = useState<{ art: 'ok' | 'fehler'; text: string } | null>(null);
  const [loeschId, setLoeschId] = useState<string | null>(null);

  // Redakteure
  const [redakteure, setRedakteure] = useState<Redakteur[]>([]);
  const [neueRedakteurEmail, setNeueRedakteurEmail] = useState('');
  const [neueRedakteurName, setNeueRedakteurName] = useState('');

  // --- Sitzung beobachten -------------------------------------------------
  useEffect(() => {
    if (!supabaseKonfiguriert) {
      setSessionGeprueft(true);
      return;
    }
    const supabase = getSupabase();
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setSessionGeprueft(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, neueSession) => {
      setSession(neueSession);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const ladeBeitraege = useCallback(async () => {
    const { data, error } = await getSupabase()
      .from('aktuelles')
      .select('*')
      .order('datum', { ascending: false })
      .order('erstellt_am', { ascending: false });
    if (error) {
      setMeldung({ art: 'fehler', text: `Beiträge konnten nicht geladen werden: ${error.message}` });
      return;
    }
    setBeitraege((data ?? []) as Beitrag[]);
  }, []);

  const ladeRedakteure = useCallback(async () => {
    const { data } = await getSupabase().from('aktuelles_redakteure').select('email, name').order('email');
    setRedakteure((data ?? []) as Redakteur[]);
  }, []);

  // --- Nach Anmeldung: Redakteursrecht prüfen und Daten laden ------------
  useEffect(() => {
    if (!session) {
      setIstRedakteur(null);
      setBeitraege([]);
      setRedakteure([]);
      return;
    }
    let aktiv = true;
    getSupabase()
      .rpc('ist_redakteur')
      .then(({ data, error }) => {
        if (!aktiv) return;
        const ok = !error && data === true;
        setIstRedakteur(ok);
        if (ok) {
          ladeBeitraege();
          ladeRedakteure();
        }
      });
    return () => {
      aktiv = false;
    };
  }, [session, ladeBeitraege, ladeRedakteure]);

  // --- Anmelden / Abmelden ------------------------------------------------
  async function anmelden(e: FormEvent) {
    e.preventDefault();
    setAnmeldeFehler(null);
    setAnmeldungLaeuft(true);
    const { error } = await getSupabase().auth.signInWithPassword({ email: email.trim(), password: passwort });
    setAnmeldungLaeuft(false);
    if (error) {
      setAnmeldeFehler('Anmeldung fehlgeschlagen. Bitte E-Mail-Adresse und Passwort prüfen.');
      return;
    }
    setPasswort('');
  }

  async function abmelden() {
    await getSupabase().auth.signOut();
    setSession(null);
  }

  // --- Formular -------------------------------------------------------------
  function neuerBeitrag() {
    setBearbeiteId(null);
    setFormular({ ...LEERES_FORMULAR, datum: heuteIso() });
    setFormularOffen(true);
    setMeldung(null);
  }

  function bearbeiten(b: Beitrag) {
    setBearbeiteId(b.id);
    setFormular({
      typ: b.typ,
      datum: b.datum,
      titel: b.titel,
      kurztext: b.kurztext ?? '',
      url: b.url ?? '',
      bild_url: b.bild_url ?? '',
      einbettung: b.einbettung_url ?? '',
      veroeffentlicht: b.veroeffentlicht,
    });
    setFormularOffen(true);
    setMeldung(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function formularSchliessen() {
    setFormularOffen(false);
    setBearbeiteId(null);
    setFormular(LEERES_FORMULAR);
  }

  const einbettungUrl = einbettungsUrlAusEingabe(formular.einbettung);
  const einbettungUngueltig = formular.einbettung.trim() !== '' && einbettungUrl === null;

  async function speichern(e: FormEvent) {
    e.preventDefault();
    setMeldung(null);
    if (!formular.titel.trim()) {
      setMeldung({ art: 'fehler', text: 'Bitte einen Titel eingeben.' });
      return;
    }
    if (einbettungUngueltig) {
      setMeldung({
        art: 'fehler',
        text: 'Die Einbettung wurde nicht erkannt. Bitte den Einbettungscode (iframe) von LinkedIn, Spotify, Apple Podcasts oder YouTube einfügen oder das Feld leeren.',
      });
      return;
    }
    const leerZuNull = (s: string) => (s.trim() === '' ? null : s.trim());
    const datensatz = {
      typ: formular.typ,
      datum: formular.datum,
      titel: formular.titel.trim(),
      kurztext: leerZuNull(formular.kurztext),
      url: leerZuNull(formular.url),
      bild_url: leerZuNull(formular.bild_url),
      einbettung_url: einbettungUrl,
      veroeffentlicht: formular.veroeffentlicht,
    };

    setSpeichert(true);
    const supabase = getSupabase();
    const { error } = bearbeiteId
      ? await supabase.from('aktuelles').update(datensatz).eq('id', bearbeiteId)
      : await supabase.from('aktuelles').insert({ ...datensatz, erstellt_von: session?.user.email ?? null });
    setSpeichert(false);

    if (error) {
      setMeldung({ art: 'fehler', text: `Speichern fehlgeschlagen: ${error.message}` });
      return;
    }
    setMeldung({ art: 'ok', text: bearbeiteId ? 'Beitrag gespeichert.' : 'Beitrag angelegt.' });
    formularSchliessen();
    ladeBeitraege();
  }

  async function sichtbarkeitUmschalten(b: Beitrag) {
    const { error } = await getSupabase()
      .from('aktuelles')
      .update({ veroeffentlicht: !b.veroeffentlicht })
      .eq('id', b.id);
    if (error) {
      setMeldung({ art: 'fehler', text: `Änderung fehlgeschlagen: ${error.message}` });
      return;
    }
    ladeBeitraege();
  }

  async function loeschen(id: string) {
    const { error } = await getSupabase().from('aktuelles').delete().eq('id', id);
    setLoeschId(null);
    if (error) {
      setMeldung({ art: 'fehler', text: `Löschen fehlgeschlagen: ${error.message}` });
      return;
    }
    setMeldung({ art: 'ok', text: 'Beitrag gelöscht.' });
    ladeBeitraege();
  }

  // --- Redakteure -----------------------------------------------------------
  async function redakteurHinzufuegen(e: FormEvent) {
    e.preventDefault();
    const mail = neueRedakteurEmail.trim().toLowerCase();
    if (!mail.includes('@')) {
      setMeldung({ art: 'fehler', text: 'Bitte eine gültige E-Mail-Adresse eingeben.' });
      return;
    }
    const { error } = await getSupabase()
      .from('aktuelles_redakteure')
      .insert({ email: mail, name: neueRedakteurName.trim() || null });
    if (error) {
      setMeldung({ art: 'fehler', text: `Redakteur konnte nicht angelegt werden: ${error.message}` });
      return;
    }
    setNeueRedakteurEmail('');
    setNeueRedakteurName('');
    setMeldung({
      art: 'ok',
      text: `${mail} ist als Redakteur eingetragen. Damit sich die Person anmelden kann, muss in Supabase unter Authentication > Users zusätzlich ein Konto mit genau dieser E-Mail-Adresse angelegt werden.`,
    });
    ladeRedakteure();
  }

  async function redakteurEntfernen(mail: string) {
    const { error } = await getSupabase().from('aktuelles_redakteure').delete().eq('email', mail);
    if (error) {
      setMeldung({ art: 'fehler', text: `Entfernen fehlgeschlagen: ${error.message}` });
      return;
    }
    ladeRedakteure();
  }

  // --- Darstellung ----------------------------------------------------------
  const eingabeKlasse =
    'mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-base text-gray-900 focus:border-primary-500 focus:ring-1 focus:ring-primary-500';

  let inhalt: ReactNodeLike;

  if (!supabaseKonfiguriert) {
    inhalt = (
      <Hinweis>
        Die Verwaltung ist nicht eingerichtet: In der Datei .env fehlen VITE_SUPABASE_URL und VITE_SUPABASE_ANON_KEY.
      </Hinweis>
    );
  } else if (!sessionGeprueft) {
    inhalt = <Hinweis>Anmeldung wird geprüft …</Hinweis>;
  } else if (!session) {
    inhalt = (
      <form onSubmit={anmelden} className="max-w-md bg-white rounded-xl border border-gray-200 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Anmeldung</h2>
        <label className="block text-sm font-medium text-gray-700">
          E-Mail-Adresse
          <input
            type="email"
            autoComplete="username"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={eingabeKlasse}
          />
        </label>
        <label className="block text-sm font-medium text-gray-700 mt-4">
          Passwort
          <input
            type="password"
            autoComplete="current-password"
            required
            value={passwort}
            onChange={(e) => setPasswort(e.target.value)}
            className={eingabeKlasse}
          />
        </label>
        {anmeldeFehler && <p className="mt-4 text-sm text-rose-700">{anmeldeFehler}</p>}
        <button
          type="submit"
          disabled={anmeldungLaeuft}
          className="mt-6 w-full bg-primary-600 text-white px-5 py-2.5 rounded-lg text-base font-medium hover:bg-primary-700 disabled:opacity-60 transition-colors"
        >
          {anmeldungLaeuft ? 'Anmeldung läuft …' : 'Anmelden'}
        </button>
      </form>
    );
  } else if (istRedakteur === null) {
    inhalt = <Hinweis>Berechtigung wird geprüft …</Hinweis>;
  } else if (!istRedakteur) {
    inhalt = (
      <Hinweis>
        Das Konto {session.user.email} ist angemeldet, aber nicht als Redakteur freigeschaltet. Bitte wenden Sie sich an
        Prof. Steiner oder Prof. Landes.
        <button type="button" onClick={abmelden} className="ml-3 underline text-primary-700">
          Abmelden
        </button>
      </Hinweis>
    );
  } else {
    inhalt = (
      <>
        {meldung && (
          <div
            role="status"
            className={`mb-6 rounded-lg px-4 py-3 text-sm ${
              meldung.art === 'ok' ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'
            }`}
          >
            {meldung.text}
          </div>
        )}

        {!formularOffen && (
          <button
            type="button"
            onClick={neuerBeitrag}
            className="inline-flex items-center gap-2 bg-primary-600 text-white px-5 py-2.5 rounded-lg text-base font-medium hover:bg-primary-700 transition-colors"
          >
            <Plus size={18} />
            Neuer Beitrag
          </button>
        )}

        {formularOffen && (
          <form onSubmit={speichern} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                {bearbeiteId ? 'Beitrag bearbeiten' : 'Neuer Beitrag'}
              </h2>
              <button type="button" onClick={formularSchliessen} aria-label="Schließen" className="p-2 text-gray-500 hover:text-gray-800">
                <X size={20} />
              </button>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <label className="block text-sm font-medium text-gray-700">
                Art des Beitrags
                <select
                  value={formular.typ}
                  onChange={(e) => setFormular({ ...formular, typ: e.target.value as AktuellesTyp })}
                  className={eingabeKlasse}
                >
                  {TYPEN.map((t) => (
                    <option key={t} value={t}>
                      {TYP_LABEL[t]}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block text-sm font-medium text-gray-700">
                Datum
                <input
                  type="date"
                  required
                  value={formular.datum}
                  onChange={(e) => setFormular({ ...formular, datum: e.target.value })}
                  className={eingabeKlasse}
                />
              </label>
            </div>

            <label className="block text-sm font-medium text-gray-700 mt-5">
              Titel
              <input
                type="text"
                required
                maxLength={200}
                value={formular.titel}
                onChange={(e) => setFormular({ ...formular, titel: e.target.value })}
                className={eingabeKlasse}
              />
            </label>

            <label className="block text-sm font-medium text-gray-700 mt-5">
              Kurztext (optional)
              <textarea
                rows={4}
                maxLength={2000}
                value={formular.kurztext}
                onChange={(e) => setFormular({ ...formular, kurztext: e.target.value })}
                className={eingabeKlasse}
              />
            </label>

            <div className="grid gap-5 md:grid-cols-2 mt-5">
              <label className="block text-sm font-medium text-gray-700">
                Link (optional)
                <input
                  type="url"
                  placeholder="https://…"
                  value={formular.url}
                  onChange={(e) => setFormular({ ...formular, url: e.target.value })}
                  className={eingabeKlasse}
                />
              </label>
              <label className="block text-sm font-medium text-gray-700">
                Bild-Adresse (optional)
                <input
                  type="url"
                  placeholder="https://… (z. B. Buchcover)"
                  value={formular.bild_url}
                  onChange={(e) => setFormular({ ...formular, bild_url: e.target.value })}
                  className={eingabeKlasse}
                />
              </label>
            </div>

            <label className="block text-sm font-medium text-gray-700 mt-5">
              Einbettung (optional)
              <textarea
                rows={3}
                placeholder="Einbettungscode von LinkedIn („Einbetten“ am Beitrag), Spotify, Apple Podcasts oder YouTube hier einfügen"
                value={formular.einbettung}
                onChange={(e) => setFormular({ ...formular, einbettung: e.target.value })}
                className={`${eingabeKlasse} font-mono text-sm`}
              />
            </label>
            {einbettungUngueltig && (
              <p className="mt-2 text-sm text-rose-700">
                Nicht erkannt. Erlaubt sind Einbettungscodes oder Einbettungs-Links von LinkedIn, Spotify, Apple
                Podcasts, YouTube, Vimeo, Podigee und Deezer. Ein normaler LinkedIn-Beitragslink reicht nicht, dafür
                bitte am Beitrag „Einbetten“ wählen und den Code kopieren.
              </p>
            )}
            {einbettungUrl && (
              <div className="mt-3">
                <p className="text-xs text-gray-500 mb-2">Vorschau (wird so auf der Seite erscheinen):</p>
                <Einbettung url={einbettungUrl} titel={formular.titel || 'Vorschau'} />
              </div>
            )}

            <label className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                checked={formular.veroeffentlicht}
                onChange={(e) => setFormular({ ...formular, veroeffentlicht: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              Auf der Webseite veröffentlichen
            </label>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={speichert}
                className="bg-primary-600 text-white px-5 py-2.5 rounded-lg text-base font-medium hover:bg-primary-700 disabled:opacity-60 transition-colors"
              >
                {speichert ? 'Speichert …' : 'Speichern'}
              </button>
              <button
                type="button"
                onClick={formularSchliessen}
                className="px-5 py-2.5 rounded-lg text-base font-medium text-gray-700 border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                Abbrechen
              </button>
            </div>
          </form>
        )}

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Beiträge ({beitraege.length})</h2>
          {beitraege.length === 0 ? (
            <p className="text-base text-gray-600">Noch keine Beiträge vorhanden.</p>
          ) : (
            <ul className="divide-y divide-gray-200 bg-white rounded-xl border border-gray-200 shadow-sm">
              {beitraege.map((b) => (
                <li key={b.id} className="flex flex-col md:flex-row md:items-center gap-3 p-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
                      <span className="inline-block px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 font-semibold">
                        {TYP_LABEL[b.typ]}
                      </span>
                      <span>{datumFormatiert(b.datum)}</span>
                      {!b.veroeffentlicht && (
                        <span className="inline-block px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-semibold">
                          nicht veröffentlicht
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-base font-medium text-gray-900 truncate">{b.titel}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <KleinerKnopf onClick={() => bearbeiten(b)} titel="Bearbeiten">
                      <Pencil size={16} /> Bearbeiten
                    </KleinerKnopf>
                    <KleinerKnopf
                      onClick={() => sichtbarkeitUmschalten(b)}
                      titel={b.veroeffentlicht ? 'Verbergen' : 'Veröffentlichen'}
                    >
                      {b.veroeffentlicht ? <EyeOff size={16} /> : <Eye size={16} />}
                      {b.veroeffentlicht ? 'Verbergen' : 'Veröffentlichen'}
                    </KleinerKnopf>
                    {loeschId === b.id ? (
                      <>
                        <button
                          type="button"
                          onClick={() => loeschen(b.id)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium bg-rose-600 text-white hover:bg-rose-700"
                        >
                          Wirklich löschen
                        </button>
                        <KleinerKnopf onClick={() => setLoeschId(null)} titel="Abbrechen">
                          Abbrechen
                        </KleinerKnopf>
                      </>
                    ) : (
                      <KleinerKnopf onClick={() => setLoeschId(b.id)} titel="Löschen">
                        <Trash2 size={16} /> Löschen
                      </KleinerKnopf>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Redakteure</h2>
          <p className="text-sm text-gray-600 mb-4">
            Nur diese E-Mail-Adressen dürfen Beiträge anlegen, ändern und löschen. Zusätzlich braucht jede Person ein
            Konto mit derselben E-Mail-Adresse in Supabase (Authentication &gt; Users).
          </p>
          <ul className="divide-y divide-gray-200 bg-white rounded-xl border border-gray-200 shadow-sm mb-4">
            {redakteure.map((r) => (
              <li key={r.email} className="flex items-center justify-between gap-3 p-4">
                <div className="min-w-0">
                  <p className="text-base text-gray-900 truncate">{r.email}</p>
                  {r.name && <p className="text-sm text-gray-500">{r.name}</p>}
                </div>
                {r.email.toLowerCase() !== (session.user.email ?? '').toLowerCase() && (
                  <KleinerKnopf onClick={() => redakteurEntfernen(r.email)} titel="Entfernen">
                    <Trash2 size={16} /> Entfernen
                  </KleinerKnopf>
                )}
              </li>
            ))}
          </ul>
          <form onSubmit={redakteurHinzufuegen} className="grid gap-3 md:grid-cols-[1fr_1fr_auto] items-end">
            <label className="block text-sm font-medium text-gray-700">
              E-Mail-Adresse
              <input
                type="email"
                required
                value={neueRedakteurEmail}
                onChange={(e) => setNeueRedakteurEmail(e.target.value)}
                className={eingabeKlasse}
              />
            </label>
            <label className="block text-sm font-medium text-gray-700">
              Name (optional)
              <input
                type="text"
                value={neueRedakteurName}
                onChange={(e) => setNeueRedakteurName(e.target.value)}
                className={eingabeKlasse}
              />
            </label>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg text-base font-medium text-gray-700 border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              Hinzufügen
            </button>
          </form>
        </section>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Seo title="Verwaltung Aktuelles – UVM Consulting Group" noindex />
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src={logoImage} alt="Logo des UVM-Instituts" width={2101} height={650} className="h-10 w-auto object-contain" />
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <Link to="/aktuelles" className="text-gray-700 hover:text-primary-600">
              Seite „Aktuelles“ ansehen
            </Link>
            {session && (
              <button type="button" onClick={abmelden} className="inline-flex items-center gap-1 text-gray-700 hover:text-primary-600">
                <LogOut size={16} /> Abmelden
              </button>
            )}
          </div>
        </div>
      </header>
      <main id="main-content" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Verwaltung „Aktuelles“</h1>
        {inhalt}
      </main>
    </div>
  );
}

type ReactNodeLike = ReactNode;

function Hinweis({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-2xl bg-white rounded-xl border border-gray-200 shadow-sm p-6 text-base text-gray-700">
      {children}
    </div>
  );
}

function KleinerKnopf({
  onClick,
  titel,
  children,
}: {
  onClick: () => void;
  titel: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={titel}
      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-700 border border-gray-300 hover:bg-gray-50 transition-colors"
    >
      {children}
    </button>
  );
}

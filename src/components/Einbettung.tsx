import { useState } from 'react';
import { ExternalLink, Play } from 'lucide-react';
import { einbettungAnbieter } from '../lib/aktuelles';

type Props = {
  url: string;
  titel: string;
};

/**
 * Eingebetteter Inhalt eines Drittanbieters (LinkedIn, Spotify, YouTube …).
 * Aus Datenschutzgründen wird der Inhalt erst nach einem Klick geladen,
 * vorher fließen keine Daten an den Anbieter. Es werden nur URLs der
 * in lib/aktuelles.ts freigegebenen Anbieter angezeigt.
 */
export default function Einbettung({ url, titel }: Props) {
  const [geladen, setGeladen] = useState(false);
  const anbieter = einbettungAnbieter(url);

  if (!anbieter) return null;

  if (!geladen) {
    return (
      <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-5 text-center">
        <p className="text-sm text-gray-600 mb-3">
          Inhalt von {anbieter.name}. Beim Laden werden Daten an {anbieter.name} übertragen.
        </p>
        <button
          type="button"
          onClick={() => setGeladen(true)}
          className="inline-flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
        >
          <Play size={16} />
          Inhalt von {anbieter.name} laden
        </button>
        <div className="mt-3">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-primary-600"
          >
            <ExternalLink size={12} />
            Stattdessen bei {anbieter.name} öffnen
          </a>
        </div>
      </div>
    );
  }

  // Höhe 0 = Video im Format 16:9
  if (anbieter.hoehe === 0) {
    return (
      <div className="relative w-full overflow-hidden rounded-lg" style={{ paddingTop: '56.25%' }}>
        <iframe
          src={url}
          title={titel}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    );
  }

  return (
    <iframe
      src={url}
      title={titel}
      height={anbieter.hoehe}
      className="w-full rounded-lg border-0"
      loading="lazy"
      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
      allowFullScreen
      referrerPolicy="strict-origin-when-cross-origin"
    />
  );
}

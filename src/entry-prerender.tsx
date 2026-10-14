// SSR-Einstieg NUR für das Vorab-Rendern beim Build (scripts/prerender.mjs).
// Wird nie im Browser geladen. Die Routen sind hier bewusst OHNE lazy()
// importiert (renderToString kann nicht auf lazy-Chunks warten) — bei neuen
// Routen bitte App.tsx UND diese Datei anpassen.
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import type { HelmetServerState } from 'react-helmet-async';
import { ROUTES } from './constants/paths';

import NewHomePage from './pages/NewHomePage';
import UnternehmenPage from './pages/UnternehmenPage';
import FuehrungskraeftequalifizierungPage from './pages/FuehrungskraeftequalifizierungPage';
import ImpressumPage from './pages/ImpressumPage';
import DatenschutzPage from './pages/DatenschutzPage';
import AktuellesPage from './pages/AktuellesPage';
import VerwaltungPage from './pages/VerwaltungPage';
import NotFoundPage from './pages/NotFoundPage';

export function render(path: string): { html: string; helmet: HelmetServerState } {
  const helmetContext: { helmet?: HelmetServerState } = {};

  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={path} basename="/">
        <Routes>
          <Route path={ROUTES.HOME} element={<NewHomePage />} />
          <Route path={ROUTES.UNTERNEHMEN} element={<UnternehmenPage />} />
          <Route path={ROUTES.FUEHRUNGSKRAEFTEQUALIFIZIERUNG} element={<FuehrungskraeftequalifizierungPage />} />
          <Route path={ROUTES.IMPRESSUM} element={<ImpressumPage />} />
          <Route path={ROUTES.DATENSCHUTZ} element={<DatenschutzPage />} />
          <Route path={ROUTES.AKTUELLES} element={<AktuellesPage />} />
          <Route path={ROUTES.VERWALTUNG} element={<VerwaltungPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </StaticRouter>
    </HelmetProvider>
  );

  return { html, helmet: helmetContext.helmet! };
}

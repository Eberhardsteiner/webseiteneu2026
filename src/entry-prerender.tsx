// SSR-Einstieg NUR für das Vorab-Rendern beim Build (scripts/prerender.mjs).
// Wird nie im Browser geladen. Die Routen sind hier bewusst OHNE lazy()
// importiert (renderToString kann nicht auf lazy-Chunks warten) — bei neuen
// Routen bitte App.tsx UND diese Datei anpassen.
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import type { HelmetServerState } from 'react-helmet-async';
import { ROUTES, ROUTES_LEISTUNGEN } from './constants/paths';

import NewHomePage from './pages/NewHomePage';
import FuehrungskraeftequalifizierungPage from './pages/FuehrungskraeftequalifizierungPage';
import ImpressumPage from './pages/ImpressumPage';
import DatenschutzPage from './pages/DatenschutzPage';
import AktuellesPage from './pages/AktuellesPage';
import VerwaltungPage from './pages/VerwaltungPage';
import LeistungenPage from './pages/leistungen/LeistungenPage';
import KiStrategiePage from './pages/leistungen/KiStrategiePage';
import ChangeManagementPage from './pages/leistungen/ChangeManagementPage';
import CodeOfConductPage from './pages/leistungen/CodeOfConductPage';
import KompetenzmanagementPage from './pages/leistungen/KompetenzmanagementPage';
import FemaleLeadershipPage from './pages/leistungen/FemaleLeadershipPage';
import CoachingPage from './pages/leistungen/CoachingPage';
import NotFoundPage from './pages/NotFoundPage';

export function render(path: string): { html: string; helmet: HelmetServerState } {
  const helmetContext: { helmet?: HelmetServerState } = {};

  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={path} basename="/">
        <Routes>
          <Route path={ROUTES.HOME} element={<NewHomePage />} />
          <Route path={ROUTES.FUEHRUNGSKRAEFTEQUALIFIZIERUNG} element={<FuehrungskraeftequalifizierungPage />} />
          <Route path={ROUTES.IMPRESSUM} element={<ImpressumPage />} />
          <Route path={ROUTES.DATENSCHUTZ} element={<DatenschutzPage />} />
          <Route path={ROUTES.AKTUELLES} element={<AktuellesPage />} />
          <Route path={ROUTES.VERWALTUNG} element={<VerwaltungPage />} />
          <Route path={ROUTES.LEISTUNGEN} element={<LeistungenPage />} />
          <Route path={ROUTES_LEISTUNGEN.KI_STRATEGIE} element={<KiStrategiePage />} />
          <Route path={ROUTES_LEISTUNGEN.CHANGE_MANAGEMENT} element={<ChangeManagementPage />} />
          <Route path={ROUTES_LEISTUNGEN.CODE_OF_CONDUCT} element={<CodeOfConductPage />} />
          <Route path={ROUTES_LEISTUNGEN.KOMPETENZMANAGEMENT} element={<KompetenzmanagementPage />} />
          <Route path={ROUTES_LEISTUNGEN.FEMALE_LEADERSHIP} element={<FemaleLeadershipPage />} />
          <Route path={ROUTES_LEISTUNGEN.COACHING} element={<CoachingPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </StaticRouter>
    </HelmetProvider>
  );

  return { html, helmet: helmetContext.helmet! };
}

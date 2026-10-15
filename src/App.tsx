import { lazy, Suspense, useLayoutEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import NewHomePage from './pages/NewHomePage';
import ErrorBoundary from './components/ErrorBoundary';
import { BASE_PATH, ROUTES, ROUTES_LEISTUNGEN } from './constants/paths';

// Lazy load routes for code splitting
const FuehrungskraeftequalifizierungPage = lazy(() => import('./pages/FuehrungskraeftequalifizierungPage'));
const ImpressumPage = lazy(() => import('./pages/ImpressumPage'));
const DatenschutzPage = lazy(() => import('./pages/DatenschutzPage'));
const AktuellesPage = lazy(() => import('./pages/AktuellesPage'));
const VerwaltungPage = lazy(() => import('./pages/VerwaltungPage'));
const LeistungenPage = lazy(() => import('./pages/leistungen/LeistungenPage'));
const KiStrategiePage = lazy(() => import('./pages/leistungen/KiStrategiePage'));
const ChangeManagementPage = lazy(() => import('./pages/leistungen/ChangeManagementPage'));
const CodeOfConductPage = lazy(() => import('./pages/leistungen/CodeOfConductPage'));
const KompetenzmanagementPage = lazy(() => import('./pages/leistungen/KompetenzmanagementPage'));
const FemaleLeadershipPage = lazy(() => import('./pages/leistungen/FemaleLeadershipPage'));
const CoachingPage = lazy(() => import('./pages/leistungen/CoachingPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// Loading fallback component
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
    </div>
  );
}

// BrowserRouter behält beim Seitenwechsel die alte Scrollposition. Deshalb bei
// jedem Wechsel des Pfads oben beginnen (bzw. am Anker, falls der Link einen
// hat). Ein Wechsel nur des Hash auf derselben Seite ändert den Pfad nicht und
// springt wie bisher zum Anker. Beim ersten Laden passiert nichts, damit Neuladen und
// Direktaufrufe mit Anker unverändert funktionieren. Rendert nichts, ändert
// also das vorgerenderte HTML nicht.
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const letzterPfad = useRef(pathname);

  useLayoutEffect(() => {
    if (letzterPfad.current === pathname) return;
    letzterPfad.current = pathname;

    const anker = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
    if (anker) {
      anker.scrollIntoView({ behavior: 'instant' });
    } else {
      // 'instant', weil html { scroll-behavior: smooth } sonst sichtbar nach oben rollt
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [pathname, hash]);

  return null;
}

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter basename={BASE_PATH || '/'}>
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
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
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;

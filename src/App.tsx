import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter basename={BASE_PATH || '/'}>
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

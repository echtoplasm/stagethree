import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Navigate } from 'react-router-dom';
import { useEffect, useState, lazy, Suspense } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { StageProvider } from './contexts/StageContext';
import { useAuth } from './contexts/AuthContext';
import { NotFound } from './pages/NotFound';
import { LandingPage } from './pages/LandingPage';

const StageRead = lazy(() => import('./components/shared/stage/StageRead').then(m => ({ default: m.StageRead })));
const PlottingPage = lazy(() => import('./pages/PlottingPage').then(m => ({ default: m.PlottingPage })));
const AdminPage = lazy(() => import('./pages/AdminPage').then(m => ({ default: m.AdminPage })));
const UserPortal = lazy(() => import('./pages/UserPortal').then(m => ({ default: m.UserPortal })));
const Documentation = lazy(() => import('./components/documentation/Documentation').then(m => ({ default: m.Documentation })));
const ShareView = lazy(() => import('./components/sharedPlot/SharedScene').then(m => ({ default: m.ShareView })))


/**
 * Renders the application route tree within a Suspense boundary.
 * Blocks rendering until auth state is resolved to prevent redirect flicker.
 * Guards the /admin route behind a roleId check.
 *
 * @returns The route tree, or a loading indicator while auth state is resolving.
 */
function AppRoutes() {
  const { user, loading } = useAuth();
  if (loading) {

    return (
      <>
        <div className="spinner-container">
          <div className="spinner" />
          <p className="text-secondary">Loading...</p>
        </div>
      </>
    );

  }
  return (
    <Suspense fallback={
      <div className="spinner-container">
        <div className="spinner" />
        <p className="text-secondary">Loading...</p>
      </div>
    }>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/stages" element={<StageRead />} />
        <Route path="/app" element={<PlottingPage />} />
        <Route path="/portal" element={<UserPortal />} />
        <Route path="/docs" element={<Documentation />} />
        <Route path="/share/:uuid" element={<ShareView />} />
        <Route
          path="/admin"
          element={(user?.roleId ?? 0) >= 2 ? <AdminPage /> : <Navigate to="/" />}
        />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

/**
 * Root application component wrapping the tree with AuthProvider, StageProvider, and Router.
 * Manages light/dark theme state and applies it to the document root via a data attribute.
 *
 * @returns The full application with context providers, navbar, and route tree.
 */
function App() {
  const [theme, setTheme] = useState('dark');


  /** Toggles between light and dark theme and applies the selection to the document root. */
  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
  };

  /** Applies the initial theme to the document root on mount. */
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, []);
  return (
    <AuthProvider>
      <StageProvider>
        <Router>
          <Navbar onThemeToggle={toggleTheme} theme={theme} />
          <AppRoutes />
        </Router>
      </StageProvider>
    </AuthProvider>
  );
}

export default App;

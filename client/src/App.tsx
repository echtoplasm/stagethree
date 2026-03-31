import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Navigate } from 'react-router-dom';
import { useEffect, useState, lazy, Suspense } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { StageProvider } from './contexts/StageContext';
import { useAuth } from './contexts/AuthContext';

import { LandingPage } from './pages/LandingPage';

const StageRead = lazy(() => import('./components/shared/stage/StageRead').then(m => ({ default: m.StageRead })));
const PlottingPage = lazy(() => import('./pages/PlottingPage').then(m => ({ default: m.PlottingPage })));
const AdminPage = lazy(() => import('./pages/AdminPage').then(m => ({ default: m.AdminPage })));
const UserPortal = lazy(() => import('./pages/UserPortal').then(m => ({ default: m.UserPortal })));
const Documentation = lazy(() => import('./components/documentation/Documentation').then(m => ({ default: m.Documentation })));

function AppRoutes() {
  const { user, loading } = useAuth();
  if (loading) {
    return <div>loading...</div>;
  }
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/stages" element={<StageRead />} />
        <Route path="/app" element={<PlottingPage />} />
        <Route path="/portal" element={<UserPortal />} />
        <Route path="/docs" element={<Documentation />} />
        <Route
          path="/admin"
          element={(user?.roleId ?? 0) >= 2 ? <AdminPage /> : <Navigate to="/" />}
        />
      </Routes>
    </Suspense>
  );
}

function App() {
  const [theme, setTheme] = useState('dark');
  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
  };
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

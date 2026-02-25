import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Navigate } from 'react-router-dom';
import { StageRead } from './components/shared/stage/StageRead';
import { PlottingPage } from './pages/PlottingPage';
import { useEffect, useState } from 'react';
import { AdminPage } from './pages/AdminPage';
import { LandingPage } from './pages/LandingPage';
import { AuthProvider } from './contexts/AuthContext';
import { StageProvider } from './contexts/StageContext';
import { useAuth } from './contexts/AuthContext';



function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>loading...</div>;
  }
  console.log(user);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/stages" element={<StageRead />} />
      <Route path="/app" element={<PlottingPage />} />

      <Route
        path="/admin"
        element={(user?.roleId ?? 0) >= 2 ? <AdminPage /> : <Navigate to="/" />}
      />
    </Routes>
  );
}

function App() {
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
  }

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

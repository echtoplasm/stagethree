
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Navigate } from 'react-router-dom';
import { StageRead } from './components/shared/stage/StageRead';
import { PlottingPage } from './pages/PlottingPage';

import { AdminPage } from './pages/AdminPage';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './contexts/AuthContext';



function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>loading...</div>;
  }
  console.log(user);

  return (
    <Routes>
      <Route path="/" element={<PlottingPage />} />
      <Route path="/stages" element={<StageRead />} />

      <Route
        path="/admin"
        element={(user?.roleId ?? 0) >= 2 ? <AdminPage /> : <Navigate to="/" />}
      />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;

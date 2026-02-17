
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';

import { StageCrud } from './pages/stagecrud';
import { PlottingPage } from './pages/PlottingPage';
import { SignUpPage } from './pages/SignUpPage'
import { SignInPage } from './pages/SignInPage';
import { AdminPage } from './pages/AdminPage';
function App() {


  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={< PlottingPage />} />

        <Route path="/stages" element={<StageCrud />} />

        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;

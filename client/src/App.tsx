
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { UserCrud } from './pages/usercrud';
import { StagePage } from './pages/threestage';
import { StageCrud } from './pages/stagecrud';
import { PlottingPage } from './pages/PlottingPage';
function App() {


  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={< PlottingPage/>} />
        <Route path="/users" element={<UserCrud />} />
        <Route path="/stages" element={<StageCrud />} />
        <Route path="/stage" element={<StagePage />} />
      </Routes>
    </Router>
  );
}

export default App;

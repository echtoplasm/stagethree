
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { PostCrud } from './pages/postcrud';
import { UserCrud } from './pages/usercrud';
import { StagePage } from './pages/threestage';
import { StageCrud } from './pages/stagecrud';

function App() {


  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<PostCrud />} />
        <Route path="/users" element={<UserCrud />} />
        <Route path="/stages" element={<StageCrud />} />
        <Route path="/stage" element={<StagePage />} />
      </Routes>
    </Router>
  );
}

export default App;

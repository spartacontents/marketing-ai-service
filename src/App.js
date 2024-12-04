import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Home from './routes/Home';
import Counseling from './routes/Counseling';

function App() {
  return <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/counseling" element={<Counseling />} />
    </Routes>
  </Router>
}

export default App;

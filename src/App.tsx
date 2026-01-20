import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Graphics from './components/Graphics';
import Websites from './components/Websites';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/graphics" element={<Graphics />} />
        <Route path="/websites" element={<Websites />} />
      </Routes>
    </Router>
  );
}

export default App; 

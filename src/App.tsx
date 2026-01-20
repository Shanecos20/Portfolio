import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Graphics from './components/Graphics';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/graphics" element={<Graphics />} />
      </Routes>
    </Router>
  );
}

export default App;

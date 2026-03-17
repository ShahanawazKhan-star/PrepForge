import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { CodingPractice } from './pages/CodingPractice';
import { Explore } from './pages/Explore';
import { Roadmaps } from './pages/Roadmaps';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/practice" element={<CodingPractice />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/roadmaps" element={<Roadmaps />} />
    </Routes>
  );
}

export default App;


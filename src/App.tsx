import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Roadmaps from './pages/Roadmaps';
import Coding from './pages/Coding';
import Jobs from './pages/Jobs';
import { Login } from './pages/Login'; // Import Login using named import

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/roadmaps" element={<Roadmaps />} />
        <Route path="/coding-practice" element={<Coding />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;

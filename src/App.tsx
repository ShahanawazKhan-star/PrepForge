import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Roadmaps from './pages/Roadmaps';
import CodingPractice from './pages/CodingPractice';
import Jobs from './pages/Jobs';
import { Login } from './pages/Login'; // Import Login using named import
import { SignUp } from './pages/SignUp';
import Projects from './pages/Projects';
import Dashboard from './pages/Dashboard';
import { AIChat } from './components/AIChat';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/roadmaps" element={<Roadmaps />} />
        <Route path="/coding-practice" element={<CodingPractice />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <AIChat />
    </div>
  );
}

export default App;

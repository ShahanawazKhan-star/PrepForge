import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { UserProvider } from './context/UserContext';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Roadmaps from './pages/Roadmaps';
import CodingPractice from './pages/CodingPractice';
import Jobs from './pages/Jobs';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import Projects from './pages/Projects';
import Dashboard from './pages/Dashboard';
import RoadmapDetail from './pages/RoadmapDetail';
import { AIChat } from './components/AIChat';
import RunnerGame from './pages/RunnerGame';
import ProblemPage from './pages/ProblemPage';

function App() {
  return (
    <UserProvider>
      <div className="min-h-screen bg-white">
        <Toaster position="top-right" />
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
          <Route path="/roadmap/:id" element={<RoadmapDetail />} />
          <Route path="/game" element={<RunnerGame />} />
          <Route path="/problem/:id" element={<ProblemPage />} />
        </Routes>
        <AIChat />
      </div>
    </UserProvider>
  );
}

export default App;

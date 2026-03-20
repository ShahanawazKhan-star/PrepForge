import { Link } from 'react-router-dom';
import { Map, Code, Briefcase, Bot, Layout, Award } from 'lucide-react';
import heroIllustration from '../assets/hero-illustration.png';

const Home = () => {
  // Aapke 6 feature cards ka data
  const features = [
    { title: "Career Roadmaps", desc: "Guided paths for tech roles", icon: <Map className="w-6 h-6 text-green-600" />, path: "/roadmaps" },
    { title: "Coding Practice", desc: "Solve DSA & logic problems", icon: <Code className="w-6 h-6 text-green-600" />, path: "/coding-practice" },
    { title: "Projects Section", desc: "Build real-world apps", icon: <Layout className="w-6 h-6 text-green-600" />, path: "/projects" },
    { title: "Mock Interviews", desc: "Practice with experts", icon: <Award className="w-6 h-6 text-green-600" />, path: "#" },
    { title: "Job Section", desc: "Find top tech jobs", icon: <Briefcase className="w-6 h-6 text-green-600" />, path: "/jobs" },
    { title: "AI Mentor", desc: "24/7 coding assistance", icon: <Bot className="w-6 h-6 text-green-600" />, path: "#" },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans pb-12">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
        
        {/* Top Badge */}
        <div className="flex justify-center mb-10">
          <div className="bg-green-50 text-green-700 px-5 py-2 rounded-full text-sm font-bold border border-green-200 shadow-sm">
            PrepForge platform is live
          </div>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div className="text-center md:text-left">
            <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 text-slate-900">
              From <span className="text-green-600">Beginner</span> <br className="hidden md:block" />
              to Job ready
            </h1>
            <p className="text-lg text-slate-600 max-w-lg mx-auto md:mx-0">
              Master data structures, conquer algorithms, and ace your technical interviews with our structured roadmap.
            </p>
          </div>
          
          {/* Hero Illustration */}
          <div className="flex justify-center md:justify-end">
            <div className="w-full max-w-lg">
              <img 
                src={heroIllustration} 
                alt="Developer Illustration" 
                className="w-full h-auto object-contain drop-shadow-xl hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>

        {/* Start Journey Button */}
        <div className="flex justify-center mb-20">
          <Link to="/explore" className="bg-green-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-700 transition-all shadow-lg hover:shadow-green-200 flex items-center gap-2">
            Start your journey <span className="text-2xl leading-none">→</span>
          </Link>
        </div>
      </section>

      {/* Features - Horizontal Scroll Row */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 overflow-hidden">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-slate-900">Pick your learning path</h2>
        
        {/* Swipeable Container */}
        <div 
          className="flex overflow-x-auto pb-8 -mx-4 px-4 gap-6 snap-x snap-mandatory" 
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {features.map((feature, idx) => (
            <Link 
              key={idx} 
              to={feature.path}
              className="min-w-[280px] bg-slate-50 border border-slate-200 rounded-2xl p-6 snap-center hover:shadow-md transition-shadow shrink-0 block hover:border-green-400 group"
            >
              <div className="bg-white w-12 h-12 rounded-lg flex items-center justify-center mb-4 shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
              <p className="text-slate-600">{feature.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Companies Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8 border-t border-slate-100">
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-40 grayscale">
          <span className="text-2xl font-black text-slate-800 tracking-tighter">Google</span>
          <span className="text-2xl font-black text-slate-800 tracking-tighter">Amazon</span>
          <span className="text-2xl font-black text-slate-800 tracking-tighter">Microsoft</span>
          <span className="text-2xl font-black text-slate-800 tracking-tighter">Meta</span>
          <span className="text-2xl font-black text-slate-800 tracking-tighter">NETFLIX</span>
        </div>
      </section>
    </div>
  );
};

export default Home;
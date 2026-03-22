import { Link } from 'react-router-dom';
import { Map, Code, Briefcase, Bot, Layout, Award } from 'lucide-react';
import heroIllustration from '../assets/hero.png';
import Footer from './Footer';

const Home = () => {
  const features = [
    { title: "Career Roadmaps", desc: "Guided paths for tech roles", icon: <Map className="w-5 h-5 text-emerald-600" />, path: "/roadmaps" },
    { title: "Coding Practice", desc: "Solve DSA & logic problems", icon: <Code className="w-5 h-5 text-emerald-600" />, path: "/coding-practice" },
    { title: "Projects Section", desc: "Build real-world apps", icon: <Layout className="w-5 h-5 text-emerald-600" />, path: "/projects" },
    { title: "Mock Interviews", desc: "Practice with experts", icon: <Award className="w-5 h-5 text-emerald-600" />, path: "#" },
    { title: "Job Section", desc: "Find top tech jobs", icon: <Briefcase className="w-5 h-5 text-emerald-600" />, path: "/jobs" },
    { title: "AI Mentor", desc: "24/7 coding assistance", icon: <Bot className="w-5 h-5 text-emerald-600" />, path: "#" },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans flex flex-col">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12 flex-grow">

        {/* Top Badge */}
        <div className="flex justify-center mb-8">
          <div className="bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-full text-[13px] font-bold border border-emerald-200 shadow-sm uppercase tracking-wider">
            PrepForge platform is live
          </div>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-14">
          <div className="text-center md:text-left">
            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-5 text-slate-900">
              From <span className="text-emerald-600">Beginner</span> <br className="hidden md:block" />
              to Job ready
            </h1>
            <p className="text-base text-slate-600 max-w-lg mx-auto md:mx-0 font-medium">
              Master data structures, conquer algorithms, and ace your technical interviews with our structured roadmap.
            </p>
          </div>

          {/* Hero Illustration */}
          <div className="flex justify-center md:justify-end">
            <div className="w-full max-w-md">
              <img
                src={heroIllustration}
                alt="Developer Illustration"
                className="w-full h-auto object-contain drop-shadow-xl hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>

        {/* Start Journey Button */}
        <div className="flex justify-center mb-16">
          <Link to="/explore" className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-emerald-700 transition-all shadow-lg hover:shadow-emerald-200 flex items-center gap-2">
            Start your journey <span className="text-xl leading-none font-normal">→</span>
          </Link>
        </div>
      </section>

      {/* Features - Horizontal Scroll Row */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14 overflow-hidden w-full">
        <h2 className="text-2xl font-extrabold mb-6 text-center text-slate-900 tracking-tight">Pick your learning path</h2>

        {/* Swipeable Container */}
        <div
          className="flex overflow-x-auto pb-6 -mx-4 px-4 gap-5 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {features.map((feature: any, idx: number) => (
            <Link
              key={idx}
              to={feature.path}
              className="min-w-[260px] bg-slate-50 border border-slate-200 rounded-2xl p-5 snap-center hover:shadow-md transition-shadow shrink-0 block hover:border-emerald-400 group"
            >
              <div className="bg-white w-10 h-10 rounded-lg flex items-center justify-center mb-3 shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">{feature.title}</h3>
              <p className="text-sm text-slate-500 font-medium">{feature.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Companies Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-6 pb-10 border-t border-slate-100 w-full">
        <div className="flex flex-wrap justify-center gap-6 md:gap-12 opacity-40 grayscale">
          <span className="text-xl font-black text-slate-800 tracking-tighter">Google</span>
          <span className="text-xl font-black text-slate-800 tracking-tighter">Amazon</span>
          <span className="text-xl font-black text-slate-800 tracking-tighter">Microsoft</span>
          <span className="text-xl font-black text-slate-800 tracking-tighter">Meta</span>
          <span className="text-xl font-black text-slate-800 tracking-tighter">NETFLIX</span>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
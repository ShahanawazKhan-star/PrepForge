import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Monitor, Server, Layers, Database, BarChart, 
  BrainCircuit, Network, Apple, Link as LinkIcon, Smartphone, 
  ShieldCheck, Cloud, Infinity, TestTube, PenTool, 
  Gamepad2, Cpu, Wifi, LayoutTemplate, Code,
  Terminal, FileCode2, Coffee, FileJson, Layout, Braces,
  ArrowLeft, Map, GraduationCap, Search, ArrowRight, BookOpen
} from 'lucide-react';
import { roadmaps } from '../data/roadmaps';
import Footer from '../components/Footer';

const iconMap: Record<string, React.ElementType> = {
  Monitor, Server, Layers, Database, BarChart, 
  BrainCircuit, Network, Apple, Link: LinkIcon, Smartphone, 
  ShieldCheck, Cloud, Infinity, TestTube, PenTool, 
  Gamepad2, Cpu, Wifi, LayoutTemplate, Code
};

const languages = [
  { name: 'C', desc: 'Operating systems, embedded systems, high-performance computing, and game engines.', icon: Terminal },
  { name: 'C++', desc: 'AAA games, browsers, complex desktop applications, and quantitative finance systems.', icon: FileCode2 },
  { name: 'Java', desc: 'Enterprise software, Android apps, and large-scale, resilient backend systems.', icon: Coffee },
  { name: 'Python', desc: 'AI, Machine Learning, Data Science, automation scripting, and backend web APIs.', icon: FileJson },
  { name: 'HTML/CSS', desc: 'Beautiful website layouts, responsive web designs, and core UI structures.', icon: Layout },
  { name: 'JavaScript', desc: 'Interactive web apps, frontend frameworks (React), and backend servers (Node.js).', icon: Braces }
];

const Roadmaps = () => {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRoadmaps = roadmaps.filter((r) => 
    r.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    r.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      {/* Navigation & Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/')}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500 hover:text-slate-900"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <Map className="w-6 h-6 text-emerald-600" />
              <h1 className="text-xl font-extrabold tracking-tight text-slate-800">Career Roadmaps</h1>
            </div>
          </div>

          <div className="relative w-full sm:w-80">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search pathways..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-[14px] font-medium transition-all"
            />
          </div>
        </div>
      </div>

      <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-16 pb-20 w-full">
        
        {/* Language Focus Section */}
        <section>
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black tracking-tight mb-4 text-slate-900">Choose Your First Language</h2>
            <p className="text-base text-slate-500 max-w-2xl mx-auto font-medium">Not sure where to start? Pick a language to see what you can build with it.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {languages.map((lang) => {
              const Icon = lang.icon;
              const isSelected = selectedLanguage === lang.name;
              return (
                <button
                  key={lang.name}
                  onClick={() => setSelectedLanguage(isSelected ? null : lang.name)}
                  className={`relative p-5 rounded-2xl border transition-all duration-200 flex flex-col items-center gap-3 shadow-sm
                    ${isSelected 
                      ? 'border-emerald-600 bg-emerald-50 shadow-emerald-100 ring-1 ring-emerald-600' 
                      : 'border-slate-200 bg-white hover:border-emerald-300 hover:-translate-y-1 text-slate-600 hover:text-emerald-700'
                    }`}
                >
                  <Icon className={`w-8 h-8 ${isSelected ? 'text-emerald-600' : ''}`} />
                  <span className={`font-bold text-[13px] ${isSelected ? 'text-emerald-800' : ''}`}>{lang.name}</span>
                </button>
              );
            })}
          </div>

          <AnimatePresence>
            {selectedLanguage && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                className="mt-6 overflow-hidden"
              >
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 shadow-sm flex flex-col md:flex-row items-center md:items-start gap-6 justify-center">
                  <div className="bg-white p-4 rounded-full shadow-sm">
                    <GraduationCap className="w-8 h-8 text-emerald-500" />
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="text-xl font-black text-slate-800 mb-2">Build with {selectedLanguage}</h3>
                    <p className="text-[15px] text-slate-600 leading-relaxed max-w-2xl font-medium">
                      {languages.find(l => l.name === selectedLanguage)?.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Career Grid Section */}
        <section>
          <div className="mb-10 text-center flex flex-col items-center">
            <h2 className="text-3xl font-black tracking-tight mb-4 text-slate-900">Explore Career Paths</h2>
            <div className="h-1 w-20 bg-emerald-500 rounded-full mb-4"></div>
            <p className="text-base text-slate-500 max-w-2xl font-medium">Discover step-by-step guides and structured learning paths for top tech careers.</p>
          </div>

          {filteredRoadmaps.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col items-center">
              <Search className="w-12 h-12 text-slate-300 mb-4" />
              <h3 className="text-xl font-bold text-slate-800 mb-1">No pathways found</h3>
              <p className="text-slate-500 font-medium">Try adjusting your search or explore other domains.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredRoadmaps.map((roadmap: any) => {
                const Icon = iconMap[roadmap.icon] || Map;
                return (
                  <div
                    key={roadmap.id}
                    onClick={() => navigate(`/roadmap/${roadmap.id}`)}
                    className="bg-white border border-slate-200 rounded-3xl p-6 md:p-7 cursor-pointer hover:border-emerald-400 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-150 transition-transform duration-700 pointer-events-none">
                      <Icon className="w-32 h-32 text-emerald-900" />
                    </div>
                    
                    <div className="relative z-10">
                      <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-50 transition-colors border border-slate-100 group-hover:border-emerald-100 shadow-sm">
                        <Icon className="w-7 h-7 text-slate-600 group-hover:text-emerald-600 transition-colors" />
                      </div>
                      
                      <h3 className="text-xl font-black text-slate-900 mb-3 group-hover:text-emerald-700 transition-colors leading-tight">{roadmap.title}</h3>
                      <p className="text-[14px] font-medium text-slate-500 mb-8 line-clamp-3 leading-relaxed">{roadmap.description}</p>
                    </div>
                    
                    <div className="mt-auto pt-5 border-t border-slate-100 flex items-center justify-between text-emerald-600 font-bold text-[13px] z-10 uppercase tracking-wide">
                      <span className="flex items-center gap-2"><BookOpen className="w-4 h-4"/> View Roadmap</span>
                      <div className="bg-emerald-50 p-1.5 rounded-full group-hover:bg-emerald-100 transition-colors">
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

      </div>

      <Footer />
    </div>
  );
}

export default Roadmaps;

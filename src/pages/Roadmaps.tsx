import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Monitor, Server, Layers, Database, BarChart, 
  BrainCircuit, Network, Apple, Link, Smartphone, 
  ShieldCheck, Cloud, Infinity, TestTube, PenTool, 
  Gamepad2, Cpu, Wifi, LayoutTemplate, Code,
  Terminal, FileCode2, Coffee, FileJson, Layout, Braces,
  CheckCircle2, Circle, X, ArrowLeft, Map, ChevronRight, GraduationCap
} from 'lucide-react';
import { roadmaps } from '../data/roadmaps';
import type { RoadmapType } from '../data/roadmaps';
import Footer from '../components/Footer';

// Map icon strings to Lucide components
const iconMap: Record<string, React.ElementType> = {
  Monitor, Server, Layers, Database, BarChart, 
  BrainCircuit, Network, Apple, Link, Smartphone, 
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
  const [selectedRoadmap, setSelectedRoadmap] = useState<RoadmapType | null>(null);
  const [checkedTopics, setCheckedTopics] = useState<Set<string>>(new Set());

  const toggleTopic = (topic: string) => {
    const newChecked = new Set(checkedTopics);
    if (newChecked.has(topic)) {
      newChecked.delete(topic);
    } else {
      newChecked.add(topic);
    }
    setCheckedTopics(newChecked);
  };

  const calculateProgress = (roadmap: RoadmapType) => {
    let total = 0;
    let completed = 0;
    roadmap.levels.forEach(level => {
      level.topics.forEach(topic => {
        total++;
        if (checkedTopics.has(`${roadmap.id}-${topic}`)) completed++;
      });
    });
    return total === 0 ? 0 : Math.round((completed / total) * 100);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 font-sans">
      {/* Navigation & Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/')}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500 hover:text-slate-900"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <Map className="w-6 h-6 text-green-600" />
              <h1 className="text-xl font-bold tracking-tight">Career Roadmaps</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-16">
        
        {/* Language Focus Section */}
        <section>
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold tracking-tight mb-4">Choose Your First Language</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Not sure where to start? Pick a language to see what you can build with it.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {languages.map((lang) => {
              const Icon = lang.icon;
              const isSelected = selectedLanguage === lang.name;
              return (
                <button
                  key={lang.name}
                  onClick={() => setSelectedLanguage(isSelected ? null : lang.name)}
                  className={`relative p-6 rounded-2xl border transition-all duration-200 flex flex-col items-center gap-3
                    ${isSelected 
                      ? 'border-green-600 bg-green-50 shadow-md ring-1 ring-green-600' 
                      : 'border-slate-200 bg-white hover:border-green-300 hover:shadow-sm text-slate-600 hover:text-green-700'
                    }`}
                >
                  <Icon className={`w-8 h-8 ${isSelected ? 'text-green-600' : ''}`} />
                  <span className={`font-semibold ${isSelected ? 'text-green-800' : ''}`}>{lang.name}</span>
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
                <div className="bg-white border text-center border-green-200 rounded-2xl p-8 shadow-sm">
                  <GraduationCap className="w-10 h-10 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Build with {selectedLanguage}</h3>
                  <p className="text-slate-600 leading-relaxed max-w-2xl mx-auto">
                    {languages.find(l => l.name === selectedLanguage)?.desc}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Career Grid Section */}
        <section>
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-extrabold tracking-tight mb-4">Explore Career Paths</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Discover step-by-step guides and structured learning paths for top tech careers.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {roadmaps.map((roadmap) => {
              const Icon = iconMap[roadmap.icon] || Map;
              const progress = calculateProgress(roadmap);
              return (
                <div
                  key={roadmap.id}
                  onClick={() => setSelectedRoadmap(roadmap)}
                  className="bg-white border border-slate-200 rounded-2xl p-6 cursor-pointer hover:border-green-400 hover:shadow-xl transition-all duration-300 group flex flex-col h-full"
                >
                  <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mb-5 group-hover:bg-green-50 transition-colors">
                    <Icon className="w-6 h-6 text-slate-600 group-hover:text-green-600 transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{roadmap.title}</h3>
                  <p className="text-sm text-slate-500 flex-grow mb-6 line-clamp-2">{roadmap.description}</p>
                  
                  <div className="mt-auto">
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                      <span>Progress</span>
                      <span className="font-semibold text-green-600">{progress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div 
                        className="bg-green-500 h-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

      </div>

      {/* Deep View Modal */}
      <AnimatePresence>
        {selectedRoadmap && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setSelectedRoadmap(null)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
              className="bg-white w-full max-w-2xl h-full shadow-2xl overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-slate-100 p-6 flex items-center justify-between z-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                    {React.createElement(iconMap[selectedRoadmap.icon] || Map, { className: "w-6 h-6 text-green-600" })}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 leading-tight">{selectedRoadmap.title}</h2>
                    <p className="text-sm text-slate-500 mt-1">{calculateProgress(selectedRoadmap)}% Complete</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedRoadmap(null)}
                  className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Content - Timeline */}
              <div className="p-8">
                <p className="text-slate-600 text-lg mb-10 leading-relaxed bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  {selectedRoadmap.description}
                </p>

                <div className="relative pl-8">
                  {/* Timeline Line */}
                  <div className="absolute top-4 bottom-4 left-3 w-0.5 bg-slate-200"></div>

                  {selectedRoadmap.levels.map((level, levelIdx) => (
                    <div key={level.name} className="relative mb-12 last:mb-0">
                      {/* Timeline Node */}
                      <div className="absolute -left-8 w-6 h-6 bg-white border-4 border-slate-200 rounded-full mt-1.5 z-10 flex items-center justify-center group-hover:border-green-500 transition-colors"
                        style={{ borderColor: levelIdx === 0 ? '#16a34a' : undefined }}
                      ></div>
                      
                      <h3 className="text-xl font-extrabold text-slate-900 mb-6 flex items-center gap-3">
                        {level.name}
                        {levelIdx === 0 && <span className="text-xs font-semibold px-2 py-1 bg-green-100 text-green-700 rounded-full">Start Here</span>}
                      </h3>
                      
                      {/* Topics */}
                      <div className="space-y-3 mb-6">
                        {level.topics.map((topic) => {
                          const topicId = `${selectedRoadmap.id}-${topic}`;
                          const isDone = checkedTopics.has(topicId);
                          return (
                            <div 
                              key={topicId}
                              onClick={() => toggleTopic(topicId)}
                              className={`flex items-start gap-4 p-4 rounded-xl border transition-all cursor-pointer hover:shadow-md ${
                                isDone 
                                  ? 'bg-green-50 border-green-200' 
                                  : 'bg-white border-slate-200 hover:border-green-300'
                              }`}
                            >
                              <button className="mt-0.5 text-slate-300 hover:text-green-500 transition-colors flex-shrink-0 focus:outline-none">
                                {isDone ? (
                                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                                ) : (
                                  <Circle className="w-6 h-6" />
                                )}
                              </button>
                              <span className={`font-medium ${isDone ? 'text-green-900 line-through decoration-green-300' : 'text-slate-700'}`}>
                                {topic}
                              </span>
                            </div>
                          );
                        })}
                      </div>

                      {/* Projects */}
                      {level.projects.length > 0 && (
                        <div className="bg-slate-900 rounded-xl p-6 text-white shadow-lg overflow-hidden relative">
                          {/* Accent line */}
                          <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
                          
                          <h4 className="text-sm font-bold text-green-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                            <Gamepad2 className="w-4 h-4" /> Recommended Projects
                          </h4>
                          <ul className="space-y-3">
                            {level.projects.map((project, idx) => (
                              <li key={idx} className="flex items-center gap-3 text-slate-200">
                                <ChevronRight className="w-4 h-4 text-green-500 flex-shrink-0" />
                                <span>{project}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <Footer />
    </div>
  );
}

export default Roadmaps;

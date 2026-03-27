import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { roadmaps } from '../data/roadmaps';
import { Circle, CheckSquare, ExternalLink, ArrowLeft } from 'lucide-react';
import Footer from '../components/Footer';
import { useUser } from '../context/UserContext';

const RoadmapDetail = () => {
  const { id } = useParams();
  const roadmap = roadmaps.find(r => r.id === id);
  const { completedSteps, toggleStep } = useUser();

  if (!roadmap) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Roadmap not found</h2>
            <Link to="/roadmaps" className="text-emerald-600 hover:text-emerald-700 font-semibold flex items-center justify-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Back to Roadmaps
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-emerald-200 pt-16 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link to="/roadmaps" className="inline-flex items-center gap-2 text-emerald-500 hover:text-emerald-400 font-bold text-[13px] mb-6 transition-colors tracking-wide uppercase">
            <ArrowLeft className="w-4 h-4" /> Back to Pathways
          </Link>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4"
          >
            {roadmap.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 max-w-2xl leading-relaxed font-medium"
          >
            {roadmap.description}
          </motion.p>
        </div>
      </div>

      {/* Timeline Content */}
      <div className="flex-grow max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16">
        <div className="relative pl-6 md:pl-10">
          {/* Vertical Green Line */}
          <div className="absolute top-4 bottom-4 left-[11px] md:left-[19px] w-1 bg-emerald-900/50 rounded-full"></div>

          {roadmap.levels.map((level, levelIdx) => (
            <motion.div 
              key={level.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative mb-16 last:mb-0"
            >
              {/* Timeline Node Circle */}
              <div className="absolute -left-[30px] md:-left-[38px] w-7 h-7 bg-slate-50 border-4 border-emerald-500 rounded-full mt-1.5 z-10 shadow-[0_0_15px_rgba(16,185,129,0.3)]"></div>

              <div className="bg-white/80 backdrop-blur-xl border border-slate-200 rounded-3xl p-6 md:p-8 hover:border-emerald-500/20 transition-all shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">{level.name} Phase</h2>
                  {levelIdx === 0 && (
                    <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-black rounded-full uppercase tracking-wider border border-emerald-500/20">Start Here</span>
                  )}
                </div>

                <div className="space-y-6">
                  {level.topics.map((topic, topicIdx) => {
                    const stepId = `${roadmap!.id}_${levelIdx}_${topicIdx}`;
                    const isCompleted = completedSteps.includes(stepId);
                    
                    return (
                      <div key={topicIdx} className={`rounded-2xl border p-5 md:p-6 transition-all duration-300 ${isCompleted ? 'bg-emerald-50 border-emerald-500/30 shadow-[inset_0_0_20px_rgba(16,185,129,0.05)]' : 'bg-slate-50 border-slate-200 hover:border-slate-300'}`}>
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-5">
                          
                          <div className="flex-grow">
                            <h3 className={`text-xl font-bold mb-3 transition-colors ${isCompleted ? 'text-slate-9000 line-through decoration-slate-600' : 'text-slate-900'}`}>
                              {topic}
                            </h3>
                            <ul className={`space-y-2.5 mb-2 transition-opacity ${isCompleted ? 'opacity-40' : 'opacity-100'}`}>
                              <li className="flex items-start gap-2.5 text-[15px] font-medium text-slate-600">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/40 mt-2 flex-shrink-0"></span>
                                Master the core fundamentals and architecture of this topic.
                              </li>
                              <li className="flex items-start gap-2.5 text-[15px] font-medium text-slate-600">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/40 mt-2 flex-shrink-0"></span>
                                Build 2-3 practical components to solidify your knowledge.
                              </li>
                              <li className="flex items-start gap-2.5 text-[15px] font-medium text-slate-600">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/40 mt-2 flex-shrink-0"></span>
                                Review documentation and modern community best-practices.
                              </li>
                            </ul>
                          </div>

                          <div className="flex flex-row md:flex-col gap-3 justify-end items-stretch shrink-0 mt-4 md:mt-0">
                            <button 
                              onClick={() => toggleStep(stepId)}
                              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all w-full md:w-40 justify-center border ${
                                isCompleted 
                                  ? 'bg-transparent text-emerald-500 border-emerald-500/30 hover:bg-emerald-500/10' 
                                  : 'bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-500 hover:border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                              }`}
                            >
                              {isCompleted ? <CheckSquare className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                              {isCompleted ? 'Completed' : 'Mark Done'}
                            </button>
                            
                            <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-slate-100 text-slate-600 border border-slate-300 hover:bg-slate-700 hover:text-slate-900 transition-all w-full md:w-40">
                              <ExternalLink className="w-4 h-4" />
                              Resources
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {level.projects.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-slate-200">
                    <h4 className="text-[13px] font-black text-slate-9000 uppercase tracking-widest mb-4">Milestone Projects</h4>
                    <div className="flex flex-wrap gap-3">
                      {level.projects.map((proj, i) => (
                        <span key={i} className="bg-slate-100 text-emerald-400 border border-emerald-500/20 px-4 py-2 rounded-lg text-sm font-bold shadow-sm">
                          {proj}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="bg-slate-50">
        <Footer />
      </div>
    </div>
  );
};

export default RoadmapDetail;

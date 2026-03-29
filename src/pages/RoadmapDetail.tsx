import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { roadmaps } from '../data/roadmaps';
import { Circle, CheckSquare, Target, Clock, Bot, Flame, ArrowLeft, Layout } from 'lucide-react';
import Footer from '../components/Footer';
import { useUser } from '../context/UserContext';
import TopicModal from '../components/TopicModal';

const RoadmapDetail = () => {
  const { id } = useParams();
  const roadmap = roadmaps.find(r => r.id === id);
  const { completedSteps, toggleStep } = useUser();
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

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

  // Calculate Progress
  const totalTopics = roadmap.levels.reduce((acc, level) => acc + level.topics.length, 0);
  const completedInRoadmap = completedSteps.filter(stepId => stepId.startsWith(`${roadmap.id}_`)).length;
  const progressPercent = totalTopics > 0 ? Math.round((completedInRoadmap / totalTopics) * 100) : 0;
  // Mock streak for now
  const mockStreak = 5;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col selection:bg-emerald-500/30">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 pt-16 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-200/50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

        <div className="max-w-5xl mx-auto relative z-10 flex flex-col md:flex-row gap-8 justify-between items-start md:items-center">
          <div>
            <Link to="/roadmaps" className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-bold text-sm mb-6 transition-colors tracking-wide uppercase bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
              <ArrowLeft className="w-4 h-4" /> Back to Pathways
            </Link>
            <motion.h1 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4"
            >
              {roadmap.title}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="text-lg text-slate-600 max-w-2xl leading-relaxed"
            >
              {roadmap.description}
            </motion.p>
          </div>

          {/* Stats & Actions Sub-Header */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
            className="flex flex-col gap-4 w-full md:w-auto shrink-0 bg-white border border-slate-200 p-6 rounded-3xl shadow-sm"
          >
            {/* Progress Bar */}
            <div className="mb-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <Target className="w-4 h-4 text-emerald-500" />
                  Your Progress
                </span>
                <span className="text-sm font-bold text-emerald-600">{progressPercent}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-500 rounded-full transition-all duration-1000 ease-out relative overflow-hidden" 
                  style={{ width: `${progressPercent}%` }}
                >
                  <div className="absolute top-0 bottom-0 left-0 right-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0.15)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem] animate-[progress_1s_linear_infinite]"></div>
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-2 text-right">{completedInRoadmap} of {totalTopics} topics completed</p>
            </div>

            <div className="flex flex-wrap items-center gap-3 border-t border-slate-100 pt-4">
              <div className="flex items-center gap-1.5 bg-orange-50 text-orange-600 px-3 py-1.5 rounded-xl text-sm font-bold border border-orange-100">
                <Flame className="w-4 h-4 text-orange-500" />
                {mockStreak} Day Streak
              </div>
              <div className="flex items-center gap-1.5 bg-slate-50 text-slate-600 px-3 py-1.5 rounded-xl text-sm font-bold border border-slate-200">
                <Clock className="w-4 h-4 text-slate-400" />
                3-6 Months
              </div>
            </div>

            <button className="mt-4 w-full flex items-center justify-center gap-2 bg-slate-900 text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-800 transition-colors shadow-md hover:shadow-lg">
              <Bot className="w-4 h-4 text-emerald-400" />
              Ask AI Mentor
            </button>
          </motion.div>
        </div>
      </div>

      {/* Timeline Content */}
      <div className="flex-grow max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16">
        <div className="relative pl-6 md:pl-10">
          {/* Vertical Green Line */}
          <div className="absolute top-4 bottom-4 left-[11px] md:left-[19px] w-1 bg-emerald-100 rounded-full"></div>

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
              <div className="absolute -left-[30px] md:-left-[38px] w-7 h-7 bg-white border-4 border-emerald-500 rounded-full mt-1 z-10 shadow-[0_0_15px_rgba(16,185,129,0.3)]"></div>

              <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 hover:border-slate-300 transition-all shadow-sm">
                <div className="flex flex-wrap items-center gap-3 mb-8">
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">{level.name} Phase</h2>
                  {levelIdx === 0 && (
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[11px] font-bold rounded-full uppercase tracking-widest border border-emerald-200">Start Here</span>
                  )}
                  {levelIdx === 1 && (
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[11px] font-bold rounded-full uppercase tracking-widest border border-blue-200">Core Skills</span>
                  )}
                  {levelIdx === 2 && (
                    <span className="px-3 py-1 bg-purple-50 text-purple-600 text-[11px] font-bold rounded-full uppercase tracking-widest border border-purple-200">Mastery</span>
                  )}
                </div>

                {/* Topics Grid as clickable buttons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {level.topics.map((topic, topicIdx) => {
                    const stepId = `${roadmap!.id}_${levelIdx}_${topicIdx}`;
                    const isCompleted = completedSteps.includes(stepId);
                    
                    return (
                      <div 
                        key={topicIdx} 
                        className={`group relative flex flex-col justify-between rounded-2xl border p-5 transition-all duration-300 cursor-pointer overflow-hidden ${isCompleted ? 'bg-emerald-50/50 border-emerald-200 hover:border-emerald-300' : 'bg-slate-50 border-slate-200 hover:border-emerald-500/40 hover:bg-white hover:shadow-lg hover:-translate-y-1'}`}
                        onClick={() => setSelectedTopic(topic)}
                      >
                        {/* Status Line */}
                        <div className={`absolute left-0 top-0 bottom-0 w-1 ${isCompleted ? 'bg-emerald-500' : 'bg-transparent group-hover:bg-emerald-400'} transition-colors`}></div>

                        <div className="flex items-start justify-between gap-4 mb-4">
                          <h3 className={`text-lg font-bold transition-colors ${isCompleted ? 'text-slate-700 line-through decoration-slate-400' : 'text-slate-900 group-hover:text-emerald-700'}`}>
                            {topic}
                          </h3>
                        </div>

                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-200/50">
                          <span className="text-sm font-semibold text-slate-500 group-hover:text-emerald-600 transition-colors">View Details</span>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleStep(stepId);
                            }}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-bold transition-all border ${
                              isCompleted 
                                ? 'bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-200' 
                                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900 shadow-sm'
                            }`}
                          >
                            {isCompleted ? <CheckSquare className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                            {isCompleted ? 'Done' : 'Mark'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {level.projects.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-slate-200">
                    <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <Layout className="w-4 h-4" />
                      Milestone Projects
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {level.projects.map((proj, i) => (
                        <span key={i} className="bg-white text-slate-700 border border-slate-200 px-4 py-2 rounded-xl text-sm font-bold shadow-sm hover:border-emerald-300 hover:text-emerald-600 transition-colors cursor-pointer flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
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
      
      <div className="bg-slate-50 border-t border-slate-200/50">
        <Footer />
      </div>

      <TopicModal 
        isOpen={!!selectedTopic}
        onClose={() => setSelectedTopic(null)}
        topicName={selectedTopic || ''}
      />
    </div>
  );
};

export default RoadmapDetail;


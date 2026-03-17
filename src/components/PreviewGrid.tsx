import { motion } from 'framer-motion';
import { ArrowRight, Code2, BookOpen, Trophy, Target, PlayCircle, CheckCircle2 } from 'lucide-react';

export const PreviewGrid = () => {
  const roadmaps = [
    { title: 'Core UI & Syntax', icon: Code2, color: 'text-blue-500 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/20' },
    { title: 'DSA Mastery', icon: BookOpen, color: 'text-emerald-500 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
    { title: 'System Design', icon: Trophy, color: 'text-indigo-500 dark:text-indigo-400', bg: 'bg-indigo-50 dark:bg-indigo-900/20' }
  ];

  const problems = [
    { name: '1. Two Sum', difficulty: 'Easy', color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-100 dark:bg-emerald-900/30' },
    { name: '206. Reverse Linked List', difficulty: 'Easy', color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-100 dark:bg-emerald-900/30' },
    { name: '146. LRU Cache', difficulty: 'Medium', color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-100 dark:bg-yellow-900/30' },
    { name: '23. Merge k Sorted Lists', difficulty: 'Hard', color: 'text-red-600 dark:text-red-400', bg: 'bg-red-100 dark:bg-red-900/30' },
  ];

  return (
    <div className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            Everything you need to <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400">succeed</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            From structured learning paths to high-quality practice questions, PrepForge accelerates your preparation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Roadmaps Preview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8"
          >
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-100 dark:bg-emerald-900/40 rounded-lg">
                  <Target className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Curated Roadmaps</h3>
              </div>
              <button className="text-emerald-600 dark:text-emerald-400 text-sm font-semibold hover:text-emerald-700 flex items-center gap-1 group">
                View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="space-y-4">
              {roadmaps.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 hover:shadow-md transition-all cursor-pointer">
                  <div className={`w-12 h-12 rounded-lg ${item.bg} flex items-center justify-center shrink-0`}>
                    <item.icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <div className="flex-1 min-w-0 pt-1">
                    <h4 className="font-bold text-slate-900 dark:text-white mb-2 truncate">{item.title}</h4>
                    <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-slate-900 dark:bg-emerald-500 rounded-full" style={{ width: `${Math.max(15, (idx + 1) * 25)}%` }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Top Problems Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8"
          >
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-lg">
                  <PlayCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Top Problems</h3>
              </div>
              <button className="text-blue-600 dark:text-blue-400 text-sm font-semibold hover:text-blue-700 flex items-center gap-1 group">
                Practice <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="space-y-3">
              {problems.map((prob, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 hover:shadow-md transition-all cursor-pointer group">
                  <div className="flex items-center gap-3 min-w-0">
                    <CheckCircle2 className={`w-5 h-5 ${idx === 0 ? 'text-emerald-500' : 'text-slate-300 dark:text-slate-600'}`} />
                    <span className="font-medium text-slate-900 dark:text-slate-100 truncate">{prob.name}</span>
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${prob.bg} ${prob.color}`}>
                    {prob.difficulty}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

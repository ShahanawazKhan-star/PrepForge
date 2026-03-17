import { motion } from 'framer-motion';
import { ArrowRight, Code2, BookOpen, Trophy } from 'lucide-react';

export const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-slate-50 pt-24 pb-32 lg:pt-36 lg:pb-40 z-base">
      
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden -z-10 mt-10 pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-emerald-200/20 blur-3xl opacity-60"></div>
        <div className="absolute top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-200/20 blur-3xl opacity-60"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-4xl mx-auto">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-800 text-sm font-semibold mb-8 border border-emerald-200 shadow-sm"
          >
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Elevate Your Coding Journey
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-8 leading-tight"
          >
            From <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Beginner</span> to <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Job Ready</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Master data structures, conquer algorithms, and ace your technical interviews with our structured roadmap and AI-powered mentorship.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4"
          >
            <button className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900 text-white font-semibold text-lg hover:bg-slate-800 hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group">
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-slate-700 font-semibold text-lg border border-slate-200 hover:bg-slate-50 hover:shadow-md transition-all">
              View Curriculum
            </button>
          </motion.div>
        </div>

        {/* Roadmap Preview Placeholder section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-20 relative mx-auto max-w-5xl"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-50 z-10 pointer-events-none rounded-2xl h-full w-full" style={{ top: '60%' }}></div>
          
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200/60 p-2 overflow-hidden relative">
            {/* Browser dot styling */}
            <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 border-b border-slate-100 rounded-t-xl mb-4">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            
            {/* Fake content for preview */}
            <div className="px-6 py-8 pb-16 grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'Core UI & Syntax', icon: Code2, color: 'text-blue-500', bg: 'bg-blue-50' },
                { title: 'DSA Mastery', icon: BookOpen, color: 'text-emerald-500', bg: 'bg-emerald-50' },
                { title: 'System Design', icon: Trophy, color: 'text-indigo-500', bg: 'bg-indigo-50' }
              ].map((item, idx) => (
                <div key={idx} className="p-6 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all cursor-pointer">
                  <div className={`w-12 h-12 rounded-lg ${item.bg} flex items-center justify-center mb-4`}>
                    <item.icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                  <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-slate-900 rounded-full" style={{ width: `${(idx + 1) * 25}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Overlay marker */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
               <span className="bg-slate-900 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Roadmap Preview
               </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

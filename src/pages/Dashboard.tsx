import { Code, Flame, Map, PlayCircle, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';

export default function Dashboard() {
  const { user, totalSolvedCount, currentStreak } = useUser();
  const userName = user?.user_metadata?.full_name || 'Developer';

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 text-slate-900 p-6 md:p-10 font-sans selection:bg-emerald-500/30">
      <div className="max-w-6xl mx-auto w-full">
        
        {/* Welcome Header */}
        <div className="mb-12">
          <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight flex items-center gap-3">
            Welcome back, {userName}! 👋
          </h1>
          <p className="text-slate-600 text-lg font-medium flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            Keep coding! Your journey to mastery is looking great today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* Card 1 */}
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-200 hover:border-slate-300 transition-all duration-300 group">
            <div className="flex justify-between items-start mb-6">
              <div className="bg-indigo-500/10 p-3.5 rounded-2xl border border-indigo-500/20 group-hover:bg-indigo-500/20 transition-colors">
                <Code className="w-6 h-6 text-indigo-500" />
              </div>
            </div>
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">DSA Problems Solved</h3>
            <div className="flex items-baseline gap-1.5">
              <span className="text-4xl font-black text-slate-900 tracking-tighter">{totalSolvedCount || 0}</span>
              <span className="text-lg font-bold text-slate-500">/ 100</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-200 hover:border-slate-300 transition-all duration-300 group">
            <div className="flex justify-between items-start mb-6">
              <div className="bg-orange-500/10 p-3.5 rounded-2xl border border-orange-500/20 group-hover:bg-orange-500/20 transition-colors">
                <Flame className="w-6 h-6 text-orange-500" />
              </div>
            </div>
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Current Streak</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-slate-900 tracking-tighter">{currentStreak || 0}</span>
              <span className="text-lg font-bold text-orange-500">Days 🔥</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-200 hover:border-slate-300 transition-all duration-300 group">
            <div className="flex justify-between items-start mb-6">
              <div className="bg-emerald-500/10 p-3.5 rounded-2xl border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-colors">
                <Map className="w-6 h-6 text-emerald-500" />
              </div>
            </div>
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Roadmaps Active</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900 tracking-tight">Java Full Stack</span>
            </div>
          </div>

        </div>

        {/* Continue Learning Section */}
        <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          Continue Learning
        </h2>
        
        <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-xl border border-slate-200 hover:border-slate-300 transition-all duration-300 flex flex-col md:flex-row gap-8 items-start md:items-center justify-between group overflow-hidden relative">
          
          {/* Decorative Glow */}
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-500/10 transition-colors duration-500"></div>

          <div className="flex-1 w-full relative z-10">
            <div className="flex justify-between items-end mb-4">
              <div>
                <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                   In Progress
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mb-1.5 tracking-tight group-hover:text-emerald-600 transition-colors duration-300">Java Full Stack</h3>
                <p className="text-slate-600 font-medium">Spring Boot Core Concepts • Dependencies & Auto-configuration</p>
              </div>
              <div className="text-right">
                <span className="text-4xl font-black text-slate-900 tracking-tighter">60<span className="text-xl text-slate-500 font-bold ml-1">%</span></span>
              </div>
            </div>
            
            <div className="w-full bg-slate-100 rounded-full h-3 shadow-inner overflow-hidden border border-slate-200">
              <div className="bg-emerald-500 h-full rounded-full w-[60%] shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
            </div>
          </div>

          <div className="relative z-10 shrink-0 w-full md:w-auto mt-4 md:mt-0">
            <Link to="/roadmaps" className="w-full md:w-auto bg-emerald-500 text-white px-8 py-3.5 rounded-2xl font-bold hover:bg-emerald-600 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40">
              <PlayCircle className="w-5 h-5 text-white" />
              <span className="text-white">Resume</span>
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}

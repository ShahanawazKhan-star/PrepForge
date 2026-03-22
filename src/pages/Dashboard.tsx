import { useState } from 'react';
import { TrendingUp, Target, Code, BookOpen, Layout, Briefcase, Award, Settings, LogOut, ChevronRight, PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { roadmaps } from '../data/roadmaps';

export default function Dashboard() {
  const { completedSteps, getRoadmapProgress } = useUser();
  
  // Dynamically determine the active roadmap based on completed steps
  const roadmapCounts = completedSteps.reduce((acc, stepId) => {
    const roadmapId = stepId.split('_')[0];
    acc[roadmapId] = (acc[roadmapId] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  let activeRoadmapId = 'fullstack'; // Default fallback
  let maxCount = 0;
  Object.entries(roadmapCounts).forEach(([id, count]) => {
    if (count > maxCount) {
      maxCount = count;
      activeRoadmapId = id;
    }
  });

  const activeRoadmap = roadmaps.find(r => r.id === activeRoadmapId) || roadmaps[0];
  const safeRoadmapId = activeRoadmap?.id || 'fullstack';
  const totalSteps = activeRoadmap?.levels.reduce((acc, level) => acc + level.topics.length, 0) || 0;
  const completedCount = completedSteps.filter(id => id.startsWith(`${safeRoadmapId}_`)).length;
  const progressPercent = getRoadmapProgress(safeRoadmapId, totalSteps);

  const [activeTab, setActiveTab] = useState('overview');

  const sidebarLinks = [
    { id: 'overview', label: 'Overview', icon: <Layout className="w-5 h-5" /> },
    { id: 'roadmaps', label: 'My Roadmaps', icon: <Target className="w-5 h-5" /> },
    { id: 'practice', label: 'Practice History', icon: <Code className="w-5 h-5" /> },
    { id: 'jobs', label: 'Saved Jobs', icon: <Briefcase className="w-5 h-5" /> },
    { id: 'mock', label: 'Mock Interviews', icon: <Award className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 flex flex-col md:flex-row font-sans relative z-0">
      
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 p-6 sticky top-16 h-[calc(100vh-4rem)] z-10">
        <div className="mb-8">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-5 ml-2">Dashboard</p>
          <nav className="flex flex-col gap-2">
            {sidebarLinks.map(link => (
              <button
                key={link.id}
                onClick={() => setActiveTab(link.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
                  activeTab === link.id 
                    ? 'bg-emerald-50 text-emerald-700' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {link.icon}
                {link.label}
              </button>
            ))}
          </nav>
        </div>
        
        <div className="mt-auto pt-6 border-t border-slate-100">
          <button className="flex items-center gap-3 px-4 py-3 text-slate-500 font-bold hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all w-full text-left">
            <Settings className="w-5 h-5" /> Settings
          </button>
          <Link to="/" className="flex items-center gap-3 px-4 py-3 text-red-500 font-bold hover:bg-red-50 hover:text-red-700 rounded-xl transition-all w-full mt-2">
            <LogOut className="w-5 h-5" /> Sign Out
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 lg:p-10 w-full overflow-y-auto">
        
        {/* Welcome Section */}
        <div className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">Welcome back, Student! 👋</h1>
              <div className="inline-flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm">
                <Target className="w-5 h-5 text-emerald-600" />
                <span className="text-sm font-bold text-slate-700">Current Track: <span className="text-emerald-600">{activeRoadmap?.title || 'Full Stack Development'}</span></span>
              </div>
            </div>
            
            <Link to="/coding-practice" className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-md hover:shadow-lg inline-flex items-center gap-2 max-w-max">
              <Code className="w-5 h-5" /> Go to Practice
            </Link>
          </div>
        </div>

        {/* Widgets Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-12">
          
          {/* Roadmap Progress Widget */}
          <div className="bg-white rounded-3xl p-5 lg:p-6 shadow-sm hover:shadow-md border border-slate-100 relative overflow-hidden group transition-all duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full -z-10 transition-transform duration-500 group-hover:scale-[1.3]"></div>
            
            <div className="flex justify-between items-start mb-6 z-10">
              <div className="bg-emerald-100 p-3.5 rounded-2xl text-emerald-600 shadow-sm border border-emerald-50">
                <TrendingUp className="w-6 h-6" />
              </div>
              <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-100 px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wide shadow-sm">
                In progress
              </span>
            </div>
            
            <h3 className="text-lg font-extrabold text-slate-900 mb-1 z-10 relative">Roadmap Progress</h3>
            <p className="text-sm font-medium text-slate-500 mb-8 z-10 relative">You're making a great pace this week!</p>
            
            <div className="flex items-end justify-between mb-3 z-10 relative">
              <span className="text-4xl font-black text-slate-900 tracking-tighter">{progressPercent}<span className="text-xl text-slate-400">%</span></span>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{completedCount}/{totalSteps} Modules</span>
            </div>
            
            <div className="w-full bg-slate-100 rounded-full h-3 mb-2 z-10 relative shadow-inner overflow-hidden">
              <div className="bg-emerald-500 h-3 rounded-full relative transition-all duration-1000 ease-out" style={{ width: `${progressPercent}%` }}></div>
            </div>
          </div>

          {/* Coding Stats Widget */}
          <div className="bg-white rounded-3xl p-5 lg:p-6 shadow-sm hover:shadow-md border border-slate-100 transition-all duration-300">
            <div className="flex justify-between items-start mb-6">
              <div className="bg-blue-50/80 p-3.5 rounded-2xl shadow-sm border border-blue-50">
                <Code className="w-6 h-6 text-blue-600" />
              </div>
              <Link to="/coding-practice" className="p-2.5 bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-900 rounded-full transition-colors border border-slate-100">
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
            
            <h3 className="text-lg font-extrabold text-slate-900 mb-8">Coding Stats</h3>
            
            <div className="space-y-5">
              <div className="group">
                <div className="flex justify-between text-sm font-bold mb-2">
                  <span className="text-emerald-500">Easy</span>
                  <span className="text-slate-800 tracking-tight">12<span className="text-slate-400 font-medium"> / 50</span></span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 shadow-inner overflow-hidden">
                  <div className="bg-emerald-500 h-2.5 rounded-full transition-all group-hover:bg-emerald-400" style={{ width: '24%' }}></div>
                </div>
              </div>
              
              <div className="group">
                <div className="flex justify-between text-sm font-bold mb-2">
                  <span className="text-orange-500">Medium</span>
                  <span className="text-slate-800 tracking-tight">5<span className="text-slate-400 font-medium"> / 30</span></span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 shadow-inner overflow-hidden">
                  <div className="bg-orange-500 h-2.5 rounded-full transition-all group-hover:bg-orange-400" style={{ width: '16.6%' }}></div>
                </div>
              </div>

              <div className="group">
                <div className="flex justify-between text-sm font-bold mb-2">
                  <span className="text-red-500">Hard</span>
                  <span className="text-slate-800 tracking-tight">1<span className="text-slate-400 font-medium"> / 20</span></span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 shadow-inner overflow-hidden">
                  <div className="bg-red-500 h-2.5 rounded-full transition-all group-hover:bg-red-400" style={{ width: '5%' }}></div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Recent Activity / Continue Learning */}
        <h2 className="text-xl font-extrabold text-slate-900 mb-5 flex items-center gap-2.5">
          <BookOpen className="w-6 h-6 text-emerald-600" /> Continue Learning
        </h2>
        
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Next Topic Card */}
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 flex gap-5 items-center group cursor-pointer hover:shadow-md hover:border-emerald-200 transition-all">
            <div className="bg-emerald-50 border border-emerald-100 w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-600 transition-colors shadow-sm">
              <TrendingUp className="w-8 h-8 text-emerald-600 group-hover:text-white transition-colors" />
            </div>
            <div className="flex-1">
              <span className="text-xs font-black text-emerald-600 uppercase tracking-widest mb-1 block">Up Next</span>
              <h4 className="text-base font-bold text-slate-900 mb-1 leading-tight group-hover:text-emerald-700 transition-colors">Advanced React Hooks</h4>
              <p className="text-sm font-medium text-slate-500 line-clamp-1">Master useMemo, useCallback, and custom hooks.</p>
            </div>
            <div className="text-slate-300 group-hover:text-emerald-600 p-2 transition-colors">
              <PlayCircle className="w-10 h-10" />
            </div>
          </div>

          {/* Last coding problem */}
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 flex gap-5 items-center hover:shadow-md cursor-pointer hover:border-slate-300 transition-all group">
            <div className="bg-blue-50 border border-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 transition-colors shadow-sm">
              <Code className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" />
            </div>
            <div className="flex-1">
              <span className="text-xs font-black text-blue-600 uppercase tracking-widest mb-1 block">Last Attempted</span>
              <h4 className="text-base font-bold text-slate-900 mb-1 leading-tight">Two Sum</h4>
              <p className="text-sm font-medium text-slate-500 line-clamp-1">Arrays & Hashing • Easy</p>
            </div>
            <Link to="/coding-practice" onClick={(e) => e.stopPropagation()} className="bg-slate-50 text-slate-900 border border-slate-200 px-5 py-2.5 rounded-xl text-sm font-bold group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 transition-colors shadow-sm focus:ring-4 focus:ring-slate-100 z-10 outline-none">
              Solve
            </Link>
          </div>
        </div>
        
      </main>

    </div>
  );
}

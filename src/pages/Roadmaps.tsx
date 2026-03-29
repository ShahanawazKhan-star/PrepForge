import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Map, Sparkles, ChevronRight } from 'lucide-react';
import * as Icons from 'lucide-react';
import Footer from '../components/Footer';
import { roadmaps } from '../data/roadmaps';

export default function Roadmaps() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-emerald-500/30 flex flex-col">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/')}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600 hover:text-slate-900"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <Map className="w-6 h-6 text-emerald-500" />
              <h1 className="text-xl font-bold tracking-tight text-slate-900">Career Pathways</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow max-w-7xl mx-auto px-6 py-16 w-full">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-sm font-semibold mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Structured Learning Paths</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
            Choose Your Career Path
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Follow our premium, expert-curated roadmaps to master your desired tech field. From beginner fundamentals to advanced real-world engineering.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-20">
          {roadmaps.map((roadmap) => {
            const IconComponent = (Icons as any)[roadmap.icon] || Icons.Code;
            
            return (
              <div
                key={roadmap.id}
                onClick={() => navigate(`/roadmap/${roadmap.id}`)}
                className="group relative bg-white border border-slate-200 rounded-3xl p-6 lg:p-8 cursor-pointer overflow-hidden hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(16,185,129,0.15)] hover:border-emerald-300 transition-all duration-300"
              >
                {/* Background Grid Pattern (Subtle) */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:1rem_1rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-emerald-500 group-hover:text-white group-hover:border-emerald-500 transition-colors duration-300 mb-6 shadow-sm">
                    <IconComponent className="w-7 h-7" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-700 transition-colors">
                    {roadmap.title}
                  </h3>
                  
                  <p className="text-slate-600 line-clamp-2 leading-relaxed mb-6 flex-grow">
                    {roadmap.description}
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
                    <span className="text-sm font-semibold text-slate-500 group-hover:text-emerald-600 transition-colors flex items-center gap-1">
                      {roadmap.levels.length} Levels
                    </span>
                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="border-t border-slate-200/50 bg-slate-50 mt-auto">
        <Footer />
      </div>
    </div>
  );
}

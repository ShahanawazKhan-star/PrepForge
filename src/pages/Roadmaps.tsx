import { useNavigate } from 'react-router-dom';
import { Code, Coffee, Server, Database, ArrowLeft, Map, Sparkles } from 'lucide-react';
import Footer from '../components/Footer';

const milestones = [
  {
    title: 'Frontend Basics',
    description: 'Master the building blocks of the web including HTML5, modern CSS3 layouts, JavaScript ES6+, and component-driven architecture with React.',
    tech: ['HTML', 'CSS', 'JS', 'React'],
    icon: Code
  },
  {
    title: 'Core Java & OOPs',
    description: 'Dive deep into Java fundamentals, Object-Oriented Programming concepts, multithreading, collections framework, and JVM internals.',
    tech: ['Java 17+', 'OOPs', 'Collections', 'Multithreading'],
    icon: Coffee
  },
  {
    title: 'Backend Frameworks',
    description: 'Build robust APIs and enterprise applications using Spring Boot, handle data persistence with Hibernate/JPA, and implement RESTful services.',
    tech: ['Spring Boot', 'Hibernate', 'JPA', 'REST APIs'],
    icon: Server
  },
  {
    title: 'Database & Deployment',
    description: 'Design relational schemas, manage data with MySQL, containerize applications using Docker, and deploy scalable services via AWS.',
    tech: ['MySQL', 'AWS', 'Docker', 'CI/CD'],
    icon: Database
  }
];

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
      <div className="flex-grow max-w-5xl mx-auto px-6 py-20 w-full relative">
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Mastery Track</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
            Java Full Stack Developer
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Follow this structured timeline to master enterprise Java development. From basic frontend interfaces to scalable backend microservices.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative border-l-2 border-emerald-500/20 pl-8 md:pl-0 md:border-l-0 pb-12">
          {/* Desktop Center Line */}
          <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-emerald-500/0 via-emerald-500/40 to-emerald-500/0"></div>

          {milestones.map((milestone, index) => {
            const Icon = milestone.icon;
            const isEven = index % 2 === 0;

            return (
              <div 
                key={index} 
                className={`relative flex flex-col md:flex-row items-center justify-between mb-16 md:mb-24 ${!isEven ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Mobile line dot overlay */}
                <div className="md:hidden absolute -left-[41px] top-8 w-4 h-4 rounded-full bg-slate-50 border-2 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.8)] z-10"></div>
                
                {/* Desktop center icon */}
                <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white border border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.3)] items-center justify-center z-10 text-emerald-400 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6" />
                </div>

                {/* Spacer for desktop layout (pushes card to correct side) */}
                <div className="hidden md:block w-[45%]"></div>

                {/* Content Card */}
                <div className="w-full md:w-[45%]">
                  <div className="bg-white overflow-hidden border border-slate-200 p-8 rounded-3xl hover:border-emerald-500/50 transition-all duration-300 hover:shadow-[0_0_40px_-10px_rgba(16,185,129,0.2)] group relative">
                    {/* Glowing Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                    <div className="relative z-10">
                      <div className="md:hidden inline-flex p-3 bg-emerald-500/10 rounded-xl mb-5 text-emerald-400 border border-emerald-500/20">
                        <Icon className="w-6 h-6" />
                      </div>
                      
                      <div className="text-emerald-400 font-mono text-sm mb-3 font-bold tracking-widest uppercase flex items-center gap-3">
                        Phase 0{index + 1}
                        <div className="h-[1px] bg-emerald-500/30 flex-grow max-w-[50px]"></div>
                      </div>
                      
                      <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                        {milestone.title}
                      </h3>
                      
                      <p className="text-slate-600 mb-8 leading-relaxed text-md md:text-lg">
                        {milestone.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        {milestone.tech.map(t => (
                          <span key={t} className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-600 font-medium tracking-wide">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Wrapper - explicitly coloring child elements to match dark theme */}
      <div className="border-t border-slate-200/50 bg-slate-50 mt-auto">
        <div className="opacity-80">
          <Footer />
        </div>
      </div>
    </div>
  );
}

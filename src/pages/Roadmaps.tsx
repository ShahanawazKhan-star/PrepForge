import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Bookmark,
  ChevronLeft,
  ArrowRight,
  Coffee,
  Layout,
  Database,
  Server,
  Rocket,
  Clock,
  BookOpen,
  Star,
  Map,
  CheckCircle2,
  Circle,
  Zap,
  ChevronRight,
  X,
  Bell,
} from 'lucide-react';
import { MainLayout } from '../layouts/MainLayout';

// ─── Types ────────────────────────────────────────────────────────────────────
type TrackId = 'fullstack' | 'java' | null;
type Status = 'completed' | 'in-progress' | 'upcoming';

interface RoadmapCard {
  id: string;
  title: string;
  tag?: string;
  openTrack?: TrackId;
}

// ─── Directory data ───────────────────────────────────────────────────────────
const roleBased: RoadmapCard[] = [
  { id: 'frontend',    title: 'Frontend'     },
  { id: 'backend',     title: 'Backend'      },
  { id: 'fullstack',   title: 'Full Stack',  tag: 'Live', openTrack: 'fullstack' },
  { id: 'devops',      title: 'DevOps'       },
  { id: 'ai-engineer', title: 'AI Engineer'  },
  { id: 'data-analyst',title: 'Data Analyst' },
  { id: 'android',     title: 'Android'      },
  { id: 'ios',         title: 'iOS'          },
];

const skillBased: RoadmapCard[] = [
  { id: 'sql',           title: 'SQL'            },
  { id: 'react',         title: 'React'          },
  { id: 'typescript',    title: 'TypeScript'     },
  { id: 'nodejs',        title: 'Node.js'        },
  { id: 'java',          title: 'Java',  tag: 'Live', openTrack: 'java' },
  { id: 'springboot',    title: 'Spring Boot'    },
  { id: 'system-design', title: 'System Design'  },
  { id: 'python',        title: 'Python'         },
  { id: 'cpp',           title: 'C++'            },
];

// ─── Timeline data (Full-Stack Java) ─────────────────────────────────────────
interface Step {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  duration: string;
  topics: string[];
  status: Status;
  resources: number;
}

const timelineSteps: Step[] = [
  {
    id: 1,
    title: 'Core Java & OOPs',
    subtitle: 'The Foundation',
    description:
      'Master Java fundamentals — variables, control flow, arrays, and the four pillars of OOP: Encapsulation, Abstraction, Inheritance, and Polymorphism.',
    icon: <Coffee className="w-6 h-6" />,
    duration: '3–4 weeks',
    topics: ['Java Syntax', 'OOP Principles', 'Exception Handling', 'Collections', 'Generics', 'File I/O'],
    status: 'completed',
    resources: 12,
  },
  {
    id: 2,
    title: 'Frontend Basics (React.js)',
    subtitle: 'Build the UI Layer',
    description:
      'Build dynamic, responsive UIs with React.js. Understand components, props, hooks (useState, useEffect), and state management fundamentals.',
    icon: <Layout className="w-6 h-6" />,
    duration: '4–5 weeks',
    topics: ['HTML & CSS', 'JavaScript ES6+', 'React Components', 'Hooks', 'React Router', 'Tailwind CSS'],
    status: 'in-progress',
    resources: 18,
  },
  {
    id: 3,
    title: 'Relational Databases (SQL)',
    subtitle: 'Persist Your Data',
    description:
      'Understand relational database design, write complex SQL queries, and learn normalization with MySQL or PostgreSQL.',
    icon: <Database className="w-6 h-6" />,
    duration: '2–3 weeks',
    topics: ['SQL Queries', 'Joins & Aggregations', 'Schema Design', 'Normalization', 'Indexing', 'Transactions'],
    status: 'upcoming',
    resources: 10,
  },
  {
    id: 4,
    title: 'Spring Boot & REST APIs',
    subtitle: 'Power the Backend',
    description:
      'Build production-grade REST APIs with Spring Boot. Cover MVC, dependency injection, JPA/Hibernate, and JWT authentication.',
    icon: <Server className="w-6 h-6" />,
    duration: '5–6 weeks',
    topics: ['Spring Boot', 'REST API Design', 'Spring Security', 'JPA & Hibernate', 'JWT Auth', 'Maven'],
    status: 'upcoming',
    resources: 22,
  },
  {
    id: 5,
    title: 'Project Deployment',
    subtitle: 'Ship to the World',
    description:
      'Deploy your full-stack app to the cloud with Docker, CI/CD via GitHub Actions, and hosting on AWS or Render.',
    icon: <Rocket className="w-6 h-6" />,
    duration: '2–3 weeks',
    topics: ['Docker', 'GitHub Actions CI/CD', 'AWS / Render', 'Nginx', 'Environment Config', 'Monitoring'],
    status: 'upcoming',
    resources: 9,
  },
];

const statusCfg = {
  completed:   { badge: 'bg-emerald-100 text-emerald-700 border-emerald-200', ring: 'ring-emerald-300', dot: 'bg-emerald-500', line: 'bg-emerald-400', cardBorder: 'border-emerald-600/30', icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" />, label: 'Completed',   btnGrad: 'from-emerald-500 to-teal-500',   btnText: 'Review Materials'     },
  'in-progress': { badge: 'bg-blue-100 text-blue-700 border-blue-200',       ring: 'ring-blue-400',    dot: 'bg-blue-400 animate-pulse', line: 'bg-slate-700', cardBorder: 'border-blue-500/40',    icon: <Zap className="w-4 h-4 text-blue-400" />,           label: 'In Progress', btnGrad: 'from-blue-500 to-indigo-500',    btnText: 'Continue Learning'    },
  upcoming:    { badge: 'bg-slate-700 text-slate-300 border-slate-600',       ring: 'ring-slate-600',   dot: 'bg-slate-600',              line: 'bg-slate-700', cardBorder: 'border-slate-700',       icon: <Circle className="w-4 h-4 text-slate-600" />,       label: 'Upcoming',    btnGrad: 'from-slate-600 to-slate-500',    btnText: 'Unlock Step'          },
};

// ─── Toast ────────────────────────────────────────────────────────────────────
const ComingSoonToast = ({ show, title, onClose }: { show: boolean; title: string; onClose: () => void }) => (
  <AnimatePresence>
    {show && (
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -14, scale: 0.95 }}
        transition={{ duration: 0.25 }}
        className="fixed top-5 left-1/2 -translate-x-1/2 z-[9999] w-[calc(100%-2rem)] max-w-sm"
      >
        <div className="flex items-center gap-3 bg-slate-800 border border-slate-600 shadow-2xl rounded-2xl px-5 py-4">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center flex-shrink-0">
            <Bell className="w-4 h-4 text-amber-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-white">{title}</p>
            <p className="text-xs text-slate-400 mt-0.5">This roadmap is coming soon. Stay tuned!</p>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-300 transition flex-shrink-0">
            <X className="w-4 h-4" />
          </button>
        </div>
        <motion.div
          initial={{ scaleX: 1 }} animate={{ scaleX: 0 }}
          transition={{ duration: 3, ease: 'linear' }}
          style={{ originX: 0 }}
          className="h-0.5 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full mt-1 mx-1"
        />
      </motion.div>
    )}
  </AnimatePresence>
);

// ─── Single directory card ────────────────────────────────────────────────────
const DirCard = ({ card, onClick }: { card: RoadmapCard; onClick: () => void }) => (
  <motion.button
    whileHover={{ y: -3, transition: { duration: 0.18 } }}
    onClick={onClick}
    className="group w-full text-left bg-slate-800/60 hover:bg-slate-700/80 border border-slate-700 hover:border-slate-500 rounded-2xl px-5 py-4 flex items-center justify-between gap-3 transition-all duration-200 shadow-sm hover:shadow-lg hover:shadow-black/20"
  >
    <div className="flex items-center gap-3 min-w-0">
      <span className="text-sm font-semibold text-slate-200 group-hover:text-white transition truncate">
        {card.title}
      </span>
      {card.tag && (
        <span className="flex-shrink-0 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
          {card.tag}
        </span>
      )}
    </div>
    <Bookmark className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 flex-shrink-0 transition-colors" />
  </motion.button>
);

// ─── Section label ────────────────────────────────────────────────────────────
const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-xs font-bold text-slate-400 uppercase tracking-[0.15em] mb-4">{children}</h2>
);

// ═════════════════════════════════════════════════════════════════════════════
export const Roadmaps = () => {
  const navigate = useNavigate();
  const [activeTrack, setActiveTrack] = useState<TrackId>(null);
  const [expanded, setExpanded]       = useState<number | null>(2);
  const [toast, setToast]             = useState<{ show: boolean; title: string }>({ show: false, title: '' });

  const handleCardClick = (card: RoadmapCard) => {
    if (card.openTrack) {
      setActiveTrack(card.openTrack);
    } else {
      setToast({ show: true, title: `${card.title} Roadmap` });
      setTimeout(() => setToast({ show: false, title: '' }), 3200);
    }
  };

  // ── Progress calc ──
  const completedCount = timelineSteps.filter(s => s.status === 'completed').length;
  const progressPct    = Math.round((completedCount / timelineSteps.length) * 100);

  return (
    <MainLayout>
      <ComingSoonToast
        show={toast.show}
        title={toast.title}
        onClose={() => setToast({ show: false, title: '' })}
      />

      {/* ── Outer dark shell ── */}
      <div className="min-h-screen bg-slate-900">

        {/* ══════════ DIRECTORY VIEW ══════════ */}
        <AnimatePresence mode="wait">
          {!activeTrack && (
            <motion.div
              key="directory"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              {/* Hero */}
              <div className="relative bg-slate-900 border-b border-slate-800 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl" />
                  <div className="absolute bottom-0 -left-20 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl" />
                </div>

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 relative">
                  <button
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-emerald-400 transition mb-8"
                  >
                    <ChevronLeft className="w-4 h-4" /> Back
                  </button>

                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20 mb-5">
                    <Map className="w-3.5 h-3.5" /> Roadmaps
                  </div>

                  <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-3">
                    Pick Your{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                      Learning Path
                    </span>
                  </h1>
                  <p className="text-slate-400 text-base max-w-xl leading-relaxed">
                    Community-curated roadmaps, articles, and resources to help you choose your path and grow in your career.
                  </p>
                </div>
              </div>

              {/* Grid sections */}
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">

                {/* Role-based */}
                <section>
                  <SectionLabel>Role-based Roadmaps</SectionLabel>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {roleBased.map((card, i) => (
                      <motion.div
                        key={card.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: i * 0.04 }}
                      >
                        <DirCard card={card} onClick={() => handleCardClick(card)} />
                      </motion.div>
                    ))}
                  </div>
                </section>

                {/* Divider */}
                <div className="border-t border-slate-800" />

                {/* Skill-based */}
                <section>
                  <SectionLabel>Skill-based Roadmaps</SectionLabel>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {skillBased.map((card, i) => (
                      <motion.div
                        key={card.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: i * 0.04 }}
                      >
                        <DirCard card={card} onClick={() => handleCardClick(card)} />
                      </motion.div>
                    ))}
                  </div>
                </section>

              </div>
            </motion.div>
          )}

          {/* ══════════ TIMELINE VIEW ══════════ */}
          {activeTrack && (
            <motion.div
              key="timeline"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.32 }}
              className="bg-slate-900 min-h-screen"
            >
              {/* Timeline header */}
              <div className="relative border-b border-slate-800 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl" />
                </div>
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
                  {/* Back to directory */}
                  <button
                    onClick={() => { setActiveTrack(null); setExpanded(2); }}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-400 hover:text-emerald-400 transition mb-8"
                  >
                    <ChevronLeft className="w-4 h-4" /> All Roadmaps
                  </button>

                  <div className="flex flex-col md:flex-row md:items-end gap-7">
                    <div className="flex-1">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20 mb-4">
                        <Map className="w-3 h-3" /> Career Roadmap
                      </div>
                      <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight mb-3">
                        Full-Stack{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                          Java Developer
                        </span>
                      </h1>
                      <p className="text-slate-400 text-sm leading-relaxed max-w-lg">
                        A beginner-to-hired structured path covering Java, React, SQL, Spring Boot, and cloud deployment.
                      </p>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {[
                          { icon: <Clock className="w-3 h-3" />, text: '16–21 Weeks' },
                          { icon: <BookOpen className="w-3 h-3" />, text: '71 Resources' },
                          { icon: <Star className="w-3 h-3" />, text: '4.8 / 5' },
                        ].map((m) => (
                          <span key={m.text} className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-700">
                            {m.icon} {m.text}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Mini progress ring */}
                    <div className="flex-shrink-0 bg-slate-800 border border-slate-700 rounded-2xl p-5 text-center min-w-[160px]">
                      <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider mb-3">Progress</p>
                      <div className="relative w-20 h-20 mx-auto mb-2">
                        <svg viewBox="0 0 100 100" className="w-20 h-20 -rotate-90">
                          <circle cx="50" cy="50" r="38" stroke="#1e293b" strokeWidth="10" fill="none" />
                          <motion.circle
                            cx="50" cy="50" r="38"
                            stroke="url(#tl-grad)"
                            strokeWidth="10" fill="none"
                            strokeLinecap="round"
                            strokeDasharray={2 * Math.PI * 38}
                            initial={{ strokeDashoffset: 2 * Math.PI * 38 }}
                            animate={{ strokeDashoffset: 2 * Math.PI * 38 * (1 - progressPct / 100) }}
                            transition={{ duration: 1.2, ease: 'easeOut' }}
                          />
                          <defs>
                            <linearGradient id="tl-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#10b981" />
                              <stop offset="100%" stopColor="#14b8a6" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-xl font-extrabold text-white">
                          {progressPct}%
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 font-semibold">{completedCount}/{timelineSteps.length} steps</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {timelineSteps.map((step, i) => {
                  const cfg    = statusCfg[step.status];
                  const isOpen = expanded === step.id;
                  const isLast = i === timelineSteps.length - 1;

                  return (
                    <div key={step.id} className="flex gap-5">
                      {/* Connector column */}
                      <div className="flex flex-col items-center">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.3, delay: i * 0.08 }}
                          className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ring-4 ${cfg.ring} ${
                            step.status === 'completed' ? 'bg-emerald-500' :
                            step.status === 'in-progress' ? 'bg-blue-500' : 'bg-slate-700'
                          }`}
                        >
                          <span className="text-white font-bold text-xs">{step.id}</span>
                        </motion.div>
                        {!isLast && <div className={`w-0.5 flex-1 my-2 rounded-full ${cfg.line} min-h-[1.5rem]`} />}
                      </div>

                      {/* Card */}
                      <motion.div
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.09 }}
                        className={`flex-1 mb-5 rounded-2xl border ${cfg.cardBorder} bg-slate-800/70 hover:bg-slate-800 cursor-pointer transition-colors duration-200 overflow-hidden`}
                        onClick={() => setExpanded(isOpen ? null : step.id)}
                      >
                        {/* Card top */}
                        <div className="p-5 flex items-start gap-4">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                            step.status === 'completed'   ? 'bg-emerald-500/20 text-emerald-400' :
                            step.status === 'in-progress' ? 'bg-blue-500/20 text-blue-400' :
                                                            'bg-slate-700 text-slate-500'
                          }`}>
                            {step.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="text-sm font-bold text-white">{step.title}</h3>
                              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${cfg.badge}`}>
                                {cfg.icon} {cfg.label}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 font-semibold mt-0.5">{step.subtitle}</p>
                            <div className="flex items-center gap-3 mt-2 text-xs text-slate-500 font-semibold">
                              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{step.duration}</span>
                              <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" />{step.resources} resources</span>
                            </div>
                          </div>
                          <ChevronRight className={`w-4 h-4 text-slate-500 flex-shrink-0 mt-1 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`} />
                        </div>

                        {/* Expandable */}
                        {isOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            transition={{ duration: 0.25 }}
                            className="border-t border-slate-700 px-5 pb-5 pt-4"
                          >
                            <p className="text-sm text-slate-400 leading-relaxed mb-4">{step.description}</p>
                            <div className="flex flex-wrap gap-2 mb-5">
                              {step.topics.map((t) => (
                                <span key={t} className="px-2.5 py-1 rounded-lg bg-slate-700 text-slate-300 text-[11px] font-semibold border border-slate-600 hover:bg-slate-600 transition cursor-pointer">
                                  {t}
                                </span>
                              ))}
                            </div>
                            <button className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white shadow hover:opacity-90 transition bg-gradient-to-r ${cfg.btnGrad}`}>
                              {cfg.btnText} <ArrowRight className="w-4 h-4" />
                            </button>
                          </motion.div>
                        )}
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
            
          )}
        </AnimatePresence>
      </div>
    </MainLayout>
  );
};

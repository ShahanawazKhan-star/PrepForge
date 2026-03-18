import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Code2,
  Map,
  Bot,
  Menu,
  X,
  Flame,
  Target,
  BookOpen,
  FileText,
  Bell,
  Settings,
  ChevronRight,
  TrendingUp,
  FolderGit2,
  Briefcase,
  MonitorPlay,
  ArrowRight,
} from 'lucide-react';


// ---------- Types ----------
interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
}

// ---------- Sidebar nav items ----------
const navItems: NavItem[] = [
  { id: 'overview',  label: 'Overview',        icon: <LayoutDashboard className="w-5 h-5" />, path: '/dashboard' },
  { id: 'coding',    label: 'Coding Practice', icon: <Code2           className="w-5 h-5" />, path: '/practice'  },
  { id: 'roadmaps',  label: 'Roadmaps',        icon: <Map             className="w-5 h-5" />, path: '/roadmaps'  },
  { id: 'ai-mentor', label: 'AI Mentor',       icon: <Bot             className="w-5 h-5" />, path: '/ai-mentor' },
];

// ---------- Circular Chart (Resume Score) ----------
const CircularProgress = ({ pct }: { pct: number }) => {
  const R = 42;
  const C = 2 * Math.PI * R;
  const offset = C - (pct / 100) * C;
  return (
    <div className="relative flex items-center justify-center w-28 h-28">
      <svg viewBox="0 0 100 100" className="w-28 h-28 -rotate-90">
        <circle cx="50" cy="50" r={R} stroke="#e2e8f0" strokeWidth="10" fill="none" />
        <motion.circle
          cx="50" cy="50" r={R}
          stroke="url(#green-grad)"
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={C}
          initial={{ strokeDashoffset: C }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.4, ease: 'easeOut', delay: 0.3 }}
        />
        <defs>
          <linearGradient id="green-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#16a34a" />
          </linearGradient>
        </defs>
      </svg>
      <span className="absolute text-2xl font-bold text-slate-800">{pct}%</span>
    </div>
  );
};

// ---------- Card wrapper ----------
const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.45 }}
    className={`bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow p-6 ${className}`}
  >
    {children}
  </motion.div>
);

// ---------- Main Dashboard ----------
export const Dashboard = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">

      {/* ── Mobile overlay ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ══════════ SIDEBAR ══════════ */}
      <aside
        className={`
          fixed top-0 left-0 h-screen w-64 bg-white border-r border-slate-100 shadow-lg
          flex flex-col z-50 transition-transform duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:z-auto lg:shadow-none
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <span className="text-lg font-bold text-slate-800 tracking-tight">PrepForge</span>
          </div>
          <button className="lg:hidden text-slate-400 hover:text-slate-600" onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { setActive(item.id); setSidebarOpen(false); navigate(item.path); }}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all
                  ${isActive
                    ? 'bg-green-50 text-green-700 shadow-sm'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}
                `}
              >
                <span className={isActive ? 'text-green-600' : ''}>{item.icon}</span>
                {item.label}
                {isActive && <ChevronRight className="w-4 h-4 ml-auto text-green-400" />}
              </button>
            );
          })}
        </nav>

        {/* Bottom user card */}
        <div className="px-4 py-5 border-t border-slate-100">
          <div className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-50 transition cursor-pointer">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-400 to-green-500 flex items-center justify-center text-white font-bold text-sm shadow">
              S
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-800 truncate">Student</p>
              <p className="text-xs text-slate-400 truncate">Free Plan</p>
            </div>
            <Settings className="w-4 h-4 text-slate-400 flex-shrink-0" />
          </div>
        </div>
      </aside>

      {/* ══════════ MAIN CONTENT ══════════ */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* ── Top bar ── */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden text-slate-500 hover:text-green-600 transition"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-slate-800">Student Portal</h1>
              <p className="text-xs text-slate-400 font-medium">Welcome back 👋  Keep up the momentum!</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-xl hover:bg-slate-100 transition text-slate-500">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-green-500" />
            </button>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-400 to-green-500 flex items-center justify-center text-white font-bold text-sm shadow cursor-pointer">
              S
            </div>
          </div>
        </header>

        {/* ── Page body ── */}
        <main className="flex-1 px-6 py-8 max-w-6xl mx-auto w-full">

          {/* Section heading */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-800">Overview</h2>
              <p className="text-slate-400 text-sm mt-0.5">Here's what's happening with your prep today.</p>
            </div>
            <motion.span
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 text-green-700 text-xs font-semibold border border-green-200"
            >
              <TrendingUp className="w-3.5 h-3.5" /> Streak Active
            </motion.span>
          </div>

          {/* ── Cards grid ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

            {/* 1. Daily Target */}
            <Card className="xl:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Target className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Daily Target</p>
                  <p className="text-xl font-bold text-slate-800">2 / 5 Problems</p>
                </div>
              </div>
              {/* Progress bar */}
              <div className="space-y-1.5">
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-green-500 to-green-600"
                    initial={{ width: '0%' }}
                    animate={{ width: '40%' }}
                    transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                  />
                </div>
                <p className="text-xs text-slate-400 font-medium">40% complete • 3 remaining</p>
              </div>
            </Card>

            {/* 2. Coding Streak */}
            <Card>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                  <Flame className="w-5 h-5 text-orange-500" />
                </div>
                <span className="text-4xl">🔥</span>
              </div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Coding Streak</p>
              <p className="text-4xl font-extrabold text-slate-800 mb-1">5 <span className="text-lg font-semibold text-slate-500">Days</span></p>
              <p className="text-xs text-orange-500 font-semibold">🏆 Personal Best! Keep it up.</p>
            </Card>

            {/* 3. Weak Topics */}
            <Card>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Weak Topics</p>
                  <p className="text-sm font-semibold text-slate-700">Focus areas for you</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Recursion', 'Linked List', 'Dynamic Programming', 'Graphs'].map((topic) => (
                  <span
                    key={topic}
                    className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition cursor-pointer"
                  >
                    {topic}
                  </span>
                ))}
              </div>
              <p className="text-xs text-slate-400 mt-3">Based on your recent submissions.</p>
            </Card>

            {/* 4. Resume Score */}
            <Card className="flex flex-col items-center text-center">
              <div className="flex items-center gap-3 mb-4 w-full">
                <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-violet-600" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Resume Score</p>
                  <p className="text-sm font-semibold text-slate-700">ATS Compatibility</p>
                </div>
              </div>
              <CircularProgress pct={75} />
              <p className="text-xs text-slate-400 mt-3">Good · Add 2 projects to reach 90%</p>
            </Card>
          </div>

          {/* ── Activity Row ── */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* Recent Activity */}
            <Card className="md:col-span-1">
              <h3 className="text-base font-bold text-slate-800 mb-4">Recent Activity</h3>
              <ul className="space-y-3">
                {[
                  { label: 'Solved: Two Sum',         time: '2 hrs ago',  color: 'bg-green-500' },
                  { label: 'Solved: Valid Parentheses', time: '5 hrs ago', color: 'bg-green-500' },
                  { label: 'Attempted: Merge K Lists', time: 'Yesterday',  color: 'bg-orange-400' },
                  { label: 'Watched: Recursion Module', time: '2 days ago', color: 'bg-blue-500' },
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${item.color}`} />
                    <span className="text-sm text-slate-700 flex-1">{item.label}</span>
                    <span className="text-xs text-slate-400 flex-shrink-0">{item.time}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Quick Actions */}
            <Card>
              <h3 className="text-base font-bold text-slate-800 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Practice Today', icon: <Code2 className="w-4 h-4" />, color: 'from-green-500 to-green-600' },
                  { label: 'View Roadmap',   icon: <Map   className="w-4 h-4" />, color: 'from-blue-500 to-indigo-500' },
                  { label: 'Ask AI Mentor',  icon: <Bot   className="w-4 h-4" />, color: 'from-violet-500 to-purple-500' },
                  { label: 'Update Resume',  icon: <FileText className="w-4 h-4" />, color: 'from-orange-400 to-rose-500' },
                ].map((action) => (
                  <button
                    key={action.label}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r ${action.color} text-white text-sm font-semibold shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all`}
                  >
                    {action.icon}
                    {action.label}
                  </button>
                ))}
              </div>
            </Card>
          </div>
          {/* ── Continue Your Journey ── */}
          <div className="mt-10">
            {/* Section header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-extrabold text-slate-800">Continue Your Journey</h2>
                <p className="text-slate-400 text-sm mt-0.5">Jump straight into what matters most today.</p>
              </div>
              <button
                onClick={() => navigate('/explore')}
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold transition"
              >
                View All <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Feature cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  id: 'roadmaps',
                  title: 'Career Roadmaps',
                  desc: 'Step-by-step paths to your target role.',
                  icon: <Map className="w-5 h-5" />,
                  gradient: 'from-green-500 to-green-700',
                  lightBg: 'bg-green-50',
                  lightText: 'text-green-700',
                  borderHover: 'hover:border-green-200',
                  path: '/roadmaps',
                  cta: 'Open',
                },
                {
                  id: 'coding',
                  title: 'Coding Practice',
                  desc: 'Sharpen DSA skills with curated problems.',
                  icon: <Code2 className="w-5 h-5" />,
                  gradient: 'from-blue-500 to-indigo-500',
                  lightBg: 'bg-blue-50',
                  lightText: 'text-blue-700',
                  borderHover: 'hover:border-blue-200',
                  path: '/practice',
                  cta: 'Practice',
                },
                {
                  id: 'projects',
                  title: 'Project Section',
                  desc: 'Build portfolio-ready real-world projects.',
                  icon: <FolderGit2 className="w-5 h-5" />,
                  gradient: 'from-violet-500 to-purple-500',
                  lightBg: 'bg-violet-50',
                  lightText: 'text-violet-700',
                  borderHover: 'hover:border-violet-200',
                  path: '/projects',
                  cta: 'Build',
                },
                {
                  id: 'jobs',
                  title: 'Job Section',
                  desc: 'Curated listings, CTC insights & eligibility.',
                  icon: <Briefcase className="w-5 h-5" />,
                  gradient: 'from-amber-500 to-orange-500',
                  lightBg: 'bg-amber-50',
                  lightText: 'text-amber-700',
                  borderHover: 'hover:border-amber-200',
                  path: '/jobs',
                  cta: 'Explore',
                },
                {
                  id: 'interviews',
                  title: 'Mock Interviews',
                  desc: 'AI-powered coding & HR practice rounds.',
                  icon: <MonitorPlay className="w-5 h-5" />,
                  gradient: 'from-rose-500 to-pink-500',
                  lightBg: 'bg-rose-50',
                  lightText: 'text-rose-700',
                  borderHover: 'hover:border-rose-200',
                  path: '/mock-interviews',
                  cta: 'Start',
                },
                {
                  id: 'ai-mentor',
                  title: 'AI Mentor',
                  desc: 'Code reviews, concepts & career advice 24/7.',
                  icon: <Bot className="w-5 h-5" />,
                  gradient: 'from-cyan-500 to-sky-500',
                  lightBg: 'bg-cyan-50',
                  lightText: 'text-cyan-700',
                  borderHover: 'hover:border-cyan-200',
                  path: '/ai-mentor',
                  cta: 'Chat',
                },
              ].map((f, i) => (
                <motion.div
                  key={f.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.38, delay: i * 0.06 }}
                  whileHover={{ y: -4, transition: { duration: 0.18 } }}
                  className={`group bg-white rounded-2xl border-2 border-slate-100 ${f.borderHover} shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col`}
                >
                  {/* Gradient bar */}
                  <div className={`h-1 w-full bg-gradient-to-r ${f.gradient}`} />

                  <div className="p-5 flex items-start gap-4 flex-1">
                    {/* Icon */}
                    <div className={`w-10 h-10 rounded-xl ${f.lightBg} ${f.lightText} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      {f.icon}
                    </div>

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-slate-800 mb-0.5">{f.title}</h3>
                      <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
                    </div>

                    {/* CTA arrow button */}
                    <button
                      onClick={() => navigate(f.path)}
                      className={`flex-shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gradient-to-r ${f.gradient} text-white text-xs font-bold shadow-sm hover:shadow-md hover:opacity-90 transition-all`}
                    >
                      {f.cta} <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </main>

      </div>
    </div>
  );
};

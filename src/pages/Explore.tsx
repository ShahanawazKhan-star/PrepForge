import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Map,
  Code2,
  FolderGit2,
  Briefcase,
  MonitorPlay,
  Bot,
  ArrowRight,
  Sparkles,
  ChevronLeft,
  Lock,
  LogIn,
  X,
  AlertCircle,
} from 'lucide-react';
import { MainLayout } from '../layouts/MainLayout';

// ─── Mock auth state (set to false = logged out) ──────────────────────────────
const isAuthenticated = false;

// ─── Feature card data ────────────────────────────────────────────────────────
const features = [
  {
    id: 'roadmaps',
    title: 'Career Roadmaps',
    description:
      'Follow expertly crafted, step-by-step learning paths tailored to your target role — SDE, Data Scientist, DevOps, and more.',
    icon: <Map className="w-7 h-7" />,
    gradient: 'from-green-500 to-green-600',
    lightBg: 'bg-green-50',
    lightText: 'text-green-700',
    borderHover: 'hover:border-green-300',
    cta: 'Explore Roadmaps',
    path: '/roadmaps',
  },
  {
    id: 'coding',
    title: 'Coding Practice',
    description:
      'Sharpen your DSA skills with hundreds of curated problems, a dark-theme editor, and instant feedback on your submissions.',
    icon: <Code2 className="w-7 h-7" />,
    gradient: 'from-blue-500 to-indigo-500',
    lightBg: 'bg-blue-50',
    lightText: 'text-blue-700',
    borderHover: 'hover:border-blue-300',
    cta: 'Start Practicing',
    path: '/practice',
  },
  {
    id: 'projects',
    title: 'Project Section',
    description:
      'Build real-world projects with guided walkthroughs, starter code, and portfolio-ready outcomes to impress recruiters.',
    icon: <FolderGit2 className="w-7 h-7" />,
    gradient: 'from-violet-500 to-purple-500',
    lightBg: 'bg-violet-50',
    lightText: 'text-violet-700',
    borderHover: 'hover:border-violet-300',
    cta: 'Browse Projects',
    path: '/projects',
  },
  {
    id: 'jobs',
    title: 'Job Section',
    description:
      'Discover curated job listings, company hiring patterns, CTC insights, and eligibility criteria — all in one place.',
    icon: <Briefcase className="w-7 h-7" />,
    gradient: 'from-amber-500 to-orange-500',
    lightBg: 'bg-amber-50',
    lightText: 'text-amber-700',
    borderHover: 'hover:border-amber-300',
    cta: 'Find Jobs',
    path: '/jobs',
  },
  {
    id: 'interviews',
    title: 'Mock Interviews',
    description:
      'Practice live coding rounds and HR rounds with AI-powered interviewers. Get instant feedback and confidence boosts.',
    icon: <MonitorPlay className="w-7 h-7" />,
    gradient: 'from-rose-500 to-pink-500',
    lightBg: 'bg-rose-50',
    lightText: 'text-rose-700',
    borderHover: 'hover:border-rose-300',
    cta: 'Start Mock',
    path: '/mock-interviews',
  },
  {
    id: 'ai-mentor',
    title: 'AI Mentor',
    description:
      'Chat with your personal AI mentor for code reviews, concept explanations, career advice, and 24/7 doubt resolution.',
    icon: <Bot className="w-7 h-7" />,
    gradient: 'from-cyan-500 to-sky-500',
    lightBg: 'bg-cyan-50',
    lightText: 'text-cyan-700',
    borderHover: 'hover:border-cyan-300',
    cta: 'Meet Your Mentor',
    path: '/ai-mentor',
  },
];

// ─── Animation variants ───────────────────────────────────────────────────────
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

// ─── Toast component ──────────────────────────────────────────────────────────
interface ToastProps {
  show: boolean;
  onClose: () => void;
  onLogin: () => void;
}

const AuthToast = ({ show, onClose, onLogin }: ToastProps) => (
  <AnimatePresence>
    {show && (
      <motion.div
        initial={{ opacity: 0, y: -24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -16, scale: 0.96 }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999] w-[calc(100%-2rem)] max-w-md"
      >
        <div className="flex items-start gap-3 bg-white border border-rose-200 shadow-2xl shadow-rose-100 rounded-2xl px-5 py-4">
          {/* Icon */}
          <div className="w-9 h-9 rounded-xl bg-rose-100 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Lock className="w-4 h-4 text-rose-600" />
          </div>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-rose-500 inline" />
              Login Required
            </p>
            <p className="text-xs text-slate-9000 mt-0.5 leading-relaxed">
              Please log in to access this feature. It's free and takes only a moment!
            </p>
            {/* Actions */}
            <div className="flex items-center gap-2 mt-3">
              <button
                onClick={onLogin}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-gradient-to-r from-green-600 to-green-700 text-slate-900 text-xs font-bold hover:opacity-90 transition shadow"
              >
                <LogIn className="w-3 h-3" /> Sign In Now
              </button>
              <button
                onClick={onClose}
                className="px-4 py-1.5 rounded-lg bg-slate-100 text-slate-600 text-xs font-semibold hover:bg-slate-200 transition"
              >
                Maybe Later
              </button>
            </div>
          </div>

          {/* Close */}
          <button
            onClick={onClose}
            className="text-slate-600 hover:text-slate-9000 transition flex-shrink-0 mt-0.5"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Progress bar — auto-dismiss after 4s */}
        <motion.div
          initial={{ scaleX: 1 }}
          animate={{ scaleX: 0 }}
          transition={{ duration: 4, ease: 'linear' }}
          style={{ originX: 0 }}
          className="h-1 bg-gradient-to-r from-green-500 to-green-400 rounded-full mt-1.5 mx-1"
        />
      </motion.div>
    )}
  </AnimatePresence>
);

// ═════════════════════════════════════════════════════════════════════════════
export const Explore = () => {
  const navigate = useNavigate();
  const [showToast, setShowToast]       = useState(false);
  const [toastTimer, setToastTimer]     = useState<ReturnType<typeof setTimeout> | null>(null);

  // Auto-dismiss toast after 4 seconds
  useEffect(() => {
    if (showToast) {
      const t = setTimeout(() => {
        setShowToast(false);
      }, 4200);
      setToastTimer(t);
      return () => clearTimeout(t);
    }
  }, [showToast]);
  
  const handleFeatureClick = (path: string) => {
    if (isAuthenticated) {
      navigate(path);
    } else {
      // Cancel any pending dismiss timer and re-show toast
      if (toastTimer) clearTimeout(toastTimer);
      setShowToast(false);
      // Small timeout to re-trigger enter animation if already visible
      setTimeout(() => setShowToast(true), 50);
    }
  };

  const handleLoginRedirect = () => {
    setShowToast(false);
    navigate('/login');
  };

  const handleDashboardClick = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      if (toastTimer) clearTimeout(toastTimer);
      setShowToast(false);
      setTimeout(() => setShowToast(true), 50);
    }
  };

  return (
    <MainLayout>
      {/* ── Auth Toast ── */}
      <AuthToast
        show={showToast}
        onClose={() => setShowToast(false)}
        onLogin={handleLoginRedirect}
      />

      <div className="min-h-screen bg-slate-50">

        {/* ── Hero strip ── */}
        <div className="relative overflow-hidden bg-white border-b border-slate-100">
          {/* Background blobs */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-green-100/60 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-blue-100/50 blur-3xl" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 relative">
            {/* Back link */}
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-9000 hover:text-green-600 transition mb-8"
            >
              <ChevronLeft className="w-4 h-4" /> Back to Home
            </button>

            <div className="text-center max-w-3xl mx-auto">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-800 text-sm font-semibold mb-6 border border-green-200 shadow-sm"
              >
                <Sparkles className="w-4 h-4 text-green-600" />
                Everything you need to get hired
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight mb-5"
              >
                Explore{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-500">
                  PrepForge
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.12 }}
                className="text-lg text-slate-600 leading-relaxed"
              >
                Six powerful modules — one platform. Pick where you want to begin
                and unlock your full potential.
              </motion.p>

              {/* Auth nudge banner */}
              {!isAuthenticated && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="inline-flex items-center gap-2 mt-6 px-4 py-2 rounded-full bg-amber-50 text-amber-700 text-xs font-semibold border border-amber-200"
                >
                  <Lock className="w-3.5 h-3.5" />
                  Sign in to unlock all features — it's free!
                  <button
                    onClick={() => navigate('/login')}
                    className="underline underline-offset-2 hover:text-amber-900 transition"
                  >
                    Sign In
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* ── Cards grid ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((f) => (
              <motion.div
                key={f.id}
                variants={cardVariant}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className={`group relative bg-white rounded-2xl border-2 border-slate-100 ${f.borderHover} shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col`}
              >
                {/* Top gradient bar */}
                <div className={`h-1.5 w-full bg-gradient-to-r ${f.gradient}`} />

                {/* Lock badge for unauthenticated */}
                {!isAuthenticated && (
                  <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold border border-slate-200">
                    <Lock className="w-2.5 h-2.5" /> Login to unlock
                  </div>
                )}

                <div className="p-7 flex flex-col flex-1">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl ${f.lightBg} flex items-center justify-center mb-5 ${f.lightText} shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                    {f.icon}
                  </div>

                  {/* Text */}
                  <h2 className="text-xl font-bold text-slate-900 mb-2">{f.title}</h2>
                  <p className="text-slate-9000 text-sm leading-relaxed flex-1">{f.description}</p>

                  {/* CTA */}
                  <button
                    onClick={() => handleFeatureClick(f.path)}
                    className={`mt-6 w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r ${f.gradient} text-slate-900 text-sm font-bold shadow hover:shadow-lg hover:opacity-90 transition-all group/btn`}
                  >
                    {!isAuthenticated && <Lock className="w-3.5 h-3.5 opacity-80" />}
                    {f.cta}
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom CTA strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-16 text-center"
          >
            <p className="text-slate-9000 text-sm mb-4">Ready to track your progress?</p>
            <button
              onClick={handleDashboardClick}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white text-slate-900 font-semibold hover:bg-slate-100 hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              Go to Dashboard <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
};

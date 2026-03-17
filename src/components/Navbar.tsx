import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <header className="fixed top-0 w-full bg-white/80 dark:bg-slate-950/80 backdrop-blur-md z-sticky border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-forest-green to-emerald-500">
            PrepForge
          </Link>
        </div>
        <nav className="hidden md:flex gap-6">
          <a href="#features" className="text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 font-medium transition-colors">Features</a>
          <a href="#curriculum" className="text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 font-medium transition-colors">Curriculum</a>
        </nav>
        <div>
          <Link to="/login" className="px-5 py-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50 hover:bg-emerald-600 dark:hover:bg-emerald-600 hover:text-white dark:hover:text-white transition-all font-semibold shadow-sm">
            Login
          </Link>
        </div>
      </div>
    </header>
  );
};

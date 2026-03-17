import { Link, useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-sticky border-b border-slate-200 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-sm">P</span>
          </div>
          <Link
            to="/"
            className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 tracking-tight"
          >
            PrepForge
          </Link>
        </div>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-7">
          <a
            href="#features"
            className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors"
          >
            Features
          </a>
          <a
            href="#curriculum"
            className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors"
          >
            Curriculum
          </a>
          <button
            onClick={() => navigate('/explore')}
            className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors"
          >
            Explore
          </button>
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="px-5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold transition-all shadow-sm hover:shadow-md"
          >
            Login
          </Link>
        </div>
      </div>
    </header>
  );
};

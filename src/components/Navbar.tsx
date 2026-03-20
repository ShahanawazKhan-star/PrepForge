import { Link } from 'react-router-dom';
import { Code2, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Roadmaps', path: '/roadmaps' },
    { name: 'Practice', path: '/coding-practice' },
    { name: 'Projects', path: '/projects' },
  ];

  return (
    <nav className="border-b border-slate-200 bg-white sticky top-0 z-[100]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* Stylish Logo section */}
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-emerald-600 p-1.5 rounded-lg shadow-sm">
              <Code2 className="w-5 h-5 text-white stroke-[2.5]" />
            </div>
            <span className="text-2xl font-extrabold text-slate-900 tracking-tight">
              PrepForge
            </span>
          </Link>

          {/* Desktop Middle Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                className="text-sm font-bold text-slate-600 hover:text-emerald-600 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Buttons - Desktop */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/login" className="text-sm font-bold text-slate-600 hover:text-emerald-600 transition-colors px-3 py-2">
              Login
            </Link>
            <Link to="/signup" className="bg-emerald-600 text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-emerald-700 transition-colors shadow-sm focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1">
              Sign up
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 focus:outline-none rounded-lg hover:bg-slate-100 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Wrapper */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 shadow-lg absolute w-full left-0 z-[90]">
          <div className="px-4 pt-2 pb-5 space-y-1 flex flex-col">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-3 text-base font-bold text-slate-700 hover:text-emerald-600 flex-1 hover:bg-emerald-50 rounded-xl transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <div className="border-t border-slate-100 my-3 pt-3 flex flex-col gap-3 px-3">
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="block text-center w-full bg-slate-100 text-slate-700 px-4 py-3 rounded-xl font-extrabold hover:bg-slate-200 transition-colors">
                Login
              </Link>
              <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)} className="block text-center w-full bg-emerald-600 text-white px-4 py-3 rounded-xl font-extrabold hover:bg-emerald-700 transition-colors shadow-sm">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

import { Link } from 'react-router-dom';
import { Code2, Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-12 px-4 sm:px-6 lg:px-8 mt-auto w-full">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4">
        
        {/* Logo and Copyright */}
        <div className="flex flex-col items-center md:items-start space-y-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-emerald-600 p-1.5 rounded-lg shadow-sm">
              <Code2 className="w-5 h-5 text-white stroke-[2.5]" />
            </div>
            <span className="text-2xl font-extrabold text-white tracking-tight">
              PrepForge
            </span>
          </Link>
          <p className="text-slate-400 text-sm font-medium">
            © {new Date().getFullYear()} PrepForge. All rights reserved.
          </p>
        </div>

        {/* Links */}
        <nav className="flex flex-wrap justify-center gap-6">
          <Link to="#" className="text-sm font-bold text-slate-300 hover:text-emerald-400 transition-colors">
            About Us
          </Link>
          <Link to="#" className="text-sm font-bold text-slate-300 hover:text-emerald-400 transition-colors">
            Contact
          </Link>
          <Link to="#" className="text-sm font-bold text-slate-300 hover:text-emerald-400 transition-colors">
            Privacy Policy
          </Link>
        </nav>

        {/* Social Icons */}
        <div className="flex gap-4">
          <a href="#" className="p-2.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-all shadow-sm" aria-label="GitHub">
            <Github className="w-5 h-5" />
          </a>
          <a href="#" className="p-2.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-all shadow-sm" aria-label="Twitter">
            <Twitter className="w-5 h-5" />
          </a>
          <a href="#" className="p-2.5 text-slate-400 hover:text-white hover:bg-blue-600 rounded-xl transition-all shadow-sm" aria-label="LinkedIn">
            <Linkedin className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

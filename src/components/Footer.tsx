import { Link } from 'react-router-dom';
import { Code2, Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200 py-10 px-4 sm:px-6 lg:px-8 mt-auto w-full">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4">
        
        {/* Logo and Copyright */}
        <div className="flex flex-col items-center md:items-start space-y-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-emerald-600 p-1.5 rounded-lg shadow-sm">
              <Code2 className="w-4 h-4 text-slate-900 stroke-[2.5]" />
            </div>
            <span className="text-lg font-extrabold text-slate-900 tracking-tight">
              PrepForge
            </span>
          </Link>
          <p className="text-slate-600 text-xs font-medium">
            © {new Date().getFullYear()} PrepForge. All rights reserved.
          </p>
        </div>

        {/* Links */}
        <nav className="flex flex-wrap justify-center gap-6">
          <Link to="#" className="text-[13px] font-semibold text-slate-600 hover:text-emerald-400 transition-colors">
            About Us
          </Link>
          <Link to="#" className="text-[13px] font-semibold text-slate-600 hover:text-emerald-400 transition-colors">
            Contact
          </Link>
          <Link to="#" className="text-[13px] font-semibold text-slate-600 hover:text-emerald-400 transition-colors">
            Privacy Policy
          </Link>
        </nav>

        {/* Social Icons */}
        <div className="flex gap-3">
          <a href="#" className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all shadow-sm" aria-label="GitHub">
            <Github className="w-4 h-4" />
          </a>
          <a href="#" className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all shadow-sm" aria-label="Twitter">
            <Twitter className="w-4 h-4" />
          </a>
          <a href="#" className="p-2 text-slate-600 hover:text-slate-900 hover:bg-blue-600 rounded-lg transition-all shadow-sm" aria-label="LinkedIn">
            <Linkedin className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

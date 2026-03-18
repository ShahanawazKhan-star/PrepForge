import { Link } from 'react-router-dom';
import { Code2 } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="border-b border-slate-200 bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* Stylish Logo section */}
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-green-600 p-1.5 rounded-lg shadow-sm">
              <Code2 className="w-5 h-5 text-white stroke-[2.5]" />
            </div>
            <span className="text-2xl font-extrabold text-slate-900 tracking-tight">
              PrepForge
            </span>
          </Link>

          {/* Sign up Button */}
          <div className="flex items-center gap-4">
            <Link to="/explore" className="hidden sm:block text-slate-600 hover:text-green-600 font-medium transition-colors">
              Explore
            </Link>
            <Link to="/login" className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors shadow-sm">
              Sign up
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;

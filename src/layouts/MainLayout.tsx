import { ReactNode } from 'react';

export const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-sticky border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-forest-green to-emerald-500">
              PrepForge
            </span>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#features" className="text-slate-600 hover:text-emerald-700 font-medium transition-colors">Features</a>
            <a href="#curriculum" className="text-slate-600 hover:text-emerald-700 font-medium transition-colors">Curriculum</a>
          </nav>
          <div>
            <button className="px-4 py-2 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-600 hover:text-white transition-all font-semibold shadow-sm">
              Login
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow pt-16">
        {children}
      </main>
    </div>
  );
};

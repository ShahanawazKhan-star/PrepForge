import type { ReactNode } from 'react';
import { Navbar } from '../components/Navbar';

export const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-16">  
        {children}
      </main>
    </div>
  );
};

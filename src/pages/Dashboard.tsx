import { MainLayout } from '../layouts/MainLayout';

export const Dashboard = () => {
  return (
    <MainLayout>
      <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-8 text-center text-slate-900 dark:text-white relative z-base">
        <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
        <p className="text-slate-600 dark:text-slate-400">Welcome to your PrepForge dashboard. Your journey begins here.</p>
      </div>
    </MainLayout>
  );
};

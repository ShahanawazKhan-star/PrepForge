import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Briefcase } from 'lucide-react';

const Jobs = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-slate-900 border-t border-slate-100 p-4">
      <div className="text-center max-w-md w-full">
        <div className="w-20 h-20 bg-green-50 rounded-3xl flex items-center justify-center mx-auto mb-8 animate-bounce">
          <Briefcase className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-4xl font-extrabold mb-4 tracking-tight">Job Section</h1>
        <p className="text-lg text-slate-9000 mb-10 leading-relaxed">
          Connecting you with top tech companies and exclusive job opportunities soon.
        </p>
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 px-8 py-4 bg-white text-slate-900 rounded-2xl font-bold text-lg hover:bg-slate-100 transition-all shadow-xl hover:shadow-slate-200 mx-auto"
        >
          <ArrowLeft className="w-5 h-5" /> Back to Home
        </button>
      </div>
    </div>
  );
};

export default Jobs;

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Code } from 'lucide-react';

const Coding = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-slate-900 border-t border-slate-100 p-4">
      <div className="text-center max-w-md w-full">
        <div className="w-20 h-20 bg-green-50 rounded-3xl flex items-center justify-center mx-auto mb-8 animate-bounce">
          <Code className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-4xl font-extrabold mb-4 tracking-tight">Coding Practice</h1>
        <p className="text-lg text-slate-500 mb-10 leading-relaxed">
          Master DSA and problem-solving with our upcoming interactive coding playground.
        </p>
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all shadow-xl hover:shadow-slate-200 mx-auto"
        >
          <ArrowLeft className="w-5 h-5" /> Back to Home
        </button>
      </div>
    </div>
  );
};

export default Coding;

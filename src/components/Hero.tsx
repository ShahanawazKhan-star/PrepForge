import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden bg-slate-50 pt-32 pb-40 lg:pt-48 lg:pb-56 z-base transition-colors duration-300">

      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-green-100/50 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-4xl mx-auto">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100 text-green-700 text-xs sm:text-sm font-bold mb-10 border border-green-200 shadow-sm"
          >
            <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            PrepForge platform is now live!
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight mb-8 leading-tight"
          >
            From{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-500">
              Beginner
            </span>{' '}
            to Job Ready
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base md:text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            The only platform you need to master coding, build real-world projects, and ace your technical interviews.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4"
          >
            <button
              onClick={() => navigate('/roadmaps')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-green-600 text-white font-bold text-base hover:bg-green-700 hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group shadow-sm shadow-green-200"
            >
              Start Your Journey
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => navigate('/explore')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-slate-900 font-bold text-base border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all shadow-sm"
            >
              Explore Roadmaps
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-20 pt-10 border-t border-slate-200 flex flex-wrap justify-center gap-12"
          >
            {[
              { label: 'Curated Roadmaps', value: '50+' },
              { label: 'Active Students', value: '10k+' },
              { label: 'Success Rate', value: '94%' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-extrabold text-slate-900 mb-1">{stat.value}</p>
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

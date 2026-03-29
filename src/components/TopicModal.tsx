import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, PenTool, Layout, Link as LinkIcon, Play, Code2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface TopicModalProps {
  isOpen: boolean;
  onClose: () => void;
  topicName: string;
}

// Helper to generate mock content based on topic name
const getMockData = (topic: string) => {
  return {
    description: `Master the core concepts of ${topic}. This comprehensive module covers everything from basic fundamentals to advanced implementation patterns.`,
    topicsToLearn: [
      `Introduction to ${topic}`,
      `Core Architecture & Ecosystem`,
      `Best Practices and Patterns`,
      `Performance Optimization`,
    ],
    practiceQuestions: [
      `How does ${topic} handle state management?`,
      `Explain the lifecycle hooks associated with ${topic}.`,
      `What are the security implications of using ${topic}?`,
    ],
    projects: [
      `Build a basic application using ${topic}`,
      `Integrate ${topic} with a REST API`,
    ],
    resources: [
      { name: 'Official Documentation', url: '#' },
      { name: 'Community Guidelines', url: '#' },
      { name: 'Interactive Tutorial', url: '#' },
    ]
  };
};

export default function TopicModal({ isOpen, onClose, topicName }: TopicModalProps) {
  const navigate = useNavigate();
  const data = getMockData(topicName);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto w-full">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40"
        />

        {/* Modal Content */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl z-50 overflow-hidden border border-slate-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-slate-50 border-b border-slate-200 px-6 py-5 flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                <Code2 className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">{topicName}</h2>
                <p className="text-slate-500 text-sm font-medium mt-1">Topic Detail Module</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 md:p-8 max-h-[60vh] overflow-y-auto custom-scrollbar">
            <p className="text-slate-600 leading-relaxed mb-8 text-lg">
              {data.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Topics to Learn */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-emerald-500" />
                  Concepts to Learn
                </h3>
                <ul className="space-y-3">
                  {data.topicsToLearn.map((item, i) => (
                    <li key={i} className="text-slate-600 text-sm flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Practice Questions */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <PenTool className="w-5 h-5 text-emerald-500" />
                  Practice Questions
                </h3>
                <ul className="space-y-3">
                  {data.practiceQuestions.map((item, i) => (
                    <li key={i} className="text-slate-600 text-sm flex items-start gap-2">
                      <span className="text-emerald-500 font-bold shrink-0">Q.</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Projects */}
              <div>
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Layout className="w-5 h-5 text-emerald-500" />
                  Hands-on Projects
                </h3>
                <div className="space-y-3">
                  {data.projects.map((proj, i) => (
                    <div key={i} className="flex items-center gap-3 bg-white border border-slate-200 p-3 rounded-xl shadow-sm">
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                        <Play className="w-3.5 h-3.5 text-emerald-600" />
                      </div>
                      <span className="text-sm font-medium text-slate-700">{proj}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resources */}
              <div>
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <LinkIcon className="w-5 h-5 text-emerald-500" />
                  Helpful Resources
                </h3>
                <div className="space-y-3">
                  {data.resources.map((res, i) => (
                    <a key={i} href={res.url} onClick={(e) => e.preventDefault()} className="flex items-center gap-3 bg-white border border-slate-200 p-3 rounded-xl shadow-sm hover:border-emerald-300 hover:shadow-md transition-all group">
                      <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0 group-hover:bg-emerald-50 transition-colors">
                        <LinkIcon className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-500" />
                      </div>
                      <span className="text-sm font-medium text-slate-600 group-hover:text-emerald-600 transition-colors">{res.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-slate-50 border-t border-slate-200 px-6 py-5 flex items-center justify-between">
            <button 
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-200 transition-colors"
            >
              Close
            </button>
            <button 
              onClick={() => {
                onClose();
                navigate('/practice');
              }}
              className="px-8 py-2.5 rounded-xl text-sm font-bold bg-emerald-600 text-white hover:bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] transition-all flex items-center gap-2"
            >
              <Play className="w-4 h-4" />
              Start Learning
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

import { motion } from 'framer-motion';
import { 
  Map, 
  Code2, 
  FolderGit2, 
  Briefcase, 
  MonitorPlay, 
  Bot, 
  ArrowRight 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const features = [
  {
    id: 'roadmaps',
    title: 'Career Roadmaps',
    description: 'Expertly crafted step-by-step learning paths for SDE, Data Scientist, and DevOps roles.',
    icon: <Map className="w-6 h-6" />,
    color: 'green',
    path: '/roadmaps'
  },
  {
    id: 'coding',
    title: 'Coding Practice',
    description: 'Hundreds of curated problems with an integrated editor and instant feedback.',
    icon: <Code2 className="w-6 h-6" />,
    color: 'blue',
    path: '/practice'
  },
  {
    id: 'projects',
    title: 'Project Section',
    description: 'Build real-world projects with guided walkthroughs and starter code.',
    icon: <FolderGit2 className="w-6 h-6" />,
    color: 'violet',
    path: '/projects'
  },
  {
    id: 'jobs',
    title: 'Job Section',
    description: 'Discover curated job listings, CTC insights, and company hiring patterns.',
    icon: <Briefcase className="w-6 h-6" />,
    color: 'amber',
    path: '/jobs'
  },
  {
    id: 'interviews',
    title: 'Mock Interviews',
    description: 'Practice live coding and HR rounds with AI-powered interviewers.',
    icon: <MonitorPlay className="w-6 h-6" />,
    color: 'rose',
    path: '/mock-interviews'
  },
  {
    id: 'ai-mentor',
    title: 'AI Mentor',
    description: '24/7 support for code reviews, concept explanations, and career advice.',
    icon: <Bot className="w-6 h-6" />,
    color: 'cyan',
    path: '/ai-mentor'
  }
];

export const PreviewGrid = () => {
  const navigate = useNavigate();

  const colorMap: Record<string, string> = {
    green: 'bg-green-50 text-green-600 border-green-100 group-hover:border-green-300',
    blue: 'bg-blue-50 text-blue-600 border-blue-100 group-hover:border-blue-300',
    violet: 'bg-violet-50 text-violet-600 border-violet-100 group-hover:border-violet-300',
    amber: 'bg-amber-50 text-amber-600 border-amber-100 group-hover:border-amber-300',
    rose: 'bg-rose-50 text-rose-600 border-rose-100 group-hover:border-rose-300',
    cyan: 'bg-cyan-50 text-cyan-600 border-cyan-100 group-hover:border-cyan-300',
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Pick Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-500">Learning Path</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Everything you need to master coding, build real-world projects, and ace your technical interviews.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              onClick={() => navigate(feature.path)}
              className={`group p-8 rounded-2xl border-2 bg-white ${colorMap[feature.color].split(' ').slice(2).join(' ')} border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer flex flex-col`}
            >
              <div className={`w-14 h-14 rounded-xl ${colorMap[feature.color].split(' ').slice(0, 2).join(' ')} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-1">
                {feature.description}
              </p>
              <div className="flex items-center text-sm font-bold text-slate-900 group-hover:text-green-600 transition-colors">
                Explore Now <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

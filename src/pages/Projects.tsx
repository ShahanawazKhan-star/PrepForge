import { useState } from 'react';
import {
  Terminal,
  Layout,
  ShoppingCart,
  CloudSun,
  ChevronRight,
  Code2,
  Landmark,
  Package,
  LineChart,
  Gamepad2,
  MessageSquare,
  Sparkles,
  CheckSquare,
  FileText,
  X,
  Layers
} from 'lucide-react';
import Footer from '../components/Footer';

interface Project {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
  icon: React.ElementType;
}

const projects: Project[] = [
  {
    id: 'endless-runner',
    title: 'Endless Runner Game',
    description: 'Build a 3D endless runner game with procedural generation and obstacle avoidance mechanics.',
    difficulty: 'Hard',
    tags: ['Unity', 'C#', '3D Math'],
    icon: Terminal
  },
  {
    id: 'ecommerce-api',
    title: 'E-commerce API',
    description: 'Develop a robust RESTful API for an online store with authentication and state management.',
    difficulty: 'Medium',
    tags: ['Node.js', 'Express', 'MongoDB'],
    icon: ShoppingCart
  },
  {
    id: 'weather-dashboard',
    title: 'Weather Dashboard',
    description: 'Create a dynamic weather app that fetches atmospheric data from external APIs.',
    difficulty: 'Easy',
    tags: ['React', 'Tailwind', 'REST API'],
    icon: CloudSun
  },
  {
    id: 'portfolio-site',
    title: 'Portfolio Website',
    description: 'Design a responsive personal portfolio to showcase your skills, resume, and contact info.',
    difficulty: 'Easy',
    tags: ['HTML5', 'CSS3', 'JavaScript'],
    icon: Layout
  },
  {
    id: 'banking-api',
    title: 'Spring Boot Banking API',
    description: 'A secure financial transaction API featuring JWT auth, role-based access, and money transfers.',
    difficulty: 'Hard',
    tags: ['Java', 'Spring Boot', 'PostgreSQL'],
    icon: Landmark
  },
  {
    id: 'inventory-system',
    title: 'Java Inventory System',
    description: 'Manage warehouse stock, track orders, and generate reports using a robust Java backend.',
    difficulty: 'Medium',
    tags: ['Java', 'Spring MVC', 'MySQL'],
    icon: Package
  },
  {
    id: 'react-dashboard',
    title: 'Analytics Dashboard',
    description: 'Build a complex admin dashboard featuring real-time data visualization and interactive widgets.',
    difficulty: 'Hard',
    tags: ['React', 'Recharts', 'Tailwind'],
    icon: LineChart
  },
  {
    id: '2d-platformer',
    title: '2D Pixel Platformer',
    description: 'Create a retro-style platform game with physics, enemy AI, and parallax scrolling.',
    difficulty: 'Medium',
    tags: ['Godot', 'GDScript', 'Pixel Art'],
    icon: Gamepad2
  },
  {
    id: 'real-time-chat',
    title: 'Real-Time Chat App',
    description: 'Develop a full-stack chat application with live messaging, typing indicators, and online status.',
    difficulty: 'Medium',
    tags: ['React', 'Firebase', 'Socket.io'],
    icon: MessageSquare
  },
  {
    id: 'ai-image-ui',
    title: 'AI Image Generator UI',
    description: 'Design a sleek, futuristic interface connecting to OpenAI\'s DALL-E to generate custom images.',
    difficulty: 'Hard',
    tags: ['Next.js', 'OpenAI API', 'Tailwind'],
    icon: Sparkles
  },
  {
    id: 'task-board',
    title: 'Kanban Task Board',
    description: 'Implement a drag-and-drop task management board perfect for tracking team productivity.',
    difficulty: 'Medium',
    tags: ['React', 'Zustand', 'DnD'],
    icon: CheckSquare
  },
  {
    id: 'markdown-blog',
    title: 'Markdown Developer Blog',
    description: 'A lightning-fast static blog platform where posts are written purely in markdown files.',
    difficulty: 'Easy',
    tags: ['React', 'MDX', 'Tailwind'],
    icon: FileText
  }
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'Easy': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
      case 'Medium': return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
      case 'Hard': return 'text-rose-400 bg-rose-400/10 border-rose-400/20';
      default: return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col pt-16 font-sans antialiased selection:bg-emerald-500/30">
      <div className="flex-grow max-w-7xl mx-auto px-6 py-16 w-full">
        {/* Header Section */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
            <Code2 className="w-4 h-4" />
            <span>Project Library</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Available Projects
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
            Select a project and begin your development journey. Each project is engineered to bridge the gap between theory and technical mastery.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project) => {
            const Icon = project.icon;

            return (
              <div
                key={project.id}
                className="group relative bg-slate-900 overflow-hidden rounded-2xl border border-slate-800 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.15)] flex flex-col"
              >
                {/* Subtle Background Glow */}
                <div className="absolute top-0 right-0 p-32 bg-emerald-500/5 rounded-full blur-[100px] -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                <div className="p-8 flex flex-col flex-grow relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 bg-slate-800/50 rounded-xl border border-slate-700/50 text-slate-300 group-hover:text-emerald-400 group-hover:bg-emerald-500/10 transition-colors duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getDifficultyColor(project.difficulty)}`}>
                      {project.difficulty.toUpperCase()}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-slate-100 mb-3 group-hover:text-white transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-slate-400 leading-relaxed mb-8 flex-grow">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 text-xs font-medium bg-slate-800 text-slate-300 rounded-lg border border-slate-700/50">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => setSelectedProject(project)}
                    className="flex items-center justify-between w-full py-3 px-4 bg-slate-800 hover:bg-emerald-500 text-slate-300 hover:text-slate-950 font-semibold rounded-xl transition-all duration-300 group/btn border border-slate-700 hover:border-transparent"
                  >
                    <span>View Details</span>
                    <ChevronRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal Overlay */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-slate-900 border border-slate-700 rounded-2xl p-6 max-w-2xl w-full mx-4 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4 pr-10">
              <div className="p-3 bg-slate-800 rounded-xl border border-slate-700 text-emerald-400 flex-shrink-0">
                <selectedProject.icon className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-white">{selectedProject.title}</h2>
            </div>

            <p className="text-slate-400 text-lg mb-6 leading-relaxed">
              {selectedProject.description}
            </p>

            <div className="mb-8">
              <h3 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4" />
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedProject.tags.map((tag: string) => (
                  <span key={tag} className="px-3 py-1 text-sm font-medium bg-slate-800 text-slate-300 rounded-lg border border-slate-700/50">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <CheckSquare className="w-4 h-4" />
                Features to Build
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start text-slate-300">
                  <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 mr-3"></div>
                  <span>Implement core functionality and setup the base architecture.</span>
                </li>
                <li className="flex items-start text-slate-300">
                  <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 mr-3"></div>
                  <span>Integrate strictly requested technologies and state management.</span>
                </li>
                <li className="flex items-start text-slate-300">
                  <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 mr-3"></div>
                  <span>Ensure a highly polished, responsive UI across all devices.</span>
                </li>
                <li className="flex items-start text-slate-300">
                  <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 mr-3"></div>
                  <span>Add robust deployment configurations and optimize performance.</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => setSelectedProject(null)}
              className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition-colors"
            >
              Start Building Now
            </button>
          </div>
        </div>
      )}

      {/* Footer Wrapper - explicitly coloring child elements to match dark theme if needed */}
      <div className="border-t border-slate-800/50 bg-slate-950">
        <div className="opacity-80">
          <Footer />
        </div>
      </div>
    </div>
  );
}

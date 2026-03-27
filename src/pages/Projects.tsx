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
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
  icon: React.ElementType;
}

const projects: Project[] = [
  {
    id: 'endless-runner',
    title: 'Endless Runner Game',
    description: 'Build a 3D endless runner game with procedural generation and obstacle avoidance mechanics.',
    difficulty: 'Advanced',
    tags: ['Unity', 'C#', '3D Math'],
    icon: Terminal
  },
  {
    id: 'ecommerce-api',
    title: 'E-commerce API',
    description: 'Develop a robust RESTful API for an online store with authentication and state management.',
    difficulty: 'Intermediate',
    tags: ['Node.js', 'Express', 'MongoDB'],
    icon: ShoppingCart
  },
  {
    id: 'weather-dashboard',
    title: 'Weather Dashboard',
    description: 'Create a dynamic weather app that fetches atmospheric data from external APIs.',
    difficulty: 'Beginner',
    tags: ['React', 'Tailwind', 'REST API'],
    icon: CloudSun
  },
  {
    id: 'portfolio-site',
    title: 'Portfolio Website',
    description: 'Design a responsive personal portfolio to showcase your skills, resume, and contact info.',
    difficulty: 'Beginner',
    tags: ['HTML5', 'CSS3', 'JavaScript'],
    icon: Layout
  },
  {
    id: 'banking-api',
    title: 'Spring Boot Banking API',
    description: 'A secure financial transaction API featuring JWT auth, role-based access, and money transfers.',
    difficulty: 'Advanced',
    tags: ['Java', 'Spring Boot', 'PostgreSQL'],
    icon: Landmark
  },
  {
    id: 'inventory-system',
    title: 'Java Inventory System',
    description: 'Manage warehouse stock, track orders, and generate reports using a robust Java backend.',
    difficulty: 'Intermediate',
    tags: ['Java', 'Spring MVC', 'MySQL'],
    icon: Package
  },
  {
    id: 'react-dashboard',
    title: 'Analytics Dashboard',
    description: 'Build a complex admin dashboard featuring real-time data visualization and interactive widgets.',
    difficulty: 'Advanced',
    tags: ['React', 'Recharts', 'Tailwind'],
    icon: LineChart
  },
  {
    id: '2d-platformer',
    title: '2D Pixel Platformer',
    description: 'Create a retro-style platform game with physics, enemy AI, and parallax scrolling.',
    difficulty: 'Intermediate',
    tags: ['Godot', 'GDScript', 'Pixel Art'],
    icon: Gamepad2
  },
  {
    id: 'real-time-chat',
    title: 'Real-Time Chat App',
    description: 'Develop a full-stack chat application with live messaging, typing indicators, and online status.',
    difficulty: 'Intermediate',
    tags: ['React', 'Firebase', 'Socket.io'],
    icon: MessageSquare
  },
  {
    id: 'ai-image-ui',
    title: 'AI Image Generator UI',
    description: 'Design a sleek, futuristic interface connecting to OpenAI\'s DALL-E to generate custom images.',
    difficulty: 'Advanced',
    tags: ['Next.js', 'OpenAI API', 'Tailwind'],
    icon: Sparkles
  },
  {
    id: 'task-board',
    title: 'Kanban Task Board',
    description: 'Implement a drag-and-drop task management board perfect for tracking team productivity.',
    difficulty: 'Intermediate',
    tags: ['React', 'Zustand', 'DnD'],
    icon: CheckSquare
  },
  {
    id: 'markdown-blog',
    title: 'Markdown Developer Blog',
    description: 'A lightning-fast static blog platform where posts are written purely in markdown files.',
    difficulty: 'Beginner',
    tags: ['React', 'MDX', 'Tailwind'],
    icon: FileText
  }
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const getDifficultyPill = (level: string) => {
    switch (level) {
      case 'Beginner': return 'text-blue-700 bg-blue-50 border-blue-200';
      case 'Intermediate': return 'text-orange-700 bg-orange-50 border-orange-200';
      case 'Advanced': return 'text-purple-700 bg-purple-50 border-purple-200';
      default: return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  const getCardTopBorder = (level: string) => {
    switch (level) {
      case 'Beginner': return 'border-t-[5px] border-t-blue-500';
      case 'Intermediate': return 'border-t-[5px] border-t-orange-500';
      case 'Advanced': return 'border-t-[5px] border-t-purple-500';
      default: return 'border-t-[5px] border-t-slate-500';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col pt-16 font-sans antialiased selection:bg-emerald-500/30">
      <div className="flex-grow max-w-7xl mx-auto px-6 py-16 w-full">
        {/* Header Section */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 text-sm font-bold mb-6">
            <Code2 className="w-4 h-4" />
            <span>Project Library</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Available Projects
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl leading-relaxed font-medium">
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
                className={`group relative bg-white overflow-hidden rounded-2xl border-x border-b border-slate-200 ${getCardTopBorder(project.difficulty)} hover:shadow-lg transition-shadow duration-300 flex flex-col`}
              >
                <div className="p-8 flex flex-col flex-grow relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-slate-500 group-hover:text-emerald-600 group-hover:bg-emerald-50 transition-colors duration-300 shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`px-3 py-1 text-xs font-bold rounded-full border ${getDifficultyPill(project.difficulty)}`}>
                      {project.difficulty.toUpperCase()}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-emerald-700 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-slate-600 leading-relaxed mb-8 flex-grow font-medium">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 text-xs font-bold bg-slate-100 text-slate-600 rounded-lg border border-slate-200">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => setSelectedProject(project)}
                    className="flex items-center justify-between w-full py-3 px-4 bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 font-bold rounded-xl transition-all duration-300 group/btn border border-slate-200 hover:border-emerald-200 shadow-sm"
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-white border border-slate-200 rounded-2xl p-6 max-w-2xl w-full mx-4 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors border border-transparent hover:border-slate-200"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4 pr-10">
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-emerald-600 flex-shrink-0 shadow-sm">
                <selectedProject.icon className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">{selectedProject.title}</h2>
            </div>

            <p className="text-slate-600 text-lg mb-6 leading-relaxed font-medium">
              {selectedProject.description}
            </p>

            <div className="mb-8">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-500" />
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedProject.tags.map((tag: string) => (
                  <span key={tag} className="px-3 py-1 text-sm font-bold bg-slate-100 text-slate-700 rounded-lg border border-slate-200">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-emerald-500" />
                Features to Build
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start text-slate-600 font-medium">
                  <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 mr-3"></div>
                  <span>Implement core functionality and setup the base architecture.</span>
                </li>
                <li className="flex items-start text-slate-600 font-medium">
                  <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 mr-3"></div>
                  <span>Integrate strictly requested technologies and state management.</span>
                </li>
                <li className="flex items-start text-slate-600 font-medium">
                  <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 mr-3"></div>
                  <span>Ensure a highly polished, responsive UI across all devices.</span>
                </li>
                <li className="flex items-start text-slate-600 font-medium">
                  <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 mr-3"></div>
                  <span>Add robust deployment configurations and optimize performance.</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => setSelectedProject(null)}
              className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg translate-y-0 hover:-translate-y-0.5"
            >
              Start Building Now
            </button>
          </div>
        </div>
      )}

      {/* Footer Wrapper */}
      <div className="border-t border-slate-200 bg-white">
        <Footer />
      </div>
    </div>
  );
}
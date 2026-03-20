import { useState } from 'react';
import { Folder, Clock, Layers, X } from 'lucide-react';

type ProjectLevel = 'Beginner' | 'Intermediate' | 'Advanced';

interface Project {
  id: number;
  title: string;
  description: string;
  level: ProjectLevel;
  techStack: string[];
  duration: string;
  features: string[];
}

const projectsData: Project[] = [
  {
    id: 1,
    title: "Personal Portfolio",
    description: "A responsive personal portfolio website to showcase your skills and projects.",
    level: "Beginner",
    techStack: ["React", "Tailwind", "HTML"],
    duration: "1 Week",
    features: ["Responsive Grid Layout", "Dark Mode Toggle", "Contact Form", "Smooth Scrolling Links"]
  },
  {
    id: 2,
    title: "To-Do List App",
    description: "A simple task management application with local storage persistence.",
    level: "Beginner",
    techStack: ["React", "CSS", "LocalStorage"],
    duration: "1 Week",
    features: ["Add, Edit, Delete Tasks", "Filter Active/Completed", "Persistent Storage", "Clear All Button"]
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description: "Display current weather and forecast using a public weather API.",
    level: "Beginner",
    techStack: ["JavaScript", "API", "HTML"],
    duration: "1 Week",
    features: ["Fetch API Data", "Search by City", "5-Day Forecast", "Dynamic Backgrounds"]
  },
  {
    id: 4,
    title: "Expense Tracker",
    description: "Keep track of daily expenses and income with simple visual charts.",
    level: "Beginner",
    techStack: ["React", "Context API"],
    duration: "2 Weeks",
    features: ["Add Income/Expense", "Balance Calculation", "Transaction History", "Basic Chart (e.g. Chart.js)"]
  },
  {
    id: 5,
    title: "E-commerce Storefront",
    description: "A frontend for an online store featuring product listing and a shopping cart.",
    level: "Intermediate",
    techStack: ["React", "Redux", "Tailwind"],
    duration: "3 Weeks",
    features: ["Product Grid with Filters", "Shopping Cart Management", "Product Details Page", "Mock Checkout Flow"]
  },
  {
    id: 6,
    title: "Recipe Finder",
    description: "Search and discover new recipes based on available ingredients.",
    level: "Intermediate",
    techStack: ["React", "Node.js", "API"],
    duration: "3 Weeks",
    features: ["Ingredient Search via API", "Recipe Details Modal", "Save Favorites", "Pagination"]
  },
  {
    id: 7,
    title: "Chat Application",
    description: "Real-time chat rooms where users can send and receive messages instantly.",
    level: "Intermediate",
    techStack: ["React", "Firebase", "Tailwind"],
    duration: "4 Weeks",
    features: ["User Authentication", "Real-time Messaging", "Multiple Chat Rooms", "Online Status Indicators"]
  },
  {
    id: 8,
    title: "Markdown Editor Blog",
    description: "A blog platform where posts are written and rendered in Markdown.",
    level: "Intermediate",
    techStack: ["React", "Markdown", "CSS"],
    duration: "3 Weeks",
    features: ["Live Markdown Preview", "Save Drafts", "Export to PDF", "Code Syntax Highlighting"]
  },
  {
    id: 9,
    title: "Social Media App",
    description: "A full-scale social networking platform with posts, likes, and comments.",
    level: "Advanced",
    techStack: ["MERN Stack", "Socket.io"],
    duration: "6 Weeks",
    features: ["JWT Authentication", "Post Image Uploads", "Real-time Notifications", "User Follow System"]
  },
  {
    id: 10,
    title: "Task Management Board",
    description: "A drag-and-drop Kanban board for team collaboration.",
    level: "Advanced",
    techStack: ["React", "React DnD", "Node.js", "MongoDB"],
    duration: "5 Weeks",
    features: ["Drag and Drop Tasks", "Multiple Boards/Workspaces", "Task Assignments", "Activity Log"]
  },
  {
    id: 11,
    title: "Video Conference Tool",
    description: "A web-based video calling application for multiple participants.",
    level: "Advanced",
    techStack: ["WebRTC", "Node.js", "React"],
    duration: "6 Weeks",
    features: ["Peer-to-Peer Video/Audio", "Screen Sharing", "Mute/Camera Toggles", "Text Chat overlay"]
  },
  {
    id: 12,
    title: "AI Image Generator",
    description: "Generate images from text prompts using an external AI service API.",
    level: "Advanced",
    techStack: ["React", "OpenAI API", "Tailwind"],
    duration: "4 Weeks",
    features: ["Prompt Input & History", "Loading Skeleton UI", "Image Download/Share", "Gallery of Past Generations"]
  }
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="min-h-screen bg-white font-sans py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto pt-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">Project Hub</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Build your portfolio with these carefully curated project ideas. Choose your difficulty level and start coding!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {projectsData.map(project => {
            const isBeginner = project.level === "Beginner";
            const isIntermediate = project.level === "Intermediate";

            const borderColor = isBeginner ? "border-t-[#3b82f6]" : isIntermediate ? "border-t-[#f97316]" : "border-t-[#a855f7]";
            const levelColor = isBeginner ? "text-blue-600 bg-blue-50" : isIntermediate ? "text-orange-600 bg-orange-50" : "text-purple-600 bg-purple-50";

            return (
              <div key={project.id} className={`bg-white rounded-xl shadow-sm hover:shadow-md hover:shadow-slate-200 transition-all duration-300 border border-slate-200 border-t-[5px] ${borderColor} p-6 flex flex-col h-full`}>
                <div className="flex justify-between items-start mb-4">
                  <div className={`px-3 py-1 rounded-full text-xs font-bold ${levelColor}`}>
                    {project.level}
                  </div>
                  <Folder className="w-5 h-5 text-slate-400" />
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-2">{project.title}</h3>
                <p className="text-slate-600 text-sm mb-6 flex-grow">{project.description}</p>
                
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech, idx) => (
                      <span key={idx} className="bg-slate-100 text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-full border border-slate-200 shadow-sm">
                        #{tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center text-slate-500 text-sm mb-6 mt-auto">
                  <Clock className="w-4 h-4 mr-1.5 text-slate-400" />
                  <span className="font-medium">{project.duration}</span>
                </div>
                
                <button 
                  onClick={() => setSelectedProject(project)}
                  className="w-full flex items-center justify-center gap-2 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-slate-900 px-4 py-2.5 rounded-lg font-semibold transition-colors shadow-sm"
                >
                  <Layers className="w-4 h-4" />
                  View Details
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm" onClick={() => setSelectedProject(null)}>
          <div 
            className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden transform transition-all duration-300 scale-100 opacity-100" 
            onClick={e => e.stopPropagation()}
          >
            <div className={`h-2 w-full ${selectedProject.level === "Beginner" ? "bg-blue-500" : selectedProject.level === "Intermediate" ? "bg-orange-500" : "bg-purple-500"}`}></div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-slate-900">{selectedProject.title}</h2>
                <button onClick={() => setSelectedProject(null)} className="p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="mb-6">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Layers className="w-4 h-4" />
                  Features to implement
                </h3>
                <ul className="space-y-3 pl-1">
                  {selectedProject.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <div className="flex-shrink-0 mt-1.5 mr-3 h-2 w-2 rounded-full bg-slate-300"></div>
                      <span className="text-slate-700 font-medium leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-8 pt-6 border-t border-slate-100">
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="w-full bg-emerald-600 text-white rounded-xl py-3 font-bold hover:bg-emerald-700 transition-colors shadow-md hover:shadow-emerald-200"
                >
                  Got it
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

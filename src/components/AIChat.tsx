import { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

export const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I am your mentor. How can I help you today?", isAi: true }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const hideChat = location.pathname === '/login' || location.pathname === '/signup';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMsg = { id: messages.length + 1, text: input, isAi: false };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Simulate AI typing timeout
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        text: "I'm a demo mentor for now! But in the future, I'll be able to help you debug code, recommend roadmaps, and more.",
        isAi: true
      }]);
    }, 1000);
  };

  if (hideChat) return null;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed bottom-24 right-4 sm:right-6 lg:right-8 w-[calc(100vw-2rem)] sm:w-[380px] h-[450px] max-h-[80vh] z-[100]">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.2, type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full h-full bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden backdrop-blur-3xl bg-white/95"
            >
              {/* Header */}
              <div className="bg-slate-900 px-5 flex justify-between items-center text-white h-16 shrink-0 z-10">
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-500/20 p-2 rounded-xl border border-emerald-500/30">
                    <Sparkles className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-[15px] tracking-tight text-white leading-tight">PrepForge AI Mentor</h3>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 relative flex items-center justify-center">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping"></span>
                      </span>
                      <span className="text-xs text-slate-300 font-medium">Online</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-slate-400 hover:text-white hover:bg-slate-800 p-2 rounded-xl transition-colors focus:outline-none"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Chat Area */}
              <div className="flex-1 overflow-y-auto p-5 bg-slate-50/50 space-y-4">
                {messages.map((msg) => (
                  <div 
                    key={msg.id} 
                    className={`flex ${msg.isAi ? 'justify-start' : 'justify-end'}`}
                  >
                    <div 
                      className={`max-w-[85%] px-4 py-3 text-[15px] shadow-sm font-medium ${
                        msg.isAi 
                          ? 'bg-white text-slate-700 border border-slate-200 rounded-2xl rounded-tl-sm'
                          : 'bg-emerald-600 text-white rounded-2xl rounded-tr-sm'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} className="h-2" />
              </div>

              {/* Input Area */}
              <div className="p-4 bg-white border-t border-slate-100 shrink-0">
                <form onSubmit={handleSend} className="relative flex items-center">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask anything..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-5 pr-14 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-slate-900 placeholder-slate-400 font-medium transition-all"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim()}
                    className="absolute right-2 p-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm focus:outline-none"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-4 sm:right-6 lg:right-8 bg-slate-900 border-2 border-slate-800 text-white p-4 rounded-full shadow-2xl hover:shadow-slate-300/50 hover:-translate-y-1 transition-all z-[90] flex items-center gap-2.5 group focus:outline-none focus:ring-4 focus:ring-emerald-500/30"
        title="Chat with AI Mentor"
      >
        <Sparkles className="w-6 h-6 text-emerald-400 group-hover:scale-110 transition-transform" />
        <span className="hidden sm:inline-block font-extrabold text-sm tracking-wide mr-1">Ask AI</span>
      </button>
    </>
  );
};

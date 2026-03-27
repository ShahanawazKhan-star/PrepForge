import { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface Message {
  id: string;
  role: 'user' | 'ai';
  text: string;
}

export const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-1',
      role: 'ai',
      text: "Hi there! I'm your PrepForge AI Mentor. Need a hint on a coding problem?"
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatSessionRef = useRef<any>(null);
  const location = useLocation();

  const hideChat = location.pathname === '/login' || location.pathname === '/signup';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isOpen]);

  const getChatSession = () => {
    if (chatSessionRef.current) return chatSessionRef.current;

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      toast.error("API Key missing in .env file!");
      return null;
    }

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: 'gemini-1.5-flash',
      });

      chatSessionRef.current = model.startChat({
        history: [],
        generationConfig: { maxOutputTokens: 800 }
      });
      return chatSessionRef.current;
    } catch (error) {
      console.error("Failed to init Gemini:", error);
      return null;
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userText = input.trim();
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: userText
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const session = getChatSession();
    if (!session) {
      toast.error('AI could not start. Check console.');
      setIsTyping(false);
      return;
    }

    try {
      const prompt = `Context: You are PrepForge AI Mentor. Help with Full Stack/DSA. Hints only, no direct code unless asked twice. User says: ${userText}`;
      
      const result = await session.sendMessage(prompt);
      const aiText = result.response.text();

      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'ai',
          text: aiText
        }
      ]);
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      chatSessionRef.current = null;
      toast.error("Connection failed. Try again!");
    } finally {
      setIsTyping(false);
    }
  };

  if (hideChat) return null;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed bottom-24 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-[350px] h-[500px] max-h-[85vh] z-[100] flex flex-col">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full h-full bg-slate-50 rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden ring-1 ring-white/10"
            >
              {/* Header */}
              <div className="bg-white border-b border-slate-200 px-4 py-4 flex justify-between items-center shrink-0">
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-500/10 p-2 rounded-xl border border-emerald-500/20 shadow-inner">
                    <Bot className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-[15px] tracking-tight text-slate-900 leading-none">AI Mentor</h3>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 relative flex items-center justify-center">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping"></span>
                      </span>
                      <span className="text-[11px] uppercase tracking-widest text-emerald-500 font-bold">Online</span>
                    </div>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="text-slate-600 hover:text-slate-900 p-2">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Chat Area */}
              <div className="flex-1 overflow-y-auto p-4 bg-white/80 space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.role === 'ai' ? 'justify-start' : 'justify-end'}`}>
                    <div className={`px-4 py-2.5 text-[14px] rounded-2xl whitespace-pre-wrap ${msg.role === 'ai' ? 'bg-slate-100 text-slate-800' : 'bg-emerald-600 text-white'}`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-slate-100 rounded-2xl px-4 py-3 text-emerald-400 text-xs animate-pulse">
                      Mentor is thinking...
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-3 bg-white border-t border-slate-200">
                <form onSubmit={handleSend} className="relative flex items-center">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask anything..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 text-sm focus:ring-1 focus:ring-emerald-500 outline-none"
                  />
                  <button type="submit" disabled={!input.trim() || isTyping} className="absolute right-2 p-2 text-emerald-500">
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-4 sm:right-6 bg-white border border-emerald-500/30 text-slate-900 p-4 rounded-full z-[90]"
      >
        {isOpen ? <X /> : <Sparkles className="text-emerald-400" />}
      </button>
    </>
  );
};
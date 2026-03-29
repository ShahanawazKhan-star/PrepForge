import React, { useState } from 'react';
import { Play, Send, ChevronLeft, Bot, Bookmark, Maximize2 } from 'lucide-react';
import Editor from '@monaco-editor/react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export default function ProblemPage() {
  const navigate = useNavigate();
  const [code, setCode] = useState('function solve() {\n  // Write your completely bug-free code here\n  \n}');
  const [isSimulatingRun, setIsSimulatingRun] = useState(false);
  const [runResult, setRunResult] = useState<{status: string, message: string} | null>(null);
  
  // Dummy problem data
  const problem = {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    description: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.",
    examples: [
      { input: "nums = [2,7,11,15], target = 9", output: "[0,1]" }
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9"
    ]
  };

  const handleRunCode = () => {
    setIsSimulatingRun(true);
    setRunResult(null);
    setTimeout(() => {
      setIsSimulatingRun(false);
      setRunResult({ status: 'success', message: 'Test Cases Passed: 3/3\nMemory Usage: 41 MB' });
    }, 1200);
  };

  const handleSubmit = () => {
    setIsSimulatingRun(true);
    setRunResult(null);
    setTimeout(() => {
      setIsSimulatingRun(false);
      setRunResult({ status: 'accepted', message: 'Runtime: 46 ms (Beats 85.2%)\nMemory: 42.1 MB' });
      toast.success('Solution Accepted! 🎉', {
        style: { background: '#1e1b4b', color: '#fff', border: '1px solid #312e81' }
      });
    }, 1500);
  };

  return (
    <div className="h-[calc(100vh-3.5rem)] flex flex-col md:flex-row bg-[#0B0F19] text-slate-200 font-sans overflow-hidden selection:bg-purple-500/30">
      
      {/* LEFT PANEL: Description (Purple-Blue Theme) */}
      <div className="w-full md:w-[45%] lg:w-[40%] bg-[#0f172a] border-r border-[#1e293b] flex flex-col h-full overflow-hidden z-10 relative">
        <div className="h-16 border-b border-[#1e293b] bg-[#0b0f19]/80 backdrop-blur-md flex items-center justify-between px-6 shrink-0 sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/practice')} // Assuming it goes back to practice
              className="flex items-center gap-1.5 text-slate-400 hover:text-white font-bold text-sm transition-all"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button className="text-purple-400 hover:text-purple-300 font-bold text-sm bg-purple-500/10 px-3 py-1.5 rounded-lg border border-purple-500/20 flex items-center gap-2 transition-colors">
              <Bot className="w-4 h-4" /> AI Help
            </button>
            <button className="p-2 text-slate-400 hover:text-blue-400 rounded-lg transition-colors border border-transparent hover:border-[#1e293b] hover:bg-[#1e293b]" title="Bookmark Problem">
              <Bookmark className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
          <h1 className="text-3xl font-black tracking-tight text-white mb-4 leading-tight">
            {problem.id}. {problem.title}
          </h1>
          
          <div className="flex items-center gap-3 mb-8 flex-wrap">
            <span className="px-3 py-1 rounded-full text-xs font-bold text-blue-300 bg-blue-500/10 border border-blue-500/20">
              {problem.difficulty}
            </span>
          </div>

          <p className="text-[15px] text-slate-300 whitespace-pre-wrap leading-relaxed font-medium mb-10">
            {problem.description}
          </p>

          <div className="space-y-6 mb-10">
            <h3 className="text-lg font-bold text-white border-b border-[#1e293b] pb-3">Examples</h3>
            {problem.examples.map((ex, idx) => (
              <div key={idx} className="bg-[#1e293b]/50 rounded-2xl p-5 border border-[#334155]">
                <p className="text-xs font-bold text-slate-400 mb-3 uppercase tracking-widest">Example {idx + 1}</p>
                <div className="font-mono text-[13px] space-y-2">
                  <div className="flex"><span className="text-slate-500 select-none w-16 shrink-0">Input:</span> <span className="text-blue-200 font-semibold">{ex.input}</span></div>
                  <div className="flex"><span className="text-slate-500 select-none w-16 shrink-0">Output:</span> <span className="text-purple-300 font-bold">{ex.output}</span></div>
                </div>
              </div>
            ))}
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-bold text-white border-b border-[#1e293b] pb-3 mb-4">Constraints</h3>
            <ul className="list-disc pl-5 font-mono text-[13px] text-slate-400 space-y-2">
               {problem.constraints.map((c, i) => <li key={i} className="bg-[#1e293b] px-3 py-1.5 rounded-lg w-fit text-blue-200">{c}</li>)}
            </ul>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL: Editor & Console */}
      <div className="w-full md:w-[55%] lg:w-[60%] flex flex-col h-full bg-[#1e1e1e]">
        
        {/* Editor Toolbar */}
        <div className="h-16 bg-[#181824] border-b border-[#2a2a35] flex items-center justify-between px-4 shrink-0 shadow-md">
          <div className="flex items-center gap-2 bg-[#252533] px-3 py-1.5 rounded-xl border border-[#3b3b4f]">
            <span className="text-purple-400 text-xs font-bold uppercase tracking-wider">JavaScript</span>
          </div>
          <button className="text-slate-400 hover:text-white p-2 rounded-lg transition-colors hover:bg-[#252533]">
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        {/* Monaco Editor */}
        <div className="flex-1 relative border-b border-[#2a2a35]">
          <Editor
            height="100%"
            language="javascript"
            theme="vs-dark"
            value={code}
            onChange={(val) => setCode(val || '')}
            options={{
              minimap: { enabled: false },
              fontSize: 15,
              fontFamily: "'Fira Code', 'JetBrains Mono', Consolas, monospace",
              padding: { top: 24, bottom: 24 },
              scrollBeyondLastLine: false,
              smoothScrolling: true,
              cursorBlinking: "smooth",
              formatOnPaste: true,
              lineNumbers: "on",
              wordWrap: "on"
            }}
            loading={<div className="text-purple-400 flex justify-center items-center h-full text-sm font-semibold animate-pulse">Initializing Editor...</div>}
          />
        </div>

        {/* Action Buttons & Console Placement */}
        <div className="h-[220px] bg-[#0B0F19] flex flex-col shrink-0">
          <div className="flex items-center justify-between px-6 h-14 border-b border-[#1e293b] bg-[#0f172a]">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Execution Console</span>
            <div className="flex items-center gap-3">
              <button 
                onClick={handleRunCode}
                disabled={isSimulatingRun}
                className="flex items-center gap-2 px-6 py-2 rounded-xl bg-[#1e293b] text-blue-300 hover:bg-[#334155] hover:text-blue-100 font-bold text-sm transition-colors border border-[#334155] disabled:opacity-50"
              >
                <Play className="w-4 h-4" /> Run
              </button>
              <button 
                onClick={handleSubmit}
                disabled={isSimulatingRun}
                className="flex items-center gap-2 px-6 py-2 rounded-xl bg-purple-600 text-white hover:bg-purple-500 font-bold text-sm shadow-[0_0_15px_rgba(147,51,234,0.3)] transition-all disabled:opacity-50"
              >
                <Send className="w-4 h-4" /> Submit
              </button>
            </div>
          </div>

          <div className="flex-1 p-6 custom-scrollbar bg-[#0B0F19] overflow-y-auto">
            {isSimulatingRun ? (
              <div className="text-purple-400 text-sm animate-pulse font-mono">Running securely...</div>
            ) : runResult ? (
              <div className="font-mono text-sm space-y-2 max-w-2xl bg-[#0f172a] p-5 rounded-xl border border-[#1e293b]">
                <div className={`font-black text-lg ${runResult.status === 'accepted' ? 'text-purple-400' : 'text-blue-400'}`}>
                  {runResult.status === 'accepted' ? 'Accepted!' : 'Tests Passed!'}
                </div>
                <div className="text-slate-300 mt-2 whitespace-pre-line">{runResult.message}</div>
              </div>
            ) : (
              <div className="text-slate-500 text-sm font-mono select-none">
                Write code and click Run to test your solution.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

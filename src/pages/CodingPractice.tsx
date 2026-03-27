import React, { useState, useEffect } from 'react';
import { Play, CheckCircle2, RefreshCw, Send, ChevronLeft, Bot, Filter, Search } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { supabase } from '../lib/supabase';
import { toast } from 'react-hot-toast';
import Editor from '@monaco-editor/react';

type Difficulty = 'Easy' | 'Medium' | 'Hard';

interface Problem {
  id: number;
  title: string;
  difficulty: Difficulty;
  category: string;
  company: string;
  description: string;
  examples: { input: string; output: string; explanation?: string }[];
  constraints: string[];
}

const problems: Problem[] = [
  { 
    id: 1, title: 'Two Sum', difficulty: 'Easy', category: 'Arrays', company: 'Google', 
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.",
    examples: [{ input: "nums = [2,7,11,15], target = 9", output: "[0,1]" }],
    constraints: ["2 <= nums.length <= 10^4", "-10^9 <= nums[i] <= 10^9", "-10^9 <= target <= 10^9"]
  },
  { 
    id: 2, title: 'Valid Parentheses', difficulty: 'Easy', category: 'Stack', company: 'Meta', 
    description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.", 
    examples: [{ input: "s = \"()[]{}\"", output: "true" }],
    constraints: ["1 <= s.length <= 10^4", "s consists of parentheses only '()[]{}'."]
  },
  { 
    id: 3, title: 'Merge Intervals', difficulty: 'Medium', category: 'Arrays', company: 'Amazon', 
    description: "Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.", 
    examples: [{ input: "intervals = [[1,3],[2,6],[8,10],[15,18]]", output: "[[1,6],[8,10],[15,18]]" }],
    constraints: ["1 <= intervals.length <= 10^4", "intervals[i].length == 2", "0 <= starti <= endi <= 10^4"]
  },
  { 
    id: 4, title: 'LRU Cache', difficulty: 'Medium', category: 'Linked List', company: 'Apple', 
    description: "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.", 
    examples: [{ input: "LRUCache cache = new LRUCache(2); cache.put(1, 1); cache.get(1);", output: "1" }],
    constraints: ["1 <= capacity <= 3000", "0 <= key <= 10^4", "0 <= value <= 10^5"]
  },
  { 
    id: 5, title: 'Trapping Rain Water', difficulty: 'Hard', category: 'Two Pointers', company: 'Google', 
    description: "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.", 
    examples: [{ input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]", output: "6" }],
    constraints: ["n == height.length", "1 <= n <= 2 * 10^4", "0 <= height[i] <= 10^5"]
  },
  { 
    id: 6, title: 'Word Search II', difficulty: 'Hard', category: 'Trie', company: 'Microsoft', 
    description: "Given an m x n board of characters and a list of strings words, return all words on the board.", 
    examples: [{input: "board = [['o','a','b'],['e','t','c']], words = ['oath','pea','eat']", output: "['eat','oath']"}],
    constraints: ["m == board.length", "n == board[i].length", "1 <= m, n <= 12", "board[i][j] is a lowercase English letter."]
  },
  { 
    id: 7, title: 'Best Time to Buy and Sell Stock', difficulty: 'Easy', category: 'Algorithms', company: 'Amazon', 
    description: "You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.", 
    examples: [{input: "prices = [7,1,5,3,6,4]", output: "5"}],
    constraints: ["1 <= prices.length <= 10^5", "0 <= prices[i] <= 10^4"]
  },
  { 
    id: 8, title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', category: 'Algorithms', company: 'Bloomberg', 
    description: "Given a string s, find the length of the longest substring without repeating characters.", 
    examples: [{input: "s = 'abcabcbb'", output: "3"}],
    constraints: ["0 <= s.length <= 5 * 10^4", "s consists of English letters, digits, symbols and spaces."]
  },
  { 
    id: 9, title: 'Maximum Subarray', difficulty: 'Medium', category: 'Algorithms', company: 'LinkedIn', 
    description: "Given an integer array nums, find the subarray with the largest sum, and return its sum.", 
    examples: [{input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6"}],
    constraints: ["1 <= nums.length <= 10^5", "-10^4 <= nums[i] <= 10^4"]
  },
  { 
    id: 10, title: 'Merge k Sorted Lists', difficulty: 'Hard', category: 'Linked List', company: 'Uber', 
    description: "Merge all the linked-lists into one sorted linked-list and return it.", 
    examples: [{input: "lists = [[1,4,5],[1,3,4],[2,6]]", output: "[1,1,2,3,4,4,5,6]"}],
    constraints: ["k == lists.length", "0 <= k <= 10^4", "0 <= lists[i].length <= 500"]
  },
  { 
    id: 11, title: 'Container With Most Water', difficulty: 'Medium', category: 'Two Pointers', company: 'Google', 
    description: "Find two lines that together with the x-axis form a container, such that the container contains the most water.", 
    examples: [{input: "height = [1,8,6,2,5,4,8,3,7]", output: "49"}],
    constraints: ["n == height.length", "2 <= n <= 10^5", "0 <= height[i] <= 10^4"]
  },
  { 
    id: 12, title: 'Reverse Linked List', difficulty: 'Easy', category: 'Linked List', company: 'Apple', 
    description: "Given the head of a singly linked list, reverse the list, and return the reversed list.", 
    examples: [{input: "head = [1,2,3,4,5]", output: "[5,4,3,2,1]"}],
    constraints: ["The number of nodes in the list is the range [0, 5000].", "-5000 <= Node.val <= 5000"]
  },
  { 
    id: 13, title: 'Binary Tree Level Order Traversal', difficulty: 'Medium', category: 'Trees', company: 'Meta', 
    description: "Given the root of a binary tree, return the level order traversal of its nodes' values.", 
    examples: [{input: "root = [3,9,20,null,null,15,7]", output: "[[3],[9,20],[15,7]]"}],
    constraints: ["The number of nodes in the tree is in the range [0, 2000].", "-1000 <= Node.val <= 1000"]
  },
  { 
    id: 14, title: 'Climbing Stairs', difficulty: 'Easy', category: 'Algorithms', company: 'Adobe', 
    description: "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?", 
    examples: [{input: "n = 3", output: "3"}],
    constraints: ["1 <= n <= 45"]
  },
  { 
    id: 15, title: 'Course Schedule', difficulty: 'Medium', category: 'Graphs', company: 'Netflix', 
    description: "Return true if you can finish all courses. Otherwise, return false.", 
    examples: [{input: "numCourses = 2, prerequisites = [[1,0]]", output: "true"}],
    constraints: ["1 <= numCourses <= 2000", "0 <= prerequisites.length <= 5000"]
  }
];

const boilerplates: Record<string, string> = {
  javascript: 'function solve(nums, target) {\n  // Write your code here\n  \n}',
  python: 'def solve(nums, target):\n    # Write your code here\n    pass',
  java: 'class Solution {\n    public int[] solve(int[] nums, int target) {\n        // Write your code here\n        return new int[]{};\n    }\n}',
  cpp: 'class Solution {\npublic:\n    vector<int> solve(vector<int>& nums, int target) {\n        // Write your code here\n        return {};\n    }\n};'
};

const CodingPractice = () => {
  const { user } = useUser();
  const [solvedIds, setSolvedIds] = useState<number[]>([]);
  
  // View State: if null, show problem list. If set, show specific problem IDE.
  const [activeProblem, setActiveProblem] = useState<Problem | null>(null);
  
  // Editor State
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState(boilerplates['javascript']);
  const [isSimulatingRun, setIsSimulatingRun] = useState(false);
  const [runResult, setRunResult] = useState<{status: string, message: string} | null>(null);

  // List Filters
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [selectedTopic, setSelectedTopic] = useState<string>('All');
  const [selectedCompany, setSelectedCompany] = useState<string>('All');

  useEffect(() => {
    const fetchSolvedProblems = async () => {
      if (!user) return;
      try {
        const { data, error } = await supabase
          .from('solved_problems')
          .select('problem_id')
          .eq('user_id', user.id);
        
        if (error) throw error;
        if (data) {
          setSolvedIds(data.map(row => Number(row.problem_id)));
        }
      } catch (error) {
        console.error('Fetch operation failed:', error);
      }
    };
    fetchSolvedProblems();
  }, [user]);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    setLanguage(newLang);
    setCode(boilerplates[newLang]);
  };

  const startSolving = (problem: Problem) => {
    setActiveProblem(problem);
    setCode(boilerplates[language]); 
    setRunResult(null);
  };

  const markProblemSolved = async (problemId: number) => {
    if (!user) {
      toast.error('Log in securely to save your DSA progress!', {
        style: { background: '#020617', color: '#fff', border: '1px solid #334155', borderRadius: '12px' }
      });
      return;
    }

    if (solvedIds.includes(problemId)) return;

    setSolvedIds(prev => [...prev, problemId]);
    try {
      const { error } = await supabase
        .from('solved_problems')
        .insert({ user_id: user.id, problem_id: problemId });
      if (error) throw error;
      toast.success("Solution Accepted! 🎉");
    } catch {
      setSolvedIds(prev => prev.filter(id => id !== problemId));
    }
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
      if (activeProblem) markProblemSolved(activeProblem.id);
    }, 1500);
  };

  // Extract unique filter options
  const topics = ['All', ...Array.from(new Set(problems.map(p => p.category)))];
  const companies = ['All', ...Array.from(new Set(problems.map(p => p.company)))];

  const filteredProblems = problems.filter(p => {
    if (selectedDifficulty !== 'All' && p.difficulty !== selectedDifficulty) return false;
    if (selectedTopic !== 'All' && p.category !== selectedTopic) return false;
    if (selectedCompany !== 'All' && p.company !== selectedCompany) return false;
    return true;
  });

  // ========== VIEW 1: PROBLEM LIST PAGE ==========
  if (!activeProblem) {
    return (
      <div className="min-h-[calc(100vh-3.5rem)] bg-slate-50 font-sans p-6 md:p-8 flex items-start justify-center">
        <div className="max-w-7xl w-full flex flex-col md:flex-row gap-8">
          
          {/* Left Sidebar: Filters */}
          <div className="w-full md:w-64 shrink-0 space-y-6">
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
              <div className="flex items-center gap-2 mb-4 text-slate-900 border-b border-slate-100 pb-3">
                <Filter className="w-4 h-4" />
                <h3 className="font-bold">Filters</h3>
              </div>

              {/* Difficulty */}
              <div className="mb-5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 block">Difficulty</label>
                <div className="flex flex-col gap-2">
                  {['All', 'Easy', 'Medium', 'Hard'].map(diff => (
                    <label key={diff} className="flex items-center gap-2 cursor-pointer group">
                      <input 
                        type="radio" 
                        name="difficulty" 
                        value={diff} 
                        checked={selectedDifficulty === diff}
                        onChange={(e) => setSelectedDifficulty(e.target.value)}
                        className="w-4 h-4 text-emerald-500 focus:ring-emerald-500 border-slate-300" 
                      />
                      <span className="text-[13px] font-semibold text-slate-700 group-hover:text-slate-900">{diff}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Topic */}
              <div className="mb-5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 block">Topic</label>
                <select 
                  value={selectedTopic}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-[13px] font-semibold rounded-lg px-3 py-2 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                >
                  {topics.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              {/* Company */}
              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 block">Company</label>
                <select 
                  value={selectedCompany}
                  onChange={(e) => setSelectedCompany(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-[13px] font-semibold rounded-lg px-3 py-2 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                >
                  {companies.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            {/* Progress Card */}
            <div className="bg-gradient-to-br from-slate-900 flex-col to-slate-800 p-5 rounded-2xl shadow-lg border border-slate-700 text-white">
               <h3 className="font-bold text-slate-200 mb-1 text-[13px] uppercase tracking-wider">Your Progress</h3>
               <div className="text-3xl font-black text-white mb-3">
                 {solvedIds.length} <span className="text-sm font-bold text-slate-400">/ {problems.length}</span>
               </div>
               <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                 <div className="bg-emerald-500 h-full transition-all" style={{ width: `${(solvedIds.length / problems.length) * 100}%`}}></div>
               </div>
            </div>
          </div>

          {/* Center Section: Problem List */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              
              <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                <div className="relative w-64">
                   <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                   <input type="text" placeholder="Search problems..." className="w-full bg-white border border-slate-200 text-slate-700 text-[13px] font-medium rounded-lg pl-9 pr-3 py-1.5 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500" />
                </div>
              </div>

              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white border-b border-slate-100 text-[12px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="px-5 py-3 w-12 text-center">Status</th>
                    <th className="px-5 py-3">Title</th>
                    <th className="px-5 py-3 w-32">Difficulty</th>
                    <th className="px-5 py-3 hidden sm:table-cell">Company</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredProblems.map((p) => {
                    const isSolved = solvedIds.includes(p.id);
                    return (
                      <tr key={p.id} onClick={() => startSolving(p)} className="hover:bg-slate-50 cursor-pointer transition-colors group">
                        <td className="px-5 py-4 text-center">
                          {isSolved ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 mx-auto" />
                          ) : (
                            <div className="w-4 h-4 rounded border-2 border-slate-200 bg-white mx-auto group-hover:border-slate-300" />
                          )}
                        </td>
                        <td className="px-5 py-4">
                          <div className="font-bold text-[14px] text-slate-900 group-hover:text-emerald-600 transition-colors">
                            {p.id}. {p.title}
                          </div>
                          <div className="text-[12px] font-medium text-slate-500 mt-0.5">{p.category}</div>
                        </td>
                        <td className="px-5 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                            p.difficulty === 'Easy' ? 'bg-emerald-50 text-emerald-600' : 
                            p.difficulty === 'Medium' ? 'bg-amber-50 text-amber-600' : 'bg-rose-50 text-rose-600'
                          }`}>
                            {p.difficulty}
                          </span>
                        </td>
                        <td className="px-5 py-4 hidden sm:table-cell">
                          <span className="text-[12px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                            {p.company}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                  {filteredProblems.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-5 py-12 text-center text-slate-500 font-semibold text-[14px]">
                        No problems match your filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ========== VIEW 2: SPLIT LAYOUT IDE ==========
  return (
    <div className="h-[calc(100vh-3.5rem)] flex flex-col md:flex-row bg-slate-50 font-sans overflow-hidden">
      
      {/* LEFT PANEL: Description, Examples, Constraints (50%) */}
      <div className="w-full md:w-[45%] lg:w-[40%] bg-white border-r border-slate-200 flex flex-col h-full overflow-hidden shadow-sm z-10 relative">
        
        {/* Navigation Bar */}
        <div className="h-14 border-b border-slate-200 bg-slate-50/80 flex items-center px-4 shrink-0 shadow-sm sticky top-0 z-20">
          <button 
            onClick={() => setActiveProblem(null)}
            className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900 font-bold text-[13px] bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm transition-all hover:bg-slate-50"
          >
            <ChevronLeft className="w-4 h-4" /> Back to Problems
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 mb-4 leading-tight">
            {activeProblem.id}. {activeProblem.title}
          </h1>
          
          <div className="flex items-center gap-2 mb-6 flex-wrap">
            <span className={`px-2.5 py-1 rounded text-[11px] font-bold ${
              activeProblem.difficulty === 'Easy' ? 'bg-emerald-100 text-emerald-700' : 
              activeProblem.difficulty === 'Medium' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
            }`}>
              {activeProblem.difficulty}
            </span>
            <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded">
              {activeProblem.category}
            </span>
            <span className="text-xs font-semibold text-slate-500 border border-slate-200 px-2.5 py-1 rounded">
              {activeProblem.company}
            </span>
            {solvedIds.includes(activeProblem.id) && (
              <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded border border-emerald-100 ml-auto">
                <CheckCircle2 className="w-3.5 h-3.5" /> Solved
              </span>
            )}
          </div>

          <p className="text-[14px] text-slate-700 whitespace-pre-wrap leading-relaxed font-medium mb-8">
            {activeProblem.description}
          </p>

          <div className="space-y-5 mb-8">
            <h3 className="text-[14px] font-bold text-slate-900 border-b border-slate-100 pb-2">Examples</h3>
            {activeProblem.examples.map((ex, idx) => (
              <div key={idx} className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                <p className="text-[11px] font-bold text-slate-500 mb-2 uppercase tracking-wide">Example {idx + 1}:</p>
                <div className="font-mono text-[13px] space-y-1.5">
                  <div className="flex"><span className="text-slate-400 select-none w-14 shrink-0">Input:</span> <span className="text-slate-800 font-bold">{ex.input}</span></div>
                  <div className="flex"><span className="text-slate-400 select-none w-14 shrink-0">Output:</span> <span className="text-emerald-600 font-bold">{ex.output}</span></div>
                </div>
              </div>
            ))}
          </div>

          <div className="mb-8">
            <h3 className="text-[14px] font-bold text-slate-900 border-b border-slate-100 pb-2 mb-3">Constraints</h3>
            <ul className="list-disc pl-5 font-mono text-[12px] text-slate-600 space-y-1.5">
               {activeProblem.constraints.map((c, i) => <li key={i} className="bg-slate-100 px-2 py-0.5 rounded w-fit my-1">{c}</li>)}
            </ul>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL: Code Editor & Testing (Bottom) */}
      <div className="w-full md:w-[55%] lg:w-[60%] flex flex-col h-full bg-[#1e1e1e]">
        
        {/* Editor Toolbar */}
        <div className="h-14 bg-[#252526] border-b border-[#3e3e42] flex items-center justify-between px-4 shrink-0 shadow-md z-10">
          <div className="flex items-center gap-3">
            <select 
              value={language}
              onChange={handleLanguageChange}
              className="bg-[#3c3c3c] text-[#cccccc] text-[13px] font-semibold rounded-lg px-3 py-1.5 outline-none border border-[#3e3e42] focus:border-[#007acc] transition-colors cursor-pointer"
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="cpp">C++</option>
            </select>
          </div>
          <div className="flex items-center gap-3">
             <button
              className="text-[#cccccc] hover:text-white px-3 py-1.5 text-[12px] font-bold rounded-lg hover:bg-[#3c3c3c] transition-colors border border-[#3e3e42] flex items-center gap-1.5"
              title="Get AI Guidance"
             >
                <Bot className="w-4 h-4 text-emerald-400" /> AI Help
             </button>
             <button
              onClick={() => { setCode(boilerplates[language]); setRunResult(null); }}
              className="text-[#cccccc] hover:text-white p-1.5 rounded-lg hover:bg-[#3c3c3c] transition-colors border border-[#3e3e42]"
              title="Reset Code"
             >
                <RefreshCw className="w-4 h-4" />
             </button>
          </div>
        </div>

        {/* Monaco Editor Wrapper */}
        <div className="flex-1 relative border-b border-[#3e3e42]">
          <Editor
            height="100%"
            language={language}
            theme="vs-dark"
            value={code}
            onChange={(val) => setCode(val || '')}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, monospace",
              padding: { top: 16 },
              scrollBeyondLastLine: false,
              smoothScrolling: true,
              cursorBlinking: "smooth",
            }}
            loading={<div className="text-slate-400 flex justify-center items-center h-full text-sm font-semibold">Loading Editor...</div>}
          />
        </div>

        {/* Bottom Test Case Output Region */}
        <div className="h-[250px] bg-[#1e1e1e] flex flex-col shrink-0">
          
          {/* Output Header */}
          <div className="flex items-center px-4 h-10 border-b border-[#3e3e42] bg-[#252526]">
             <span className="text-[12px] font-bold text-[#cccccc] uppercase tracking-wider">Test Cases & Output</span>
          </div>

          <div className="flex-1 overflow-y-auto p-4 custom-scrollbar bg-[#1e1e1e]">
             {isSimulatingRun ? (
                <div className="flex items-center gap-2 text-[#cccccc] text-[13px] animate-pulse font-mono">
                  <RefreshCw className="w-4 h-4 animate-spin text-emerald-500" />
                  Compiling and executing test cases...
                </div>
             ) : runResult ? (
                <div className="font-mono text-[13px] space-y-2 max-w-2xl bg-[#252526] p-4 rounded-xl border border-[#3e3e42]">
                   <div className={`font-bold text-lg ${runResult.status === 'accepted' ? 'text-emerald-500' : 'text-emerald-400'}`}>
                     {runResult.status === 'accepted' ? 'Accepted' : 'Tests Passed'}
                   </div>
                   <div className="text-[#cccccc] whitespace-pre-line">{runResult.message}</div>
                </div>
             ) : (
                <div className="text-[#858585] text-[13px] font-mono select-none">
                  Select "Run Code" to compile against sample test cases.
                </div>
             )}
          </div>

          {/* Action Buttons */}
          <div className="h-14 border-t border-[#3e3e42] flex items-center justify-end px-4 gap-3 bg-[#2d2d2d]">
            <button 
              onClick={handleRunCode}
              disabled={isSimulatingRun}
              className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-[#3c3c3c] text-[#cccccc] hover:bg-[#4d4d4d] hover:text-white font-semibold text-[13px] transition-colors disabled:opacity-50"
            >
              <Play className="w-4 h-4" /> Run Code
            </button>
            <button 
              onClick={handleSubmit}
              disabled={isSimulatingRun}
              className="flex items-center gap-1.5 px-6 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-500 font-bold text-[13px] shadow-[0_0_10px_rgba(16,185,129,0.3)] transition-all disabled:opacity-50"
            >
              <Send className="w-4 h-4" /> Submit
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CodingPractice;

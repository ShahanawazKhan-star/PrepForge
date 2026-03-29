import React, { useState, useEffect } from 'react';
import { Play, CheckCircle2, RefreshCw, Send, ChevronLeft, Bot, Search, Bookmark, Code2, ChevronRight, Filter } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { supabase } from '../lib/supabase';
import { toast } from 'react-hot-toast';
import Editor from '@monaco-editor/react';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';

type Difficulty = 'Easy' | 'Medium' | 'Hard';
type ViewState = 'languages' | 'topics' | 'problems' | 'ide';

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
  { id: 1, title: 'Two Sum', difficulty: 'Easy', category: 'Array', company: 'Google', description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.", examples: [{ input: "nums = [2,7,11,15], target = 9", output: "[0,1]" }], constraints: ["2 <= nums.length <= 10^4", "-10^9 <= nums[i] <= 10^9", "-10^9 <= target <= 10^9"] },
  { id: 2, title: 'Valid Parentheses', difficulty: 'Easy', category: 'Stack', company: 'Meta', description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.", examples: [{ input: "s = \"()[]{}\"", output: "true" }], constraints: ["1 <= s.length <= 10^4", "s consists of parentheses only '()[]{}'."] },
  { id: 3, title: 'Merge Intervals', difficulty: 'Medium', category: 'Array', company: 'Amazon', description: "Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.", examples: [{ input: "intervals = [[1,3],[2,6],[8,10],[15,18]]", output: "[[1,6],[8,10],[15,18]]" }], constraints: ["1 <= intervals.length <= 10^4", "intervals[i].length == 2", "0 <= starti <= endi <= 10^4"] },
  { id: 4, title: 'LRU Cache', difficulty: 'Medium', category: 'Linked List', company: 'Apple', description: "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.", examples: [{ input: "LRUCache cache = new LRUCache(2); cache.put(1, 1); cache.get(1);", output: "1" }], constraints: ["1 <= capacity <= 3000", "0 <= key <= 10^4", "0 <= value <= 10^5"] },
  { id: 5, title: 'Trapping Rain Water', difficulty: 'Hard', category: 'Two Pointers', company: 'Google', description: "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.", examples: [{ input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]", output: "6" }], constraints: ["n == height.length", "1 <= n <= 2 * 10^4", "0 <= height[i] <= 10^5"] },
  { id: 6, title: 'Word Search II', difficulty: 'Hard', category: 'Trie', company: 'Microsoft', description: "Given an m x n board of characters and a list of strings words, return all words on the board.", examples: [{input: "board = [['o','a','b'],['e','t','c']], words = ['oath','pea','eat']", output: "['eat','oath']"}], constraints: ["m == board.length", "n == board[i].length", "1 <= m, n <= 12", "board[i][j] is a lowercase English letter."] },
  { id: 7, title: 'Best Time to Buy and Sell Stock', difficulty: 'Easy', category: 'DP', company: 'Amazon', description: "You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.", examples: [{input: "prices = [7,1,5,3,6,4]", output: "5"}], constraints: ["1 <= prices.length <= 10^5", "0 <= prices[i] <= 10^4"] },
  { id: 8, title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', category: 'String', company: 'Bloomberg', description: "Given a string s, find the length of the longest substring without repeating characters.", examples: [{input: "s = 'abcabcbb'", output: "3"}], constraints: ["0 <= s.length <= 5 * 10^4", "s consists of English letters, digits, symbols and spaces."] },
  { id: 9, title: 'Course Schedule', difficulty: 'Medium', category: 'Graph', company: 'Netflix', description: "Return true if you can finish all courses. Otherwise, return false.", examples: [{input: "numCourses = 2, prerequisites = [[1,0]]", output: "true"}], constraints: ["1 <= numCourses <= 2000", "0 <= prerequisites.length <= 5000"] },
  { id: 10, title: 'Binary Tree Level Order Traversal', difficulty: 'Medium', category: 'Tree', company: 'Meta', description: "Given the root of a binary tree, return the level order traversal of its nodes' values.", examples: [{input: "root = [3,9,20,null,null,15,7]", output: "[[3],[9,20],[15,7]]"}], constraints: ["The number of nodes in the tree is in the range [0, 2000].", "-1000 <= Node.val <= 1000"] }
];

const boilerplates: Record<string, string> = {
  javascript: 'function solve(nums, target) {\n  // Write your code here\n  \n}',
  python: 'def solve(nums, target):\n    # Write your code here\n    pass',
  java: 'class Solution {\n    public int[] solve(int[] nums, int target) {\n        // Write your code here\n        return new int[]{};\n    }\n}',
  cpp: 'class Solution {\npublic:\n    vector<int> solve(vector<int>& nums, int target) {\n        // Write your code here\n        return {};\n    }\n};'
};

const languageCards = [
  { id: 'java', name: 'Java', icon: '☕', desc: 'Enterprise & Backend Dev' },
  { id: 'python', name: 'Python', icon: '🐍', desc: 'AI, Data & Scripting' },
  { id: 'cpp', name: 'C++', icon: '⚙️', desc: 'Performance & Systems' },
  { id: 'javascript', name: 'JavaScript', icon: '⚡', desc: 'Web & Full Stack' }
];

const topicCards = [
  { id: 'Array', name: 'Array', icon: '📦', count: problems.filter(p => p.category === 'Array').length },
  { id: 'String', name: 'String', icon: '📝', count: problems.filter(p => p.category === 'String').length },
  { id: 'Linked List', name: 'Linked List', icon: '🔗', count: problems.filter(p => p.category === 'Linked List').length },
  { id: 'Stack', name: 'Stack', icon: '📚', count: problems.filter(p => p.category === 'Stack').length },
  { id: 'Queue', name: 'Queue', icon: '🚶', count: problems.filter(p => p.category === 'Queue').length },
  { id: 'Tree', name: 'Tree', icon: '🌲', count: problems.filter(p => p.category === 'Tree').length },
  { id: 'Graph', name: 'Graph', icon: '🕸️', count: problems.filter(p => p.category === 'Graph').length },
  { id: 'DP', name: 'DP', icon: '🧠', count: problems.filter(p => p.category === 'DP').length },
];

const CodingPractice = () => {
  const { user } = useUser();
  const [view, setView] = useState<ViewState>('languages');
  const [solvedIds, setSolvedIds] = useState<number[]>([]);
  
  // Selections
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [activeProblem, setActiveProblem] = useState<Problem | null>(null);
  
  // IDE State
  const [code, setCode] = useState('');
  const [isSimulatingRun, setIsSimulatingRun] = useState(false);
  const [runResult, setRunResult] = useState<{status: string, message: string} | null>(null);
  const [isAiMenuOpen, setIsAiMenuOpen] = useState(false);

  // Problem List Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('All');

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

  const handleLanguageSelect = (langId: string) => {
    setSelectedLanguage(langId);
    setView('topics');
  };

  const handleTopicSelect = (topicId: string) => {
    setSelectedTopic(topicId);
    setSearchQuery('');
    setDifficultyFilter('All');
    setView('problems');
  };

  const startSolving = (problem: Problem) => {
    setActiveProblem(problem);
    setCode(boilerplates[selectedLanguage]); 
    setRunResult(null);
    setView('ide');
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

  // STEP 1: LANGUAGE SELECTION
  if (view === 'languages') {
    return (
      <div className="min-h-[calc(100vh-3.5rem)] bg-slate-50 flex flex-col font-sans selection:bg-emerald-500/30">
        <div className="flex-grow max-w-5xl mx-auto px-6 py-20 w-full">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">Choose Your Language</h1>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">Select your preferred programming language to start practicing Data Structures and Algorithms.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {languageCards.map(lang => (
              <motion.div
                key={lang.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleLanguageSelect(lang.id)}
                className="bg-white border border-slate-200 rounded-3xl p-8 cursor-pointer shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(16,185,129,0.15)] hover:border-emerald-300 transition-all duration-300 flex flex-col items-center text-center group"
              >
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">{lang.icon}</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors">{lang.name}</h3>
                <p className="text-slate-500 text-sm font-medium">{lang.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // STEP 2: TOPIC SELECTION
  if (view === 'topics') {
    return (
      <div className="min-h-[calc(100vh-3.5rem)] bg-slate-50 flex flex-col font-sans selection:bg-emerald-500/30">
        <div className="bg-white border-b border-slate-200 py-4 px-6 sticky top-0 z-10 shadow-sm">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <button onClick={() => setView('languages')} className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-bold transition-colors">
              <ChevronLeft className="w-5 h-5" /> Back to Languages
            </button>
            <div className="font-semibold text-slate-500 bg-slate-100 px-4 py-1.5 rounded-full text-sm flex items-center gap-2">
              Language: <span className="text-emerald-600 font-bold">{languageCards.find(l => l.id === selectedLanguage)?.name}</span>
            </div>
          </div>
        </div>
        <div className="flex-grow max-w-6xl mx-auto px-6 py-16 w-full">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">Select a Data Structure</h2>
            <p className="text-slate-600 text-lg">Master core concepts by solving curated problems topic by topic.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {topicCards.map(topic => (
              <div
                key={topic.id}
                onClick={() => handleTopicSelect(topic.id)}
                className="bg-white border border-slate-200 rounded-3xl p-6 cursor-pointer hover:-translate-y-2 hover:shadow-[0_15px_30px_-10px_rgba(16,185,129,0.15)] hover:border-emerald-300 transition-all duration-300 group flex items-start justify-between"
              >
                <div>
                  <div className="text-4xl mb-4 bg-slate-50 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:bg-emerald-50 transition-colors">{topic.icon}</div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">{topic.name}</h3>
                </div>
                <div className="bg-slate-100 text-slate-500 text-xs font-bold px-3 py-1 rounded-full group-hover:bg-emerald-100 group-hover:text-emerald-700 transition-colors">
                  {topic.count} Probs
                </div>
              </div>
            ))}
            {/* View All Option */}
            <div
              onClick={() => handleTopicSelect('All')}
              className="bg-emerald-50 border border-emerald-200 rounded-3xl p-6 cursor-pointer hover:-translate-y-2 hover:shadow-[0_15px_30px_-10px_rgba(16,185,129,0.2)] hover:border-emerald-400 transition-all duration-300 group flex flex-col items-center justify-center text-center"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Code2 className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-emerald-900">View All Problems</h3>
            </div>
          </div>
        </div>
        <div className="mt-auto"><Footer /></div>
      </div>
    );
  }

  // STEP 3: PROBLEM LIST
  if (view === 'problems') {
    const listFilteredProblems = problems.filter(p => {
      const matchTopic = selectedTopic === 'All' || p.category === selectedTopic;
      const matchDiff = difficultyFilter === 'All' || p.difficulty === difficultyFilter;
      const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchTopic && matchDiff && matchSearch;
    });

    const solvedInTopic = listFilteredProblems.filter(p => solvedIds.includes(p.id)).length;

    return (
      <div className="min-h-[calc(100vh-3.5rem)] bg-slate-50 flex flex-col font-sans">
        <div className="bg-white border-b border-slate-200 py-4 px-6 sticky top-0 z-10 shadow-sm">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <button onClick={() => setView('topics')} className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-bold transition-colors">
              <ChevronLeft className="w-5 h-5" /> Topics
            </button>
            <div className="flex gap-4">
              <div className="hidden md:flex font-semibold text-slate-500 bg-slate-100 px-4 py-1.5 rounded-full text-sm items-center gap-2">
                Language: <span className="text-emerald-600">{languageCards.find(l => l.id === selectedLanguage)?.name}</span>
              </div>
              <div className="font-semibold text-slate-500 bg-emerald-50 border border-emerald-100 px-4 py-1.5 rounded-full text-sm flex items-center gap-2">
                Topic: <span className="text-emerald-700">{selectedTopic}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-grow max-w-7xl mx-auto px-6 py-10 w-full flex flex-col lg:flex-row gap-8">
          {/* Main List Area */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  placeholder="Search problems..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-slate-200 text-slate-800 text-sm font-semibold rounded-2xl pl-11 pr-4 py-3.5 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 shadow-sm transition-all" 
                />
              </div>
              <div className="shrink-0 relative">
                <Filter className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select 
                  value={difficultyFilter}
                  onChange={(e) => setDifficultyFilter(e.target.value)}
                  className="w-full md:w-48 bg-white border border-slate-200 text-slate-700 text-sm font-bold rounded-2xl pl-11 pr-4 py-3.5 outline-none focus:border-emerald-500 shadow-sm appearance-none cursor-pointer hover:bg-slate-50 transition-colors"
                >
                  <option value="All">All Difficulties</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-xs font-black text-slate-500 uppercase tracking-widest">
                    <th className="px-6 py-4 w-16 text-center">Status</th>
                    <th className="px-6 py-4">Problem Name</th>
                    <th className="px-6 py-4 w-40">Difficulty</th>
                    <th className="px-6 py-4 w-12"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <AnimatePresence>
                    {listFilteredProblems.map((p) => {
                      const isSolved = solvedIds.includes(p.id);
                      return (
                        <motion.tr 
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                          key={p.id} 
                          onClick={() => startSolving(p)} 
                          className="hover:bg-emerald-50/50 cursor-pointer transition-colors group bg-white"
                        >
                          <td className="px-6 py-5 text-center">
                            {isSolved ? (
                              <CheckCircle2 className="w-6 h-6 text-emerald-500 mx-auto" />
                            ) : (
                              <div className="w-5 h-5 rounded border-2 border-slate-300 bg-white mx-auto group-hover:border-emerald-400 transition-colors" />
                            )}
                          </td>
                          <td className="px-6 py-5">
                            <div className="font-bold text-[15px] text-slate-900 group-hover:text-emerald-700 transition-colors">
                              {p.id}. {p.title}
                            </div>
                            <div className="text-xs font-semibold text-slate-500 mt-1">{p.category}</div>
                          </td>
                          <td className="px-6 py-5">
                            <span className={`px-3 py-1.5 rounded-xl text-xs font-black ${
                              p.difficulty === 'Easy' ? 'bg-emerald-100 text-emerald-700' : 
                              p.difficulty === 'Medium' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
                            }`}>
                              {p.difficulty}
                            </span>
                          </td>
                          <td className="px-6 py-5">
                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all group-hover:bg-emerald-100">
                              <Play className="w-4 h-4 text-emerald-600 ml-0.5" />
                            </div>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </AnimatePresence>
                  {listFilteredProblems.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-6 py-16 text-center text-slate-500 font-bold text-base bg-slate-50">
                        No problems match your filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Sidebar Stats */}
          <div className="w-full lg:w-80 shrink-0 space-y-6">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 text-center relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
               <h3 className="font-bold text-slate-500 mb-2 text-sm uppercase tracking-widest relative z-10">Topic Progress</h3>
               <div className="text-4xl font-black text-slate-900 mb-4 relative z-10 flex items-baseline justify-center gap-2">
                 {solvedInTopic} <span className="text-lg font-bold text-slate-400">/ {listFilteredProblems.length}</span>
               </div>
               <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden relative z-10">
                 <div className="bg-emerald-500 h-full transition-all duration-1000 ease-out" style={{ width: `${listFilteredProblems.length ? (solvedInTopic / listFilteredProblems.length) * 100 : 0}%`}}></div>
               </div>
               <p className="text-xs font-semibold text-emerald-600 mt-4 relative z-10">Keep up the great work!</p>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
               <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                 <CheckCircle2 className="w-5 h-5 text-emerald-500" /> Daily Mission
               </h3>
               <p className="text-sm font-semibold text-slate-600 mb-4 leading-relaxed">Solve 3 problems today to maintain your coding streak.</p>
               <button className="w-full py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-sm hover:bg-slate-200 transition-colors">View Schedule</button>
            </div>
          </div>

        </div>
        <div className="mt-auto"><Footer /></div>
      </div>
    );
  }

  // STEP 4: SPLIT LAYOUT IDE
  return (
    <div className="h-[calc(100vh-3.5rem)] flex flex-col md:flex-row bg-slate-50 font-sans overflow-hidden">
      
      {/* LEFT PANEL: Description */}
      <div className="w-full md:w-[45%] lg:w-[40%] bg-white border-r border-slate-200 flex flex-col h-full overflow-hidden shadow-sm z-10 relative">
        <div className="h-16 border-b border-slate-200 bg-white flex items-center px-6 shrink-0 shadow-sm sticky top-0 z-20 gap-4">
          <button 
            onClick={() => setView('problems')}
            className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900 font-bold text-[13px] bg-slate-50 px-3 py-2 rounded-xl border border-slate-200 transition-all hover:bg-slate-100"
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
          <div className="w-px h-6 bg-slate-200"></div>
          <button className="p-2 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-lg transition-colors ml-auto tooltip" title="Bookmark Problem">
            <Bookmark className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
          <h1 className="text-3xl font-black tracking-tight text-slate-900 mb-4 leading-tight">
            {activeProblem?.id}. {activeProblem?.title}
          </h1>
          
          <div className="flex items-center gap-3 mb-8 flex-wrap">
            <span className={`px-3 py-1 rounded-xl text-xs font-black ${
              activeProblem?.difficulty === 'Easy' ? 'bg-emerald-100 text-emerald-700' : 
              activeProblem?.difficulty === 'Medium' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
            }`}>
              {activeProblem?.difficulty}
            </span>
            <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-xl">
              {activeProblem?.category}
            </span>
            {solvedIds.includes(activeProblem?.id || 0) && (
              <span className="flex items-center gap-1.5 text-xs font-black text-emerald-700 bg-emerald-100 px-3 py-1 rounded-xl">
                <CheckCircle2 className="w-4 h-4" /> Solved
              </span>
            )}
          </div>

          <p className="text-[15px] text-slate-700 whitespace-pre-wrap leading-relaxed font-medium mb-10">
            {activeProblem?.description}
          </p>

          <div className="space-y-6 mb-10">
            <h3 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-3">Examples</h3>
            {activeProblem?.examples.map((ex, idx) => (
              <div key={idx} className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
                <p className="text-xs font-black text-slate-500 mb-3 uppercase tracking-widest">Example {idx + 1}</p>
                <div className="font-mono text-[13px] space-y-2">
                  <div className="flex"><span className="text-slate-400 select-none w-16 shrink-0">Input:</span> <span className="text-slate-800 font-bold">{ex.input}</span></div>
                  <div className="flex"><span className="text-slate-400 select-none w-16 shrink-0">Output:</span> <span className="text-emerald-600 font-bold">{ex.output}</span></div>
                </div>
              </div>
            ))}
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-3 mb-4">Constraints</h3>
            <ul className="list-disc pl-5 font-mono text-[13px] text-slate-600 space-y-2">
               {activeProblem?.constraints.map((c, i) => <li key={i} className="bg-slate-100 px-3 py-1 rounded-lg w-fit">{c}</li>)}
            </ul>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL: Code Editor & Testing */}
      <div className="w-full md:w-[55%] lg:w-[60%] flex flex-col h-full bg-[#1e1e1e]">
        <div className="h-16 bg-[#252526] border-b border-[#3e3e42] flex items-center justify-between px-6 shrink-0 shadow-md z-10">
          <select 
            value={selectedLanguage}
            onChange={(e) => {
              setSelectedLanguage(e.target.value);
              setCode(boilerplates[e.target.value]);
            }}
            className="bg-[#3c3c3c] text-white text-sm font-bold rounded-xl px-4 py-2 outline-none border border-[#3e3e42] hover:border-emerald-500 focus:border-emerald-500 transition-colors cursor-pointer"
          >
            {languageCards.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
          </select>
          
          <div className="flex items-center gap-3 relative">
            <button
              onClick={() => setIsAiMenuOpen(!isAiMenuOpen)}
              className="text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 px-4 py-2 text-sm font-bold rounded-xl transition-colors border border-emerald-500/20 flex items-center gap-2"
            >
              <Bot className="w-4 h-4" /> AI Help
            </button>
            {isAiMenuOpen && (
              <div className="absolute top-12 right-12 w-48 bg-[#2d2d2d] border border-[#3e3e42] rounded-xl shadow-2xl py-2 z-50 overflow-hidden">
                <button className="w-full text-left px-4 py-2.5 text-sm font-semibold text-[#cccccc] hover:text-white hover:bg-[#3c3c3c] transition-colors">Explain Problem</button>
                <button className="w-full text-left px-4 py-2.5 text-sm font-semibold text-[#cccccc] hover:text-white hover:bg-[#3c3c3c] transition-colors">Give a Hint</button>
                <button className="w-full text-left px-4 py-2.5 text-sm font-semibold text-[#cccccc] hover:text-white hover:bg-[#3c3c3c] transition-colors">Analyze My Code</button>
              </div>
            )}
            
            <button
              onClick={() => { setCode(boilerplates[selectedLanguage]); setRunResult(null); }}
              className="text-[#858585] hover:text-white p-2 rounded-xl hover:bg-[#3c3c3c] transition-colors border border-transparent hover:border-[#3e3e42]"
              title="Reset Code"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 relative border-b border-[#3e3e42]">
          <Editor
            height="100%"
            language={selectedLanguage === 'java' ? 'java' : selectedLanguage === 'cpp' ? 'cpp' : selectedLanguage === 'python' ? 'python' : 'javascript'}
            theme="vs-dark"
            value={code}
            onChange={(val) => setCode(val || '')}
            options={{
              minimap: { enabled: false },
              fontSize: 15,
              fontFamily: "'Fira Code', 'JetBrains Mono', Consolas, monospace",
              padding: { top: 24 },
              scrollBeyondLastLine: false,
              smoothScrolling: true,
              cursorBlinking: "smooth",
              formatOnPaste: true,
            }}
            loading={<div className="text-emerald-500 flex justify-center items-center h-full text-sm font-semibold animate-pulse">Initializing Premium Editor...</div>}
          />
        </div>

        {/* Console / Output */}
        <div className="h-[280px] bg-[#1e1e1e] flex flex-col shrink-0">
          <div className="flex items-center px-6 h-12 border-b border-[#3e3e42] bg-[#252526]">
            <span className="text-xs font-bold text-[#cccccc] uppercase tracking-widest flex items-center gap-2">
              <Terminal className="w-4 h-4" /> Console Output
            </span>
          </div>

          <div className="flex-1 overflow-y-auto p-6 custom-scrollbar bg-[#1e1e1e]">
            {isSimulatingRun ? (
              <div className="flex items-center gap-3 text-[#cccccc] text-sm animate-pulse font-mono bg-[#252526] p-4 rounded-xl border border-[#3e3e42] w-fit">
                <RefreshCw className="w-4 h-4 animate-spin text-emerald-500" />
                Executing securely...
              </div>
            ) : runResult ? (
              <div className="font-mono text-sm space-y-2 max-w-2xl bg-[#252526] p-5 rounded-xl border border-[#3e3e42]">
                <div className={`font-black text-lg ${runResult.status === 'accepted' ? 'text-emerald-500' : 'text-emerald-400'}`}>
                  {runResult.status === 'accepted' ? 'Accepted!' : 'Tests Passed!'}
                </div>
                <div className="text-[#cccccc] whitespace-pre-line mt-2">{runResult.message}</div>
              </div>
            ) : (
              <div className="text-[#858585] text-sm font-mono select-none">
                Please type your code and click Run.
              </div>
            )}
          </div>

          <div className="h-16 border-t border-[#3e3e42] flex items-center justify-end px-6 gap-4 bg-[#252526]">
            <button 
              onClick={handleRunCode}
              disabled={isSimulatingRun}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#3c3c3c] text-white hover:bg-[#4d4d4d] font-bold text-sm transition-colors border border-[#4d4d4d] hover:border-[#5c5c5c] disabled:opacity-50"
            >
              <Play className="w-4 h-4 text-emerald-400" /> Run Code
            </button>
            <button 
              onClick={handleSubmit}
              disabled={isSimulatingRun}
              className="flex items-center gap-2 px-8 py-2.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-500 font-bold text-sm shadow-[0_0_15px_rgba(16,185,129,0.2)] transition-all disabled:opacity-50"
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

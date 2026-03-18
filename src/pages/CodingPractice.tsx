import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Play,
  Send,
  ChevronLeft,
  ChevronDown,
  CheckCircle2,
  Circle,
  Clock,
  Zap,
  LayoutDashboard,
  Code2,
  Map,
  Bot,
  ChevronRight,
  Settings,
  Bell,
  Menu,
  X,
  FileText,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────
interface Problem {
  id: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topic: string;
  completed: boolean;
}

// ─── Mock data ────────────────────────────────────────────────────────────────
const ALL_PROBLEMS: Problem[] = [
  { id: 1,  title: 'Two Sum',                        difficulty: 'Easy',   topic: 'Arrays',        completed: true  },
  { id: 2,  title: 'Valid Parentheses',              difficulty: 'Easy',   topic: 'Stack',         completed: true  },
  { id: 3,  title: 'Reverse Linked List',            difficulty: 'Easy',   topic: 'Linked List',   completed: false },
  { id: 4,  title: 'Maximum Subarray',               difficulty: 'Medium', topic: 'Arrays',        completed: false },
  { id: 5,  title: 'Merge K Sorted Lists',           difficulty: 'Hard',   topic: 'Linked List',   completed: false },
  { id: 6,  title: 'Climbing Stairs',                difficulty: 'Easy',   topic: 'DP',            completed: true  },
  { id: 7,  title: 'Binary Tree Level Order',        difficulty: 'Medium', topic: 'Trees',         completed: false },
  { id: 8,  title: 'Number of Islands',              difficulty: 'Medium', topic: 'Graphs',        completed: false },
  { id: 9,  title: 'LRU Cache',                      difficulty: 'Hard',   topic: 'Design',        completed: false },
  { id: 10, title: 'Coin Change',                    difficulty: 'Medium', topic: 'DP',            completed: false },
  { id: 11, title: 'Find Minimum in Rotated Array',  difficulty: 'Medium', topic: 'Binary Search', completed: false },
  { id: 12, title: 'Word Break',                     difficulty: 'Medium', topic: 'DP',            completed: false },
];

const LANGUAGES = ['C++', 'Java', 'Python', 'JavaScript'];
const DIFFICULTIES = ['All', 'Easy', 'Medium', 'Hard'];
const TOPICS = ['All', 'Arrays', 'Stack', 'Linked List', 'DP', 'Trees', 'Graphs', 'Design', 'Binary Search'];

// ─── Default starter code per problem ────────────────────────────────────────
const STARTER: Record<string, Record<string, string>> = {
  'C++': {
    default: `#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    // Write your solution here\n    \n};\n\nint main() {\n    Solution sol;\n    // Test your solution\n    return 0;\n}`,
    'Two Sum': `#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        unordered_map<int,int> mp;\n        for (int i = 0; i < nums.size(); i++) {\n            int complement = target - nums[i];\n            if (mp.count(complement))\n                return {mp[complement], i};\n            mp[nums[i]] = i;\n        }\n        return {};\n    }\n};`,
    'Reverse Linked List': `#include <bits/stdc++.h>\nusing namespace std;\n\nstruct ListNode {\n    int val;\n    ListNode* next;\n    ListNode(int x) : val(x), next(nullptr) {}\n};\n\nclass Solution {\npublic:\n    ListNode* reverseList(ListNode* head) {\n        ListNode* prev = nullptr;\n        ListNode* curr = head;\n        while (curr) {\n            ListNode* next = curr->next;\n            curr->next = prev;\n            prev = curr;\n            curr = next;\n        }\n        return prev;\n    }\n};`,
  },
  Java: {
    default: `import java.util.*;\n\nclass Solution {\n    // Write your solution here\n    \n    public static void main(String[] args) {\n        Solution sol = new Solution();\n        // Test your solution\n    }\n}`,
    'Two Sum': `import java.util.*;\n\nclass Solution {\n    public int[] twoSum(int[] nums, int target) {\n        Map<Integer, Integer> map = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int complement = target - nums[i];\n            if (map.containsKey(complement))\n                return new int[]{map.get(complement), i};\n            map.put(nums[i], i);\n        }\n        return new int[]{};\n    }\n}`,
  },
  Python: {
    default: `from typing import List, Optional\n\nclass Solution:\n    # Write your solution here\n    pass\n\nif __name__ == "__main__":\n    sol = Solution()\n    # Test your solution`,
    'Two Sum': `from typing import List\n\nclass Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        seen = {}\n        for i, num in enumerate(nums):\n            complement = target - num\n            if complement in seen:\n                return [seen[complement], i]\n            seen[num] = i\n        return []`,
    'Reverse Linked List': `class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\nclass Solution:\n    def reverseList(self, head: ListNode) -> ListNode:\n        prev, curr = None, head\n        while curr:\n            nxt = curr.next\n            curr.next = prev\n            prev = curr\n            curr = nxt\n        return prev`,
  },
  JavaScript: {
    default: `/**\n * @param {number[]} nums\n * @return {number[]}\n */\nvar solution = function() {\n    // Write your solution here\n    \n};\n\n// Test your solution`,
    'Two Sum': `/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nvar twoSum = function(nums, target) {\n    const map = new Map();\n    for (let i = 0; i < nums.length; i++) {\n        const complement = target - nums[i];\n        if (map.has(complement)) return [map.get(complement), i];\n        map.set(nums[i], i);\n    }\n    return [];\n};`,
  },
};

// ─── Sidebar nav ──────────────────────────────────────────────────────────────
const navItems = [
  { id: 'overview',  label: 'Overview',        icon: <LayoutDashboard className="w-5 h-5" />, path: '/dashboard' },
  { id: 'coding',    label: 'Coding Practice', icon: <Code2           className="w-5 h-5" />, path: '/practice'  },
  { id: 'roadmaps',  label: 'Roadmaps',        icon: <Map             className="w-5 h-5" />, path: '/roadmaps'  },
  { id: 'ai-mentor', label: 'AI Mentor',       icon: <Bot             className="w-5 h-5" />, path: '/ai-mentor' },
];

// ─── Difficulty badge ─────────────────────────────────────────────────────────
const DiffBadge = ({ level }: { level: string }) => {
  const styles: Record<string, string> = {
    Easy:   'bg-green-100 text-green-700 border-green-200',
    Medium: 'bg-amber-100   text-amber-700   border-amber-200',
    Hard:   'bg-red-100     text-red-700     border-red-200',
  };
  return (
    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${styles[level] ?? ''}`}>
      {level}
    </span>
  );
};

// ─── Select dropdown ──────────────────────────────────────────────────────────
const Select = ({
  label, value, options, onChange,
}: {
  label: string; value: string; options: string[]; onChange: (v: string) => void;
}) => (
  <div className="relative">
    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{label}</label>
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none bg-white text-slate-700 text-sm rounded-lg px-3 py-2 pr-8 border border-slate-200 focus:outline-none focus:border-green-500 cursor-pointer shadow-sm"
      >
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
    </div>
  </div>
);

// ─── Code line with basic syntax colouring (pure CSS illusion) ───────────────
const CodeLine = ({ line, num }: { line: string; num: number }) => {
  // Simple tokeniser for visual effect – NOT a real parser
  const coloured = line
    .replace(/(\/\/.*$)/g,                            '<span class="text-slate-500">$1</span>')
    .replace(/\b(class|public|private|void|int|return|if|else|for|while|new|import|from|def|self|let|const|var|function)\b/g,
                                                      '<span class="text-violet-400">$1</span>')
    .replace(/\b(true|false|null|None|nullptr|undefined)\b/g, '<span class="text-orange-400">$1</span>')
    .replace(/"([^"]*)"/g,                            '<span class="text-amber-300">"$1"</span>')
    .replace(/'([^']*)'/g,                            "<span class=\"text-amber-300\">'$1'</span>")
    .replace(/\b(\d+)\b/g,                            '<span class="text-sky-400">$1</span>');

  return (
    <div className="flex group hover:bg-slate-50">
      <span className="select-none w-10 shrink-0 text-right pr-4 text-slate-300 text-xs leading-6 group-hover:text-slate-400">
        {num}
      </span>
      <span
        className="text-slate-700 text-xs leading-6 font-mono whitespace-pre flex-1"
        dangerouslySetInnerHTML={{ __html: coloured || '&nbsp;' }}
      />
    </div>
  );
};

// ═════════════════════════════════════════════════════════════════════════════
export const CodingPractice = () => {
  const navigate = useNavigate();

  // Filter state
  const [lang, setLang]       = useState('C++');
  const [diff, setDiff]       = useState('All');
  const [topic, setTopic]     = useState('All');

  // Problem state
  const [selected, setSelected] = useState<Problem>(ALL_PROBLEMS[0]);

  // Editor state
  const [code, setCode] = useState(() => STARTER['C++']['Two Sum'] ?? STARTER['C++'].default);
  const [output, setOutput]   = useState('');
  const [running, setRunning] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Sidebar
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Filtered list
  const filtered = ALL_PROBLEMS.filter((p) => {
    if (diff  !== 'All' && p.difficulty !== diff)  return false;
    if (topic !== 'All' && p.topic !== topic)       return false;
    return true;
  });

  // When language or problem changes, update starter code
  const selectProblem = (p: Problem) => {
    setSelected(p);
    const langStarter = STARTER[lang] ?? STARTER['C++'];
    setCode(langStarter[p.title] ?? langStarter.default);
    setOutput('');
    setSubmitted(false);
  };

  const selectLang = (l: string) => {
    setLang(l);
    const langStarter = STARTER[l] ?? STARTER['C++'];
    setCode(langStarter[selected.title] ?? langStarter.default);
  };

  const handleRun = () => {
    setRunning(true);
    setOutput('');
    setTimeout(() => {
      setRunning(false);
      setOutput(
        `> Running test cases for "${selected.title}"...\n\nTest 1: nums=[2,7,11,15], target=9  →  Output: [0,1]  ✅\nTest 2: nums=[3,2,4],    target=6   →  Output: [1,2]  ✅\nTest 3: nums=[3,3],      target=6   →  Output: [0,1]  ✅\n\nAll sample tests passed in 12 ms  🎉`
      );
    }, 1400);
  };

  const handleSubmit = () => {
    setRunning(true);
    setOutput('');
    setTimeout(() => {
      setRunning(false);
      setSubmitted(true);
      setOutput(
        `> Submitting "${selected.title}"...\n\n✅  Accepted!\nRuntime: 4 ms  (beats 97.3% of C++ solutions)\nMemory:  8.4 MB (beats 81.6% of C++ solutions)\n\nAll 29/29 test cases passed. Well done! 🚀`
      );
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white flex text-slate-900 font-sans">

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ══ SIDEBAR ══ */}
      <aside className={`
        fixed top-0 left-0 h-screen w-60 bg-white border-r border-slate-100
        flex flex-col z-50 transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto lg:shadow-none
      `}>
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <button className="flex items-center gap-2" onClick={() => navigate('/')}>
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-xs">P</span>
            </div>
            <span className="text-base font-bold text-slate-900 tracking-tight">PrepForge</span>
          </button>
          <button className="lg:hidden text-slate-400" onClick={() => setSidebarOpen(false)}><X className="w-4 h-4" /></button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = item.id === 'coding';
            return (
              <button
                key={item.id}
                onClick={() => { navigate(item.path); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-green-50 text-green-700 border border-green-100'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <span className={isActive ? 'text-green-600' : ''}>{item.icon}</span>
                {item.label}
                {isActive && <ChevronRight className="w-3.5 h-3.5 ml-auto text-green-400" />}
              </button>
            );
          })}
        </nav>

        {/* User */}
        <div className="px-3 py-4 border-t border-slate-100">
          <div className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-50 transition cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-green-500 flex items-center justify-center text-white font-bold text-xs shadow-sm">S</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-800 truncate">Student</p>
              <p className="text-xs text-slate-400 truncate">Free Plan</p>
            </div>
            <Settings className="w-4 h-4 text-slate-400 flex-shrink-0" />
          </div>
        </div>
      </aside>

      {/* ══ MAIN ══ */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-100 px-5 py-3 flex items-center gap-4">
          <button className="lg:hidden text-slate-400 hover:text-green-400" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-5 h-5" />
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-1.5 text-slate-400 hover:text-green-400 transition text-sm font-semibold"
          >
            <ChevronLeft className="w-4 h-4" /> Dashboard
          </button>
          <div className="h-5 w-px bg-slate-700" />
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-green-600" />
            <span className="text-slate-900 font-bold text-sm">Coding Practice</span>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/10 text-green-400 text-xs font-semibold border border-green-500/20">
              <Zap className="w-3 h-3" /> 5-Day Streak
            </div>
            <button className="relative p-2 rounded-xl hover:bg-slate-800 text-slate-400">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-green-500" />
            </button>
          </div>
        </header>

        {/* Body — three-column layout */}
        <div className="flex flex-1 overflow-hidden">

          {/* ── LEFT PANEL ── */}
          <div className="w-72 shrink-0 bg-white border-r border-slate-100 flex flex-col overflow-hidden">

            {/* Filters */}
            <div className="p-4 border-b border-slate-100 space-y-3">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Filters</p>
              <Select label="Language"   value={lang}  options={LANGUAGES}    onChange={selectLang} />
              <Select label="Difficulty" value={diff}  options={DIFFICULTIES} onChange={setDiff}    />
              <Select label="Topic"      value={topic} options={TOPICS}       onChange={setTopic}   />
            </div>

            {/* Stats strip */}
            <div className="flex divide-x divide-slate-100 border-b border-slate-100">
              {[
                { label: 'Easy',   count: ALL_PROBLEMS.filter(p => p.difficulty === 'Easy').length,   color: 'text-green-400' },
                { label: 'Medium', count: ALL_PROBLEMS.filter(p => p.difficulty === 'Medium').length, color: 'text-amber-400'   },
                { label: 'Hard',   count: ALL_PROBLEMS.filter(p => p.difficulty === 'Hard').length,   color: 'text-red-400'     },
              ].map((s) => (
                <div key={s.label} className="flex-1 text-center py-2">
                  <p className={`text-base font-bold ${s.color}`}>{s.count}</p>
                  <p className="text-[10px] text-slate-500 font-semibold">{s.label}</p>
                </div>
              ))}
            </div>

                {/* Problem list */}
            <div className="flex-1 overflow-y-auto">
              {filtered.length === 0 ? (
                <p className="text-center text-slate-400 text-sm mt-8">No problems match.</p>
              ) : (
                filtered.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => selectProblem(p)}
                    className={`w-full flex items-start gap-3 px-4 py-3.5 border-b border-slate-50 text-left transition-all hover:bg-slate-50 ${
                      selected.id === p.id ? 'bg-green-50/50 border-l-4 border-l-green-500' : ''
                    }`}
                  >
                    {p.completed
                      ? <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                      : <Circle       className="w-4 h-4 text-slate-300 mt-0.5 shrink-0" />
                    }
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-semibold truncate ${selected.id === p.id ? 'text-slate-900' : 'text-slate-700'}`}>
                        {p.id}. {p.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <DiffBadge level={p.difficulty} />
                        <span className="text-[10px] text-slate-400">{p.topic}</span>
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* ── RIGHT EDITOR PANEL ── */}
          <div className="flex-1 flex flex-col bg-white min-w-0">

            {/* Problem header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                {submitted && <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />}
                <h2 className="text-base font-bold text-slate-900 truncate">{selected.id}. {selected.title}</h2>
                <DiffBadge level={selected.difficulty} />
              </div>
              <div className="flex items-center gap-2 shrink-0 text-slate-400 text-xs font-semibold">
                <Clock className="w-3.5 h-3.5" /> <span>45 min</span>
              </div>
            </div>

            {/* Editor tabs */}
            <div className="flex items-center gap-1 px-4 py-2 bg-slate-50 border-b border-slate-100">
              {['solution', 'description', 'testcases'].map((tab) => (
                <button key={tab} className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                  tab === 'solution' ? 'bg-white text-slate-900 shadow-sm border border-slate-100' : 'text-slate-500 hover:text-slate-800'
                }`}>
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
              <div className="ml-auto flex items-center gap-2">
                <FileText className="w-3.5 h-3.5 text-slate-500" />
                <span className="text-xs text-slate-500 font-mono">{lang}</span>
              </div>
            </div>

            {/* Code area */}
            <div className="flex-1 overflow-auto bg-white relative">
              <div className="absolute inset-0 overflow-auto">
                {code.split('\n').map((line, i) => (
                  <CodeLine key={i} line={line} num={i + 1} />
                ))}
              </div>
              {/* Invisible textarea overlay for editing */}
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                spellCheck={false}
                className="absolute inset-0 w-full h-full bg-transparent text-transparent caret-green-400 font-mono text-xs leading-6 pl-10 pr-4 py-0 resize-none focus:outline-none z-10"
                style={{ caretColor: '#22c55e' }}
              />
            </div>

            {/* Output console */}
            {output && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="border-t border-slate-100 bg-slate-50 px-5 py-4 max-h-44 overflow-y-auto"
              >
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Console Output</p>
                <pre className="text-xs text-slate-700 font-mono whitespace-pre-wrap leading-5">{output}</pre>
              </motion.div>
            )}

            {/* Bottom action bar */}
            <div className="border-t border-slate-100 bg-white px-5 py-3 flex items-center gap-3">
              <button
                onClick={handleRun}
                disabled={running}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold transition-all disabled:opacity-60"
              >
                {running ? (
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                ) : (
                  <Play className="w-4 h-4 fill-white" />
                )}
                Run Code
              </button>

              <button
                onClick={handleSubmit}
                disabled={running}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white text-sm font-bold transition-all shadow hover:shadow-green-500/30 disabled:opacity-60"
              >
                {running ? (
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                Submit
              </button>

              <div className="ml-auto flex items-center gap-2 text-xs text-slate-500 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                {ALL_PROBLEMS.filter(p => p.completed).length}/{ALL_PROBLEMS.length} Solved
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

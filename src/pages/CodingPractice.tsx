import { useState, useEffect } from 'react';
import { Play, CheckCircle2, TerminalSquare, AlertCircle, Filter } from 'lucide-react';
import Footer from '../components/Footer';
import { useUser } from '../context/UserContext';
import { supabase } from '../lib/supabase';
import { toast } from 'react-hot-toast';
import PomodoroTimer from '../components/PomodoroTimer';

type Difficulty = 'Easy' | 'Medium' | 'Hard';

interface Problem {
  id: number;
  title: string;
  difficulty: Difficulty;
  category: string;
  acceptance: string;
}

const problems: Problem[] = [
  { id: 1, title: 'Two Sum', difficulty: 'Easy', category: 'Arrays & Hashing', acceptance: '51.2%' },
  { id: 2, title: 'Valid Parentheses', difficulty: 'Easy', category: 'Stack', acceptance: '40.4%' },
  { id: 3, title: 'Merge Intervals', difficulty: 'Medium', category: 'Arrays', acceptance: '46.8%' },
  { id: 4, title: 'LRU Cache', difficulty: 'Medium', category: 'Linked List', acceptance: '41.1%' },
  { id: 5, title: 'Trapping Rain Water', difficulty: 'Hard', category: 'Two Pointers', acceptance: '59.3%' },
  { id: 6, title: 'Word Search II', difficulty: 'Hard', category: 'Trie', acceptance: '38.2%' },
  { id: 7, title: 'Best Time to Buy and Sell Stock', difficulty: 'Easy', category: 'Sliding Window', acceptance: '53.6%' },
  { id: 8, title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', category: 'Sliding Window', acceptance: '33.8%' },
  { id: 9, title: 'Maximum Subarray', difficulty: 'Medium', category: 'Dynamic Programming', acceptance: '50.1%' },
  { id: 10, title: 'Merge k Sorted Lists', difficulty: 'Hard', category: 'Heap / Priority Queue', acceptance: '50.3%' },
  { id: 11, title: 'Container With Most Water', difficulty: 'Medium', category: 'Two Pointers', acceptance: '54.1%' },
  { id: 12, title: 'Reverse Linked List', difficulty: 'Easy', category: 'Linked List', acceptance: '74.8%' },
  { id: 13, title: 'Binary Tree Level Order Traversal', difficulty: 'Medium', category: 'Trees', acceptance: '65.2%' },
  { id: 14, title: 'Climbing Stairs', difficulty: 'Easy', category: 'Dynamic Programming', acceptance: '52.3%' },
  { id: 15, title: 'Course Schedule', difficulty: 'Medium', category: 'Graphs', acceptance: '46.4%' },
];

const CodingPractice = () => {
  const [filter, setFilter] = useState<Difficulty | 'All'>('All');
  const { user } = useUser();
  const [solvedIds, setSolvedIds] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSolvedProblems = async () => {
      if (!user) {
        setSolvedIds([]);
        setIsLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('solved_problems')
          .select('problem_id')
          .eq('user_id', user.id);

        if (error) throw error;

        // Defensive check to always ensure it's a valid array
        if (Array.isArray(data)) {
          setSolvedIds(data.map(row => row.problem_id));
        } else {
          setSolvedIds([]);
        }
      } catch (error) {
        console.error('Error fetching solved problems:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSolvedProblems();
  }, [user]);

  const toggleSolved = async (id: number, e: React.MouseEvent) => {
    e.stopPropagation();

    if (!user) {
      toast.error('Please log in securely to track and save progress!', {
        style: {
          background: '#020617',
          color: '#fff',
          border: '1px solid #334155',
          borderRadius: '12px',
        }
      });
      return;
    }

    // Defensive check taaki array kabhi crash na ho
    const currentSolvedIds = Array.isArray(solvedIds) ? solvedIds : [];
    const isAlreadySolved = currentSolvedIds.includes(id);

    // 1. OPTIMISTIC UI UPDATE (Purana data nahi bhoolega)
    setSolvedIds((prev: number[]) => {
      const prevArray = Array.isArray(prev) ? prev : [];
      if (isAlreadySolved) {
        return prevArray.filter(pId => pId !== id);
      } else {
        return [...prevArray, id];
      }
    });

    // 2. Database Update
    try {
      if (isAlreadySolved) {
        const { error } = await supabase
          .from('solved_problems')
          .delete()
          .match({ user_id: user.id, problem_id: id });

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('solved_problems')
          .insert({ user_id: user.id, problem_id: id });

        if (error) throw error;
      }
    } catch (err: any) {
      console.error("Database Error:", err.message);
      toast.error("Failed to save progress.");

      // Agar fail hua, toh UI ko wapas purani state mein theek karo
      setSolvedIds((prev: number[]) => {
        const prevArray = Array.isArray(prev) ? prev : [];
        if (isAlreadySolved) return [...prevArray, id];
        return prevArray.filter(pId => pId !== id);
      });
    }
  };
  const filteredProblems = filter === 'All' ? problems : problems.filter(p => p.difficulty === filter);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">

      {/* Premium Header */}
      <div className="bg-slate-900 text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-emerald-500/20 rounded-lg border border-emerald-500/30">
                  <TerminalSquare className="w-6 h-6 text-emerald-400" />
                </div>
                <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-white">Premium Practice</h1>
              </div>
              <p className="text-slate-400 max-w-2xl text-[15px] font-medium leading-relaxed">
                Master the most frequently asked interview questions from top tech companies. Track your progress, benchmark against optimal solutions, and forge your coding skills.
              </p>
            </div>

            <div className="flex items-center gap-4 bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50 backdrop-blur-sm shadow-inner">
              <div className="text-center px-4 border-r border-slate-700">
                <span className="block text-2xl font-black text-white tracking-tighter">{solvedIds.length}<span className="text-sm text-slate-400 font-bold ml-0.5">/{problems.length}</span></span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5 block">Solved</span>
              </div>
              <div className="text-center px-4">
                <span className="block text-2xl font-black text-emerald-400 tracking-tighter">1</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5 block">Day Streak</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">

        {/* Timer Section */}
        <div className="mb-10">
          <PomodoroTimer />
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-slate-400" />
            <h3 className="font-bold text-slate-700 text-[15px]">Filter by Difficulty:</h3>
          </div>
          <div className="flex bg-white rounded-xl shadow-sm border border-slate-200 p-1">
            {['All', 'Easy', 'Medium', 'Hard'].map((diff) => (
              <button
                key={diff}
                onClick={() => setFilter(diff as Difficulty | 'All')}
                className={`px-4 py-1.5 rounded-lg text-[13px] font-bold transition-all ${filter === diff
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>

        {/* Problem List */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="grid grid-cols-12 gap-4 p-4 border-b border-slate-100 bg-slate-50/80 text-[12px] font-bold tracking-wider text-slate-500 uppercase">
            <div className="col-span-2 sm:col-span-1 text-center">Status</div>
            <div className="col-span-10 sm:col-span-6 md:col-span-6">Title</div>
            <div className="col-span-2 hidden sm:block text-center">Difficulty</div>
            <div className="col-span-2 hidden md:block text-center">Acceptance</div>
          </div>

          <div className={`divide-y divide-slate-100 transition-opacity duration-300 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
            {filteredProblems.map((problem) => {
              const isSolved = solvedIds.includes(problem.id);
              return (
                <div key={problem.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-slate-50 transition-colors group">

                  {/* Status */}
                  <div className="col-span-2 sm:col-span-1 flex justify-center">
                    <button
                      onClick={(e) => toggleSolved(problem.id, e)}
                      className="focus:outline-none transition-transform active:scale-90"
                    >
                      {isSolved ? (
                        <CheckCircle2 className="w-6 h-6 text-emerald-500 drop-shadow-sm" />
                      ) : (
                        <div className="w-6 h-6 rounded-full border-2 border-slate-200 group-hover:border-slate-300 transition-colors bg-white hover:bg-slate-50" />
                      )}
                    </button>
                  </div>

                  {/* Title and Mobile Difficulty */}
                  <div className="col-span-10 sm:col-span-6 md:col-span-6 flex flex-col items-start pr-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-[14px] font-bold transition-colors ${isSolved ? 'text-slate-500 line-through decoration-slate-300' : 'text-slate-900 group-hover:text-emerald-600'
                        }`}>
                        {problem.id}. {problem.title}
                      </span>
                      {/* Mobile Only Difficulty Tag */}
                      <span className={`sm:hidden px-2 py-0.5 rounded-full text-[10px] font-bold border ${problem.difficulty === 'Easy' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                        problem.difficulty === 'Medium' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                          'bg-rose-50 text-rose-600 border-rose-100'
                        }`}>
                        {problem.difficulty}
                      </span>
                    </div>
                    <span className={`text-[13px] font-medium mt-1 line-clamp-1 ${isSolved ? 'text-slate-400' : 'text-slate-500'}`}>
                      {problem.category}
                    </span>
                  </div>

                  {/* Difficulty (Hidden on Mobile) */}
                  <div className="col-span-2 hidden sm:flex justify-center items-center">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${problem.difficulty === 'Easy' ? 'bg-emerald-50 text-emerald-600' :
                      problem.difficulty === 'Medium' ? 'bg-amber-50 text-amber-600' :
                        'bg-rose-50 text-rose-600'
                      }`}>
                      {problem.difficulty}
                    </span>
                  </div>

                  {/* Acceptance (Hidden on smaller screens) */}
                  <div className={`col-span-2 hidden md:flex justify-center items-center text-[13px] font-semibold ${isSolved ? 'text-slate-400' : 'text-slate-600'}`}>
                    {problem.acceptance}
                  </div>

                  {/* Action button */}
                  <div className="col-span-2 sm:col-span-3 md:col-span-1 flex justify-end items-center pr-2 md:pr-4 ml-auto">
                    <button className="text-slate-400 hover:text-emerald-600 transition-colors sm:opacity-0 group-hover:opacity-100 focus:opacity-100 flex items-center gap-1.5 p-1">
                      <span className="text-[13px] font-bold hidden sm:block">Solve</span>
                      <Play className="w-4 h-4 fill-current" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty State */}
          {filteredProblems.length === 0 && (
            <div className="p-16 text-center text-slate-500 flex flex-col items-center bg-slate-50/50">
              <AlertCircle className="w-10 h-10 text-slate-300 mb-3" />
              <p className="text-[14px] font-semibold text-slate-600">No problems found for this difficulty.</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CodingPractice;

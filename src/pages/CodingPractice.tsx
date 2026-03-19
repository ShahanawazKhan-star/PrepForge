import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Circle, Code2, Search, Filter } from 'lucide-react';

type Difficulty = 'Easy' | 'Medium' | 'Hard';

interface Problem {
  id: number;
  title: string;
  difficulty: Difficulty;
  topic: string;
  status: boolean; // true = solved, false = unsolved
}

const mockProblems: Problem[] = [
  { id: 1, title: 'Two Sum', difficulty: 'Easy', topic: 'Arrays/Hashing', status: true },
  { id: 2, title: 'Valid Parentheses', difficulty: 'Easy', topic: 'Stack', status: true },
  { id: 3, title: 'Merge Intervals', difficulty: 'Medium', topic: 'Arrays', status: false },
  { id: 4, title: 'LRU Cache', difficulty: 'Medium', topic: 'Design', status: false },
  { id: 5, title: 'Median of Two Sorted Arrays', difficulty: 'Hard', topic: 'Binary Search', status: false },
  { id: 6, title: 'Best Time to Buy and Sell Stock', difficulty: 'Easy', topic: 'Arrays', status: true },
  { id: 7, title: 'Maximum Subarray', difficulty: 'Medium', topic: 'Arrays/DP', status: true },
  { id: 8, title: 'Climbing Stairs', difficulty: 'Easy', topic: 'Dynamic Programming', status: true },
  { id: 9, title: '3Sum', difficulty: 'Medium', topic: 'Two Pointers', status: false },
  { id: 10, title: 'Number of Islands', difficulty: 'Medium', topic: 'Graphs', status: false },
  { id: 11, title: 'Reverse Linked List', difficulty: 'Easy', topic: 'Linked List', status: true },
  { id: 12, title: 'Serialize and Deserialize Binary Tree', difficulty: 'Hard', topic: 'Trees', status: false },
  { id: 13, title: 'Word Search II', difficulty: 'Hard', topic: 'Trie/Backtracking', status: false },
  { id: 14, title: 'Lowest Common Ancestor of a Binary Tree', difficulty: 'Medium', topic: 'Trees', status: false },
  { id: 15, title: 'Trapping Rain Water', difficulty: 'Hard', topic: 'Two Pointers', status: false },
];

const CodingPractice = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'All' | Difficulty>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const difficultyColors = {
    Easy: 'bg-green-100 text-green-700 font-semibold',
    Medium: 'bg-yellow-100 text-yellow-700 font-semibold',
    Hard: 'bg-red-100 text-red-700 font-semibold'
  };

  const filteredProblems = mockProblems.filter(p => {
    const matchesFilter = filter === 'All' ? true : p.difficulty === filter;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.topic.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const solvedCount = mockProblems.filter(p => p.status).length;
  const totalCount = mockProblems.length;
  const progressPercent = Math.round((solvedCount / totalCount) * 100);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 font-sans">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button 
              onClick={() => navigate('/')}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500 hover:text-slate-900 focus:outline-none"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <Code2 className="w-6 h-6 text-green-600" />
              <h1 className="text-xl font-extrabold tracking-tight">Coding Practice</h1>
            </div>
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
            <div className="flex flex-col items-end">
              <span className="text-xs text-slate-500 font-medium">Progress</span>
              <span className="text-sm font-bold text-green-600">{solvedCount} / {totalCount} Solved</span>
            </div>
            <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="bg-green-500 h-full transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        
        {/* Title and Description */}
        <div className="mb-10 text-center sm:text-left">
          <h2 className="text-3xl font-black mb-3 text-slate-900">Premium Problem Set</h2>
          <p className="text-slate-500 max-w-2xl text-lg">
            Master the most critical data structures and algorithms patterns. Curated extensively to simulate real-world technical interviews.
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0" style={{ scrollbarWidth: 'none' }}>
            <span className="text-slate-400 mr-2 flex items-center gap-1.5 font-medium text-sm">
              <Filter className="w-4 h-4" /> Filter
            </span>
            {(['All', 'Easy', 'Medium', 'Hard'] as const).map(diff => (
              <button
                key={diff}
                onClick={() => setFilter(diff)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap focus:outline-none ${
                  filter === diff 
                    ? 'bg-slate-900 text-white shadow-md' 
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200 hover:border-slate-300'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64 lg:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 min-w-4 min-h-4 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search problems or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all font-medium text-slate-800"
            />
          </div>
        </div>

        {/* Problems Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider font-bold">
                  <th className="px-6 py-4 w-16 text-center">Status</th>
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4 w-32">Difficulty</th>
                  <th className="px-6 py-4 w-48 hidden sm:table-cell">Topic</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProblems.length > 0 ? (
                  filteredProblems.map(problem => (
                    <tr 
                      key={problem.id} 
                      className="hover:bg-slate-50/60 transition-colors group cursor-pointer"
                    >
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center">
                          {problem.status ? (
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                          ) : (
                            <Circle className="w-5 h-5 text-slate-300 group-hover:text-green-400 transition-colors" />
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-bold text-slate-800 group-hover:text-green-600 transition-colors">
                          {problem.id}. {problem.title}
                        </span>
                        {/* Mobile Topic Badge */}
                        <div className="mt-1 sm:hidden">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-600">
                            {problem.topic}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs box-border ${difficultyColors[problem.difficulty]}`}>
                          {problem.difficulty}
                        </span>
                      </td>
                      <td className="px-6 py-4 hidden sm:table-cell">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                          {problem.topic}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                      <Code2 className="w-10 h-10 mx-auto text-slate-300 mb-3" />
                      <p className="font-medium">No problems found matching your criteria.</p>
                      <button 
                        onClick={() => { setFilter('All'); setSearchQuery(''); }}
                        className="mt-4 text-green-600 font-semibold hover:text-green-700 underline underline-offset-4"
                      >
                        Clear all filters
                      </button>
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
};

export default CodingPractice;

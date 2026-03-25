import React, { useState, useEffect } from 'react';
import { Brain, Coffee, Play, Pause, RotateCcw } from 'lucide-react';

const PomodoroTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<number>(25 * 60);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [mode, setMode] = useState<'focus' | 'break'>('focus');

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      // Auto-switch modes when timer hits zero
      if (mode === 'focus') {
        setMode('break');
        setTimeLeft(5 * 60);
      } else {
        setMode('focus');
        setTimeLeft(25 * 60);
      }
      setIsActive(false); // Pause so the user can voluntarily start the next session
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, mode]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setMode('focus');
    setTimeLeft(25 * 60);
  };

  const formatTime = (seconds: number): string => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 max-w-sm w-full mx-auto flex flex-col items-center">
      {/* Header element to indicate mode */}
      <div 
        className={`flex items-center space-x-2 px-4 py-2 rounded-full mb-8 transition-colors duration-300 ${
          mode === 'focus' 
            ? 'bg-emerald-50 text-emerald-600' 
            : 'bg-orange-50 text-orange-600' // using orange for coffee/break styling
        }`}
      >
        {mode === 'focus' ? (
          <Brain className="w-5 h-5" />
        ) : (
          <Coffee className="w-5 h-5" />
        )}
        <span className="font-semibold text-sm tracking-wide">
          {mode === 'focus' ? 'FOCUS MODE' : 'BREAK TIME'}
        </span>
      </div>

      {/* Timer Display */}
      <div className="text-7xl font-black text-slate-800 mb-8 tracking-tighter tabular-nums drop-shadow-sm">
        {formatTime(timeLeft)}
      </div>

      {/* Controls */}
      <div className="flex items-center space-x-4 w-full justify-center">
        <button
          onClick={toggleTimer}
          className={`flex-1 flex items-center justify-center space-x-2 px-6 py-4 rounded-xl text-white font-semibold transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm ${
            !isActive
              ? 'bg-emerald-500 hover:bg-emerald-600'
              : 'bg-red-500 hover:bg-red-600'
          }`}
        >
          {!isActive ? (
            <Play className="w-5 h-5 fill-current" />
          ) : (
            <Pause className="w-5 h-5 fill-current" />
          )}
          <span>{!isActive ? 'Start' : 'Pause'}</span>
        </button>
        <button
          onClick={resetTimer}
          className="flex items-center justify-center p-4 rounded-xl text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-slate-200"
          title="Reset"
          aria-label="Reset Timer"
        >
          <RotateCcw className={`w-5 h-5 text-slate-500 transition-transform duration-500 ${!isActive ? 'hover:-rotate-90' : ''}`} />
        </button>
      </div> 
    </div>
  );
};

export default PomodoroTimer;
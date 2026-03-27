import React, { useEffect, useRef, useState } from 'react';
import { Trophy, RefreshCw, Gamepad2 } from 'lucide-react';

const RunnerGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);

  // Constants
  const GRAVITY = 0.6;
  const JUMP_POWER = -11;
  const OBSTACLE_SPEED = 6;
  const SPAWN_RATE = 90; // frames roughly 1.5s at 60fps

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let frames = 0;

    // Game State Objects
    let player = {
      x: 50,
      y: canvas.height - 50,
      width: 30,
      height: 30,
      dy: 0,
      isJumping: false
    };

    let obstacles: { x: number, y: number, width: number, height: number, passed?: boolean }[] = [];
    let currentScore = 0;

    const resetGameVariables = () => {
      player.y = canvas.height - 50;
      player.dy = 0;
      player.isJumping = false;
      obstacles = [];
      currentScore = 0;
      frames = 0;
    };

    const drawPlayer = () => {
      ctx.fillStyle = '#10b981'; // emerald-500
      ctx.beginPath();
      ctx.roundRect(player.x, player.y, player.width, player.height, 6);
      ctx.fill();
      
      // Add a subtle inner glow / highlight for premium feel
      ctx.fillStyle = '#34d399';
      ctx.beginPath();
      ctx.roundRect(player.x + 2, player.y + 2, player.width - 10, player.height - 10, 4);
      ctx.fill();
    };

    const drawObstacles = () => {
      ctx.fillStyle = '#ef4444'; // rose-500
      obstacles.forEach(obs => {
        ctx.beginPath();
        ctx.roundRect(obs.x, obs.y, obs.width, obs.height, 4);
        ctx.fill();
        
        ctx.fillStyle = '#f87171';
        ctx.beginPath();
        ctx.roundRect(obs.x + 2, obs.y + 2, obs.width - 10, obs.height - 4, 2);
        ctx.fill();
        ctx.fillStyle = '#ef4444'; // reset
      });
    };

    const drawFloor = () => {
      ctx.fillStyle = '#e2e8f0'; // slate-200
      ctx.fillRect(0, canvas.height - 20, canvas.width, 20);
      
      // Grid line for tech aesthetic
      ctx.beginPath();
      ctx.moveTo(0, canvas.height - 20);
      ctx.lineTo(canvas.width, canvas.height - 20);
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 2;
      ctx.stroke();
    };

    const update = () => {
      if (!isPlaying || isGameOver) {
        // Draw static scene if stopped
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawFloor();
        drawPlayer();
        drawObstacles();
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Apply Physics
      player.dy += GRAVITY;
      player.y += player.dy;

      // Floor Collision
      if (player.y + player.height > canvas.height - 20) {
        player.y = canvas.height - 20 - player.height;
        player.dy = 0;
        player.isJumping = false;
      }

      // Obstacle Spawn Logic
      if (frames % SPAWN_RATE === 0) {
        // Randomize height slightly to make it look dynamic, but keep width static
        const height = 30 + Math.random() * 20; 
        obstacles.push({
          x: canvas.width,
          y: canvas.height - 20 - height,
          width: 25,
          height: height,
          passed: false
        });
      }

      // Obstacle Updates & Collision Detection
      for (let i = obstacles.length - 1; i >= 0; i--) {
        const obs = obstacles[i];
        obs.x -= OBSTACLE_SPEED;

        // Collision Check (AABB)
        if (
          player.x < obs.x + obs.width &&
          player.x + player.width > obs.x &&
          player.y < obs.y + obs.height &&
          player.y + player.height > obs.y
        ) {
          setIsGameOver(true);
          setIsPlaying(false);
          return;
        }

        // Score Registration
        if (obs.x + obs.width < player.x && !obs.passed) {
          currentScore += 10;
          setScore(currentScore);
          obs.passed = true;
        }

        // Garbage Collection for off-screen obstacles
        if (obs.x + obs.width < 0) {
          obstacles.splice(i, 1);
        }
      }

      // Render Loop
      drawFloor();
      drawPlayer();
      drawObstacles();

      frames++;
      animationId = requestAnimationFrame(update);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Spacebar or ArrowUp to jump validation
      if ((e.code === 'Space' || e.code === 'ArrowUp') && !player.isJumping && isPlaying && !isGameOver) {
        player.dy = JUMP_POWER;
        player.isJumping = true;
        e.preventDefault(); // Prevent scrolling
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    if (isPlaying && !isGameOver) {
      if (currentScore === 0 && frames === 0) {
        // Force reset variables on brand new game start
        resetGameVariables();
      }
      update();
    } else {
      // Draw initial or frozen state
      update();
    }

    // Cleanup phase
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      cancelAnimationFrame(animationId);
    };
  }, [isPlaying, isGameOver]);

  const handleStart = () => {
    setScore(0);
    setIsGameOver(false);
    setIsPlaying(true);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 font-sans p-6 sm:p-10 flex flex-col items-center">
      <div className="max-w-4xl w-full">
        
        {/* Header Block */}
        <div className="mb-8 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-sm border border-slate-200 mb-4">
            <Gamepad2 className="w-6 h-6 text-emerald-500" />
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Endless Runner</h1>
          </div>
          <p className="text-slate-600 font-medium text-[15px]">
            Take a breather from Data Structures. 
            <br />
            Jump using <kbd className="bg-white border border-slate-200 shadow-sm rounded-md px-2 py-0.5 mx-1 text-slate-700 font-mono text-[13px] font-bold">Spacebar</kbd> or <kbd className="bg-white border border-slate-200 shadow-sm rounded-md px-2 py-0.5 mx-1 text-slate-700 font-mono text-[13px] font-bold">Up Arrow</kbd>.
          </p>
        </div>

        {/* Game Container Wrapper */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 md:p-8 relative overflow-hidden group transition-all">
          
          {/* Top Info Bar */}
          <div className="flex justify-between items-center mb-6">
            
            {/* Score Display */}
            <div className="flex items-center gap-3">
              <div className="bg-amber-100/50 p-3 rounded-xl border border-amber-200/50">
                <Trophy className="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest">Score</span>
                <span className="block text-3xl font-black text-slate-900 tracking-tighter leading-none">{score}</span>
              </div>
            </div>
            
            {/* Action Controls */}
            {!isPlaying && !isGameOver && (
              <button 
                onClick={handleStart}
                className="bg-emerald-500 text-white px-8 py-3 rounded-xl font-bold text-sm shadow-[0_4px_14px_0_rgba(16,185,129,0.39)] hover:bg-emerald-600 hover:shadow-[0_6px_20px_rgba(16,185,129,0.23)] hover:-translate-y-0.5 transition-all outline-none"
              >
                Start Game
              </button>
            )}
            
            {isGameOver && (
              <button 
                onClick={handleStart}
                className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md hover:bg-slate-800 hover:-translate-y-0.5 transition-all flex items-center gap-2 outline-none"
              >
                <RefreshCw className="w-4 h-4" /> Play Again
              </button>
            )}
          </div>

          {/* Canvas Render Area */}
          <div className="relative rounded-2xl overflow-hidden border-2 border-slate-100 bg-slate-50 focus-within:border-emerald-500/30 transition-colors shadow-inner w-full">
            <canvas 
              ref={canvasRef} 
              width={800} 
              height={300}
              className="w-full h-auto block bg-slate-50/50"
              style={{ maxHeight: '400px', objectFit: 'contain' }}
            />
            
            {/* Game Over Graphic Overlay */}
            {isGameOver && (
              <div className="absolute inset-0 bg-slate-900/10 backdrop-blur-[3px] flex items-center justify-center animate-in fade-in duration-300">
                <div className="bg-white p-8 rounded-3xl shadow-2xl border border-slate-200 text-center transform scale-100 animate-in zoom-in-95 duration-300">
                  <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <span className="text-2xl">💥</span>
                  </div>
                  <h2 className="text-3xl font-black text-slate-900 mb-2">Game Over!</h2>
                  <p className="text-slate-500 font-medium mb-6">You scored <strong className="text-emerald-500 text-xl">{score}</strong> points.</p>
                  
                  <button 
                    onClick={handleStart}
                    className="w-full bg-emerald-500 text-white px-6 py-3.5 rounded-xl font-bold text-sm shadow-[0_4px_14px_0_rgba(16,185,129,0.39)] hover:bg-emerald-600 hover:shadow-[0_6px_20px_rgba(16,185,129,0.23)] hover:-translate-y-0.5 transition-all"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default RunnerGame;

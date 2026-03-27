import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';

interface UserContextType {
  user: User | null;
  completedSteps: string[];
  totalSolvedCount: number;
  currentStreak: number;
  toggleStep: (stepId: string) => Promise<void>;
  getRoadmapProgress: (roadmapId: string, totalSteps: number) => number;
  isLoadingProgress: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [totalSolvedCount, setTotalSolvedCount] = useState<number>(0);
  const [currentStreak, setCurrentStreak] = useState<number>(0);
  const [isLoadingProgress, setIsLoadingProgress] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProgress(session.user.id);
        fetchDsaProgress(session.user.id);
        fetchUserStreak(session.user.id);
      } else {
        setCompletedSteps([]);
        setTotalSolvedCount(0);
        setCurrentStreak(0);
        setIsLoadingProgress(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProgress(session.user.id);
        fetchDsaProgress(session.user.id);
        fetchUserStreak(session.user.id);
      } else {
        setCompletedSteps([]);
        setTotalSolvedCount(0);
        setCurrentStreak(0);
        setIsLoadingProgress(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProgress = async (userId: string) => {
    setIsLoadingProgress(true);
    try {
      const { data, error } = await supabase
        .from('user_progress')
        .select('step_id')
        .eq('user_id', userId);

      if (error) throw error;
      
      const steps = data ? data.map(row => row.step_id) : [];
      setCompletedSteps(steps);
    } catch (error) {
      console.error(error);
      console.error('Error fetching progress:', error);
      toast.error('Failed to load your progress.');
    } finally {
      setIsLoadingProgress(false);
    }
  };

  const fetchDsaProgress = async (userId: string) => {
    try {
      const { count, error } = await supabase
        .from('solved_problems')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId);
        
      if (error) throw error;
      setTotalSolvedCount(count || 0);
    } catch (error) {
      console.error('Error fetching DSA progress:', error);
    }
  };

  const fetchUserStreak = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('current_streak')
        .eq('id', userId)
        .single();
        
      if (error) {
        console.error('Error fetching streak:', error);
        setCurrentStreak(0);
        return;
      }
      setCurrentStreak(data?.current_streak || 0);
    } catch (error) {
      console.error('Error in fetchUserStreak:', error);
    }
  };

  const toggleStep = async (stepId: string) => {
    if (!user) {
      toast.error('Please log in securely to track and save your progress!', {
        style: {
          background: '#020617',
          color: '#fff',
          border: '1px solid #334155',
          borderRadius: '12px',
          fontSize: '14px',
          fontWeight: '600'
        }
      });
      return;
    }

    const isCompleted = completedSteps.includes(stepId);
    
    // Optimistic UI update
    setCompletedSteps(prev => 
      isCompleted ? prev.filter(id => id !== stepId) : [...prev, stepId]
    );

    try {
      if (isCompleted) {
        // Delete record from Supabase
        const { error } = await supabase
          .from('user_progress')
          .delete()
          .match({ user_id: user.id, step_id: stepId });
          
        if (error) throw error;
      } else {
        // Insert record into Supabase
        const currentUser = user;
        const currentRoadmap = stepId.split('_')[0];
        const currentStep = stepId;

        const { error } = await supabase
          .from('user_progress')
          .insert({ user_id: currentUser.id, roadmap_id: currentRoadmap, step_id: currentStep });
          
        if (error) throw error;

        toast('Great job! 1 step closer to your goal! 🎉', {
          style: {
            background: '#020617', // slate-950
            color: '#fff',
            border: '1px solid #10b981', // emerald-500
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: '600'
          },
          duration: 3000,
        });
      }
    } catch (error) {
      console.error(error);
      console.error('Error toggling step:', error);
      toast.error('Failed to save progress. Reverting change.');
      
      // Revert optimistic update on error
      setCompletedSteps(prev => 
        isCompleted ? [...prev, stepId] : prev.filter(id => id !== stepId)
      );
    }
  };

  const getRoadmapProgress = (roadmapId: string, totalSteps: number) => {
    if (totalSteps === 0 || completedSteps.length === 0) return 0;
    const roadmapSteps = completedSteps.filter(id => id.startsWith(`${roadmapId}_`));
    return Math.round((roadmapSteps.length / totalSteps) * 100);
  };

  return (
    <UserContext.Provider value={{ user, completedSteps, totalSolvedCount, currentStreak, toggleStep, getRoadmapProgress, isLoadingProgress }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

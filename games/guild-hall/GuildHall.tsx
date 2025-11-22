
import React, { useState, useEffect } from 'react';
import { Home, Sparkles, Filter, Lock, Compass, Star, Moon, Flower2, Leaf } from 'lucide-react';
import { QUESTS } from './data/quests';
import { getProgress, acceptQuest, completeQuest, checkExpiredQuests } from './utils/storage';
import { UserProgress, Quest } from './types';
import QuestCard from './components/QuestCard';
import QuestModal from './components/QuestModal';

interface GuildHallProps {
  onExit: () => void;
}

// Decorative Corner Component
const FloralCorner = ({ className, rotate = 0 }: { className?: string, rotate?: number }) => (
    <div className={`absolute pointer-events-none z-30 flex items-center justify-center ${className}`} style={{ transform: `rotate(${rotate}deg)` }}>
        <div className="relative w-32 h-32">
            {/* Main Flower */}
            <Flower2 className="absolute top-0 left-0 text-[#f0d1f5] drop-shadow-[0_0_10px_rgba(240,209,245,0.5)]" size={48} strokeWidth={1} />
            {/* Leaves */}
            <Leaf className="absolute top-8 left-[-10px] text-cyan-200/60 transform -rotate-45" size={24} strokeWidth={1} />
            <Leaf className="absolute top-[-10px] left-8 text-cyan-200/60 transform rotate-12" size={24} strokeWidth={1} />
            {/* Vines/Lines */}
            <div className="absolute top-6 left-6 w-24 h-24 border-t-2 border-l-2 border-[#f0d1f5]/30 rounded-tl-[40px]"></div>
            <div className="absolute top-4 left-4 w-28 h-28 border-t border-l border-[#f0d1f5]/10 rounded-tl-[50px]"></div>
            {/* Sparkles */}
            <Sparkles className="absolute top-10 left-10 text-[#f0d1f5] animate-pulse" size={16} />
        </div>
    </div>
);

export default function GuildHall({ onExit }: GuildHallProps) {
  const [progress, setProgress] = useState<UserProgress>(getProgress());
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);
  const [filterRank, setFilterRank] = useState<string | null>(null);
  const [now, setNow] = useState(Date.now());

  // Update time every minute to refresh countdowns
  useEffect(() => {
      const interval = setInterval(() => setNow(Date.now()), 60000);
      return () => clearInterval(interval);
  }, []);

  // Refetch progress when component mounts and check for expired items
  useEffect(() => {
    const p = checkExpiredQuests();
    setProgress(p);
  }, []);

  const handleAccept = (quest: Quest) => {
    const newProgress = acceptQuest(quest.id);
    setProgress(newProgress);
    // Close and reopen to refresh modal data or just update state
    const enriched = enrichQuest(quest, newProgress);
    setSelectedQuest(enriched);
  };

  const handleComplete = (quest: Quest) => {
    const newProgress = completeQuest(quest.id, quest.xp);
    setProgress(newProgress);
    const enriched = enrichQuest(quest, newProgress);
    setSelectedQuest(enriched);
  };

  // Merge static data with progress
  const enrichQuest = (quest: Quest, currentProgress: UserProgress): Quest => {
      const activeState = currentProgress.activeQuests.find(q => q.questId === quest.id);
      const completedState = currentProgress.completedQuests.find(q => q.questId === quest.id);
      const isFailed = currentProgress.failedQuests.includes(quest.id);

      let status: Quest['status'] = 'available';
      if (activeState) status = 'active';
      if (completedState) status = 'completed';
      if (isFailed) status = 'failed';

      return {
          ...quest,
          status,
          isTaked: !!activeState,
          isFinished: !!completedState,
          startTime: activeState?.startTime,
          endTime: activeState?.endTime,
          finishTime: completedState?.finishTime
      };
  };

  const enrichedQuests = QUESTS.map(q => enrichQuest(q, progress));
  const filteredQuests = enrichedQuests.filter(q => !filterRank || q.rank === filterRank);

  return (
    <div className="h-screen w-full bg-[#0b1021] relative font-sans overflow-hidden text-slate-200 selection:bg-[#f0d1f5]/30 flex flex-col">
        
        {/* Celestial Background */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[#0b1021] via-[#161b33] to-[#0b1021]"></div>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 animate-pulse"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-40">
                <div className="w-[70vmin] h-[70vmin] border border-[#f0d1f5]/20 rounded-full animate-spin-slow duration-[120s] relative flex items-center justify-center">
                     <div className="w-[50vmin] h-[50vmin] border border-cyan-500/10 rounded-full border-dashed animate-reverse-spin"></div>
                     <div className="w-[30vmin] h-[30vmin] border border-[#f0d1f5]/30 rounded-full rotate-45"></div>
                </div>
            </div>
            
            {/* Floral Frame Corners */}
            <div className="fixed inset-4 pointer-events-none z-50 hidden sm:block">
                <FloralCorner className="top-0 left-0" rotate={0} />
                <FloralCorner className="top-0 right-0" rotate={90} />
                <FloralCorner className="bottom-0 right-0" rotate={180} />
                <FloralCorner className="bottom-0 left-0" rotate={270} />
            </div>
        </div>

        {/* Fixed Top Section: Header + Filter */}
        <div className="flex-none z-40 bg-[#0b1021]/80 backdrop-blur-md border-b border-[#f0d1f5]/20 shadow-[0_4px_30px_rgba(240,209,245,0.05)]">
            {/* Header / HUD */}
            <header className="p-4 flex justify-between items-center mx-2">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={onExit}
                        className="p-2 bg-white/5 rounded-full hover:bg-[#f0d1f5] hover:text-[#0b1021] transition-all border border-[#f0d1f5]/30 text-[#f0d1f5]"
                    >
                        <Home size={20} />
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Flower2 className="text-[#f0d1f5] animate-spin-slow" size={32} strokeWidth={1.5} />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_5px_#22d3ee]"></div>
                            </div>
                        </div>
                        <div>
                            <h1 className="text-xl sm:text-2xl font-serif font-bold tracking-[0.1em] text-[#f0d1f5] drop-shadow-sm">
                                MYSTIC GARDEN
                            </h1>
                            <p className="text-[9px] text-cyan-200/70 uppercase tracking-[0.4em] leading-none text-center">Guild Hall</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div className="flex flex-col items-end hidden sm:flex">
                        <span className="text-[9px] text-[#f0d1f5] uppercase font-bold tracking-widest">Magician</span>
                        <div className="flex items-baseline gap-1">
                            <Moon size={12} className="text-cyan-400" fill="currentColor"/>
                            <span className="text-xl font-bold leading-none text-white font-serif">Lv. {progress.level}</span>
                        </div>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-[9px] text-[#f0d1f5] uppercase font-bold tracking-widest">Mana</span>
                        <div className="flex items-center gap-1.5 text-white">
                            <Sparkles size={16} fill="currentColor" className="text-cyan-400" />
                            <span className="text-xl font-bold leading-none font-mono">{progress.currentXp}</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Filter Bar - Fixed below header */}
            <div className="pb-4 px-4 overflow-x-auto no-scrollbar">
                <div className="flex items-center gap-3 min-w-max sm:justify-center">
                    <div className="flex items-center gap-2 text-[#f0d1f5]/80 mr-2 sticky left-0 bg-[#0b1021]/50 backdrop-blur-sm pl-2 pr-4 rounded-r-full sm:static sm:bg-transparent sm:p-0">
                        <Filter size={16} />
                        <span className="text-xs font-bold uppercase tracking-widest">Filter:</span>
                    </div>
                    
                    <button 
                        onClick={() => setFilterRank(null)}
                        className={`px-6 py-2 text-xs font-bold transition-all rounded-full border ${
                            !filterRank 
                            ? 'bg-[#f0d1f5] text-[#0b1021] border-[#f0d1f5] shadow-[0_0_15px_rgba(240,209,245,0.3)]' 
                            : 'bg-transparent text-[#f0d1f5] border-[#f0d1f5]/30 hover:border-[#f0d1f5] hover:bg-[#f0d1f5]/10'
                        }`}
                    >
                        ALL
                    </button>
                    
                    {['F', 'E', 'D', 'C', 'B', 'A', 'S', 'SS', 'SSS'].map(rank => (
                        <button 
                            key={rank}
                            onClick={() => setFilterRank(rank)}
                            className={`min-w-[40px] px-3 py-2 text-[10px] sm:text-xs font-bold transition-all rounded-full border relative group overflow-hidden ${
                                filterRank === rank 
                                ? 'bg-[#f0d1f5] text-[#0b1021] border-[#f0d1f5] shadow-[0_0_15px_rgba(240,209,245,0.3)]' 
                                : 'bg-transparent text-[#f0d1f5] border-[#f0d1f5]/30 hover:border-[#f0d1f5] hover:bg-[#f0d1f5]/10'
                            }`}
                        >
                            <span className="relative z-10">{rank}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>

        {/* Main Content - Scrollable Quest Grid */}
        <div className="flex-1 overflow-y-auto relative z-10 scrollbar-thin scrollbar-thumb-[#f0d1f5]/20 scrollbar-track-transparent">
            <main className="p-6 sm:p-10 max-w-7xl mx-auto pb-32">
                {/* Quest Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredQuests.map(quest => (
                        <QuestCard 
                            key={quest.id}
                            quest={quest}
                            status={quest.status || 'available'}
                            onClick={() => setSelectedQuest(quest)}
                        />
                    ))}
                    
                    {/* Placeholder for "Coming Soon" */}
                    <div className="opacity-50 pointer-events-none relative group border border-[#f0d1f5]/20 bg-[#13192b] aspect-[3/5] flex flex-col items-center justify-center rounded-[2.5rem]">
                        <div className="absolute inset-4 border border-dashed border-[#f0d1f5]/20 rounded-[2rem]"></div>
                        <Lock size={32} className="text-[#f0d1f5]/50 mb-3" />
                        <span className="font-serif font-bold text-[#f0d1f5]/50 text-sm text-center tracking-widest uppercase">
                            Blooming Soon
                        </span>
                    </div>
                </div>
            </main>
        </div>

        {/* Modal */}
        {selectedQuest && (
            <QuestModal 
                quest={selectedQuest}
                status={selectedQuest.status || 'available'}
                onClose={() => setSelectedQuest(null)}
                onAccept={() => handleAccept(selectedQuest)}
                onComplete={() => handleComplete(selectedQuest)}
            />
        )}

    </div>
  );
}

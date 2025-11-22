
import React, { useState, useEffect } from 'react';
import { Home, Gem, Filter, Lock, Sparkles } from 'lucide-react';
import { QUESTS } from './data/quests';
import { getProgress, acceptQuest, completeQuest } from './utils/storage';
import { UserProgress, Quest } from './types';
import QuestCard from './components/QuestCard';
import QuestModal from './components/QuestModal';

interface GuildHallProps {
  onExit: () => void;
}

export default function GuildHall({ onExit }: GuildHallProps) {
  const [progress, setProgress] = useState<UserProgress>(getProgress());
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);
  const [filterRank, setFilterRank] = useState<string | null>(null);

  // Refetch progress when component mounts
  useEffect(() => {
    setProgress(getProgress());
  }, []);

  const handleAccept = (quest: Quest) => {
    const newProgress = acceptQuest(quest.id);
    setProgress(newProgress);
  };

  const handleComplete = (quest: Quest) => {
    const newProgress = completeQuest(quest.id, quest.xp);
    setProgress(newProgress);
    // Modal will close shortly via its own internal timer logic or manual close
  };

  const getQuestStatus = (id: string) => {
    if (progress.completedQuests.includes(id)) return 'completed';
    if (progress.acceptedQuests.includes(id)) return 'accepted';
    return 'available';
  };

  const filteredQuests = QUESTS.filter(q => !filterRank || q.rank === filterRank);

  return (
    <div className="min-h-screen bg-[#090515] relative font-sans overflow-x-hidden text-pink-50 selection:bg-pink-500/30">
        
        {/* Mystical Background */}
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#2d1b4e] via-[#090515] to-[#000000] pointer-events-none"></div>
        <div className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 pointer-events-none"></div>
        
        {/* Floating Cosmic Orbs */}
        <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-600/20 rounded-full blur-[120px] animate-blob pointer-events-none"></div>
        <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-pink-600/20 rounded-full blur-[120px] animate-blob animation-delay-2000 pointer-events-none"></div>

        {/* Header / HUD */}
        <header className="sticky top-0 z-40 bg-[#0f0c1d]/80 backdrop-blur-md border-b border-pink-500/20 shadow-[0_4px_30px_rgba(236,72,153,0.15)] p-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
                <button 
                    onClick={onExit}
                    className="p-2 bg-white/5 rounded-full hover:bg-pink-500/20 hover:text-pink-200 transition-colors border border-pink-500/30 text-pink-400"
                >
                    <Home size={20} />
                </button>
                <div className="flex items-center gap-2">
                    <Sparkles className="text-pink-400 animate-pulse" size={20} />
                    <h1 className="text-xl sm:text-2xl font-serif font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-purple-200 to-pink-200 drop-shadow-sm">
                        星辰委托公会
                    </h1>
                </div>
            </div>

            <div className="flex items-center gap-6">
                <div className="flex flex-col items-end">
                    <span className="text-[10px] text-pink-300/70 uppercase font-bold tracking-wider">Magician Rank</span>
                    <span className="text-2xl font-bold leading-none text-pink-100 font-serif">Lv. {progress.level}</span>
                </div>
                <div className="flex flex-col items-end">
                    <span className="text-[10px] text-pink-300/70 uppercase font-bold tracking-wider">Mana Crystals</span>
                    <div className="flex items-center gap-1 text-cyan-300">
                        <Gem size={18} fill="currentColor" className="drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                        <span className="text-2xl font-bold leading-none font-mono">{progress.currentXp}</span>
                    </div>
                </div>
            </div>
        </header>

        {/* Main Content - The Board */}
        <main className="p-4 sm:p-8 max-w-7xl mx-auto relative z-10">
            
            {/* Filter Bar */}
            <div className="mb-8 flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-2 text-pink-300/80 mr-4">
                    <Filter size={18} />
                    <span className="text-sm font-bold uppercase tracking-wide">Filter:</span>
                </div>
                <button 
                    onClick={() => setFilterRank(null)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${!filterRank ? 'bg-pink-500 text-white border-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.5)]' : 'bg-transparent text-pink-300 border-pink-500/30 hover:bg-pink-500/10'}`}
                >
                    All
                </button>
                {['F', 'E', 'D', 'C', 'B', 'A', 'S', 'SS', 'SSS'].map(rank => (
                    <button 
                        key={rank}
                        onClick={() => setFilterRank(rank)}
                        className={`px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-bold transition-all border ${filterRank === rank ? 'bg-pink-500 text-white border-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.5)]' : 'bg-transparent text-pink-300 border-pink-500/30 hover:bg-pink-500/10'}`}
                    >
                        {rank}
                    </button>
                ))}
            </div>

            {/* Quest Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
                {filteredQuests.map(quest => (
                    <QuestCard 
                        key={quest.id}
                        quest={quest}
                        status={getQuestStatus(quest.id)}
                        onClick={() => setSelectedQuest(quest)}
                    />
                ))}
                
                {/* Placeholder for "Coming Soon" */}
                <div className="opacity-40 grayscale pointer-events-none relative group">
                    <div className="absolute inset-0 flex items-center justify-center z-20">
                        <Lock size={48} className="text-pink-200/50" />
                    </div>
                    <div className="bg-[#1a1625]/50 w-full aspect-[3/4] p-4 shadow-inner border border-pink-500/10 rounded-xl flex items-center justify-center backdrop-blur-sm">
                        <div className="h-full w-full border border-dashed border-pink-500/20 rounded-lg flex flex-col items-center justify-center p-4">
                             <span className="font-serif font-bold text-pink-200/50 text-lg text-center">
                                 Mystical<br/>Stars<br/>Awaiting...
                             </span>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        {/* Modal */}
        {selectedQuest && (
            <QuestModal 
                quest={selectedQuest}
                status={getQuestStatus(selectedQuest.id)}
                onClose={() => setSelectedQuest(null)}
                onAccept={() => handleAccept(selectedQuest)}
                onComplete={() => handleComplete(selectedQuest)}
            />
        )}

    </div>
  );
}

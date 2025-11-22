
import React from 'react';
import { Quest, QuestRank } from '../types';
import { Paperclip, Sparkles, Star } from 'lucide-react';

interface QuestCardProps {
  quest: Quest;
  status: 'available' | 'accepted' | 'completed';
  onClick: () => void;
}

const RANK_COLORS: Record<QuestRank, string> = {
  'F': 'text-slate-300 border-slate-500',
  'E': 'text-slate-200 border-slate-400',
  'D': 'text-emerald-300 border-emerald-500',
  'C': 'text-teal-300 border-teal-500',
  'B': 'text-blue-300 border-blue-500',
  'A': 'text-purple-300 border-purple-500',
  'S': 'text-orange-300 border-orange-500',
  'SS': 'text-red-300 border-red-500',
  'SSS': 'text-amber-300 border-amber-500 shadow-[0_0_10px_rgba(251,191,36,0.5)]',
};

const QuestCard: React.FC<QuestCardProps> = ({ quest, status, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="relative group cursor-pointer transition-all hover:scale-105 hover:z-10 duration-500"
    >
      {/* Glow Effect on Hover */}
      <div className="absolute inset-0 bg-pink-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Main Card Body */}
      <div className="bg-[#16162c]/90 w-full aspect-[3/4] p-1 shadow-xl border border-pink-500/30 rounded-xl relative flex flex-col overflow-hidden backdrop-blur-sm group-hover:border-pink-400/60 transition-colors">
        
        {/* Inner Frame for "Panel" Look */}
        <div className="h-full w-full border border-pink-500/10 rounded-lg p-4 flex flex-col relative bg-gradient-to-b from-white/5 to-transparent">
            
            {/* Decorative Corner Stars */}
            <Sparkles className="absolute top-2 left-2 text-pink-200/30 w-3 h-3" />
            <Sparkles className="absolute top-2 right-2 text-pink-200/30 w-3 h-3" />
            <Sparkles className="absolute bottom-2 left-2 text-pink-200/30 w-3 h-3" />
            <Sparkles className="absolute bottom-2 right-2 text-pink-200/30 w-3 h-3" />

            {/* Header */}
            <div className="flex justify-between items-start mb-4 relative z-10">
                <span className={`font-mono font-bold text-[10px] px-2 py-0.5 rounded border bg-black/20 backdrop-blur-md ${RANK_COLORS[quest.rank]}`}>
                    RANK {quest.rank}
                </span>
                <span className="font-bold text-cyan-300 text-xs drop-shadow-sm">{quest.xp} XP</span>
            </div>

            {/* Content */}
            <div className="flex-1 relative z-10 flex flex-col items-center text-center mt-2">
                <div className="mb-2 relative">
                    <Star className="w-8 h-8 text-pink-500/20 fill-current absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-sm" />
                    <h3 className="font-serif font-bold text-lg text-pink-50 leading-tight mb-1 relative drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{quest.title}</h3>
                </div>
                <p className="text-[9px] text-pink-300/60 uppercase tracking-widest mb-4 border-b border-pink-500/20 pb-1">
                    {quest.subTitle}
                </p>
                <p className="text-[11px] text-pink-100/80 line-clamp-4 font-light leading-relaxed">
                    {quest.description}
                </p>
            </div>

            {/* Footer / Status Indicators */}
            <div className="relative z-10 mt-auto flex justify-center h-6">
                {status === 'accepted' && (
                    <div className="flex items-center gap-1 text-blue-300 text-xs font-bold bg-blue-900/50 px-2 py-0.5 rounded-full border border-blue-500/30">
                        <Paperclip size={12} /> <span>Accepted</span>
                    </div>
                )}
                {status === 'completed' && (
                    <div className="flex items-center gap-1 text-emerald-300 text-xs font-bold bg-emerald-900/50 px-2 py-0.5 rounded-full border border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                        <span>★ COMPLETE</span>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default QuestCard;

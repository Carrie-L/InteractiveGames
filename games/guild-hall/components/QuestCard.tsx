
import React, { useState, useEffect } from 'react';
import { Quest, QuestRank } from '../types';
import { Check, Moon, Sun, Sparkles, Eye, Star, Flower2, Hourglass, XCircle, Loader2 } from 'lucide-react';

interface QuestCardProps {
  quest: Quest;
  status: 'available' | 'active' | 'completed' | 'failed';
  onClick: () => void;
}

// Colors tailored to the Mystic Garden theme
const RANK_STYLES: Record<QuestRank, { color: string, icon: React.ReactNode }> = {
  'F': { color: '#94a3b8', icon: <Star size={14} /> }, // Slate
  'E': { color: '#cbd5e1', icon: <Star size={14} /> }, // Light Slate
  'D': { color: '#2dd4bf', icon: <Moon size={14} /> }, // Teal
  'C': { color: '#22d3ee', icon: <Moon size={14} /> }, // Cyan
  'B': { color: '#60a5fa', icon: <Sun size={14} /> }, // Blue
  'A': { color: '#818cf8', icon: <Sun size={14} /> }, // Indigo
  'S': { color: '#c084fc', icon: <Eye size={14} /> }, // Purple
  'SS': { color: '#f472b6', icon: <Eye size={14} /> }, // Pink
  'SSS': { color: '#f0d1f5', icon: <Sparkles size={14} /> }, // Main Pink
};

const QuestCard: React.FC<QuestCardProps> = ({ quest, status, onClick }) => {
  const { color, icon } = RANK_STYLES[quest.rank];
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
      if (status === 'active' && quest.endTime) {
          const updateTimer = () => {
              const now = Date.now();
              const diff = quest.endTime! - now;
              if (diff > 0) {
                  const hrs = Math.floor(diff / (1000 * 60 * 60));
                  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                  setTimeLeft(`${hrs}h ${mins}m`);
              } else {
                  setTimeLeft("Expired");
              }
          };
          updateTimer();
          const interval = setInterval(updateTimer, 60000);
          return () => clearInterval(interval);
      }
  }, [status, quest.endTime]);

  return (
    <div 
      onClick={onClick}
      className="relative group cursor-pointer perspective-1000"
    >
      {/* Card Container - Very Rounded, Floral Pink Border */}
      <div className={`w-full aspect-[3/5] bg-[#13192b] relative flex flex-col border-[1.5px] transition-all duration-500 ease-out overflow-hidden rounded-[2.5rem]
        ${status === 'failed' ? 'border-red-800/50 grayscale' : 'border-[#f0d1f5]/30 group-hover:border-[#f0d1f5] group-hover:shadow-[0_0_30px_rgba(240,209,245,0.2)] group-hover:-translate-y-2'}
      `}>
        
        {/* Inner Decorative Ring */}
        <div className="absolute inset-2 border border-dashed border-[#f0d1f5]/10 rounded-[2.2rem] pointer-events-none"></div>
        
        {/* Top Soft Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-[#f0d1f5]/5 rounded-full blur-3xl group-hover:bg-[#f0d1f5]/10 transition-all"></div>

        {/* Content Container */}
        <div className="flex-1 p-6 flex flex-col items-center text-center relative z-10">
            
            {/* Header Row */}
            <div className="w-full flex justify-between items-start px-1">
                <div className="flex flex-col items-center gap-1">
                    <div className="w-8 h-8 rounded-full border border-[#f0d1f5]/20 flex items-center justify-center bg-[#0b1021]" style={{ color }}>
                        {icon}
                    </div>
                    <span className="font-serif font-bold text-xs opacity-80" style={{ color }}>{quest.rank}</span>
                </div>
                <div className="flex flex-col items-end">
                    <div className="text-[8px] uppercase tracking-widest text-[#f0d1f5]/60 font-bold">XP</div>
                    <div className="font-mono text-sm font-bold text-cyan-200">
                        {quest.xp}
                    </div>
                </div>
            </div>

            {/* Central Art */}
            <div className="flex-1 flex items-center justify-center w-full my-4 relative">
                {/* Flower Pattern */}
                <div className="absolute text-[#f0d1f5]/5 group-hover:text-[#f0d1f5]/10 transition-colors duration-700 animate-spin-slow">
                    <Flower2 size={120} strokeWidth={0.5} />
                </div>
                
                {/* Central Icon */}
                <div className="relative z-10 text-[#f0d1f5] group-hover:text-white transition-colors duration-500 group-hover:scale-110 transform drop-shadow-[0_0_10px_rgba(240,209,245,0.3)]">
                    {quest.rank === 'SSS' ? <Sun size={40} strokeWidth={1.5} /> : 
                     quest.rank === 'S' || quest.rank === 'SS' ? <Flower2 size={40} strokeWidth={1.5} /> :
                     <Moon size={40} strokeWidth={1.5} />}
                </div>
            </div>

            {/* Title Area */}
            <div className="w-full pt-4 border-t border-[#f0d1f5]/10">
                <h3 className="font-serif font-medium text-lg text-[#f0d1f5] mb-2 leading-tight tracking-wide group-hover:text-white transition-colors line-clamp-2">
                    {quest.title}
                </h3>
                <p className="text-[9px] text-cyan-200/60 uppercase tracking-[0.15em] font-bold line-clamp-1">
                    {quest.subTitle}
                </p>
            </div>
        </div>

        {/* Status Indicators */}
        {status === 'active' && (
            <div className="absolute top-0 right-0 p-4 flex items-center gap-1">
                <div className="bg-[#f0d1f5] text-[#0b1021] text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-[0_0_10px_rgba(240,209,245,0.5)] animate-pulse">
                    <Loader2 size={10} className="animate-spin" />
                    {timeLeft}
                </div>
            </div>
        )}
        
        {status === 'completed' && (
            <div className="absolute inset-0 bg-[#0b1021]/80 backdrop-blur-[1px] flex items-center justify-center z-20 rounded-[2.5rem]">
                <div className="border border-[#f0d1f5] bg-[#f0d1f5] px-4 py-2 rounded-full flex items-center gap-2 shadow-[0_0_20px_rgba(240,209,245,0.4)] transform -rotate-12">
                    <Check size={16} className="text-[#0b1021]" strokeWidth={3} />
                    <span className="text-xs font-bold text-[#0b1021] uppercase tracking-widest">Verified</span>
                </div>
            </div>
        )}

        {status === 'failed' && (
            <div className="absolute inset-0 bg-red-950/60 backdrop-blur-[1px] flex items-center justify-center z-20 rounded-[2.5rem]">
                <div className="border border-red-500 bg-red-950 px-4 py-2 rounded-full flex items-center gap-2 shadow-[0_0_20px_rgba(220,38,38,0.4)]">
                    <XCircle size={16} className="text-red-500" strokeWidth={3} />
                    <span className="text-xs font-bold text-red-500 uppercase tracking-widest">Failed</span>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default QuestCard;

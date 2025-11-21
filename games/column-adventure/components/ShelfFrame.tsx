
import React, { PropsWithChildren } from 'react';
import { Layers } from 'lucide-react';

interface ShelfFrameProps extends PropsWithChildren {
  title: string;
  progress: number;
  totalStages: number;
}

const ShelfFrame: React.FC<ShelfFrameProps> = ({ title, children, progress, totalStages }) => {
  const progressPercentage = ((progress + 1) / totalStages) * 100;

  return (
    <div className="min-h-screen bg-[#f0fdf4] flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden font-sans text-slate-800">
      
      {/* Wood/Nature Background */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-green-100 to-transparent"></div>

      {/* The Bookshelf Container */}
      <div className="w-full max-w-4xl bg-[#fffbeb] rounded-t-[3rem] rounded-b-xl border-x-[16px] border-t-[16px] border-b-[24px] border-[#d97706] shadow-2xl overflow-hidden flex flex-col relative z-10 min-h-[80vh]">
        
        {/* Wood Grain on Border */}
        <div className="absolute inset-0 border-[inherit] pointer-events-none opacity-30 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] z-20"></div>

        {/* Shelf Header */}
        <div className="bg-[#fcd34d] p-4 flex justify-between items-center border-b-8 border-[#b45309] relative z-30">
            <div className="flex items-center gap-2 text-[#92400e]">
                 <Layers size={24} />
            </div>
            <h1 className="text-[#78350f] font-black text-lg sm:text-xl tracking-widest uppercase shadow-white drop-shadow-sm">{title}</h1>
            <div className="bg-[#92400e] text-[#fef3c7] px-3 py-1 rounded font-mono font-bold text-xs shadow-inner">
                STEP {progress + 1}
            </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-[#fef3c7] relative z-30">
            <div 
                className="h-full bg-green-500 transition-all duration-500 ease-out" 
                style={{ width: `${progressPercentage}%` }}
            ></div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 sm:p-10 overflow-y-auto relative bg-[#fffbeb]">
             {/* Shadow inside shelf */}
            <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-black/10 to-transparent pointer-events-none"></div>
            {children}
        </div>

      </div>
    </div>
  );
};

export default ShelfFrame;

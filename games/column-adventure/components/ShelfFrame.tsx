
import React, { PropsWithChildren } from 'react';
import { Home } from 'lucide-react';

interface ShelfFrameProps extends PropsWithChildren {
  title: string;
  progress: number;
  totalStages: number;
  onExit: () => void;
}

const ShelfFrame: React.FC<ShelfFrameProps> = ({ title, children, progress, totalStages, onExit }) => {
  const progressPercentage = ((progress + 1) / totalStages) * 100;

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden font-sans text-slate-800">
      
      {/* Nature Background */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>

      {/* The Bookshelf Container - Green Theme */}
      <div className="w-full max-w-4xl bg-white rounded-t-[3rem] rounded-b-xl border-[12px] border-green-700 shadow-2xl overflow-hidden flex flex-col relative z-10 min-h-[80vh]">
        
        {/* Shelf Header */}
        <div className="bg-green-100 p-4 flex justify-between items-center border-b-8 border-green-600 relative z-30">
            <div className="flex items-center gap-2">
                 <button 
                    onClick={onExit}
                    className="p-2 bg-green-200 text-green-800 rounded-full hover:bg-green-300 transition-colors shadow-sm"
                    title="返回大厅"
                 >
                    <Home size={20} />
                 </button>
            </div>
            <h1 className="text-green-900 font-black text-lg sm:text-xl tracking-widest uppercase">{title}</h1>
            
            <div>
                {totalStages > 5 ? (
                    <div className="bg-green-800 text-green-50 px-3 py-1 rounded font-mono font-bold text-xs shadow-inner">
                        PAGE {progress + 1} / {totalStages}
                    </div>
                ) : (
                    <div className="flex gap-1.5">
                        {Array.from({ length: totalStages }).map((_, i) => (
                            <div key={i} className={`h-2 w-6 rounded-full border border-green-800/20 transition-all ${i <= progress ? 'bg-green-600' : 'bg-green-200'}`}></div>
                        ))}
                    </div>
                )}
            </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-green-50 relative z-30">
            <div 
                className="h-full bg-green-500 transition-all duration-500 ease-out" 
                style={{ width: `${progressPercentage}%` }}
            ></div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 sm:p-10 overflow-y-auto relative bg-white">
             {/* Inner Shadow */}
            <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-green-900/5 to-transparent pointer-events-none"></div>
            {children}
        </div>

      </div>
    </div>
  );
};

export default ShelfFrame;

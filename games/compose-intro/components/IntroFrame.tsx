import React, { PropsWithChildren } from 'react';
import { Sparkles } from 'lucide-react';

interface IntroFrameProps extends PropsWithChildren {
  title: string;
  progress: number;
  totalStages: number;
}

const IntroFrame: React.FC<IntroFrameProps> = ({ title, children, progress, totalStages }) => {
  const progressPercentage = ((progress + 1) / totalStages) * 100;

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden font-sans text-slate-800">
      
      {/* Magical Background */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 animate-pulse"></div>
      <div className="absolute top-20 left-20 w-72 h-72 bg-purple-600 rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-blob"></div>
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-pink-600 rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-blob animation-delay-2000"></div>

      {/* The Magic Scroll Container */}
      <div className="w-full max-w-4xl bg-white/95 backdrop-blur-md rounded-3xl border-4 border-purple-300 shadow-[0_0_50px_-12px_rgba(168,85,247,0.5)] overflow-hidden flex flex-col relative z-10 min-h-[80vh]">
        
        {/* Magic Header */}
        <div className="bg-purple-50 p-5 flex justify-between items-center border-b border-purple-100">
            <div className="flex items-center gap-2 text-purple-400">
                 <Sparkles size={18} />
            </div>
            <h1 className="text-purple-900 font-black text-xl sm:text-2xl tracking-tight">{title}</h1>
            <div className="px-3 py-1 bg-purple-100 rounded-full text-purple-600 font-bold text-xs">
                LEVEL {progress + 1}
            </div>
        </div>

        {/* Magic Progress Bar */}
        <div className="w-full h-1.5 bg-purple-50">
            <div 
                className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(168,85,247,0.8)]" 
                style={{ width: `${progressPercentage}%` }}
            ></div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 sm:p-12 overflow-y-auto relative">
            {children}
        </div>

      </div>
    </div>
  );
};

export default IntroFrame;
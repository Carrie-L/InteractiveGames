import React, { useState } from 'react';
import LayoutMagicGame from './games/layout-magic/LayoutMagicGame';
import ComposeIntroGame from './games/compose-intro/ComposeIntroGame';
import XiaoQi from './games/layout-magic/components/XiaoQi'; // Reuse the original XiaoQi for the landing page
import { GameId } from './types';
import { LayoutTemplate, Wand2, GraduationCap, Sparkles } from 'lucide-react';

export default function App() {
  const [activeGame, setActiveGame] = useState<GameId>('HOME');

  if (activeGame === 'LAYOUT_MAGIC') {
    return <LayoutMagicGame onExit={() => setActiveGame('HOME')} />;
  }

  if (activeGame === 'COMPOSE_INTRO') {
    return <ComposeIntroGame onExit={() => setActiveGame('HOME')} />;
  }

  return (
    <div className="min-h-screen bg-amber-50 flex flex-col items-center justify-center p-4 sm:p-8 font-sans">
       {/* Background Decor */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
      
      <div className="relative z-10 text-center max-w-4xl w-full">
         <div className="mb-12 animate-fade-in-down">
            <h1 className="text-5xl sm:text-6xl font-bold text-amber-800 mb-4 tracking-tight">
              小奇的 UI 魔法学院
            </h1>
            <p className="text-xl text-amber-700 max-w-xl mx-auto">
              跟随小奇猫咪，通过交互式游戏轻松掌握 Jetpack Compose 的核心奥义！
            </p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            
            {/* Game Card 1: Intro */}
            <button 
                onClick={() => setActiveGame('COMPOSE_INTRO')}
                className="group relative bg-white rounded-[2.5rem] p-8 shadow-xl border-4 border-white hover:border-purple-200 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl text-left overflow-hidden"
            >
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-100 rounded-full -mr-10 -mt-10 transition-transform group-hover:scale-150 z-0"></div>
                <div className="relative z-10">
                    <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 mb-6 shadow-sm group-hover:rotate-12 transition-transform">
                        <Wand2 size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-purple-700 transition-colors">Compose 魔法入门</h3>
                    <p className="text-gray-500 leading-relaxed mb-4">
                        了解 "声明式UI" 与传统方式的区别，学习如何施展 @Composable 咒语。
                    </p>
                    <div className="flex items-center text-purple-600 font-bold text-sm uppercase tracking-wider">
                        <Sparkles size={16} className="mr-2" /> 基础篇
                    </div>
                </div>
            </button>

            {/* Game Card 2: Layouts */}
            <button 
                onClick={() => setActiveGame('LAYOUT_MAGIC')}
                className="group relative bg-white rounded-[2.5rem] p-8 shadow-xl border-4 border-white hover:border-blue-200 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl text-left overflow-hidden"
            >
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-full -mr-10 -mt-10 transition-transform group-hover:scale-150 z-0"></div>
                <div className="relative z-10">
                     <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6 shadow-sm group-hover:rotate-12 transition-transform">
                        <LayoutTemplate size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-blue-700 transition-colors">布局魔法书</h3>
                    <p className="text-gray-500 leading-relaxed mb-4">
                        解开 Row 和 Column 的秘密，掌握主轴与交叉轴的终极控制权。
                    </p>
                    <div className="flex items-center text-blue-600 font-bold text-sm uppercase tracking-wider">
                        <GraduationCap size={16} className="mr-2" /> 进阶篇
                    </div>
                </div>
            </button>

         </div>

         <div className="mt-16">
             <XiaoQi emotion="happy" message="今天想学点什么新魔法呢？" />
         </div>
      </div>
    </div>
  );
}
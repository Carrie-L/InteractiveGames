
import React, { useState, useEffect } from 'react';
import ShelfFrame from './components/ShelfFrame';
import XiaoQi from './components/XiaoQi';
import { ColumnStage } from './types';
import { ArrowRight, ArrowLeft, Play, RefreshCw, Layers, Box, CheckCircle, Home, Ruler } from 'lucide-react';

const STAGE_ORDER: ColumnStage[] = [
  'INTRO',
  'STACKING_CHAOS',
  'COLUMN_RESCUE',
  'MECHANICS',
  'NESTING_QUIZ',
  'VICTORY'
];

interface ColumnAdventureGameProps {
  onExit: () => void;
}

export default function ColumnAdventureGame({ onExit }: ColumnAdventureGameProps) {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const currentStage = STAGE_ORDER[currentStageIndex];

  // Rescue State
  const [isRescued, setIsRescued] = useState(false);

  // Mechanics State
  const [mechanicStep, setMechanicStep] = useState<'IDLE' | 'MEASURE' | 'PLACE'>('IDLE');

  // Quiz State
  const [quizSelection, setQuizSelection] = useState<string | null>(null);
  const [quizCorrect, setQuizCorrect] = useState(false);

  const nextStage = () => {
    if (currentStageIndex < STAGE_ORDER.length - 1) {
      setCurrentStageIndex(prev => prev + 1);
      // Reset states
      setIsRescued(false);
      setMechanicStep('IDLE');
      setQuizSelection(null);
      setQuizCorrect(false);
    }
  };

  const prevStage = () => {
    if (currentStageIndex > 0) {
      setCurrentStageIndex(prev => prev - 1);
    }
  };

  const resetGame = () => {
      setCurrentStageIndex(0);
      setIsRescued(false);
      setMechanicStep('IDLE');
      setQuizSelection(null);
      setQuizCorrect(false);
  }

  const runMechanics = () => {
      if (mechanicStep !== 'IDLE') return;
      setMechanicStep('MEASURE');
      setTimeout(() => setMechanicStep('PLACE'), 2000);
      setTimeout(() => setMechanicStep('IDLE'), 4000);
  };

  // Better colors for the items
  const itemClasses = {
      apple:  "bg-rose-100 text-rose-700 border-2 border-rose-200 shadow-sm px-4 py-2 rounded-xl font-bold text-lg",
      banana: "bg-amber-100 text-amber-800 border-2 border-amber-200 shadow-sm px-4 py-2 rounded-xl font-bold text-lg",
      pear:   "bg-lime-100 text-lime-800 border-2 border-lime-200 shadow-sm px-4 py-2 rounded-xl font-bold text-lg"
  };

  const renderContent = () => {
    switch (currentStage) {
      case 'INTRO':
        return (
          <div className="flex flex-col items-center text-center space-y-8 animate-fade-in py-8">
            <div className="w-32 h-32 bg-green-50 rounded-3xl border-8 border-green-600 flex flex-col items-center justify-center shadow-xl transform rotate-3">
                 <div className="w-20 h-4 bg-green-300 rounded mb-2"></div>
                 <div className="w-20 h-4 bg-green-300 rounded mb-2"></div>
                 <div className="w-20 h-4 bg-green-300 rounded"></div>
            </div>
            
            <h2 className="text-4xl font-bold text-green-900 mb-4">Column 的垂直排列术</h2>
            <p className="text-xl text-green-800 max-w-lg leading-relaxed">
               欢迎来到布局工坊！<br/>
               今天我们要学习一个名为 <b>Column</b> 的神奇容器，<br/>
               它是所有垂直布局的英雄。
            </p>
            <button 
                onClick={nextStage}
                className="px-8 py-4 bg-green-600 text-white rounded-xl text-xl font-bold shadow-[0_4px_0_rgb(20,83,45)] hover:bg-green-500 hover:translate-y-1 hover:shadow-none transition-all flex items-center gap-2"
            >
                <Play size={24} fill="currentColor" /> 开始整理
            </button>
            <XiaoQi emotion="excited" message="我们有很多乱糟糟的方块需要整理，快来帮忙！" />
          </div>
        );

      case 'STACKING_CHAOS':
        return (
            <div className="space-y-8">
                 <div className="text-center">
                    <h2 className="text-3xl font-bold text-green-900">等等，它们怎么叠在一起了？</h2>
                    <p className="text-green-700">Compose 的默认魔法是“堆叠”。如果没有容器，所有东西都会挤在 (0,0) 点。</p>
                </div>

                <div className="flex justify-center py-8">
                    <div className="w-64 h-96 bg-white border-4 border-slate-200 rounded-[2.5rem] relative shadow-md overflow-hidden">
                         <span className="absolute top-4 left-4 text-xs font-mono text-slate-300 bg-slate-50 px-1 rounded">(0,0)</span>
                         
                         {/* Stacked Items */}
                         <div className="absolute top-8 left-8 opacity-90 transform translate-x-0 translate-y-0 z-30">
                             <div className={itemClasses.apple}>
                                 苹果
                             </div>
                         </div>
                         <div className="absolute top-8 left-8 opacity-90 transform translate-x-2 translate-y-2 z-20">
                             <div className={itemClasses.banana}>
                                 香蕉
                             </div>
                         </div>
                          <div className="absolute top-8 left-8 opacity-90 transform translate-x-4 translate-y-4 z-10">
                             <div className={itemClasses.pear}>
                                 梨子
                             </div>
                         </div>
                    </div>
                </div>

                <div className="flex justify-center">
                    <XiaoQi emotion="confused" message="哎呀！字都黏在一起了，根本看不清。我们需要一个容器！" />
                </div>
            </div>
        );

      case 'COLUMN_RESCUE':
        return (
             <div className="space-y-6">
                 <div className="text-center">
                    <h2 className="text-3xl font-bold text-green-900">英雄登场：Column</h2>
                    <p className="text-green-700">Column 就像一个神奇的书架，能自动把东西一个接一个往下放。</p>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-12">
                    
                    <div className="flex flex-col gap-4">
                        <div className="bg-slate-800 p-4 rounded-xl font-mono text-sm text-slate-300 shadow-lg">
                            {isRescued ? (
                                <>
                                    <div className="animate-fade-in"><span className="text-yellow-400">Column</span> {'{'}</div>
                                    <div className="pl-4 transition-all">Text("苹果")</div>
                                    <div className="pl-4 transition-all">Text("香蕉")</div>
                                    <div className="pl-4 transition-all">Text("梨子")</div>
                                    <div className="animate-fade-in">{'}'}</div>
                                </>
                            ) : (
                                <>
                                    <div className="text-gray-500 opacity-50 italic mb-2">// 这里缺少容器...</div>
                                    <div>Text("苹果")</div>
                                    <div>Text("香蕉")</div>
                                    <div>Text("梨子")</div>
                                    <div className="h-4"></div>
                                </>
                            )}
                        </div>
                        <button 
                            onClick={() => setIsRescued(!isRescued)}
                            className={`px-6 py-3 rounded-lg font-bold shadow-md transition-all flex items-center justify-center gap-2 ${isRescued ? 'bg-slate-200 text-slate-500' : 'bg-green-600 text-white hover:bg-green-500 animate-pulse'}`}
                        >
                            {isRescued ? <RefreshCw size={20}/> : <Layers size={20}/>}
                            {isRescued ? "撤销魔法" : "施展 Column 魔法"}
                        </button>
                    </div>

                    {/* Phone Preview */}
                     <div className="w-64 h-96 bg-white border-4 border-slate-200 rounded-[2.5rem] relative shadow-md overflow-hidden p-6 transition-all duration-500">
                         {isRescued ? (
                             // Column Layout
                             <div className="flex flex-col gap-3 items-start h-full pt-4">
                                 <div className={`${itemClasses.apple} w-full animate-slide-down`} style={{animationDelay: '0ms'}}>
                                     苹果
                                 </div>
                                 <div className={`${itemClasses.banana} w-full animate-slide-down`} style={{animationDelay: '100ms'}}>
                                     香蕉
                                 </div>
                                 <div className={`${itemClasses.pear} w-full animate-slide-down`} style={{animationDelay: '200ms'}}>
                                     梨子
                                 </div>
                             </div>
                         ) : (
                             // Chaos Layout
                             <div className="relative pt-4 pl-2">
                                  <div className={`${itemClasses.apple} absolute top-0 left-0 opacity-90 z-30`}>
                                     苹果
                                 </div>
                                 <div className={`${itemClasses.banana} absolute top-2 left-2 opacity-80 z-20`}>
                                     香蕉
                                 </div>
                                 <div className={`${itemClasses.pear} absolute top-4 left-4 opacity-80 z-10`}>
                                     梨子
                                 </div>
                             </div>
                         )}
                    </div>
                </div>

                 <div className="flex justify-center">
                    <XiaoQi emotion={isRescued ? "happy" : "happy"} message={isRescued ? "哇！现在它们整整齐齐地排好队了！" : "快点击按钮，把它们放进 Column 里！"} />
                </div>
            </div>
        );
      
      case 'MECHANICS':
        return (
             <div className="space-y-6">
                 <div className="text-center">
                    <h2 className="text-3xl font-bold text-green-900">Column 的内心戏</h2>
                    <p className="text-green-700">Column 很聪明，它分两步走：先“量身高”(Measure)，再“放位置”(Place)。</p>
                </div>

                <div className="flex flex-col items-center gap-6">
                     <div className="w-full max-w-md bg-green-50 border-4 border-green-300 rounded-3xl p-8 min-h-[300px] relative flex flex-col items-center">
                        <span className="absolute top-2 left-4 text-green-700 font-bold uppercase text-xs tracking-widest">Internal Logic</span>
                        
                        {/* Animated Kids */}
                         <div className="relative w-full flex-1 mt-6">
                            {/* Apple */}
                            <div className={`absolute left-1/2 -translate-x-1/2 transition-all duration-700 
                                ${mechanicStep === 'IDLE' ? 'top-0 opacity-50' : ''}
                                ${mechanicStep === 'MEASURE' ? 'top-10 scale-110' : ''}
                                ${mechanicStep === 'PLACE' ? 'top-0' : ''}
                            `}>
                                <div className={itemClasses.apple + " relative"}>
                                    Text("苹果")
                                    {mechanicStep === 'MEASURE' && (
                                        <div className="absolute -right-12 top-0 h-full border-l-2 border-black flex items-center pl-1 text-xs font-mono animate-fade-in text-black">
                                            <Ruler size={12} className="mr-1"/> 50
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Banana */}
                            <div className={`absolute left-1/2 -translate-x-1/2 transition-all duration-700 
                                ${mechanicStep === 'IDLE' ? 'top-2 opacity-50' : ''}
                                ${mechanicStep === 'MEASURE' ? 'top-32 scale-110' : ''}
                                ${mechanicStep === 'PLACE' ? 'top-[60px]' : ''}
                            `}>
                                <div className={itemClasses.banana + " relative"}>
                                    Text("香蕉")
                                    {mechanicStep === 'MEASURE' && (
                                        <div className="absolute -right-12 top-0 h-full border-l-2 border-black flex items-center pl-1 text-xs font-mono animate-fade-in text-black">
                                            <Ruler size={12} className="mr-1"/> 50
                                        </div>
                                    )}
                                </div>
                            </div>
                         </div>

                         {/* Status Text */}
                         <div className="mt-4 h-8 text-center font-bold text-green-700">
                             {mechanicStep === 'MEASURE' && "第一步：挨个量身高..."}
                             {mechanicStep === 'PLACE' && "第二步：根据身高，一个个放好 (y=0, y=50...)"}
                             {mechanicStep === 'IDLE' && "准备就绪"}
                         </div>
                     </div>

                     <button 
                        onClick={runMechanics}
                        disabled={mechanicStep !== 'IDLE'}
                        className="px-6 py-3 bg-green-600 text-white rounded-full font-bold shadow-lg hover:bg-green-700 disabled:opacity-50 flex items-center gap-2"
                    >
                        <Play size={20} /> 播放慢动作
                    </button>
                </div>
            </div>
        );

      case 'NESTING_QUIZ':
        return (
             <div className="space-y-6 max-w-2xl mx-auto">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-green-900">布局挑战：当 Column 遇见 Column</h2>
                    <p className="text-green-800">
                        Column 是可组合的！也就是“套娃”。<br/>
                        看看下面的代码，猜猜屏幕上会显示什么？
                    </p>
                </div>

                <div className="bg-slate-800 p-6 rounded-2xl text-slate-300 font-mono text-sm shadow-xl">
                    <div>Column {'{'}</div>
                    <div className="pl-4 text-rose-400">Text("苹果")</div>
                    <div className="pl-4 text-amber-300">Text("香蕉")</div>
                    <div className="pl-4 text-yellow-100">Column {'{'}</div>
                    <div className="pl-8 text-cyan-300">Text("A级")</div>
                    <div className="pl-8 text-cyan-300">Text("B级")</div>
                    <div className="pl-4">{'}'}</div>
                    <div>{'}'}</div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                        { 
                            id: 'A', 
                            label: '选项 A',
                            content: ['苹果', '香蕉', 'A级', 'B级'],
                            correct: true 
                        },
                        { 
                            id: 'B', 
                            label: '选项 B',
                            content: ['苹果', '香蕉', 'A级 B级'], // A B inline
                            correct: false 
                        },
                         { 
                            id: 'C', 
                            label: '选项 C',
                            content: ['苹果香蕉A级B级'], // All stack
                            correct: false 
                        }
                    ].map((opt) => (
                        <button
                            key={opt.id}
                            onClick={() => {
                                setQuizSelection(opt.id);
                                setQuizCorrect(opt.correct);
                            }}
                            className={`border-4 rounded-xl p-4 bg-white hover:bg-green-50 transition-all flex flex-col items-center gap-2 ${
                                quizSelection === opt.id 
                                ? (opt.correct ? 'border-green-500 ring-2 ring-green-200' : 'border-red-500 ring-2 ring-red-200')
                                : 'border-slate-200'
                            }`}
                        >
                            <span className="font-bold text-slate-500">{opt.label}</span>
                            {/* Mini Phone Mockup */}
                            <div className="w-20 h-32 border-2 border-slate-300 rounded-lg p-1 flex flex-col gap-1 overflow-hidden text-[8px] font-bold text-center">
                                {opt.id === 'A' && (
                                    <>
                                        <div className="bg-rose-100 w-full py-0.5 text-rose-800">苹果</div>
                                        <div className="bg-amber-100 w-full py-0.5 text-amber-800">香蕉</div>
                                        <div className="bg-blue-100 w-full py-0.5">A级</div>
                                        <div className="bg-blue-100 w-full py-0.5">B级</div>
                                    </>
                                )}
                                {opt.id === 'B' && (
                                     <>
                                        <div className="bg-rose-100 w-full py-0.5">苹果</div>
                                        <div className="bg-amber-100 w-full py-0.5">香蕉</div>
                                        <div className="flex gap-1">
                                            <div className="bg-blue-100 w-1/2 py-0.5">A级</div>
                                            <div className="bg-blue-100 w-1/2 py-0.5">B级</div>
                                        </div>
                                    </>
                                )}
                                {opt.id === 'C' && (
                                     <div className="relative h-full w-full">
                                         <div className="absolute top-0 left-0 w-full bg-rose-100 text-left pl-1">苹果</div>
                                         <div className="absolute top-1 left-1 w-full bg-amber-100 text-left pl-1">香蕉</div>
                                         <div className="absolute top-2 left-2 w-full bg-blue-100 text-left pl-1">A级</div>
                                     </div>
                                )}
                            </div>
                        </button>
                    ))}
                </div>

                 {quizSelection && (
                        <div className={`p-4 rounded-xl flex gap-3 items-start ${quizCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {quizCorrect ? <CheckCircle size={24} /> : <Box size={24} />}
                            <p className="mt-1 font-medium">
                                {quizCorrect 
                                    ? "答对了！内部的 Column 也是一个整体，会放在'香蕉'下面。而它内部的 A 和 B 也会垂直排列。" 
                                    : "不对哦。Column 里面的东西永远是垂直排列的，哪怕是嵌套的 Column 也是一样。"}
                            </p>
                        </div>
                    )}
            </div>
        );

      case 'VICTORY':
         return (
            <div className="flex flex-col items-center text-center space-y-8 animate-scale-in py-10">
                <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center border-4 border-green-500 shadow-xl">
                     <Layers size={64} className="text-green-600" />
                </div>
                
                <h2 className="text-4xl font-bold text-green-900">垂直布局大师！</h2>
                <p className="text-xl text-green-700 max-w-lg">
                    恭喜你！你已经完全掌握了 <b>Column</b> 的秘密。<br/>
                    无论是简单的列表，还是复杂的嵌套布局，<br/>
                    现在都难不倒你了！
                </p>

                <div className="flex gap-4">
                     <button 
                        onClick={resetGame} 
                        className="px-8 py-3 bg-white border-2 border-green-600 text-green-700 rounded-full font-bold hover:bg-green-50 flex items-center gap-2"
                    >
                        <RefreshCw size={20} /> 再玩一次
                    </button>
                    <button 
                        onClick={onExit}
                        className="px-8 py-3 bg-green-600 text-white rounded-full font-bold hover:bg-green-700 shadow-md flex items-center gap-2"
                    >
                        <Home size={20} /> 返回大厅
                    </button>
                </div>

                 <XiaoQi emotion="excited" message="继续前进，探索更多 Compose 的奇妙世界吧！" />
            </div>
        );

      default:
        return null;
    }
  };

  return (
    <ShelfFrame 
        title="Column 垂直排列术" 
        progress={currentStageIndex} 
        totalStages={STAGE_ORDER.length}
        onExit={onExit}
    >
         <div className="min-h-[60vh] flex flex-col">
            {renderContent()}
         </div>

         {/* Nav */}
         {currentStage !== 'INTRO' && currentStage !== 'VICTORY' && (
            <div className="flex justify-between items-center mt-10 pt-6 border-t border-green-200">
                <button 
                    onClick={prevStage}
                    className="flex items-center gap-2 text-green-800 hover:text-green-900 font-medium px-4 py-2 rounded-lg hover:bg-green-100 transition-colors"
                >
                    <ArrowLeft size={20} /> 上一页
                </button>

                {/* Gates */}
                {currentStage === 'COLUMN_RESCUE' && !isRescued ? (
                     <span className="text-green-700 opacity-60 text-sm font-bold">施展魔法后继续...</span>
                ) : currentStage === 'NESTING_QUIZ' && !quizCorrect ? (
                     <span className="text-green-700 opacity-60 text-sm font-bold">答对后继续...</span>
                ) : (
                    <button 
                        onClick={nextStage}
                        className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl font-bold shadow-md hover:bg-green-700 hover:shadow-lg transition-all transform hover:translate-x-1"
                    >
                        下一页 <ArrowRight size={20} />
                    </button>
                )}
            </div>
         )}
    </ShelfFrame>
  );
}

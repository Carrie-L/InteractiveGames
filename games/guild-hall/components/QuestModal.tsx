
import React, { useState } from 'react';
import { Quest } from '../types';
import { X, ExternalLink, Sparkles, Loader2, GitBranch, Star, Flower2, Leaf } from 'lucide-react';
import { verifySubmission } from '../utils/magister';

interface QuestModalProps {
  quest: Quest;
  status: 'available' | 'accepted' | 'completed';
  onClose: () => void;
  onAccept: () => void;
  onComplete: () => void;
}

const QuestModal: React.FC<QuestModalProps> = ({ quest, status, onClose, onAccept, onComplete }) => {
  const [repoLink, setRepoLink] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!repoLink) return;
    setIsVerifying(true);
    const result = await verifySubmission(quest.title, repoLink);
    setIsVerifying(false);
    setVerificationResult(result);
    setTimeout(() => {
        onComplete();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050810]/90 backdrop-blur-md animate-fade-in">
      
      {/* Modal Container - The Floral Tablet */}
      <div className="bg-[#13192b] w-full max-w-lg border-2 border-[#f0d1f5]/40 shadow-[0_0_60px_rgba(240,209,245,0.15)] relative overflow-hidden flex flex-col max-h-[90vh] rounded-[3rem]">
        
        {/* Floral Corner Decorations */}
        <div className="absolute top-0 left-0 p-4 pointer-events-none opacity-60">
            <Flower2 className="text-[#f0d1f5]" size={40} />
        </div>
        <div className="absolute top-0 right-0 p-4 pointer-events-none opacity-60 transform rotate-90">
            <Leaf className="text-[#f0d1f5]" size={40} />
        </div>
        <div className="absolute bottom-0 left-0 p-4 pointer-events-none opacity-60 transform -rotate-90">
            <Leaf className="text-[#f0d1f5]" size={40} />
        </div>
        <div className="absolute bottom-0 right-0 p-4 pointer-events-none opacity-60 transform rotate-180">
            <Flower2 className="text-[#f0d1f5]" size={40} />
        </div>

        {/* Header */}
        <div className="bg-[#1a2138] p-8 flex justify-between items-start border-b border-[#f0d1f5]/10 relative z-10 rounded-t-[3rem]">
            <div className="flex flex-col gap-2 pl-4">
                <div className="flex items-center gap-2 text-cyan-300 text-[10px] font-bold uppercase tracking-[0.2em]">
                    <Star size={10} fill="currentColor" />
                    <span>Quest Details</span>
                </div>
                <h2 className="font-serif font-bold text-2xl sm:text-3xl tracking-wide text-[#f0d1f5] drop-shadow-sm">{quest.title}</h2>
            </div>
            <button onClick={onClose} className="text-[#f0d1f5]/50 hover:text-[#f0d1f5] transition-colors bg-[#f0d1f5]/10 rounded-full p-1">
                <X size={24} />
            </button>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto text-slate-300 relative scrollbar-thin scrollbar-thumb-[#f0d1f5]/30 scrollbar-track-transparent flex-1">
             
             <div className="space-y-8 px-2">
                 
                 {/* Stats Row - Rounded Capsules */}
                 <div className="flex items-center justify-center gap-4 pb-6 border-b border-[#f0d1f5]/10">
                     <div className="bg-[#0b1021] border border-[#f0d1f5]/20 px-6 py-2 rounded-full text-center min-w-[100px]">
                         <div className="text-[9px] text-[#f0d1f5]/70 uppercase font-bold tracking-widest">Rank</div>
                         <div className="font-serif font-bold text-xl text-white">{quest.rank}</div>
                     </div>
                     <div className="bg-[#0b1021] border border-[#f0d1f5]/20 px-6 py-2 rounded-full text-center min-w-[100px]">
                         <div className="text-[9px] text-[#f0d1f5]/70 uppercase font-bold tracking-widest">XP</div>
                         <div className="font-mono font-bold text-xl text-cyan-300">{quest.xp}</div>
                     </div>
                 </div>

                 {/* Description */}
                 <div className="text-center">
                     <p className="text-lg leading-relaxed text-[#e2e8f0] font-serif italic opacity-90">
                         "{quest.description}"
                     </p>
                     <div className="mt-6 flex justify-center">
                        <div className="px-4 py-1.5 bg-[#f0d1f5]/10 text-[#f0d1f5] text-[10px] tracking-[0.15em] uppercase rounded-full border border-[#f0d1f5]/20">
                            Project: {quest.subTitle}
                        </div>
                     </div>
                 </div>

                 {/* Requirements List */}
                 <div className="bg-[#0b1021] p-6 border border-[#f0d1f5]/10 relative rounded-[2rem]">
                     <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#13192b] px-4 text-[#f0d1f5] text-[10px] font-bold uppercase tracking-widest">
                         Requirements
                     </div>
                     <ul className="space-y-3 mt-1">
                         {quest.requirements.map((req, idx) => (
                             <li key={idx} className="text-sm flex items-center gap-3 text-slate-400">
                                 <div className="w-1.5 h-1.5 bg-[#f0d1f5] rounded-full shrink-0"></div> 
                                 {req}
                             </li>
                         ))}
                     </ul>
                 </div>

                 {/* External Link */}
                 <div className="flex justify-center">
                     <a 
                        href={quest.codelabUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-cyan-300 text-xs font-bold hover:text-white transition-colors uppercase tracking-widest hover:underline"
                     >
                         <ExternalLink size={12} /> 
                         Open Scroll (Codelab)
                     </a>
                 </div>

                 {/* Action Area */}
                 <div className="pt-4">
                     {status === 'available' && (
                         <button 
                            onClick={onAccept}
                            className="w-full py-4 bg-[#f0d1f5] hover:bg-white text-[#0b1021] font-bold text-sm shadow-[0_0_20px_rgba(240,209,245,0.3)] transition-all flex items-center justify-center gap-3 uppercase tracking-[0.2em] rounded-full hover:scale-105 transform"
                         >
                             <Sparkles size={16} /> Accept Quest
                         </button>
                     )}

                     {status === 'accepted' && !verificationResult && (
                         <div className="space-y-6 animate-fade-in">
                             <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-bold text-[#f0d1f5]/70 uppercase tracking-wider flex items-center gap-2 ml-2">
                                    <GitBranch size={12}/> Submit Work:
                                </label>
                                <input 
                                    type="text" 
                                    value={repoLink}
                                    onChange={(e) => setRepoLink(e.target.value)}
                                    placeholder="https://github.com/..."
                                    className="w-full p-4 bg-[#0b1021] border border-[#f0d1f5]/20 focus:border-[#f0d1f5] outline-none font-mono text-sm text-white placeholder-slate-600 transition-all rounded-2xl"
                                />
                             </div>
                             <button 
                                onClick={handleSubmit}
                                disabled={!repoLink || isVerifying}
                                className="w-full py-4 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-800 text-white font-bold shadow-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 uppercase tracking-[0.2em] rounded-full"
                             >
                                 {isVerifying ? <Loader2 className="animate-spin" /> : "Verify Magic"}
                             </button>
                         </div>
                     )}

                     {status === 'completed' && (
                         <div className="text-center p-5 border border-[#f0d1f5]/30 bg-[#f0d1f5]/10 text-[#f0d1f5] font-bold flex flex-col items-center gap-2 uppercase tracking-widest text-sm rounded-3xl">
                             <Sparkles size={20} />
                             Quest Completed
                         </div>
                     )}

                     {/* Result */}
                     {verificationResult && (
                         <div className="mt-6 p-6 bg-[#0b1021] border border-[#f0d1f5]/20 rounded-2xl text-slate-300 text-center font-serif italic leading-relaxed">
                             <div className="mb-2 flex justify-center text-[#f0d1f5] opacity-80"><Star size={12} fill="currentColor"/></div>
                             "{verificationResult}"
                         </div>
                     )}
                 </div>
             </div>
        </div>
      </div>
    </div>
  );
};

export default QuestModal;

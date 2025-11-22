
import React, { useState } from 'react';
import { Quest } from '../types';
import { X, ExternalLink, Scroll, Check, Loader2, Sparkles, Star } from 'lucide-react';
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
    
    // Simulate network/AI delay
    const result = await verifySubmission(quest.title, repoLink);
    
    setIsVerifying(false);
    setVerificationResult(result);
    
    // Wait a moment for the user to read, then complete
    setTimeout(() => {
        onComplete();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      {/* Modal Container */}
      <div className="bg-[#16162c] w-full max-w-lg rounded-2xl shadow-[0_0_50px_rgba(236,72,153,0.15)] border border-pink-500/30 relative overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Top Decor Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent opacity-70 shadow-[0_0_10px_#ec4899]"></div>

        {/* Header */}
        <div className="bg-[#1f1b33] p-5 flex justify-between items-center border-b border-pink-500/10 relative">
            <div className="flex items-center gap-3">
                <div className="bg-pink-500/10 p-2 rounded-lg border border-pink-500/20">
                    <Star className="text-pink-400 w-5 h-5 fill-pink-500/20" />
                </div>
                <h2 className="font-serif font-bold text-xl tracking-wide text-pink-50 drop-shadow-sm">{quest.title}</h2>
            </div>
            <button onClick={onClose} className="hover:bg-pink-500/10 p-2 rounded-full transition-colors text-pink-300/50 hover:text-pink-200">
                <X size={20} />
            </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto text-pink-50 relative scrollbar-thin scrollbar-thumb-pink-500/20 scrollbar-track-transparent">
             
             {/* Background Star Pattern */}
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none"></div>

             <div className="relative z-10 space-y-6">
                 
                 <div className="flex items-center justify-between p-4 bg-[#0f0c1d] rounded-xl border border-pink-500/10">
                     <div>
                         <div className="text-[10px] text-pink-300/60 uppercase font-bold tracking-widest">{quest.subTitle}</div>
                         <div className="font-bold text-xl mt-1 text-white flex items-center gap-2">
                             Rank {quest.rank} 
                             <Sparkles size={14} className="text-yellow-300" />
                         </div>
                     </div>
                     <div className="text-right">
                         <div className="text-[10px] text-pink-300/60 uppercase font-bold tracking-widest">Bounty</div>
                         <div className="font-bold text-xl text-cyan-400 mt-1 drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">
                             {quest.xp} XP
                         </div>
                     </div>
                 </div>

                 <div>
                     <h3 className="font-bold text-sm mb-3 flex items-center gap-2 text-pink-200 uppercase tracking-wide">
                         <Scroll size={16} className="text-pink-400"/> 
                         Mission Brief
                     </h3>
                     <p className="text-sm leading-relaxed text-pink-100/80 bg-pink-500/5 p-4 rounded-lg border-l-2 border-pink-500/30 italic">
                         "{quest.description}"
                     </p>
                 </div>

                 <div className="bg-[#1f1b33]/50 p-5 rounded-xl border border-pink-500/10">
                     <h4 className="font-bold text-xs mb-3 text-pink-300 uppercase tracking-wider">Requirements:</h4>
                     <ul className="space-y-2">
                         {quest.requirements.map((req, idx) => (
                             <li key={idx} className="text-sm flex items-start gap-2 text-pink-50/70">
                                 <span className="text-pink-500 mt-1">◆</span> {req}
                             </li>
                         ))}
                     </ul>
                 </div>

                 <div className="flex justify-center">
                     <a 
                        href={quest.codelabUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 text-cyan-400 text-sm font-bold hover:text-cyan-300 transition-colors px-4 py-2 rounded-full hover:bg-cyan-900/20 border border-transparent hover:border-cyan-500/30"
                     >
                         <ExternalLink size={14} className="group-hover:-translate-y-0.5 transition-transform" /> 
                         Access Ancient Scroll (Codelab)
                     </a>
                 </div>

                 {/* Interaction Zone */}
                 <div className="mt-8 pt-6 border-t border-pink-500/10">
                     {status === 'available' && (
                         <button 
                            onClick={onAccept}
                            className="w-full py-3.5 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold rounded-xl shadow-lg shadow-pink-900/20 hover:shadow-pink-500/20 hover:scale-[1.02] transition-all active:scale-95 flex items-center justify-center gap-2"
                         >
                             <Sparkles size={18} /> Accept Mission
                         </button>
                     )}

                     {status === 'accepted' && !verificationResult && (
                         <div className="space-y-4 animate-fade-in">
                             <label className="block text-xs font-bold text-pink-300 uppercase tracking-wider">
                                 Submit Proof (GitHub Link):
                             </label>
                             <input 
                                type="text" 
                                value={repoLink}
                                onChange={(e) => setRepoLink(e.target.value)}
                                placeholder="https://github.com/..."
                                className="w-full p-3.5 bg-[#0f0c1d] border border-pink-500/20 rounded-xl focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none font-mono text-sm text-pink-100 placeholder-pink-500/20 transition-all"
                             />
                             <button 
                                onClick={handleSubmit}
                                disabled={!repoLink || isVerifying}
                                className="w-full py-3.5 bg-emerald-600/80 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 border border-emerald-500/30"
                             >
                                 {isVerifying ? <Loader2 className="animate-spin" /> : "🔮 Verify Magic Purity"}
                             </button>
                         </div>
                     )}

                     {status === 'completed' && (
                         <div className="text-center p-4 bg-emerald-900/20 border border-emerald-500/30 rounded-xl text-emerald-400 font-bold flex flex-col items-center gap-2 animate-pulse">
                             <Check size={32} className="text-emerald-500" />
                             Mission Accomplished
                         </div>
                     )}

                     {/* Verification Result Feedback */}
                     {verificationResult && (
                         <div className="mt-4 p-4 bg-[#25203a] border border-yellow-500/30 rounded-xl text-yellow-100/90 text-sm italic font-serif animate-slide-up shadow-inner">
                             <h5 className="font-bold mb-2 not-italic text-yellow-400 flex items-center gap-2">
                                 <Star size={14} fill="currentColor"/> Grand Magister's Decree:
                             </h5>
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

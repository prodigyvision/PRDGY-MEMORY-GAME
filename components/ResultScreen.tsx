
import React from 'react';

interface ResultScreenProps {
  isWin: boolean;
  level: number;
  onRetry: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ isWin, level, onRetry }) => {
  return (
    <div className="text-center glass-card p-12 max-w-xl w-full mx-auto animate-[fade-in_0.5s_ease-out]">
      {isWin ? (
        <>
          <div className="mb-6 inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-500/20 text-green-500 text-5xl border-2 border-green-500 animate-bounce">
            <i className="fa-solid fa-crown"></i>
          </div>
          <h2 className="text-5xl font-black text-white mb-4 tracking-tighter italic">LEGENDARY WIN</h2>
          <p className="text-white/60 mb-8 leading-relaxed">
            You have successfully navigated the Konfused Kingdom and matched all artifacts. Your wisdom is rewarded.
          </p>
          
          <div className="bg-black/40 border-2 border-dashed border-[#E50914] rounded-xl p-8 mb-8 relative group overflow-hidden">
             <div className="absolute top-0 right-0 p-2 bg-[#E50914] text-white text-[8px] font-bold uppercase tracking-widest rotate-45 translate-x-4 -translate-y-1">REWARD</div>
             <p className="text-white/40 text-[10px] uppercase tracking-widest mb-2 font-bold">Use this code at checkout</p>
             <h3 className="text-4xl font-black text-[#E50914] tracking-widest animate-pulse">5ILVER25</h3>
          </div>

          <a 
            href="https://www.prdgy.in/discount/5ilver25?redirect=%2Fcollections%2Fkonfused-kingdom"
            className="block w-full py-4 bg-[#E50914] text-white font-bold rounded-lg mb-4 shadow-lg hover:bg-red-700 transition-colors"
          >
            CLAIM REWARD NOW
          </a>
        </>
      ) : (
        <>
          <div className="mb-6 inline-flex items-center justify-center w-24 h-24 rounded-full bg-red-500/20 text-red-500 text-5xl border-2 border-red-500">
            <i className="fa-solid fa-skull"></i>
          </div>
          <h2 className="text-5xl font-black text-white mb-4 tracking-tighter italic">OVERCOME</h2>
          <p className="text-white/60 mb-8 leading-relaxed">
            The kingdom's confusion was too great. You fell at <span className="text-white font-bold">Level {level}</span>.
          </p>
        </>
      )}

      <button 
        onClick={onRetry}
        className="w-full py-4 border border-white/20 text-white font-bold rounded-lg hover:bg-white/5 transition-colors uppercase tracking-widest text-sm"
      >
        {isWin ? 'PLAY AGAIN' : 'TRY AGAIN'}
      </button>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default ResultScreen;

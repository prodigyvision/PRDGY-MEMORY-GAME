
import React from 'react';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="text-center max-w-lg mx-auto">
      <div className="mb-8 relative inline-block">
        <div className="absolute -inset-4 bg-red-600/20 blur-xl rounded-full"></div>
        <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter relative">
          KONFUSED<br/>KINGDOM
        </h2>
      </div>
      
      <p className="text-white/60 text-lg mb-10 leading-relaxed font-light">
        A high-stakes memory challenge. Match the PRDGY artifacts across 5 levels to conquer the kingdom and unlock a <span className="text-white font-bold underline decoration-[#E50914] decoration-2">25% OFF reward</span>.
      </p>

      <button 
        onClick={onStart}
        className="group relative px-12 py-5 bg-[#E50914] text-white font-black text-xl rounded shadow-[0_0_20px_rgba(229,9,20,0.4)] hover:shadow-[0_0_40px_rgba(229,9,20,0.6)] transition-all duration-300 transform hover:scale-105"
      >
        <span className="relative z-10">ENTER THE REALM</span>
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity rounded"></div>
      </button>

      <div className="mt-12 flex justify-center gap-8 opacity-40">
        <div className="flex flex-col items-center gap-2">
          <i className="fa-solid fa-brain text-xl"></i>
          <span className="text-[10px] uppercase tracking-widest">Focus</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <i className="fa-solid fa-stopwatch text-xl"></i>
          <span className="text-[10px] uppercase tracking-widest">Speed</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <i className="fa-solid fa-gift text-xl"></i>
          <span className="text-[10px] uppercase tracking-widest">Reward</span>
        </div>
      </div>
    </div>
  );
};

export default StartScreen;

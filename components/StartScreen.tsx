
import React from 'react';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="text-center w-full px-4 max-w-lg mx-auto">
      <div className="mb-6 relative inline-block">
        <div className="absolute -inset-4 bg-red-600/10 blur-xl rounded-full"></div>
        <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter relative leading-none uppercase">
          KONFUSED<br/>KINGDOM
        </h2>
      </div>
      
      <p className="text-white/60 text-sm md:text-lg mb-8 md:mb-10 leading-relaxed font-light">
        Match the PRDGY artifacts to conquer the kingdom and unlock a <span className="text-white font-bold underline decoration-[#E50914] decoration-2">25% OFF reward</span>.
      </p>

      <button 
        onClick={onStart}
        className="group relative w-full md:w-auto px-10 py-4 md:py-5 bg-[#E50914] text-white font-black text-lg md:text-xl rounded shadow-[0_0_20px_rgba(229,9,20,0.4)] hover:shadow-[0_0_40px_rgba(229,9,20,0.6)] transition-all duration-300 transform hover:scale-105 active:scale-95"
      >
        <span className="relative z-10">ENTER THE REALM</span>
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity rounded"></div>
      </button>

      <div className="mt-10 flex justify-center gap-6 md:gap-8 opacity-30">
        <div className="flex flex-col items-center gap-1">
          <i className="fa-solid fa-brain text-lg"></i>
          <span className="text-[8px] uppercase tracking-widest font-bold">Focus</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <i className="fa-solid fa-stopwatch text-lg"></i>
          <span className="text-[8px] uppercase tracking-widest font-bold">Speed</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <i className="fa-solid fa-gift text-lg"></i>
          <span className="text-[8px] uppercase tracking-widest font-bold">Reward</span>
        </div>
      </div>
    </div>
  );
};

export default StartScreen;

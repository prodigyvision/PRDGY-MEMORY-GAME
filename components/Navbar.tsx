
import React from 'react';
import { GameStatus } from '../types';

interface NavbarProps {
  isMuted: boolean;
  toggleMute: () => void;
  currentLevel: number;
  timeLeft: number;
  status: GameStatus;
}

const Navbar: React.FC<NavbarProps> = ({ isMuted, toggleMute, currentLevel, timeLeft, status }) => {
  return (
    <nav className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-50">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-black text-white tracking-tighter">
          PRDGY<span className="text-[#E50914]">.</span>
        </h1>
        {status === 'PLAYING' && (
          <div className="hidden md:flex items-center gap-2 glass-card px-4 py-1.5 text-sm font-semibold">
            <span className="text-white/50">LEVEL</span>
            <span className="text-white">{currentLevel}/5</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        {status === 'PLAYING' && (
          <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold border ${timeLeft < 10 ? 'bg-red-500/20 border-red-500 text-red-500 animate-pulse' : 'glass-card text-white'}`}>
            <i className="fa-solid fa-clock"></i>
            <span>{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
          </div>
        )}
        
        <button 
          onClick={toggleMute}
          className="w-10 h-10 flex items-center justify-center rounded-full glass-card hover:bg-white/10 transition-colors"
        >
          <i className={`fa-solid ${isMuted ? 'fa-volume-mute text-red-500' : 'fa-volume-high text-white'}`}></i>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

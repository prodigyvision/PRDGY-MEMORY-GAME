
import React from 'react';
import { CardData } from '../types';

interface MemoryCardProps {
  card: CardData;
  onClick: () => void;
}

const MemoryCard: React.FC<MemoryCardProps> = ({ card, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`relative aspect-[3/4] cursor-pointer group transition-all duration-500 
        ${card.isFlipped ? 'flipped' : ''} 
        ${card.isMatched ? 'matched' : ''}
      `}
    >
      <div className="card-inner">
        {/* BACK OF CARD (Hidden initially) */}
        <div className="card-face card-back shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
          <div className="flex flex-col items-center">
            <span className="text-[#E50914] text-4xl font-black group-hover:scale-110 transition-transform tracking-tighter italic">P</span>
            <div className="w-4 h-1 bg-[#E50914]/30 mt-1 rounded-full"></div>
          </div>
        </div>

        {/* FRONT OF CARD (Shows artifact) */}
        <div className="card-face card-front bg-white overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
           <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent pointer-events-none"></div>
           <img 
            src={card.imageUrl} 
            alt="PRDGY Artifact" 
            className="w-full h-full object-contain p-2"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
};

export default MemoryCard;

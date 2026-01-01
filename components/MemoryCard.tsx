
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
      className={`card-container cursor-pointer group 
        ${card.isFlipped ? 'flipped' : ''} 
        ${card.isMatched ? 'matched' : ''}
      `}
    >
      <div className="card-inner">
        {/* BACK OF CARD */}
        <div className="card-face card-back">
          <div className="flex flex-col items-center justify-center w-full h-full">
            <span className="text-[#E50914] text-5xl font-black italic tracking-tighter select-none">P</span>
            <div className="w-6 h-0.5 bg-[#E50914] mt-2 rounded-full opacity-40 shadow-[0_0_10px_rgba(229,9,20,0.5)]"></div>
          </div>
        </div>

        {/* FRONT OF CARD */}
        <div className="card-face card-front p-2 md:p-4">
           <img 
            src={card.imageUrl} 
            alt="Artifact" 
            className="w-full h-full object-contain"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
};

export default MemoryCard;

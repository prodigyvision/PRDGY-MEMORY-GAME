
import React, { useState, useEffect } from 'react';
import { CardData } from '../types';
import MemoryCard from './MemoryCard';

interface GameBoardProps {
  cards: CardData[];
  gridCols: string;
  onMatch: (ids: number[]) => void;
  onFlip: () => void;
}

const GameBoard: React.FC<GameBoardProps> = ({ cards, gridCols, onMatch, onFlip }) => {
  const [internalCards, setInternalCards] = useState<CardData[]>([]);
  const [flippedIds, setFlippedIds] = useState<number[]>([]);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setInternalCards(cards);
    setFlippedIds([]);
  }, [cards]);

  const handleCardClick = (card: CardData) => {
    if (busy || card.isFlipped || card.isMatched || flippedIds.includes(card.uniqueId)) return;

    onFlip();
    const newFlippedIds = [...flippedIds, card.uniqueId];
    setFlippedIds(newFlippedIds);

    setInternalCards(prev => prev.map(c => 
      c.uniqueId === card.uniqueId ? { ...c, isFlipped: true } : c
    ));

    if (newFlippedIds.length === 2) {
      setBusy(true);
      const [firstId, secondId] = newFlippedIds;
      const firstCard = internalCards.find(c => c.uniqueId === firstId)!;
      const secondCard = internalCards.find(c => c.uniqueId === secondId)!;

      if (firstCard.id === secondCard.id) {
        setTimeout(() => {
          setInternalCards(prev => prev.map(c => 
            (c.uniqueId === firstId || c.uniqueId === secondId) ? { ...c, isMatched: true } : c
          ));
          onMatch([firstId, secondId]);
          setFlippedIds([]);
          setBusy(false);
        }, 600);
      } else {
        setTimeout(() => {
          setInternalCards(prev => prev.map(c => 
            (c.uniqueId === firstId || c.uniqueId === secondId) ? { ...c, isFlipped: false } : c
          ));
          setFlippedIds([]);
          setBusy(false);
        }, 1000);
      }
    }
  };

  return (
    <div className={`game-grid ${gridCols} gap-3 md:gap-6 w-full max-w-lg md:max-w-3xl items-start h-fit`}>
      {internalCards.map((card) => (
        <MemoryCard 
          key={card.uniqueId} 
          card={card} 
          onClick={() => handleCardClick(card)} 
        />
      ))}
    </div>
  );
};

export default GameBoard;

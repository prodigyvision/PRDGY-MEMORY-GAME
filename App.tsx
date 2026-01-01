
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GameStatus, CardData, GameState } from './types';
import { ASSETS, LEVELS, SOUNDS } from './constants';
import StartScreen from './components/StartScreen';
import GameBoard from './components/GameBoard';
import ResultScreen from './components/ResultScreen';
import LevelAnnouncer from './components/LevelAnnouncer';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentLevel: 1,
    status: 'START',
    cards: [],
    timeLeft: 0,
    score: 0,
    isMuted: false,
  });

  const bgmRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    bgmRef.current = new Audio(SOUNDS.bgm);
    bgmRef.current.loop = true;
    bgmRef.current.volume = 0.2;

    return () => {
      if (bgmRef.current) {
        bgmRef.current.pause();
        bgmRef.current = null;
      }
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const playSound = (soundUrl: string) => {
    if (gameState.isMuted) return;
    const audio = new Audio(soundUrl);
    audio.play().catch(() => {});
  };

  const toggleMute = () => {
    setGameState(prev => {
      const newMuted = !prev.isMuted;
      if (bgmRef.current) {
        bgmRef.current.muted = newMuted;
      }
      return { ...prev, isMuted: newMuted };
    });
  };

  const startLevel = (level: number) => {
    const config = LEVELS[level];
    if (!config) return;

    const levelAssets = [...ASSETS].sort(() => Math.random() - 0.5).slice(0, config.pairs);
    const deck: CardData[] = [];
    levelAssets.forEach((url, index) => {
      deck.push({ id: url, uniqueId: index * 2, imageUrl: url, isFlipped: false, isMatched: false });
      deck.push({ id: url, uniqueId: index * 2 + 1, imageUrl: url, isFlipped: false, isMatched: false });
    });

    const shuffledDeck = deck.sort(() => Math.random() - 0.5);

    setGameState(prev => ({
      ...prev,
      currentLevel: level,
      status: 'LEVEL_TRANSITION',
      cards: shuffledDeck,
      timeLeft: config.time,
    }));

    setTimeout(() => {
      setGameState(prev => ({ ...prev, status: 'PLAYING' }));
      startTimer();
    }, 2500);
  };

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      setGameState(prev => {
        if (prev.status !== 'PLAYING') return prev;
        if (prev.timeLeft <= 1) {
          clearInterval(timerRef.current!);
          playSound(SOUNDS.fail);
          return { ...prev, timeLeft: 0, status: 'RESULT' };
        }
        return { ...prev, timeLeft: prev.timeLeft - 1 };
      });
    }, 1000);
  };

  const startGame = () => {
    if (bgmRef.current) {
      bgmRef.current.play().catch(() => {});
    }
    startLevel(1);
  };

  const onMatchFound = (ids: number[]) => {
    playSound(SOUNDS.match);
    setGameState(prev => {
      const updatedCards = prev.cards.map(c => 
        ids.includes(c.uniqueId) ? { ...c, isMatched: true } : c
      );
      
      const matchedCount = updatedCards.filter(c => c.isMatched).length;
      const totalCards = updatedCards.length;
      
      if (matchedCount === totalCards) {
        clearInterval(timerRef.current!);
        if (prev.currentLevel < 5) {
          playSound(SOUNDS.win);
          setTimeout(() => startLevel(prev.currentLevel + 1), 1500);
        } else {
          playSound(SOUNDS.win);
          return { ...prev, cards: updatedCards, status: 'RESULT' };
        }
      }
      return { ...prev, cards: updatedCards };
    });
  };

  const resetGame = () => {
    setGameState(prev => ({
      ...prev,
      currentLevel: 1,
      status: 'START',
      cards: [],
      timeLeft: 0,
    }));
  };

  return (
    <div className="min-h-[100dvh] flex flex-col items-center p-4 bg-black relative overflow-x-hidden">
      <div className="absolute inset-0 bg-gradient-to-tr from-black via-[#0a0a0a] to-[#1a0a0a] z-0"></div>
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-900/10 blur-[120px] rounded-full z-0"></div>
      
      <Navbar 
        isMuted={gameState.isMuted} 
        toggleMute={toggleMute} 
        currentLevel={gameState.currentLevel}
        timeLeft={gameState.timeLeft}
        status={gameState.status}
      />

      <main className="w-full max-w-4xl z-10 flex-1 flex flex-col items-center justify-center pt-20 pb-24">
        {gameState.status === 'START' && (
          <StartScreen onStart={startGame} />
        )}

        {gameState.status === 'LEVEL_TRANSITION' && (
          <LevelAnnouncer level={gameState.currentLevel} />
        )}

        {gameState.status === 'PLAYING' && (
          <GameBoard 
            cards={gameState.cards} 
            gridCols={LEVELS[gameState.currentLevel]?.gridCols || 'grid-cols-4'}
            onMatch={onMatchFound}
            onFlip={() => playSound(SOUNDS.flip)}
          />
        )}

        {gameState.status === 'RESULT' && (
          <ResultScreen 
            isWin={gameState.cards.every(c => c.isMatched)} 
            level={gameState.currentLevel} 
            onRetry={resetGame} 
          />
        )}
      </main>

      <footer className="fixed bottom-6 text-white/10 text-[10px] tracking-[0.3em] font-light z-10 pointer-events-none uppercase">
        PRDGY Konfused Kingdom
      </footer>
    </div>
  );
};

export default App;

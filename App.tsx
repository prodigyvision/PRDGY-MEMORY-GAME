
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

  // Initialize Audio
  useEffect(() => {
    bgmRef.current = new Audio(SOUNDS.bgm);
    bgmRef.current.loop = true;
    bgmRef.current.volume = 0.3;

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

    // Create deck
    const levelAssets = [...ASSETS].slice(0, config.pairs);
    const deck: CardData[] = [];
    levelAssets.forEach((url, index) => {
      // Pair 1
      deck.push({
        id: url,
        uniqueId: index * 2,
        imageUrl: url,
        isFlipped: false,
        isMatched: false,
      });
      // Pair 2
      deck.push({
        id: url,
        uniqueId: index * 2 + 1,
        imageUrl: url,
        isFlipped: false,
        isMatched: false,
      });
    });

    // Shuffle
    const shuffledDeck = deck.sort(() => Math.random() - 0.5);

    setGameState(prev => ({
      ...prev,
      currentLevel: level,
      status: 'LEVEL_TRANSITION',
      cards: shuffledDeck,
      timeLeft: config.time,
    }));

    // Transition delay
    setTimeout(() => {
      setGameState(prev => ({ ...prev, status: 'PLAYING' }));
      startTimer();
    }, 2500);
  };

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      setGameState(prev => {
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

  const onMatchFound = () => {
    playSound(SOUNDS.match);
    setGameState(prev => {
      const matchedCount = prev.cards.filter(c => c.isMatched).length + 2;
      const totalCards = prev.cards.length;
      
      if (matchedCount === totalCards) {
        clearInterval(timerRef.current!);
        if (prev.currentLevel < 5) {
          playSound(SOUNDS.win);
          setTimeout(() => startLevel(prev.currentLevel + 1), 1000);
        } else {
          playSound(SOUNDS.win);
          return { ...prev, status: 'RESULT' };
        }
      }
      return prev;
    });
  };

  const onFlip = () => playSound(SOUNDS.flip);

  const resetGame = () => {
    setGameState(prev => ({
      ...prev,
      currentLevel: 1,
      status: 'START',
      cards: [],
      timeLeft: 0,
      score: 0
    }));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-black relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black via-[#0a0a0a] to-[#1a0a0a] z-0"></div>
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-900/10 blur-[120px] rounded-full z-0"></div>
      
      <Navbar 
        isMuted={gameState.isMuted} 
        toggleMute={toggleMute} 
        currentLevel={gameState.currentLevel}
        timeLeft={gameState.timeLeft}
        status={gameState.status}
      />

      <main className="w-full max-w-4xl z-10 flex flex-col items-center">
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
            onFlip={onFlip}
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

      {/* Footer Branding */}
      <footer className="fixed bottom-6 text-white/20 text-xs tracking-[0.2em] font-light z-10 pointer-events-none">
        PRDGY KONFUSED KINGDOM
      </footer>
    </div>
  );
};

export default App;

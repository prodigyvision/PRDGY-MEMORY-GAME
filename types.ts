
export interface CardData {
  id: string;
  uniqueId: number;
  imageUrl: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export type GameStatus = 'START' | 'LEVEL_TRANSITION' | 'PLAYING' | 'RESULT';

export interface GameState {
  currentLevel: number;
  status: GameStatus;
  cards: CardData[];
  timeLeft: number;
  score: number;
  isMuted: boolean;
}

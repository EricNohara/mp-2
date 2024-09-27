export interface Conference {
  name: string;
  rank: number;
  win: number;
  loss: number;
}

export interface Division {
  name: string;
  rank: number;
  win: number;
  loss: number;
  GamesBehind: string;
}

export interface HomeAwayStatus {
  win: number;
  loss: number;
}

export interface Standing {
  league: string;
  teamId: number;
  win: number;
  loss: number;
  gamesBehind: string;
  lastTenWin: number;
  lastTenLoss: number;
  streak: number;
  seasonYear: number;
  conference: Conference;
  division: Division;
  winPercentage: string;
  lossPercentage: string;
  home: HomeAwayStatus;
  away: HomeAwayStatus;
  winStreak: number;
  tieBreakerPoints: number | null;
}

export interface ApiResponseNBA {
  status: number;
  message: string;
  results: number;
  filters: string[];
  standings: Standing[];
}

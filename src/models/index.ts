export interface Week {
  season: string;
  week: number;
  seasonType: 'regular' | 'postseason';
  firstGameStart: Date;
  lastGameStart: Date;
  games: number;
}

export interface Pick extends GameData {
  gameId: number;
  pickTeamId: number;
  result: 0 | 1;
}

export interface GameData {
  id: number;
  home: Team;
  homeScore: number | null;
  away: Team;
  awayScore: number | null;
  weekNum: number;
  winner: number;
  startDate: Date;
  timeTBD: boolean;
  season: string;
  gameCompleted: boolean;
  isDoublePick: boolean;
}

export interface Team {
  id: number;
  school: string;
  mascot: string;
  abbreviation: string;
  conference: string | undefined;
  division: string | undefined;
  color: string | undefined;
  alt_color: string | undefined;
  logos: string[] | undefined;
}

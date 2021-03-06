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
  head2Headpick?: number;
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
  isHead2Head: boolean;
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

export interface League {
  slug: string;
  name: string;
}

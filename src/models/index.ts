export interface Week {
  season: string;
  week: number;
  seasonType: 'regular' | 'postseason';
  firstGameStart: Date;
  lastGameStart: Date;
  games: number;
}

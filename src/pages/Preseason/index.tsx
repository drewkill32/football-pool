import React, { useState, useEffect } from 'react';

interface Season {
  week: number;
  seasonType: 'regular' | 'postseason';
  season: number;
  firstGameStart: Date;
  lastGameStart: Date;
}

const PreseasonHome = () => {
  const [seasons, setSeasons] = useState<Season[]>();

  useEffect(() => {
    const fetchSeasons = async () => {
      try {
        const response = await fetch('sample/db/seasons.json');
        const json = (await response.json()) as Season[];
        setSeasons(json.filter((s) => s.seasonType === 'regular'));
      } catch (error) {
        console.error(error);
      }
    };
    fetchSeasons();
  });
  return seasons !== undefined ? (
    <div>
      {seasons.map((season) => (
        <div key={`${season.seasonType}-${season.week}`}>{season.week}</div>
      ))}
    </div>
  ) : (
    <div>Loading</div>
  );
};

export default PreseasonHome;

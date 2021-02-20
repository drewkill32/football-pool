import React, { createContext, useState } from 'react';
import { Week } from '../models';

export const WeekContext = createContext<
  [week: Week | undefined, setWeek: (prevValue: Week) => void]
>([undefined, () => {}]);

const WeekContextProvider: React.FC = ({ children }) => {
  const [week, setWeek] = useState<Week>();
  return (
    <WeekContext.Provider value={[week, setWeek]}>
      {children}
    </WeekContext.Provider>
  );
};

export default WeekContextProvider;

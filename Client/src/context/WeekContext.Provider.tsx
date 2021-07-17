import React, { createContext, useState, useContext } from 'react';
import { Week } from '../models';

const WeekContext = createContext<
  [week: Week | undefined, setWeek: (prevValue: Week) => void]
>([undefined, () => {}]);

export const useSelectedWeek = () => {
  return useContext(WeekContext);
};

const WeekContextProvider: React.FC = ({ children }) => {
  const [week, setWeek] = useState<Week>();
  return (
    <WeekContext.Provider value={[week, setWeek]}>
      {children}
    </WeekContext.Provider>
  );
};

export default WeekContextProvider;

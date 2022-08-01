import { createContext, useContext } from 'react';

export type GlobalContent = {
  route: string;
  setRoute: (c: string) => void;
};

export const GlobalContext = createContext<GlobalContent>({
  route: 'garage',
  setRoute: () => {},
});

export const useGlobalContext = () => useContext(GlobalContext);

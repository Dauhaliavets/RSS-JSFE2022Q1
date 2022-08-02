import { createContext, useContext } from 'react';

export type GlobalContent = {
  isGaragePage: boolean;
  setIsGaragePage: (c: boolean) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
};

const defaultState = {
  isGaragePage: true,
  setIsGaragePage: () => {},
  currentPage: 1,
  setCurrentPage: () => {},
};

export const GlobalContext = createContext<GlobalContent>(defaultState);

export const useGlobalContext = () => useContext(GlobalContext);

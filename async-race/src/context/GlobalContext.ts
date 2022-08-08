import { createContext, useContext } from 'react';
import { GlobalContent } from '../models/contextType';

const defaultGlobalState = {
  isGaragePage: true,
  setIsGaragePage: () => {},
  currentPageGarage: 1,
  setCurrentPageGarage: () => {},
  currentPageWinners: 1,
  setCurrentPageWinners: () => {},
  cars: [],
  setCars: () => {},
  countCars: 0,
  setCountCars: () => {},
  isRace: false,
  setIsRace: () => {},
  selectedCar: null,
  setSelectedCar: () => {},
};

export const GlobalContext = createContext<GlobalContent>(defaultGlobalState);

export const useGlobalContext = () => useContext(GlobalContext);

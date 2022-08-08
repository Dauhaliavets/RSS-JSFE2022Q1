import { createContext, useContext } from 'react';
import { ICar } from '../models';

export type GlobalContent = {
  isGaragePage: boolean;
  setIsGaragePage: (isGaragePage: boolean) => void;
  currentPageGarage: number;
  setCurrentPageGarage: (page: number) => void;
  currentPageWinners: number;
  setCurrentPageWinners: (page: number) => void;
  cars: ICar[];
  setCars: (cars: ICar[] | ((prevCars: ICar[]) => ICar[])) => void;
  countCars: number;
  setCountCars: (count: number | ((prevCount: number) => number)) => void;
  isRace: boolean;
  setIsRace: (value: boolean | ((prevVar: boolean) => boolean)) => void;
  selectedCar: ICar | null;
  setSelectedCar: (car: ICar | null) => void;
};

export const defaultGlobalState = {
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

import { ICar } from './car';

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

import { createContext, useContext } from 'react';
import { ICar } from '../models';

export type GarageContent = {
  cars: ICar[];
  setCars: (cars: ICar[] | ((prevCars: ICar[]) => ICar[])) => void;
  totalCars: number;
  setTotalCars: (total: number | ((prevTotal: number) => number)) => void;
  isRace: boolean;
  setIsRace: (value: boolean | ((prevVar: boolean) => boolean)) => void;
  selectedCar: ICar | null;
  setSelectedCar: (car: ICar | null) => void;
};

const defaultState = {
  cars: [],
  setCars: () => {},
  totalCars: 0,
  setTotalCars: () => {},
  isRace: false,
  setIsRace: () => {},
  selectedCar: null,
  setSelectedCar: () => {},
};

export const GarageContext = createContext<GarageContent>(defaultState);

export const useGarageContext = () => useContext(GarageContext);

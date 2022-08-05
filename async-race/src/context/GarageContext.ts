import { createContext, useContext } from 'react';
import { ICar } from '../models';

export type GarageContent = {
  cars: ICar[];
  setCars: (cars: ICar[] | ((prevCars: ICar[]) => ICar[])) => void;
  totalCars: number;
  setTotalCars: (total: number) => void;
  isRace: boolean;
  setIsRace: (value: boolean | ((prevVar: boolean) => boolean)) => void;
  selectedCar: ICar | null;
  setSelectedCar: (car: ICar | null) => void;
};

export const GarageContext = createContext<Partial<GarageContent>>({});

export const useGarageContext = () => useContext(GarageContext);

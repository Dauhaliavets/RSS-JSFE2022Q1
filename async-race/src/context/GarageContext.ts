import { createContext, useContext } from 'react';
import { ICar } from '../models';

export type GarageContent = {
  carsContext: ICar[];
  setCarsContext: (cars: ICar[]) => void;
  selectedCar: number | null;
  setSelectedCar: (id: number) => void;
};

export const GarageContext = createContext<GarageContent>({
  carsContext: [],
  setCarsContext: () => {},
  selectedCar: null,
  setSelectedCar: () => {},
});

export const useGarageContext = () => useContext(GarageContext);

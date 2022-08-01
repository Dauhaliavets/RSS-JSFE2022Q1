import { createContext, useContext } from 'react';
import { ICar } from '../models';

export type GarageContent = {
  carsContext: ICar[];
  setCarsContext: (cars: ICar[]) => void;
  selectedCar: ICar | null;
  setSelectedCar: (car: ICar | null) => void;
};

export const GarageContext = createContext<GarageContent>({
  carsContext: [],
  setCarsContext: () => {},
  selectedCar: null,
  setSelectedCar: () => {},
});

export const useGarageContext = () => useContext(GarageContext);

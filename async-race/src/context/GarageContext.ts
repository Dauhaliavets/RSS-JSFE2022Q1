import { createContext, useContext } from 'react';
import { ICar } from '../models';

export type GarageContent = {
  cars: ICar[];
  setCars: (cars: ICar[]) => void;
  selectedCar: ICar | null;
  setSelectedCar: (car: ICar | null) => void;
};

export const GarageContext = createContext<GarageContent>({
  cars: [],
  setCars: () => {},
  selectedCar: null,
  setSelectedCar: () => {},
});

export const useGarageContext = () => useContext(GarageContext);

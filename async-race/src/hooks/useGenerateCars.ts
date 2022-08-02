import { useState } from 'react';
import { useGarageContext } from '../context/GarageContext';
import { ICar } from '../models';
import { CAR_BRANDS, CAR_MODELS } from '../utils/constants';
import { getRandomHEXColor } from '../utils/getRandomHEXColor';
import { useCreateCar } from './useCreateCar';

const useGenerateCars = () => {
  const { createCar } = useCreateCar();
  const { cars, setCars } = useGarageContext();

  const generateCars = async () => {
    const newCars: ICar[] = [];
    for (let i = 0; i < 10; i++) {
      const randomBrandInd = Math.floor(Math.random() * CAR_BRANDS.length);
      const randomModelInd = Math.floor(Math.random() * CAR_MODELS.length);
      const name = `${CAR_BRANDS[randomBrandInd]} ${CAR_MODELS[randomModelInd]}`;
      const color = getRandomHEXColor();

      const car = await createCar(name, color);
      newCars.push(car);
    }
    setCars([...cars, ...newCars]);
  };

  return { generateCars };
};

export { useGenerateCars };

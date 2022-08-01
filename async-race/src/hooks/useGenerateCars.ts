import { useGarageContext } from '../context/GarageContext';
import { ICar } from '../models';
import { CAR_BRANDS, CAR_MODELS } from '../utils/constants';
import { getRandomHEXColor } from '../utils/getRandomHEXColor';

const useGenerateCars = () => {
  const { cars, setCars } = useGarageContext();

  const generateCars = () => {
    let startId = cars.length;
    const newCars: ICar[] = [];

    for (let i = 0; i < 100; i++) {
      startId += 1;
      const randomBrandInd = Math.floor(Math.random() * CAR_BRANDS.length);
      const randomModelInd = Math.floor(Math.random() * CAR_MODELS.length);
      const name = `${CAR_BRANDS[randomBrandInd]} ${CAR_MODELS[randomModelInd]}`;
      const color = getRandomHEXColor();

      newCars.push({ id: startId, name, color });
    }

    setCars(newCars);
  };

  return { generateCars };
};

export { useGenerateCars };

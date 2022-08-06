import { CAR_BRANDS, CAR_MODELS } from '../utils/constants';
import { getRandomHEXColor } from '../utils/getRandomHEXColor';
import { useCar } from './useCar';

const useGenerateCars = () => {
  const { createCar } = useCar();

  const generateCars = async () => {
    for (let i = 0; i < 100; i++) {
      const randomBrandInd = Math.floor(Math.random() * CAR_BRANDS.length);
      const randomModelInd = Math.floor(Math.random() * CAR_MODELS.length);
      const name = `${CAR_BRANDS[randomBrandInd]} ${CAR_MODELS[randomModelInd]}`;
      const color = getRandomHEXColor();
      await createCar(name, color);
    }
  };

  return { generateCars };
};

export { useGenerateCars };

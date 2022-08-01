import { useGarageContext } from '../context/GarageContext';
import { Methods } from '../models';
import { BASE_URL } from '../utils/constants';

const useCreateCar = () => {
  const { cars, setCars } = useGarageContext();

  const createCar = async (name: string, color: string) => {
    const response = await fetch(`${BASE_URL}/garage`, {
      method: Methods.Post,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        color,
      }),
    });
    if (response.ok) {
      const newCar = await response.json();
      setCars([...cars, newCar]);
    }
  };

  return { createCar };
};

export { useCreateCar };

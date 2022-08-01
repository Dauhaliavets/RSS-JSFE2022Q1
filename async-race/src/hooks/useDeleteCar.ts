import { useGarageContext } from '../context/GarageContext';
import { Methods } from '../models';
import { BASE_URL } from '../utils/constants';

const useDeleteCar = () => {
  const { carsContext, setCarsContext } = useGarageContext();

  const deleteCar = async (id: number) => {
    const response = await fetch(`${BASE_URL}/garage/${id}`, {
      method: Methods.Delete,
    });
    if (response.ok) {
      const newCars = [...carsContext].filter((item) => item.id !== id);
      setCarsContext(newCars);
    }
  };

  return [deleteCar] as const;
};

export { useDeleteCar };

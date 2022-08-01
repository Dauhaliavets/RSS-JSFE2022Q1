import { useGarageContext } from '../context/GarageContext';
import { Methods } from '../models';
import { BASE_URL } from '../utils/constants';

const useDeleteCar = () => {
  const { cars, setCars } = useGarageContext();

  const deleteCar = async (id: number) => {
    const response = await fetch(`${BASE_URL}/garage/${id}`, {
      method: Methods.Delete,
    });
    if (response.ok) {
      const newCars = [...cars].filter((item) => item.id !== id);
      setCars(newCars);
    }
  };

  return [deleteCar] as const;
};

export { useDeleteCar };

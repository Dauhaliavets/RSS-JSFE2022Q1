import { useGarageContext } from '../context/GarageContext';
import { Methods } from '../models';
import { BASE_URL } from '../utils/constants';

const useUpdateCar = () => {
  const { cars, setCars } = useGarageContext();

  const updateCar = async (id: number, name: string, color: string) => {
    const response = await fetch(`${BASE_URL}/garage/${id}`, {
      method: Methods.Put,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, color }),
    });
    if (response.ok) {
      const updatedCar = await response.json();
      const updatedCars = [...cars].map((car) => (car.id === id ? { ...car, ...updatedCar } : car));
      setCars(updatedCars);
    }
  };

  return { updateCar };
};

export { useUpdateCar };

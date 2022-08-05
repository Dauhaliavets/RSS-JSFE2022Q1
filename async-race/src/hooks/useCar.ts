import { GarageContent, useGarageContext } from '../context/GarageContext';
import { Methods } from '../models';
import { BASE_URL } from '../utils/constants';

const useCar = () => {
  const { cars, setCars } = useGarageContext() as GarageContent;

  const getCar = async (id: number) => {
    const response = await fetch(`${BASE_URL}/garage/${id}`);
    if (response.ok) {
      return response.json();
    }
  };

  const createCar = async (name: string, color: string) => {
    const response = await fetch(`${BASE_URL}/garage`, {
      method: Methods.Post,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, color }),
    });
    if (response.ok) {
      const createdCar = await response.json();
      setCars((prevState) => [...prevState, createdCar]);
    }
  };

  const deleteCar = async (id: number) => {
    const response = await fetch(`${BASE_URL}/garage/${id}`, { method: Methods.Delete });
    if (response.ok) {
      const newCars = [...cars].filter((item) => item.id !== id);
      setCars(newCars);
    }
  };

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

  return { getCar, createCar, deleteCar, updateCar };
};

export { useCar };

import { useCallback } from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import { Methods } from '../models';
import { ICar } from '../models/car';
import { BASE_URL } from '../utils/constants';
import { useGetCars } from './useGetCars';
import { useWinner } from './useWinner';

const useCar = () => {
  const { currentPageGarage } = useGlobalContext();
  const { getCars } = useGetCars();
  const { deleteWinner } = useWinner();

  const getCar = useCallback(async (id: number): Promise<ICar> => {
    const response = await fetch(`${BASE_URL}/garage/${id}`);
    return response.json();
  }, []);

  const createCar = useCallback(
    async (name: string, color: string) => {
      const response = await fetch(`${BASE_URL}/garage`, {
        method: Methods.Post,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, color }),
      });
      if (response.ok) {
        getCars(currentPageGarage);
      }
    },
    [getCars, currentPageGarage],
  );

  const deleteCar = useCallback(
    async (id: number) => {
      const response = await fetch(`${BASE_URL}/garage/${id}`, { method: Methods.Delete });
      if (response.ok) {
        getCars(currentPageGarage);
        deleteWinner(id);
      }
    },
    [getCars, currentPageGarage, deleteWinner],
  );

  const updateCar = useCallback(
    async (id: number, name: string, color: string) => {
      const response = await fetch(`${BASE_URL}/garage/${id}`, {
        method: Methods.Put,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, color }),
      });
      if (response.ok) {
        getCars(currentPageGarage);
      }
    },
    [getCars, currentPageGarage],
  );

  return { getCar, createCar, deleteCar, updateCar };
};

export { useCar };

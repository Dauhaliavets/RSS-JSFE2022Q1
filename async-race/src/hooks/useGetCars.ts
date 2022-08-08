import { useCallback, useState } from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import { ICar, ICarsResponse } from '../models';
import { BASE_URL } from '../utils/constants';

const useGetCars = () => {
  const { cars, setCars, countCars, setCountCars } = useGlobalContext();

  const fetchCars = async (page: number): Promise<ICarsResponse> => {
    const response = await fetch(`${BASE_URL}/garage?_page=${page}&_limit=7`);
    return {
      data: await response.json(),
      count: response.headers.get('X-Total-Count') || '0',
    };
  };

  const getCars = async (page: number) => {
    try {
      const response = await fetchCars(page);
      setCountCars(+response.count);
      setCars(response.data);
    } catch (error) {
      if (error) {
        console.error(error);
      }
    }
  };

  return { cars, countCars, getCars };
};

export { useGetCars };

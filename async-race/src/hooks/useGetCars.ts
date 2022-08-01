import { useState } from 'react';
import { ICar } from '../models';
import { BASE_URL } from '../utils/constants';

const useGetCars = () => {
  const [cars, setCars] = useState<ICar[]>([]);

  const getCars = async () => {
    await fetch(`${BASE_URL}/garage`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data: ICar[]) => setCars(data));
  };

  return [cars, getCars] as const;
};

export { useGetCars };

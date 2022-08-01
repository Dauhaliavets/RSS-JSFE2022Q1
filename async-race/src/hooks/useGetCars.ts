import { useState } from 'react';
import { ICar } from '../models';
import { BASE_URL } from '../utils/constants';

const useGetCars = () => {
  const [receivedCars, setReceivedCars] = useState<ICar[]>([]);

  const getCars = async () => {
    const response = await fetch(`${BASE_URL}/garage`);
    if (response.ok) {
      const data = await response.json();
      setReceivedCars(data);
    }
  };

  return { receivedCars, getCars };
};

export { useGetCars };

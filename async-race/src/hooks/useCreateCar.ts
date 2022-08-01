import { useState } from 'react';
import { ICar, Methods } from '../models';
import { BASE_URL } from '../utils/constants';

const useCreateCar = () => {
  const [car, setCar] = useState<ICar>({ id: 0, name: '', color: '' });

  const createCar = async (name: string, color: string) => {
    await fetch(`${BASE_URL}/garage`, {
      method: Methods.Post,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        color,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data: ICar) => setCar(data));
  };

  return [car, createCar] as const;
};

export { useCreateCar };

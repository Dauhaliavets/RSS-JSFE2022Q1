import { Methods } from '../models';
import { BASE_URL } from '../utils/constants';

const useCreateCar = () => {
  const createCar = async (name: string, color: string) => {
    const response = await fetch(`${BASE_URL}/garage`, {
      method: Methods.Post,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, color }),
    });
    if (response.ok) {
      return response.json();
    }
  };

  return { createCar };
};

export { useCreateCar };

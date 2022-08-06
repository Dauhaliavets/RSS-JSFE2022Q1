import { IResponseGetCars } from './../models/index';
import { BASE_URL } from '../utils/constants';

const useGetCars = () => {
  const getCars = async (): Promise<IResponseGetCars | undefined> => {
    try {
      const response = await fetch(`${BASE_URL}/garage`);
      return { cars: await response.json() };
    } catch (error) {
      console.error(error);
    }
  };

  return { getCars };
};

export { useGetCars };

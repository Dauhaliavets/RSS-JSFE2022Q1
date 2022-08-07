// import { IResponseGetCars } from './../models/index';
import { ICar } from '../models';
import { BASE_URL } from '../utils/constants';

const useGetCars = () => {
  const getCars = async (): Promise<ICar[] | undefined> => {
    try {
      const response = await fetch(`${BASE_URL}/garage`);
      return await response.json();
    } catch (error) {
      if (error) {
        console.error(error);
      }
    }
  };

  return { getCars };
};

export { useGetCars };

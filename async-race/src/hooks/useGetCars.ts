import { ICar, IResponseGetCars } from './../models/index';
import { BASE_URL } from '../utils/constants';

const useGetCars = () => {
  const getCars = async (page: number, limit = 7): Promise<IResponseGetCars | undefined> => {
    try {
      const response = await fetch(`${BASE_URL}/garage?_page=${page}&_limit=${limit}`);
      const data = await response.json();
      const totalCars = response.headers.get('X-Total-Count') || 0;
      return {
        cars: data,
        totalCount: +totalCars,
      };
    } catch (error) {
      console.error(error);
    }
  };

  return { getCars };
};

export { useGetCars };

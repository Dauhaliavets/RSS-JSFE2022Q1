import { useCallback, useState } from 'react';
import { IWinnerInfo, IWinnersResponse } from '../models/winner';
import { BASE_URL } from '../utils/constants';
import { useCar } from './useCar';

const useWinners = () => {
  const [winners, setWinners] = useState<IWinnerInfo[]>([]);
  const [countWins, setCountWins] = useState<number>(0);
  const { getCar } = useCar();

  const fetchWinners = async (page: number, sortBy: string, orderBy: string): Promise<IWinnersResponse> => {
    const response = await fetch(`${BASE_URL}/winners?_page=${page}&_limit=10&_sort=${sortBy}&_order=${orderBy}`);
    return {
      data: await response.json(),
      count: response.headers.get('X-Total-Count') || '0',
    };
  };

  const getWinners = useCallback(
    async (page: number, sort: string, order: string) => {
      try {
        const response = await fetchWinners(page, sort, order);
        Promise.all(
          response.data.map(async (win) => {
            const respCar = await getCar(win.id);
            return { ...win, ...respCar };
          }),
        ).then((data) => {
          setCountWins(+response.count);
          setWinners(data);
        });
      } catch (error) {
        console.error(error);
      }
    },
    [getCar],
  );

  return { winners, countWins, getWinners };
};

export { useWinners };

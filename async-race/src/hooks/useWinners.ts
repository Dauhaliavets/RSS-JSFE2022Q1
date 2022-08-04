import { BASE_URL } from '../utils/constants';

const useWinners = () => {
  const getWinners = async (page: number, limit = 10) => {
    const response = await fetch(`${BASE_URL}/winners?_page=${page}&_limit=${limit}`);
    return response.json();
  };

  return { getWinners };
};

export { useWinners };

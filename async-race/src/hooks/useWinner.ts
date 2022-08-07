import { Methods } from '../models';
import { IWinner } from '../models/winner';
import { BASE_URL } from '../utils/constants';

const useWinner = () => {
  const getWinner = async (id: number): Promise<IWinner> => {
    const response = await fetch(`${BASE_URL}/winners/${id}`, { method: Methods.Get });
    return response.json();
  };

  const createWinner = async (id: number, wins: number, time: number) => {
    const response = await fetch(`${BASE_URL}/winners`, {
      method: Methods.Post,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, wins, time }),
    });
    if (response.ok) {
      return response.json();
    }
  };

  const deleteWinner = async (id: number) => {
    const response = await fetch(`${BASE_URL}/winners/${id}`, { method: Methods.Delete });
    if (response.ok) {
      return response.json();
    }
  };

  const updateWinner = async (id: number, wins: number, time: number) => {
    const response = await fetch(`${BASE_URL}/winners/${id}`, {
      method: Methods.Put,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ wins, time }),
    });
    if (response.ok) {
      return response.json();
    }
  };

  return { getWinner, createWinner, deleteWinner, updateWinner };
};

export { useWinner };

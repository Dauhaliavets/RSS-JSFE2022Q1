import { useState } from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import { TrackResult } from '../models/car';
import { useWinner } from './useWinner';

const useResults = () => {
  const [currentWinner, setCurrentWinner] = useState<TrackResult | null>(null);
  const { getWinner, createWinner, updateWinner } = useWinner();
  const { setIsFinish } = useGlobalContext();

  let isWinner = false;

  const saveResult = async (result: TrackResult) => {
    if (!isWinner) {
      if (result.success) {
        isWinner = true;
        const convertedTime = +(result.time / 1000).toFixed(2);
        const winnerFromDB = await getWinner(result.id);
        if (winnerFromDB.id) {
          const newWins = winnerFromDB.wins + 1;
          const newTime = convertedTime > winnerFromDB.time ? winnerFromDB.time : convertedTime;
          updateWinner(result.id, newWins, newTime);
        } else {
          createWinner(result.id, 1, convertedTime);
        }
        setCurrentWinner({ id: result.id, name: result.name, time: convertedTime, success: result.success });
        setIsFinish(true);
      }
    }
  };

  return { saveResult, currentWinner, setCurrentWinner };
};

export { useResults };

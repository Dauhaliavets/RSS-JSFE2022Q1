import { useState } from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import { TrackResult } from '../models/car';
import { useWinner } from './useWinner';

const useResults = () => {
  const [currentWinner, setCurrentWinner] = useState<TrackResult | null>(null);
  const { getWinner, createWinner, updateWinner } = useWinner();
  const { cars, setIsFinish } = useGlobalContext();

  const results: TrackResult[] = [];

  const saveResult = async (result: TrackResult) => {
    results.push(result);

    if (results.length === cars.length) {
      const winResult = results.filter((item) => item.success).sort((a, b) => a.time - b.time)[0];
      const convertedTime = +(winResult.time / 1000).toFixed(2);
      const winnerFromDB = await getWinner(winResult.id);
      if (winnerFromDB.id) {
        const newWins = winnerFromDB.wins + 1;
        const newTime = convertedTime > winnerFromDB.time ? winnerFromDB.time : convertedTime;
        updateWinner(winResult.id, newWins, newTime);
      } else {
        createWinner(winResult.id, 1, convertedTime);
      }
      setCurrentWinner({ id: winResult.id, name: winResult.name, time: convertedTime, success: winResult.success });
      setIsFinish(true);
    }
  };

  return { saveResult, currentWinner, setCurrentWinner };
};

export { useResults };

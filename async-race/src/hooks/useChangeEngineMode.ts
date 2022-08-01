import { useState } from 'react';
import { EngineMode, IEngine, Methods } from '../models';
import { BASE_URL } from '../utils/constants';

const useChangeEngineMode = () => {
  const [engine, setEngine] = useState<IEngine>({ velocity: 0, distance: 0 });

  const getEngine = async (idCar: number, mode: EngineMode) => {
    await fetch(`${BASE_URL}/engine?id=${idCar}&status=${mode}`, { method: Methods.Patch })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => setEngine(data));
  };

  return [engine, getEngine] as const;
};

export { useChangeEngineMode };

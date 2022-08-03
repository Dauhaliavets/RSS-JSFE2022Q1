import { EngineMode, EngineState, Methods } from '../models';
import { BASE_URL } from '../utils/constants';

const useChangeEngineMode = () => {
  const changeEngine = async (idCar: number, mode: EngineMode) => {
    const response = await fetch(`${BASE_URL}/engine?id=${idCar}&status=${mode}`, { method: Methods.Patch });
    if (response.status === 200) {
      return response.json();
    }
  };

  const changeEngineDrive = async (idCar: number, mode: EngineMode): Promise<EngineState> => {
    const response = await fetch(`${BASE_URL}/engine?id=${idCar}&status=${mode}`, { method: Methods.Patch });
    if (response.status !== 200) {
      return { success: false };
    }
    return response.json();
  };

  return { changeEngine, changeEngineDrive };
};

export { useChangeEngineMode };

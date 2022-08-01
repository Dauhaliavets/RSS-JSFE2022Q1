import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { useGarageContext } from '../../context/GarageContext';
import { useCreateCar } from '../../hooks/useCreateCar';
import { useGenerateCars } from '../../hooks/useGenerateCars';
import { useUpdateCar } from '../../hooks/useUpdateCar';
import { BASE_COLOR } from '../../utils/constants';
import s from './CarSettings.module.css';

const CarSetting: FC = () => {
  const { createCar } = useCreateCar();
  const { updateCar } = useUpdateCar();
  const { generateCars } = useGenerateCars();
  const { selectedCar, setSelectedCar } = useGarageContext();
  const [carName, setCarName] = useState('');
  const [carColor, setCarColor] = useState(BASE_COLOR);
  const [carNameUpdated, setCarNameUpdated] = useState('');
  const [carColorUpdated, setCarColorUpdated] = useState(BASE_COLOR);

  const changeCarName = (e: ChangeEvent<HTMLInputElement>) => setCarName(e.target.value);
  const changeCarColor = (e: ChangeEvent<HTMLInputElement>) => setCarColor(e.target.value);

  const onCreateCar = () => {
    if (carName && carColor) {
      createCar(carName, carColor);
      setCarName('');
      setCarColor(BASE_COLOR);
    }
  };

  const updateCarName = (e: ChangeEvent<HTMLInputElement>) => setCarNameUpdated(e.target.value);
  const updateCarColor = (e: ChangeEvent<HTMLInputElement>) => setCarColorUpdated(e.target.value);

  const onUpdateCar = () => {
    if (carNameUpdated && carColorUpdated) {
      updateCar(selectedCar!.id, carNameUpdated, carColorUpdated);
      setCarNameUpdated('');
      setCarColorUpdated(BASE_COLOR);
    }
  };

  useEffect(() => {
    if (selectedCar) {
      setCarNameUpdated(selectedCar.name);
      setCarColorUpdated(selectedCar.color);
    }
  }, [selectedCar, setSelectedCar]);

  return (
    <div className={s.garage__settings}>
      <div className={s.setting__wrapper}>
        <input type='text' name='carName' value={carName} onChange={(e) => changeCarName(e)} />
        <input type='color' name='carColor' value={carColor} onChange={(e) => changeCarColor(e)} />
        <button onClick={onCreateCar}>CREATE</button>
      </div>
      <div className={s.setting__wrapper}>
        <input type='text' name='carNameUpdated' value={carNameUpdated} onChange={(e) => updateCarName(e)} />
        <input type='color' name='carColorUpdated' value={carColorUpdated} onChange={(e) => updateCarColor(e)} />
        <button onClick={onUpdateCar}>UPDATE</button>
      </div>
      <div className={s.setting__wrapper}>
        <button>RACE</button>
        <button>RESET</button>
        <button onClick={generateCars}>GENERATE CARS</button>
      </div>
    </div>
  );
};

export default CarSetting;

import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { GarageContent, useGarageContext } from '../../context/GarageContext';
import { useCar } from '../../hooks/useCar';
import { useGenerateCars } from '../../hooks/useGenerateCars';
import { BASE_COLOR } from '../../utils/constants';
import s from './MainControls.module.css';

const MainControls: FC = () => {
  const { createCar, updateCar } = useCar();
  const { generateCars } = useGenerateCars();
  const { isRace, setIsRace, selectedCar } = useGarageContext() as GarageContent;
  const [nameForCreate, setNameForCreate] = useState('');
  const [colorForCreate, setColorForCreate] = useState(BASE_COLOR);
  const [nameForUpdate, setNameForUpdate] = useState('');
  const [colorForUpdate, setColorForUpdate] = useState(BASE_COLOR);

  const changeCarName = (e: ChangeEvent<HTMLInputElement>) => setNameForCreate(e.target.value);
  const changeCarColor = (e: ChangeEvent<HTMLInputElement>) => setColorForCreate(e.target.value);

  const onCreateCar = () => {
    if (nameForCreate && colorForCreate) {
      createCar(nameForCreate, colorForCreate);
      setNameForCreate('');
      setColorForCreate(BASE_COLOR);
    }
  };

  const updateCarName = (e: ChangeEvent<HTMLInputElement>) => setNameForUpdate(e.target.value);
  const updateCarColor = (e: ChangeEvent<HTMLInputElement>) => setColorForUpdate(e.target.value);

  const onUpdateCar = () => {
    if (nameForUpdate && colorForUpdate) {
      updateCar(selectedCar!.id, nameForUpdate, colorForUpdate);
      setNameForUpdate('');
      setColorForUpdate(BASE_COLOR);
    }
  };

  useEffect(() => {
    if (selectedCar) {
      setNameForUpdate(selectedCar.name);
      setColorForUpdate(selectedCar.color);
    }
  }, [selectedCar]);

  return (
    <div className={s.garage__settings}>
      <div className={s.setting__wrapper}>
        <input type='text' name='carName' value={nameForCreate} onChange={(e) => changeCarName(e)} />
        <input type='color' name='carColor' value={colorForCreate} onChange={(e) => changeCarColor(e)} />
        <button onClick={onCreateCar}>CREATE</button>
      </div>
      <div className={s.setting__wrapper}>
        <input type='text' name='carNameUpdated' value={nameForUpdate} onChange={(e) => updateCarName(e)} />
        <input type='color' name='colorForUpdate' value={colorForUpdate} onChange={(e) => updateCarColor(e)} />
        <button onClick={onUpdateCar}>UPDATE</button>
      </div>
      <div className={s.setting__wrapper}>
        <button disabled={isRace} onClick={() => setIsRace((prevState) => !prevState)}>
          RACE
        </button>
        <button disabled={!isRace} onClick={() => setIsRace((prevState) => !prevState)}>
          RESET
        </button>
        <button onClick={generateCars}>GENERATE CARS</button>
      </div>
    </div>
  );
};

export default MainControls;

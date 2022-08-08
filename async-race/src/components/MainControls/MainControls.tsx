import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { useGlobalContext } from '../../context/GlobalContext';
import { useCar } from '../../hooks/useCar';
import { useGenerateCars } from '../../hooks/useGenerateCars';
import { BASE_COLOR } from '../../utils/constants';
import s from './MainControls.module.css';

const MainControls: FC = () => {
  const { createCar, updateCar } = useCar();
  const { generateCars } = useGenerateCars();
  const { isRace, setIsRace, setIsFinish, selectedCar } = useGlobalContext();
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
    if (nameForUpdate && colorForUpdate && selectedCar) {
      updateCar(selectedCar.id, nameForUpdate, colorForUpdate);
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
        <input
          className={s.setting__input_text}
          type='text'
          name='carName'
          value={nameForCreate}
          onChange={(e) => changeCarName(e)}
        />
        <input type='color' name='carColor' value={colorForCreate} onChange={(e) => changeCarColor(e)} />
        <button className={s.setting__btn} onClick={onCreateCar}>
          CREATE
        </button>
      </div>
      <div className={s.setting__wrapper}>
        <input
          className={s.setting__input_text}
          type='text'
          name='carNameUpdated'
          value={nameForUpdate}
          onChange={(e) => updateCarName(e)}
        />
        <input type='color' name='colorForUpdate' value={colorForUpdate} onChange={(e) => updateCarColor(e)} />
        <button className={s.setting__btn} onClick={onUpdateCar}>
          UPDATE
        </button>
      </div>
      <div className={s.setting__wrapper}>
        <button className={s.setting__btn} disabled={isRace} onClick={() => setIsRace(true)}>
          RACE
        </button>
        <button
          className={s.setting__btn}
          disabled={!isRace}
          onClick={() => {
            setIsFinish(false);
            setIsRace(false);
          }}
        >
          RESET
        </button>
        <button className={s.setting__btn} onClick={generateCars}>
          GENERATE CARS
        </button>
      </div>
    </div>
  );
};

export default MainControls;

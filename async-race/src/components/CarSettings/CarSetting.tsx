import React, { ChangeEvent, useEffect, useState } from 'react';
import { useGarageContext } from '../../context/GarageContext';
import { useCreateCar } from '../../hooks/useCreateCar';
import s from './CarSettings.module.css';

function CarSetting() {
  const [carName, setCarName] = useState('');
  const [carColor, setCarColor] = useState('');
  const [createdCar, createCar] = useCreateCar();
  const { carsContext, setCarsContext, selectedCar, setSelectedCar } = useGarageContext();

  const changeCarName = (e: ChangeEvent<HTMLInputElement>) => {
    setCarName(e.target.value);
  };

  const changeCarColor = (e: ChangeEvent<HTMLInputElement>) => {
    setCarColor(e.target.value);
  };

  const onCreateCar = async () => {
    if (carName && carColor) {
      createCar(carName, carColor);
      setCarName('');
      setCarColor('');
    }
  };

  useEffect(() => {
    const cars = [...carsContext, createdCar];
    setCarsContext(cars);
  }, [createdCar]);

  return (
    <div className={s.garage__settings}>
      <div>
        <input type='text' name='carName' value={carName} onChange={(e) => changeCarName(e)} />
        <input type='color' name='carColor' value={carColor} onChange={(e) => changeCarColor(e)} />
        <button onClick={() => onCreateCar()}>CREATE</button>
      </div>
      <div>
        <input type='text' name='carName' id='' />
        <input type='color' name='carColor' id='' />
        <button>UPDATE</button>
      </div>
      <div>
        <button>RACE</button>
        <button>RESET</button>
        <button>GENERATE CARS</button>
      </div>
    </div>
  );
}

export default CarSetting;

import React, { FC, useEffect, useState } from 'react';
import CarSetting from '../components/CarSettings/CarSetting';
import Track from '../components/Track/Track';
import { GarageContext } from '../context/GarageContext';
import { useGetCars } from '../hooks/useGetCars';
import { ICar } from '../models';
import style from './Garage.module.css';

const Garage: FC = () => {
  const [cars, getCars] = useGetCars();
  const [carsFromContext, setCarsToContext] = useState<ICar[]>([]);
  const [selectedCar, setSelectedCar] = useState<number | null>(null);

  useEffect(() => {
    getCars();
  }, []);

  useEffect(() => {
    setCarsToContext(cars);
  }, [cars]);

  return (
    <GarageContext.Provider value={{ carsFromContext, setCarsToContext, selectedCar, setSelectedCar }}>
      <div className={style.garage}>
        <CarSetting />
        <div className={style.garage__main}>
          <h2 className={style.garage__main_title}>Garage {cars.length}</h2>
          <h3 className={style.garage__main_subtitle}>Page #9</h3>
          <div className={style.garage__tracks}>
            {carsFromContext.length && carsFromContext.map((car) => <Track key={car.id} {...car} />)}
          </div>
        </div>
      </div>
    </GarageContext.Provider>
  );
};

export default Garage;

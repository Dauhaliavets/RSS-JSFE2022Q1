import React, { FC, useEffect, useState } from 'react';
import CarSetting from '../components/CarSettings/CarSetting';
import Track from '../components/Track/Track';
import { GarageContext } from '../context/GarageContext';
import { useGetCars } from '../hooks/useGetCars';
import { ICar } from '../models';
import s from './Garage.module.css';

const Garage: FC = () => {
  const { receivedCars, getCars } = useGetCars();
  const [cars, setCars] = useState<ICar[]>([]);
  const [selectedCar, setSelectedCar] = useState<ICar | null>(null);

  useEffect(() => {
    getCars();
  }, []);

  useEffect(() => {
    setCars(receivedCars);
  }, [receivedCars]);

  return (
    <GarageContext.Provider value={{ cars, setCars, selectedCar, setSelectedCar }}>
      <div className={s.garage}>
        <CarSetting />
        <div className={s.garage__main}>
          <h2 className={s.garage__main_title}>Garage {cars.length}</h2>
          <h3 className={s.garage__main_subtitle}>Page #9</h3>
          <div className={s.garage__tracks}>{cars.length && cars.map((car) => <Track key={car.id} {...car} />)}</div>
        </div>
      </div>
    </GarageContext.Provider>
  );
};

export default Garage;

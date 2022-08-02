import React, { FC, useEffect, useState } from 'react';
import CarSetting from '../components/CarSettings/CarSetting';
import Track from '../components/Track/Track';
import { GarageContext } from '../context/GarageContext';
import { useGlobalContext } from '../context/GlobalContext';
import { useGetCars } from '../hooks/useGetCars';
import { usePaginate } from '../hooks/usePaginate';
import { ICar } from '../models';
import s from './Garage.module.css';

const Garage: FC = () => {
  const { receivedCars, getCars } = useGetCars();
  const [cars, setCars] = useState<ICar[]>([]);
  const [selectedCar, setSelectedCar] = useState<ICar | null>(null);
  const { pageCount, firstIndex, lastIndex, prevPage, nextPage } = usePaginate({
    contentPerPage: 7,
    count: cars.length,
  });
  const { currentPage } = useGlobalContext();

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
          {cars.length && (
            <div>
              <h3 className={s.garage__main_subtitle}>Page #{currentPage}</h3>
              <div className={s.garage__tracks}>
                {cars.slice(firstIndex, lastIndex).map((car) => (
                  <Track key={car.id} {...car} />
                ))}
              </div>
              <div className={s.pagination}>
                <button disabled={currentPage === 1} onClick={prevPage}>
                  Prev
                </button>
                <button disabled={currentPage === pageCount} onClick={nextPage}>
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </GarageContext.Provider>
  );
};

export default Garage;

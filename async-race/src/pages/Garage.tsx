import React, { FC, useEffect } from 'react';
import MainControls from '../components/MainControls/MainControls';
import Track from '../components/Track/Track';
import { useGlobalContext } from '../context/GlobalContext';
import { useGetCars } from '../hooks/useGetCars';
import { useResults } from '../hooks/useResults';
import { COUNT_VIEW_CARS } from '../utils/constants';
import s from './Garage.module.css';

const Garage: FC = () => {
  const { cars, countCars, currentPageGarage, setCurrentPageGarage, isRace } = useGlobalContext();
  const { getCars } = useGetCars();
  const { saveResult, currentWinner } = useResults();

  const numberFirstPage = 1;
  const numberLastPage = Math.ceil(countCars / COUNT_VIEW_CARS);

  useEffect(() => {
    let isSubscribed = true;
    getCars(currentPageGarage);
    return () => {
      isSubscribed = false;
    };
  }, [currentPageGarage]);

  return (
    <div className={s.garage}>
      <MainControls />
      <div className={s.garage__main}>
        <h2 className={s.garage__main_title}>Garage {countCars}</h2>
        {countCars && (
          <div>
            <h3 className={s.garage__main_subtitle}>Page #{currentPageGarage}</h3>
            <div className={s.garage__tracks}>
              {isRace && currentWinner && (
                <div className={s.notify__wrapper}>
                  <span className={s.notify__text}>
                    {currentWinner.success && `${currentWinner.name} went first [time: ${currentWinner.time}s]`}
                  </span>
                </div>
              )}
              {cars.map((car) => (
                <Track key={car.id} data={car} saveResult={saveResult} />
              ))}
            </div>
            <div className={s.pagination}>
              <button
                disabled={currentPageGarage === numberFirstPage}
                onClick={() => setCurrentPageGarage(currentPageGarage - 1)}
              >
                Prev
              </button>
              <button
                disabled={currentPageGarage === numberLastPage}
                onClick={() => setCurrentPageGarage(currentPageGarage + 1)}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export { Garage };

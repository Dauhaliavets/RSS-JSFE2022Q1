import React, { FC, useEffect, useState } from 'react';
import CarSetting from '../components/CarSettings/CarSetting';
import Track from '../components/Track/Track';
import { GarageContext } from '../context/GarageContext';
import { useGlobalContext } from '../context/GlobalContext';
import { useGetCars } from '../hooks/useGetCars';
import { usePaginate } from '../hooks/usePaginate';
import { useWinner } from '../hooks/useWinner';
import { ICar, TrackResult } from '../models';
import s from './Garage.module.css';

const Garage: FC = () => {
  const { receivedCars, getCars } = useGetCars();
  const { getWinner, createWinner, deleteWinner, updateWinner } = useWinner();
  const [cars, setCars] = useState<ICar[]>([]);
  const [currentWinner, setCurrentWinner] = useState<TrackResult | null>(null);
  const [isRace, setIsRace] = useState<boolean>(false);
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

  const results: TrackResult[] = [];

  const saveResult = async (result: TrackResult) => {
    results.push(result);

    if (results.length >= 7) {
      const winResult = results.filter((item) => item.success).sort((a, b) => a.time - b.time)[0];
      const convertedTime = +(winResult.time / 1000).toFixed(2);
      const winnerFromDB = await getWinner(winResult.id);
      if (winnerFromDB.id) {
        const newWins = winnerFromDB.wins + 1;
        const newTime = convertedTime > winnerFromDB.time ? winnerFromDB.time : convertedTime;
        updateWinner(winResult.id, newWins, newTime);
      } else {
        createWinner(winResult.id, 1, convertedTime);
      }

      setCurrentWinner({ id: winResult.id, name: winResult.name, time: convertedTime, success: winResult.success });
      console.log(`ID: ${winResult.id} ${winResult.name} went first [time: ${convertedTime}s]`);
    }
  };

  return (
    <GarageContext.Provider value={{ cars, setCars, isRace, setIsRace, selectedCar, setSelectedCar }}>
      <div className={s.garage}>
        <CarSetting />
        <div className={s.garage__main}>
          <h2 className={s.garage__main_title}>Garage {cars.length}</h2>
          {cars.length && (
            <div>
              <h3 className={s.garage__main_subtitle}>Page #{currentPage}</h3>
              <div className={s.garage__tracks}>
                {isRace && currentWinner && (
                  <div className={s.notify__wrapper}>
                    <span
                      className={s.notify__text}
                    >{`${currentWinner.name} went first [time: ${currentWinner.time}s]`}</span>
                  </div>
                )}
                {cars.slice(firstIndex, lastIndex).map((car) => (
                  <Track key={car.id} data={car} saveResult={saveResult} />
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

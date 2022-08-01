import React, { useEffect, useRef, useState } from 'react';
import { EngineMode, ICar } from '../../models';
import { ReactComponent as Car } from '../../assets/car.svg';
import s from './Track.module.css';
import { useChangeEngineMode } from '../../hooks/useChangeEngineMode';
import { useDeleteCar } from '../../hooks/useDeleteCar';
import { useGarageContext } from '../../context/GarageContext';

function Track({ id, name, color }: ICar) {
  const [engine, getEngine] = useChangeEngineMode();
  const [deleteCar] = useDeleteCar();
  const { carsContext, setCarsContext } = useGarageContext();
  const [isAnimate, setIsAnimate] = useState<boolean>(false);
  const car = useRef<HTMLDivElement>(null);

  const onAnimate = () => {
    if (engine.distance > 0) {
      const duration = engine.distance / 2000 / engine.velocity;
      if (car && car.current) {
        car.current!.style.transitionDuration = `${duration}s`;
        setIsAnimate(true);
        car.current.ontransitionstart = () => {
          // console.log('animation start');
        };
        car.current.ontransitionend = () => {
          // console.log('animation end');
          setIsAnimate(false);
        };
      }
    }
  };

  useEffect(() => {
    onAnimate();
  }, [engine, isAnimate]);

  const onStart = () => getEngine(id, EngineMode.started);
  const onStop = () => getEngine(id, EngineMode.stopped);
  const onDeleteCar = () => deleteCar(id);
  const onSelectCar = () => {};

  return (
    <div className={s.track}>
      <div className={s.track__btns}>
        <button className={s.btn} onClick={onSelectCar}>
          SELECT
        </button>
        <button className={s.btn} onClick={onDeleteCar}>
          REMOVE
        </button>
        <span className={s.car__name}>{name}</span>
        <button className={s.btn} onClick={() => onStart()}>
          START
        </button>
        <button className={s.btn} onClick={() => onStop()}>
          STOP
        </button>
      </div>
      <div className={s.car__track}>
        <div className={isAnimate ? `${s.car} ${s.car_animate}` : s.car} ref={car}>
          <Car fill={color} />
        </div>
      </div>
      <div className={s.cover}></div>
    </div>
  );
}

export default Track;

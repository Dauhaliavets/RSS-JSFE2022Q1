import React, { FC, useEffect, useRef } from 'react';
import { EngineMode, TrackProps } from '../../models';
import { ReactComponent as Car } from '../../assets/car.svg';
import s from './Track.module.css';
import { useChangeEngineMode } from '../../hooks/useChangeEngineMode';
import { useDeleteCar } from '../../hooks/useDeleteCar';
import { GarageContent, useGarageContext } from '../../context/GarageContext';

const Track: FC<TrackProps> = ({ data: { id, name, color }, saveResult }) => {
  const { changeEngine, changeEngineDrive } = useChangeEngineMode();
  const [deleteCar] = useDeleteCar();
  const { isRace, setSelectedCar } = useGarageContext() as GarageContent;
  const car = useRef<HTMLDivElement>(null);
  const animateIdRef = useRef<number>();

  const onAnimate = (time: number): void => {
    const endX = car.current!.parentElement!.clientWidth - 80;
    let curX = car.current!.offsetLeft;
    const framesCount = (time / 1000) * 60;
    const dX = (endX - curX) / framesCount;

    function animate() {
      curX += dX;
      car.current!.style.transform = `translate(${curX}px, 0px)`;

      if (curX <= endX) {
        animateIdRef.current = requestAnimationFrame(animate);
      }
    }

    animateIdRef.current = requestAnimationFrame(animate);
  };

  const onStart = async () => {
    const { distance, velocity } = await changeEngine(id, EngineMode.started);
    const time = Math.round(distance / velocity);
    onAnimate(time);
    const { success } = await changeEngineDrive(id, EngineMode.drive);
    saveResult({ id, name, time, success });
    if (!success) {
      cancelAnimationFrame(animateIdRef.current!);
    }
  };

  const onStop = async () => {
    cancelAnimationFrame(animateIdRef.current!);
    const engine = await changeEngine(id, EngineMode.stopped);
    car.current!.style.transform = `translate(${engine.velocity}px, 0px)`;
  };

  const onDeleteCar = () => deleteCar(id);
  const onSelectCar = () => setSelectedCar({ id, name, color });

  useEffect(() => {
    if (isRace) {
      onStart();
    } else {
      onStop();
    }
  }, [isRace]);

  return (
    <div className={s.racetrack}>
      <div className={s.racetrack__btns}>
        <button className={s.btn} onClick={onSelectCar}>
          SELECT
        </button>
        <button className={s.btn} onClick={onDeleteCar}>
          REMOVE
        </button>
        <button className={s.btn} onClick={onStart}>
          START
        </button>
        <button className={s.btn} onClick={() => onStop()}>
          STOP
        </button>
      </div>
      <div className={s.racetrack__info}>
        <span className={s.car__name}>{name}</span>
      </div>
      <div className={s.track}>
        <div className={s.track__car} ref={car}>
          <Car fill={color} />
        </div>
        <div className={s.track__flag}></div>
        <div className={s.track__cover}></div>
      </div>
    </div>
  );
};

export default Track;

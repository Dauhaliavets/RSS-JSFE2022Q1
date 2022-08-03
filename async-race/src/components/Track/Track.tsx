import React, { FC, useRef } from 'react';
import { EngineMode, IAnimateProps, ICar } from '../../models';
import { ReactComponent as Car } from '../../assets/car.svg';
import s from './Track.module.css';
import { useChangeEngineMode } from '../../hooks/useChangeEngineMode';
import { useDeleteCar } from '../../hooks/useDeleteCar';
import { useGarageContext } from '../../context/GarageContext';

const Track: FC<ICar> = ({ id, name, color }) => {
  const { changeEngine, changeEngineDrive } = useChangeEngineMode();
  const [deleteCar] = useDeleteCar();
  const { setSelectedCar } = useGarageContext();
  const car = useRef<HTMLDivElement>(null);
  let animateId: number;

  const onAnimate = ({ velocity, distance }: IAnimateProps): void => {
    const endX = car.current!.parentElement!.clientWidth - 80;
    let curX = car.current!.offsetLeft;
    const time = distance / velocity;
    const framesCount = (time / 1000) * 60;
    const dX = (endX - curX) / framesCount;

    function animate() {
      curX += dX;
      car.current!.style.transform = `translate(${curX}px, 0px)`;

      if (curX <= endX) {
        animateId = requestAnimationFrame(animate);
      }
    }

    animateId = requestAnimationFrame(animate);
  };

  const onStart = async () => {
    const engine = await changeEngine(id, EngineMode.started);
    onAnimate({ ...engine });
    const { success } = await changeEngineDrive(id, EngineMode.drive);
    if (!success) {
      cancelAnimationFrame(animateId);
    }
  };

  const onStop = async () => {
    cancelAnimationFrame(animateId);
    const engine = await changeEngine(id, EngineMode.stopped);
    car.current!.style.transform = `translate(${engine.velocity}px, 0px)`;
  };

  const onDeleteCar = () => deleteCar(id);
  const onSelectCar = () => setSelectedCar({ id, name, color });

  return (
    <div className={s.racetrack}>
      <div className={s.racetrack__btns}>
        <button className={s.btn} onClick={onSelectCar}>
          SELECT
        </button>
        <button className={s.btn} onClick={onDeleteCar}>
          REMOVE
        </button>
        <button className={s.btn} onClick={() => onStart()}>
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

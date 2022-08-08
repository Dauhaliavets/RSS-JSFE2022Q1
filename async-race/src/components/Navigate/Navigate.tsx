import React, { FC } from 'react';
import { useGlobalContext } from '../../context/GlobalContext';
import s from './Navigate.module.css';

const Navigate: FC = () => {
  const { isGaragePage, setIsGaragePage, setIsRace } = useGlobalContext();
  return (
    <div className={s.navigate__btns}>
      <button
        className={isGaragePage ? s.nav__btn_active : s.nav__btn}
        onClick={() => {
          setIsRace(false);
          setIsGaragePage(true);
        }}
      >
        TO GARAGE
      </button>
      <button
        className={isGaragePage ? s.nav__btn : s.nav__btn_active}
        onClick={() => {
          setIsRace(false);
          setIsGaragePage(false);
        }}
      >
        TO WINNERS
      </button>
    </div>
  );
};

export default Navigate;

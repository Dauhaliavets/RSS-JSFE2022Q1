import React, { FC } from 'react';
import { useGlobalContext } from '../../context/GlobalContext';

const Navigate: FC = () => {
  const { setIsGaragePage, setIsRace } = useGlobalContext();
  return (
    <div>
      <button
        onClick={() => {
          setIsRace(false);
          setIsGaragePage(true);
        }}
      >
        TO GARAGE
      </button>
      <button
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

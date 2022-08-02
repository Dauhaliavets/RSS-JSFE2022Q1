import React, { FC } from 'react';
import { useGlobalContext } from '../../context/GlobalContext';

const Navigate: FC = () => {
  const { setIsGaragePage } = useGlobalContext();
  return (
    <div>
      <button onClick={() => setIsGaragePage(true)}>TO GARAGE</button>
      <button onClick={() => setIsGaragePage(false)}>TO WINNERS</button>
    </div>
  );
};

export default Navigate;

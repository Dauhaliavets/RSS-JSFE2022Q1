import React, { FC } from 'react';
import { useGlobalContext } from '../../context/GlobalContext';

const Navigate: FC = () => {
  const { setRoute } = useGlobalContext();
  return (
    <div>
      <button onClick={() => setRoute('garage')}>TO GARAGE</button>
      <button onClick={() => setRoute('winners')}>TO WINNERS</button>
    </div>
  );
};

export default Navigate;

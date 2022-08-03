import React, { FC, useState } from 'react';
import './App.css';
import Navigate from './components/Navigate/Navigate';
import { GlobalContext } from './context/GlobalContext';
import Garage from './pages/Garage';
import Winners from './pages/Winners';

const App: FC = () => {
  const [isGaragePage, setIsGaragePage] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);

  return (
    <GlobalContext.Provider value={{ isGaragePage, setIsGaragePage, currentPage, setCurrentPage }}>
      <div className='app-container'>
        <Navigate />
        {isGaragePage ? <Garage /> : <Winners />}
      </div>
    </GlobalContext.Provider>
  );
};

export default App;

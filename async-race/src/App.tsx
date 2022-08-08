import React, { FC, useState } from 'react';
import './App.css';
import Navigate from './components/Navigate/Navigate';
import { GlobalContext } from './context/GlobalContext';
import { ICar } from './models';
import { Garage } from './pages/Garage';
import { Winners } from './pages/Winners';

const App: FC = () => {
  const [isGaragePage, setIsGaragePage] = useState<boolean>(true);
  const [currentPageGarage, setCurrentPageGarage] = useState<number>(1);
  const [currentPageWinners, setCurrentPageWinners] = useState<number>(1);
  const [isRace, setIsRace] = useState<boolean>(false);
  const [selectedCar, setSelectedCar] = useState<ICar | null>(null);
  const [cars, setCars] = useState<ICar[]>([]);
  const [countCars, setCountCars] = useState<number>(0);

  return (
    <GlobalContext.Provider
      value={{
        isGaragePage,
        setIsGaragePage,
        currentPageGarage,
        setCurrentPageGarage,
        currentPageWinners,
        setCurrentPageWinners,
        cars,
        setCars,
        countCars,
        setCountCars,
        isRace,
        setIsRace,
        selectedCar,
        setSelectedCar,
      }}
    >
      <div className='app-container'>
        <Navigate />
        {isGaragePage ? <Garage /> : <Winners />}
      </div>
    </GlobalContext.Provider>
  );
};

export default App;

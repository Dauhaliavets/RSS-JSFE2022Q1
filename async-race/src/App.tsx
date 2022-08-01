import React, { FC, useState } from 'react';
import './App.css';
import Navigate from './components/Navigate/Navigate';
import { GlobalContext } from './context/GlobalContext';
import Garage from './pages/Garage';
import Winners from './pages/Winners';

const App: FC = () => {
  const [route, setRoute] = useState<string>('garage');

  return (
    <GlobalContext.Provider value={{ route, setRoute }}>
      <div className='app-container'>
        <Navigate />
        {route === 'garage' ? <Garage /> : route === 'winners' ? <Winners /> : 'Not Found'}
      </div>
    </GlobalContext.Provider>
  );
};

export default App;

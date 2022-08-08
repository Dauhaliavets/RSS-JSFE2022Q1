import React, { useEffect, useState } from 'react';
import { useWinners } from '../hooks/useWinners';
import { ReactComponent as Car } from '../assets/carForWinners.svg';
import s from './Winners.module.css';
import { useGlobalContext } from '../context/GlobalContext';
import { COUNT_VIEW_WINS } from '../utils/constants';
import { OrderTypes, SortTypes } from '../models';

function Winners() {
  const [sortBy, setSortBy] = useState<SortTypes>(SortTypes.wins);
  const [orderBy, setOrderBy] = useState<OrderTypes>(OrderTypes.asc);

  const { currentPageWinners, setCurrentPageWinners } = useGlobalContext();
  const { winners, countWins, getWinners } = useWinners();

  const numberFirstPage = 1;
  const numberLastPage = Math.ceil(countWins / COUNT_VIEW_WINS);

  useEffect(() => {
    let isSubscribed = true;
    getWinners(currentPageWinners, sortBy, orderBy);
    return () => {
      isSubscribed = false;
    };
  }, [getWinners, currentPageWinners, sortBy, orderBy]);

  const sortByWins = () => {
    setSortBy(SortTypes.wins);
    if (orderBy === OrderTypes.asc) {
      setOrderBy(OrderTypes.desc);
    } else {
      setOrderBy(OrderTypes.asc);
    }
  };
  const sortByTime = () => {
    setSortBy(SortTypes.time);
    if (orderBy === OrderTypes.asc) {
      setOrderBy(OrderTypes.desc);
    } else {
      setOrderBy(OrderTypes.asc);
    }
  };

  return (
    <div className={s.winners__main}>
      <h2 className={s.winners__main_title}>Winners {countWins}</h2>
      {countWins && (
        <div>
          <h3 className={s.winners__main_subtitle}>Page #{currentPageWinners}</h3>
          <div className={s.winners__table}>
            <table>
              <thead>
                <tr>
                  <th>Number</th>
                  <th>Id</th>
                  <th>Car</th>
                  <th>Name</th>
                  <th onClick={sortByWins}>Wins</th>
                  <th onClick={sortByTime}>Best time (seconds)</th>
                </tr>
              </thead>
              <tbody>
                {winners.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1 + (currentPageWinners - 1) * COUNT_VIEW_WINS}</td>
                    <td>{'#' + item.id}</td>
                    <td>
                      <Car fill={item.color} />
                    </td>
                    <td>{item.name}</td>
                    <td>{item.wins}</td>
                    <td>{item.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={s.pagination}>
            <button
              className={s.btn}
              disabled={currentPageWinners === numberFirstPage}
              onClick={() => setCurrentPageWinners(currentPageWinners - 1)}
            >
              Prev
            </button>
            <button
              className={s.btn}
              disabled={currentPageWinners === numberLastPage}
              onClick={() => setCurrentPageWinners(currentPageWinners + 1)}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export { Winners };

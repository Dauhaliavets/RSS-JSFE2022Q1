import { useState } from 'react';
import { UsePagination } from '../models';

const usePaginate: UsePagination = ({ defaultPage, count, countPerPage }) => {
  const [page, setPage] = useState<number>(defaultPage);

  const countPage = Math.ceil(count / countPerPage);
  const lastIndex = page * countPerPage;
  const firstIndex = lastIndex - countPerPage;

  if (page > countPage && countPage > 0) {
    setPage(countPage);
  }

  const prevPage = () => setPage((state) => (state === 1 ? state : state - 1));
  const nextPage = () => setPage((state) => (state === countPage ? state : state + 1));

  return { page, countPage, lastIndex, firstIndex, prevPage, nextPage };
};

export { usePaginate };

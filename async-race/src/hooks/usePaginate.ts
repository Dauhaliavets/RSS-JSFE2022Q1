import { useState } from 'react';
import { UsePagination } from '../models';

const usePaginate: UsePagination = ({ contentPerPage, count }) => {
  const [page, setPage] = useState<number>(1);

  const pageCount = Math.ceil(count / contentPerPage);
  const lastIndex = page * contentPerPage;
  const firstIndex = lastIndex - contentPerPage;

  const prevPage = () => setPage((state) => (state === 1 ? state : state - 1));
  const nextPage = () => setPage((state) => (state === pageCount ? state : state + 1));

  return { page, pageCount, firstIndex, lastIndex, prevPage, nextPage };
};

export { usePaginate };

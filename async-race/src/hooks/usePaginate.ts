import { useEffect, useState } from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import { UsePagination } from '../models';

const usePaginate: UsePagination = ({ contentPerPage, count }) => {
  const { currentPage, setCurrentPage } = useGlobalContext();
  const [page, setPage] = useState<number>(currentPage || 1);

  const pageCount = Math.ceil(count / contentPerPage);
  const lastIndex = page * contentPerPage;
  const firstIndex = lastIndex - contentPerPage;

  const prevPage = () => setPage((state) => (state === 1 ? state : state - 1));
  const nextPage = () => setPage((state) => (state === pageCount ? state : state + 1));

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  return { pageCount, firstIndex, lastIndex, prevPage, nextPage };
};

export { usePaginate };

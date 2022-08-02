export interface ICar {
  id: number;
  name: string;
  color: string;
}

export interface IEngine {
  velocity: number;
  distance: number;
}

export enum Methods {
  Get = 'GET',
  Post = 'POST',
  Patch = 'PATCH',
  Delete = 'DELETE',
  Put = 'PUT',
}

export enum EngineMode {
  started = 'started',
  stopped = 'stopped',
  drive = 'drive',
}

interface UsePaginationProps {
  contentPerPage: number;
  count: number;
}
interface IUsePagination {
  pageCount: number;
  firstIndex: number;
  lastIndex: number;
  nextPage: () => void;
  prevPage: () => void;
}

export type UsePagination = (props: UsePaginationProps) => IUsePagination;

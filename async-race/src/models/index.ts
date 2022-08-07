export interface ICar {
  id: number;
  name: string;
  color: string;
}

export interface IEngine {
  velocity: number;
  distance: number;
}
export type EngineState = {
  success: boolean;
};

export type CarSettingsProps = {
  handlerStartRace: () => void;
};

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
  defaultPage: number;
  count: number;
  countPerPage: number;
}
interface IUsePagination {
  page: number;
  countPage: number;
  firstIndex: number;
  lastIndex: number;
  nextPage: () => void;
  prevPage: () => void;
}

export type UsePagination = (props: UsePaginationProps) => IUsePagination;

export interface IAnimateProps {
  velocity: number;
  distance: number;
}

export type TrackResult = {
  id: number;
  name: string;
  time: number;
  success: boolean;
};

export type TrackProps = {
  data: ICar;
  saveResult: (result: TrackResult) => void;
};

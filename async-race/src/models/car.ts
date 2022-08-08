export interface ICar {
  id: number;
  name: string;
  color: string;
}

export interface ICarsResponse {
  data: ICar[];
  count: string;
}

export interface IEngine {
  velocity: number;
  distance: number;
}
export type EngineState = {
  success: boolean;
};

export enum EngineMode {
  started = 'started',
  stopped = 'stopped',
  drive = 'drive',
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

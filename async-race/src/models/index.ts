export enum Methods {
  Get = 'GET',
  Post = 'POST',
  Patch = 'PATCH',
  Delete = 'DELETE',
  Put = 'PUT',
}

export enum SortTypes {
  wins = 'wins',
  time = 'time',
}

export enum OrderTypes {
  asc = 'ASC',
  desc = 'DESC',
}

export interface IAnimateProps {
  velocity: number;
  distance: number;
}

export interface IWinner {
  id: number;
  wins: number;
  time: number;
}

export interface IWinnersResponse {
  data: IWinner[];
  count: string;
}

export interface IWinnerInfo {
  id: number;
  wins: number;
  time: number;
  name: string;
  color: string;
}

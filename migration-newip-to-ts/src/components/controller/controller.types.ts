import { NewsResponse, SourcesResponse } from '../view/appView.types';

enum RequestMethod {
  GET = 'GET',
  POST = 'POST',
}

type OptionsType = {
  apiKey: string;
};

type GetRespOptionsType = {
  sources?: string;
};

type GetRespType = {
  endpoint: string;
  options?: GetRespOptionsType;
};

interface ApiResponse {
  json(): PromiseLike<NewsResponse | SourcesResponse>;
  bodyUsed: boolean;
  redirected: boolean;
  ok: boolean;
  status?: number;
  statusText?: string;
  type: string;
  url: string;
} 

type CallbackArgsType<T> = { (data: T): void };

export { 
  RequestMethod,
  OptionsType, 
  GetRespOptionsType, 
  GetRespType, 
  ApiResponse, 
  CallbackArgsType,
};

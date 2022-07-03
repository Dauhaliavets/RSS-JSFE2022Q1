import { NewsResponse, SourcesResponse } from '../view/appView.types';

enum Url {
  BASE_URL = 'https://newsapi.org/v2/',
  API_KEY = '6b5f1ba0e28a4f0291f348b09b5c667d',
}

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
  Url,
  RequestMethod,
  OptionsType, 
  GetRespOptionsType, 
  GetRespType, 
  ApiResponse, 
  CallbackArgsType,
};

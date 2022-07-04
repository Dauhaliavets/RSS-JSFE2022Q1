import { NewsResponse, SourcesResponse } from '../view/appView.types';

enum Url {
  BASE_URL = 'https://newsapi.org/v2/',
  API_KEY = '6b5f1ba0e28a4f0291f348b09b5c667d',
}

enum RequestMethod {
  GET = 'GET',
  POST = 'POST',
}

enum StatusCodes {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
}

interface RequestOptionsType {
  endpoint: string;
  options?: {
    sources?: string;
  };
}

type ApiOptionsType = {
  apiKey: string;
};

interface ApiResponse {
  json(): Promise<NewsResponse | SourcesResponse>;
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
  StatusCodes,
  RequestOptionsType,
  ApiOptionsType,
  ApiResponse,
  CallbackArgsType,
};

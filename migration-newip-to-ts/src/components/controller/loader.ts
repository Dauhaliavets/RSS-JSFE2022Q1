import { NewsResponse, SourcesResponse } from './../view/appView.types';
import {
  ApiResponse,
  CallbackType,
  RequestOptionsType,
  ApiOptionsType,
  StatusCodes,
  Options,
} from './controller.types';

class Loader {
  constructor(private baseLink: string, readonly options: ApiOptionsType) {}

  protected getResp(
    { endpoint, options = {} }: RequestOptionsType,
    callback: CallbackType<NewsResponse | SourcesResponse> = () => console.error('No callback for GET response')
  ): void {
    this.load('GET', endpoint, callback, options);
  }

  private errorHandler(res: ApiResponse): ApiResponse | never {
    if (!res.ok) {
      if (res.status === StatusCodes.UNAUTHORIZED || res.status === StatusCodes.NOT_FOUND) {
        console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
      }
      throw Error(res.statusText);
    }

    return res;
  }

  private makeUrl(options: Options, endpoint: string): string {
    const urlOptions = { ...this.options, ...options };
    let url = `${this.baseLink}${endpoint}?`;
    Object.keys(urlOptions).forEach((key: string) => {
      url += `${key}=${urlOptions[key as keyof typeof urlOptions]}&`;
    });

    return url.slice(0, -1);
  }

  private load(
    method: string,
    endpoint: string,
    callback: CallbackType<NewsResponse | SourcesResponse>,
    options: Options
  ): void {
    fetch(this.makeUrl(options, endpoint), { method })
      .then(this.errorHandler)
      .then((res: ApiResponse) => res.json())
      .then((data: NewsResponse | SourcesResponse) => callback(data))
      .catch((err: string) => console.error(err));
  }
}

export default Loader;

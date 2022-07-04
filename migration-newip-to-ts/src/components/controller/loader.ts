import { NewsResponse, SourcesResponse } from './../view/appView.types';
import {
  ApiResponse,
  CallbackType,
  RequestOptionsType,
  ApiOptionsType,
  RequestMethod,
  StatusCodes,
} from './controller.types';

class Loader {
  private baseLink: string;
  readonly options: ApiOptionsType;

  constructor(baseLink: string, options: ApiOptionsType) {
    this.baseLink = baseLink;
    this.options = options;
  }

  protected getResp(
    { endpoint, options = {} }: RequestOptionsType,
    callback: CallbackType<NewsResponse | SourcesResponse> = () => console.error('No callback for GET response'),
  ): void {
    this.load(RequestMethod.GET, endpoint, callback, options);
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

  private makeUrl(options: Pick<RequestOptionsType, 'options'>['options'], endpoint: string): string {
    const urlOptions = { ...this.options, ...options };
    let url = `${this.baseLink}${endpoint}?`;
    Object.keys(urlOptions).forEach((key: string) => {
      url += `${key}=${urlOptions[key as keyof typeof urlOptions]}&`;
    });

    return url.slice(0, -1);
  }

  private load(
    method: RequestMethod.GET | RequestMethod.POST,
    endpoint: string,
    callback: CallbackType<NewsResponse | SourcesResponse>,
    options: Pick<RequestOptionsType, 'options'>['options'],
  ): void {
    fetch(this.makeUrl(options, endpoint), { method })
      .then(this.errorHandler)
      .then((res: ApiResponse) => res.json())
      .then((data: NewsResponse | SourcesResponse) => callback(data))
      .catch((err: string) => console.error(err));
  }
}

export default Loader;

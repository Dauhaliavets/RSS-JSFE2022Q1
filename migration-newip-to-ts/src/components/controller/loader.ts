import { NewsResponse, SourcesResponse } from './../view/appView.types';
import { ApiResponse, CallbackArgsType, GetRespOptionsType, GetRespType, OptionsType, RequestMethod } from './controller.types';

class Loader {
  private baseLink: string;
  private options: OptionsType;

  constructor(baseLink: string, options: OptionsType) {
    this.baseLink = baseLink;
    this.options = options;
  }

  getResp(
    { endpoint, options = {} }: GetRespType,
    callback: CallbackArgsType<NewsResponse | SourcesResponse> = () => console.error('No callback for GET response'),
  ): void {
    this.load(RequestMethod.GET, endpoint, callback, options);
  }

  private errorHandler(res: ApiResponse): ApiResponse | never {
    if (!res.ok) {
      if (res.status === 401 || res.status === 404)
        console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
      throw Error(res.statusText);
    }

    return res;
  }

  private makeUrl(options: GetRespOptionsType, endpoint: string): string {
    const urlOptions: { [index: string]: string } = { ...this.options, ...options };
    let url = `${this.baseLink}${endpoint}?`;

    Object.keys(urlOptions).forEach((key) => {
      url += `${key}=${urlOptions[key]}&`;
    });

    return url.slice(0, -1);
  }

  load(
    method: RequestMethod.GET | RequestMethod.POST,
    endpoint: string,
    callback: CallbackArgsType<NewsResponse | SourcesResponse>,
    options: GetRespOptionsType,
  ): void {
    fetch(this.makeUrl(options, endpoint), { method })
      .then(this.errorHandler)
      .then((res) => res.json())
      .then((data) => callback(data))
      .catch((err) => console.error(err));
  }
}

export default Loader;

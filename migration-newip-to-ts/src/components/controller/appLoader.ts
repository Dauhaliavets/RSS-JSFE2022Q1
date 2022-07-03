import { Url } from './controller.types';
import Loader from './loader';

class AppLoader extends Loader {
  constructor() {
    super(Url.BASE_URL, {
      apiKey: Url.API_KEY,
    });
  }
}

export default AppLoader;

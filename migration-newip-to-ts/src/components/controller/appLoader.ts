import Loader from './loader';

class AppLoader extends Loader {
  constructor() {
    super('https://newsapi.org/v2/', {
      apiKey: '6b5f1ba0e28a4f0291f348b09b5c667d',
    });
  }
}

export default AppLoader;

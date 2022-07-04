import { NewsResponse, SourcesResponse } from './../view/appView.types';
import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
  private controller: AppController;
  private view: AppView;

  constructor() {
    this.controller = new AppController();
    this.view = new AppView();
  }

  protected start(): void {
    (document.querySelector('.sources') as HTMLElement).addEventListener('click', (e: Event) =>
      this.controller.getNews(e, (data: NewsResponse): void => this.view.drawNews(data)),
    );
    this.controller.getSources((data: SourcesResponse): void => this.view.drawSources(data));
  }
}

export default App;

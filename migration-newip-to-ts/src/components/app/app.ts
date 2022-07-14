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

  public start(): void {
    (document.querySelector('.sources') as HTMLElement).addEventListener('click', (e: Event) =>
      this.controller.getNews(e, this.view.drawNews),
    );
    this.controller.getSources(this.view.drawSources);
  }
}

export default App;

import { NewsResponse } from './../view/appView.types';
import { SourcesResponse } from '../view/appView.types';
import AppLoader from './appLoader';
import { CallbackType } from './controller.types';

class AppController extends AppLoader {
  public getSources(callback: CallbackType<SourcesResponse>): void {
    super.getResp(
      {
        endpoint: 'sources',
      },
      callback,
    );
  }

  public getNews(e: Event, callback: CallbackType<NewsResponse>): void {
    let target = e.target as HTMLElement;
    const newsContainer = e.currentTarget as HTMLElement;

    while (target !== newsContainer) {
      if (target.classList.contains('source__item')) {
        const sourceId = target.getAttribute('data-source-id') as string;
        if (newsContainer.getAttribute('data-source') !== sourceId) {
          newsContainer.setAttribute('data-source', sourceId);
          super.getResp(
            {
              endpoint: 'everything',
              options: {
                sources: sourceId,
              },
            },
            callback,
          );
        }
        return;
      }
      target = target.parentNode as HTMLElement;
    }
  }
}

export default AppController;

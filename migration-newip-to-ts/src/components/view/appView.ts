import News from './news/news';
import Sources from './sources/sources';
import { NewsResponse, SourcesResponse } from './appView.types';
import { CallbackType } from '../controller/controller.types';

export class AppView {
  private news: News;
  private sources: Sources;

  constructor() {
    this.news = new News();
    this.sources = new Sources();
  }

  public drawNews: CallbackType<NewsResponse> = (data) => {
    const values = data.articles ? data.articles : [];
    this.news.draw(values);
  };

  public drawSources: CallbackType<SourcesResponse> = (data) => {
    const values = data?.sources ? data?.sources : [];
    this.sources.draw(values);
  };
}

export default AppView;

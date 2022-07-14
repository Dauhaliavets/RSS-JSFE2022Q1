import { DataNews } from './news/news.types';
import { DataSources } from './sources/sources.types';

export interface NewsResponse {
  status: string;
  totalResults?: number;
  articles?: DataNews[];
}

export interface SourcesResponse {
  status: string;
  sources?: DataSources[];
}

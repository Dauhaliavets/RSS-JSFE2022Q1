export interface NewsSourse {
  id: string;
  name: string;
}

export interface DataNews {
  author: string;
  content: string;
  description: string;
  publishedAt: string;
  source: NewsSourse;
  title: string;
  url: string;
  urlToImage: string;
}

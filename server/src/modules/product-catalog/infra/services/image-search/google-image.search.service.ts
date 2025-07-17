// google-image-search.service.ts
import { Injectable } from '@nestjs/common';
import { googleSearchConfig } from '@config/services.config';

export interface ImageResult {
  link: string;
  mime: string;
  fileFormat: string;
}

export interface Root {
  kind: string;
  url: Url;
  queries: Queries;
  context: Context;
  searchInformation: SearchInformation;
  items: Item[];
}

export interface Url {
  type: string;
  template: string;
}

export interface Queries {
  request: Request[];
  nextPage: NextPage[];
}

export interface Request {
  title: string;
  totalResults: string;
  searchTerms: string;
  count: number;
  startIndex: number;
  inputEncoding: string;
  outputEncoding: string;
  safe: string;
  cx: string;
  searchType: string;
}

export interface NextPage {
  title: string;
  totalResults: string;
  searchTerms: string;
  count: number;
  startIndex: number;
  inputEncoding: string;
  outputEncoding: string;
  safe: string;
  cx: string;
  searchType: string;
}

export interface Context {
  title: string;
}

export interface SearchInformation {
  searchTime: number;
  formattedSearchTime: string;
  totalResults: string;
  formattedTotalResults: string;
}

export interface Item {
  kind: string;
  title: string;
  htmlTitle: string;
  link: string;
  displayLink: string;
  snippet: string;
  htmlSnippet: string;
  mime: string;
  fileFormat: string;
  image: Image;
}

export interface Image {
  contextLink: string;
  height: number;
  width: number;
  byteSize: number;
  thumbnailLink: string;
  thumbnailHeight: number;
  thumbnailWidth: number;
}

@Injectable()
export class GoogleImageSearchService {
  private readonly apiKey: string;
  private readonly searchEngineId: string;
  private readonly baseUrl = 'https://www.googleapis.com/customsearch/v1';

  constructor() {
    this.apiKey = googleSearchConfig.googleApiKey;
    this.searchEngineId = googleSearchConfig.googleSearchEngineId;
  }

  async searchImages(query: string, limit = 4): Promise<ImageResult[]> {
    const params = new URLSearchParams({
      key: this.apiKey,
      cx: this.searchEngineId,
      q: query,
      searchType: 'image',
      num: limit.toString(),
    });

    const response = await fetch(`${this.baseUrl}?${params}`);
    const data = (await response.json()) as Root;

    return (
      data.items.map((item) => ({
        link: item.link,
        mime: item.mime,
        fileFormat: item.fileFormat,
      })) || []
    );
  }
}

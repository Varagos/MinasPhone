class SearchEngineImageResult {
  id: string;
  link: string;
  mime: string;
  fileFormat: string;
}

export class FindSearchEngineImagesResponseDto {
  data: SearchEngineImageResult[];
}

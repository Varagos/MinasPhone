import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'oxide.ts';
import { FindSearchEngineImagesQuery } from './find-search-engine-images.query';
import { InternalServerErrorException } from '@libs/exceptions';
import { GoogleImageSearchService } from '@modules/product-catalog/infra/services/image-search/google-image.search.service';
import { FindSearchEngineImagesResponseDto } from './find-search-engine-images.response.dto';

export type FindSearchEngineImagesResponse = Result<
  FindSearchEngineImagesResponseDto,
  InternalServerErrorException
>;

@QueryHandler(FindSearchEngineImagesQuery)
export class FindSearchEngineImagesQueryHandler implements IQueryHandler {
  constructor(
    private readonly searchEngineImagesService: GoogleImageSearchService,
  ) {}

  /**
   * In read model we don't need to execute
   * any business logic, so we can bypass
   * domain and repository layers completely
   * and execute query directly
   */
  async execute(
    query: FindSearchEngineImagesQuery,
  ): Promise<FindSearchEngineImagesResponse> {
    try {
      const images = await this.searchEngineImagesService.searchImages(
        query.searchText,
      );
      return Ok({
        data: images,
      });
    } catch (error: any) {
      return Err(new InternalServerErrorException(error.message));
    }
  }
}

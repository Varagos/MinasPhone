import { routesV1 } from '@config/app.routes';
import { IdResponse } from '@libs/api/id.response.dto';
import { CreateCategoryRequestDto } from '@modules/product-catalog/application/categories/commands/create-category/create-category.request.dto';
import { CategoryPaginatedResponseDto } from '@modules/product-catalog/application/categories/dtos/category.paginated.response.dto';
import { getHttpServer } from '@tests/setup/jestSetupAfterEnv';

export class ApiClient {
  private url = `/${routesV1.version}/${routesV1.category.root}`;

  async createCategory(dto: CreateCategoryRequestDto): Promise<IdResponse> {
    const response = await getHttpServer().post(this.url).send(dto);
    return response.body;
  }

  async deleteCategory(id: string): Promise<void> {
    const response = await getHttpServer().delete(`${this.url}/${id}`);
    return response.body;
  }

  async findAllCategories(): Promise<CategoryPaginatedResponseDto> {
    const response = await getHttpServer().get(this.url);
    return response.body;
  }
}

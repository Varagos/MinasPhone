import { routesV1 } from '@config/app.routes';
import { IdResponse } from '@libs/api/id.response.dto';
import { RemoveCartLineItemRequestDto } from '@modules/orders/application/carts/commands/remove-line-item/remove-cart-line-item.request.dto';
import { CreateCategoryRequestDto } from '@modules/product-catalog/application/categories/commands/create-category/create-category.request.dto';
import { UpdateCategoryRequestDto } from '@modules/product-catalog/application/categories/commands/update-category/update-category.request.dto';
import { CategoryPaginatedResponseDto } from '@modules/product-catalog/application/categories/dtos/category.paginated.response.dto';
import { ProductPaginatedResponseDto } from '@modules/product-catalog/application/categories/dtos/product.paginated.response.dto';
import { CreateProductRequestDto } from '@modules/product-catalog/application/products/commands/create-product/create-product.request.dto';
import { getHttpServer } from '@tests/setup/jestSetupAfterEnv';

export class ApiClient {
  private categoryUrl = `/${routesV1.version}/${routesV1.category.root}`;

  private productUrl = `/${routesV1.version}/${routesV1.product.root}`;

  async createCategory(dto: CreateCategoryRequestDto): Promise<IdResponse> {
    const response = await getHttpServer().post(this.categoryUrl).send(dto);
    return response.body;
  }

  async deleteCategory(id: string): Promise<void> {
    const response = await getHttpServer().delete(`${this.categoryUrl}/${id}`);
    return response.body;
  }

  async updateCategory(
    id: string,
    dto: UpdateCategoryRequestDto,
  ): Promise<void> {
    const response = await getHttpServer()
      .put(`${this.categoryUrl}/${id}`)
      .send(dto);
    return response.body;
  }

  async findAllCategories(): Promise<CategoryPaginatedResponseDto> {
    const response = await getHttpServer().get(this.categoryUrl);
    return response.body;
  }

  async createProduct(dto: CreateProductRequestDto): Promise<IdResponse> {
    const response = await getHttpServer().post(this.productUrl).send(dto);
    return response.body;
  }

  async deleteProduct(id: string): Promise<void> {
    const response = await getHttpServer().delete(`${this.productUrl}/${id}`);
    return response.body;
  }

  async updateProduct(
    id: string,
    dto: UpdateCategoryRequestDto,
  ): Promise<void> {
    const response = await getHttpServer()
      .put(`${this.productUrl}/${id}`)
      .send(dto);
    return response.body;
  }

  async findAllProducts(): Promise<ProductPaginatedResponseDto> {
    const response = await getHttpServer().get(this.productUrl);
    return response.body;
  }
}

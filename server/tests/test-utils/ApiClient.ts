import { routesV1 } from '@config/app.routes';
import { Cookie, CookieAccessInfo } from 'cookiejar';
import { IdResponse } from '@libs/api/id.response.dto';
import { RemoveCartLineItemRequestDto } from '@modules/orders/application/carts/commands/remove-line-item/remove-cart-line-item.request.dto';
import { CreateCategoryRequestDto } from '@modules/product-catalog/application/categories/commands/create-category/create-category.request.dto';
import { UpdateCategoryRequestDto } from '@modules/product-catalog/application/categories/commands/update-category/update-category.request.dto';
import { CategoryPaginatedResponseDto } from '@modules/product-catalog/application/categories/dtos/category.paginated.response.dto';
import { ProductPaginatedResponseDto } from '@modules/product-catalog/application/categories/dtos/product.paginated.response.dto';
import { CreateProductRequestDto } from '@modules/product-catalog/application/products/commands/create-product/create-product.request.dto';
import { getHttpServer } from '@tests/setup/jestSetupAfterEnv';
import { extractCookies } from '@tests/test-utils/cookies';
import { CartPrimitives } from '@modules/orders/application/carts/commands/create-cart/create-cart.handler';

type CartCookie = {
  value: CartPrimitives;
  setCookies: string;
};

export class ApiClient {
  private categoryUrl = `/${routesV1.version}/${routesV1.category.root}`;

  private productUrl = `/${routesV1.version}/${routesV1.product.root}`;

  private v1Api = (route: string) => `/${routesV1.version}${route}`;

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

  async fetchCart(setCookie?: string): Promise<CartCookie> {
    const agent = getHttpServer();
    const responsePromise = agent.post(this.v1Api(routesV1.cart.fetch));

    if (setCookie) {
      responsePromise.set('Cookie', setCookie);
    }
    const response = await responsePromise;
    // console.log('response::', response);
    // const cookie = authResponse.get('Set-Cookie');

    // We need to set this in subsequent requests
    // const cookies = response.headers['set-cookie'];
    // parse cookie with id=cart
    // const cartCookie = cookies[0].split(';')[0];
    // console.log('cartCookie::', cartCookie);
    //

    const { value, setCookies } = this.extractCartCookie(response);
    return { value, setCookies };
    // console.log('cookies::', cookies);
  }

  async addItemToCart(
    productId: string,
    quantity: number,
    // Received from fetchCart or previous cart requests
    setCookie: string,
  ): Promise<CartCookie> {
    const route = this.v1Api(routesV1.cart.addLineItem);
    const response = await getHttpServer()
      .post(route)
      .set('Cookie', setCookie)
      .send({ productId, quantity });
    if (response.status !== 200 && response.status !== 201) {
      return response.body;
    }
    const { value, setCookies } = this.extractCartCookie(response);
    // console.log('cartCookie::', cartCookie);
    console.log('addItemCookies::', value);
    return { value, setCookies };
  }

  private extractCartCookie(response: any): CartCookie {
    const setCookies = response.headers['set-cookie'];
    console.log('setCookies::', setCookies);

    const cookies = extractCookies(response.headers); // or res.header alias
    const decodedCartCookieValue = decodeURIComponent(cookies.cart.value);
    const parsedCartCookieValue = JSON.parse(decodedCartCookieValue);
    return {
      value: parsedCartCookieValue,
      setCookies,
    };
  }
}

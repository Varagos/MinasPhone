import { IProductsService, Price, Product } from '../index';
import { DataProvider } from '../../httpClient';
// {
//     "id": "9329960b-e9eb-4e81-a8b2-cbb4d40bf477",
//     "active": true,
//     "slug": "prod_qyZp7GSFsr",
//     "name": "Iphone 12 brrr",
//     "description": "lalalal",
//     "quantity": 11,
//     "mediaFileName": "http://localhost:8080/1671962999142--iphone11.jpeg",
//     "sku": "1",
//     "price": 550,
//     "categoryId": "f5404118-a0c6-44ca-bbc2-57e45be477f1"
// }
type ProductDTO = {
  id: string;
  active: boolean;
  slug: string;
  name: string;
  description: string;
  quantity: number;
  mediaFileName: string;
  sku: string;
  price: number;
  categoryId: string;
};
const formatPrice = (price: number) => {
  return Number(price).toFixed(2);
};

export const rawPriceToFormatted = (price: number): Price => {
  const formattedPrice = formatPrice(price);
  return {
    raw: price,
    formatted: formattedPrice,
    formatted_with_symbol: `${formattedPrice} €`,
    formatted_with_code: `${formattedPrice} EUR`,
  };
};
class ProductMapper {
  static mapToProduct = (product: ProductDTO): Product => {
    const result: Partial<Product> = {
      id: product.id,
      active: product.active,
      // slug: product.slug,
      name: product.name,
      description: product.description,
      inventory: {
        managed: true,
        available: product.quantity,
      },
      media: {
        type: 'image',
        source: product.mediaFileName,
      },
      sku: product.sku,
      price: rawPriceToFormatted(product.price),
      categories: [
        {
          id: product.categoryId,
          slug: 'test',
          name: 'test',
        },
      ],
    };
    return result as Product;
  };
}

class ProductsService implements IProductsService {
  private dataProvider = new DataProvider<ProductDTO>('products');

  async fetchAll(): Promise<Product[]> {
    const result = await this.dataProvider.getList({
      pagination: {
        page: 1,
        perPage: 100,
      },
      sort: {
        field: 'id',
        order: 'ASC',
      },
      filter: {},
    });
    const { data } = result;
    console.log('fetchAll', data, typeof data[0].price);
    return data.map((x: any) => ProductMapper.mapToProduct(x));
  }

  async fetchAllByCategorySlug(categorySlug: string): Promise<Product[]> {
    const result = await this.dataProvider.getList({
      filter: {
        category_slug: categorySlug,
      },
      pagination: {
        page: 1,
        perPage: 100,
      },
      sort: {
        field: 'id',
        order: 'ASC',
      },
    });
    const { data } = result;
    console.log('fetchAllByCategorySlug', data);
    return data.map((x: any) => ProductMapper.mapToProduct(x));
  }

  async fetchItemById(productId: string): Promise<Product> {
    throw new Error('Method not implemented.');
  }
}

export default ProductsService;

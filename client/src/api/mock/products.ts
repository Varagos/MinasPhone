import {
  Product,
  IProductsApi,
  ProductPaginatedResponse,
  ProductRequest,
} from '../types/types';
import { v4 as uuidv4 } from 'uuid';

// TODO add setTimeout to simulate network latency
export class ProductsApi implements IProductsApi {
  findMany(params: ProductRequest): Promise<ProductPaginatedResponse> {
    throw new Error('Method not implemented.');
  }
  findManyByCategorySlug(params: {
    limit: number;
    page: number;
    slug: string;
  }): Promise<ProductPaginatedResponse> {
    throw new Error('Method not implemented.');
  }
  findOneById(id: string): Promise<Product> {
    throw new Error('Method not implemented.');
  }
  private data: Product[] = [
    {
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      slug: 'iphone-13',
      name: 'iPhone 13',
      description: 'The latest iPhone model with advanced features.',
      price: 1299,
      quantity: 10,
      active: true,
      imageUrl: 'https://example.com/iphone-13.jpg',
      categoryId: '1',
    },
    {
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      slug: 'galaxy-s21',
      name: 'Galaxy S21',
      description: 'Powerful Android smartphone with stunning display.',
      price: 1099,
      quantity: 8,
      active: true,
      imageUrl: 'https://example.com/galaxy-s21.jpg',
      categoryId: '1',
    },
    {
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      slug: 'apple-watch-6',
      name: 'Apple Watch Series 6',
      description: 'Advanced smartwatch with health and fitness features.',
      price: 399,
      quantity: 15,
      active: true,
      imageUrl: 'https://example.com/apple-watch-6.jpg',
      categoryId: '2',
    },
    {
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      slug: 'ipad-pro',
      name: 'iPad Pro',
      description: 'Powerful tablet for productivity and creativity.',
      price: 799,
      quantity: 5,
      active: true,
      imageUrl: 'https://example.com/ipad-pro.jpg',
      categoryId: '3',
    },
    {
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      slug: 'headphones',
      name: 'Wireless Headphones',
      description: 'High-quality headphones for immersive audio experience.',
      price: 149,
      quantity: 20,
      active: true,
      imageUrl: 'https://example.com/headphones.jpg',
      categoryId: '4',
    },
  ];

  useProducts() {
    return {
      products: {
        count: 2,
        limit: 10,
        page: 1,
        data: this.data,
      },
      isLoading: false,
      isError: false,
    };
  }

  useProduct(id: string) {
    const data = this.data.find((category) => category.id === id);
    if (!data) throw new Error(`Category with id ${id} not found`);

    return {
      product: data,
      isLoading: false,
      isError: false,
    };
  }
}

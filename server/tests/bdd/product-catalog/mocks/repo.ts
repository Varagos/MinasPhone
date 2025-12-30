// productRepositoryMock.ts

import { ProductRepositoryPort } from '@modules/product-catalog/domain/ports/product.repository.port';
import { MOCK_IPHONE_13_PRODUCT } from './product-data';
import { AttributeRepositoryPort } from '@modules/product-catalog/domain/ports/attribute.repository.port';

// Cast the mock function to align with the expected signature
const transactionMock: any = async <T>(cb: () => Promise<T>) => {
  console.log('transaction');
  const result = await cb();
  return Promise.resolve(result);
};

export const getMockedProductRepository =
  (): jest.Mocked<ProductRepositoryPort> => {
    return {
      insert: jest.fn((_p: any) => {
        console.log('insert');
        return Promise.resolve();
      }),
      findOneById: jest
        .fn()
        .mockReturnValue(Promise.resolve(MOCK_IPHONE_13_PRODUCT)),
      findAll: jest
        .fn()
        .mockReturnValue(Promise.resolve([MOCK_IPHONE_13_PRODUCT])),
      findAllPaginated: jest.fn(),
      delete: jest.fn(),
      update: jest.fn(),
      findBySlug: jest.fn(),
      findByCategoryId: jest.fn(),
      findManyByIds: jest.fn(),
      updateMany: jest.fn(),

      //   transaction<T>(handler: () => Promise<T>): Promise<T>;
      transaction: transactionMock,
    };
  };

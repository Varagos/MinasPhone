import { defineFeature, loadFeature } from 'jest-cucumber';
import { CreateProductCommand } from '@modules/product-catalog/application/products/commands/create-product/create-product.command';
import { CreateProductCommandHandler } from '@modules/product-catalog/application/products/commands/create-product/create-product.handler';
import { getMockedProductRepository } from '../mocks/repo';
import { resolve } from 'path';
import { mock } from 'jest-mock-extended';
import { ProductTypeRepositoryPort } from '@modules/product-catalog/domain/ports/product-type.repository.port';
import { AttributeRepositoryPort } from '@modules/product-catalog/domain/ports/attribute.repository.port';

const feature = loadFeature(resolve(__dirname, 'create-product.feature'));

defineFeature(feature, (test) => {
  let productData = null;
  const mockCreateProductRepository = getMockedProductRepository();

  const mockProductTypeRepository = mock<ProductTypeRepositoryPort>();
  const mockAttributeRepository = mock<AttributeRepositoryPort>();
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('I can create a product', ({ given, when, then }) => {
    let command: CreateProductCommand;
    given('product data', (table) => {
      console.log(table); // Add this line

      // Convert the table to a JSON object
      productData = table[0];
      const {
        name,
        description,
        price,
        quantity,
        active,
        image_uri,
        sku,
        category_id,
        product_type_id,
      } = productData;

      command = new CreateProductCommand({
        name,
        description,
        price: parseFloat(price), // convert string to number
        quantity: parseFloat(quantity),
        active: active === 'true',
        imageUri: image_uri,
        sku,
        categoryId: category_id,
        productTypeId: undefined,
        attributeValues: {},
      });
    });

    when('I send a request to create a product', async () => {
      // Call the method to create a product and set the product ID
      const handler = new CreateProductCommandHandler(
        mockCreateProductRepository,
        mockProductTypeRepository,
        mockAttributeRepository,
      );

      const result = await handler.execute(command);
      console.log('result');
    });

    then('The product is created', () => {
      // Check that we received a product ID
      // expect(mockCreateProductRepository.transaction).toHaveBeenCalled();
      expect(mockCreateProductRepository.insert).toHaveBeenCalled();
    });
  });

  //   test('I try to create a product with invalid data', ({
  //     given,
  //     when,
  //     then,
  //   }) => {
  //     given('product data', (table) => {
  //       productData = table.hashes()[0];
  //     });

  //     when('I send a request to create a product', () => {
  //       // Here, you would simulate sending invalid data to create a product
  //       // For this example, let's assume the repository method returns null for invalid data
  //       mockCreateProductRepository.insert.mockReturnValue(null);
  //       createdProductId = null;
  //     });

  //     then(
  //       /^I receive an error "(.*)" with status code (\d+)$/,
  //       (errorMessage, statusCode) => {
  //         expect(createdProductId).toBe(null);
  //         // Simulate receiving an error message and a status code
  //         // Replace these expectations with actual error handling logic
  //         expect(errorMessage).toBe('Bad Request');
  //         expect(statusCode).toBe('400');
  //       },
  //     );
  //   });
});

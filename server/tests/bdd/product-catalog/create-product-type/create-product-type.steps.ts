import { defineFeature, loadFeature } from 'jest-cucumber';
import { CreateProductTypeCommand } from '@modules/product-catalog/application/product-types/commands/create-product-type/create-product-type.command';
import { CreateProductTypeCommandHandler } from '@modules/product-catalog/application/product-types/commands/create-product-type/create-product-type.handler';
import { resolve } from 'path';
import { mock, mockReset } from 'jest-mock-extended';
import { ProductTypeRepositoryPort } from '@modules/product-catalog/domain/ports/product-type.repository.port';

// Mock RequestContextService for tests
jest.mock('@libs/application/context/AppRequestContext', () => ({
  RequestContextService: {
    getContext: jest.fn().mockReturnValue({ requestId: 'test-request-id' }),
    setRequestId: jest.fn(),
    getRequestId: jest.fn().mockReturnValue('test-request-id'),
    getTransactionConnection: jest.fn(),
    setTransactionConnection: jest.fn(),
    cleanTransactionConnection: jest.fn(),
  },
}));

const feature = loadFeature(resolve(__dirname, 'create-product-type.feature'));

defineFeature(feature, (test) => {
  let productTypeDetails: any = {};
  let attributes: any[] = [];
  let command: CreateProductTypeCommand;
  let result: any;
  const mockProductTypeRepository = mock<ProductTypeRepositoryPort>();

  beforeEach(() => {
    mockReset(mockProductTypeRepository);
    productTypeDetails = {};
    attributes = [];
    result = null;
    (mockProductTypeRepository.transaction as any).mockImplementation(
      async (handler: any) => {
        return await handler();
      },
    );
  });

  const whenCreateProductType = (when: any) => {
    when(
      /^I create a product type with name "(.*)" and isFilterable "(.*)"$/,
      (name: string, isFilterable: string) => {
        // We ignore isFilterable argument as it is removed from domain
        productTypeDetails = {
          name,
        };
        // Reset attributes for new command
        attributes = [];
        command = new CreateProductTypeCommand({
            name: productTypeDetails.name,
            attributes: [],
        });
      },
    );
  };

   const whenCreateProductTypeAsync = (when: any) => {
    when(
      /^I create a product type with name "(.*)" and isFilterable "(.*)"$/,
      async (name: string, isFilterable: string) => {
        productTypeDetails = {
          name,
        };
        // Reset attributes
        attributes = [];
        command = new CreateProductTypeCommand({
            name: productTypeDetails.name,
            attributes: [],
        });
        const handler = new CreateProductTypeCommandHandler(
            mockProductTypeRepository,
        );
        result = await handler.execute(command);
      },
    );
  };

  test('Create a simple product type', ({ when, then, and }) => {
    whenCreateProductType(when);

    then('the product type should be created successfully', async () => {
      const handler = new CreateProductTypeCommandHandler(
        mockProductTypeRepository,
      );
      await handler.execute(command);
      expect(mockProductTypeRepository.insert).toHaveBeenCalledWith(
        expect.objectContaining({ name: productTypeDetails.name }),
      );
    });

    and(/^the product type should have name "(.*)"$/, (name) => {
      expect(command.name).toBe(name);
    });

    and('the product type should be filterable', () => {
       // Step kept for feature file compatibility but logic removed as property is gone
    });
  });

    test('Create a product type with attributes', ({ when, and, then }) => {
    whenCreateProductType(when);

    and('the product type has the following attributes:', (table) => {
        attributes = table.map((row: any) => ({
            attributeId: row.attributeId,
            config: {
                isRequired: row.isRequired === 'true',
                isFilterable: row.isFilterable === 'true',
                isSearchable: row.isSearchable === 'true',
                displayOrder: parseInt(row.displayOrder, 10),
            },
        }));
    });

    then('the product type should be created successfully', async () => {
        command = new CreateProductTypeCommand({
            ...productTypeDetails,
            attributes,
        });
        const handler = new CreateProductTypeCommandHandler(
            mockProductTypeRepository,
        );
        await handler.execute(command);
        expect(mockProductTypeRepository.insert).toHaveBeenCalled();
    });

    and(/^the product type should have (\d+) attributes$/, (count) => {
        expect(command.attributes).toHaveLength(Number(count));
    });
  });

  test('Cannot create product type with empty name', ({ when, then, and }) => {
    whenCreateProductTypeAsync(when);

    then('the product type creation should fail', () => {
      expect(result.isErr()).toBe(true);
    });

    and(/^the error should be "(.*)"$/, (expectedError) => {
       if (result.isErr()) {
        expect(result.unwrapErr().message).toContain(expectedError);
      }
    });
  });

  test('Cannot create product type with whitespace-only name', ({ when, then, and }) => {
    whenCreateProductTypeAsync(when);

    then('the product type creation should fail', () => {
      expect(result.isErr()).toBe(true);
    });

    and(/^the error should be "(.*)"$/, (expectedError) => {
       if (result.isErr()) {
        expect(result.unwrapErr().message).toContain(expectedError);
      }
    });
  });

  test('Create product type with very long name', ({ when, then, and }) => {
    whenCreateProductTypeAsync(when);

    then('the product type creation should fail', () => {
      expect(result.isErr()).toBe(true);
    });

    and(/^the error should be "(.*)"$/, (expectedError) => {
       if (result.isErr()) {
        expect(result.unwrapErr().message).toContain(expectedError);
      }
    });
  });
});

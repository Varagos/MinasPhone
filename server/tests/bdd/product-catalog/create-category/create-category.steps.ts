// tests/bdd/product-catalog/create-category/create-category.steps.ts
import { defineFeature, loadFeature } from 'jest-cucumber';
import { CreateCategoryCommand } from '@modules/product-catalog/application/categories/commands/create-category/create-category.command';
import { CreateCategoryCommandHandler } from '@modules/product-catalog/application/categories/commands/create-category/create-category.handler';
import { CategoryRepositoryPort } from '@modules/product-catalog/domain/ports/category.repository.port';
import { CategoryEntity } from '@modules/product-catalog/domain/category.entity';
import { Result, Ok, Err } from 'oxide.ts';
import { ConflictException } from '@libs/exceptions';
import { CategoryAlreadyExistsError } from '@modules/product-catalog/domain/category.errors';
import { resolve } from 'path';

const feature = loadFeature(resolve(__dirname, 'create-category.feature'));

// Mock the repository
const mockCategoryRepo: jest.Mocked<CategoryRepositoryPort> = {
  insert: jest.fn(),
  findOneBySlug: jest.fn(),
  // Add other required methods from RepositoryPort with mock implementations
  findOneById: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  findAll: jest.fn(),
  findAllPaginated: jest.fn(),
  transaction: jest.fn(async (handler) => handler() as Promise<any>),
};

defineFeature(feature, (test) => {
  let handler: CreateCategoryCommandHandler;
  let result: Result<string, Error>;
  let command: CreateCategoryCommand;

  beforeEach(() => {
    jest.clearAllMocks();
    handler = new CreateCategoryCommandHandler(mockCategoryRepo);
  });

  test('Successfully create a top-level category', ({ given, when, then }) => {
    given('I have valid category data', (table) => {
      const data = table[0];
      command = new CreateCategoryCommand(
        data.slug,
        data.name,
        data.parentId === 'null' ? null : data.parentId,
      );

      // Mock the repository to return null (no existing category)
      mockCategoryRepo.findOneBySlug.mockResolvedValueOnce(null);
      // Mock successful insertion
    });

    when('I create the category', async () => {
      result = await handler.execute(command);
    });

    then('the category should be created successfully', () => {
      expect(mockCategoryRepo.transaction).toHaveBeenCalled();
      expect(mockCategoryRepo.insert).toHaveBeenCalledWith(
        expect.objectContaining({
          props: {
            slug: command.slug,
            name: command.name,
            parentId: command.parentId,
          },
        }),
      );

      expect(result.isOk()).toBe(true);
      expect(result.unwrap()).toBeDefined();
    });
  });
});

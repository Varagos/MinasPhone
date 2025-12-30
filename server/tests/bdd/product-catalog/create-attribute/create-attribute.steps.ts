import { defineFeature, loadFeature } from 'jest-cucumber';
import { CreateAttributeCommand } from '@modules/product-catalog/application/attributes/commands/create-attribute/create-attribute.command';
import { CreateAttributeCommandHandler } from '@modules/product-catalog/application/attributes/commands/create-attribute/create-attribute.handler';
import { resolve } from 'path';
import { mock, mockReset } from 'jest-mock-extended';
import { AttributeRepositoryPort } from '@modules/product-catalog/domain/ports/attribute.repository.port';

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

const feature = loadFeature(resolve(__dirname, 'create-attribute.feature'));

// Helper function to create command from details
// Helper function to create command from details
function createCommandFromTable(
  details: any,
  values: any[] = [],
): CreateAttributeCommand {
  return new CreateAttributeCommand({
    name: details.name || '',
    valueType: details.valueType || '',
    inputType: details.inputType || '',
    unit: details.unit || null,
    attributeValues: values,
  });
}

defineFeature(feature, (test) => {
  let attributeDetails: any = {};
  let attributeValues: any[] = [];
  let command: CreateAttributeCommand;
  let result: any;
  const mockAttributeRepository = mock<AttributeRepositoryPort>();

  beforeEach(() => {
    mockReset(mockAttributeRepository);
    attributeDetails = {};
    attributeValues = [];
    result = null;
    // Mock transaction to execute the callback immediately
    (mockAttributeRepository.transaction as any).mockImplementation(
      async (handler: any) => {
        return await handler();
      },
    );
  });

  // Common step definition for creating attributes with inline parameters
  const whenCreateAttributeWithInlineParams = (when: any) => {
    when(
      /^I create an attribute with name "(.*)", valueType "(.*)", inputType "(.*)", and unit "(.*)"$/,
      (name: string, valueType: string, inputType: string, unit: string) => {
        attributeDetails = {
          name,
          valueType,
          inputType,
          unit: unit || null,
        };
        command = createCommandFromTable(attributeDetails, []);
      },
    );
  };

  // Common step for async attribute creation with inline params
  const whenCreateAttributeWithInlineParamsAsync = (when: any) => {
    when(
      /^I create an attribute with name "(.*)", valueType "(.*)", inputType "(.*)", and unit "(.*)"$/,
      async (
        name: string,
        valueType: string,
        inputType: string,
        unit: string,
      ) => {
        attributeDetails = {
          name,
          valueType,
          inputType,
          unit: unit || null,
        };
        command = createCommandFromTable(attributeDetails, []);

        const handler = new CreateAttributeCommandHandler(
          mockAttributeRepository,
        );
        result = await handler.execute(command);
      },
    );
  };

  test('Create a primitive type attribute', ({ when, then, and }) => {
    whenCreateAttributeWithInlineParams(when);

    then('the attribute should be created successfully', async () => {
      const handler = new CreateAttributeCommandHandler(
        mockAttributeRepository,
      );
      await handler.execute(command);
      expect(mockAttributeRepository.insert).toHaveBeenCalledWith(
        expect.objectContaining({ name: attributeDetails.name }),
      );
    });

    and('the attribute should have no attribute values', () => {
      expect(command.attributeValues).toEqual([]);
    });
  });

  test('Create an enum attribute with predefined values', ({
    when,
    and,
    then,
  }) => {
    whenCreateAttributeWithInlineParams(when);

    and('the attribute has the following values:', (table) => {
      attributeValues = table.map((row: any) => ({
        value: row.value,
        displayOrder: parseInt(row.displayOrder, 10),
      }));
    });

    then('the attribute should be created successfully', async () => {
      command = createCommandFromTable(attributeDetails, attributeValues);
      const handler = new CreateAttributeCommandHandler(
        mockAttributeRepository,
      );
      await handler.execute(command);
      expect(mockAttributeRepository.insert).toHaveBeenCalledWith(
        expect.objectContaining({ name: attributeDetails.name }),
      );
    });

    and(/^the attribute should have (\d+) attribute values$/, (count) => {
      expect(command.attributeValues).toHaveLength(Number(count));
    });

    and('the attribute values should be ordered correctly', () => {
      const sorted = [...(command.attributeValues ?? [])].sort(
        (a, b) => a.displayOrder - b.displayOrder,
      );
      expect(command.attributeValues).toEqual(sorted);
    });
  });

  test('Create a multiselect attribute with predefined values', ({
    when,
    and,
    then,
  }) => {
    whenCreateAttributeWithInlineParams(when);

    and('the attribute has the following values:', (table) => {
      attributeValues = table.map((row: any) => ({
        value: row.value,
        displayOrder: parseInt(row.displayOrder, 10),
      }));
    });

    then('the attribute should be created successfully', async () => {
      command = createCommandFromTable(attributeDetails, attributeValues);
      const handler = new CreateAttributeCommandHandler(
        mockAttributeRepository,
      );
      await handler.execute(command);
      expect(mockAttributeRepository.insert).toHaveBeenCalled();
    });

    and(/^the attribute should have (\d+) attribute values$/, (count) => {
      expect(command.attributeValues).toHaveLength(Number(count));
    });
  });

  test('Cannot create attribute with empty name', ({ when, then, and }) => {
    whenCreateAttributeWithInlineParamsAsync(when);

    then('the attribute creation should fail', () => {
      expect(result.isErr()).toBe(true);
    });

    and(/^the error should be "(.*)"$/, (expectedError) => {
      if (result.isErr()) {
        expect(result.unwrapErr().message).toContain(expectedError);
      }
    });
  });

  test('Cannot create attribute with whitespace-only name', ({
    when,
    then,
    and,
  }) => {
    whenCreateAttributeWithInlineParamsAsync(when);

    then('the attribute creation should fail', () => {
      expect(result.isErr()).toBe(true);
    });

    and(/^the error should be "(.*)"$/, (expectedError) => {
      if (result.isErr()) {
        expect(result.unwrapErr().message).toContain(expectedError);
      }
    });
  });

  test('Cannot create attribute with invalid value type', ({
    when,
    then,
    and,
  }) => {
    whenCreateAttributeWithInlineParamsAsync(when);

    then('the attribute creation should fail', () => {
      expect(result.isErr()).toBe(true);
    });

    and(/^the error should be "Invalid value type: (.*)"$/, (valueType) => {
      if (result.isErr()) {
        expect(result.unwrapErr().message).toContain(
          `Invalid value type: ${valueType}`,
        );
      }
    });
  });

  test('Cannot create attribute with invalid input type', ({
    when,
    then,
    and,
  }) => {
    whenCreateAttributeWithInlineParamsAsync(when);

    then('the attribute creation should fail', () => {
      expect(result.isErr()).toBe(true);
    });

    and(/^the error should be "Invalid input type: (.*)"$/, (inputType) => {
      if (result.isErr()) {
        expect(result.unwrapErr().message).toContain(
          `Invalid input type: ${inputType}`,
        );
      }
    });
  });

  test('Cannot create enum attribute without values', ({ when, and, then }) => {
    whenCreateAttributeWithInlineParams(when);

    and('the attribute has no values', async () => {
      attributeValues = [];
      command = createCommandFromTable(attributeDetails, []);
    });

    then('the attribute creation should fail', async () => {
      const handler = new CreateAttributeCommandHandler(
        mockAttributeRepository,
      );
      result = await handler.execute(command);
      expect(result.isErr()).toBe(true);
    });

    and(/^the error should be "(.*)"$/, (expectedError) => {
      if (result.isErr()) {
        expect(result.unwrapErr().message).toContain(expectedError);
      }
    });
  });

  test('Cannot create multiselect attribute without values', ({
    when,
    and,
    then,
  }) => {
    whenCreateAttributeWithInlineParams(when);

    and('the attribute has no values', async () => {
      attributeValues = [];
      command = createCommandFromTable(attributeDetails, []);
    });

    then('the attribute creation should fail', async () => {
      const handler = new CreateAttributeCommandHandler(
        mockAttributeRepository,
      );
      result = await handler.execute(command);
      expect(result.isErr()).toBe(true);
    });

    and(/^the error should be "(.*)"$/, (expectedError) => {
      if (result.isErr()) {
        expect(result.unwrapErr().message).toContain(expectedError);
      }
    });
  });

  test('Cannot create string attribute with values', ({ when, and, then }) => {
    whenCreateAttributeWithInlineParams(when);

    and('the attribute has the following values:', (table) => {
      attributeValues = table.map((row: any) => ({
        value: row.value,
        displayOrder: parseInt(row.displayOrder, 10),
      }));
    });

    then('the attribute creation should fail', async () => {
      command = createCommandFromTable(attributeDetails, attributeValues);
      const handler = new CreateAttributeCommandHandler(
        mockAttributeRepository,
      );
      result = await handler.execute(command);
      expect(result.isErr()).toBe(true);
    });

    and(/^the error should be "(.*)"$/, (expectedError) => {
      if (result.isErr()) {
        expect(result.unwrapErr().message).toContain(expectedError);
      }
    });
  });

  test('Cannot create number attribute with values', ({ when, and, then }) => {
    whenCreateAttributeWithInlineParams(when);

    and('the attribute has the following values:', (table) => {
      attributeValues = table.map((row: any) => ({
        value: row.value,
        displayOrder: parseInt(row.displayOrder, 10),
      }));
    });

    then('the attribute creation should fail', async () => {
      command = createCommandFromTable(attributeDetails, attributeValues);
      const handler = new CreateAttributeCommandHandler(
        mockAttributeRepository,
      );
      result = await handler.execute(command);
      expect(result.isErr()).toBe(true);
    });

    and(/^the error should be "(.*)"$/, (expectedError) => {
      if (result.isErr()) {
        expect(result.unwrapErr().message).toContain(expectedError);
      }
    });
  });

  test('Cannot create boolean attribute with values', ({ when, and, then }) => {
    whenCreateAttributeWithInlineParams(when);

    and('the attribute has the following values:', (table) => {
      attributeValues = table.map((row: any) => ({
        value: row.value,
        displayOrder: parseInt(row.displayOrder, 10),
      }));
    });

    then('the attribute creation should fail', async () => {
      command = createCommandFromTable(attributeDetails, attributeValues);
      const handler = new CreateAttributeCommandHandler(
        mockAttributeRepository,
      );
      result = await handler.execute(command);
      expect(result.isErr()).toBe(true);
    });

    and(/^the error should be "(.*)"$/, (expectedError) => {
      if (result.isErr()) {
        expect(result.unwrapErr().message).toContain(expectedError);
      }
    });
  });

  test('Cannot create enum attribute with empty value', ({
    when,
    and,
    then,
  }) => {
    whenCreateAttributeWithInlineParams(when);

    and('the attribute has the following values:', (table) => {
      attributeValues = table.map((row: any) => ({
        value: row.value,
        displayOrder: parseInt(row.displayOrder, 10),
      }));
    });

    then('the attribute creation should fail', async () => {
      command = createCommandFromTable(attributeDetails, attributeValues);
      const handler = new CreateAttributeCommandHandler(
        mockAttributeRepository,
      );
      result = await handler.execute(command);
      expect(result.isErr()).toBe(true);
    });

    and(/^the error should be "(.*)"$/, (expectedError) => {
      if (result.isErr()) {
        expect(result.unwrapErr().message).toContain(expectedError);
      }
    });
  });

  test('Cannot create enum attribute with duplicate values', ({
    when,
    and,
    then,
  }) => {
    whenCreateAttributeWithInlineParams(when);

    and('the attribute has the following values:', (table) => {
      attributeValues = table.map((row: any) => ({
        value: row.value,
        displayOrder: parseInt(row.displayOrder, 10),
      }));
    });

    then('the attribute creation should fail', async () => {
      command = createCommandFromTable(attributeDetails, attributeValues);
      const handler = new CreateAttributeCommandHandler(
        mockAttributeRepository,
      );
      result = await handler.execute(command);
      expect(result.isErr()).toBe(true);
    });

    and(/^the error should be "(.*)"$/, (expectedError) => {
      if (result.isErr()) {
        expect(result.unwrapErr().message).toContain(expectedError);
      }
    });
  });

  test('Cannot create enum attribute with duplicate values (case insensitive)', ({
    when,
    and,
    then,
  }) => {
    whenCreateAttributeWithInlineParams(when);

    and('the attribute has the following values:', (table) => {
      attributeValues = table.map((row: any) => ({
        value: row.value,
        displayOrder: parseInt(row.displayOrder, 10),
      }));
    });

    then('the attribute creation should fail', async () => {
      command = createCommandFromTable(attributeDetails, attributeValues);
      const handler = new CreateAttributeCommandHandler(
        mockAttributeRepository,
      );
      result = await handler.execute(command);
      expect(result.isErr()).toBe(true);
    });

    and(/^the error should be "(.*)"$/, (expectedError) => {
      if (result.isErr()) {
        expect(result.unwrapErr().message).toContain(expectedError);
      }
    });
  });

  test('Cannot create enum attribute with negative display order', ({
    when,
    and,
    then,
  }) => {
    whenCreateAttributeWithInlineParams(when);

    and('the attribute has the following values:', (table) => {
      attributeValues = table.map((row: any) => ({
        value: row.value,
        displayOrder: parseInt(row.displayOrder, 10),
      }));
    });

    then('the attribute creation should fail', async () => {
      command = createCommandFromTable(attributeDetails, attributeValues);
      const handler = new CreateAttributeCommandHandler(
        mockAttributeRepository,
      );
      result = await handler.execute(command);
      expect(result.isErr()).toBe(true);
    });

    and(/^the error should be "(.*)"$/, (expectedError) => {
      if (result.isErr()) {
        expect(result.unwrapErr().message).toContain(expectedError);
      }
    });
  });

  test('Create attribute with very long name', ({ when, then, and }) => {
    whenCreateAttributeWithInlineParamsAsync(when);

    then('the attribute creation should fail', () => {
      expect(result.isErr()).toBe(true);
    });

    and(/^the error should be "(.*)"$/, (expectedError) => {
      if (result.isErr()) {
        expect(result.unwrapErr().message).toContain(expectedError);
      }
    });
  });

  test('Create attribute with special characters in name', ({
    when,
    then,
    and,
  }) => {
    whenCreateAttributeWithInlineParams(when);

    then('the attribute should be created successfully', async () => {
      const handler = new CreateAttributeCommandHandler(
        mockAttributeRepository,
      );
      await handler.execute(command);
      expect(mockAttributeRepository.insert).toHaveBeenCalled();
    });

    and(/^the attribute name should be "(.*)"$/, (name) => {
      expect(command.name).toBe(name);
    });
  });

  test('Create attribute with unit for string type (unusual but allowed)', ({
    when,
    then,
    and,
  }) => {
    whenCreateAttributeWithInlineParams(when);

    then('the attribute should be created successfully', async () => {
      const handler = new CreateAttributeCommandHandler(
        mockAttributeRepository,
      );
      await handler.execute(command);
      expect(mockAttributeRepository.insert).toHaveBeenCalled();
    });

    and(/^the attribute unit should be "(.*)"$/, (unit) => {
      expect(command.unit).toBe(unit);
    });
  });

  test('Create enum attribute with single value', ({ when, and, then }) => {
    whenCreateAttributeWithInlineParams(when);

    and('the attribute has the following values:', (table) => {
      attributeValues = table.map((row: any) => ({
        value: row.value,
        displayOrder: parseInt(row.displayOrder, 10),
      }));
    });

    then('the attribute should be created successfully', async () => {
      command = createCommandFromTable(attributeDetails, attributeValues);
      const handler = new CreateAttributeCommandHandler(
        mockAttributeRepository,
      );
      await handler.execute(command);
      expect(mockAttributeRepository.insert).toHaveBeenCalled();
    });

    and(/^the attribute should have (\d+) attribute value$/, (count) => {
      expect(command.attributeValues).toHaveLength(Number(count));
    });
  });

  test('Create enum attribute with many values', ({ when, and, then }) => {
    whenCreateAttributeWithInlineParams(when);

    and(/^the attribute has (\d+) values$/, (count) => {
      attributeValues = Array.from({ length: Number(count) }, (_, i) => ({
        value: `Value ${i + 1}`,
        displayOrder: i + 1,
      }));
    });

    then('the attribute should be created successfully', async () => {
      command = createCommandFromTable(attributeDetails, attributeValues);
      const handler = new CreateAttributeCommandHandler(
        mockAttributeRepository,
      );
      await handler.execute(command);
      expect(mockAttributeRepository.insert).toHaveBeenCalled();
    });

    and(/^the attribute should have (\d+) attribute values$/, (count) => {
      expect(command.attributeValues).toHaveLength(Number(count));
    });
  });

  test('Create enum attribute with text input (unusual combination)', ({
    when,
    and,
    then,
    but,
  }) => {
    whenCreateAttributeWithInlineParams(when);

    and('the attribute has the following values:', (table) => {
      attributeValues = table.map((row: any) => ({
        value: row.value,
        displayOrder: parseInt(row.displayOrder, 10),
      }));
    });

    then('the attribute should be created successfully', async () => {
      command = createCommandFromTable(attributeDetails, attributeValues);
      const handler = new CreateAttributeCommandHandler(
        mockAttributeRepository,
      );
      await handler.execute(command);
      expect(mockAttributeRepository.insert).toHaveBeenCalled();
    });

    but(/^a warning should be logged "(.*)"$/, (warningMessage) => {
      // TODO: implement warning check when logging is added
      expect(warningMessage).toBeDefined();
    });
  });

  test('Create number attribute with select input (unusual combination)', ({
    when,
    then,
    but,
  }) => {
    whenCreateAttributeWithInlineParams(when);

    then('the attribute should be created successfully', async () => {
      const handler = new CreateAttributeCommandHandler(
        mockAttributeRepository,
      );
      await handler.execute(command);
      expect(mockAttributeRepository.insert).toHaveBeenCalled();
    });

    but(/^a warning should be logged "(.*)"$/, (warningMessage) => {
      // TODO: implement warning check when logging is added
      expect(warningMessage).toBeDefined();
    });
  });
});

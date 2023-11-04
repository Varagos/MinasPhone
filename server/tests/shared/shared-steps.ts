import { ApiErrorResponse } from '@libs/api/api-error.response';
import { TestContext } from '@tests/test-utils/TestContext';
import { DefineStepFunction } from 'jest-cucumber';

/**
 * Test steps that can be shared between all tests
 */

export const iReceiveAnErrorWithStatusCode = <T>(
  then: DefineStepFunction,
  ctx: TestContext<T>,
): void => {
  then(
    /^I receive an error "(.*)" with status code (\d+)$/,
    async (errorMessage: string, statusCode: string) => {
      const apiError = ctx.latestResponse as ApiErrorResponse;
      expect(apiError.statusCode).toBe(parseInt(statusCode));
      expect(apiError.error).toBe(errorMessage);
    },
  );
};

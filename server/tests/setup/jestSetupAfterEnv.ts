import { Test, TestingModuleBuilder, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { createPool, DatabasePool } from 'slonik';
import * as request from 'supertest';
import { postgresConnectionUri } from '@config/database.config';
import { ValidationPipe } from '@nestjs/common';
import {
  AuthGuard,
  RolesGuard,
} from '@modules/user-management/user-management.module';
import { MockAuthGuard, MockRolesGuard } from './guards';

// Setting up test server and utilities

export class TestServer {
  constructor(
    public readonly serverApplication: NestExpressApplication,
    public readonly testingModule: TestingModule,
  ) {}

  public static async new(
    testingModuleBuilder: TestingModuleBuilder,
  ): Promise<TestServer> {
    const testingModule: TestingModule = await testingModuleBuilder.compile();

    const app: NestExpressApplication = testingModule.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({ transform: true, whitelist: true }),
    );

    app.enableShutdownHooks();

    await app.init();

    return new TestServer(app, testingModule);
  }
}

let testServer: TestServer;
let pool: DatabasePool;

export async function generateTestingApplication(): Promise<{
  testServer: TestServer;
}> {
  const testingModuleBuilder = Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideGuard(AuthGuard) // Override AuthGuard with the mock
    .useClass(MockAuthGuard)
    .overrideGuard(RolesGuard) // Override RolesGuard with the mock
    .useClass(MockRolesGuard);

  const testServer = await TestServer.new(testingModuleBuilder);

  return {
    testServer,
  };
}

export function getTestServer(): TestServer {
  return testServer;
}

export function getConnectionPool(): DatabasePool {
  return pool;
}

export function getHttpServer(): request.SuperTest<request.Test> {
  const testServer = getTestServer();
  const httpServer = request(testServer.serverApplication.getHttpServer());

  return httpServer;
}

// setup
beforeAll(async (): Promise<void> => {
  ({ testServer } = await generateTestingApplication());
  pool = await createPool(postgresConnectionUri);
});

// cleanup
afterAll(async (): Promise<void> => {
  await pool.end();
  testServer.serverApplication.close();
});

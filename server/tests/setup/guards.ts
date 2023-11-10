import { ExecutionContext } from '@nestjs/common';

// Mock AuthGuard
export class MockAuthGuard {
  canActivate(context: ExecutionContext): boolean {
    // Implement your mock logic here
    // For example, always return true to bypass authentication for tests
    return true;
  }
}

// Mock RolesGuard, which extends AuthGuard
export class MockRolesGuard extends MockAuthGuard {
  canActivate(context: ExecutionContext): boolean {
    // Implement your mock logic for role checking
    // You can return true to allow all roles, or implement mock logic as needed
    return true;
  }
}

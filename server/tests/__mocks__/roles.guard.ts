export const RolesGuard = jest.fn().mockImplementation(() => ({
  canActivate: jest.fn(async () => true),
  // other methods and properties can go here if they exist and are used
}));

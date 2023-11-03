import { UserEmail } from './value-objects/userEmail';

// All properties that a User has
export interface UserProps {
  email: UserEmail; // TODO move UserEmail to standard value object
  role: UserRoles;
  firstName?: string; // Convert to name value object(check ddd-types)
  lastName?: string; // Convert to name value object(check ddd-types)
  joinedAt: number; // TODO convert to timestamp value object/date
}

// Properties that are needed for a user creation
export interface CreateUserProps {
  email: UserEmail; // TODO move UserEmail to standard value object
}

// Properties used for updating a user address
export interface UpdateUserAddressProps {
  country?: string;
  postalCode?: string;
  street?: string;
}

export enum UserRoles {
  admin = 'admin',
  customer = 'customer',
}

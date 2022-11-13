import { createUser } from '../useCases/createUser';
import { AfterUserCreated } from './afterUserCreated';

new AfterUserCreated(createUser);

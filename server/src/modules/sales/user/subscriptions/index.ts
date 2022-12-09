import { createUser } from '../useCases/createUser/index.js';
import { AfterUserCreated } from './afterUserCreated.js';

new AfterUserCreated(createUser);

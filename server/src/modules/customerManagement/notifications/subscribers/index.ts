import { sendEmail } from '../use-cases/sendEmail/index.js';
import { AfterOrderCreated } from './AfterOrderCreated.js';

// Subscribers
new AfterOrderCreated(sendEmail);

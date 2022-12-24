import { emailService } from '../../services/index.js';
import { SendEmail } from './SendEmail.js';

export const sendEmail = new SendEmail(emailService);

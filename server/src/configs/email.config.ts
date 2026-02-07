import { get } from 'env-var';
import './dotenv';

export const emailConfig = {
  sendgrid_api_key: get('SENDGRID_API_KEY').required().asString(),
  email_from: get('EMAIL_FROM').required().asString(),
  admin_emails: get('ADMIN_EMAIL').required().asArray(),
};

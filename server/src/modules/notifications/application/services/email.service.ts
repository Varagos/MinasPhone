import { Injectable, Logger } from '@nestjs/common';
import * as sendgrid from '@sendgrid/mail';
import { emailConfig } from '@config/email.config';

export interface EmailOptions {
  to: string;
  subject: string;
  text?: string;
  html: string;
}

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private readonly fromEmail: string;

  constructor() {
    sendgrid.setApiKey(emailConfig.sendgrid_api_key);
    this.fromEmail = emailConfig.email_from;
  }

  async sendEmail(options: EmailOptions): Promise<boolean> {
    try {
      const sendgridResponse = await sendgrid.send({
        to: options.to,
        from: this.fromEmail,
        subject: options.subject,
        text: options.text,
        html: options.html,
      });
      console.log('sendgridResponse', sendgridResponse);
      this.logger.log(`Email sent successfully to ${options.to}`);
      return true;
    } catch (error: any) {
      this.logger.error(`Failed to send email to ${options.to}`, error.stack);
      return false;
    }
  }

  async sendDynamicTemplateEmail(
    to: string,
    from: string,
    templateId: string,
    dynamicTemplateData: Record<string, any>,
  ): Promise<boolean> {
    try {
      const sendgridResponse = await sendgrid.send({
        to,
        from,
        templateId,
        dynamicTemplateData,
      });
      console.log('sendgridResponse', sendgridResponse);
      this.logger.log(`Dynamic template email sent successfully to ${to}`);
      return true;
    } catch (error: any) {
      this.logger.error(
        `Failed to send dynamic template email to ${to}`,
        error.stack,
      );
      return false;
    }
  }
}

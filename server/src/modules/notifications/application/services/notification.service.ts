import { Injectable, Logger } from '@nestjs/common';
import { EmailService } from './email.service';
import { emailConfig } from '@config/email.config';

export interface OrderNotificationData {
  orderId: string;
  lineItems: Array<{
    productId: string;
    quantity: number;
    productName?: string;
    price?: number;
  }>;
  customerEmail?: string;
  customerName?: string;
  totalAmount?: number;
  createdAt: Date;
}

export interface CustomerOrderConfirmationData {
  orderReference: string;
  total: number;
  orderItems: Array<{
    name: string;
    description?: string;
    quantity: number;
    price: string; // total
    imageUrl: string;
  }>;
}

const ORDER_CONFIRMATION_TEMPLATE_ID = 'd-8f5b8cdb109849e2a53dde554d02f417';

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);
  private readonly adminEmails: string[];
  private readonly fromEmail: string;

  constructor(private readonly emailService: EmailService) {
    this.adminEmails = emailConfig.admin_emails;
    this.fromEmail = emailConfig.email_from;
  }

  async sendCustomerOrderConfirmationEmail(
    data: CustomerOrderConfirmationData,
    customerEmail: string,
  ): Promise<boolean> {
    try {
      // Send email to customer
      return await this.emailService.sendDynamicTemplateEmail(
        customerEmail,
        this.fromEmail,
        ORDER_CONFIRMATION_TEMPLATE_ID,
        data,
      );
    } catch (error: any) {
      this.logger.error(
        'Failed to send customer order confirmation email',
        error.stack,
      );
      return false;
    }
  }

  async sendOrderCreatedNotification(
    data: OrderNotificationData,
  ): Promise<boolean> {
    try {
      const subject = `MINAS PHONE: ΝΕΑ ΠΑΡΑΓΓΕΛΙΑ - ID: ${data.orderId}`;

      // Create HTML content for the email
      const html = this.createOrderCreatedEmailTemplate(data);

      let allSuccess = true;
      for (const adminEmail of this.adminEmails) {
        // Send email to admin
        const success = await this.emailService.sendEmail({
          to: adminEmail,
          subject,
          html,
          text: `Νέα παραγγελία με ID: ${data.orderId}. Περιέχει ${data.lineItems.length} αντικείμενα.`,
        });

        if (!success) {
          allSuccess = false;
        }
      }
      return allSuccess;
    } catch (error: any) {
      this.logger.error(
        'Failed to send order created notification',
        error.stack,
      );
      return false;
    }
  }

  private createOrderCreatedEmailTemplate(data: OrderNotificationData): string {
    const itemsList = data.lineItems
      .map((item) => {
        const productName = item.productName || item.productId;
        return `<li>${item.quantity}x ${productName}</li>`;
      })
      .join('');

    const formattedDate = data.createdAt.toLocaleString();

    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>New Order Received</h2>
        <p>A new order has been placed on MinasPhone.</p>

        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <p><strong>Order ID:</strong> ${data.orderId}</p>
          <p><strong>Date:</strong> ${formattedDate}</p>
          ${
            data.customerName
              ? `<p><strong>Customer:</strong> ${data.customerName}</p>`
              : ''
          }
          ${
            data.customerEmail
              ? `<p><strong>Email:</strong> ${data.customerEmail}</p>`
              : ''
          }
          ${
            data.totalAmount
              ? `<p><strong>Total Amount:</strong> €${data.totalAmount.toFixed(
                  2,
                )}</p>`
              : ''
          }
        </div>

        <h3>Order Items:</h3>
        <ul>
          ${itemsList}
        </ul>

        <p>Please log in to the admin dashboard to process this order.</p>
      </div>
    `;
  }
}

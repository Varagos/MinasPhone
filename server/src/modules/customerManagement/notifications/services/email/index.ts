import sgMail from '@sendgrid/mail';
import fs, { readFileSync } from 'fs';
import Handlebars from 'handlebars';

import { join } from 'path';
import { Order } from '../../../../sales/order/domain/Order.js';
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export interface IEmailService {
  sendOrderMessage(email: string, order: Order): Promise<any>;
}

export class EmailService implements IEmailService {
  private emailTemplate: HandlebarsTemplateDelegate<any>;

  constructor() {
    const emailTemplate = readFileSync(
      join(process.cwd(), 'templates', 'email-order.handlebars'),
      'utf8',
    );
    this.emailTemplate = Handlebars.compile(emailTemplate);
  }

  async sendOrderMessage(email: string, order: Order): Promise<void> {
    console.log('Sending email to: ', email);
    try {
      const emailContent = this.msg(email, order);
      await sgMail.send(emailContent);
      console.log('Email sent');
    } catch (err) {
      console.log('Email not sent');
      console.log(err);
    }
  }

  private msg = (to: string, order: Order) => {
    const orderItems = order.items.map((item) => ({
      name: item.productName,
      quantity: item.quantity.value,
      unitPrice: item.unitPrice.value,
      productImage: item.productMediaSrc ?? 'https://picsum.photos/200',
    }));

    return {
      to,
      from: 'minasphone@email.com', // Change to your verified sender
      subject: 'Παραγγελία - Minas Phone',
      text: 'Λάβαμε την παραγγελία σας',
      //   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
      html: this.emailTemplate({
        order_id: order.id.toString(),
        total: order.total().value,
        orderItems,
      }),
    };
  };
}

import { UseCase } from '../../../../../shared/core/UseCase.js';
import { Order } from '../../../../sales/order/domain/Order.js';
import { IEmailService } from '../../services/email/index.js';

interface Request {
  email: string;
  order: Order;
}

export class SendEmail implements UseCase<Request, Promise<void>> {
  constructor(private emailService: IEmailService) {}

  async execute(req: Request): Promise<void> {
    await this.emailService.sendOrderMessage(req.email, req.order);
  }
}

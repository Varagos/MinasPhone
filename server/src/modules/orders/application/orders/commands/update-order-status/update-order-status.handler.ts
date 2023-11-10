import {
  InternalServerErrorException,
  NotFoundException,
} from '@libs/exceptions';
import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'oxide.ts';
import { UpdateOrderStatusCommand } from './update-order-status.command';
import { ForeignKeyIntegrityConstraintViolationError } from 'slonik';
import { OrderRepositoryPort } from '@modules/orders/domain/ports/order.repository.port';
import { ORDER_REPO } from '@modules/orders/constants';
import { OrderStatus } from '@modules/orders/domain/order.entity';

export type UpdateOrderStatusCommandResponse = Result<
  void,
  NotFoundException | InternalServerErrorException
>;

@CommandHandler(UpdateOrderStatusCommand)
export class UpdateOrderStatusCommandHandler {
  constructor(
    @Inject(ORDER_REPO)
    private readonly orderRepo: OrderRepositoryPort,
  ) {}

  async execute(
    command: UpdateOrderStatusCommand,
  ): Promise<UpdateOrderStatusCommandResponse> {
    console.log('command.id', command.id);
    const found = await this.orderRepo.findOneById(command.id);

    if (found.isNone()) {
      return Err(new NotFoundException());
    }
    const order = found.unwrap();

    function isOrderStatus(value: string): value is OrderStatus {
      return Object.values(OrderStatus).includes(value as OrderStatus);
    }
    if (!isOrderStatus(command.status)) {
      return Err(new NotFoundException('Invalid order status'));
    }

    order.updateStatus(command.status);

    try {
      await this.orderRepo.update(order);
      return Ok(undefined);
    } catch (error) {
      if (error instanceof ForeignKeyIntegrityConstraintViolationError) {
        return Err(new NotFoundException('Parent category not found'));
      }
      return Err(new InternalServerErrorException());
    }
  }
}

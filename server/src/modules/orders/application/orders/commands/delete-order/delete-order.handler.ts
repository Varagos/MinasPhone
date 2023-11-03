import { NotFoundException } from '@libs/exceptions';
import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'oxide.ts';
import { DeleteOrderCommand } from './delete-order.command';
import { ORDER_REPO } from '@modules/orders/constants';
import { OrderRepositoryPort } from '@modules/orders/domain/ports/order.repository.port';

export type DeleteOrderCommandResponse = Result<boolean, NotFoundException>;

@CommandHandler(DeleteOrderCommand)
export class DeleteOrderCommandHandler {
  constructor(
    @Inject(ORDER_REPO)
    private readonly orderRepo: OrderRepositoryPort,
  ) {}

  async execute(
    command: DeleteOrderCommand,
  ): Promise<Result<boolean, NotFoundException>> {
    const found = await this.orderRepo.findOneById(command.id);
    if (found.isNone()) return Err(new NotFoundException());
    const order = found.unwrap();
    order.delete();
    const result = await this.orderRepo.delete(order);
    return Ok(result);
  }
}

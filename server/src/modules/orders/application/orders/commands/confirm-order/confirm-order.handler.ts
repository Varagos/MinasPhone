import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'oxide.ts';
import { Inject, InternalServerErrorException, Logger } from '@nestjs/common';
import { ConfirmOrderCommand } from './confirm-order.command';
import { OrderRepositoryPort } from '@modules/orders/domain/ports/order.repository.port';
import { ORDER_REPO } from '@modules/orders/constants';
import { NotFoundException } from '@libs/exceptions';

export type CheckoutOrderCommandResponse = Result<
  void,
  NotFoundException | InternalServerErrorException
>;

@CommandHandler(ConfirmOrderCommand)
export class ConfirmOrderCommandHandler
  implements ICommandHandler<ConfirmOrderCommand>
{
  private readonly logger = new Logger(ConfirmOrderCommandHandler.name);

  constructor(
    @Inject(ORDER_REPO)
    protected readonly orderRepo: OrderRepositoryPort,
    private readonly queryBus: QueryBus,
  ) {}

  async execute(
    command: ConfirmOrderCommand,
  ): Promise<CheckoutOrderCommandResponse> {
    try {
      console.log('command.id', command.id);
      const found = await this.orderRepo.findOneById(command.id);

      if (found.isNone()) {
        return Err(new NotFoundException());
      }
      const order = found.unwrap();

      order.confirm();

      await this.orderRepo.update(order);
      return Ok(undefined);
    } catch (error) {
      // TODO We could also throw a domain event here, for the process-order-saga, to unreserve the stocks
      // Currently there is no reason this will fail, unless the DB is down or something unexpected happens
      return Err(new InternalServerErrorException());
    }
  }
}

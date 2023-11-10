export class UpdateOrderStatusCommand {
  public readonly id: string;

  public readonly status: string;

  constructor(props: UpdateOrderStatusCommand) {
    Object.assign(this, props);
  }
}

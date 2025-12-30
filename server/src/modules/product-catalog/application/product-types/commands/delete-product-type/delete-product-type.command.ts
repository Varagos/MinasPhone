import { Command, CommandProps } from '@libs/ddd';

export class DeleteProductTypeCommand extends Command {
  readonly productTypeId: string;

  constructor(props: CommandProps<DeleteProductTypeCommand>) {
    super(props);
    this.productTypeId = props.productTypeId;
  }
}

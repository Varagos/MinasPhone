import { Command, CommandProps } from '@libs/ddd';

export class UpdateProductTypeCommand extends Command {
  readonly productTypeId: string;
  readonly name: string;
  readonly attributes: Array<{
    attributeId: string;
    config: {
      isRequired: boolean;
      isFilterable: boolean;
      isSearchable: boolean;
      displayOrder: number | null;
    };
  }>;

  constructor(props: CommandProps<UpdateProductTypeCommand>) {
    super(props);
    this.productTypeId = props.productTypeId;
    this.name = props.name;
    this.attributes = props.attributes || [];
  }
}

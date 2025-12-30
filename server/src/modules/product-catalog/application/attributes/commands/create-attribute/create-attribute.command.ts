export class CreateAttributeCommand {
  public readonly name: string;

  public readonly valueType:
    | 'string'
    | 'number'
    | 'boolean'
    | 'enum'
    | 'multiselect';

  public readonly inputType:
    | 'text'
    | 'number'
    | 'select'
    | 'multiselect'
    | 'checkbox'
    | 'radio';

  public readonly unit: string | null;

  public readonly attributeValues: Array<{
    value: string;
    displayOrder: number;
  }>;

  constructor(props: Partial<CreateAttributeCommand>) {
    Object.assign(this, props);
    this.attributeValues = props.attributeValues || [];
  }
}

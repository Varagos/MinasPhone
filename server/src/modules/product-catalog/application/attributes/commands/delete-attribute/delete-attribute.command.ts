export class DeleteAttributeCommand {
  public readonly attributeId: string;

  constructor(props: DeleteAttributeCommand) {
    Object.assign(this, props);
    this.attributeId = props.attributeId;
  }
}

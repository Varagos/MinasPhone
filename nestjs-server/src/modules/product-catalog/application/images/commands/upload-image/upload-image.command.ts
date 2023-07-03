export class UploadImageCommand {
  // description: 'The base64-encoded image of the product to create',
  public readonly image: string;
  constructor(props: UploadImageCommand) {
    Object.assign(this, props);
  }
}

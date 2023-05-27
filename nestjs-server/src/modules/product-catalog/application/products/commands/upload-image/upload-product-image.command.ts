export class UploadProductImageCommand {
  // description: 'The base64-encoded image of the product to create',
  public readonly image: string;
  constructor(props: UploadProductImageCommand) {
    Object.assign(this, props);
  }
}

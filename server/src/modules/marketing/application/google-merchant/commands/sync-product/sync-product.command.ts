export class SyncProductToGoogleMerchantCommand {
  constructor(
    public readonly productId: string,
    public readonly operation: 'insert' | 'update' | 'delete',
  ) {}
}

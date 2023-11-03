interface ContactInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}
interface OrderLineItem {
  productId: string;
  quantity: number;
}

export class CheckoutOrderCommand {
  constructor(
    public readonly lineItems: OrderLineItem[],
    public readonly contactInfo: ContactInfo,
  ) {}
}

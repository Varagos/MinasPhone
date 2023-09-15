type CheckoutOrderParams = {
  contactInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
};

export interface ICheckoutApi {
  checkoutOrder(params: CheckoutOrderParams): Promise<{ orderId: string }>;

  findOrderById(orderId: string): Promise<any>;
  findOrderBySlug(slug: string): Promise<any>;
}

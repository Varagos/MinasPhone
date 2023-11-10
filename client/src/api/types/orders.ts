type CheckoutOrderParams = {
  contactInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
};

export interface Order {
  contactInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  id: string;
  created_at: Date;
  status: string;
  updated_at: Date;
  lineItems: {
    id: string;
    productId: string;
    quantity: number;
    itemPrice: number;
    totalPrice: number;
    productImage: string;
    productName: string;
  }[];
  slug: string;
}

export interface IOrdersApi {
  checkoutOrder(params: CheckoutOrderParams): Promise<{ orderId: string }>;

  findOrderById(orderId: string): Promise<Order>;
  findOrderBySlug(slug: string): Promise<Order>;
}

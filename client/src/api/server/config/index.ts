const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';
if (!API_BASE_URL) {
  throw new Error('NEXT_PUBLIC_API_BASE_URL is not defined');
}
const routes = {
  v1: {
    baseUrl: API_BASE_URL,
    categories: {
      findMany: (range: [number, number], filter?: Record<string, string>) => {
        let baseUrl = `${API_BASE_URL}/api/v1/categories?range=[${range[0]}, ${range[1]}]`;
        if (filter) {
          baseUrl += `&filter=${JSON.stringify(filter)}`;
        }
        return baseUrl;
      },
      fineOne: (id: string) => `${API_BASE_URL}/api/v1/categories/${id}`,
    },
    products: {
      // url: `${API_BASE_URL}/api/v1/products?range=[0,10]&sort=["name","ASC"]&filter={"name":"bar"}`
      findMany: (
        range: [number, number],
        sortBy?: [string, 'ASC' | 'DESC'] | undefined,
        filter?: Record<string, string>
      ) => {
        let baseUrl = `${API_BASE_URL}/api/v1/products?range=[${range[0]}, ${range[1]}]`;
        if (sortBy) {
          baseUrl += `&sort=${sortBy}`;
        }
        if (filter) {
          baseUrl += `&filter=${JSON.stringify(filter)}`;
        }
        return baseUrl;
      },
      fineOne: (id: string) => `${API_BASE_URL}/api/v1/products/${id}`,
    },
    cart: {
      retrieve: () => `${API_BASE_URL}/api/v1/cart/fetch`,
      empty: () => `${API_BASE_URL}/api/v1/cart/empty`,
      addToCart: () => `${API_BASE_URL}/api/v1/cart/line-item`,
      removeFromCart: (lineItemId: string) =>
        `${API_BASE_URL}/api/v1/cart/line-item/${lineItemId}`,
      updateLineItem: (lineItemId: string) =>
        `${API_BASE_URL}/api/v1/cart/line-item/${lineItemId}`,
    },
    orders: {
      checkout: () => `${API_BASE_URL}/api/v1/orders/checkout`,
      findOne: (orderId: string) => `${API_BASE_URL}/api/v1/orders/${orderId}`,
      findOneBySlug: (slug: string) =>
        `${API_BASE_URL}/api/v1/orders/slug/${slug}`,
    },
  },
};
export { routes };

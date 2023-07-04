const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';
if (!API_BASE_URL) {
  throw new Error('NEXT_PUBLIC_API_BASE_URL is not defined');
}
const routes = {
  v1: {
    categories: {
      findMany: (limit: number, page: number) =>
        `${API_BASE_URL}/api/v1/categories?limit=${limit}&page=${page}`,
      fineOne: (id: string) => `${API_BASE_URL}/api/v1/categories/${id}`,
    },
    products: {
      findMany: (limit: number, page: number) =>
        `${API_BASE_URL}/api/v1/products?limit=${limit}&page=${page}`,
      fineOne: (id: string) => `${API_BASE_URL}/api/v1/products/${id}`,
    },
  },
};
export { routes };

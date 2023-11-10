// mockProductData.ts
export const IPHONE_13_PRODUCT_ID = '174baa47-1d80-4e19-af24-df7d4b4c4f7f';

export const MOCK_PHONES_CATEGORY_ID = '9d7205a5-794a-42de-8163-8b35dcb0d6f1';
export const MOCK_IPHONE_13_PRODUCT = {
  id: IPHONE_13_PRODUCT_ID,
  createdAt: new Date(),
  updatedAt: new Date(),
  name: 'iPhone 13',
  description: 'The latest iPhone',
  slug: 'iphone-13',
  price: 1099,
  quantity: 50,
  active: true,
  imageUri: 'file-url',
  sku: 'A123',
  categoryId: MOCK_PHONES_CATEGORY_ID,
};

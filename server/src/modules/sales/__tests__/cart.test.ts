import { Cart } from '../cart/domain/Cart.js';
import { Product } from '../productCatalog/domain/Product.js';

const mobilePhone = Product.create({
  name: 'Mobile Phone',
  price: 10,
  description: 'Mobile Phone description',
  slug: 'mobile-phone',
  quantity: 10,
  active: true,
  mediaFileName: 'mobile-phone.jpg',
  sku: 'mobile-phone',
  categoryId: 'category-1',
}).getValue();

test('Creating a cart should return an id', () => {
  // act
  const cart = Cart.createEmpty();

  // assert
  expect(cart.getValue()).not.toBeUndefined();
});

test('Adding a product to a cart should return a cart with the product', () => {
  // arrange
  const cart = Cart.createEmpty().getValue();

  // act
  cart.add(mobilePhone, 1);

  // assert
  expect(cart.lineItems.length).toBe(1);
});

test('Updating a product in a cart should return a cart with the updated product', () => {
  // arrange
  const cart = Cart.createEmpty().getValue();
  cart.add(mobilePhone, 1);
  const lineItemId = cart.lineItems[0].id;

  // act
  cart.updateQuantity(lineItemId, 2);

  // assert
  expect(cart.lineItems[0].quantity.value).toBe(2);
});

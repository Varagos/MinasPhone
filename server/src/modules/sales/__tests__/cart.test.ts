import { Cart } from '../cart/domain/Cart.js';
import { ProductId } from '../cart/domain/item/ProductId.js';
import { Product } from '../productCatalog/domain/Product.js';

const createRandomProduct = ({
  name,
  price,
  quantity,
}: {
  name: string;
  price: number;
  quantity: number;
}) => {
  return Product.create({
    name,
    price,
    description: 'Mobile Phone description',
    slug: 'mobile-phone',
    quantity,
    active: true,
    mediaFileName: 'mobile-phone.jpg',
    sku: 'mobile-phone',
    categoryId: 'category-1',
  }).getValue();
};

const mobilePhone = createRandomProduct({
  name: 'Mobile Phone',
  price: 100,
  quantity: 10,
});

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

test('Updating a product in a cart with quantity 2 should make its quantity equal to 2', () => {
  // arrange
  const cart = Cart.createEmpty().getValue();
  cart.add(mobilePhone, 1);
  const lineItemId = cart.lineItems[0].id;

  // act
  cart.updateQuantity(lineItemId, 2);

  // assert
  expect(cart.lineItems[0].quantity.value).toBe(2);
});

test('Removing a product from a cart should remove it from the cart', () => {
  // arrange
  const cart = Cart.createEmpty().getValue();
  cart.add(mobilePhone, 1);
  const lineItemId = cart.lineItems[0].id;

  // act
  cart.remove(lineItemId);

  // assert
  expect(cart.lineItems.length).toBe(0);
});

test('Emptying a cart should remove all products from the cart', () => {
  // arrange
  const cart = Cart.createEmpty().getValue();
  cart.add(mobilePhone, 1);

  // act
  cart.empty();

  // assert
  expect(cart.lineItems.length).toBe(0);
});

test('Removing 1 line item from a cart with 2 line items should remove only 1 line item', () => {
  // arrange
  const cart = Cart.createEmpty().getValue();
  cart.add(mobilePhone, 1);
  const tablet = createRandomProduct({
    name: 'Tablet',
    price: 200,
    quantity: 10,
  });
  cart.add(tablet, 1);
  const mobilePhoneId = ProductId.create(mobilePhone.id).getValue();
  const lineItemId = cart.getLineItemWithProductId(mobilePhoneId)?.id;

  // act
  expect(lineItemId).not.toBeUndefined();
  if (!lineItemId) return;
  cart.remove(lineItemId);

  // assert
  expect(cart.lineItems.length).toBe(1);
});

test('Adding an existing product to a cart should update its quantity', () => {
  // arrange
  const cart = Cart.createEmpty().getValue();
  cart.add(mobilePhone, 1);

  // act
  cart.add(mobilePhone, 1);

  // assert
  expect(cart.lineItems[0].quantity.value).toBe(2);
});

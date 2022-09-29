const actions = {
  auth: {
    SIGNED_OUT: 'auth/signedOut',
    SIGNED_IN: 'auth/signedIn',
  },
  categories: {
    FETCH_ALL: 'categories/fetchAll',
  },
  products: {
    FETCH_ALL: 'products/fetchAll',
    FETCH_ALL_BY_CAT_SLUG: 'products/fetchAllByCatSlug',
  },
  cart: {
    FETCH: 'cart/fetch',
    ADD_ITEM: 'cart/addItem',
    EMPTY: 'cart/empty',
    REMOVE_ITEM: 'cart/removeItem',
    UPDATE_ITEM: 'cart/updateItem',
    REFRESH: 'cart/refresh',
  },
  checkout: {
    GENERATE_TOKEN: 'checkout/generateToken',
    CAPTURE_ORDER: 'checkout/captureOrder',
  },
};

export default actions;

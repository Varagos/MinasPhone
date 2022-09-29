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
};

export default actions;

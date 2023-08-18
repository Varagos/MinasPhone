/**
 * Application routes with its version
 * https://github.com/Sairyss/backend-best-practices#api-versioning
 */

// Root
const usersRoot = 'users';
const walletsRoot = 'wallets';
const categoriesRoot = 'categories';
const productsRoot = 'products';

// Api Versions
const v1 = 'v1';

export const routesV1 = {
  version: v1,
  category: {
    root: categoriesRoot,
    getOne: `/${categoriesRoot}/:id`,
    delete: `/${categoriesRoot}/:id`,
    update: `/${categoriesRoot}/:id`,
  },
  product: {
    root: productsRoot,
    image: `/${productsRoot}/:id/image`,
    getOne: `/${productsRoot}/:id`,
    delete: `/${productsRoot}/:id`,
    update: `/${productsRoot}/:id`,
    findByCategorySlug: `/${productsRoot}/category/:slug`,
  },
  user: {
    root: usersRoot,
    getOne: `/${usersRoot}/:id`,
    delete: `/${usersRoot}/:id`,
  },
  wallet: {
    root: walletsRoot,
    delete: `/${walletsRoot}/:id`,
  },
};

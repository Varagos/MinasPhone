import React from 'react';
import { Route } from 'react-router-dom';
import { Admin, Resource, CustomRoutes } from 'react-admin';
import UserIcon from '@mui/icons-material/Group';

// Init SuperTokens
import './pages/Login/superTokensInit';

// import Dashboard from './Dashboard';
import { Dashboard } from './dashboard';
import authProvider from './authProvider';
import { Layout } from './layout';
import { Login } from './pages';

import dataProvider from './data/dataProvider';
import myDataProvider from './data/addUploadCapabilities';

import orders from './orders/index';
import products from './products';
import categories from './categories';
import users from './users';
import Configuration from './configuration/Configuration';
import { apiBaseUrl } from './config';
import dataProviderForProductsBase64ImageHandling from './data/addUploadCapabilitiesbase64';
import { i18nProvider } from './i18n';

console.log(apiBaseUrl);

const App = () => {
  return (
    <Admin
      title="Minas Phone Admin"
      dashboard={Dashboard}
      authProvider={authProvider}
      dataProvider={dataProviderForProductsBase64ImageHandling(dataProvider)}
      layout={Layout}
      loginPage={Login}
      i18nProvider={i18nProvider}
      requireAuth
    >
      <CustomRoutes>
        <Route path="/configuration" element={<Configuration />} />
      </CustomRoutes>
      <Resource name="users" {...users} icon={UserIcon} />
      <Resource name="categories" {...categories} />
      <Resource name="products" {...products} />
      <Resource name="orders" {...orders} />
    </Admin>
  );
};

export default App;

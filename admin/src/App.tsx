import React from 'react';
import { Route } from 'react-router-dom';
import { Admin, Resource, CustomRoutes } from 'react-admin';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import UserIcon from '@mui/icons-material/Group';

import Dashboard from './Dashboard';
import authProvider from './authProvider';
import { Layout } from './layout';
import englishMessages from './i18n/en';

import dataProvider from './data/dataProvider';
import myDataProvider from './data/addUploadCapabilities';

import orders from './orders';
import products from './products';
import categories from './categories';
import users from './users';
import Configuration from './configuration/Configuration';

const i18nProvider = polyglotI18nProvider((locale) => {
  if (locale === 'gr') {
    return import('./i18n/gr').then((messages) => messages.default);
  }
  return englishMessages;
}, 'en');

// const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

const App = () => (
  <Admin
    dashboard={Dashboard}
    authProvider={authProvider}
    dataProvider={myDataProvider(dataProvider)}
    layout={Layout}
    i18nProvider={i18nProvider}
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

export default App;

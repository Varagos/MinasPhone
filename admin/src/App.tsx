import React from 'react';
import { Route } from 'react-router-dom';
import { Admin, Resource, EditGuesser, ListGuesser, CustomRoutes } from 'react-admin';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import UserIcon from '@mui/icons-material/Group';

import Dashboard from './Dashboard';
import authProvider from './authProvider';
import { Layout } from './layout';
import englishMessages from './i18n/en';

import dataProvider from './data/dataProvider';
import { UserList } from './users/users';
import myDataProvider from './data/addUploadCapabilities';

import orders from './orders';
import products from './products';
import categories from './categories';

const i18nProvider = polyglotI18nProvider((locale) => {
  // if (locale === 'gr') {
  //   return import('./i18n/gr.js');
  return englishMessages;
});

// const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

const App = () => (
  <Admin
    dashboard={Dashboard}
    authProvider={authProvider}
    dataProvider={myDataProvider(dataProvider)}
    layout={Layout}
    i18nProvider={i18nProvider}
  >
    <Resource name="users" list={UserList} icon={UserIcon} />
    <Resource name="categories" {...categories} />
    <Resource name="products" {...products} />
    <Resource name="orders" {...orders} />
  </Admin>
);

export default App;

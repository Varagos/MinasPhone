import React from 'react';
import { Admin, Resource, EditGuesser, ListGuesser } from 'react-admin';
// import { UserList } from './users';
import UserIcon from '@mui/icons-material/Group';
import Dashboard from './Dashboard';
import authProvider from './authProvider';
import { ProductList, ProductEdit, ProductCreate } from './products/products';
import InventoryIcon from '@mui/icons-material/Inventory';
import CategoryIcon from '@mui/icons-material/Category';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import dataProvider from './data/dataProvider';
import { UserList } from './users/users';
import { CategoryCreate, CategoryEdit, CategoryList } from './categories/categories';

// const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

const App = () => (
  //   <Admin dashboard={Dashboard} authProvider={authProvider} dataProvider={dataProvider}>
  <Admin dashboard={Dashboard} authProvider={authProvider} dataProvider={dataProvider}>
    <Resource name="users" list={UserList} icon={UserIcon} />
    <Resource name="categories" list={CategoryList} icon={CategoryIcon} edit={CategoryEdit} create={CategoryCreate} />
    <Resource name="products" list={ProductList} icon={InventoryIcon} edit={ProductEdit} create={ProductCreate} />
    {/* <Resource name="categories" list={ListGuesser} /> */}
  </Admin>
);

export default App;

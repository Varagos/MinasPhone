import React from 'react';
import logo from './logo.svg';
import { Admin, Resource, EditGuesser, ListGuesser } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
// import { UserList } from './users';
import { PostCreate, PostEdit, PostList } from './posts';
import PostIcon from '@mui/icons-material/Book';
import UserIcon from '@mui/icons-material/Group';
import Dashboard from './Dashboard';
import authProvider from './authProvider';
import { ProductList } from './products';
import InventoryIcon from '@mui/icons-material/Inventory';
import CategoryIcon from '@mui/icons-material/Category';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import dataProvider from './data/dataProvider';
import { UserList } from './users/users';

// const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

const App = () => (
  //   <Admin dashboard={Dashboard} authProvider={authProvider} dataProvider={dataProvider}>
  <Admin dashboard={Dashboard} authProvider={authProvider} dataProvider={dataProvider}>
    <Resource name="users" list={UserList} icon={UserIcon} />
    {/* <Resource name="users" list={ListGuesser} /> */}
    {/* <Resource name="products" list={ProductList} icon={InventoryIcon} />
    <Resource name="categories" list={ProductList} icon={ReceiptLongIcon} />
    <Resource name="orders" list={ProductList} icon={CategoryIcon} />
    <Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate} icon={PostIcon} />
    <Resource name="users" list={UserList} icon={UserIcon} /> */}
  </Admin>
);

export default App;

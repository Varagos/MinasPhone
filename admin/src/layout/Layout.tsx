import * as React from 'react';
import { Layout, LayoutProps, usePermissions } from 'react-admin';
import AppBar from './AppBar';
import Menu from './Menu';

const LayoutComponent = (props: LayoutProps): JSX.Element => {
  // const { permissions } = usePermissions();
  // if (!permissions) return <p>Forbidden</p>;
  return <Layout {...props} appBar={AppBar} menu={Menu} />;
};
export default LayoutComponent;

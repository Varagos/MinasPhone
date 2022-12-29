import * as React from 'react';
import { FunctionField } from 'react-admin';
import { Order } from '../types';

const render = (record?: Order) => record && record.items.length;

const NbItemsField = () => <FunctionField<Order> render={render} />;

NbItemsField.defaultProps = {
  label: 'resources.orders.fields.nb_items',
  textAlign: 'right',
};

export default NbItemsField;

import * as React from 'react';
import { FunctionField } from 'react-admin';
import { Order } from '../types';
import { OrderResponseDto } from '../dto/order';

const render = (record?: OrderResponseDto) => record && record.lineItems.length;

const NbItemsField = () => <FunctionField<OrderResponseDto> render={render} />;

NbItemsField.defaultProps = {
  label: 'resources.orders.fields.nb_items',
  textAlign: 'right',
};

export default NbItemsField;

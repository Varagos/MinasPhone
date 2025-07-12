import * as React from 'react';
import { Datagrid, FunctionField, List, TextField, useTranslate } from 'react-admin';
import { Fragment, useCallback } from 'react';
import { DateField, NumberField, useGetList, useListContext } from 'react-admin';
import { useMediaQuery, Divider, Tabs, Tab, Theme } from '@mui/material';
import NbItemsField from './NbItemsField';
import { OrderResponseDto } from '../../dto/order';

export const OrderList = () => (
  <List filterDefaultValues={{ status: 'confirmed' }}>
    <TabbedDataGrid />
  </List>
);

const tabs: Array<{ id: string; name: 'Confirmed' | 'Delivered' | 'Cancelled' }> = [
  { id: 'confirmed', name: 'Confirmed' },
  { id: 'delivered', name: 'Delivered' },
  { id: 'cancelled', name: 'Cancelled' },
];

// Have to return tab[name] = total
const useGetTotals = (
  filterValues: any
): {
  Pending: number;
  Delivered: number;
  Cancelled: number;
} => {
  const { data: pendingOrders } = useGetList('orders', {
    pagination: { perPage: 1, page: 1 },
    sort: { field: 'id', order: 'ASC' },
    filter: { ...filterValues, status: 'confirmed' },
  });
  const { data: deliveredOrders } = useGetList('orders', {
    pagination: { perPage: 1, page: 1 },
    sort: { field: 'id', order: 'ASC' },
    filter: { ...filterValues, status: 'delivered' },
  });
  const { data: cancelledOrders } = useGetList('orders', {
    pagination: { perPage: 1, page: 1 },
    sort: { field: 'id', order: 'ASC' },
    filter: { ...filterValues, status: 'cancelled' },
  });

  return {
    // Keys must match tab names
    Pending: pendingOrders?.length!,
    Delivered: deliveredOrders?.length!,
    Cancelled: cancelledOrders?.length!,
  };
};

const TabbedDataGrid = () => {
  const listContext = useListContext();
  const { filterValues, setFilters, displayedFilters } = listContext;
  const isXSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down('sm'));
  const totals = useGetTotals(filterValues);
  const translate = useTranslate();

  const handleChange = useCallback(
    (event: React.ChangeEvent<{}>, value: any) => {
      if (setFilters) {
        console.log('Setting filters', filterValues);
        setFilters(
          { ...filterValues, status: value },
          displayedFilters,
          false // no debounce, we want the filter to fire immediately
        );
      }
    },
    [displayedFilters, filterValues, setFilters]
  );
  console.log('Filter values', filterValues);

  return (
    <Fragment>
      <Tabs
        variant="fullWidth"
        centered
        value={filterValues?.status ?? tabs[0].id}
        indicatorColor="primary"
        onChange={(e, v) => {
          console.log('onChange');
          handleChange(e, v);
        }}
      >
        {tabs.map((choice) => (
          <Tab
            key={choice.id}
            label={totals[choice.name] ? `${choice.name} (${totals[choice.name]})` : choice.name}
            value={choice.id}
          />
        ))}
      </Tabs>
      <Divider />
      {
        //   isXSmall ? (
        //     <MobileGrid />
        //   ) :
        <>
          {filterValues.status === 'confirmed' && (
            <Datagrid rowClick="edit">
              <DateField source="createdAt" showTime label={translate('resources.orders.fields.created_at')} />
              <TextField source="slug" label="Code" />
              <FunctionField
                label="Customer"
                render={(record: OrderResponseDto) => `${record.contactInfo.firstName} ${record.contactInfo.lastName}`}
              />
              <NbItemsField />

              <NumberField
                source="total"
                options={{
                  style: 'currency',
                  currency: 'EUR',
                }}
                sx={{ fontWeight: 'bold' }}
              />
            </Datagrid>
          )}
          {filterValues.status === 'delivered' && (
            <Datagrid rowClick="edit">
              <DateField source="createdAt" showTime />
              <TextField source="id" />
              <FunctionField
                label="Customer"
                render={(record: OrderResponseDto) => `${record.contactInfo.firstName} ${record.contactInfo.lastName}`}
              />
              <NbItemsField />
              <NumberField
                source="total"
                options={{
                  style: 'currency',
                  currency: 'EUR',
                }}
                sx={{ fontWeight: 'bold' }}
              />
            </Datagrid>
          )}
          {filterValues.status === 'cancelled' && (
            <Datagrid rowClick="edit">
              <DateField source="createdAt" showTime />
              <TextField source="id" />
              <FunctionField
                label="Customer"
                render={(record: OrderResponseDto) => `${record.contactInfo.firstName} ${record.contactInfo.lastName}`}
              />
              <NbItemsField />
              <NumberField
                source="total"
                options={{
                  style: 'currency',
                  currency: 'EUR',
                }}
                sx={{ fontWeight: 'bold' }}
              />
            </Datagrid>
          )}
        </>
      }
    </Fragment>
  );
};

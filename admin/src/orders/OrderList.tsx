import * as React from 'react';
import { Datagrid, FunctionField, List, TextField } from 'react-admin';
import { Fragment, useCallback } from 'react';
import { DateField, NumberField, useGetList, useListContext } from 'react-admin';
import { useMediaQuery, Divider, Tabs, Tab, Theme } from '@mui/material';
import NbItemsField from './NbItemsField';
import { OrderResponseDto } from '../dto/order';

export const OrderList = () => (
  <List filterDefaultValues={{ status: 'pending' }}>
    <TabbedDataGrid />
  </List>
);

const tabs = [
  { id: 'pending', name: 'pending' },
  { id: 'delivered', name: 'Completed' },
  { id: 'cancelled', name: 'Cancelled' },
];

// Have to return tab[name] = total
const useGetTotals = (filterValues: any) => {
  const {
    total: totalOrdered,
    data: pendingOrdersData,
    ...rest
  } = useGetList('orders', {
    pagination: { perPage: 1, page: 1 },
    sort: { field: 'id', order: 'ASC' },
    filter: { ...filterValues, status: 'pending' },
  });
  const { total: totalDelivered } = useGetList('orders', {
    pagination: { perPage: 1, page: 1 },
    sort: { field: 'id', order: 'ASC' },
    filter: { ...filterValues, status: 'delivered' },
  });
  const { total: totalCancelled } = useGetList('orders', {
    pagination: { perPage: 1, page: 1 },
    sort: { field: 'id', order: 'ASC' },
    filter: { ...filterValues, status: 'cancelled' },
  });
  console.log('total', {
    totalOrdered,
    rest,
    pendingOrdersData,
  });

  return {
    pending: totalOrdered,
    Completed: totalDelivered,
    Cancelled: totalCancelled,
  };
};

const TabbedDataGrid = () => {
  const listContext = useListContext();
  const { filterValues, setFilters, displayedFilters } = listContext;
  const isXSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down('sm'));
  const totals = useGetTotals(filterValues) as any;

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
          {filterValues.status === 'pending' && (
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

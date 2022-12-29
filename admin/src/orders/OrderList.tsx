import * as React from 'react';
import { ChipField, Datagrid, EditButton, EmailField, FunctionField, List, SelectField, TextField } from 'react-admin';
import { Fragment, useCallback } from 'react';
import { BooleanField, DateField, NumberField, ReferenceField, useGetList, useListContext } from 'react-admin';
import { useMediaQuery, Divider, Tabs, Tab, Theme } from '@mui/material';
import MobileGrid from './MobileGrid';
import NbItemsField from './NbItemsField';

export const OrderList = () => (
  <List>
    <TabbedDatagrid />
    {/* <Datagrid rowClick="edit">
      <TextField source="id" />
      <ChipField source="status" />

      <SelectField
        source="status"
        choices={[
          { id: 'Pending', name: 'Εκκρεμής' },
          { id: 'Completed', name: 'Ολοκληρωμένη' },
          { id: 'Cancelled', name: 'Ακυρωμένη' },
        ]}
      />
      <FunctionField label="Name" render={(record: any) => `${record.firstName} ${record.lastName}`} />

      <EmailField source="email" />
      <TextField source="phone" />
      <EditButton />
    </Datagrid> */}
  </List>
);

const tabs = [
  { id: 'Pending', name: 'Pending' },
  { id: 'Completed', name: 'Completed' },
  { id: 'Cancelled', name: 'Cancelled' },
];

const useGetTotals = (filterValues: any) => {
  const { total: totalOrdered, ...rest } = useGetList('orders', {
    pagination: { perPage: 1, page: 1 },
    sort: { field: 'id', order: 'ASC' },
    filter: { ...filterValues, status: 'Pending' },
  });
  const { total: totalDelivered } = useGetList('orders', {
    pagination: { perPage: 1, page: 1 },
    sort: { field: 'id', order: 'ASC' },
    filter: { ...filterValues, status: 'Completed' },
  });
  const { total: totalCancelled } = useGetList('orders', {
    pagination: { perPage: 1, page: 1 },
    sort: { field: 'id', order: 'ASC' },
    filter: { ...filterValues, status: 'Cancelled' },
  });
  //   console.log('total', totalOrdered, rest, totalCancelled);

  return {
    Pending: totalOrdered,
    Completed: totalDelivered,
    Cancelled: totalCancelled,
  };
};

const TabbedDatagrid = () => {
  const listContext = useListContext();
  const { filterValues, setFilters, displayedFilters } = listContext;
  const isXSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down('sm'));
  const totals = useGetTotals(filterValues) as any;

  const handleChange = useCallback(
    (event: React.ChangeEvent<{}>, value: any) => {
      setFilters &&
        setFilters(
          { ...filterValues, status: value },
          displayedFilters,
          false // no debounce, we want the filter to fire immediately
        );
    },
    [displayedFilters, filterValues, setFilters]
  );

  return (
    <Fragment>
      <Tabs
        variant="fullWidth"
        centered
        value={filterValues.status ?? 'Pending'}
        indicatorColor="primary"
        onChange={handleChange}
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
          {filterValues.status === 'Pending' && (
            <Datagrid rowClick="edit">
              <DateField source="date" showTime />
              <TextField source="id" />
              <FunctionField label="Customer" render={(record: any) => `${record.firstName} ${record.lastName}`} />
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
          {filterValues.status === 'Completed' && (
            <Datagrid rowClick="edit">
              <DateField source="date" showTime />
              <TextField source="id" />
              <FunctionField label="Customer" render={(record: any) => `${record.firstName} ${record.lastName}`} />
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
          {filterValues.status === 'Cancelled' && (
            <Datagrid rowClick="edit">
              <DateField source="date" showTime />
              <TextField source="id" />
              <FunctionField label="Customer" render={(record: any) => `${record.firstName} ${record.lastName}`} />
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

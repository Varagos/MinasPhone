import * as React from 'react';
import { Card, CardContent } from '@mui/material';
import LocalOfferIcon from '@mui/icons-material/LocalOfferOutlined';
import BarChartIcon from '@mui/icons-material/BarChart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { FilterList, FilterListItem, FilterLiveSearch, SavedQueriesList, useGetList, useTranslate } from 'react-admin';

import { Category } from '../../types';
// import * as inflection from 'inflection';

const Aside = () => {
  const { data } = useGetList<Category>('categories', {
    pagination: { page: 1, perPage: 100 },
    sort: { field: 'name', order: 'ASC' },
  });
  const translate = useTranslate();

  return (
    <Card
      sx={{
        display: { xs: 'none', md: 'block' },
        order: -1,
        width: '15em',
        mr: 2,
        alignSelf: 'flex-start',
      }}
    >
      <CardContent sx={{ pt: 1 }}>
        <FilterLiveSearch label={translate('resources.products.filters.search')} source="name" />

        <SavedQueriesList />
        <FilterList label="resources.products.filters.sales" icon={<AttachMoneyIcon />}>
          <FilterListItem
            label="resources.products.filters.best_sellers"
            value={{
              sales_lte: undefined,
              sales_gt: 25,
              sales: undefined,
            }}
          />
          <FilterListItem
            label="resources.products.filters.average_sellers"
            value={{
              sales_lte: 25,
              sales_gt: 10,
              sales: undefined,
            }}
          />
          <FilterListItem
            label="resources.products.filters.low_sellers"
            value={{
              sales_lte: 10,
              sales_gt: 0,
              sales: undefined,
            }}
          />
          <FilterListItem
            label="resources.products.filters.never_sold"
            value={{
              sales_lte: undefined,
              sales_gt: undefined,
              sales: 0,
            }}
          />
        </FilterList>

        <FilterList label="resources.products.filters.stock" icon={<BarChartIcon />}>
          <FilterListItem
            label="resources.products.filters.no_stock"
            value={{
              stock_lt: undefined,
              stock_gt: undefined,
              stock: 0,
            }}
          />
          <FilterListItem
            label="resources.products.filters.low_stock"
            value={{
              stock_lt: 10,
              stock_gt: 0,
              stock: undefined,
            }}
          />
          <FilterListItem
            label="resources.products.filters.average_stock"
            value={{
              stock_lt: 50,
              stock_gt: 9,
              stock: undefined,
            }}
          />
          <FilterListItem
            label="resources.products.filters.enough_stock"
            value={{
              stock_lt: undefined,
              stock_gt: 49,
              stock: undefined,
            }}
          />
        </FilterList>

        <FilterList label="resources.products.filters.categories" icon={<LocalOfferIcon />}>
          {data &&
            data.map((record) => {
              console.log('recordd', record);
              return <FilterListItem label={record.name} key={record.id} value={{ categoryId: record.id }} />;
            })}
        </FilterList>
      </CardContent>
    </Card>
  );
};

export default Aside;

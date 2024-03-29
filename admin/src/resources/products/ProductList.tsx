import * as React from 'react';
import { Box, Chip, useMediaQuery, Theme } from '@mui/material';
import {
  CreateButton,
  ExportButton,
  FilterButton,
  FilterForm,
  FilterContext,
  InputProps,
  ListBase,
  NumberInput,
  ReferenceInput,
  SearchInput,
  SelectInput,
  Title,
  TopToolbar,
  useTranslate,
  useGetResourceLabel,
} from 'react-admin';

import { GridList } from './GridList';
import Aside from './Aside';

const ProductList = () => {
  const getResourceLabel = useGetResourceLabel();
  const isSmall: boolean = useMediaQuery<Theme>((theme) => theme.breakpoints.down('md'));
  return (
    <ListBase perPage={24} sort={{ field: 'id', order: 'ASC' }}>
      <Title defaultTitle={getResourceLabel('products', 2)} />
      <FilterContext.Provider value={productFilters}>
        {isSmall && (
          <Box m={1}>
            <FilterForm />
          </Box>
        )}
      </FilterContext.Provider>
      <Box display="flex">
        <Aside />
        <Box width={isSmall ? 'auto' : 'calc(100% - 16em)'}>
          <GridList actions={<ListActions isSmall={isSmall} />} />
        </Box>
      </Box>
    </ListBase>
  );
};

const QuickFilter = ({ label }: InputProps) => {
  const translate = useTranslate();
  return <Chip sx={{ mb: 1 }} label={translate(label as string)} />;
};

export const productFilters = [
  // <SearchInput source="name" alwaysOn />,
  // <ReferenceInput source="categoryId" reference="categories">
  //   <SelectInput source="name" />
  // </ReferenceInput>,
  // <NumberInput source="width_gte" />,
  // <NumberInput source="width_lte" />,
  // <NumberInput source="height_gte" />,
  // <NumberInput source="height_lte" />,
  // <QuickFilter label="resources.products.fields.stock_lte" source="stock_lte" defaultValue={10} />,
];

const ListActions = ({ isSmall }: any) => (
  <TopToolbar sx={{ minHeight: { sm: 56 } }}>
    {isSmall && <FilterButton />}
    {/* <SortButton fields={['reference', 'sales', 'stock']} /> */}
    <CreateButton />
    <ExportButton />
  </TopToolbar>
);

export default ProductList;

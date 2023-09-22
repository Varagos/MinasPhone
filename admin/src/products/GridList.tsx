import React from 'react';

import {
  BooleanField,
  Datagrid,
  List,
  NumberField,
  TextField,
  ReferenceField,
  ChipField,
  ImageField,
  useTranslate,
  Pagination,
} from 'react-admin';

type ProductListProps = {
  actions: JSX.Element;
};
export const GridList = ({ actions }: ProductListProps) => {
  const translate = useTranslate();
  return (
    <List pagination={<Pagination rowsPerPageOptions={[10, 12, 24, 48, 72]} />} actions={actions}>
      <Datagrid rowClick="edit">
        <ImageField
          sx={{ '& img': { maxWidth: 100, maxHeight: 100, objectFit: 'contain' } }}
          source="imageUrl"
          label={translate('resources.products.fields.image')}
          sortable={false}
        />

        <TextField source="slug" label={translate('resources.products.fields.slug')} />
        <TextField source="name" label={translate('resources.products.fields.name')} />
        <ReferenceField
          label={translate('resources.products.fields.category')}
          source="categoryId"
          reference="categories"
        >
          <ChipField source="name" />
        </ReferenceField>
        <NumberField
          source="price"
          label={translate('resources.products.fields.price')}
          options={{
            style: 'currency',
            currency: 'EUR',
          }}
        />
        <NumberField source="quantity" label={translate('resources.products.fields.quantity')} />
        <BooleanField source="active" label={translate('resources.products.fields.available')} />
      </Datagrid>
    </List>
  );
};

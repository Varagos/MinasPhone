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
  DateField,
} from 'react-admin';

type ProductListProps = {
  actions: JSX.Element;
};
export const GridList = ({ actions }: ProductListProps) => {
  const translate = useTranslate();
  return (
    <List
      pagination={<Pagination rowsPerPageOptions={[10, 12, 24, 48, 72]} />}
      actions={actions}
      //            "createdAt": "2025-12-07T19:57:46.302Z",

      sort={{ field: 'createdAt', order: 'DESC' }}
    >
      <Datagrid rowClick="edit">
        <ImageField
          sx={{ '& img': { maxWidth: 100, maxHeight: 100, objectFit: 'contain' } }}
          source="imageUrl"
          label={translate('resources.products.fields.image')}
          sortable={false}
        />

        {/* <TextField source="slug" label={translate('resources.products.fields.slug')} /> */}
        <TextField source="name" label={translate('resources.products.fields.name')} />
        <ReferenceField
          label={translate('resources.products.fields.category')}
          source="categoryId"
          reference="categories"
        >
          <ChipField source="name" />
        </ReferenceField>
        <ReferenceField
          label={translate('resources.products.fields.productType')}
          source="productTypeId"
          reference="product-types"
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
        {/* <BooleanField source="active" label={translate('resources.products.fields.available')} /> */}
        <DateField source="createdAt" label={translate('resources.products.fields.createdAt')} />
      </Datagrid>
    </List>
  );
};

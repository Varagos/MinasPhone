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
} from 'react-admin';

const Language: 'GR' | 'EN' = 'GR';
const labels = {
  GR: {
    slug: 'Κωδικός',
    name: 'Όνομα',
    description: 'Περιγραφή',
    price: 'Τιμή',
    quantity: 'Ποσότητα',
    image: 'Εικόνα',
    available: 'Διαθέσιμο',
    createdAt: 'Δημιουργήθηκε',
    updatedAt: 'Ενημερώθηκε',
    category: 'Κατηγορία',
  },
};

export const ProductList = () => {
  const translate = useTranslate();
  return (
    <List>
      <Datagrid rowClick="edit">
        {/* <TextField source="id" /> */}
        <ImageField
          sx={{ '& img': { maxWidth: 100, maxHeight: 100, objectFit: 'contain' } }}
          source="mediaFileName"
          label="Image"
          sortable={false}
        />

        <TextField source="slug" label={labels[Language].slug} />
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
        <BooleanField source="active" label={labels[Language].available} />
        {/* <TextField source="media" />
      <TextField source="sku" /> */}
      </Datagrid>
    </List>
  );
};

import {
  BooleanField,
  Datagrid,
  List,
  NumberField,
  TextField,
  BooleanInput,
  Edit,
  NumberInput,
  SimpleForm,
  TextInput,
  Create,
  ImageInput,
  ImageField,
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
  },
};

export const ProductList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="slug" label={labels[Language].slug} />
      {/* <TextField source="id" /> */}
      <BooleanField source="active" label={labels[Language].available} />
      <TextField source="name" label={labels[Language].name} />
      <TextField source="description" label={labels[Language].description} />
      <NumberField source="quantity" label={labels[Language].quantity} />
      {/* <TextField source="media" />
      <TextField source="sku" /> */}
      <NumberField source="price" label="Τιμή" />
    </Datagrid>
  </List>
);

export const ProductEdit = () => (
  <Edit>
    <SimpleForm>
      {/* <TextInput source="id" disabled /> */}
      <TextInput source="slug" disabled label={labels[Language].slug} />
      <BooleanInput source="active" label={labels[Language].available} />
      <TextInput source="name" label={labels[Language].name} />
      <TextInput source="description" label={labels[Language].description} />
      <NumberInput source="quantity" label={labels[Language].quantity} />
      {/* <TextInput source="media" /> */}
      {/* <ImageField source="media" title="title" /> */}
      {/* <ImageField
        source="mediaFileName"
        sx={{ '& img': { maxWidth: 400, maxHeight: 400, objectFit: 'contain' } }}
        label={labels[Language].image}
      /> */}

      <ImageInput source="media" label={labels[Language].image} accept="image/*" multiple={false}>
        <ImageField
          source="src"
          title="title"
          sx={{ '& img': { maxWidth: 400, maxHeight: 400, objectFit: 'contain' } }}
        />
      </ImageInput>
      <TextInput source="sku" />
      <NumberInput source="price" />
    </SimpleForm>
  </Edit>
);

export const ProductCreate = () => (
  <Create>
    <SimpleForm>
      <BooleanInput source="active" defaultValue={true} />
      {/* <TextInput source="slug" /> */}
      <TextInput source="name" />
      <TextInput source="description" />
      <NumberInput source="quantity" />

      <ImageInput source="media" label={labels[Language].image} accept="image/*" multiple={false}>
        <ImageField
          source="src"
          title="title"
          sx={{ '& img': { maxWidth: 400, maxHeight: 400, objectFit: 'contain' } }}
        />
      </ImageInput>
      <TextInput source="sku" />
      <NumberInput source="price" />
    </SimpleForm>
  </Create>
);

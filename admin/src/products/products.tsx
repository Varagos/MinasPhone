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
  ReferenceField,
  ReferenceInput,
  SelectInput,
  ChipField,
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

export const ProductList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="slug" label={labels[Language].slug} />
      {/* <TextField source="id" /> */}
      <TextField source="name" label={labels[Language].name} />
      <TextField source="description" label={labels[Language].description} />
      <ReferenceField label={labels[Language].category} source="categoryId" reference="categories">
        <ChipField source="name" />
      </ReferenceField>
      <NumberField source="price" label="Τιμή" />
      <NumberField source="quantity" label={labels[Language].quantity} />
      <BooleanField source="active" label={labels[Language].available} />
      {/* <TextField source="media" />
      <TextField source="sku" /> */}
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
      <ReferenceInput source="categoryId" reference="categories">
        <SelectInput optionText="name" label={labels[Language].category} />
      </ReferenceInput>

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
      <ReferenceInput source="categoryId" reference="categories">
        <SelectInput optionText="name" label={labels[Language].category} />
      </ReferenceInput>

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

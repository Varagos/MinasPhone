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
} from 'react-admin';

export const ProductList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <BooleanField source="active" />
      <TextField source="permalink" />
      <TextField source="name" />
      <TextField source="description" />
      <NumberField source="quantity" />
      <TextField source="media" />
      <TextField source="sku" />
      <NumberField source="price" />
    </Datagrid>
  </List>
);

export const ProductEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" />
      <BooleanInput source="active" />
      <TextInput source="permalink" />
      <TextInput source="name" />
      <TextInput source="description" />
      <NumberInput source="quantity" />
      <TextInput source="media" />
      <TextInput source="sku" />
      <NumberInput source="price" />
    </SimpleForm>
  </Edit>
);

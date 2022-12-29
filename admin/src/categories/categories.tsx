import {
  Create,
  Datagrid,
  Edit,
  List,
  ReferenceField,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  TextField,
  TextInput,
} from 'react-admin';

export const CategoryList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="slug" />
      <TextField source="name" />
      <ReferenceField source="parent_id" reference="categories">
        <TextField source="id" />
      </ReferenceField>
    </Datagrid>
  </List>
);

export const CategoryEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="slug" disabled />
      <TextInput source="name" />
      <ReferenceInput source="parent_id" reference="categories" allowEmpty>
        <SelectInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);

export const CategoryCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="slug" />
      <TextInput source="name" />
      <ReferenceInput source="parent_id" reference="categories" allowEmpty>
        <SelectInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);

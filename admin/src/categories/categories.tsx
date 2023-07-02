import {
  ChipField,
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
      <ChipField source="name" />
      <ReferenceField source="parentId" reference="categories">
        <TextField source="name" />
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
      <ReferenceInput source="parentId" reference="categories" allowEmpty>
        <SelectInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);

const defaultParse = (value: string) => {
  console.log({ defaultParse, value });
  return value === '' ? null : value;
};

export const CategoryCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="slug" />
      <TextInput source="name" />
      <ReferenceInput source="parentId" reference="categories">
        <SelectInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);

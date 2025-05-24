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
  useTranslate,
} from 'react-admin';

export const CategoryList = () => {
  const translate = useTranslate(); // returns the i18nProvider.translate() method
  return (
    <List>
      <Datagrid rowClick="edit">
        {/* <TextField source="id" /> */}
        <ChipField source="name" label={translate('resources.categories.fields.name')} />
        <TextField source="slug" label={translate('resources.categories.fields.slug')} />
        <ReferenceField
          source="parentId"
          reference="categories"
          label={translate('resources.categories.fields.parent')}
        >
          <TextField source="name" />
        </ReferenceField>
      </Datagrid>
    </List>
  );
};

export const CategoryEdit = () => {
  const translate = useTranslate();
  return (
    <Edit>
      <SimpleForm>
        <TextInput disabled source="id" />
        <TextInput source="name" label={translate('resources.categories.fields.name')} />
        <TextInput source="slug" label={translate('resources.categories.fields.slug')} />
        <ReferenceInput
          source="parentId"
          reference="categories"
          allowEmpty
          label={translate('resources.categories.fields.parent')}
        >
          <SelectInput optionText="name" label={translate('resources.categories.fields.parent')} />
        </ReferenceInput>
      </SimpleForm>
    </Edit>
  );
};

export const CategoryCreate = () => {
  const translate = useTranslate();
  return (
    <Create>
      <SimpleForm sanitizeEmptyValues>
        <TextInput source="name" label={translate('resources.categories.fields.name')} />
        <TextInput source="slug" label={translate('resources.categories.fields.slug')} />
        <ReferenceInput
          source="parentId"
          reference="categories"
          label={translate('resources.categories.fields.parent')}
        >
          <SelectInput optionText="name" label={translate('resources.categories.fields.parent')} />
        </ReferenceInput>
      </SimpleForm>
    </Create>
  );
};

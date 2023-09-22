import { Datagrid, DateField, EmailField, List, TextField, useTranslate } from 'react-admin';

export const UserList = () => {
  const translate = useTranslate();
  return (
    <List>
      <Datagrid bulkActionButtons={false}>
        <TextField source={'id'} />
        <EmailField source="email" />
        <DateField source="timeJoined" showTime label={translate('resources.customers.fields.time_joined')} />
      </Datagrid>
    </List>
  );
};

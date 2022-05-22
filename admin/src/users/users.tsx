import { Datagrid, DateField, EmailField, List, TextField, UrlField } from 'react-admin';

export const UserList = () => (
  <List>
    <Datagrid bulkActionButtons={false}>
      <TextField source="id" />
      <EmailField source="email" />
      <DateField source="timeJoined" showTime />
    </Datagrid>
  </List>
);

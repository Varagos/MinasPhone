import {
  ChipField,
  Create,
  Datagrid,
  Edit,
  EditButton,
  EmailField,
  FunctionField,
  List,
  ReferenceField,
  ReferenceInput,
  SelectField,
  SelectInput,
  SimpleForm,
  TextField,
  TextInput,
} from 'react-admin';
// "id": "0E53B79E2F02",
//             "items": [
//                 {
//                     "productId": "02b56ddb-a791-47b3-864e-f953d4d7f8ae",
//                     "unitPrice": 55,
//                     "quantity": 1
//                 }
//             ],
//            "status": "Pending
//             "firstName": "Jooe",
//             "lastName": "Doe",
//             "email": "markos.girgis13@gmail.com",
//             "phone": "6900000000"

import { ShowButton } from 'react-admin';

const OrderShowButton = () => <ShowButton label="Show comment" />;
export const OrderList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <ChipField source="status" />

      <SelectField
        source="status"
        choices={[
          { id: 'Pending', name: 'Εκκρεμής' },
          { id: 'Completed', name: 'Ολοκληρωμένη' },
          { id: 'Cancelled', name: 'Ακυρωμένη' },
        ]}
      />
      {/* <ChipField={} /> */}
      <FunctionField label="Name" render={(record: any) => `${record.firstName} ${record.lastName}`} />

      <EmailField source="email" />
      <TextField source="phone" />
      <EditButton />
    </Datagrid>
  </List>
);

export const OrderEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput disabled source="id" />
      <SelectInput
        source="status"
        choices={[
          { id: 'Pending', name: 'Εκκρεμής' },
          { id: 'Completed', name: 'Ολοκληρωμένη' },
          { id: 'Cancelled', name: 'Ακυρωμένη' },
        ]}
      />
      <TextInput source="firstName" disabled />
      <TextInput source="lastName" disabled />
      <TextInput source="email" disabled />
      <TextInput source="phone" disabled />
    </SimpleForm>
  </Edit>
);

export const OrderCreate = () => (
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

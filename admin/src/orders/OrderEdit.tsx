import * as React from 'react';
import { EmailField, FunctionField, NumberField } from 'react-admin';
import {
  BooleanInput,
  DateField,
  Edit,
  Form,
  Labeled,
  ReferenceField,
  SelectInput,
  TextField,
  Toolbar,
  useRecordContext,
  useTranslate,
} from 'react-admin';
import { Link as RouterLink } from 'react-router-dom';
import { Card, CardContent, Box, Grid, Typography, Link } from '@mui/material';

import { Customer } from '../types';

// export const OrderEdit = () => (
//   <Edit>
//     <SimpleForm>
//       <TextInput disabled source="id" />
//       <SelectInput
//         source="status"
//         choices={[
//           { id: 'Pending', name: 'Εκκρεμής' },
//           { id: 'Completed', name: 'Ολοκληρωμένη' },
//           { id: 'Cancelled', name: 'Ακυρωμένη' },
//         ]}
//       />
//       <TextInput source="firstName" disabled />
//       <TextInput source="lastName" disabled />
//       <TextInput source="email" disabled />
//       <TextInput source="phone" disabled />
//     </SimpleForm>
//   </Edit>
// );

import OrderItem from './OrderItem';
import Totals from './Totals';
import { OrderResponseDto } from '../dto/order';

const OrderEdit = () => (
  <Edit title={<OrderTitle />} component="div">
    <OrderForm />
  </Edit>
);

const OrderTitle = () => {
  const translate = useTranslate();
  const record = useRecordContext<OrderResponseDto>();
  return record ? (
    <span>
      {translate('resources.orders.title', {
        reference: record.slug,
      })}
    </span>
  ) : null;
};

const CustomerDetails = () => {
  const record = useRecordContext<Customer>();
  return (
    <div>
      <Typography component={RouterLink} color="primary" to={`/users/${record?.id}`} style={{ textDecoration: 'none' }}>
        {record?.first_name} {record?.last_name}
      </Typography>
      <Typography component={Link} color="primary" href={`mailto:${record?.email}`} style={{ textDecoration: 'none' }}>
        {record?.email}
      </Typography>
    </div>
  );
};

const CustomerAddress = () => {
  const record = useRecordContext<Customer>();
  return (
    <div>
      <Typography>
        {record?.firstName} {record?.last_name}
      </Typography>
      <Typography>{record?.address}</Typography>
      <Typography>
        {record?.city}, {record?.stateAbbr} {record?.zipcode}
      </Typography>
    </div>
  );
};

const Spacer = () => <Box m={1}>&nbsp;</Box>;

const OrderForm = () => {
  const translate = useTranslate();
  return (
    <Form>
      <Box maxWidth="50em">
        <Card>
          <CardContent>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12} md={8}>
                <Typography variant="h6" gutterBottom>
                  {translate('resources.orders.section.order')}
                </Typography>
                <Grid container>
                  <Grid item xs={12} sm={12} md={6}>
                    <Labeled source="createdAt">
                      <DateField source="createdAt" showTime />
                    </Labeled>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Labeled source="slug">
                      <TextField source="slug" />
                    </Labeled>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12} sm={12} md={6}>
                    <SelectInput
                      source="status"
                      choices={[
                        {
                          id: 'pending',
                          name: 'pending',
                        },
                        {
                          id: 'delivered',
                          name: 'delivered',
                        },
                        {
                          id: 'cancelled',
                          name: 'cancelled',
                        },
                        {
                          id: 'unknown',
                          name: 'unknown',
                          disabled: true,
                        },
                      ]}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Box mt={2}>
                      <BooleanInput row={true} source="returned" disabled />
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Typography variant="h6" gutterBottom>
                  {translate('resources.orders.section.customer')}
                </Typography>

                <FunctionField
                  render={(record: OrderResponseDto) =>
                    `${record.contactInfo.firstName} ${record.contactInfo.lastName}`
                  }
                />
                <br />
                <EmailField source="contactInfo.email" />
                <br />
                <NumberField source="contactInfo.phone" />
                {/* <ReferenceField source="customer_id" reference="customers" link={false}>
                  <CustomerDetails />
                </ReferenceField> */}
                <Spacer />

                {/* <Typography variant="h6" gutterBottom>
                  {translate('resources.orders.section.shipping_address')}
                </Typography>
                <ReferenceField source="customer_id" reference="customers" link={false}>
                  <CustomerAddress />
                </ReferenceField> */}
              </Grid>
            </Grid>
            <Spacer />

            <Typography variant="h6" gutterBottom>
              {translate('resources.orders.section.items')}
            </Typography>
            <div>
              <OrderItem />
            </div>
            <Spacer />

            <Typography variant="h6" gutterBottom>
              {translate('resources.orders.section.total')}
            </Typography>
            <div>
              <Totals />
            </div>
          </CardContent>
          <Toolbar />
        </Card>
      </Box>
    </Form>
  );
};

export default OrderEdit;

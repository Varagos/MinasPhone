import React, { useEffect } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';

import FormInput from './FormInput';
import LinkButton from '../common/LinkButton';
import { useTranslation } from 'next-i18next';

type AccountProps = {
  next: (data: AccountFormData) => void;
};

export type AccountFormData = {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
};

const Account = ({ next }: AccountProps) => {
  const methods = useForm();
  const { t } = useTranslation();

  const { errors } = methods.formState;
  // useEffect(() => {
  //   console.error('Errors:::', errors);
  // }, [errors]);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Προσωπικά στοιχεία
      </Typography>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) => {
            console.log(data);
            next({
              ...(data as AccountFormData),
            });
          })}
        >
          <Grid container spacing={3}>
            <FormInput
              name="firstName"
              label="'Ονομα"
              rules={{
                required: 'Υποχρεωτικό πεδίο',
              }}
            />
            <FormInput
              name="lastName"
              label="Επώνυμο"
              rules={{
                required: 'Υποχρεωτικό πεδίο',
              }}
            />
            <FormInput
              name="email"
              label="Email"
              rules={{
                required: 'Υποχρεωτικό πεδίο',
                pattern: {
                  value:
                    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
                  message: 'Λανθασμένη διεύθυνση email',
                },
              }}
            />
            <FormInput
              name="phoneNumber"
              label="Αριθμός Τηλεφώνου"
              rules={{
                required: 'Υποχρεωτικό πεδίο',
                validate: {
                  isNumber: (value: string) => {
                    return (
                      value.match(/\d/g)?.length === 10 ||
                      'Πρέπει να είναι 10-ψήφιος αριθμός'
                    );
                  },
                },
              }}
            />
          </Grid>
          <br />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <LinkButton href="/cart" variant="outlined">
              {t('CHECKOUT.BACK_TO_CART')}
            </LinkButton>

            <Button type="submit" variant="contained" color="primary">
              {t('CHECKOUT.NEXT_BUTTON')}
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default Account;

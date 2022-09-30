import React, { useEffect } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import { Link } from 'react-router-dom';

import FormInput from './FormInput';

const Account = ({ next }: any) => {
  const methods = useForm();
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
            // console.log(data, shippingCountry);
            next({
              ...data,
              shippingCountry: 'GR',
              shippingSubdivision: 'GR-I',
              shippingOption: 'ship_L1vOoZqyWwRa8Z',
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
            {/* <FormInput name="address1" label="Address" required /> */}
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
                    return value.match(/\d/g)?.length === 10 || 'Πρέπει να είναι 10-ψήφιος αριθμός';
                  },
                },
              }}
            />
            {/* <FormInput name="city" label="City" required />
            <FormInput name="zip" label="ZIP / Postal code" required /> */}

            {/* <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Country</InputLabel>
              <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                {countries.map((country) => (
                  <MenuItem key={country.id} value={country.id}>
                    {country.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Subdivision</InputLabel>
              <Select value={shippingSubdivision} fullWidth onChange={(e) => setShippingSubdivision(e.target.value)}>
                {subdivisions.map((subdivision) => (
                  <MenuItem key={subdivision.id} value={subdivision.id}>
                    {subdivision.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Options</InputLabel>
              <Select value={shippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)}>
                {options.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid> */}
          </Grid>
          <br />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button component={Link} to="/cart" variant="outlined">
              Πίσω στο καλάθι
            </Button>

            <Button type="submit" variant="contained" color="primary">
              Συνέχεια
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default Account;

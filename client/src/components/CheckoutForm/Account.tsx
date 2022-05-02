import React, { useState, useEffect } from 'react';
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { commerce } from '../lib/commerce';

import FormInput from './FormInput';
import { GetShippingOptionsResponse } from '@chec/commerce.js/features/checkout';

const AddressForm = ({ checkoutToken, next }: any) => {
  // const [shippingCountries, setShippingCountries] = useState<Record<string, string>>({});
  // const [shippingCountry, setShippingCountry] = useState('');
  // const [shippingSubdivisions, setShippingSubdivisions] = useState<Record<string, string>>({});
  // const [shippingSubdivision, setShippingSubdivision] = useState('');
  // const [shippingOptions, setShippingOptions] = useState<GetShippingOptionsResponse[]>([]);
  // const [shippingOption, setShippingOption] = useState('');
  const methods = useForm();

  // const countries = Object.entries(shippingCountries).map(([code, name]) => ({
  //   id: code,
  //   label: name,
  // }));
  // const subdivisions = Object.entries(shippingSubdivisions).map(([code, name]) => ({
  //   id: code,
  //   label: name,
  // }));

  // const options = shippingOptions.map((sO) => ({
  //   id: sO.id,
  //   label: `${sO.description} - ${sO.price.formatted_with_symbol}`,
  // }));

  // // checkoutTokenId is created inside Checkout.jsx
  // const fetchShippingCountries = async (checkoutTokenId: string) => {
  //   const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);

  //   setShippingCountries(countries);
  //   setShippingCountry(Object.keys(countries)[0]);
  //   console.log('SHIPPING COUNTRY:', countries);
  // };

  // const fetchSubdivisions = async (countryCode: string) => {
  //   const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);

  //   setShippingSubdivisions(subdivisions);
  //   setShippingSubdivision(Object.keys(subdivisions)[0]);

  //   console.log('SHIPPING SUBDIVISIONS:', subdivisions);
  // };

  // const fetchShippingOptions = async (checkoutTokenId: string, country: string, region?: string) => {
  //   const options = await commerce.checkout.getShippingOptions(checkoutTokenId, {
  //     country,
  //     region,
  //   });

  //   setShippingOptions(options);
  //   setShippingOption(options[0].id);

  //   console.log('SHIPPING OPTIONS:', options);
  // };

  // useEffect(() => {
  //   fetchShippingCountries(checkoutToken.id);
  // }, []);

  // useEffect(() => {
  //   if (shippingCountry) fetchSubdivisions(shippingCountry);
  // }, [shippingCountry]);

  // useEffect(() => {
  //   if (shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision);
  // }, [shippingSubdivision]);

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
            <FormInput name="firstName" label="'Ονομα" required />
            <FormInput name="lastName" label="Επώνυμο" required />
            {/* <FormInput name="address1" label="Address" required /> */}
            <FormInput name="email" label="Email" required />
            <FormInput name="phoneNumber" label="Αριθμός Τηλεφώνου" required />
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

export default AddressForm;

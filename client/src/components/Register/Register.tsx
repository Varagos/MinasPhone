import React from 'react';

import { Container, Grid } from '@mui/material';
import SignIn from './SignIn/SignIn';
import SignUp from './SignUp/SignUp';

const Register = () => {
  return (
    // <div sx={{  bgcolor: 'background.default' }}>

    <Container maxWidth="lg" sx={{ pt: 2, pb: 20, bgcolor: 'background.default' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <SignIn />;
        </Grid>
        <Grid item xs={12} sm={6}>
          <SignUp />
        </Grid>
      </Grid>
    </Container>
    // </div>
  );
};

export default Register;

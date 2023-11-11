// pages/your-page.jsx

import React from 'react';
import dynamic from 'next/dynamic';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useTranslation } from 'next-i18next';

// Import the MapComponent with no SSR
const StoreMap = dynamic(
  () => import('./Map'), // replace with your actual path to the MapComponent
  { ssr: false } // This line is important. It's what prevents server-side rendering
);

const StoreLocation = () => {
  const { t } = useTranslation();

  return (
    <section style={{ padding: 30 }}>
      <Container maxWidth={false}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                {t('LOCATION.TITLE')}
              </Typography>
              <Typography>{t('LOCATION.CONTENT')}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <StoreMap />
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default StoreLocation;

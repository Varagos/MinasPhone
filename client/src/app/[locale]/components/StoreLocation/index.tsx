'use client';
// pages/your-page.jsx

import React from 'react';
import dynamic from 'next/dynamic';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useTranslations } from 'next-intl';

// Import the MapComponent with no SSR
const StoreMap = dynamic(
  () => import('./Map'), // replace with your actual path to the MapComponent
  { ssr: false } // This line is important. It's what prevents server-side rendering
);

const StoreLocation = () => {
  const t = useTranslations('landing');

  return (
    <section style={{ padding: '50px 0' }}>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Box
              sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
                {t('LOCATION.TITLE')}
              </Typography>
              <Typography>{t('LOCATION.CONTENT')}</Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <StoreMap />
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default StoreLocation;

import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useTranslation } from 'next-i18next';
import { useServicesSection } from './data';
import ServiceCard from './ServiceCard';
import ShapeDivider from './BottomShapeDivider';

const ServicesSection = () => {
  const { t } = useTranslation();

  const { services } = useServicesSection();

  return (
    // Add very light gray background color
    <section
      style={{
        position: 'relative',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Container
        maxWidth="lg"
        sx={(theme) => ({
          py: 15,
          [theme.breakpoints.down('sm')]: {
            py: 10,
          },
        })}
      >
        <Grid container spacing={4} sx={{ paddingBottom: 20 }}>
          <Grid item xs={12}>
            <Typography
              variant="h2"
              // on mobile make this smaller
              sx={(theme) => {
                return {
                  [theme.breakpoints.down('sm')]: {
                    fontSize: '2rem',
                  },
                };
              }}
              align="center"
              gutterBottom
            >
              {t('SERVICES.TITLE')}
            </Typography>
          </Grid>
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </Grid>
      </Container>
      <ShapeDivider />
    </section>
  );
};

export default ServicesSection;

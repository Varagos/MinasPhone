'use client';
import React from 'react';
import Image from 'next/image';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

import PhoneFix from '/public/undraw_phone_fix.svg';
import { useTranslations } from 'next-intl';
import { ThickBottomBorder } from '../styles';

const RepairsSection = () => {
  const t = useTranslations('landing');
  return (
    <section>
      <Container>
        <Box my={16}>
          <Typography
            component="h3" // Semantic HTML
            variant="h4" // Visual style
            align="center"
            gutterBottom
            fontWeight={900}
          >
            <ThickBottomBorder>{t('REPAIRS.TITLE')}</ThickBottomBorder>
          </Typography>
          <Grid container justifyContent="center" spacing={3} mt={2}>
            <Grid
              size={{ xs: 12, md: 6 }}
              alignContent="center"
              justifyContent="center"
            >
              <Image
                src={PhoneFix}
                alt="phone repairs"
                sizes="100vw"
                style={{ width: '90%', height: 'auto' }}
              />
            </Grid>
            <Grid
              size={{ xs: 12, md: 6 }}
              alignContent="center"
              justifyContent="center"
            >
              <Container>
                <Typography variant="h6" align="left" gutterBottom>
                  {t('REPAIRS.SUBTITLE_1')}
                </Typography>
                <Typography gutterBottom>
                  {t('REPAIRS.DESCRIPTION_1')}
                </Typography>
                <Typography variant="h6" align="left" gutterBottom>
                  {t('REPAIRS.SUBTITLE_2')}
                </Typography>
                <Typography gutterBottom>
                  {t('REPAIRS.DESCRIPTION_2')}
                </Typography>
                <Typography variant="h6" align="left" gutterBottom>
                  {t('REPAIRS.SUBTITLE_3')}
                </Typography>
                <Typography gutterBottom>
                  {t('REPAIRS.DESCRIPTION_3')}
                </Typography>
              </Container>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </section>
  );
};

export default RepairsSection;

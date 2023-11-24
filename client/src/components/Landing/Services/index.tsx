import React from 'react';
import { styled } from '@mui/material/styles';
import { Grid, Paper, Typography, Button } from '@mui/material';
import Container from '@mui/material/Container';
import repairs from '../../../../public/services-repair.jpg';
import upgrades from '../../../../public/services-upgrade.jpg';
import screen from '../../../../public/services-screen.jpg';
import battery from '../../../../public/services-battery.jpg';
import accessories from '../../../../public/services-accessories.jpg';
import tradeins from '../../../../public/services-trade.jpg';

import SmartphoneIcon from '@mui/icons-material/Smartphone';
import UpgradeIcon from '@mui/icons-material/SystemUpdateAlt';
import ScreenReplacementIcon from '@mui/icons-material/ScreenRotation';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import HeadsetIcon from '@mui/icons-material/Headset';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import Box from '@mui/system/Box';
import { useTranslation } from 'next-i18next';

const ServiceItem = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const ServiceImage = styled('img')(({ theme }) => ({
  width: '80%',
  // Set a fixed height for all images to make them consistent
  height: '200px', // Adjust this value as needed
  objectFit: 'cover', // This will cover the area without stretching the images
  marginBottom: theme.spacing(2),
  borderRadius: '10px',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(1),
}));

// Styled component for the shape divider container
const CustomShapeDividerBottom = styled('div')({
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: '100%',
  overflow: 'hidden',
  lineHeight: 0,
  transform: 'rotate(180deg)',
});

// Styled component for the SVG
const ShapeSVG = styled('svg')({
  position: 'relative',
  display: 'block',
  width: 'calc(258% + 1.3px)', // Adjust as necessary
  height: '150px', // Adjust as necessary
});

// Styled component for the path inside the SVG
const ShapeFill = styled('path')({
  fill: '#FFFFFF',
});

const ShapeDivider = () => {
  return (
    <CustomShapeDividerBottom>
      <ShapeSVG
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <ShapeFill d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
      </ShapeSVG>
    </CustomShapeDividerBottom>
  );
};

const ServicesSection = () => {
  const { t } = useTranslation();

  const services = [
    {
      title: t('SERVICES.SMARTPHONE_REPAIRS.TITLE'),
      imageUrl: repairs.src,
      icon: <SmartphoneIcon />,
      description: t('SERVICES.SMARTPHONE_REPAIRS.DESCRIPTION'),
    },
    {
      title: t('SERVICES.DEVICE_UPGRADES.TITLE'),
      imageUrl: upgrades.src,
      icon: <UpgradeIcon />,
      description: t('SERVICES.DEVICE_UPGRADES.DESCRIPTION'),
    },
    {
      title: t('SERVICES.SCREEN_REPLACEMENTS.TITLE'),
      imageUrl: screen.src,
      icon: <ScreenReplacementIcon />,
      description: t('SERVICES.SCREEN_REPLACEMENTS.DESCRIPTION'),
    },
    {
      title: t('SERVICES.BATTERY_REPLACEMENTS.TITLE'),
      imageUrl: battery.src,
      icon: <BatteryChargingFullIcon />,
      description: t('SERVICES.BATTERY_REPLACEMENTS.DESCRIPTION'),
    },
    {
      title: t('SERVICES.ACCESSORIES.TITLE'),
      imageUrl: accessories.src,
      icon: <HeadsetIcon />,
      description: t('SERVICES.ACCESSORIES.DESCRIPTION'),
    },
    {
      title: t('SERVICES.TRADE_INS.TITLE'),
      imageUrl: tradeins.src,
      icon: <SwapHorizIcon />,
      description: t('SERVICES.TRADE_INS.DESCRIPTION'),
    },
  ];

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
            <Grid item xs={12} sm={6} md={4} key={index}>
              <ServiceItem>
                <ServiceImage src={service.imageUrl} alt={service.title} />
                <Box sx={{ display: 'flex' }}>
                  <Box marginRight={2}>{service.icon}</Box>
                  <Typography variant="h6" gutterBottom>
                    {service.title}
                  </Typography>
                </Box>
                <Typography variant="body1" align="center" gutterBottom>
                  {service.description}
                </Typography>
              </ServiceItem>
            </Grid>
          ))}
        </Grid>
      </Container>
      {/* TODO add a nice curve here */}
      <ShapeDivider />
    </section>
  );
};

export default ServicesSection;

import React from 'react';
import { styled } from '@mui/material/styles';
import { Grid, Paper, Typography, Button } from '@mui/material';
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

const services = [
  {
    title: 'Smartphone Repairs',
    imageUrl: repairs.src,
    icon: <SmartphoneIcon />,
    description:
      "Expert repair services to fix your smartphone's hardware and software issues promptly.",
  },
  {
    title: 'Device Upgrades',
    imageUrl: upgrades.src,
    icon: <UpgradeIcon />,
    description:
      'Elevate your tech experience with our latest device upgrades for improved performance and features.',
  },
  {
    title: 'Screen Replacements',
    imageUrl: screen.src,
    description:
      'Get quick and reliable screen replacement services for cracked or unresponsive touchscreens.',
    icon: <ScreenReplacementIcon />,
  },
  {
    title: 'Battery Replacements',
    imageUrl: battery.src,
    description:
      'Extend the life of your devices with our professional battery replacement services.',
    icon: <BatteryChargingFullIcon />,
  },
  {
    title: 'Accessories',
    imageUrl: accessories.src,
    description:
      'Discover a wide range of accessories to complement and enhance your electronic devices.',
    icon: <HeadsetIcon />,
  },
  {
    title: 'Trade-Ins',
    imageUrl: tradeins.src,
    description:
      'Swap your old devices for store credit towards cutting-edge tech, or simply sell them for a hassle-free cash return.',
    icon: <SwapHorizIcon />,
  },
];

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
  return (
    // Add very light gray background color
    <section
      style={{
        position: 'relative',
        padding: 30,
        backgroundColor: '#f5f5f5',
      }}
    >
      <Grid container spacing={2} sx={{ paddingBottom: 20 }}>
        <Grid item xs={12}>
          <Typography variant="h2" align="center" gutterBottom>
            Services
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
      {/* TODO add a nice curve here */}
      <ShapeDivider />
    </section>
  );
};

export default ServicesSection;

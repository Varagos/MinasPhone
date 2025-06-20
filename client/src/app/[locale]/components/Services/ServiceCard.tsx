import { StaticImageData } from 'next/image';
import React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/system/Box';
import Image from 'next/image';

const ServiceItem = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

type ServiceCardProps = {
  title: string;
  imageUrl: StaticImageData;
  icon: React.JSX.Element;
  description: string;
  backgroundColor: string;
};

const ImageContainer = styled(Box)(({ theme }) => ({
  width: '80%',
  //   height: '200px',
  position: 'relative',
  marginBottom: theme.spacing(2),

  height: 0, // This will be overridden by paddingBottom
  paddingBottom: '56.25%', // Aspect ratio 16:9, adjust as needed
  backgroundColor: 'white',
  borderRadius: '10px',

  //   backgroundColor: 'yourChoiceOfColor', // Set the background color
}));

const ServiceCard = (props: ServiceCardProps) => {
  const { imageUrl, title, icon, description, backgroundColor } = props;
  return (
    <Grid
      size={{
        xs: 12,
        sm: 6,
        md: 4,
      }}
    >
      <ServiceItem>
        <ImageContainer
          style={{
            backgroundColor, //: 'rgba(255,255,255,255)',
          }}
        >
          <Image
            src={imageUrl}
            alt={title}
            fill
            style={{
              objectFit: 'contain',
              borderRadius: '10px',
            }}
          />
        </ImageContainer>

        <Box sx={{ display: 'flex' }}>
          <Box marginRight={2}>{icon}</Box>
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
        </Box>
        <Typography variant="body1" align="center" gutterBottom>
          {description}
        </Typography>
      </ServiceItem>
    </Grid>
  );
};

export default ServiceCard;

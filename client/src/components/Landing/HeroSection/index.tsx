import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography, Button } from '@mui/material';
import bg from '../../../../public/hero-section-apple-standing.jpeg';

const HeroSection = styled('section')(({ theme }) => ({
  width: '100%',
  backgroundImage: `url(${bg.src})`,
  backgroundSize: '100% auto',
  backgroundRepeat: 'no-repeat',
  minHeight: '80vh',
  display: 'flex',
  flexDirection: 'row',
  padding: '7%',
  textAlign: 'left',

  position: 'relative', // Needed for absolute positioning of pseudo-elements
  overflow: 'hidden', // Prevents content from spilling out

  '&::before': {
    // This is the pseudo-element for the white overlay
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Adjust the opacity as needed
    zIndex: 1, // Ensure it's above the background image but below the content
  },

  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(0), // Smaller padding on smaller screens
  },
}));

const HeroContent = styled(Box)(({ theme }) => ({
  zIndex: 2,
  width: '50%', // Full width by default
  height: '100%',
  [theme.breakpoints.down('md')]: {
    width: '100%', // Full width on medium devices and down
    padding: theme.spacing(4), // Smaller padding on smaller screens
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2), // Even smaller padding on small devices
  },
}));

const HeroText = styled(Typography)(({ theme }) => ({
  color: '#000',
  marginBottom: '20px',
  fontWeight: 800,
  fontSize: '3.5rem',
  [theme.breakpoints.down('md')]: {
    width: '100%', // Full width on medium devices and down
    fontSize: '2rem', // Smaller font size on medium devices
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.5rem', // Even smaller font size on small devices
  },
  [theme.breakpoints.down('xs')]: {
    fontSize: '1rem', // Smallest font size on extra small devices
  },
}));

const HeroSubText = styled(Typography)(({ theme }) => ({
  color: '#000',
  marginBottom: '40px', // Adjust as needed
  fontWeight: 300,
  fontSize: '2rem', // Adjust the font size as needed
  [theme.breakpoints.down('md')]: {
    fontSize: '1.75rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.0rem',
  },
  [theme.breakpoints.down('xs')]: {
    fontSize: '0.75rem',
  },
}));

const HeroButton = styled(Button)(({ theme }) => ({
  padding: '10px 25px',
  backgroundColor: '#333',
  color: '#fff',
  textTransform: 'none',
  fontWeight: 700,
  fontSize: '1rem',
  '&:hover': {
    backgroundColor: '#000',
  },
  // Add media for mobile, to make it full width
  '@media (max-width: 600px)': {
    width: '100%', // Full width
  },
  [theme.breakpoints.down('sm')]: {
    padding: '8px 20px', // Smaller padding on small devices
    fontSize: '0.875rem', // Smaller font size on small devices
  },
}));

// On tablet and down, remove it
const DesktopLineBreak = styled('br')(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const CustomShapeDividerBottom = styled('div')({
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: '100%',
  overflow: 'hidden',
  lineHeight: 0,

  '& svg': {
    position: 'relative',
    display: 'block',
    width: 'calc(114% + 1.3px)',
    height: '91px',
  },

  '& .shape-fill': {
    fill: '#FFFFFF',
  },
});

export function ShapeDividerBottom() {
  return (
    <CustomShapeDividerBottom>
      <svg
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
          className="shape-fill"
        ></path>
      </svg>
    </CustomShapeDividerBottom>
  );
}

export default function Hero() {
  return (
    <HeroSection>
      <HeroContent>
        <HeroText variant="h2">
          Upgrade Your <DesktopLineBreak /> Smartphone
        </HeroText>

        <HeroSubText variant="subtitle1">
          Discover the latest electronics at MinasPhone and enhance your mobile
          experience.
        </HeroSubText>
        <HeroButton variant="contained">Shop Now</HeroButton>
      </HeroContent>
      <ShapeDividerBottom />
    </HeroSection>
  );
}

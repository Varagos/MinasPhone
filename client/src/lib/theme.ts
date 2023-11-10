import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    // Primary color - used mainly for navigation, buttons, etc.
    primary: {
      main: '#6A2C70', // Main shade
      light: '#9C5391', // A lighter shade for hover or active states
      dark: '#4C1951', // A darker shade for text or backgrounds
    },
    // Secondary color - used for accents and secondary elements
    secondary: {
      main: '#FFCE2A', // Main shade
      light: '#FFDE5C', // A lighter shade for hover or active states
      dark: '#E5A900', // A darker shade for text or backgrounds
    },
    // Neutral colors - used for background, text, borders, etc.
    background: {
      default: '#FFFFFF', // White for main background
      // paper: '#F2F2F2', // Light Grey for card-like components
    },
    text: {
      primary: '#424242', // Dark Grey for primary text
      secondary: '#9E9E9E', // Medium Grey for secondary text
    },
    divider: '#9E9E9E', // Medium Grey for borders/dividers
  },
  typography: {
    fontFamily: ['Roboto', 'sans-serif'].join(','),
  },
});

export default theme;
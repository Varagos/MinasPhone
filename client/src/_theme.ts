'use client';
import { createTheme } from '@mui/material/styles';

// https://colorhunt.co/palette/f9f7f7dbe2ef3f72af112d4e
// Winter color palette from Color Hunt
const CulturedWhite = '#F9F7F7';
const AzureishWhite = '#DBE2EF';
const SteelBlue = '#3F72AF';
const SpaceCadetNavy = '#112D4E';

const theme = createTheme({
  palette: {
    primary: {
      main: SteelBlue, // Blue shade for primary elements
      light: AzureishWhite, // Very light blue for lighter primary elements
      dark: SpaceCadetNavy, // Navy for dark primary elements
      contrastText: CulturedWhite, // Text on primary background
    },
    secondary: {
      main: CulturedWhite, // Whitish shade for secondary elements
      light: '#FFFFFF', // White for lighter secondary elements
      dark: AzureishWhite, // Very light blue for dark secondary elements
      contrastText: SpaceCadetNavy, // Text on secondary background
    },
    background: {
      default: '#FFFFFF', // White for main background
      // The paper color will fall back to MUI's default if not explicitly set
    },
    text: {
      primary: '#000000', // Black for primary text for best readability
      secondary: 'rgba(0, 0, 0, 0.54)', // Standard MUI gray for secondary text
    },
    divider: AzureishWhite, // Very light blue for borders/dividers
    error: {
      main: '#D32F2F', // Optional: error color if you use one
    },
    warning: {
      main: '#FFA000', // Optional: warning color if you use one
    },
    info: {
      main: '#1976D2', // Optional: info color if you use one
    },
    success: {
      main: '#388E3C', // Optional: success color if you use one
    },
  },
  typography: {
    fontFamily: 'var(--font-roboto)',
    // Use Noto Sans for all text
    // fontFamily: `"Noto Sans", "Roboto", "Helvetica", "Arial", sans-serif`,
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
  components: {
    // Name of the component
    MuiAppBar: {
      styleOverrides: {
        // Name of the slot
        colorSecondary: {
          // Some CSS
          backgroundColor: CulturedWhite, // AppBar with telephone number
          color: SpaceCadetNavy,
        },
        colorInherit: {
          backgroundColor: SteelBlue, // Main AppBar
          color: CulturedWhite,
        },
      },
    },
  },
});

export default theme;

// In Material-UI (MUI), the theme's primary and secondary colors are used to represent two distinct color intentions
// within your application:

// - Primary Color: This is typically the color displayed most frequently across your screens and components.
// It's used for your app's most important elements, like navigation bars, buttons, links, and active states.
// The primary color can be used to highlight items associated with core tasks or to indicate an active or selected item.

// - Secondary Color: This is used for floating action buttons, selection controls, highlighting secondary actions,
// and providing accents. The secondary color provides a way to distinguish elements that are not as critical as
// those using the primary color.

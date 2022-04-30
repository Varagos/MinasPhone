import { createMuiTheme } from '@mui/material';
import { green, purple } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Routes from './navigation/Routes';
// createMuiTheme

// const theme = createTheme();

export const theme = createTheme({
  mixins: {
    toolbar: {},
  },
  palette: {
    // common: CommonColors;
    // mode: PaletteMode;
    // contrastThreshold: number;
    // tonalOffset: PaletteTonalOffset;
    primary: {
      // light: '#FFCE2A',
      light: '#fff',
      main: '#FFCE2A',
      dark: '#FFCE2A',
      contrastText: '#FFCE2A',
    },
    // secondary: PaletteColor;
    // error: PaletteColor;
    // warning: PaletteColor;
    // info: PaletteColor;
    // success: PaletteColor;
    // grey: Color;
    // text: TypeText;
    // divider: TypeDivider;
    // action: TypeAction;
    background: {
      default: '#f9f9f9',
      paper: '#ffffff',
    },
    // getContrastText: (background: string) => string;
    // augmentColor: (options: PaletteAugmentColorOptions) => PaletteColor;
  },
  // shadows: Shadows;
  // transitions: Transitions;
  // typography: Typography;
  // zIndex: ZIndex;
  // unstable_strictMode?: boolean;
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  );
};

export default App;

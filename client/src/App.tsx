import { createTheme, ThemeProvider } from '@mui/material/styles';
import authInit from './super-tokens';
import Routes from './navigation/Routes';

authInit();

export const theme = createTheme({
  // mixins: {
  //   toolbar: {},
  // },
  // palette: {
  //   primary: {
  //     main: '#F9ED69',
  //   },
  //   secondary: {
  //     main: '#6A2C70',
  //   },
  //   error: {
  //     main: '#B83B5E',
  //   },
  //   info: {
  //     main: '#F08A5D',
  //   },
  //   success: {
  //     main: '#66bb6a',
  //   },
  //   // secondary: PaletteColor;
  //   // error: PaletteColor;
  //   // warning: PaletteColor;
  //   // info: PaletteColor;
  //   // success: PaletteColor;
  //   // grey: Color;
  //   // text: TypeText;
  //   // divider: TypeDivider;
  //   // action: TypeAction;
  //   background: {
  //     default: '#f9f9f9',
  //     paper: '#ffffff',
  //   },
  //   // getContrastText: (background: string) => string;
  //   // augmentColor: (options: PaletteAugmentColorOptions) => PaletteColor;
  // },
  // shadows: Shadows;
  // transitions: Transitions;
  // typography: Typography;
  // zIndex: ZIndex;
  // unstable_strictMode?: boolean;
  components: {
    // MuiTypography: {
    //   variants: [
    //     {
    //       props: {
    //         variant: 'body2',
    //       },
    //       style: {
    //         fontSize: 11,
    //       },
    //     },
    //   ],
    // },
  },
});

export type MainThemeType = typeof theme;

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  );
};

export default App;

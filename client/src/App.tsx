import { createTheme, ThemeProvider } from '@mui/material/styles';
import authInit from './super-tokens';
import Routes from './navigation/Routes';

authInit();

export const theme = createTheme({
  components: {},
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

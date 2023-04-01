import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/lib/theme';
import NewNavbar from '@/components/Navbar/Navbar';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NewNavbar />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;

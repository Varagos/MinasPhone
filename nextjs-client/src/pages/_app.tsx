import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/lib/theme';
import NewNavbar from '@/components/Navbar/Navbar';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { CartProvider } from '@/context/CartProvider';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <CartProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <NewNavbar />
          <main style={{ minHeight: '80vh' }}>
            <Component {...pageProps} />
          </main>
        </ThemeProvider>
      </CartProvider>
    </Provider>
  );
}

export default MyApp;

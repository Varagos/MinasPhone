import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/lib/theme';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { CartProvider } from '@/context/CartProvider';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <main style={{ minHeight: '80vh' }}>
          <Component {...pageProps} />
        </main>
        <Footer />
      </ThemeProvider>
    </CartProvider>
  );
}

export default MyApp;

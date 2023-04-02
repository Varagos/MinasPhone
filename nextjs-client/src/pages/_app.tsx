import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/lib/theme';
import NewNavbar from '@/components/Navbar/Navbar';
import { Provider } from 'react-redux';
import { store, useAppDispatch } from '../redux/store';
import { useEffect } from 'react';
import { fetchCategories } from '@/redux/slices/categories';
import { fetchProducts } from '@/redux/slices/products';
import { fetchCart } from '@/redux/slices/cart';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NewNavbar />
        <main style={{ minHeight: '80vh' }}>
          <Component {...pageProps} />
        </main>
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;

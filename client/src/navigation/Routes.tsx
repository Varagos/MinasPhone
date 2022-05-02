import React, { useState, useEffect } from 'react';
import { Cart as CartType } from '@chec/commerce.js/types/cart';
import { CheckoutCapture } from '@chec/commerce.js/types/checkout-capture';
import { Product } from '@chec/commerce.js/types/product';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { AppBreadcrumb, Cart, Category, Checkout, Footer, Landing, Navbar, ProductsPage } from '../components';
import { commerce } from '../components/lib/commerce';
import Register from '../components/Register/Register';
import CssBaseline from '@mui/material/CssBaseline';
import { useAppDispatch } from '../redux/store';
import { categoriesFetched } from '../redux/categoriesSlice';
import { productsFetched } from '../redux/productsSlice';
import ProductPage from '../components/Category/Products/Product/Product';
import { fetchCart, refreshCart } from '../redux/cartSlice';

const Routes = () => {
  const [products, setProducts] = useState<Product[]>([]);
  // const [cart, setCart] = useState<Partial<CartType>>({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [productsLoading, setProductsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const fetchProducts = async (slug = null) => {
    console.log('fetching products with slug:', slug);

    setProductsLoading(true);
    let data: Product[];
    if (!slug) {
      ({ data } = await commerce.products.list());
    } else {
      ({ data } = await commerce.products.list({
        category_slug: [slug],
      }));
    }

    data = data || [];
    setProducts(data);
    setProductsLoading(false);
    dispatch(productsFetched(JSON.parse(JSON.stringify(data))));
  };

  const handleCaptureCheckout = async (checkoutTokenId: string, newOrder: CheckoutCapture) => {
    try {
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);

      setOrder(incomingOrder);
      dispatch(refreshCart());
    } catch (error) {
      setErrorMessage('There was an error capturing checkout' + (error as any).data.error.message);
    }
  };
  const fetchCategories = async () => {
    const result = await commerce.categories.list();
    console.log('categories:', result);
    dispatch(categoriesFetched(result.data));
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
    // fetchCart();
    dispatch(fetchCart());
  }, []);

  const productsProps = {
    products,
    productsLoading,
    fetchProducts,
  };

  return (
    <Router>
      <div>
        <Navbar />
        <AppBreadcrumb />
        <Switch>
          <Route exact path="/">
            <Landing recommendedProducts={products} />
          </Route>
          <Route exact path="/products">
            <ProductsPage {...productsProps} />
          </Route>
          <Route exact path="/category/:category_id">
            <Category {...productsProps} />
          </Route>
          <Route exact path="/products/:product_id">
            <ProductPage />
          </Route>
          <Route exact path="/cart">
            <Cart />
          </Route>
          <Route exact path="/checkout">
            <Checkout order={order} onCaptureCheckout={handleCaptureCheckout} error={errorMessage} />
          </Route>
          {/* <Route exact path="/register">
            <Register />
          </Route> */}
          <Route render={() => <h1>Not found!</h1>} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
};

export default Routes;

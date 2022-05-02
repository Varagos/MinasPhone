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
import { fetchCart } from '../redux/cartSlice';

const Routes = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Partial<CartType>>({});
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

  // const fetchCart = async () => {
  //   const cart = await commerce.cart.retrieve();

  //   setCart(cart);
  // };

  const handleAddToCart = async (productId: string, quantity: number) => {
    const { cart } = await commerce.cart.add(productId, quantity);

    setCart(cart);
  };

  const handleUpdateCartQty = async (productId: string, quantity: number) => {
    console.log(productId, quantity);
    const { cart } = await commerce.cart.update(productId, { quantity });

    setCart(cart);
  };

  const handleRemoveFromCart = async (productId: string) => {
    const { cart } = await commerce.cart.remove(productId);

    setCart(cart);
  };

  const handleEmptyCart = async () => {
    const { cart } = await commerce.cart.empty();

    setCart(cart);
  };

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();

    setCart(newCart);
  };

  const handleCaptureCheckout = async (checkoutTokenId: string, newOrder: CheckoutCapture) => {
    try {
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);

      setOrder(incomingOrder);
      refreshCart();
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
            <Landing recommendedProducts={products} onAddToCart={handleAddToCart} />
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
            <Cart
              cart={cart}
              handleUpdateCartQty={handleUpdateCartQty}
              handleRemoveFromCart={handleRemoveFromCart}
              handleEmptyCart={handleEmptyCart}
            />
          </Route>
          <Route exact path="/checkout">
            <Checkout cart={cart} order={order} onCaptureCheckout={handleCaptureCheckout} error={errorMessage} />
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

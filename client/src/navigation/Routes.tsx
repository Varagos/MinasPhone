import React, { useState, useEffect } from 'react';
import { CheckoutCapture } from '@chec/commerce.js/types/checkout-capture';
import { Product } from '@chec/commerce.js/types/product';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { AppBreadcrumb, Cart, Category, Checkout, Footer, Landing, Navbar, ProductsPage } from '../components';
import { commerce } from '../components/lib/commerce';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { categoriesFetched, fetchCategories } from '../redux/slices/categories';
import { fetchProducts, fetchProductsByCategorySlug, productsFetched } from '../redux/slices/products';
import ProductPage from '../components/Category/Products/Product/Product';
import { fetchCart, refreshCart } from '../redux/cartSlice';
import { getSuperTokensRoutesForReactRouterDom } from 'supertokens-auth-react';
import * as reactRouterDom from 'react-router-dom';
import { EmailPasswordAuth } from 'supertokens-auth-react/recipe/emailpassword';
import AdminDashboard from '../components/admin-dashboard/AdminDashboard';
import { RequireAdminAuth } from '../components/auth-guards/RequireAdmin';

const AppRoutes = () => {
  // const [products, setProducts] = useState<Product[]>([]);
  // const [cart, setCart] = useState<Partial<CartType>>({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  // const [productsLoading, setProductsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const fetchProductsLocal = async (slug = null) => {
    console.log('fetching products with slug:', slug);

    // setProductsLoading(true);
    // let data: Product[];
    if (!slug) {
      dispatch(fetchProducts());
    } else {
      dispatch(fetchProductsByCategorySlug(slug));
      // ({ data } = await commerce.products.list({
      //   category_slug: [slug],
      // }));
    }

    // data = data || [];
    // setProducts(data);
    // setProductsLoading(false);
    // dispatch(productsFetched(JSON.parse(JSON.stringify(data))));
  };

  const handleCaptureCheckout = async (checkoutTokenId: string, newOrder: CheckoutCapture) => {
    try {
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);

      setOrder(incomingOrder);

      dispatch(refreshCart() as any);
    } catch (error) {
      setErrorMessage('There was an error capturing checkout' + (error as any).data.error.message);
    }
  };

  useEffect(() => {
    dispatch(fetchCategories());
    fetchProductsLocal();
    // fetchCart();
    dispatch(fetchCart());
  }, []);

  const productsProps = {
    // productsLoading,
    fetchProducts,
  };

  return (
    <Router>
      <div>
        <Navbar />
        <AppBreadcrumb />
        <main style={{ minHeight: '80vh' }}>
          <Routes>
            {/*This renders the login UI on the /auth route*/}
            {getSuperTokensRoutesForReactRouterDom(reactRouterDom)}
            <Route path="/" element={<Landing />}></Route>
            <Route path="/products" element={<ProductsPage {...productsProps} />}></Route>
            <Route path="/category/:category_id" element={<Category {...productsProps} />}></Route>
            <Route path="/products/:product_id" element={<ProductPage />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route
              path="/checkout"
              element={<Checkout order={order} onCaptureCheckout={handleCaptureCheckout} error={errorMessage} />}
            ></Route>
            <Route
              path="/dashboard"
              element={
                <RequireAdminAuth>
                  <EmailPasswordAuth>
                    {/*Components that require to be protected by authentication*/}
                    <AdminDashboard />
                  </EmailPasswordAuth>
                </RequireAdminAuth>
              }
            />
            {/* <Route exact path="/register">
            <Register />
          </Route> */}
            <Route element={<h1>Not found!</h1>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default AppRoutes;

import React, { useEffect } from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { AppBreadcrumb, Cart, Category, Checkout, Footer, Landing, Navbar, ProductsPage } from '../components';
import { useAppDispatch } from '../redux/store';
import { fetchCategories } from '../redux/slices/categories';
import { fetchProducts } from '../redux/slices/products';
import ProductPage from '../components/Category/Products/Product/Product';
import { fetchCart } from '../redux/slices/cart';
import { getSuperTokensRoutesForReactRouterDom } from 'supertokens-auth-react';
import * as reactRouterDom from 'react-router-dom';
import { EmailPasswordAuth } from 'supertokens-auth-react/recipe/emailpassword';
import AdminDashboard from '../components/admin-dashboard/AdminDashboard';
import { RequireAdminAuth } from '../components/auth-guards/RequireAdmin';

const AppRoutes = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts());
    dispatch(fetchCart());
  }, []);

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
            <Route path="/products" element={<ProductsPage />}></Route>
            <Route path="/category/:category_id" element={<Category />}></Route>
            <Route path="/products/:product_id" element={<ProductPage />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/checkout" element={<Checkout />}></Route>
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

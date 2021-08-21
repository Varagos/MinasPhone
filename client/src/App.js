import React, { useState, useEffect } from "react";
import { commerce } from "./components/lib/commerce";
import {
  Landing,
  Navbar,
  Cart,
  Checkout,
  Footer,
  AppBreadcrumb,
  Category,
  ProductsPage,
} from "./components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [productsLoading, setProductsLoading] = useState(false);

  const fetchProducts = async (slug = null) => {
    console.log("fetching products with slug:", slug);

    setProductsLoading(true);
    let data;
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
  };

  const fetchCart = async () => {
    const cart = await commerce.cart.retrieve();

    setCart(cart);
  };

  const handleAddToCart = async (productId, quantity) => {
    const { cart } = await commerce.cart.add(productId, quantity);

    setCart(cart);
  };

  const handleUpdateCartQty = async (productId, quantity) => {
    console.log(productId, quantity);
    const { cart } = await commerce.cart.update(productId, { quantity });

    setCart(cart);
  };

  const handleRemoveFromCard = async (productId) => {
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

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);

      setOrder(incomingOrder);
      refreshCart();
    } catch (error) {
      setErrorMessage("There was an error capturing checkout", error.data.error.message);
    }
  };
  const fetchCategories = async () => {
    const category = await commerce.categories.list();
    console.log(category);
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
    fetchCart();
  }, []);

  const productsProps = {
    products,
    productsLoading,
    fetchProducts,
    onAddToCart: handleAddToCart,
  };

  return (
    <Router>
      <div>
        <Navbar totalItems={cart.total_items} />
        <AppBreadcrumb />
        <Switch>
          <Route exact path='/'>
            <Landing />
          </Route>
          <Route exact path='/products'>
            <ProductsPage {...productsProps} />
          </Route>
          <Route exact path='/category/:category_id'>
            <Category {...productsProps} />
          </Route>
          <Route exact path='/cart'>
            <Cart
              cart={cart}
              handleUpdateCartQty={handleUpdateCartQty}
              handleRemoveFromCard={handleRemoveFromCard}
              handleEmptyCart={handleEmptyCart}
            />
          </Route>
          <Route exact path='/checkout'>
            <Checkout
              cart={cart}
              order={order}
              onCaptureCheckout={handleCaptureCheckout}
              error={errorMessage}
            />
          </Route>
          <Route render={() => <h1>Not found!</h1>} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
};

export default App;

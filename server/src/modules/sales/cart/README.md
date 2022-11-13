## Cart

A cart can exist by registered or not registered users

The front end, stores the cart_id in a cookie or w/e.
If it has it, it sends it when requesting a new cart.
if the user is not signed in, new cart is returned for each device he uses.
If the user is signed in

For now the cart is based solely on client cookie.

### No cart_id cookie is passed

Server generates new cart and returns it.

## cart_id cookie is passed

Server checks if the cart is valid, then return its info

TODO [support cross-device](https://paykickstart.com/does-your-cart-support-cross-device-shopping/)

<!-- ## Retrieve cart with no params

A cart is created with unknown user_id. The client stores the cart_id in a cookie/storage and uses it next times.

## Retrieve cart with only cart_id and no user auth

We check if the cart is valid, then return its info

## Retrieve cart with only user auth

We check if the user has a cart connected to him, if yes fetch that, else create a new one and connect it.

We check if the cart is valid, then return its info

## Retrieve cart with cart_id and user auth.

We check if the cart is valid, then return its info. Also we check if the cart is connected to the user.
If not we connect it. -->

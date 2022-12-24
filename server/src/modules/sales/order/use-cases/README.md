# Generate checkout token

generateToken(cartId: string, options: Record<string, string>): Promise<CheckoutToken>;
Initializes the checkout process, any checks on the cart values are done at that point,
If a token is generated, then the order can be fulfilled

// TODO create local type for checkoutCapture, CheckoutCaptureResponse
captureCheckout(checkoutTokenId: string, newOrder: CheckoutCapture): Promise<CheckoutCaptureResponse>;

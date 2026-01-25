import { GoogleMerchantProduct } from '../value-objects/google-merchant-product.value-object';

export interface GoogleMerchantServicePort {
  insertProduct(product: GoogleMerchantProduct): Promise<void>;
  updateProduct(product: GoogleMerchantProduct): Promise<void>;
  deleteProduct(offerId: string): Promise<void>;
  listAllProducts(): Promise<GoogleMerchantProduct[]>;
}

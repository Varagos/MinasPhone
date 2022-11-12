// <?php

import { Money } from './Money';
/**
 * Dynamic Prices
 * Prices are not stored in the Cart itself but are loaded on demand.
 * This is a common use-case because we usually need fresh prices from a database or ERP.
 * Cart is separated from "loading prices" by an interface Prices.
 * This is a domain element but have to be implemented by the project needs - by API calls or database queries.
 */

export interface Prices {
  unitPrice(productId: string): Money;
}

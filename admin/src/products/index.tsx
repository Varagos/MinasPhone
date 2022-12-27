import { ProductCreate } from './ProductCreate';

import InventoryIcon from '@mui/icons-material/Inventory';
// import { ProductList } from './ProductList';
import { ProductEdit } from './ProductEdit';
import ProductList from './newProductList';

const resource = {
  list: ProductList,
  create: ProductCreate,
  edit: ProductEdit,
  icon: InventoryIcon, // ProductIcon,
};
export default resource;

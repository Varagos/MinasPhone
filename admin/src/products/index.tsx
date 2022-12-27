import { ProductCreate } from './ProductCreate';

import InventoryIcon from '@mui/icons-material/Inventory';
import { ProductEdit } from './ProductEdit';
import ProductList from './ProductList';

const resource = {
  list: ProductList,
  create: ProductCreate,
  edit: ProductEdit,
  icon: InventoryIcon, // ProductIcon,
};
export default resource;

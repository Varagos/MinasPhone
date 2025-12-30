import { ProductCreate } from './ProductCreate';

import InventoryIcon from '@mui/icons-material/Inventory';
import { ProductEdit } from './ProductEdit';
import ProductList from './ProductList';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';

const resource = {
  list: ProductList,
  create: ProductCreate,
  edit: ProductEdit,
  icon: PhoneIphoneIcon,
};
export default resource;

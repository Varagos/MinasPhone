import { ProductCreate, ProductEdit, ProductList } from './products';

import InventoryIcon from '@mui/icons-material/Inventory';

const resource = {
  list: ProductList,
  create: ProductCreate,
  edit: ProductEdit,
  icon: InventoryIcon, // ProductIcon,
};
export default resource;

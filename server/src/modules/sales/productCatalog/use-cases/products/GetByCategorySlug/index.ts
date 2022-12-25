import { GetByCategorySlug } from './GetByCategorySlug.js';
import { productRepo } from '../../../repos/index.js';
import { GetByCategorySlugController } from './GetByCategorySlugController.js';

const getByCategorySlug = new GetByCategorySlug(productRepo);
const getProductsByFilter = new GetByCategorySlugController(getByCategorySlug);

export { getProductsByFilter };

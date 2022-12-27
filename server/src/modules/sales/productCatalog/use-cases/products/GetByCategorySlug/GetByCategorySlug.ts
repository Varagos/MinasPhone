import { left } from '../../../../../../shared/core/Result.js';
import { AppError } from '../../../../../../shared/core/AppError.js';
import { Either, Result, right } from '../../../../../../shared/core/Result.js';
import { UseCase } from '../../../../../../shared/core/UseCase.js';
import { IProductRepo } from '../../../repos/productRepo.js';
import { ProductDetails } from '../../../domain/ProductDetails.js';
import { GetProductListRequestDTO } from './GetProductListDTO.js';
import { GetByCategorySlugErrors as GetAllProductsErrors } from './Errors.js';
import { GetListFilter } from '../../../../../../shared/infra/http/models/GetListParams.js';
import { Between, LessThan, MoreThan } from 'typeorm';

type Response = Either<AppError.UnexpectedError, Result<ProductDetails[]>>;

export class GetByCategorySlug
  implements UseCase<GetProductListRequestDTO, Promise<Response>>
{
  private productRepo: IProductRepo;

  constructor(productRepo: IProductRepo) {
    this.productRepo = productRepo;
  }
  async execute(request: GetProductListRequestDTO): Promise<Response> {
    try {
      const sortByField = request.sort?.[0];

      if (sortByField) {
        const allowedFields = ['id'];
        if (!allowedFields.includes(sortByField)) {
          return left(new GetAllProductsErrors.InvalidSortByField(sortByField));
        }
      }

      if (request.filter) {
        const allowedFields = this.allowedFilterFields;
        const filterFields = Object.keys(request.filter);

        const unacceptableFields = filterFields.filter(
          (field) => !allowedFields.includes(field),
        );
        if (unacceptableFields.length > 0)
          return left(
            new GetAllProductsErrors.InvalidFilterFields(...unacceptableFields),
          );
        request.filter = this.filterParamsMapping(filterFields, request.filter);
      }

      const products = await this.productRepo.getAll(request);
      return right(Result.ok(products));
    } catch (err: any) {
      return left(new AppError.UnexpectedError(err));
    }
  }

  private get allowedFilterFields() {
    return [
      'id',
      'category_slug',
      'category_id',
      'stock_lt',
      'stock_gt',
      'stock',
      // 'sales_lte',
      // 'sales_gt',
      // 'sales',
    ];
  }

  private filterParamsMapping(filterFields: string[], filter: GetListFilter) {
    const newFilter: Record<string, any> = {};
    for (const field of filterFields) {
      switch (field) {
        case 'category_slug': {
          const slug = filter.category_slug;
          newFilter.category = {
            ...newFilter.category,
            slug,
          };
          break;
        }
        case 'category_id': {
          const id = filter.category_id;
          newFilter.category = {
            ...newFilter.category,
            id,
          };
          break;
        }
        case 'stock_lt': {
          const stock_lt = filter.stock_lt;
          const stock_gt = filter.stock_gt;
          if (stock_gt !== undefined) {
            newFilter.quantity = Between(+stock_gt + 1, +stock_lt - 1);
          } else {
            newFilter.quantity = LessThan(stock_lt);
          }
          break;
        }
        case 'stock_gt': {
          const stock_lt = filter.stock_lt;
          const stock_gt = filter.stock_gt;
          if (stock_gt !== undefined) {
            newFilter.quantity = Between(+stock_gt + 1, +stock_lt - 1);
          } else {
            newFilter.quantity = MoreThan(stock_gt);
          }
          break;
        }
        case 'stock': {
          newFilter.quantity = filter.stock;
          break;
        }
        case 'sales_lte': {
          const sales_lte = filter.sales_lte;
          break;
        }
        default:
          newFilter[field] = filter[field];
      }
    }
    return newFilter;
  }
}
// type StockFilter = {
//   stock_lt: number;
//   stock_gt: number;
//   stock: number;
// };

// type SalesFilter = {
//   sales_lte: number;
//   sales_gt: number;
//   sales: number;
// };

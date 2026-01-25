import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Ok, Result } from 'oxide.ts';
import { InjectPool } from 'nestjs-slonik';
import {
  DatabasePool,
  ListSqlToken,
  QueryResultRow,
  SchemaValidationError,
  SqlSqlToken,
  sql,
} from 'slonik';
import { FindProductsQuery } from './find-products.query';
import { Paginated } from '@libs/ddd/index';
import {
  ProductModel,
  productSchema,
} from '@modules/product-catalog/infra/database/product.repository';
import { Logger, NotFoundException } from '@nestjs/common';
import { categorySchema } from '@modules/product-catalog/infra/database/category.repository';

export type FindProductsResponse = Result<Paginated<ProductModel>, Error>;

// Mapping from API fields to database columns
const fieldToColumnMapping: Record<string, string> = {
  slug: 'slug',
  name: 'name',
  price: 'price',
  quantity: 'quantity',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  id: 'id',
  reference: 'reference',
};

@QueryHandler(FindProductsQuery)
export class FindProductsQueryHandler
  implements IQueryHandler<FindProductsQuery>
{
  private readonly logger = new Logger(FindProductsQueryHandler.name);
  constructor(
    @InjectPool()
    private readonly pool: DatabasePool,
  ) {}

  /**
   * In read model we don't need to execute
   * any business logic, so we can bypass
   * domain and repository layers completely
   * and execute query directly
   */
  async execute(query: FindProductsQuery): Promise<FindProductsResponse> {
    let sortClause = sql``;
    if (typeof query.orderBy.field === 'string') {
      const sortField = fieldToColumnMapping[query.orderBy.field];
      const sortOrder = query.orderBy.param;
      if (sortField && ['asc', 'desc'].includes(sortOrder)) {
        // console.log(sortOrder);
        sortClause =
          sortOrder === 'asc'
            ? sql`ORDER BY ${sql.identifier([sortField])} ASC `
            : sql`ORDER BY ${sql.identifier([sortField])} DESC `;
      }
    } // else: default to no sorting, or specify a default sort field here
    let categoryId = query.categoryId;
    if (!categoryId && query.categorySlug) {
      categoryId = await this.findCategoryIdBySlug(query.categorySlug);
    }

    /**
     * Constructing a query with Slonik.
     * More info: https://contra.com/p/AqZWWoUB-writing-composable-sql-using-java-script
     */
    const whereClauses = [];
    if (query.slug) {
      whereClauses.push(sql`p.slug = ${query.slug}`);
    }
    if (categoryId) {
      whereClauses.push(sql`p.category_id = ${categoryId}`);
    }
    const priceWhereClause = await this.calculatePriceWhereClause(query);
    if (priceWhereClause) {
      whereClauses.push(priceWhereClause);
    }
    if (query.name) {
      whereClauses.push(sql`p.name ILIKE ${'%' + query.name + '%'}`);
    }

    // Add attribute filters
    if (query.attributeFilters) {
      for (const [attributeId, valueIds] of Object.entries(
        query.attributeFilters,
      )) {
        if (valueIds && valueIds.length > 0) {
          whereClauses.push(sql`
            EXISTS (
              SELECT 1 FROM product_attribute_values pav
              WHERE pav.product_id = p.id
              AND pav.attribute_id = ${attributeId}
              AND pav.attribute_value_id = ANY(${sql.array(valueIds, 'uuid')})
            )
          `);
        }
      }
    }

    // Join all where clauses with AND
    const whereClause =
      whereClauses.length === 0
        ? sql`TRUE`
        : sql.join(whereClauses, sql` AND `);
    const statement = sql.type(productSchema)`
         SELECT
           p.*,
           COALESCE(
             (
               SELECT json_object_agg(
                 attribute_id::text,
                 attribute_values
               )
               FROM (
                 SELECT
                   pav.attribute_id,
                   json_agg(
                     json_build_object(
                       'value_id', pav.attribute_value_id,
                       'text_value', pav.text_value,
                       'numeric_value', pav.numeric_value,
                       'boolean_value', pav.boolean_value
                     )
                   ) as attribute_values
                 FROM product_attribute_values pav
                 WHERE pav.product_id = p.id
                 GROUP BY pav.attribute_id
               ) grouped
             ),
             '{}'::json
           ) AS attribute_values
         FROM products p
         WHERE ${whereClause}
           ${sortClause}
         LIMIT ${query.limit}
         OFFSET ${query.offset}`;

    try {
      const records = await this.pool.query(statement);
      const count = await this.getTotalProductsCount(whereClause);
      return Ok(
        new Paginated({
          data: records.rows,
          count,
          limit: query.limit,
          page: query.page,
        }),
      );
    } catch (e) {
      if (e instanceof SchemaValidationError) {
        console.error(e.issues);
      }
      this.logger.error(e);
      throw e;
    }
  }

  private async getTotalProductsCount(
    whereClause: ListSqlToken | SqlSqlToken<QueryResultRow>,
  ): Promise<number> {
    const totalProductsStatement = sql`
          SELECT COUNT(*)
          FROM products p
          WHERE ${whereClause}
    `;

    const totalProducts = await this.pool.query(totalProductsStatement);
    return totalProducts.rows[0].count as number;
  }

  private async findCategoryIdBySlug(slug: string): Promise<string> {
    const categoryStatement = sql.type(categorySchema)`
    SELECT *
    FROM categories
    WHERE
      ${sql`slug = ${slug}`}`;

    const categoryResult = await this.pool.maybeOne(categoryStatement);
    if (!categoryResult) {
      throw new NotFoundException();
    }
    const categoryId = categoryResult.id;
    return categoryId;
  }

  private async calculatePriceWhereClause(
    query: FindProductsQuery,
  ): Promise<SqlSqlToken<QueryResultRow> | null> {
    if (query.price_gte !== undefined && query.price_lte !== undefined) {
      return sql`p.price BETWEEN ${query.price_gte} AND ${query.price_lte}`;
    } else if (query.price_gte !== undefined) {
      return sql`p.price >= ${query.price_gte}`;
    } else if (query.price_lte !== undefined) {
      return sql`p.price <= ${query.price_lte}`;
    }
    // null when no price constraints are specified
    return null;
  }
}

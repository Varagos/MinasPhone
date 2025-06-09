/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export type CreateAnalyticsDto = object;

export type UpdateAnalyticsDto = object;

export interface FindUsersDto {
  /**
   * The email of the user to filter by
   * @example "johndoe@example.com"
   */
  email?: string;
}

export interface UserResponseDto {
  /** @example "2cdc8ab1-6d50-49cc-ba14-54e4ac7ec231" */
  id: string;
  /** @example "2020-11-24T17:43:15.970Z" */
  createdAt: string;
  /** @example "2020-11-24T17:43:15.970Z" */
  updatedAt: string;
  /**
   * The user's email
   * @example "example@email.com"
   */
  email: string;
}

export interface UserPaginatedResponseDto {
  /**
   * Total number of items
   * @example 5312
   */
  count: number;
  /**
   * Number of items per page
   * @example 10
   */
  limit: number;
  /**
   * Page number
   * @example 0
   */
  page: number;
  data: UserResponseDto[];
}

export type ApiResponse = object;

export interface CreateCategoryRequestDto {
  /**
   * The slug of the category to filter by
   * @example "electronics"
   */
  slug: string;
  /**
   * The name of the category to filter by
   * @example "Electronics"
   */
  name: string;
  /**
   * The UUID of the parent category to filter by
   * @example "c7b58d20-92a7-4e72-8da7-82971a1a9f4f"
   */
  parentId?: string;
}

export interface IdResponse {
  /** @example "2cdc8ab1-6d50-49cc-ba14-54e4ac7ec231" */
  id: string;
}

export interface ApiErrorResponse {
  /** @example 400 */
  statusCode: number;
  /** @example "Validation Error" */
  message: string;
  /** @example "Bad Request" */
  error: string;
  /** @example "YevPQs" */
  correlationId: string;
  /**
   * Optional list of sub-errors
   * @example ["incorrect email"]
   */
  subErrors?: string[] | null;
}

export interface UpdateCategoryRequestDto {
  /**
   * The slug of the category to update
   * @example "electronics"
   */
  slug?: string;
  /**
   * The name of the category to filter by
   * @example "Electronics"
   */
  name?: string;
  /**
   * The UUID of the parent category to filter by
   * @example "c7b58d20-92a7-4e72-8da7-82971a1a9f4f"
   */
  parentId?: string;
}

export interface FindCategoriesDto {
  /**
   * The slug of the category to filter by
   * @example "electronics"
   */
  slug?: string;
  /**
   * The name of the category to filter by
   * @example "Electronics"
   */
  name?: string;
  /**
   * The UUID of the parent category to filter by
   * @example "c7b58d20-92a7-4e72-8da7-82971a1a9f4f"
   */
  parentId?: string;
}

export interface CategoryResponseDto {
  /** @example "2cdc8ab1-6d50-49cc-ba14-54e4ac7ec231" */
  id: string;
  /** @example "2020-11-24T17:43:15.970Z" */
  createdAt: string;
  /** @example "2020-11-24T17:43:15.970Z" */
  updatedAt: string;
  /**
   * Category's slug
   * @example "products"
   */
  slug: string;
  /**
   * Category's name
   * @example "Products"
   */
  name: string;
  /** Optional parent category id */
  parentId: object;
}

export interface CategoryPaginatedResponseDto {
  /**
   * Total number of items
   * @example 5312
   */
  count: number;
  /**
   * Number of items per page
   * @example 10
   */
  limit: number;
  /**
   * Page number
   * @example 0
   */
  page: number;
  data: CategoryResponseDto[];
}

export interface CreateProductRequestDto {
  /**
   * The name of the product to create
   * @example "Apple MacBook Pro"
   */
  name: string;
  /**
   * The description of the product to create
   * @example "This is a great laptop for professionals"
   */
  description: string;
  /**
   * The price of the product to create
   * @example 1999.99
   */
  price: number;
  /**
   * The quantity of the product
   * @example 10
   */
  quantity: number;
  /**
   * Indicates whether the product is active or not
   * @example true
   */
  active: boolean;
  /**
   * The base64-encoded image of the product to create. The output format must be data:content_type;base64,encoded_string.
   *     You can use https://base64.guru/converter/encode/image to encode an image to base64, select the output format as Data URI
   * @example "data:image/jpeg;base64,/9j/4AAQSkZJRg...<truncated for brevity>"
   */
  image: string;
  /**
   * The SKU of the product
   * @example "prod_g7F54H"
   */
  sku: string;
  /**
   * The UUID of the category the product belongs to
   * @example "c7b58d20-92a7-4e72-8da7-82971a1a9f4f"
   */
  categoryId?: string;
}

export interface UpdateProductRequestDto {
  /**
   * The name of the product
   * @example "Product Name"
   */
  name?: string;
  /**
   * The description of the product
   * @example "Product description"
   */
  description?: string;
  /**
   * The quantity of the product
   * @example 10
   */
  quantity?: number;
  /**
   * The price of the product
   * @example 9.99
   */
  price?: number;
  /**
   * The status of the product (active or inactive)
   * @example true
   */
  active?: boolean;
  /**
   * The SKU (Stock Keeping Unit) of the product
   * @example "12345"
   */
  sku?: string;
  /**
   * The UUID of the category the product belongs to
   * @example "c7b58d20-92a7-4e72-8da7-82971a1a9f4f"
   */
  categoryId?: string;
  /**
   * The image of the product in base64-encoded format
   * @example "base64 encoded image data"
   */
  image?: string;
}

export interface FindProductsRequestDto {
  /**
   * The slug of the product 1to filter by
   * @example "iphone-12"
   */
  slug?: string;
  /**
   * The UUID of the category to filter by
   * @example "c7b58d20-92a7-4e72-8da7-82971a1a9f4f"
   */
  categoryId?: string;
}

export interface ProductResponseDto {
  /** @example "2cdc8ab1-6d50-49cc-ba14-54e4ac7ec231" */
  id: string;
  /** @example "2020-11-24T17:43:15.970Z" */
  createdAt: string;
  /** @example "2020-11-24T17:43:15.970Z" */
  updatedAt: string;
  /**
   * Product's name
   * @example "Cool Product"
   */
  name: string;
  /**
   * Product's description
   * @example "A very cool product"
   */
  description: string;
  /**
   * Product's slug
   * @example "cool-product"
   */
  slug: string;
  /**
   * Product's price
   * @example 9.99
   */
  price: number;
  /**
   * Product's quantity
   * @example 10
   */
  quantity: number;
  /**
   * Whether the product is active or not
   * @example true
   */
  active: boolean;
  /**
   * URL for the product's image
   * @example "http://example.com/image.jpg"
   */
  imageUrl: string;
  /**
   * Category's id
   * @example "1d239fa7-5102-4c0d-b99d-bfc9fa1d867f"
   */
  categoryId: string;
}

export interface ProductPaginatedResponseDto {
  /**
   * Total number of items
   * @example 5312
   */
  count: number;
  /**
   * Number of items per page
   * @example 10
   */
  limit: number;
  /**
   * Page number
   * @example 0
   */
  page: number;
  data: ProductResponseDto[];
}

export interface ProductSlugResponseDto {
  /** Product's unique identifier, typically a UUID */
  id: string;
  /**
   * Product's slug
   * @example "cool-product"
   */
  slug: string;
  /** @example "2020-11-24T17:43:15.970Z" */
  updatedAt: string;
}

export interface ProductSlugsPaginatedResponseDto {
  /**
   * Total number of items
   * @example 5312
   */
  count: number;
  /**
   * Number of items per page
   * @example 10
   */
  limit: number;
  /**
   * Page number
   * @example 0
   */
  page: number;
  data: ProductSlugResponseDto[];
}

export interface AddCartItemRequestDto {
  /**
   * The product id to add
   * @example "c7b58d20-92a7-4e72-8da7-82971a1a9f4f"
   */
  productId: string;
  /**
   * The quantity of the line item
   * @example "1"
   */
  quantity: number;
}

export interface UpdateCartLineItemRequestDto {
  /**
   * The new quantity of the line item
   * @example "1"
   */
  quantity: string;
}

export interface CartLineItemDto {
  id: string;
  productId: string;
  quantity: number;
  productName: string;
  productSlug: string;
  productPrice: number;
  productImage: string;
}

export interface CartResponseDto {
  /** @example "2cdc8ab1-6d50-49cc-ba14-54e4ac7ec231" */
  id: string;
  /** @example "2020-11-24T17:43:15.970Z" */
  createdAt: string;
  /** @example "2020-11-24T17:43:15.970Z" */
  updatedAt: string;
  /** Cart total items */
  totalItems: number;
  /** Cart subtotal */
  subtotal: number;
  lineItems: CartLineItemDto[];
}

export interface CheckoutOrderRequestDto {
  /**
   * The buyer's first name
   * @example "John"
   */
  firstName: string;
  /**
   * The buyer's last name
   * @example "Doe"
   */
  lastName: string;
  /**
   * The buyer's email
   * @example "example@email.org"
   */
  email: string;
  /** The buyer phone number, must be prefixed with country code, e.g. +30 for Greece */
  phone: string;
}

export interface OrderResponseDto {
  /** @example "2cdc8ab1-6d50-49cc-ba14-54e4ac7ec231" */
  id: string;
  /** @example "2020-11-24T17:43:15.970Z" */
  createdAt: string;
  /** @example "2020-11-24T17:43:15.970Z" */
  updatedAt: string;
  /**
   * Order id
   * @example "ord_123456789"
   */
  slug: string;
  /**
   * Order status
   * @example "pending"
   */
  status: "pending" | "delivered" | "cancelled";
  /** Order line items */
  lineItems: string[];
  /** Order contact info */
  contactInfo: object;
  /**
   * Order total
   * @example 100
   */
  total: number;
}

export interface OrderPaginatedResponseDto {
  /**
   * Total number of items
   * @example 5312
   */
  count: number;
  /**
   * Number of items per page
   * @example 10
   */
  limit: number;
  /**
   * Page number
   * @example 0
   */
  page: number;
  data: OrderResponseDto[];
}

export interface UpdateOrderStatusRequestDto {
  /** @example "completed" */
  status?: string;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => "undefined" !== typeof query[key],
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key),
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.JsonApi]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== "string"
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams,
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (
    cancelToken: CancelToken,
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { "Content-Type": type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === "undefined" || body === null
            ? null
            : payloadFormatter(body),
      },
    ).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      return data;
    });
  };
}

/**
 * @title Minas Phone API
 * @version 1.0
 * @contact
 *
 * The minas phone API description
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @name AnalyticsControllerCreate
     * @request POST:/api/analytics
     */
    analyticsControllerCreate: (
      data: CreateAnalyticsDto,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/analytics`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name AnalyticsControllerFindAll
     * @request GET:/api/analytics
     */
    analyticsControllerFindAll: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/analytics`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @name AnalyticsControllerFindOne
     * @request GET:/api/analytics/{id}
     */
    analyticsControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/analytics/${id}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @name AnalyticsControllerUpdate
     * @request PATCH:/api/analytics/{id}
     */
    analyticsControllerUpdate: (
      id: string,
      data: UpdateAnalyticsDto,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/analytics/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name AnalyticsControllerRemove
     * @request DELETE:/api/analytics/{id}
     */
    analyticsControllerRemove: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/analytics/${id}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description This route can only be accessed by admins.
     *
     * @tags users
     * @name UsersControllerFindAll
     * @summary Find users
     * @request GET:/api/v1/users
     */
    usersControllerFindAll: (
      data: FindUsersDto,
      query?: {
        /**
         * Specifies a limit of returned records
         * @example 10
         */
        limit?: number;
        /**
         * Page number
         * @example 0
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<UserPaginatedResponseDto, any>({
        path: `/api/v1/users`,
        method: "GET",
        query: query,
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersControllerFindOne
     * @summary Find one user
     * @request GET:/api/v1/users/{id}
     */
    usersControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<UserResponseDto, ApiResponse>({
        path: `/api/v1/users/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersControllerRemove
     * @summary Delete one user
     * @request DELETE:/api/v1/users/{id}
     */
    usersControllerRemove: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/users/${id}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description This route can only be accessed by admins. It is used to create a new Category.
     *
     * @tags categories
     * @name CategoriesHttpControllerCreate
     * @summary Create a Category
     * @request POST:/api/v1/categories
     */
    categoriesHttpControllerCreate: (
      data: CreateCategoryRequestDto,
      params: RequestParams = {},
    ) =>
      this.request<IdResponse, ApiErrorResponse>({
        path: `/api/v1/categories`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags categories
     * @name CategoriesHttpControllerFindCategories
     * @summary Find categories
     * @request GET:/api/v1/categories
     */
    categoriesHttpControllerFindCategories: (
      data: FindCategoriesDto,
      query?: {
        /**
         * Specifies a limit of returned records
         * @example 10
         */
        limit?: number;
        /**
         * Page number
         * @example 0
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<CategoryPaginatedResponseDto, any>({
        path: `/api/v1/categories`,
        method: "GET",
        query: query,
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description This route can only be accessed by admins. It is used to update a Category.
     *
     * @tags categories
     * @name CategoriesHttpControllerUpdateOne
     * @summary Update a Category
     * @request PUT:/api/v1/categories/{id}
     */
    categoriesHttpControllerUpdateOne: (
      id: string,
      data: UpdateCategoryRequestDto,
      params: RequestParams = {},
    ) =>
      this.request<IdResponse, ApiErrorResponse>({
        path: `/api/v1/categories/${id}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description This route can only be accessed by admins. It is used to delete a Category.
     *
     * @tags categories
     * @name CategoriesHttpControllerDelete
     * @summary Delete a category
     * @request DELETE:/api/v1/categories/{id}
     */
    categoriesHttpControllerDelete: (id: string, params: RequestParams = {}) =>
      this.request<IdResponse, ApiErrorResponse>({
        path: `/api/v1/categories/${id}`,
        method: "DELETE",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags categories
     * @name CategoriesHttpControllerFindOne
     * @summary Find category by id
     * @request GET:/api/v1/categories/{id}
     */
    categoriesHttpControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<CategoryResponseDto, ApiResponse>({
        path: `/api/v1/categories/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description This route can only be accessed by admins. It is used to create a product.
     *
     * @tags products
     * @name ProductsHttpControllerCreate
     * @summary Create a Product
     * @request POST:/api/v1/products
     */
    productsHttpControllerCreate: (
      data: CreateProductRequestDto,
      params: RequestParams = {},
    ) =>
      this.request<IdResponse, ApiErrorResponse>({
        path: `/api/v1/products`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags products
     * @name ProductsHttpControllerFindProducts
     * @summary Find products
     * @request GET:/api/v1/products
     */
    productsHttpControllerFindProducts: (
      query: {
        /** Order by field and order */
        sort: string[];
        /** Range of results to return */
        range: string[];
      },
      data: FindProductsRequestDto,
      params: RequestParams = {},
    ) =>
      this.request<ProductPaginatedResponseDto, any>({
        path: `/api/v1/products`,
        method: "GET",
        query: query,
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description This route can only be accessed by admins. It is used to delete a product.
     *
     * @tags products
     * @name ProductsHttpControllerDelete
     * @summary Delete a Product
     * @request DELETE:/api/v1/products/{id}
     */
    productsHttpControllerDelete: (id: string, params: RequestParams = {}) =>
      this.request<IdResponse, ApiErrorResponse>({
        path: `/api/v1/products/${id}`,
        method: "DELETE",
        format: "json",
        ...params,
      }),

    /**
     * @description This route can only be accessed by admins. It is used to update a product.
     *
     * @tags products
     * @name ProductsHttpControllerUpdateOne
     * @summary Update a Product
     * @request PUT:/api/v1/products/{id}
     */
    productsHttpControllerUpdateOne: (
      id: string,
      data: UpdateProductRequestDto,
      params: RequestParams = {},
    ) =>
      this.request<IdResponse, ApiErrorResponse>({
        path: `/api/v1/products/${id}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags products
     * @name ProductsHttpControllerFindOne
     * @summary Find product by id
     * @request GET:/api/v1/products/{id}
     */
    productsHttpControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<ProductResponseDto, ApiResponse>({
        path: `/api/v1/products/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags products
     * @name ProductsHttpControllerFindAllProductSlugs
     * @summary Find all product slugs for Sitemap
     * @request GET:/api/v1/products/slugs
     */
    productsHttpControllerFindAllProductSlugs: (params: RequestParams = {}) =>
      this.request<ProductSlugsPaginatedResponseDto, any>({
        path: `/api/v1/products/slugs`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags cart
     * @name CartHttpControllerUpdateOne
     * @summary Add cart line item
     * @request POST:/api/v1/cart/line-item
     */
    cartHttpControllerUpdateOne: (
      data: AddCartItemRequestDto,
      params: RequestParams = {},
    ) =>
      this.request<IdResponse, ApiErrorResponse>({
        path: `/api/v1/cart/line-item`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags cart
     * @name CartHttpControllerDelete
     * @summary Delete a cart line item
     * @request DELETE:/api/v1/cart/line-item/{id}
     */
    cartHttpControllerDelete: (id: string, params: RequestParams = {}) =>
      this.request<IdResponse, ApiErrorResponse>({
        path: `/api/v1/cart/line-item/${id}`,
        method: "DELETE",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags cart
     * @name CartHttpControllerUpdateLineItem
     * @summary Update a cart line item
     * @request PUT:/api/v1/cart/line-item/{id}
     */
    cartHttpControllerUpdateLineItem: (
      id: string,
      data: UpdateCartLineItemRequestDto,
      params: RequestParams = {},
    ) =>
      this.request<IdResponse, ApiErrorResponse>({
        path: `/api/v1/cart/line-item/${id}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags cart
     * @name CartHttpControllerFetchOrCreate
     * @summary Fetch cart from cookie or create a new one
     * @request POST:/api/v1/cart/fetch
     */
    cartHttpControllerFetchOrCreate: (params: RequestParams = {}) =>
      this.request<CartResponseDto, ApiResponse>({
        path: `/api/v1/cart/fetch`,
        method: "POST",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags cart
     * @name CartHttpControllerClearCart
     * @summary Clear cart
     * @request DELETE:/api/v1/cart/empty
     */
    cartHttpControllerClearCart: (params: RequestParams = {}) =>
      this.request<IdResponse, any>({
        path: `/api/v1/cart/empty`,
        method: "DELETE",
        format: "json",
        ...params,
      }),

    /**
     * @description Checkout Order
     *
     * @tags orders
     * @name OrdersHttpControllerCreate
     * @summary Checkout Order
     * @request POST:/api/v1/orders/checkout
     */
    ordersHttpControllerCreate: (
      data: CheckoutOrderRequestDto,
      params: RequestParams = {},
    ) =>
      this.request<IdResponse, ApiErrorResponse>({
        path: `/api/v1/orders/checkout`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags orders
     * @name OrdersHttpControllerFindOne
     * @summary Find category by id
     * @request GET:/api/v1/orders/{id}
     */
    ordersHttpControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<OrderResponseDto, ApiResponse>({
        path: `/api/v1/orders/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description This route can only be accessed by admins. It is used to update an order status
     *
     * @tags orders
     * @name OrdersHttpControllerUpdateOne
     * @summary Update Order Status
     * @request PUT:/api/v1/orders/{id}
     */
    ordersHttpControllerUpdateOne: (
      id: string,
      data: UpdateOrderStatusRequestDto,
      params: RequestParams = {},
    ) =>
      this.request<IdResponse, ApiErrorResponse>({
        path: `/api/v1/orders/${id}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description This route can only be accessed by admins. It is used to delete an Order.
     *
     * @tags orders
     * @name OrdersHttpControllerDelete
     * @summary Delete an Order
     * @request DELETE:/api/v1/orders/{id}
     */
    ordersHttpControllerDelete: (id: string, params: RequestParams = {}) =>
      this.request<IdResponse, ApiErrorResponse>({
        path: `/api/v1/orders/${id}`,
        method: "DELETE",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags orders
     * @name OrdersHttpControllerFindOneBySlug
     * @summary Find order by slug
     * @request GET:/api/v1/orders/slug/{slug}
     */
    ordersHttpControllerFindOneBySlug: (
      slug: string,
      params: RequestParams = {},
    ) =>
      this.request<OrderResponseDto, ApiResponse>({
        path: `/api/v1/orders/slug/${slug}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags orders
     * @name OrdersHttpControllerFindOrders
     * @summary Find orders
     * @request GET:/api/v1/orders
     */
    ordersHttpControllerFindOrders: (
      query: {
        /** Order by field and order */
        sort: string[];
        /** Range of results to return */
        range: string[];
      },
      params: RequestParams = {},
    ) =>
      this.request<OrderPaginatedResponseDto, any>({
        path: `/api/v1/orders`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  health = {
    /**
     * No description
     *
     * @name HealthControllerGetHealth
     * @request GET:/health
     */
    healthControllerGetHealth: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/health`,
        method: "GET",
        ...params,
      }),
  };
}

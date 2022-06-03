import { DataTypes, Sequelize } from 'sequelize';

export default (sequelize: Sequelize) => {
  const Product = sequelize.define(
    'Product',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      permalink: {
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
      },
      quantity: {
        type: DataTypes.INTEGER,
      },
      media: {
        type: DataTypes.STRING,
      },
      sku: {
        type: DataTypes.STRING,
      },
      price: {
        type: DataTypes.FLOAT,
      },
      //   extra_fields: any[];
      //   variant_groups: ProductVariantGroup[];
      //   categories: Array<{
      //     id: string;
      //     slug: string;
      //     name: string;
      //   }>;
      //   assets: Asset[];
      //   image: Asset | null;
      //   attributes: ProductAttribute[];
      //   related_products: any[];
    },
    {
      tableName: 'products',
      timestamps: true,
    },
  );
  return Product;
};
export interface Product {
  price: Price;
  /**
   * type(pin):"image"
   * source(pin):"https://cdn.chec.io/merchants/30387/assets/AptNyqmqlF8y7Z3J|better.webp"
   */
  sku: string | null;
  sort_order: number;
  seo: {
    title: string | null;
    description: string | null;
  };
  thank_you_url: string | null;
  meta: any;
  conditionals: {
    is_active: boolean;
    is_tax_exempt: boolean;
    is_pay_what_you_want: boolean;
    is_inventory_managed: boolean;
    is_sold_out: boolean;
    has_digital_delivery: boolean;
    has_physical_delivery: boolean;
    has_images: boolean;
    collects_fullname: boolean;
    collects_shipping_address: boolean;
    collects_billing_address: boolean;
    collects_extra_fields: boolean;
  };
  is: {
    active: boolean;
    tax_exempt: boolean;
    pay_what_you_want: boolean;
    inventory_managed: boolean;
    sold_out: boolean;
  };
  has: {
    digital_delivery: boolean;
    physical_delivery: boolean;
    images: boolean;
    video: boolean;
    rich_embed: boolean;
  };
  collects: {
    fullname: boolean;
    shipping_address: boolean;
    billing_address: boolean;
    extra_fields: boolean;
  };
  checkout_url: {
    checkout: string;
    display: string;
  };
}
export interface ProductVariantGroup {
  id: string;
  name: string;
  meta?: any;
  created: number | null;
  updated: number | null;
  options: ProductVariantOption[];
}

export interface ProductVariantOption {
  id: string;
  name: string;
  price: Price;
  assets: string[] | null;
  meta: any;
  created: number | null;
  updated: number | null;
}

export interface ProductAttributeOption {
  label: string;
  value: string;
}

export interface ProductAttribute {
  id: string;
  meta: any;
  name: string;
  value: string | number | ProductAttributeOption[] | null;
}

export interface Asset {
  id: string;
  url: string;
  description: string | null;
  is_image: boolean;
  filename: string;
  file_extension: string;
  image_dimensions: {
    width: number;
    height: number;
  };
  file_size?: number | undefined;
  meta: any;
  created_at: number;
  updated_at: number;
}

/**
 * raw(pin):65
 * formatted(pin):"65.00"
 * formatted_with_symbol: "€65.00"
 * formatted_with_code: "65.00 EUR"
 */
export interface Price {
  raw: number;
  formatted: string;
  formatted_with_symbol: string;
  formatted_with_code: string;
}

// export interface ProductCollection {
//   data: Product[];
//   meta: PaginationMeta;
// }
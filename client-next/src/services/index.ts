// import { Cart, RequestMethod } from './features/cart';
// import { Categories } from './features/categories';
// import { Checkout } from './features/checkout';
// import { Customer } from './features/customer';
// import { Merchants } from './features/merchants';
// import { Products } from './features/products';
// import { Services } from './features/services';

// export = Commerce;

// declare class Commerce {
//     constructor(publicKey: string, debug?: boolean, config?: Commerce.CommerceConfig);

//     cart: Cart;
//     categories: Categories;
//     checkout: Checkout;
//     customer: Customer;
//     merchants: Merchants;
//     products: Products;
//     services: Services;

//     error: (response: any) => void | number[];
//     request: (
//         endpoint: string,
//         method?: RequestMethod,
//         data?: object,
//         extraHeaders?: any,
//         returnFullResponse?: boolean,
//     ) => any;
// }

// declare namespace Commerce {
//     interface CommerceConfig {
//         disableStorage?: boolean | undefined;
//         cartLifetime?: number | undefined;
//         timeoutMs?: number | undefined;
//         axiosConfig?: any;
//     }
// }
export interface PaginationMeta {
  pagination: {
    count: number;
    current_page: number;
    links: any;
    per_page: number;
    total: number;
    total_pages: number;
  };
}

// DATA
/**
 * {
  categories: {
    data: [
      {
        id: 'cat_G6kVw7q4252eDx',
        parent_id: null,
        slug: 'accessories',
        name: 'Accessories',
        description: null,
        products: 2,
        created: 1629473136,
        updated: 1629473136,
        meta: null,
        assets: [],
        children: []
      },
      {
        id: 'cat_AYrQlWaRronbR4',
        parent_id: null,
        slug: 'smartwatches',
        name: 'Smartwatches',
        description: null,
        products: 0,
        created: 1629473124,
        updated: 1629473124,
        meta: null,
        assets: [],
        children: []
      },
      {
        id: 'cat_p6dP5gGag5n7kA',
        parent_id: null,
        slug: 'tablets',
        name: 'Tablets',
        description: null,
        products: 1,
        created: 1629473110,
        updated: 1629473110,
        meta: null,
        assets: [],
        children: []
      },
      {
        id: 'cat_31q0o3bdgwDdjR',
        parent_id: null,
        slug: 'smartphones',
        name: 'Smartphones',
        description: null,
        products: 5,
        created: 1629473096,
        updated: 1629473096,
        meta: null,
        assets: [],
        children: []
      }
    ],
    status: 'idle',
    error: ''
  },
  products: {
    data: [
      {
        id: 'prod_RyWOwmdYOglnEa',
        created: 1626350455,
        updated: 1629473362,
        active: true,
        permalink: '78EYVf',
        name: 'Keyboard',
        description: '<p>Black magic keyboard</p>',
        price: {
          raw: 65,
          formatted: '65.00',
          formatted_with_symbol: '€65.00',
          formatted_with_code: '65.00 EUR'
        },
        inventory: {
          managed: true,
          available: 9
        },
        sku: null,
        sort_order: 0,
        seo: {
          title: null,
          description: null
        },
        thank_you_url: null,
        meta: null,
        conditionals: {
          is_active: true,
          is_tax_exempt: false,
          is_pay_what_you_want: false,
          is_inventory_managed: true,
          is_sold_out: false,
          has_digital_delivery: false,
          has_physical_delivery: true,
          has_images: true,
          collects_fullname: false,
          collects_shipping_address: true,
          collects_billing_address: false,
          collects_extra_fields: false,
          has_video: false,
          has_rich_embed: false
        },
        is: {
          active: true,
          tax_exempt: false,
          pay_what_you_want: false,
          inventory_managed: true,
          sold_out: false
        },
        has: {
          digital_delivery: false,
          physical_delivery: true,
          images: true
        },
        collects: {
          fullname: false,
          shipping_address: true,
          billing_address: false,
          extra_fields: false
        },
        checkout_url: {
          checkout: 'https://checkout.chec.io/78EYVf?checkout=true',
          display: 'https://checkout.chec.io/78EYVf'
        },
        media: {
          type: 'image',
          source: 'https://cdn.chec.io/merchants/30387/assets/AptNyqmqlF8y7Z3J|better.webp',
          asset_id: 'ast_LvJjoPVXaVle0n'
        },
        extra_fields: [],
        variant_groups: [],
        categories: [
          {
            id: 'cat_G6kVw7q4252eDx',
            slug: 'accessories',
            name: 'Accessories'
          }
        ],
        assets: [
          {
            id: 'ast_LvJjoPVXaVle0n',
            url: 'https://cdn.chec.io/merchants/30387/assets/AptNyqmqlF8y7Z3J|better.webp',
            description: null,
            is_image: true,
            filename: 'better.webp',
            file_size: 30718,
            file_extension: 'webp',
            image_dimensions: {
              width: 750,
              height: 440
            },
            meta: [],
            created_at: 1626350406,
            updated_at: 1626350408
          }
        ],
        image: {
          id: 'ast_LvJjoPVXaVle0n',
          url: 'https://cdn.chec.io/merchants/30387/assets/AptNyqmqlF8y7Z3J|better.webp',
          description: null,
          is_image: true,
          filename: 'better.webp',
          file_size: 30718,
          file_extension: 'webp',
          image_dimensions: {
            width: 750,
            height: 440
          },
          meta: [],
          created_at: 1626350406,
          updated_at: 1626350408
        },
        related_products: [],
        attributes: []
      },
      {
        id: 'prod_Kvg9l6AbkR51bB',
        created: 1626351397,
        updated: 1651863326,
        active: true,
        permalink: 'ueiMQF',
        name: 'Xiaomi Poco X3 Pro (128GB) Phantom Black',
        description: '<p>Μοντέλο: 2021, Οθόνη: IPS 6.67", RAM: 6GB, 5160mAh</p>',
        price: {
          raw: 209,
          formatted: '209.00',
          formatted_with_symbol: '€209.00',
          formatted_with_code: '209.00 EUR'
        },
        inventory: {
          managed: true,
          available: 2
        },
        sku: null,
        sort_order: 0,
        seo: {
          title: null,
          description: null
        },
        thank_you_url: null,
        meta: null,
        conditionals: {
          is_active: true,
          is_tax_exempt: false,
          is_pay_what_you_want: false,
          is_inventory_managed: true,
          is_sold_out: false,
          has_digital_delivery: false,
          has_physical_delivery: true,
          has_images: true,
          collects_fullname: false,
          collects_shipping_address: true,
          collects_billing_address: false,
          collects_extra_fields: false,
          has_video: false,
          has_rich_embed: false
        },
        is: {
          active: true,
          tax_exempt: false,
          pay_what_you_want: false,
          inventory_managed: true,
          sold_out: false
        },
        has: {
          digital_delivery: false,
          physical_delivery: true,
          images: true
        },
        collects: {
          fullname: false,
          shipping_address: true,
          billing_address: false,
          extra_fields: false
        },
        checkout_url: {
          checkout: 'https://checkout.chec.io/ueiMQF?checkout=true',
          display: 'https://checkout.chec.io/ueiMQF'
        },
        media: {
          type: 'image',
          source: 'https://cdn.chec.io/merchants/30387/assets/eHqWDleLN1oDxFgG|xlarge_20210402110211_xiaomi_poco_x3_pro_128gb_phantom_black.jpeg',
          asset_id: 'ast_gnZO5krMGYo7MN'
        },
        extra_fields: [],
        variant_groups: [],
        categories: [
          {
            id: 'cat_31q0o3bdgwDdjR',
            slug: 'smartphones',
            name: 'Smartphones'
          }
        ],
        assets: [
          {
            id: 'ast_gnZO5krMGYo7MN',
            url: 'https://cdn.chec.io/merchants/30387/assets/eHqWDleLN1oDxFgG|xlarge_20210402110211_xiaomi_poco_x3_pro_128gb_phantom_black.jpeg',
            description: null,
            is_image: true,
            filename: 'xlarge_20210402110211_xiaomi_poco_x3_pro_128gb_phantom_black.jpeg',
            file_size: 33890,
            file_extension: 'jpeg',
            image_dimensions: {
              width: 331,
              height: 400
            },
            meta: [],
            created_at: 1626351314,
            updated_at: 1626351317
          }
        ],
        image: {
          id: 'ast_gnZO5krMGYo7MN',
          url: 'https://cdn.chec.io/merchants/30387/assets/eHqWDleLN1oDxFgG|xlarge_20210402110211_xiaomi_poco_x3_pro_128gb_phantom_black.jpeg',
          description: null,
          is_image: true,
          filename: 'xlarge_20210402110211_xiaomi_poco_x3_pro_128gb_phantom_black.jpeg',
          file_size: 33890,
          file_extension: 'jpeg',
          image_dimensions: {
            width: 331,
            height: 400
          },
          meta: [],
          created_at: 1626351314,
          updated_at: 1626351317
        },
        related_products: [],
        attributes: []
      },
      {
        id: 'prod_kpnNwAynJgwmXB',
        created: 1626351646,
        updated: 1651863489,
        active: true,
        permalink: 'QoxgMg',
        name: 'Xiaomi Poco F3 (128GB) Night Black',
        description: '<p>Μοντέλο: 2021, Οθόνη: AMOLED 6.67", RAM: 6GB, 4520mAh</p>',
        price: {
          raw: 311.69,
          formatted: '311.69',
          formatted_with_symbol: '€311.69',
          formatted_with_code: '311.69 EUR'
        },
        inventory: {
          managed: true,
          available: 2
        },
        sku: null,
        sort_order: 0,
        seo: {
          title: null,
          description: null
        },
        thank_you_url: null,
        meta: null,
        conditionals: {
          is_active: true,
          is_tax_exempt: false,
          is_pay_what_you_want: false,
          is_inventory_managed: true,
          is_sold_out: false,
          has_digital_delivery: false,
          has_physical_delivery: true,
          has_images: true,
          collects_fullname: false,
          collects_shipping_address: true,
          collects_billing_address: false,
          collects_extra_fields: false,
          has_video: false,
          has_rich_embed: false
        },
        is: {
          active: true,
          tax_exempt: false,
          pay_what_you_want: false,
          inventory_managed: true,
          sold_out: false
        },
        has: {
          digital_delivery: false,
          physical_delivery: true,
          images: true
        },
        collects: {
          fullname: false,
          shipping_address: true,
          billing_address: false,
          extra_fields: false
        },
        checkout_url: {
          checkout: 'https://checkout.chec.io/QoxgMg?checkout=true',
          display: 'https://checkout.chec.io/QoxgMg'
        },
        media: {
          type: 'image',
          source: 'https://cdn.chec.io/merchants/30387/assets/jPnUHWsXWWLAUjEE|xiaomi_poco_f3_128gb_night_black.jpeg',
          asset_id: 'ast_r2LM5QmWrd5ZV1'
        },
        extra_fields: [],
        variant_groups: [],
        categories: [
          {
            id: 'cat_31q0o3bdgwDdjR',
            slug: 'smartphones',
            name: 'Smartphones'
          }
        ],
        assets: [
          {
            id: 'ast_r2LM5QmWrd5ZV1',
            url: 'https://cdn.chec.io/merchants/30387/assets/jPnUHWsXWWLAUjEE|xiaomi_poco_f3_128gb_night_black.jpeg',
            description: null,
            is_image: true,
            filename: 'xiaomi_poco_f3_128gb_night_black.jpeg',
            file_size: 13065,
            file_extension: 'jpeg',
            image_dimensions: {
              width: 199,
              height: 250
            },
            meta: [],
            created_at: 1626351594,
            updated_at: 1626351596
          }
        ],
        image: {
          id: 'ast_r2LM5QmWrd5ZV1',
          url: 'https://cdn.chec.io/merchants/30387/assets/jPnUHWsXWWLAUjEE|xiaomi_poco_f3_128gb_night_black.jpeg',
          description: null,
          is_image: true,
          filename: 'xiaomi_poco_f3_128gb_night_black.jpeg',
          file_size: 13065,
          file_extension: 'jpeg',
          image_dimensions: {
            width: 199,
            height: 250
          },
          meta: [],
          created_at: 1626351594,
          updated_at: 1626351596
        },
        related_products: [],
        attributes: []
      },
      {
        id: 'prod_8XO3wpWQOElYAz',
        created: 1626351706,
        updated: 1629473264,
        active: true,
        permalink: '23vuq1',
        name: 'Apple iPhone 12 Pro Max (128GB) Pacific Blue',
        description: '<p>Μοντέλο: 2020, Οθόνη: Super Retina XDR OLED 6.7", RAM: 6GB, 3687mAh</p>',
        price: {
          raw: 1193.63,
          formatted: '1,193.63',
          formatted_with_symbol: '€1,193.63',
          formatted_with_code: '1,193.63 EUR'
        },
        inventory: {
          managed: true,
          available: 20
        },
        sku: null,
        sort_order: 0,
        seo: {
          title: null,
          description: null
        },
        thank_you_url: null,
        meta: null,
        conditionals: {
          is_active: true,
          is_tax_exempt: false,
          is_pay_what_you_want: false,
          is_inventory_managed: true,
          is_sold_out: false,
          has_digital_delivery: false,
          has_physical_delivery: true,
          has_images: true,
          collects_fullname: false,
          collects_shipping_address: true,
          collects_billing_address: false,
          collects_extra_fields: false,
          has_video: false,
          has_rich_embed: false
        },
        is: {
          active: true,
          tax_exempt: false,
          pay_what_you_want: false,
          inventory_managed: true,
          sold_out: false
        },
        has: {
          digital_delivery: false,
          physical_delivery: true,
          images: true
        },
        collects: {
          fullname: false,
          shipping_address: true,
          billing_address: false,
          extra_fields: false
        },
        checkout_url: {
          checkout: 'https://checkout.chec.io/23vuq1?checkout=true',
          display: 'https://checkout.chec.io/23vuq1'
        },
        media: {
          type: 'image',
          source: 'https://cdn.chec.io/merchants/30387/assets/lyBVo533G8HIhT3v|apple12.jpeg',
          asset_id: 'ast_NXELwjdMLq53A4'
        },
        extra_fields: [],
        variant_groups: [],
        categories: [
          {
            id: 'cat_31q0o3bdgwDdjR',
            slug: 'smartphones',
            name: 'Smartphones'
          }
        ],
        assets: [
          {
            id: 'ast_NXELwjdMLq53A4',
            url: 'https://cdn.chec.io/merchants/30387/assets/lyBVo533G8HIhT3v|apple12.jpeg',
            description: null,
            is_image: true,
            filename: 'apple12.jpeg',
            file_size: 10544,
            file_extension: 'jpeg',
            image_dimensions: {
              width: 183,
              height: 250
            },
            meta: [],
            created_at: 1626351681,
            updated_at: 1626351682
          }
        ],
        image: {
          id: 'ast_NXELwjdMLq53A4',
          url: 'https://cdn.chec.io/merchants/30387/assets/lyBVo533G8HIhT3v|apple12.jpeg',
          description: null,
          is_image: true,
          filename: 'apple12.jpeg',
          file_size: 10544,
          file_extension: 'jpeg',
          image_dimensions: {
            width: 183,
            height: 250
          },
          meta: [],
          created_at: 1626351681,
          updated_at: 1626351682
        },
        related_products: [],
        attributes: []
      },
      {
        id: 'prod_NqKE50bGePwdgB',
        created: 1626351511,
        updated: 1651863410,
        active: true,
        permalink: 'eY7V4v',
        name: 'Apple iPhone 11 (64GB) Black',
        description: '<p>Διπλή κάμερα 12MP προσφέρουν πληθώρα δυνατοτήτων άκομα και σε συνθήκες χαμηλού φωτισμού, ενώ η selfie 12MP υποστήριζει βίντεο 4Κ και slow motion.</p>',
        price: {
          raw: 598.73,
          formatted: '598.73',
          formatted_with_symbol: '€598.73',
          formatted_with_code: '598.73 EUR'
        },
        inventory: {
          managed: true,
          available: 5
        },
        sku: null,
        sort_order: 0,
        seo: {
          title: null,
          description: null
        },
        thank_you_url: null,
        meta: null,
        conditionals: {
          is_active: true,
          is_tax_exempt: false,
          is_pay_what_you_want: false,
          is_inventory_managed: true,
          is_sold_out: false,
          has_digital_delivery: false,
          has_physical_delivery: true,
          has_images: true,
          collects_fullname: false,
          collects_shipping_address: true,
          collects_billing_address: false,
          collects_extra_fields: false,
          has_video: false,
          has_rich_embed: false
        },
        is: {
          active: true,
          tax_exempt: false,
          pay_what_you_want: false,
          inventory_managed: true,
          sold_out: false
        },
        has: {
          digital_delivery: false,
          physical_delivery: true,
          images: true
        },
        collects: {
          fullname: false,
          shipping_address: true,
          billing_address: false,
          extra_fields: false
        },
        checkout_url: {
          checkout: 'https://checkout.chec.io/eY7V4v?checkout=true',
          display: 'https://checkout.chec.io/eY7V4v'
        },
        media: {
          type: 'image',
          source: 'https://cdn.chec.io/merchants/30387/assets/RSXUxccWu0q111vq|xlarge_20190916100719_apple_iphone_11_64gb.jpeg',
          asset_id: 'ast_7ZAMo1LEjXwNJ4'
        },
        extra_fields: [],
        variant_groups: [],
        categories: [
          {
            id: 'cat_31q0o3bdgwDdjR',
            slug: 'smartphones',
            name: 'Smartphones'
          }
        ],
        assets: [
          {
            id: 'ast_7ZAMo1LEjXwNJ4',
            url: 'https://cdn.chec.io/merchants/30387/assets/RSXUxccWu0q111vq|xlarge_20190916100719_apple_iphone_11_64gb.jpeg',
            description: null,
            is_image: true,
            filename: 'xlarge_20190916100719_apple_iphone_11_64gb.jpeg',
            file_size: 20635,
            file_extension: 'jpeg',
            image_dimensions: {
              width: 292,
              height: 400
            },
            meta: [],
            created_at: 1626351498,
            updated_at: 1626351500
          }
        ],
        image: {
          id: 'ast_7ZAMo1LEjXwNJ4',
          url: 'https://cdn.chec.io/merchants/30387/assets/RSXUxccWu0q111vq|xlarge_20190916100719_apple_iphone_11_64gb.jpeg',
          description: null,
          is_image: true,
          filename: 'xlarge_20190916100719_apple_iphone_11_64gb.jpeg',
          file_size: 20635,
          file_extension: 'jpeg',
          image_dimensions: {
            width: 292,
            height: 400
          },
          meta: [],
          created_at: 1626351498,
          updated_at: 1626351500
        },
        related_products: [],
        attributes: []
      },
      {
        id: 'prod_bO6J5apLOXoEjp',
        created: 1626351835,
        updated: 1651329489,
        active: true,
        permalink: 'Rbfl01',
        name: 'Huawei P40 Lite (128GB) Midnight Black',
        description: '<p>Μοντέλο: 2020, Οθόνη: IPS 6.4", RAM: 6GB, 4200mAh</p>',
        price: {
          raw: 144.3,
          formatted: '144.30',
          formatted_with_symbol: '€144.30',
          formatted_with_code: '144.30 EUR'
        },
        inventory: {
          managed: true,
          available: 11
        },
        sku: null,
        sort_order: 0,
        seo: {
          title: null,
          description: null
        },
        thank_you_url: null,
        meta: null,
        conditionals: {
          is_active: true,
          is_tax_exempt: false,
          is_pay_what_you_want: false,
          is_inventory_managed: true,
          is_sold_out: false,
          has_digital_delivery: false,
          has_physical_delivery: true,
          has_images: true,
          collects_fullname: false,
          collects_shipping_address: true,
          collects_billing_address: false,
          collects_extra_fields: false,
          has_video: false,
          has_rich_embed: false
        },
        is: {
          active: true,
          tax_exempt: false,
          pay_what_you_want: false,
          inventory_managed: true,
          sold_out: false
        },
        has: {
          digital_delivery: false,
          physical_delivery: true,
          images: true
        },
        collects: {
          fullname: false,
          shipping_address: true,
          billing_address: false,
          extra_fields: false
        },
        checkout_url: {
          checkout: 'https://checkout.chec.io/Rbfl01?checkout=true',
          display: 'https://checkout.chec.io/Rbfl01'
        },
        media: {
          type: 'image',
          source: 'https://cdn.chec.io/merchants/30387/assets/Bu1cfMoRsOjpC19D|huawei_p40_lite_128gb_midnight_black.jpeg',
          asset_id: 'ast_L1vOoZdOB0lRa8'
        },
        extra_fields: [],
        variant_groups: [],
        categories: [
          {
            id: 'cat_31q0o3bdgwDdjR',
            slug: 'smartphones',
            name: 'Smartphones'
          }
        ],
        assets: [
          {
            id: 'ast_L1vOoZdOB0lRa8',
            url: 'https://cdn.chec.io/merchants/30387/assets/Bu1cfMoRsOjpC19D|huawei_p40_lite_128gb_midnight_black.jpeg',
            description: null,
            is_image: true,
            filename: 'huawei_p40_lite_128gb_midnight_black.jpeg',
            file_size: 10191,
            file_extension: 'jpeg',
            image_dimensions: {
              width: 250,
              height: 241
            },
            meta: [],
            created_at: 1626351810,
            updated_at: 1626351812
          }
        ],
        image: {
          id: 'ast_L1vOoZdOB0lRa8',
          url: 'https://cdn.chec.io/merchants/30387/assets/Bu1cfMoRsOjpC19D|huawei_p40_lite_128gb_midnight_black.jpeg',
          description: null,
          is_image: true,
          filename: 'huawei_p40_lite_128gb_midnight_black.jpeg',
          file_size: 10191,
          file_extension: 'jpeg',
          image_dimensions: {
            width: 250,
            height: 241
          },
          meta: [],
          created_at: 1626351810,
          updated_at: 1626351812
        },
        related_products: [],
        attributes: []
      },
      {
        id: 'prod_A12JwrenOVlPjn',
        created: 1626351928,
        updated: 1651329428,
        active: true,
        permalink: '6ITmq7',
        name: 'Apple EarPods Earbuds Handsfree με Βύσμα Lightning Λευκό',
        description: '<p>Σχεδιασμένα με βάση τη γεωμετρία του αυτιού ώστε να είναι άνετα και βολικά. Είναι κατασκευασμένα έτσι ώστε να αποδίδουν τη μέγιστη ένταση στον ήχο με τις λιγότερες δυνατές απώλειες και παραμορφώσεις. Διαθέτουν ενσωματωμένο χειριστήριο για τον έλεγχο κλήσεων και μουσικής. Επίσης, προσφέρουν προστασία από τον ιδρώτα και το νερό.</p>',
        price: {
          raw: 14.94,
          formatted: '14.94',
          formatted_with_symbol: '€14.94',
          formatted_with_code: '14.94 EUR'
        },
        inventory: {
          managed: false,
          available: 0
        },
        sku: null,
        sort_order: 0,
        seo: {
          title: null,
          description: null
        },
        thank_you_url: null,
        meta: null,
        conditionals: {
          is_active: true,
          is_tax_exempt: false,
          is_pay_what_you_want: false,
          is_inventory_managed: false,
          is_sold_out: false,
          has_digital_delivery: false,
          has_physical_delivery: false,
          has_images: true,
          collects_fullname: false,
          collects_shipping_address: false,
          collects_billing_address: false,
          collects_extra_fields: false,
          has_video: false,
          has_rich_embed: false
        },
        is: {
          active: true,
          tax_exempt: false,
          pay_what_you_want: false,
          inventory_managed: false,
          sold_out: false
        },
        has: {
          digital_delivery: false,
          physical_delivery: false,
          images: true
        },
        collects: {
          fullname: false,
          shipping_address: false,
          billing_address: false,
          extra_fields: false
        },
        checkout_url: {
          checkout: 'https://checkout.chec.io/6ITmq7?checkout=true',
          display: 'https://checkout.chec.io/6ITmq7'
        },
        media: {
          type: 'image',
          source: 'https://cdn.chec.io/merchants/30387/assets/fQYVs040558a8dbz|apple_earpods_lightning.jpeg',
          asset_id: 'ast_0YnEoqxWDWwe7P'
        },
        extra_fields: [],
        variant_groups: [],
        categories: [
          {
            id: 'cat_G6kVw7q4252eDx',
            slug: 'accessories',
            name: 'Accessories'
          }
        ],
        assets: [
          {
            id: 'ast_0YnEoqxWDWwe7P',
            url: 'https://cdn.chec.io/merchants/30387/assets/fQYVs040558a8dbz|apple_earpods_lightning.jpeg',
            description: null,
            is_image: true,
            filename: 'apple_earpods_lightning.jpeg',
            file_size: 4687,
            file_extension: 'jpeg',
            image_dimensions: {
              width: 222,
              height: 400
            },
            meta: [],
            created_at: 1626351910,
            updated_at: 1626351923
          }
        ],
        image: {
          id: 'ast_0YnEoqxWDWwe7P',
          url: 'https://cdn.chec.io/merchants/30387/assets/fQYVs040558a8dbz|apple_earpods_lightning.jpeg',
          description: null,
          is_image: true,
          filename: 'apple_earpods_lightning.jpeg',
          file_size: 4687,
          file_extension: 'jpeg',
          image_dimensions: {
            width: 222,
            height: 400
          },
          meta: [],
          created_at: 1626351910,
          updated_at: 1626351923
        },
        related_products: [],
        attributes: []
      },
      {
        id: 'prod_Op1YoVpZO4lXLv',
        created: 1626352046,
        updated: 1651329352,
        active: true,
        permalink: 'tQMvaW',
        name: 'Samsung Galaxy Tab A7 (2020) 10.4" με WiFi και Μνήμη 32GB Dark Grey',
        description: '<p>Galaxy Tab A7 με οθόνη 10.4” WUXGA+ (2000x1200), επεξεργαστή Snapdragon 662, μπαταρία 7.040 mAh με υποστήριξη ταχείας φόρτισης 15W, τέσσερα στερεοφωνικά ηχεία με υποστήριξη Dolby Atmos, κύρια κάμερα 8MP AF καθώς και υποδοχή ακουστικών 3,5mm. Επιπλέον έχει μεταλλικό design, συμμετρικό bezel και πάχος μόλις 7 mm.</p>',
        price: {
          raw: 171.81,
          formatted: '171.81',
          formatted_with_symbol: '€171.81',
          formatted_with_code: '171.81 EUR'
        },
        inventory: {
          managed: false,
          available: 0
        },
        sku: null,
        sort_order: 0,
        seo: {
          title: null,
          description: null
        },
        thank_you_url: null,
        meta: null,
        conditionals: {
          is_active: true,
          is_tax_exempt: false,
          is_pay_what_you_want: false,
          is_inventory_managed: false,
          is_sold_out: false,
          has_digital_delivery: false,
          has_physical_delivery: true,
          has_images: true,
          collects_fullname: false,
          collects_shipping_address: true,
          collects_billing_address: false,
          collects_extra_fields: false,
          has_video: false,
          has_rich_embed: false
        },
        is: {
          active: true,
          tax_exempt: false,
          pay_what_you_want: false,
          inventory_managed: false,
          sold_out: false
        },
        has: {
          digital_delivery: false,
          physical_delivery: true,
          images: true
        },
        collects: {
          fullname: false,
          shipping_address: true,
          billing_address: false,
          extra_fields: false
        },
        checkout_url: {
          checkout: 'https://checkout.chec.io/tQMvaW?checkout=true',
          display: 'https://checkout.chec.io/tQMvaW'
        },
        media: {
          type: 'image',
          source: 'https://cdn.chec.io/merchants/30387/assets/dZbi4ast3SlG7U7Z|xlarsamsung_galaxy_tab_a7_2020_10_4_32gb_dark_grey.jpeg',
          asset_id: 'ast_kd6Ll2G6jJwV2m'
        },
        extra_fields: [],
        variant_groups: [],
        categories: [
          {
            id: 'cat_p6dP5gGag5n7kA',
            slug: 'tablets',
            name: 'Tablets'
          }
        ],
        assets: [
          {
            id: 'ast_kd6Ll2G6jJwV2m',
            url: 'https://cdn.chec.io/merchants/30387/assets/dZbi4ast3SlG7U7Z|xlarsamsung_galaxy_tab_a7_2020_10_4_32gb_dark_grey.jpeg',
            description: null,
            is_image: true,
            filename: 'xlarsamsung_galaxy_tab_a7_2020_10_4_32gb_dark_grey.jpeg',
            file_size: 17024,
            file_extension: 'jpeg',
            image_dimensions: {
              width: 367,
              height: 400
            },
            meta: [],
            created_at: 1626352041,
            updated_at: 1626352043
          }
        ],
        image: {
          id: 'ast_kd6Ll2G6jJwV2m',
          url: 'https://cdn.chec.io/merchants/30387/assets/dZbi4ast3SlG7U7Z|xlarsamsung_galaxy_tab_a7_2020_10_4_32gb_dark_grey.jpeg',
          description: null,
          is_image: true,
          filename: 'xlarsamsung_galaxy_tab_a7_2020_10_4_32gb_dark_grey.jpeg',
          file_size: 17024,
          file_extension: 'jpeg',
          image_dimensions: {
            width: 367,
            height: 400
          },
          meta: [],
          created_at: 1626352041,
          updated_at: 1626352043
        },
        related_products: [],
        attributes: []
      }
    ],
    status: 'idle',
    error: ''
  },
  product: {
    status: 'idle',
    error: '',
    data: {
      id: 'prod_RyWOwmdYOglnEa',
      created: 1626350455,
      updated: 1629473362,
      active: true,
      permalink: '78EYVf',
      name: 'Keyboard',
      description: '<p>Black magic keyboard</p>',
      price: {
        raw: 65,
        formatted: '65.00',
        formatted_with_symbol: '€65.00',
        formatted_with_code: '65.00 EUR'
      },
      inventory: {
        managed: true,
        available: 9
      },
      sku: null,
      sort_order: 0,
      seo: {
        title: null,
        description: null
      },
      thank_you_url: null,
      meta: null,
      conditionals: {
        is_active: true,
        is_tax_exempt: false,
        is_pay_what_you_want: false,
        is_inventory_managed: true,
        is_sold_out: false,
        has_digital_delivery: false,
        has_physical_delivery: true,
        has_images: true,
        collects_fullname: false,
        collects_shipping_address: true,
        collects_billing_address: false,
        collects_extra_fields: false,
        has_video: false,
        has_rich_embed: false
      },
      is: {
        active: true,
        tax_exempt: false,
        pay_what_you_want: false,
        inventory_managed: true,
        sold_out: false
      },
      has: {
        digital_delivery: false,
        physical_delivery: true,
        images: true
      },
      collects: {
        fullname: false,
        shipping_address: true,
        billing_address: false,
        extra_fields: false
      },
      checkout_url: {
        checkout: 'https://checkout.chec.io/78EYVf?checkout=true',
        display: 'https://checkout.chec.io/78EYVf'
      },
      media: {
        type: 'image',
        source: 'https://cdn.chec.io/merchants/30387/assets/AptNyqmqlF8y7Z3J|better.webp',
        asset_id: 'ast_LvJjoPVXaVle0n'
      },
      extra_fields: [],
      variant_groups: [],
      categories: [
        {
          id: 'cat_G6kVw7q4252eDx',
          slug: 'accessories',
          name: 'Accessories'
        }
      ],
      assets: [
        {
          id: 'ast_LvJjoPVXaVle0n',
          url: 'https://cdn.chec.io/merchants/30387/assets/AptNyqmqlF8y7Z3J|better.webp',
          description: null,
          is_image: true,
          filename: 'better.webp',
          file_size: 30718,
          file_extension: 'webp',
          image_dimensions: {
            width: 750,
            height: 440
          },
          meta: [],
          created_at: 1626350406,
          updated_at: 1626350408
        }
      ],
      image: {
        id: 'ast_LvJjoPVXaVle0n',
        url: 'https://cdn.chec.io/merchants/30387/assets/AptNyqmqlF8y7Z3J|better.webp',
        description: null,
        is_image: true,
        filename: 'better.webp',
        file_size: 30718,
        file_extension: 'webp',
        image_dimensions: {
          width: 750,
          height: 440
        },
        meta: [],
        created_at: 1626350406,
        updated_at: 1626350408
      },
      related_products: [],
      attributes: []
    }
  },
  cart: {
    status: 'idle',
    error: '',
    data: {
      id: 'cart_Kvg9l69d2d51bB',
      created: 1651926798,
      updated: 1651945169,
      expires: 1654537169,
      total_items: 1,
      total_unique_items: 1,
      subtotal: {
        raw: 14.94,
        formatted: '14.94',
        formatted_with_symbol: '€14.94',
        formatted_with_code: '14.94 EUR'
      },
      hosted_checkout_url: 'https://checkout.chec.io/cart/cart_Kvg9l69d2d51bB',
      meta: null,
      line_items: [
        {
          id: 'item_7RyWOwmK5nEa2V',
          product_id: 'prod_A12JwrenOVlPjn',
          name: 'Apple EarPods Earbuds Handsfree με Βύσμα Lightning Λευκό',
          product_name: 'Apple EarPods Earbuds Handsfree με Βύσμα Lightning Λευκό',
          sku: null,
          permalink: '6ITmq7',
          quantity: 1,
          price: {
            raw: 14.94,
            formatted: '14.94',
            formatted_with_symbol: '€14.94',
            formatted_with_code: '14.94 EUR'
          },
          line_total: {
            raw: 14.94,
            formatted: '14.94',
            formatted_with_symbol: '€14.94',
            formatted_with_code: '14.94 EUR'
          },
          is_valid: true,
          product_meta: [],
          media: {
            type: 'image',
            source: 'https://cdn.chec.io/merchants/30387/assets/fQYVs040558a8dbz|apple_earpods_lightning.jpeg',
            asset_id: 'ast_0YnEoqxWDWwe7P'
          },
          selected_options: [],
          variant: null,
          image: {
            id: 'ast_0YnEoqxWDWwe7P',
            url: 'https://cdn.chec.io/merchants/30387/assets/fQYVs040558a8dbz|apple_earpods_lightning.jpeg',
            description: null,
            is_image: true,
            filename: 'apple_earpods_lightning.jpeg',
            file_size: 4687,
            file_extension: 'jpeg',
            image_dimensions: {
              width: 222,
              height: 400
            },
            meta: [],
            created_at: 1626351910,
            updated_at: 1626351923
          },
          tax: null
        }
      ],
      currency: {
        code: 'EUR',
        symbol: '€'
      },
      discount: []
    }
  },
  user: {
    data: {
      role: 'admin',
      userId: 'a611ab79-9913-4db1-95fc-62ecf8d41938'
    },
    status: 'signedIn',
    error: ''
  }
}
 */

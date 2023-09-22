import { StringMap, TranslationMessages } from 'react-admin';

export interface MinasPhoneMessages extends TranslationMessages {
  pos: {
    search: string;
    configuration: string;
    language: string;
    theme: {
      name: string;
      light: string;
      dark: string;
    };
    dashboard: {
      monthly_revenue: string;
      month_history: string;
      new_orders: string;
      pending_reviews: string;
      all_reviews: string;
      new_customers: string;
      all_customers: string;
      pending_orders: string;
      order: {
        items: string;
      };
      welcome: {
        title: string;
        subtitle: string;
        ra_button: string;
        demo_button: string;
      };
    };
    menu: {
      sales: string;
      catalog: string;
      customers: string;
    };
  };
  resources: {
    customers: Customers;
    orders: Orders;
    products: Products;
    categories: Categories;
  };
}

interface Customers extends StringMap {
  name: string;
  fields: {
    time_joined: string;
    // address: string;
    // orders: string;
    // first_seen: string;
    // groups: string;
    // last_seen: string;
    // last_seen_gte: string;
    // name: string;
    // total_spent: string;
    // password: string;
    // confirm_password: string;
    // stateAbbr: string;
  };
  filters: {
    last_visited: string;
    today: string;
    this_week: string;
    last_week: string;
    this_month: string;
    last_month: string;
    earlier: string;
    has_ordered: string;
    has_newsletter: string;
    group: string;
  };
  fieldGroups: {
    identity: string;
    address: string;
    stats: string;
    history: string;
    password: string;
    change_password: string;
  };
  page: {
    delete: string;
  };
  errors: {
    password_mismatch: string;
  };
}

interface Orders extends StringMap {
  name: string;
  amount: string;
  title: string;
  fields: {
    basket: {
      delivery: string;
      reference: string;
      quantity: string;
      sum: string;
      tax_rate: string;
      taxes: string;
      total: string;
      unit_price: string;
    };
    address: string;
    customer_id: string;
    reference: string;
    date_gte: string;
    date_lte: string;
    nb_items: string;
    total_gte: string;
    status: string;
    returned: string;
  };
  section: {
    order: string;
    customer: string;
    shipping_address: string;
    items: string;
    total: string;
    order_date: string;
    order_reference: string;
  };
}

interface Products extends StringMap {
  name: string;
  fields: {
    slug: string;
    name: string;
    description: string;
    price: string;
    quantity: string;
    image: string;
    available: string;
    createdAt: string;
    updatedAt: string;
    category: string;

    // category_id: string;
    // height_gte: string;
    // height_lte: string;
    // height: string;
    // reference: string;
    // sales: string;
    // stock_lte: string;
    // stock: string;
    // thumbnail: string;
    // width_gte: string;
    // width_lte: string;
    // width: string;
  };
  tabs: {
    image: string;
    details: string;
    description: string;
    reviews: string;
  };
  filters: {
    categories: string;
    stock: string;
    no_stock: string;
    low_stock: string;
    average_stock: string;
    enough_stock: string;
    sales: string;
    best_sellers: string;
    average_sellers: string;
    low_sellers: string;
    never_sold: string;
  };
}

interface Categories extends StringMap {
  name: string;
  fields: {
    slug: string;
    name: string;
    parent: string;
  };
}

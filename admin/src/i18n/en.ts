import englishMessages from 'ra-language-english';
import { MinasPhoneMessages } from './interface';

const customEnglishMessages: MinasPhoneMessages = {
  ...englishMessages,
  pos: {
    search: 'Search',
    configuration: 'Configuration',
    language: 'Language',
    theme: {
      name: 'Theme',
      light: 'Light',
      dark: 'Dark',
    },
    dashboard: {
      monthly_revenue: 'Monthly Revenue',
      month_history: '30 Day Revenue History',
      new_orders: 'New Orders',
      pending_reviews: 'Pending Reviews',
      all_reviews: 'See all reviews',
      new_customers: 'New Customers',
      all_customers: 'See all customers',
      pending_orders: 'Pending Orders',
      order: {
        items: 'by %{customer_name}, one item |||| by %{customer_name}, %{nb_items} items',
      },
      welcome: {
        title: 'Welcome to the react-admin e-commerce demo',
        subtitle:
          "This is the admin of an imaginary poster shop. Feel free to explore and modify the data - it's local to your computer, and will reset each time you reload.",
        ra_button: 'website',
        demo_button: 'Pending Button',
      },
    },
    menu: {
      sales: 'Sales',
      catalog: 'Catalog',
      customers: 'Customers',
    },
  },
  resources: {
    customers: {
      name: 'Customer |||| Customers',
      fields: {
        time_joined: 'Customer since',
      },
      filters: {
        last_visited: 'Last visited',
        today: 'Today',
        this_week: 'This week',
        last_week: 'Last week',
        this_month: 'This month',
        last_month: 'Last month',
        earlier: 'Earlier',
        has_ordered: 'Has ordered',
        has_newsletter: 'Has newsletter',
        group: 'Segment',
      },
      fieldGroups: {
        identity: 'Identity',
        address: 'Address',
        stats: 'Stats',
        history: 'History',
        password: 'Password',
        change_password: 'Change Password',
      },
      page: {
        delete: 'Delete Customer',
      },
      errors: {
        password_mismatch: 'The password confirmation is not the same as the password.',
      },
    },
    orders: {
      name: 'Order |||| Orders',
      amount: '1 order |||| %{smart_count} orders',
      title: 'Order %{reference}',
      fields: {
        basket: {
          delivery: 'Delivery',
          reference: 'Reference',
          quantity: 'Quantity',
          sum: 'Sum',
          tax_rate: 'Tax Rate',
          taxes: 'Tax',
          total: 'Total',
          unit_price: 'Unit Price',
        },
        address: 'Address',
        customer_id: 'Customer',
        date_gte: 'Passed Since',
        reference: 'Reference',
        date_lte: 'Passed Before',
        nb_items: 'Nb Items',
        total_gte: 'Min amount',
        status: 'Status',
        returned: 'Returned',
        created_at: 'Created at',
        updated_at: 'Updated at',
      },
      section: {
        order: 'Order',
        customer: 'Customer',
        shipping_address: 'Shipping Address',
        items: 'Items',
        total: 'Totals',
        order_date: 'Order date',
        order_reference: 'Order reference',
      },
    },
    products: {
      name: 'Product |||| Products',
      fields: {
        slug: 'Slug',
        name: 'Name',
        description: 'Description',
        price: 'Price',
        quantity: 'Quantity',
        image: 'Image',
        available: 'Available',
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        category: 'Category',
      },
      tabs: {
        image: 'Image',
        details: 'Details',
        description: 'Description',
        reviews: 'Reviews',
      },
      filters: {
        search: 'Search',
        categories: 'Categories',
        stock: 'Stock',
        no_stock: 'Out of stock',
        low_stock: '1 - 9 items',
        average_stock: '10 - 49 items',
        enough_stock: '50 items & more',
        sales: 'Sales',
        best_sellers: 'Best sellers',
        average_sellers: 'Average',
        low_sellers: 'Low',
        never_sold: 'Never sold',
      },
    },
    categories: {
      name: 'Category |||| Categories',
      fields: {
        name: 'Name',
        slug: 'Slug',
        parent: 'Parent',
      },
    },
  },
};

export default customEnglishMessages;

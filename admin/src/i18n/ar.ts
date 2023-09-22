import { defaultArabicMessages } from './default-messages/arabic';
import { MinasPhoneMessages } from './interface';

const customArabicMessages: MinasPhoneMessages = {
  ...defaultArabicMessages,
  pos: {
    // in arabic
    search: 'بحث',
    configuration: 'تكوين',
    language: 'لغة',
    theme: {
      name: 'موضوع',
      light: 'ضوء',
      dark: 'داكن',
    },
    dashboard: {
      monthly_revenue: 'الإيرادات الشهرية',
      month_history: 'تاريخ الإيرادات لمدة 30 يومًا',
      new_orders: 'طلبات جديدة',
      pending_reviews: 'المراجعات المعلقة',
      all_reviews: 'عرض جميع المراجعات',
      new_customers: 'عملاء جدد',
      all_customers: 'عرض جميع العملاء',
      pending_orders: 'طلبات معلقة',
      order: {
        items: 'بواسطة %{customer_name}، منتج واحد |||| بواسطة %{customer_name}، %{nb_items} منتجات',
      },
      welcome: {
        title: 'مرحبًا بك في لوحة تحكم إدارة متجر Minas Phone',
        subtitle:
          'هذا هو لوحة التحكم لمتجر ملصقات تخيلي. لا تتردد في استكشاف وتعديل البيانات - إنها محلية لجهاز الكمبيوتر الخاص بك ، وستعيد تعيين كل مرة تقوم فيها بإعادة تحميلها.',
        ra_button: 'موقع الويب',
        demo_button: 'زر معلق',
      },
    },
    menu: {
      sales: 'مبيعات',
      catalog: 'كتالوج',
      customers: 'عملاء',
    },
  },
  resources: {
    customers: {
      name: 'عميل |||| عملاء',
      fields: {
        time_joined: 'العميل منذ',
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
        description: 'Περιγραφή',
        price: 'Τιμή',
        quantity: 'Ποσότητα',
        image: 'Φωτογραφία',
        available: 'Διαθέσιμο',
        createdAt: 'Δημιουργήθηκε στις',
        updatedAt: 'Ενημερώθηκε στις',
        category: 'Κατηγορία',
      },
      tabs: {
        image: 'Image',
        details: 'Details',
        description: 'Description',
        reviews: 'Reviews',
      },
      filters: {
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

export default customArabicMessages;

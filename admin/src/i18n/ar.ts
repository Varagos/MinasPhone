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
        last_visited: 'آخر زيارة',
        today: 'اليوم',
        this_week: 'هذا الأسبوع',
        last_week: 'الأسبوع الماضي',
        this_month: 'هذا الشهر',
        last_month: 'الشهر الماضي',
        earlier: 'في وقت سابق',
        has_ordered: 'لديه أمر',
        has_newsletter: 'لديه النشرة الإخبارية',
        group: 'مجموعة',
      },
      fieldGroups: {
        identity: 'هوية',
        address: 'عنوان',
        stats: 'إحصائيات',
        history: 'تاريخ',
        password: 'كلمه السر',
        change_password: 'تغيير كلمة المرور',
      },
      page: {
        delete: 'حذف العميل',
      },
      errors: {
        password_mismatch: 'كلمة المرور غير متطابقة',
      },
    },
    orders: {
      name: 'طلب |||| طلبات',
      amount: '1 طلب |||| %{smart_count} طلبات',
      title: 'طلب %{reference}',
      fields: {
        basket: {
          delivery: 'التسليم',
          reference: 'المرجع',
          quantity: 'الكمية',
          sum: 'المجموع',
          tax_rate: 'معدل الضريبة',
          taxes: 'الضرائب',
          total: 'المجموع',
          unit_price: 'سعر الوحدة',
        },
        address: 'العنوان',
        customer_id: 'العميل',
        date_gte: 'منذ',
        reference: 'المرجع',
        date_lte: 'قبل',
        nb_items: 'عدد العناصر',
        total_gte: 'الحد الأدنى للمجموع',
        status: 'الحالة',
        returned: 'تم الإرجاع',
        created_at: 'تم الإنشاء في',
        updated_at: 'تم التحديث في',
      },
      section: {
        order: 'طلب',
        customer: 'عميل',
        shipping_address: 'عنوان الشحن',
        items: 'عناصر',
        total: 'المجموع',
        order_date: 'تاريخ الطلب',
        order_reference: 'مرجع الطلب',
      },
    },
    products: {
      name: 'منتج |||| منتجات',
      fields: {
        slug: 'Slug',
        name: 'الاسم',
        description: 'الوصف',
        price: 'السعر',
        quantity: 'الكمية',
        image: 'الصورة',
        available: 'متوفر',
        createdAt: 'تم الإنشاء في',
        updatedAt: 'تم التحديث في',
        category: 'الفئة',
      },
      tabs: {
        image: 'صورة',
        details: 'تفاصيل',
        description: 'وصف',
        reviews: 'المراجعات',
      },
      filters: {
        search: 'بحث',
        categories: 'الفئات',
        stock: 'المخزون',
        no_stock: 'غير متوفر',
        low_stock: '1 - 9 منتجات',
        average_stock: '10 - 49 منتجات',
        enough_stock: '50 منتجات وأكثر',
        sales: 'المبيعات',
        best_sellers: 'الأكثر مبيعًا',
        average_sellers: 'متوسط',
        low_sellers: 'منخفض',
        never_sold: 'لم يتم بيعها أبدًا',
      },
    },
    categories: {
      name: 'الفئة |||| الفئات',
      fields: {
        name: 'الاسم',
        slug: 'Slug',
        parent: 'الأصل',
      },
    },
  },
};

export default customArabicMessages;

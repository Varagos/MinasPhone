import { MinasPhoneMessages } from './interface';
import { TranslationMessages } from 'react-admin';
import { greekMessages } from './default-messages/greek';

const customGreeMessages: MinasPhoneMessages = {
  ...greekMessages,
  pos: {
    search: 'Αναζήτηση',
    configuration: 'Ρυθμίσεις',
    language: 'Γλώσσα',
    theme: {
      name: 'Θέμα',
      light: 'Φωτεινό',
      dark: 'Σκοτεινό',
    },
    dashboard: {
      monthly_revenue: 'Μηνιαία Έσοδα',
      month_history: 'Ιστορικό Μηνιαίων Έσοδων',
      new_orders: 'Νέες Παραγγελίες',
      pending_reviews: 'Σε Αναμονή Αξιολογήσεων',
      all_reviews: 'Προβολή Όλων των Αξιολογήσεων',
      new_customers: 'Νέοι Πελάτες',
      all_customers: 'Προβολή Όλων των Πελατών',
      pending_orders: 'Σε Αναμονή Παραγγελίες',
      order: {
        items: 'par %{customer_name}, un poster |||| par %{customer_name}, %{nb_items} posters',
      },
      welcome: {
        title: 'Καλώς ήρθατε',
        subtitle:
          'Αυτός είναι ο πίνακας ελέγχου του καταστήματος. Περιηγηθείτε ελεύθερα και μόλις αλλάζετε τα δεδομένα, θα πρέπει να αλλάζουν και στην ιστοσελίδα.',
        ra_button: 'Ιστοσελίδα minas-phone',
        demo_button: 'Email',
      },
    },
    menu: {
      sales: 'Πωλήσεις',
      catalog: 'Κατάλογος',
      customers: 'Πελάτες',
    },
  },
  resources: {
    customers: {
      name: 'Πελάτης |||| Πελάτες',
      fields: {
        time_joined: 'Ημερομηνία Εγγραφής',
      },
      filters: {
        last_visited: 'Επισκέφτηκε από',
        today: 'Σήμερα',
        this_week: 'Αυτή την εβδομάδα',
        last_week: 'Την προηγούμενη εβδομάδα',
        this_month: 'Αυτό το μήνα',
        last_month: 'Τον προηγούμενο μήνα',
        earlier: 'Πριν λίγο',
        has_ordered: 'Έχει παραγγελία',
        has_newsletter: 'Εγγραφή στο Newsletter',
        group: 'Ομάδα',
      },
      fieldGroups: {
        identity: 'Ταυτότητα',
        address: 'Διεύθυνση',
        stats: 'Στατιστικά',
        history: 'Ιστορικό',
        password: 'Κωδικός',
        change_password: 'Αλλαγή Κωδικού',
      },
      page: {
        delete: 'Διαγραφή Πελάτη',
      },
      errors: {
        password_mismatch: 'Οι κωδικοί δεν ταιριάζουν',
      },
    },
    orders: {
      name: 'Παραγγελία |||| Παραγγελίες',
      amount: '1 παραγγελία |||| %{smart_count} παραγγελίες',
      title: 'Παραγελλία n°%{reference}',
      fields: {
        basket: {
          delivery: 'Έξοδα αποστολής',
          reference: 'Προϊόν',
          quantity: 'Ποσότητα',
          sum: 'Πλήθος',
          tax_rate: 'TVA',
          taxes: 'TVA',
          total: 'Σύνολο',
          unit_price: 'Τιμή μονάδας',
        },
        address: 'Διεύθυνση',
        customer_id: 'Πελάτης',
        date_gte: 'Ημερομηνία από',
        date_lte: 'Ημερομηνία έως',
        nb_items: 'Αριθμός αντικειμένων',
        reference: 'Kωδικός παραγγελίας',
        returned: 'Επιστροφή',
        status: 'Κατάσταση',
        total_gte: 'Ελάχιστο σύνολο',
      },
      section: {
        order: 'Παραγγελία',
        customer: 'Πελάτης',
        shipping_address: 'Διεύθυνση αποστολής',
        items: 'Αντικείμενα',
        total: 'Σύνολο',
        order_date: 'Ημερομηνία Παραγγελίας',
        order_reference: 'Κωδικός Παραγγελίας',
      },
    },

    products: {
      name: 'Προϊόν |||| Προϊόντα',
      fields: {
        slug: 'Slug',
        name: 'Όνομα',
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
        image: 'Φωτογραφία',
        details: 'Détails',
        description: 'Description',
        reviews: 'Commentaires',
      },
      filters: {
        categories: 'Κατηγορίες',
        stock: 'Κατάσταση Αποθέματος',
        no_stock: 'Δεν υπάρχει απόθεμα',
        low_stock: '1 - 9 κομμάτια',
        average_stock: '10 - 49 κομμάτια',
        enough_stock: '50 και πάνω',
        sales: 'Πωλήσεις',
        best_sellers: 'Πιο δημοφιλή',
        average_sellers: 'Μέτρια',
        low_sellers: 'Χαμηλά',
        never_sold: 'Ποτέ δεν έχει πωληθεί',
      },
    },
    categories: {
      name: 'Κατηρορία |||| Κατηγορίες',
      fields: {
        name: 'Όνομα',
        slug: 'Slug',
        parent: 'Γονέας',
      },
    },
  },
};

export default customGreeMessages;

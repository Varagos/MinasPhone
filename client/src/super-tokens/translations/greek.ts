export const gr = {
  BRANDING_POWERED_BY_START: 'Powered by ',
  BRANDING_POWERED_BY_END: ' 🔑',
  EMAIL_PASSWORD_EMAIL_LABEL: 'Email',
  EMAIL_PASSWORD_EMAIL_PLACEHOLDER: 'Διεύθυνση ηλεκτρονικού ταχυδρομείου',

  EMAIL_PASSWORD_PASSWORD_LABEL: 'Κωδικός πρόσβασης',
  EMAIL_PASSWORD_PASSWORD_PLACEHOLDER: 'Κωδικός πρόσβασης',

  EMAIL_PASSWORD_SIGN_IN_HEADER_TITLE: 'Επ, πού πας;',
  EMAIL_PASSWORD_SIGN_IN_HEADER_SUBTITLE_START: 'Δεν έχεις γραφτεί ακόμα; ',
  EMAIL_PASSWORD_SIGN_IN_HEADER_SUBTITLE_SIGN_UP_LINK: 'Εγγραφή',
  EMAIL_PASSWORD_SIGN_IN_HEADER_SUBTITLE_END: '',
  EMAIL_PASSWORD_SIGN_IN_FOOTER_FORGOT_PW_LINK: 'Ξέχασες τον κωδικό σου;',
  EMAIL_PASSWORD_SIGN_IN_SUBMIT_BTN: 'Καλωσόρισες ξανά!',
  EMAIL_PASSWORD_SIGN_IN_WRONG_CREDENTIALS_ERROR: 'Λάθος συνδυασμός Email και Κωδικού',

  EMAIL_PASSWORD_SIGN_UP_HEADER_TITLE: 'Νέος χρήστης;',
  EMAIL_PASSWORD_SIGN_UP_HEADER_SUBTITLE_START: 'Έχεις ήδη γραφτεί; ',
  EMAIL_PASSWORD_SIGN_UP_HEADER_SUBTITLE_SIGN_IN_LINK: 'Συνδέσου',
  EMAIL_PASSWORD_SIGN_UP_HEADER_SUBTITLE_END: '',
  EMAIL_PASSWORD_SIGN_UP_FOOTER_START: 'By continuing, you agree to our ',
  EMAIL_PASSWORD_SIGN_UP_FOOTER_TOS: 'Terms of Service',
  EMAIL_PASSWORD_SIGN_UP_FOOTER_AND: ' and ',
  EMAIL_PASSWORD_SIGN_UP_FOOTER_PP: 'Privacy Policy',
  EMAIL_PASSWORD_SIGN_UP_FOOTER_END: '',
  EMAIL_PASSWORD_SIGN_UP_SUBMIT_BTN: 'Καλώς ήρθες!',

  EMAIL_PASSWORD_EMAIL_ALREADY_EXISTS: 'Το email υπάρχει ήδη. Δοκίμασε να συνδεθείς',

  EMAIL_PASSWORD_RESET_HEADER_TITLE: 'Επαναφορά κωδικού',
  EMAIL_PASSWORD_RESET_HEADER_SUBTITLE:
    'Εισαγάγετε τη διεύθυνση ηλεκτρονικού ταχυδρομείου του λογαριασμού σας. Θα σας στείλουμε έναν σύνδεσμο για να επαναφέρετε τον κωδικό πρόσβασής σας.',
  EMAIL_PASSWORD_RESET_SEND_SUCCESS: 'Ένας σύνδεσμος για την επαναφορά του κωδικού πρόσβασής σου έχει σταλεί.',
  EMAIL_PASSWORD_RESET_RESEND_LINK: 'Δεν το έλαβες; Δοκιμάσε πάλι εδώ',
  EMAIL_PASSWORD_RESET_SEND_BTN: 'Αποστολή Email',

  EMAIL_PASSWORD_RESET_SUBMIT_PW_SUCCESS_HEADER_TITLE: 'Επιτυχία!',
  EMAIL_PASSWORD_RESET_SUBMIT_PW_SUCCESS_DESC: 'Ο κωδικός σου ενημερώθηκε επιτυχώς!',
  EMAIL_PASSWORD_RESET_SUBMIT_PW_SUCCESS_SIGN_IN_BTN: 'Σύνδεση',

  EMAIL_PASSWORD_NEW_PASSWORD_LABEL: 'Νέος κωδικός',
  EMAIL_PASSWORD_NEW_PASSWORD_PLACEHOLDER: 'Νέος κωδικός',
  EMAIL_PASSWORD_CONFIRM_PASSWORD_LABEL: 'Επιβεβαίωση κωδικού',
  EMAIL_PASSWORD_CONFIRM_PASSWORD_PLACEHOLDER: 'Επιβεβαίωσε τον κωδικο',

  EMAIL_PASSWORD_RESET_SUBMIT_PW_HEADER_TITLE: 'Άλλαξε τον κωδικό σου',
  EMAIL_PASSWORD_RESET_SUBMIT_PW_HEADER_SUBTITLE: 'Πρόσθεσε παρακάτω το νέο σου κωδικό',
  EMAIL_PASSWORD_RESET_SUBMIT_PW_CHANGE_PW_BTN: 'Επαναφορά κωδικού!',
  EMAIL_PASSWORD_RESET_PASSWORD_INVALID_TOKEN_ERROR: 'Invalid password reset token',

  ERROR_EMAIL_NON_STRING: 'Το email πρέπει να είναι συμβολοσειρά',
  ERROR_EMAIL_INVALID: 'To email δεν είναι έγκυρο',

  ERROR_PASSWORD_NON_STRING: 'O κωδικός πρέπει να είναι συμβολοσειρά',
  ERROR_PASSWORD_TOO_SHORT: 'Ο κωδικός πρέπει να έχει τουλάχιστον 8 χαρακτήρες, συμπεριλαμβανομένου ενός αριθμού',
  ERROR_PASSWORD_TOO_LONG: 'Δοκίμασε μικρότερο κωδικό 🫠',
  ERROR_PASSWORD_NO_ALPHA: 'O κωδικός πρέπει να περιέχει τουλάχιστον ένα αλφαβητικό',
  ERROR_PASSWORD_NO_NUM: 'O κωδικός πρέπει να περιέχει τουλάχιστον έναν αριθμό',
  ERROR_CONFIRM_PASSWORD_NO_MATCH: 'Ο κωδικός επιβεβαίωσης δεν ταιριάζει',

  ERROR_NON_OPTIONAL: 'Το πεδίο είναι υποχρεωτικό',

  /*
   * The following are error messages from our backend SDK.
   * These are returned as full messages to preserver compatibilty, but they work just like the keys above.
   * They are shown as is by default (setting the value to undefined will display the raw translation key)
   */
  'This email already exists. Please sign in instead.': undefined,
  'Field is not optional': undefined,
  'Password must contain at least 8 characters, including a number': undefined,
  "Password's length must be lesser than 100 characters": undefined,
  'Password must contain at least one alphabet': undefined,
  'Password must contain at least one number': undefined,
  'Email is invalid': undefined,
};

import { get } from 'env-var';
import './dotenv';

// https://github.com/Sairyss/backend-best-practices#configuration

export const googleMerchantConfig = {
  merchantId: get('GOOGLE_MERCHANT_ID').required().asString(),
  dataSourceId: get('GOOGLE_MERCHANT_DATA_SOURCE_ID').required().asString(),
  serviceAccount: get('GCP_CREDENTIALS_SERVICE_ACCOUNT')
    .required()
    .convertFromBase64()
    .asJsonObject(),
  targetCountry: get('GOOGLE_MERCHANT_TARGET_COUNTRY').default('GR').asString(),
  contentLanguage: get('GOOGLE_MERCHANT_CONTENT_LANGUAGE')
    .default('el')
    .asString(),
  feedLabel: get('GOOGLE_MERCHANT_FEED_LABEL').default('GR').asString(),
  storeUrl: get('GOOGLE_MERCHANT_STORE_URL').required().asString(),
};

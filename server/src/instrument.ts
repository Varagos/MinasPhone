import * as Sentry from '@sentry/nestjs';

Sentry.init({
  dsn: 'https://8daeb13dff4da6761c0fb5e1e764a9ee@o4505444419174400.ingest.us.sentry.io/4509650668814336',

  environment: process.env.NODE_ENV,
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
});

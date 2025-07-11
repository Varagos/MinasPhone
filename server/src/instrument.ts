import * as Sentry from '@sentry/nestjs';

Sentry.init({
  dsn: 'https://8daeb13dff4da6761c0fb5e1e764a9ee@o4505444419174400.ingest.us.sentry.io/4509650668814336',

  environment: process.env.NODE_ENV,

  // Add Performance Monitoring by setting tracesSampleRate
  // The value is automatically adjusted depending on the environment
  // Learn more about sampling here: https://docs.sentry.io/platforms/javascript/guides/nestjs/configuration/sampling/
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
});

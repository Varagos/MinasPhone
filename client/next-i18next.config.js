// next-i18next.config.js

module.exports = {
    i18n: {
        locales: ['el', 'en', 'ar'],
        defaultLocale: 'el',
        keySeparator: '.',
        // For now ignore the Accept-Language header
        localeDetection: false
    },
}
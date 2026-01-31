import polyglotI18nProvider from 'ra-i18n-polyglot';
import englishMessages from './en';
import greekMessages from './gr';

export enum LocaleEnum {
  EN = 'en',
  GR = 'gr',
  AR = 'ar',
}

export const i18nProvider = polyglotI18nProvider((locale) => {
  if (locale === LocaleEnum.EN) {
    return englishMessages;
  }
  if (locale === LocaleEnum.AR) {
    return import('./ar').then((messages) => messages.default);
  }
  return greekMessages;
}, LocaleEnum.GR);

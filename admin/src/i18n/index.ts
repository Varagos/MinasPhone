import polyglotI18nProvider from 'ra-i18n-polyglot';
import englishMessages from './en';

export enum LocaleEnum {
  EN = 'en',
  GR = 'gr',
}

export const i18nProvider = polyglotI18nProvider((locale) => {
  if (locale === LocaleEnum.GR) {
    return import('./gr').then((messages) => messages.default);
  }
  return englishMessages;
}, LocaleEnum.EN);

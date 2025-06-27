import Image from 'next/image';
import { useTranslations } from 'next-intl';
import EmptyLogo from '../../../public/undraw_empty_xct9.svg';

export function EmptyProducts() {
  const t = useTranslations('common');

  return (
    <main className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="mb-8 max-w-md">
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          {t('CATEGORY_IS_EMPTY')}
        </h2>
        <p className="text-muted-foreground">{t('TRY_ANOTHER_PRODUCT')}</p>
      </div>
      <div className="w-full max-w-md">
        <Image
          src={EmptyLogo}
          alt={'Empty products'}
          className="w-full h-auto"
          priority
        />
      </div>
    </main>
  );
}

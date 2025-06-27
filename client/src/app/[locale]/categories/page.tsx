import TabletCategory from '@/../public/categories_tablet.webp';
import PhonesCategory from '@/../public/categories_smartphones.webp';
import AccessoriesCategory from '@/../public/categories_accessories.webp';
import SmartWatchCategory from '@/../public/categories_smartwatch.webp';
import CategoryItem from '../components/CategoryItem/CategoryItem';
import { useTranslations } from 'next-intl';

export default function Categories() {
  const t = useTranslations('common');
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-black text-foreground mb-4">
            <span className="border-b-4 border-primary pb-1">
              {t('CATEGORIES')}
            </span>
          </h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <CategoryItem
            src={PhonesCategory}
            heading="ΚΙΝΗΤΑ ΤΗΛΕΦΩΝΑ"
            dest="/categories/smartphones"
            alt="smartphones"
          />
          <CategoryItem
            src={TabletCategory}
            heading="TABLETS"
            dest="/categories/tablets"
            alt="tablets"
          />
          <CategoryItem
            src={AccessoriesCategory}
            heading="ΑΞΕΣΟΥΑΡ"
            dest="/categories/accessories"
            alt="accessories"
          />
          <CategoryItem
            src={SmartWatchCategory}
            heading="SMARTWATCHES"
            dest="/categories/smartwatches"
            alt="smartwatches"
          />
        </div>
      </div>
    </div>
  );
}

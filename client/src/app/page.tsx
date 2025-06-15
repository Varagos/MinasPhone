import Hero from '@/app/components/HeroSection';

import ServicesSection from '@/app/components/Services';
import ContactUsSection from '@/app/components/ContactUs';

import dynamic from 'next/dynamic';
import RepairsSection from '@/app/components/RepairsSection/RepairsSection';
import PopularCategories from '@/app/components/PopularCategories';
import { Metadata } from 'next';
import SuggestedProducts from './components/SuggestedProducts';
import { getTranslations } from 'next-intl/server';
import { api } from '@/api/index';

const DynamicStoreLocation = dynamic(
  () => import('@/app/components/StoreLocation'),
  {
    loading: () => <p>Loading...</p>,
  }
);

export default async function HomePage() {
  const t = await getTranslations('landing');

  const products = await api.products.findMany({ range: [0, 9] });
  const shuffledProducts = products.data.sort(() => 0.5 - Math.random());

  return (
    <main className="bg-white">
      <Hero />
      <ServicesSection />
      <PopularCategories />
      <SuggestedProducts shuffledProducts={shuffledProducts} />
      <RepairsSection />
      <DynamicStoreLocation />
      <ContactUsSection />
    </main>
  );
}

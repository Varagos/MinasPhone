// pages/sitemap.xml.js

import { api } from '@/api';
import { Category } from '@/api/types/categories';
import { ProductSlug } from '@/api/types/products';
import { MetadataRoute } from 'next';

const DOMAIN = 'https://minasphone.gr';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date().toISOString();
  try {
    const productsApi = api.products;
    const categoriesApi = api.categories;
    // Fetch data
    const [products, categories] = await Promise.all([
      productsApi.findAllProductSlugs(),
      categoriesApi
        .findMany({
          range: [0, 1000],
        })
        .then((response) => response.data),
    ]);

    /**
   * 
   * /pages/information/user-terms.js
/pages/information/privacy-policy.js  
/pages/information/cookie-policy.js


   */

    // Helper function to generate URLs for both languages
    const generateBilingualUrls = (
      path: string,
      lastmod = currentDate,
      priority = '0.5'
    ): MetadataRoute.Sitemap => {
      return [
        {
          url: `${DOMAIN}${path}`,
          lastModified: new Date(lastmod),
          changeFrequency: 'yearly',
          priority: Number(priority),
        },
        {
          url: `${DOMAIN}/en${path}`,
          lastModified: new Date(lastmod),
          changeFrequency: 'yearly',
          priority: Number(priority),
        },
      ];
    };

    return [
      {
        url: `${DOMAIN}`,
        lastModified: new Date(currentDate),
        changeFrequency: 'yearly',
        priority: 1,
      },
      {
        url: `${DOMAIN}/en`,
        lastModified: new Date(currentDate),
        changeFrequency: 'yearly',
        priority: 1,
      },
      ...generateBilingualUrls('/products', currentDate, '0.9'),
      ...generateBilingualUrls('/categories', currentDate, '0.8'),
      ...generateBilingualUrls('/cart', currentDate, '0.5'),
      ...generateBilingualUrls('/information/user-terms', currentDate, '0.3'),
      ...categories
        .map((category) => {
          const lastmod = category.updatedAt;
          return generateBilingualUrls(
            `/categories/${category.slug}`,
            lastmod,
            '0.8'
          );
        })
        .flat(),
      ...products
        .map((product) => {
          const urlSlug = product.id;
          const lastmod = product.updatedAt;
          return generateBilingualUrls(`/products/${urlSlug}`, lastmod, '0.9');
        })
        .flat(),
    ];
  } catch (error) {
    console.error('Error generating sitemap:', error);

    // Return a basic sitemap on error
    return [
      {
        url: `${DOMAIN}`,
        lastModified: new Date(currentDate),
        changeFrequency: 'yearly',
        priority: 1,
      },
      {
        url: `${DOMAIN}/en`,
        lastModified: new Date(currentDate),
        changeFrequency: 'yearly',
        priority: 1,
      },
    ];
  }
}

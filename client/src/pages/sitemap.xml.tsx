// pages/sitemap.xml.js

import { api } from '@/api';
import { Category } from '@/api/types/categories';
import { ProductSlug } from '@/api/types/products';

const DOMAIN = 'https://minasphone.gr';

function generateSiteMap(products: ProductSlug[], categories: Category[]) {
  const currentDate = new Date().toISOString();

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
  ) => {
    return `
     <url>
       <loc>${DOMAIN}${path}</loc>
       <lastmod>${lastmod}</lastmod>
       <priority>${priority}</priority>
     </url>
     <url>
       <loc>${DOMAIN}/en${path}</loc>
       <lastmod>${lastmod}</lastmod>
       <priority>${priority}</priority>
     </url>`;
  };

  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!-- Static pages - Greek (default) -->
     <url>
       <loc>${DOMAIN}</loc>
       <lastmod>${currentDate}</lastmod>
       <priority>1.0</priority>
     </url>
     <!-- Static pages - English -->
     <url>
       <loc>${DOMAIN}/en</loc>
       <lastmod>${currentDate}</lastmod>
       <priority>1.0</priority>
     </url>
     
     <!-- Bilingual static pages -->
     ${generateBilingualUrls('/products', currentDate, '0.9')}
     ${generateBilingualUrls('/categories', currentDate, '0.8')}
     ${generateBilingualUrls('/cart', currentDate, '0.5')}
     ${generateBilingualUrls('/information/user-terms', currentDate, '0.3')}
     
     <!-- Category pages - both languages -->
     ${categories
       .map((category) => {
         const lastmod = category.updatedAt;
         return generateBilingualUrls(
           `/category/${category.slug}`,
           lastmod,
           '0.8'
         );
       })
       .join('')}
       
     <!-- Product pages - both languages -->
     ${products
       .map((product) => {
         // Use slug if available, otherwise fall back to id
         const urlSlug = product.id; //product.slug ||
         const lastmod = product.updatedAt;
         return generateBilingualUrls(`/products/${urlSlug}`, lastmod, '0.9');
       })
       .join('')}
   </urlset>
 `;
}
function SiteMap() {
  // getServerSideProps will handle the generation
}

export async function getServerSideProps({ res }: { res: any }) {
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

    // Generate the sitemap
    const sitemap = generateSiteMap(products, categories);

    // Set headers and send response
    res.setHeader('Content-Type', 'text/xml');
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=3600, stale-while-revalidate'
    );
    res.write(sitemap);
    res.end();

    return {
      props: {},
    };
  } catch (error) {
    console.error('Error generating sitemap:', error);

    // Return a basic sitemap on error
    const basicSitemap = `<?xml version="1.0" encoding="UTF-8"?>
     <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
       <url>
         <loc>${DOMAIN}</loc>
         <lastmod>${new Date().toISOString()}</lastmod>
       </url>
     </urlset>`;

    res.setHeader('Content-Type', 'text/xml');
    res.write(basicSitemap);
    res.end();

    return {
      props: {},
    };
  }
}

export default SiteMap;

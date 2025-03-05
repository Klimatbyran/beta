import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getCompanies, getMunicipalities } from './api.js';

interface SitemapEntry {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: string;
}

export async function generateSitemap(outputPath: string): Promise<void> {
  try {
    const currentDate = new Date().toISOString().split('T')[0];
    
    // Static routes
    const staticRoutes: SitemapEntry[] = [
      {
        loc: 'https://klimatkollen.se/',
        lastmod: currentDate,
        changefreq: 'weekly',
        priority: '1.0'
      },
      {
        loc: 'https://klimatkollen.se/municipalities',
        lastmod: currentDate,
        changefreq: 'monthly',
        priority: '0.8'
      },
      {
        loc: 'https://klimatkollen.se/companies',
        lastmod: currentDate,
        changefreq: 'monthly',
        priority: '0.8'
      },
      {
        loc: 'https://klimatkollen.se/about',
        lastmod: currentDate,
        changefreq: 'monthly',
        priority: '0.7'
      },
      {
        loc: 'https://klimatkollen.se/methodology',
        lastmod: currentDate,
        changefreq: 'monthly',
        priority: '0.6'
      },
      {
        loc: 'https://klimatkollen.se/insights',
        lastmod: currentDate,
        changefreq: 'weekly',
        priority: '0.7'
      },
      {
        loc: 'https://klimatkollen.se/insights/klimatmal',
        lastmod: currentDate,
        changefreq: 'monthly',
        priority: '0.6'
      },
      {
        loc: 'https://klimatkollen.se/insights/utslappsberakning',
        lastmod: currentDate,
        changefreq: 'monthly',
        priority: '0.6'
      }
    ];

    // Get dynamic routes
    const allRoutes = [...staticRoutes];
    
    try {
      // Add municipalities
      const municipalities = await getMunicipalities();
      if (municipalities && municipalities.length > 0) {
        const municipalityRoutes = municipalities.map(municipality => ({
          loc: `https://klimatkollen.se/municipalities/${municipality.id}`,
          lastmod: currentDate,
          changefreq: 'monthly',
          priority: '0.6'
        }));
        allRoutes.push(...municipalityRoutes);
        console.log(`Added ${municipalityRoutes.length} municipality routes to sitemap`);
      }
      
      // Add companies
      const companies = await getCompanies();
      if (companies && companies.length > 0) {
        const companyRoutes = companies.map(company => ({
          loc: `https://klimatkollen.se/companies/${company.wikidataId}`,
          lastmod: currentDate,
          changefreq: 'monthly',
          priority: '0.6'
        }));
        allRoutes.push(...companyRoutes);
        console.log(`Added ${companyRoutes.length} company routes to sitemap`);
      }
    } catch (error) {
      console.error('Error fetching dynamic routes:', error);
      // Continue with static routes if dynamic routes fail
    }

    // Generate XML
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes.map(route => `  <url>
    <loc>${route.loc}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

    // Ensure directory exists
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Write to file
    fs.writeFileSync(outputPath, xml);
    console.log(`Sitemap generated at ${outputPath} with ${allRoutes.length} URLs`);
  } catch (error) {
    console.error('Error generating sitemap:', error);
  }
}

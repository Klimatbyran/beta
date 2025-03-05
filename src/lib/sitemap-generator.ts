import fs from 'fs';
import path from 'path';
import { getCompanies, getMunicipalities } from './api.js';

// Set NODE_TLS_REJECT_UNAUTHORIZED to allow self-signed certificates during development
// This is only used during sitemap generation in Node.js environment
if (typeof process !== 'undefined' && process.env.NODE_ENV !== 'production') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

interface SitemapEntry {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: string;
}

export async function generateSitemap(outputPath: string): Promise<void> {
  try {
    const currentDate = new Date().toISOString().split('T')[0];
    
    // Static routes - Swedish (default)
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
    
    // Static routes - English
    const englishStaticRoutes: SitemapEntry[] = [
      {
        loc: 'https://klimatkollen.se/en',
        lastmod: currentDate,
        changefreq: 'weekly',
        priority: '0.9'
      },
      {
        loc: 'https://klimatkollen.se/en/municipalities',
        lastmod: currentDate,
        changefreq: 'monthly',
        priority: '0.7'
      },
      {
        loc: 'https://klimatkollen.se/en/companies',
        lastmod: currentDate,
        changefreq: 'monthly',
        priority: '0.7'
      },
      {
        loc: 'https://klimatkollen.se/en/about',
        lastmod: currentDate,
        changefreq: 'monthly',
        priority: '0.6'
      },
      {
        loc: 'https://klimatkollen.se/en/methodology',
        lastmod: currentDate,
        changefreq: 'monthly',
        priority: '0.6'
      },
      {
        loc: 'https://klimatkollen.se/en/insights',
        lastmod: currentDate,
        changefreq: 'weekly',
        priority: '0.6'
      },
      {
        loc: 'https://klimatkollen.se/en/insights/klimatmal',
        lastmod: currentDate,
        changefreq: 'monthly',
        priority: '0.5'
      },
      {
        loc: 'https://klimatkollen.se/en/insights/utslappsberakning',
        lastmod: currentDate,
        changefreq: 'monthly',
        priority: '0.5'
      }
    ];
    
    // Add English routes to all routes
    staticRoutes.push(...englishStaticRoutes);

    // Get dynamic routes
    const allRoutes = [...staticRoutes];
    
    try {
      // Add municipalities
      const municipalities = await getMunicipalities();
      if (municipalities && municipalities.length > 0) {
        const municipalityRoutes = municipalities
          .filter(municipality => municipality.name) // Ensure municipality has a name
          .map(municipality => {
            // Create a URL-friendly ID from the municipality name
            const id = municipality.name
              .toLowerCase()
              .replace(/[åä]/g, "a")
              .replace(/[ö]/g, "o")
              .replace(/[é]/g, "e")
              .replace(/[\s-]+/g, "-")
              .replace(/[^a-z0-9-]/g, "");
              
            return {
              loc: `https://klimatkollen.se/municipalities/${id}`,
              lastmod: currentDate,
              changefreq: 'monthly',
              priority: '0.6'
            };
          });
          
        // Add English versions of municipality routes
        const englishMunicipalityRoutes = municipalityRoutes.map(route => ({
          ...route,
          loc: route.loc.replace('https://klimatkollen.se/municipalities/', 'https://klimatkollen.se/en/municipalities/'),
          priority: '0.5' // Slightly lower priority for English versions
        }));
          
        allRoutes.push(...municipalityRoutes);
        allRoutes.push(...englishMunicipalityRoutes);
        console.log(`Added ${municipalityRoutes.length} Swedish and ${englishMunicipalityRoutes.length} English municipality routes to sitemap`);
      }
      
      // Add companies
      const companies = await getCompanies();
      if (companies && companies.length > 0) {
        const companyRoutes = companies.map(company => {
          // Create a URL-friendly slug from the company name
          const slug = company.name
            .toLowerCase()
            .replace(/[åäá]/g, "a")
            .replace(/[öô]/g, "o")
            .replace(/[éèê]/g, "e")
            .replace(/[üû]/g, "u")
            .replace(/[ç]/g, "c")
            .replace(/[ñ]/g, "n")
            .replace(/[\s-]+/g, "-")
            .replace(/[^a-z0-9-]/g, "");
            
          return {
            loc: `https://klimatkollen.se/foretag/${slug}-${company.wikidataId}`,
            lastmod: currentDate,
            changefreq: 'monthly',
            priority: '0.6'
          };
        });
        
        // Add English versions of company routes
        const englishCompanyRoutes = companies.map(company => {
          const slug = company.name
            .toLowerCase()
            .replace(/[åäá]/g, "a")
            .replace(/[öô]/g, "o")
            .replace(/[éèê]/g, "e")
            .replace(/[üû]/g, "u")
            .replace(/[ç]/g, "c")
            .replace(/[ñ]/g, "n")
            .replace(/[\s-]+/g, "-")
            .replace(/[^a-z0-9-]/g, "");
            
          return {
            loc: `https://klimatkollen.se/en/companies/${company.wikidataId}/${slug}`,
            lastmod: currentDate,
            changefreq: 'monthly',
            priority: '0.5' // Slightly lower priority for English versions
          };
        });
        
        allRoutes.push(...companyRoutes);
        allRoutes.push(...englishCompanyRoutes);
        console.log(`Added ${companyRoutes.length} Swedish and ${englishCompanyRoutes.length} English company routes to sitemap`);
      }
    } catch (error) {
      console.error('Error fetching dynamic routes:', error);
      // Continue with static routes if dynamic routes fail
    }

    // Generate XML with language alternates
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${allRoutes.map(route => {
  // Generate alternate links for each URL
  let alternateLinks = '';
  
  // Skip generating alternates for URLs that already have language prefixes
  if (!route.loc.includes('/en/')) {
    const enUrl = route.loc.replace('https://klimatkollen.se/', 'https://klimatkollen.se/en/');
    alternateLinks = `
    <xhtml:link rel="alternate" hreflang="sv" href="${route.loc}" />
    <xhtml:link rel="alternate" hreflang="en" href="${enUrl}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${route.loc}" />`;
  } else if (route.loc.includes('/en/')) {
    const svUrl = route.loc.replace('https://klimatkollen.se/en/', 'https://klimatkollen.se/');
    alternateLinks = `
    <xhtml:link rel="alternate" hreflang="sv" href="${svUrl}" />
    <xhtml:link rel="alternate" hreflang="en" href="${route.loc}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${svUrl}" />`;
  }
  
  return `  <url>
    <loc>${route.loc}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>${alternateLinks}
  </url>`;
}).join('\n')}
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

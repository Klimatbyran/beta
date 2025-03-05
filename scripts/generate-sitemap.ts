import { generateSitemap } from '../src/lib/sitemap-generator';
import path from 'path';
import { fileURLToPath } from 'url';

async function main() {
  try {
    // Get the directory name in ESM
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    
    // Generate sitemap for both public and dist directories
    const publicPath = path.resolve(__dirname, '../public/sitemap.xml');
    await generateSitemap(publicPath);
    
    console.log('Sitemap generation completed successfully!');
  } catch (error) {
    console.error('Error generating sitemap:', error);
    process.exit(1);
  }
}

main();

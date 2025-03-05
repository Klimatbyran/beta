import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { plugin as markdown } from "vite-plugin-markdown";
import { Mode } from "vite-plugin-markdown";
import fs from 'fs';
import path from 'path';

// Custom plugin for sitemap generation
function customSitemapPlugin() {
  return {
    name: 'vite-plugin-custom-sitemap',
    closeBundle: async () => {
      try {
        // Dynamically import the sitemap generator
        const { generateSitemap } = await import('./src/lib/sitemap-generator');
        const outputPath = path.resolve(process.cwd(), 'dist/sitemap.xml');
        await generateSitemap(outputPath);
      } catch (error) {
        console.error('Failed to generate dynamic sitemap:', error);
        
        // Fallback to static sitemap if dynamic generation fails
        try {
          const staticSitemapPath = path.resolve(process.cwd(), 'public/sitemap.xml');
          const distSitemapPath = path.resolve(process.cwd(), 'dist/sitemap.xml');
          
          if (fs.existsSync(staticSitemapPath)) {
            fs.copyFileSync(staticSitemapPath, distSitemapPath);
            console.log('Copied static sitemap as fallback');
          }
        } catch (fallbackError) {
          console.error('Failed to copy static sitemap:', fallbackError);
        }
      }
    }
  };
}

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          ["@babel/plugin-transform-react-jsx", { runtime: "automatic" }],
          ["@babel/plugin-proposal-class-properties", { loose: true }],
        ],
      },
    }),
    markdown({ mode: ["html", "toc", "meta", "react"] as Mode[] }),
    customSitemapPlugin(),
  ],
  resolve: {
    alias: {
      "@": new URL("./src", import.meta.url).pathname,
      "@lib": new URL("./src/lib", import.meta.url).pathname, // Fixes your import issue
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000/", // Default to local, override in CI/CD
        changeOrigin: true,
        secure: false,
      },
    },
  },
  base: "/",
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { plugin as markdown } from "vite-plugin-markdown";
import { Mode } from "vite-plugin-markdown";
import { VitePluginSitemap } from 'vite-plugin-sitemap';

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
    VitePluginSitemap({
      hostname: 'https://klimatkollen.se',
      dynamicRoutes: [
        '/',
        '/municipalities',
        '/companies',
        '/about',
        '/methodology',
        '/insights',
        '/insights/klimatmal',
        '/insights/utslappsberakning'
      ],
      exclude: ['/404'],
      outDir: 'dist',
      filename: 'sitemap.xml'
    }),
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

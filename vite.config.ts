import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// Cache storage for API responses
const apiCache = new Map();

export default defineConfig({
  plugins: [
    react({
      // Add babel configuration to remove defaultProps warnings
      babel: {
        plugins: [
          ["@babel/plugin-transform-react-jsx", { runtime: "automatic" }],
          ["@babel/plugin-proposal-class-properties", { loose: true }],
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: ["lucide-react"],
  },
  server: {
    proxy: {
      "/api": {
        target: "https://api.klimatkollen.se",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, "/api"),
        configure: (proxy) => {
          proxy.on("proxyReq", (proxyReq, req) => {
            // Generate cache key from request URL and method
            const cacheKey = `${req.method}:${req.url}`;

            // Store the original URL for cache hits
            req.originalUrl = req.url;
          });

          proxy.on("proxyRes", (proxyRes, req, res) => {
            const cacheKey = `${req.method}:${req.originalUrl}`;

            // Only cache GET requests
            if (req.method === "GET") {
              let body = "";
              proxyRes.on("data", (chunk) => (body += chunk));
              proxyRes.on("end", () => {
                // Store response in cache with headers
                apiCache.set(cacheKey, {
                  body,
                  headers: proxyRes.headers,
                  timestamp: Date.now(),
                  // Cache for 5 minutes
                  maxAge: 5 * 60 * 1000,
                });
              });
            }
          });

          proxy.on("proxyReq", (proxyReq, req, res) => {
            const cacheKey = `${req.method}:${req.originalUrl}`;
            const cached = apiCache.get(cacheKey);

            if (cached && req.method === "GET") {
              const now = Date.now();
              // Check if cache is still valid
              if (now - cached.timestamp < cached.maxAge) {
                // Return cached response
                res.writeHead(200, cached.headers);
                res.end(cached.body);
                return;
              } else {
                // Remove expired cache entry
                apiCache.delete(cacheKey);
              }
            }
          });
        },
      },
    },
  },
  base: "/",
});

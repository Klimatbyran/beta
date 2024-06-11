import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import node from '@astrojs/node'
import tailwind from '@astrojs/tailwind'

// https://astro.build/config
export default defineConfig({
  output: 'server',
  server: process.env.NODE_ENV === 'production' ? { port: parseInt(process.env.PORT) || 4321, host: true } : undefined,
  integrations: [react(), tailwind()],
  adapter: node({
    mode: 'standalone',
  }),
  // NOTE: Temporary redirect (HTTP 302) to reduce risk of broken links.
  redirects: process.env.NODE_ENV === 'production' ? {
    '/': 'https://klimatkollen.se',
    '/foretag': 'https://klimatkollen.se',
  }: undefined,
})
